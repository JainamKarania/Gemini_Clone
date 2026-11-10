
import { createContext, useState } from "react";
import main from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input , setInput] = useState("");
    const [recentPrompt , setRecentPrompt] = useState("");
    const [prevPrompts , setPrevPrompts] = useState([]);
    const [response , setResponse] = useState(false);
    const [loading , setLoading] = useState(false);
    const [responseData , setResponseData] = useState("");

    const delaypara = (index , nextword) => {
      setTimeout(function(){
        setResponseData(prev => prev + nextword);
      },75*index);
    }

    const newChat = () => {
  setLoading(false);
  setResponse(false);

  setInput("");        
  setRecentPrompt(""); 
  setResponseData("");
};


    
    const onSent = async (rawPrompt) => {
  const prompt = (rawPrompt ?? input).trim();
  if (!prompt) return;               

  setLoading(true);
  setResponse(true);
  setResponseData("");
  setRecentPrompt(prompt);


  setPrevPrompts(prev =>
    prev[0] === prompt ? prev : [prompt, ...prev.filter(p => p !== prompt)]
  );

  try {
    const res = await main(prompt);

    
    const boldConverted = res
      .split("**")
      .map((part, i) => (i % 2 ? `<b>${part}</b>` : part))
      .join("");
    const lineBreaks = boldConverted.replace(/\*/g, "<br/>");
    const words = lineBreaks.split(" ");

    // type‑writer effect
    for (let i = 0; i < words.length; i++) {
      await new Promise(r => setTimeout(r, 75));
      setResponseData(prev => prev + words[i] + " ");
    }
  } finally {
    setLoading(false);
    setInput("");
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
      newChat
    };

    return (
        <Context.Provider value={contextValue}>
        {props.children}
        </Context.Provider>
    );
  }
export default ContextProvider;    