import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { weatherAgent } from "./agent/agent.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "Weather AI Agent",
    timestamp: new Date().toISOString(),
  });
});


app.post("/agent", async (req, res) => {
  try {
    const { q: goal } = req.body;

    if (!goal || typeof goal !== "string") {
      return res.status(400).json({
        success: false,
        error: "Goal is required and must be a string.",
      });
    }

    const result = await weatherAgent(goal);

    return res.status(200).json({
      success: true,
      data: result.finalAnswer,
    });
  } catch (error) {
    console.error("Agent Error:", error.message);

    return res.status(500).json({
      success: false,
      error: "Try after sometimes",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Weather AI Agent Server is Running on PORT: ${PORT}`)
});