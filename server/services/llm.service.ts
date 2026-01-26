import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";

const genAI = new GoogleGenerativeAI(env.geminiKey || "");

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function generateInsights(prompt: string): Promise<string> {
  if (!env.geminiKey) {
    throw new Error("GEMINI_API_KEY is not defined");
  }

  const result = await model.generateContent(prompt);
  const response = result.response;

  return response.text();
}
