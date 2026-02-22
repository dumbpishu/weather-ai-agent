import { openai } from "../config/openai.js";
import fs from "fs";

export const speechToText = async (filePath) => {
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(filePath),
        model: "gpt-4o-transcribe"
    });

    return transcription.text;
}