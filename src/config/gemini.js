const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

async function main(prompt) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data.text;
}

export default main;

export async function streamMain(prompt, onChunk, signal) {
  const res = await fetch(`${API_URL}/api/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
    signal,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Request failed");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop(); // keep any incomplete event for the next read

    for (const evt of events) {
      if (!evt.startsWith("data: ")) continue;
      const payload = evt.slice(6);
      if (payload === "[DONE]") return;
      const parsed = JSON.parse(payload);
      if (parsed.error) throw new Error(parsed.error);
      onChunk(parsed.text);
    }
  }
}