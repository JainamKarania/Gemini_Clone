import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ChatPage from "./pages/ChatPage";
// import AuthPage from "./pages/AuthPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat" element={<ChatPage />} />
      {/* <Route path="/auth" element={<AuthPage />} /> */}
    </Routes>
  );
};

export default App;