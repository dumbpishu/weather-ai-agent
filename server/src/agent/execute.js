import { getWeather } from "../tools/getWeather.js";
import { getForecast } from "../tools/getForecast.js";

const tools = {
  getWeather,
  getForecast
};

export async function executePlan(plan) {
  const results = {};

  for (const step of plan) {
    const { tool, input } = step;

    try {
      results[tool] = await tools[tool](
        ...Object.values(input)
      );
    } catch (error) {
      console.error(
        `Tool ${tool} failed:`,
        error.message
      );

      results[tool] = {
        error: error.message,
      };
    }
  }

  return results;
}