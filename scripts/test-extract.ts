import "dotenv/config";
import { extractProfile } from "../src/lib/llm";

const sentences = [
  "I am a 45 year old farmer from Uttar Pradesh, SC category, income 1.5 lakh per year",
  "मैं 20 साल की छात्रा हूँ, बिहार में रहती हूँ",
  "I need help with some scheme",
];

for (const sentence of sentences) {
  console.log("---", sentence);
  const profile = await extractProfile(sentence);
  console.log(profile);
}