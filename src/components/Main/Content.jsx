import React from "react";
import { useContext } from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaCompass,
  FaGlobe,
  FaLightbulb,
  FaUser,
} from "react-icons/fa";
import user from "../../assets/avatar.avif";
import { MdBrowseGallery, MdMic, MdPhoto, MdSend } from "react-icons/md";
import { Context } from "../../context/Context";
import { GiGemini, GiLion, GiTigerHead } from "react-icons/gi";

const Content = () => {
  const {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    response,
    loading,
    responseData,
    input,
    setInput,
  } = useContext(Context);

  return (
    <div className="flex-1 min-h-screen pb-[15vh] relative w-full">
      <div className="flex items-center justify-between text-xl p-5 text-[#585858]">
        <p>GForce</p>
        <img
          src={user}
          alt=""
          className="w-10 h-10 object-contain rounded-[50%]"
        />
      </div>
      <div className="container max-w-4xl w-full mx-auto">
        {!response ? (
          <>
            <div className="flex flex-col py-2">
              <div className="md:text-6xl text-lg font-medium text-[#c4c7c5] p-5 flex flex-col gap-6">
                <p>
                  <span className="bg-gradient-to-r from-[#4b90ff] to-[#ff5546] text-transparent bg-clip-text font-semibold">
                    Howdy Mate
                  </span>
                </p>
                <p className="">What can I do for you today?</p>
              </div>
              <div className="grid md:grid-cols-4 grid-cols-1 gap-4 p-5">
                <div className="relative p-4 bg-[#f0f4f9] rounded-xl gap-4 cursor-pointer h-28">
                  <p className="text-gray-400 font-medium text-sm">
                    Explore opportunities tailored for your goals.
                  </p>
                  <FaCompass className="w-8 h-8 p-1 absolute text-blue-500 rounded-2xl bottom-2.5 right-2.5" />
                </div>
                {/* Start Building Card */}

                <div className="relative p-4 bg-[#f0f4f9] rounded-xl gap-4 cursor-pointer h-28">
                  <p className="text-gray-400 font-medium text-sm">
                    Get ideas and inspiration for your projects.
                  </p>
                  <FaLightbulb className="w-8 h-8 p-1 absolute text-yellow-500 rounded-2xl bottom-2.5 right-2.5" />
                </div>

                {/* Create Website Card */}

                <div className="relative p-4 bg-[#f0f4f9] rounded-xl gap-4 cursor-pointer h-28">
                  <p className="text-gray-400 font-medium text-sm">
                    Start building websites or applications today.
                  </p>
                  <FaCode className="w-8 h-8 p-1 absolute text-black rounded-2xl bottom-2.5 right-2.5" />
                </div>

                {/* Search Globally Card */}

                <div className="relative p-4 bg-[#f0f4f9] rounded-xl gap-4 cursor-pointer h-28">
                  <p className="text-gray-400 font-medium text-sm">
                    Search across the world with our powerful tools.
                  </p>
                  <FaGlobe className="w-8 h-8 p-1 absolute text-green-500 rounded-2xl bottom-2.5 right-2.5" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-6 px-4 py-6">
            {/* USER PROMPT (right‑aligned) */}
            <div className="flex items-start justify-end gap-3">
              {/* prompt bubble */}
              <div className="bg-[#e0e7ff] dark:bg-[#2c2c3e] px-4 py-3 rounded-2xl max-w-[80%] shadow-sm order-1">
                <p className="text-sm text-gray-800 dark:text-gray-200 break-words">
                  {recentPrompt}
                </p>
              </div>
              {/* user avatar */}
              <img
                src={user}
                alt="User avatar"
                className="w-8 h-8 object-cover rounded-full order-2"
              />
            </div>

            {/* AI RESPONSE (left‑aligned) */}
            <div className="flex items-start gap-3">
              {/* animated bot avatar */}
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                  duration: 2.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-md shrink-0"
              >
                <GiTigerHead className="w-5 h-5" />
              </motion.div>

              {/* AI bubble */}
              <div className="bg-[#f8fafc] dark:bg-[#1f2937] px-4 py-3 rounded-2xl max-w-[90%] shadow-md text-sm text-gray-800 dark:text-gray-100 leading-relaxed">
                {loading ? (
                  /* Typing dots animation */
                  <div className="flex gap-1">
                    {["", "", ""].map((_, i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.15, // stagger the three dots
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  /* The real response once ready */
                  <div dangerouslySetInnerHTML={{ __html: responseData }} />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full p-5 mx-auto max-w-4xl">
          <div className="flex items-center justify-between bg-[#f0f4f9] gap-5 px-2 py-4 rounded-[50px]">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="flex-1 bg-transparent border-none outline-none text-sm"
              type="text"
              placeholder="Ask anything..."
            />
            <div className="flex items-center gap-2">
              <MdPhoto className="w-6 cursor-pointer" />
              <MdMic className="w-6 cursor-pointer" />
              <MdSend onClick={() => onSent()} className="w-6 cursor-pointer" />
            </div>
          </div>
          <p className="text-sm mt-3 mb-0 text-center font-light">
            Gforce may display inaccurate information about people, places, or
            things.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
