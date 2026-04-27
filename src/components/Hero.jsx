import React from "react";
import { motion } from "framer-motion";

const Hero = ({ onGetStarted }) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 pt-28 overflow-hidden bg-[#020617] text-white"
    >
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/20 blur-[140px] rounded-full"></div>

      {/* Floating Orb */}
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-32 right-10 md:right-24 w-28 h-28 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 blur-xl opacity-60"
      />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Ask Smarter. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              Get Gemini Answers.
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-xl"
          >
            GForce AI uses Gemini’s pre-trained intelligence to generate fast,
            relevant, and smart responses for your prompts in seconds.
          </motion.p>

          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetStarted}
            className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold text-white shadow-lg transition duration-300"
          >
            Start Chatting
          </motion.button>
        </div>

        {/* Right AI Preview Card */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="bg-white/10 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl"
        >
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300">
              <span className="text-cyan-400 font-semibold">You:</span> Give me
              startup ideas in 2026
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-4 text-sm text-white">
              <span className="text-purple-300 font-semibold">GForce AI:</span>{" "}
              AI Tutor Marketplace, Smart Resume Builder, Hyperlocal Delivery
              SaaS...
            </div>

            <div className="bg-white/5 rounded-xl p-4 text-sm text-gray-300">
              <span className="text-cyan-400 font-semibold">You:</span> Create a
              React landing page
            </div>

            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-4 text-sm text-white">
              <span className="text-purple-300 font-semibold">GForce AI:</span>{" "}
              Generating responsive modern UI with animations...
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;