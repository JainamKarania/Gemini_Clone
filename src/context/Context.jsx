import { createContext, useRef, useState } from "react";
import { streamMain } from "../config/gemini";

export const Context = createContext();

// Formats the FULL raw text every time. Formatting per chunk would break
// when "**" gets split across two chunks.
const formatResponse = (raw) => {
  const escaped = raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .split("**")
    .map((part, i) => (i % 2 ? `<b>${part}</b>` : part))
    .join("")
    .replace(/\*/g, "<br/>");
};

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState("");
  const abortRef = useRef(null);

  const newChat = () => {
    abortRef.current?.abort(); // stop any stream still running
    setLoading(false);
    setResponse(false);
    setInput("");
    setRecentPrompt("");
    setResponseData("");
  };

  const onSent = async (rawPrompt) => {
    const prompt = (rawPrompt ?? input).trim();
    if (!prompt) return;

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setResponse(true);
    setResponseData("");
    setRecentPrompt(prompt);
    setPrevPrompts((prev) =>
      prev[0] === prompt ? prev : [prompt, ...prev.filter((p) => p !== prompt)]
    );

    let raw = "";
    try {
      await streamMain(
        prompt,
        (chunk) => {
          raw += chunk;
          setLoading(false); // hide the loader as soon as text starts arriving
          setResponseData(formatResponse(raw));
        },
        controller.signal
      );
    } catch (err) {
      if (err.name === "AbortError") return;
      setResponseData(`<i>${formatResponse(err.message)}</i>`);
    } finally {
      if (abortRef.current === controller) {
        setLoading(false);
        setInput("");
      }
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    response,
    loading,
    responseData,
    input,
    setInput,
    newChat,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;