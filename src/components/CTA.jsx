import React, { useEffect, useRef } from "react";
import { MdArrowForward } from "react-icons/md";
import gsap from "gsap";

const CTA = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.from(headingRef.current, { y: 30, opacity: 0, duration: 1 })
      .from(paraRef.current, { y: 30, opacity: 0, duration: 1 }, "-=0.7")
      .from(buttonRef.current, { scale: 0.8, opacity: 0, duration: 0.6 }, "-=0.5");
  }, []);

  return (
    <section className="max-w-7xl mx-auto container rounded-4xl bg-gradient-to-br from-white via-slate-200 to-neutral-700 text-black py-12 px-6 text-center mb-20">
      <h2
        ref={headingRef}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 max-w-4xl mx-auto drop-shadow-md"
      >
        Ready to elevate your AI experience?
      </h2>
      <p
        ref={paraRef}
        className="max-w-xl mx-auto text-lg sm:text-xl font-medium drop-shadow-sm"
      >
        Get started today and explore what GForce AI can do for you.
      </p>

      {/* <button
        ref={buttonRef}
        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-semibold px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none"
      >
        Get Started <MdArrowForward size={24} />
      </button> */}
    </section>
  );
};

export default CTA;
