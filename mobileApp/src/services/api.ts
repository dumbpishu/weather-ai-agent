export const sendRequestToBackend = async (text: string) => {
    const res = await fetch("https://weather-ai-agent-iw5p.onrender.com/agent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ q: text })
    });

    return await res.json();
}