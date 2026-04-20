const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
import { GoogleGenAI } from '@google/genai';

// ✅ Reuse client (don’t recreate every call)
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// ✅ Throttle control
let lastCallTime = 0;
const MIN_DELAY = 2000; // 2 seconds between requests

// ✅ Retry helper with exponential backoff
async function withRetry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (err) {
    if (retries === 0) throw err;

    console.warn('Retrying after error:', err.message);

    await new Promise((res) => setTimeout(res, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
}

async function main(prompt) {
  // ✅ Throttle check
  const now = Date.now();
  if (now - lastCallTime < MIN_DELAY) {
    throw new Error('Rate limit: Too many requests. Please wait a moment.');
  }
  lastCallTime = now;

  const config = { responseMimeType: 'text/plain' };

  // ✅ Use lighter model (important for free tier)
  const model = 'gemini-2.5-flash';

  const contents = [
    { role: 'user', parts: [{ text: prompt }] },
  ];

  // ✅ Wrap API call with retry logic
  const responseStream = await withRetry(() =>
    ai.models.generateContentStream({
      model,
      config,
      contents,
    })
  );

  let fullResponse = '';

  try {
    for await (const chunk of responseStream) {
      if (chunk.text) {
        fullResponse += chunk.text;
      }
    }
  } catch (streamErr) {
    console.error('Stream error:', streamErr);
    throw new Error('Error while receiving response stream');
  }

  // ⚠️ Keep plain text (safer). Format later in UI if needed
  return fullResponse;
}

export default main;