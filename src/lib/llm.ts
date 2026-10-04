import { profileSchema } from "./profile-schema";
import type { Profile } from "./matcher";

export const INSTRUCTIONS = `You read a short description of a person (English or Hindi) and extract facts about them.
Reply with ONLY a JSON object. No explanation, no markdown.

Allowed fields (leave out any field the text does not clearly state):
- "age": number
- "state": full Indian state name in English, like "Uttar Pradesh"
- "gender": one of "MALE", "FEMALE", "OTHER"
- "annualIncome": yearly income in rupees as a number (1 lakh = 100000; if monthly, multiply by 12)
- "socialCategory": one of "GENERAL", "OBC", "SC", "ST"
- "occupation": one lowercase English word, like "farmer" or "student"

Never guess. If a fact is not in the text, leave the field out.`;

async function askOpenRouter(prompt: string, model: string): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;

  if (!key) {
    throw new Error("OPENROUTER_API_KEY is missing");
  }

  
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: model,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error("OpenRouter error: " + JSON.stringify(data.error));
  }

  return data.choices?.[0]?.message?.content ?? "";
}

function readProfile(raw: string): Profile | null {
  const cleaned = raw.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    const parsed = profileSchema.safeParse(JSON.parse(cleaned));
    if (parsed.success) {
      return parsed.data;
    }
    return null;
  } catch {
    return null;
  }
}

export async function extractProfile(text: string): Promise<Profile | null> {
  const prompt = INSTRUCTIONS + "\n\nText:\n" + text;

  const modelsText = process.env.OPENROUTER_MODELS ?? "";
  const models = modelsText
    .split(",")
    .map((m) => m.trim())
    .filter((m) => m.length > 0);

  if (models.length === 0) {
    throw new Error("OPENROUTER_MODELS is missing in .env");
  }

  let lastError: unknown = null;

  for (const model of models) {
    try {
      const raw = await askOpenRouter(prompt, model);
      return readProfile(raw);
    } catch (error) {
      console.error("Model failed:", model, error);
      lastError = error;
    }
  }

  throw lastError;
}