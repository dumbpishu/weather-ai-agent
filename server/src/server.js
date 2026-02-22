import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import { weatherAgent } from "./agent/agent.js";

const app = express();
const PORT = process.env.PORT || 3000;
const clinet_uri = process.env.CLIENT_URI;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: clinet_uri }))

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

    if (!goal) {
      return res.status(400).json({
        success: false,
        message: "user query is required."
      })
    }

    const result = await weatherAgent(goal);

    return res.status(200).json({
      success: true,
      input: goal,
      output: result.finalAnswer
    })
  } catch (error) {
    console.log("Agent Error: ", error);

    return res.status(500).json({
      success: false,
      error: "Try after sometimes"
    })
  }
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Weather AI Agent Server is Running on PORT: ${PORT}`)
});