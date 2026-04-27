import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AIFeatures from "../components/AIFeatures";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Fix white split/background from body default styles
    document.body.style.margin = "0";
    document.body.style.backgroundColor = "#020617";
    document.documentElement.style.backgroundColor = "#020617";
    document.body.style.overflowX = "hidden";

    return () => {
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
      document.body.style.overflowX = "";
    };
  }, []);

  const handleStart = () => navigate("/chat");

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#020617] text-white">
      <Navbar />

      <main className="flex flex-col w-full">
        <Hero onGetStarted={handleStart} />
        <AIFeatures />
        <CTA onGetStarted={handleStart} />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;