const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
import { GoogleGenAI } from '@google/genai';

async function main(prompt) {
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  const config = { responseMimeType: 'text/plain' };
  const model = 'gemini-1.5-flash';

  const contents = [
    { role: 'user', parts: [{ text: prompt }] },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let fullResponse = '';
  for await (const chunk of response) {
    fullResponse += chunk.text || '';
  }

  return `<p>${fullResponse}</p>`;
}

export default main;
