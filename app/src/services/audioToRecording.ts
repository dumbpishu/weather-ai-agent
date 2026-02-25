import { Audio } from "expo-av";

export const startRecording = async () => {
    await Audio.requestPermissionsAsync();

    const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);

    return recording;
}

export const stopRecording = async (recording: Audio.Recording) => {
    await recording.stopAndUnloadAsync();
    return recording.getURI();
}