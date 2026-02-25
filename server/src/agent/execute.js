import { getWeather } from "../tools/getWeather.js";
import { getForecast } from "../tools/getForecast.js";

const tools = {
  getWeather,
  getForecast
};

export async function executePlan(plan) {
  const results = [];

  for (const step of plan) {
    const { tool, input } = step;

    if (!tools[tool]) {
      results.push({
        tool,
        input,
        error: "Tool not found",
      });
      continue;
    }

    try {
      const output = await tools[tool](input);

      results.push({
        tool,
        input,
        output,
      });

    } catch (error) {
      results.push({
        tool,
        input,
        error: error.message,
      });
    }
  }

  return results;
}