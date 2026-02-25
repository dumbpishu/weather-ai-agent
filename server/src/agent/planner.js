import { generateWithFallback } from "../config/gemini.js";

export async function createPlan(goal, previousObservation = "") {
  const prompt = `
        You are an autonomous Weather AI agent.

        User Goal:
        ${goal}

        Previous Observation:
        ${previousObservation}

        Available tools:
        1. getWeather(city) → Current weather
        2. getForecast(city) → 5 day forecast with rain data

        Tool usage rules:
        - Use getWeather for current weather.
        - Use getForecast for future or rain queries.
        - If multiple cities are mentioned, create separate steps for each city.

        Create a step-by-step execution plan.

        Return STRICT JSON array only:

        [
          {
              "tool": "toolName",
              "input": { "city": "cityName" }
          }
        ]

        No explanation. Only JSON.
    `;

  const text = await generateWithFallback(prompt);

  const raw = text.trim();

  const match = raw.match(/\[.*\]/s);

  if (!match) {
    throw new Error("Planner did not return valid JSON");
  }

  return JSON.parse(match[0]);
}