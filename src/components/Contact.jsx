import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import AIContact from "../assets/AIcontact.jpg"; // Adjust the path as necessary
const Contact = () => {
  const formRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(formRef.current, {
      x: -50,
      opacity: 0,
      duration: 1,
    }).from(
      imageRef.current,
      {
        x: 50,
        opacity: 0,
        duration: 1,
      },
      "-=0.7"
    );
  }, []);

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-16 container w-full">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Form Section */}
        <div
          ref={formRef}
          className="flex-1 bg-white rounded-lg shadow-lg p-8 max-w-xl md:w-1/2 w-full"
        >
          <h2 className="text-3xl font-bold mb-6 text-indigo-900">
            Get in Touch
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submitted! (Add your own logic)");
            }}
            className="flex flex-col gap-5"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              className="border text-black border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="border text-black border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Your Message"
              required
              rows={5}
              className="border text-black border-gray-300 rounded-md px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Image / Avatar Section */}
        <div
          ref={imageRef}
          className="flex-1 md:w-1/2 w-full rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src={AIContact}
            alt="Contact Avatar"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
