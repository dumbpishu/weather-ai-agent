import { generateWithFallback } from "../config/gemini.js";

export async function generateFinalAnswer(
  goal,
  observation,
  executionData
) {
  const prompt = `
        You are a Weather AI assistant.

        User Goal:
        ${goal}

        Execution Data:
        ${JSON.stringify(executionData, null, 2)}

        Agent Observation:
        ${observation}

        Instructions for answers

        - Answer should not be long
        - Answer to the point and what is important only
        - Answer should be less then 3 sentence

        Instructions for response formatting:

        - Return response in plain text.
        - Do NOT use markdown.
        - Do NOT use asterisks (*).
        - Do NOT bold or italicize words.
        - Do NOT use bullet points unless necessary.
        - Write in clear professional sentence format.
        - Keep response natural and human readable.

        Generate the final helpful response.
        Give recommendations if relevant.
    `;

  const text = await generateWithFallback(prompt);

  return text.trim();
}