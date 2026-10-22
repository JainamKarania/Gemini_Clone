import { ai, MODELS} from "../config/gemini.js";

const RETRYABLE = [429, 500, 503];

async function withRetry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (err) {
    const status = err.status || err.code;
    if (retries === 0 || !RETRYABLE.includes(status)) throw err;
    await new Promise((r) => setTimeout(r, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
}

async function startStream(contents) {
  let lastErr;
  for (const model of MODELS) {
    try {
      return await withRetry(
        () =>
          ai.models.generateContentStream({
            model,
            config: { responseMimeType: "text/plain" },
            contents,
          }),
        2,
        1000
      );
    } catch (err) {
      lastErr = err;
      if (!RETRYABLE.includes(err.status || err.code)) throw err; // only fall back on overload errors
      console.warn(`${model} unavailable, trying next model`);
    }
  }
  throw lastErr;
}

function toClientError(err) {
  const status = err.status || err.code;
  if (status === 429) return { status: 429, error: "Too many requests, try again shortly." };
  if (status === 503) return { status: 503, error: "The AI is busy right now. Please try again in a moment." };
  return { status: 500, error: "Failed to get a response." };
}

export async function streamMessage(req, res) {
  const { prompt } = req.body;

  if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 8000) {
    return res.status(400).json({ error: "Prompt must be 1-8000 characters." });
  }

  let aborted = false;
  res.on("close", () => (aborted = true));

  try {
    // Retries only cover starting the stream, so failures here still return a normal HTTP error
    const stream = await startStream([{ role: "user", parts: [{ text: prompt }] }]);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    for await (const chunk of stream) {
      if (aborted) break; // client left, stop paying for tokens
      if (chunk.text) res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
    }

    if (!aborted) res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Gemini stream error:", err.message);
    const status = err.status === 429 ? 429 : 500;
    const message =
      status === 429 ? "Too many requests, try again shortly." : "Failed to get a response.";

    if (!res.headersSent) return res.status(status).json({ error: message });
    res.write(`data: ${JSON.stringify({ error: message })}\n\n`); // failed mid-stream
    res.end();
  }
}



export async function sendMessage(req, res) {
  const { prompt } = req.body;

  if (typeof prompt !== "string" || !prompt.trim() || prompt.length > 8000) {
    return res.status(400).json({ error: "Prompt must be 1-8000 characters." });
  }

  try {
    const stream = await startStream([{ role: "user", parts: [{ text: prompt }] }]);

    let text = "";
    for await (const chunk of stream) {
      if (chunk.text) text += chunk.text;
    }
    res.json({ text });
  } catch (err) {
    console.error("Gemini error:", err.message);
    const { status, error } = toClientError(err);
if (!res.headersSent) return res.status(status).json({ error });
res.write(`data: ${JSON.stringify({ error })}\n\n`);
res.end();
  }
}