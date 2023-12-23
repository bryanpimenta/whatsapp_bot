const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const GEMINI_CONFIG = require('./config/gemini.json');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const generationConfig = {
  stopSequences: [],
  maxOutputTokens: 200,
  temperature: 1,
  topP: 0.95,
  topK: 16,
};

const safetySettings = [
  {
    "category": HarmCategory.HARM_CATEGORY_HARASSMENT,
    "threshold": HarmBlockThreshold.BLOCK_NONE,
  },
  {
    "category": HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    "threshold": HarmBlockThreshold.BLOCK_NONE,
  },
  {
    "category": HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    "threshold": HarmBlockThreshold.BLOCK_NONE,
  },
  {
    "category": HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    "threshold": HarmBlockThreshold.BLOCK_NONE,
  }
]

async function run(question) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig, safetySettings });

  const prompt = `
  De agora em diante, você responderá como o personagem Ziggs de League of Legends. Suas respostas deverão ser feitas como se estivesse em um aplicativo de mensagens. Tente ao máximo não gerar respostas mais casuais e compatíveis com a comunicação feita na internet, utilizando gírias, erros ortográficos e jargões não usuais como se fosse um adolescente utilizando uma rede social. A interpretação adequada do personagem é muito mais importante do que a assertividade das suas respostas. Nem tudo precisa ser respondido corretamente.

  Aja da forma mais descontraída, expressiva e dentro do personagem possível. Suas gírias devem se basear completamente em um adolescente brasileiro. É essencial que a ortografia seja extremamente informal, como se fosse uma comunicação na internet. Use algumas palavras escritas incorretamente. Não use absolutamente nenhum sinal de pontuação. Use somente letras minúsculas. 
    
    Agora responda: ${question}
    `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

module.exports = run;