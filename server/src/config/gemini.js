import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const MODELS = [
  process.env.MODEL1,
  process.env.MODEL2,
];


const modelState = {
  [process.env.MODEL1]: { failed: false, lastFailure: 0 },
  [process.env.MODEL2]: { failed: false, lastFailure: 0 },
};

const COOLDOWN = 2 * 60 * 1000; // 2 minute cooldown

export async function generateWithFallback(prompt) {
  let lastError;

  for (const model of MODELS) {
    const state = modelState[model];

    // Skip model if recently failed
    if (state.failed && Date.now() - state.lastFailure < COOLDOWN) {
      continue;
    }

    try {
      const res = await ai.models.generateContent({
        model,
        contents: prompt,
      });

      if (!res?.text) {
        throw new Error("Empty response");
      }

      // Mark model healthy again
      state.failed = false;
      return res.text;

    } catch (error) {
      console.warn(`${model} failed`);
      state.failed = true;
      state.lastFailure = Date.now();
      lastError = error;
    }
  }

  throw new Error(
    `All models failed: ${lastError?.message}`
  );
}