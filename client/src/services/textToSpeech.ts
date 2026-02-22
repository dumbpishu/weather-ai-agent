import * as Speech from "expo-speech";

export const speak = (text: string) => {
  Speech.speak(text, {
    language: "en",
    pitch: 1,
    rate: 1,
  });
};