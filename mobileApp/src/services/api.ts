export const sendAudioToBackend = async (uri: string) => {
    const formData = new FormData();

    formData.append("audio", {
        uri,
        name: "voice.m4a",
        type: "audio/m4a"
    } as any);

    const res = await fetch("https://weather-ai-agent-iw5p.onrender.com/agent", {
        method: "POST",
        body: formData,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return await res.json();
}