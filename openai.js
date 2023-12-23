const OpenAI = require('openai');
const dotenv = require("dotenv");
const OPENAI_CHAT = require('./openai-chat-config.json');

dotenv.config({ path: ".env" });
const API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: API_KEY });

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: OPENAI_CHAT['config'] },
        ...OPENAI_CHAT['chats']
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion['choices'][0]['message']['content']);
}

module.exports = main;