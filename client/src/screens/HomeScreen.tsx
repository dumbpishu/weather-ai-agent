import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { sendRequestToBackend } from "../services/api";
import { speak } from "../services/textToSpeech";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await sendRequestToBackend(query);
      const output = res.output || "No response from server";
      setAnswer(output);
      speak(output);
    } catch (error) {
      console.log(error);
      setAnswer("Something went wrong");
      speak("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>Weather AI</Text>
          <Text style={styles.subtitle}>
            Smart weather assistant powered by AI
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Ask about today's weather, forecast, temperature..."
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            style={styles.input}
            multiline
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSend}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Ask AI</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Response Section */}
        {answer ? (
          <View style={styles.responseCard}>
            <Text style={styles.responseLabel}>AI Response</Text>
            <Text style={styles.responseText}>{answer}</Text>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: "flex-start",
    alignSelf: "center",
    width: "100%",
    maxWidth: 600, 
  },
  header: {
    marginBottom: 30,
    marginTop: 60
  },
  appName: {
    fontSize: 34,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 6,
  },
  inputContainer: {
    backgroundColor: "#F9FAFB",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  input: {
    minHeight: 100,
    fontSize: 16,
    color: "#111827",
    textAlignVertical: "top",
    padding: 10,
    borderRadius: 10
  },
  button: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  responseCard: {
    marginTop: 30,
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  responseLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#111827",
  },
});