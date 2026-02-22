import { View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";
import { startRecording, stopRecording } from "../services/audioRecording";
import { sendAudioToBackend } from "../services/api";
import { speak } from "../services/textToSpeech";
import { Audio } from "expo-av";

export default function HomeScreen() {
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [loading, setLoading] = useState(false);

    const handleStart = async () => {
        const rec = await startRecording();
        setRecording(rec);
    }

    const handleStop = async () => {
        if (!recording) return;

        setLoading(true)
        const uri = await stopRecording(recording);
        setRecording(null);

        if (!uri) return;

        try {
            const res = await sendAudioToBackend(uri);
            const answer = res.data || "No Response";

            speak(answer);
        } catch (error) {
            speak("Something went wrong")
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weather Voice Assistant</Text>

            <View style={styles.space} />

            <Button
                title="🎤 Start Recording"
                onPress={handleStart}
            />

            <View style={styles.space} />

            <Button
                title="⏹ Stop & Send"
                onPress={handleStop}
            />

            <View style={styles.space} />

            {loading && (
                <Text style={styles.loading}>
                Processing voice...
                </Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", 
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222", 
  },

  loading: {
    marginTop: 20,
    fontSize: 16,
    color: "#555",
  },

  space: {
    height: 15,
  },
});