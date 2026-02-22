import "dotenv/config";
import express from "express";
import morgan from "morgan";
import { weatherAgent } from "./agent/agent.js";
import { upload } from "./config/multer.js";

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


app.post("/agent", upload.single("audio"), async (req, res) => {
  try {
    let goal;

    // text input
    if (req?.body?.q) {
      goal = req.body.q;
    }

    if (req.file) {
      const { speechToText } = await import("./utils/speechToText.js");
      goal = await speechToText(req.file.path);
    }

    if (!goal) {
      return res.status(400).json({
        success: false,
        message: "Text or audio input required."
      })
    }

    const result = await weatherAgent(goal);

    return res.status(200).json({
      success: true,
      input: goal,
      data: result.finalAnswer
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