import React from "react";
import {
  MdSpeed,
  MdSecurity,
  MdAutoAwesome,
  MdOutlinePsychology,
} from "react-icons/md";
import { FaRobot, FaBolt } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaRobot size={38} className="text-cyan-400" />,
    title: "Gemini Powered Intelligence",
    description:
      "Built on Google's Gemini model to deliver accurate, context-aware, and smart prompt responses instantly.",
  },
  {
    icon: <MdSpeed size={38} className="text-purple-400" />,
    title: "Lightning Fast Results",
    description:
      "Get responses in seconds with an optimized AI workflow designed for speed and performance.",
  },
  {
    icon: <MdOutlinePsychology size={38} className="text-cyan-400" />,
    title: "Prompt Understanding",
    description:
      "Interprets your prompts naturally and returns relevant, structured, and useful answers.",
  },
  {
    icon: <MdSecurity size={38} className="text-purple-400" />,
    title: "Secure Experience",
    description:
      "Your interactions stay protected with a privacy-focused and reliable AI environment.",
  },
  {
    icon: <MdAutoAwesome size={38} className="text-cyan-400" />,
    title: "Creative Assistance",
    description:
      "Generate ideas, content, code, plans, and solutions whenever inspiration is needed.",
  },
  {
    icon: <FaBolt size={38} className="text-purple-400" />,
    title: "Future Ready Platform",
    description:
      "Designed to scale with upcoming AI upgrades, features, and modern use cases.",
  },
];

const AIFeatures = () => {
  return (
    <section
      id="features"
      className="relative py-24 px-6 bg-[#020617] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-600/10 blur-[130px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-400 font-semibold tracking-widest uppercase mb-3">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Powerful Features of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              GForce AI
            </span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Experience next-generation AI responses powered by Gemini with speed,
            intelligence, creativity, and reliability.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: "easeOut",
              }}
              whileHover={{ y: -8 }}
              className="group bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-7 hover:border-cyan-400/30 transition-all duration-300 shadow-xl"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-5 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center"
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;