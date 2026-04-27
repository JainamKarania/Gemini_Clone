import React from "react";
import { MdArrowForward } from "react-icons/md";
import { motion } from "framer-motion";

const CTA = ({ onGetStarted }) => {
  return (
    <section
      id="cta"
      className="relative px-6 py-24 bg-[#020617] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/10 blur-[130px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-6xl mx-auto rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-2xl px-8 md:px-16 py-16 text-center shadow-2xl"
      >
        <p className="text-cyan-400 uppercase tracking-[0.25em] text-sm font-semibold mb-4">
          Start Today
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-4xl mx-auto"
        >
          Ready to Experience the Power of{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Gemini AI?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 max-w-2xl mx-auto text-gray-300 text-base sm:text-lg"
        >
          Unlock smarter conversations, instant answers, and next-generation AI
          productivity with GForce AI.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          animate={{ y: [0, -6, 0] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetStarted}
          className="mt-10 inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg transition duration-300"
        >
          Try GForce Now
          <MdArrowForward size={22} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CTA;