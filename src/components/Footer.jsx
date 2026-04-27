import React from "react";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      const navbarHeight = 80;

      const top =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#020617] text-white px-6 pt-16 pb-8 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-purple-600/10 blur-[130px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold">
              GForce{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                AI
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-400 leading-relaxed max-w-md mx-auto md:mx-0">
              Smart AI assistant powered by Gemini to generate ideas, answers,
              code, and productivity solutions instantly.
            </p>
          </div>

          {/* Navigation */}
          <div className="text-center md:text-right">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>

            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm sm:text-base text-gray-400">
              <button
                onClick={() => scrollToSection("home")}
                className="hover:text-cyan-400 transition"
              >
                Home
              </button>

              <button
                onClick={() => scrollToSection("features")}
                className="hover:text-cyan-400 transition"
              >
                Features
              </button>

              <button
                onClick={() => scrollToSection("cta")}
                className="hover:text-cyan-400 transition"
              >
                Get Started
              </button>

              {/* <button
                onClick={() => scrollToSection("contact")}
                className="hover:text-cyan-400 transition"
              >
                Contact
              </button> */}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-sm text-gray-400 text-center sm:text-left">
            © {year} GForce AI. All rights reserved.
          </p>

          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("home")}
            className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center transition duration-300"
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;