import React, { useState } from "react";

const LandingPage = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      // Replace with your backend API call
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      setResponse("Oops! Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex flex-col items-center justify-center px-6 py-12 text-white">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-center">
        Welcome to <span className="text-yellow-300">GForce</span>
      </h1>
      <p className="text-lg md:text-xl max-w-3xl mb-12 text-center">
        Harness the power of Gemini AI to get instant, smart responses to your prompts.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col md:flex-row gap-4"
      >
        <input
          type="text"
          placeholder="Type your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-grow rounded-md p-4 text-gray-900 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-yellow-300 text-indigo-900 font-bold rounded-md px-6 py-4 hover:bg-yellow-400 transition"
        >
          {loading ? "Thinking..." : "Ask Gemini"}
        </button>
      </form>

      {response && (
        <div className="mt-10 bg-white bg-opacity-20 rounded-lg p-6 max-w-2xl whitespace-pre-wrap text-indigo-900 font-medium">
          <h3 className="mb-2 font-semibold text-yellow-300">Response:</h3>
          <div>{response}</div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
