import { generateWithFallback } from "../config/gemini.js";

export async function observeResult(goal, executionData) {
  const prompt = `
        You are observing an AI agent execution.

        User Goal:
        ${goal}

        Execution Results:
        ${JSON.stringify(executionData, null, 2)}

        Analyze:

        1. Did we get enough data to answer the goal?
        2. If NOT, what is missing?
        3. If YES, confirm sufficiency.

        Reply strictly in text.
    `;

  const text = await generateWithFallback(prompt);

  return text.trim();
}