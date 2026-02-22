import { createPlan } from "./planner.js";
import { executePlan } from "./execute.js";
import { observeResult } from "./observer.js";
import { generateFinalAnswer } from "./synthesizer.js";

export async function weatherAgent(goal) {
  let iteration = 0;
  const maxIterations = 3;

  let plan;
  let executionData = {};
  let observation = "";

  while (iteration < maxIterations) {

    plan = await createPlan(goal, observation);

    executionData = await executePlan(plan);

    observation = await observeResult(
      goal,
      executionData
    );

    if (
      observation.toLowerCase().includes("enough") ||
      observation.toLowerCase().includes("sufficient")
    ) {
      break;
    }
    iteration++;
  }

  const finalAnswer = await generateFinalAnswer(
    goal,
    observation,
    executionData
  );

  return {
    iterations: iteration + 1,
    finalPlan: plan,
    executionData,
    observation,
    finalAnswer,
  };
}