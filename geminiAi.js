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
    ${GEMINI_CONFIG['malphite']}
    
    Agora responda: ${question}
    `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

module.exports = run;