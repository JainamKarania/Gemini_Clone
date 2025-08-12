import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = ({ onGetStarted }) => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(headingRef.current, {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        paraRef.current,
        { y: 30, opacity: 0, duration: 1, ease: "power3.out" },
        "-=0.6"
      )
      .from(
        contentRef.current,
        { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );
  }, []);

  return (
    <section id="home" className="flex flex-col items-center min-h-screen justify-center flex-grow text-center px-6 pt-28">
      <h1
        ref={headingRef}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 max-w-4xl"
      >
        Welcome to GForce
      </h1>
      <p
        ref={paraRef}
        className="max-w-3xl mb-12 text-base sm:text-lg md:text-xl"
      >
        Harness Gemini AI’s power to get smart responses instantly.
      </p>

      <div
        ref={contentRef}
        className="max-w-3xl text-left bg-white text-black bg-opacity-80 rounded-md p-6 shadow-lg backdrop-blur-sm"
      >
        <h2 className="text-2xl font-semibold mb-4">What is GForce?</h2>
        <p className="text-sm sm:text-base leading-relaxed">
          GForce is a powerful AI platform that leverages the Gemini model to
          deliver smart, instant responses to your queries. Whether you're
          seeking creative ideas, technical help, or everyday solutions, GForce
          is your trusted AI companion.
        </p>
      </div>

      {/* Button below content */}
      <button
        onClick={onGetStarted}
        className="mt-10 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400
          rounded-md px-10 py-4 font-bold text-white hover:text-black
          transition border-4 border-transparent hover:border-yellow-400"
      >
        Get Started
      </button>
    </section>
  );
};

export default Hero;
