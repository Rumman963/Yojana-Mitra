import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_MODEL;

if (!apiKey || !model) {
  throw new Error("GEMINI_API_KEY or GEMINI_MODEL is missing in .env");
}

const ai = new GoogleGenAI({ apiKey: apiKey });

async function main() {
  const interaction = await ai.interactions.create({
    model: model!,
    input: "Say hello in Hindi in one short sentence.",
  });

  console.log(interaction.output_text);
}

main();