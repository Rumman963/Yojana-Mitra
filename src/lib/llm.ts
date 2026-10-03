import { GoogleGenAI } from "@google/genai";
import { profileSchema } from "./profile-schema";
import type { Profile } from "./matcher";

const INSTRUCTIONS = `You read a short description of a person (English or Hindi) and extract facts about them.
Reply with ONLY a JSON object. No explanation, no markdown.

Allowed fields (leave out any field the text does not clearly state):
- "age": number
- "state": full Indian state name in English, like "Uttar Pradesh"
- "gender": one of "MALE", "FEMALE", "OTHER"
- "annualIncome": yearly income in rupees as a number (1 lakh = 100000; if monthly, multiply by 12)
- "socialCategory": one of "GENERAL", "OBC", "SC", "ST"
- "occupation": one lowercase English word, like "farmer" or "student"

Never guess. If a fact is not in the text, leave the field out.`;

export async function extractProfile(text: string): Promise<Profile | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL;

  if (!apiKey || !model) {
    throw new Error("GEMINI_API_KEY or GEMINI_MODEL is missing");
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  // 1. Ask the model
  const interaction = await ai.interactions.create({
    model: model,
    input: INSTRUCTIONS + "\n\nText:\n" + text,
  });

  // 2. Clean the reply (models sometimes wrap JSON in code fences)
  const raw = interaction.output_text ?? "";
  const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();

  // 3. Turn the text into an object
  let data;
  try {
    data = JSON.parse(cleaned);
  } catch {
    return null;
  }

  // 4. Check it matches our profile rules
  const parsed = profileSchema.safeParse(data);
  if (!parsed.success) {
    return null;
  }

  return parsed.data;
}