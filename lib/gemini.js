
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const dotenv = require("dotenv");
const basePrompt = require('../config/prompt.json');
dotenv.config({ path: ".env" });


const GenAI = new GoogleGenerativeAI(process.env.API_KEY);

const generationConfig = {
  stopSequences: [],
  maxOutputTokens: 200,
  temperature: 1,
  topP: 0.95,
  topK: 16,
};

const safetySettings = [
  /** Assédio */ 
  {
    "category": HarmCategory.HARM_CATEGORY_HARASSMENT,
    "threshold": HarmBlockThreshold.BLOCK_NONE,
  },
  /** Discurso de odio */
  {
    "category": HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    "threshold": HarmBlockThreshold.BLOCK_NONE,
  },
  /**Conteúdo sexualmente explícito */
  {
    "category": HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    "threshold": HarmBlockThreshold.BLOCK_NONE,
  },
  /**Conteúdo perigoso */
  {
    "category": HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    "threshold": HarmBlockThreshold.BLOCK_NONE,
  }
]

module.exports = async function (entry) {
  const model = GenAI.getGenerativeModel({ model: "gemini-pro", generationConfig, safetySettings });
  
  const prompt = `
    ${basePrompt['malphite']}
      
    Agora responda: ${entry}
    `;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
