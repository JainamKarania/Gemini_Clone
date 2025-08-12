import React, { useEffect, useRef } from "react";
import { MdSpeed, MdSecurity, MdOutlineSupportAgent } from "react-icons/md";
import { FaRobot, FaLightbulb } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <FaRobot size={40} className="text-indigo-500" />,
    title: "Intelligent Responses",
    description:
      "GForce provides accurate and context-aware AI responses to your queries instantly.",
  },
  {
    icon: <MdSpeed size={40} className="text-indigo-500" />,
    title: "Lightning Fast",
    description:
      "Experience ultra-fast processing speeds ensuring minimal wait times.",
  },
  {
    icon: <MdSecurity size={40} className="text-indigo-500" />,
    title: "Secure & Private",
    description:
      "Your data and privacy are protected with end-to-end encryption and strict policies.",
  },
  {
    icon: <FaLightbulb size={40} className="text-indigo-500" />,
    title: "Innovative AI Tools",
    description:
      "Access cutting-edge AI features designed to boost creativity and productivity.",
  },
//   {
//     icon: <MdOutlineSupportAgent size={40} className="text-indigo-500" />,
//     title: "24/7 Support",
//     description:
//       "Our team is always available to assist you with any questions or issues.",
//   },
];

const AIFeatures = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          delay: i * 0.15,
        }
      );
    });
  }, []);

  return (
    <section id="why-choose-us" className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-extrabold mb-12 text-white">
        Why Choose GForce AI?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg p-6 shadow-lg border border-white border-opacity-10 hover:shadow-indigo-300 transition-shadow cursor-default"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-indigo-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-indigo-800 text-sm sm:text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AIFeatures;
