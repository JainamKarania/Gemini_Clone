import React, { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCompass,
  FaLightbulb,
  FaGlobe,
  FaCode,
} from "react-icons/fa";
import {
  MdPhoto,
  MdMic,
  MdSend,
  MdClose,
} from "react-icons/md";

import { Context } from "../../context/Context";

const cards = [
  {
    title: "Explore opportunities tailored for your goals.",
    icon: <FaCompass className="text-blue-500 text-lg sm:text-xl" />,
  },
  {
    title: "Get ideas and inspiration for your projects.",
    icon: <FaLightbulb className="text-yellow-500 text-lg sm:text-xl" />,
  },
  {
    title: "Start building websites or applications today.",
    icon: <FaCode className="text-violet-500 text-lg sm:text-xl" />,
  },
  {
    title: "Search across the world with powerful tools.",
    icon: <FaGlobe className="text-green-500 text-lg sm:text-xl" />,
  },
];

const Content = () => {
  const {
    onSent,
    recentPrompt,
    response,
    loading,
    responseData,
    input,
    setInput,
  } = useContext(Context);

  /* Session User */
  const [user, setUser] = useState(null);

  /* Modal States */
  const [authOpen, setAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const getInitial = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  const handleAuth = (e) => {
    e.preventDefault();

    const userData = {
      name: form.name || "User",
      email: form.email,
    };

    /* Only Session Storage */
    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    setAuthOpen(false);

    setForm({
      name: "",
      email: "",
      password: "",
    });
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    onSent();
  };

  return (
    <>
      <div className="flex-1 min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 h-16 flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 text-transparent bg-clip-text">
              GForce
            </h1>

            {/* User Session / Login Button */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:block text-sm font-medium text-slate-600">
                  {user.name}
                </span>

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center font-semibold">
                  {getInitial()}
                </div>

                <button
                  onClick={logout}
                  className="text-sm px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="text-sm px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white shadow-md hover:scale-105 transition"
              >
                Login / Signup
              </button>
            )}
          </div>
        </header>

        {/* Main */}
        <main className="w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pt-8 pb-12 min-h-[calc(100vh-64px)] flex flex-col">
  {/* Content Area */}
  <div className="flex-1">
    {!response ? (
      <>
        {/* Hero */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text">
              Howdy {user?.name || "Mate"}
            </span>
          </h2>

          <p className="mt-3 text-base sm:text-xl md:text-2xl text-slate-500">
            What can I do for you today?
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {cards.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 min-h-[160px] flex flex-col justify-between"
            >
              <p className="text-slate-500 text-sm leading-7">
                {item.title}
              </p>

              <div className="flex justify-end">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center">
                  {item.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </>
    ) : (
      <div className="space-y-8 pb-8">
        {/* User Prompt */}
        <div className="flex justify-end gap-3">
          <div className="max-w-[80%] bg-blue-50 border border-blue-100 px-5 py-3 rounded-3xl">
            {recentPrompt}
          </div>

          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white flex items-center justify-center font-semibold shrink-0">
            {getInitial()}
          </div>
        </div>

        {/* AI Response */}
        <div className="flex gap-3 items-start">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white flex items-center justify-center font-bold shrink-0"
          >
            G
          </motion.div>

          <div className="max-w-[85%] bg-white border border-slate-200 px-5 py-4 rounded-3xl shadow">
            {loading ? (
              <div className="flex gap-2">
                {[1, 2, 3].map((dot) => (
                  <motion.span
                    key={dot}
                    className="w-2.5 h-2.5 bg-slate-400 rounded-full"
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.7,
                      delay: dot * 0.12,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: responseData,
                }}
              />
            )}
          </div>
        </div>
      </div>
    )}
  </div>

  {/* Input Area */}
  <div className="mt-10 w-full mx-auto">
    <div className="rounded-3xl border border-slate-200 bg-white shadow-xl px-4 py-2 flex items-end gap-2">
      <textarea
        rows="1"
        placeholder="Message GForce..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        className="flex-1 resize-none bg-transparent outline-none text-sm sm:text-base max-h-32 py-2"
      />

      <div className="flex items-center gap-1 pb-1">
        <button className="p-2 rounded-xl hover:bg-slate-100 transition">
          <MdPhoto className="text-xl text-slate-600" />
        </button>

        <button className="p-2 rounded-xl hover:bg-slate-100 transition">
          <MdMic className="text-xl text-slate-600" />
        </button>

        <button
          onClick={handleSend}
          className="p-2.5 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:scale-105 transition"
        >
          <MdSend className="text-lg" />
        </button>
      </div>
    </div>

    <p className="text-center text-xs text-slate-500 mt-3">
      GForce may display inaccurate information about people, places, or things.
    </p>
  </div>
</main>

        {/* Input */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/90 backdrop-blur-xl">
          {/* <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4">
            <div className="rounded-3xl border border-slate-200 bg-white shadow-xl px-4 py-2 flex items-end gap-2">
              <textarea
                rows="1"
                placeholder="Message GForce..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 resize-none bg-transparent outline-none text-sm sm:text-base max-h-32 py-2"
              />

              <div className="flex items-center gap-1 pb-1">
                <button className="p-2 rounded-xl hover:bg-slate-100">
                  <MdPhoto className="text-xl text-slate-600" />
                </button>

                <button className="p-2 rounded-xl hover:bg-slate-100">
                  <MdMic className="text-xl text-slate-600" />
                </button>

                <button
                  onClick={handleSend}
                  className="p-2.5 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white"
                >
                  <MdSend className="text-lg" />
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {authOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 30, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl relative"
            >
              <button
                onClick={() => setAuthOpen(false)}
                className="absolute top-4 right-4 text-slate-500"
              >
                <MdClose size={24} />
              </button>

              <h2 className="text-3xl font-bold text-center">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              <p className="text-center text-slate-500 mt-2 mb-6">
                {isLogin ? "Login to continue" : "Signup to begin"}
              </p>

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none"
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none"
                />

                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none"
                />

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold">
                  {isLogin ? "Login" : "Signup"}
                </button>
              </form>

              <p className="text-center text-sm mt-5">
                {isLogin ? "No account?" : "Already have one?"}

                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-cyan-600 font-semibold"
                >
                  {isLogin ? "Signup" : "Login"}
                </button>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Content;