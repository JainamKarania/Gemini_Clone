import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";

const AuthModal = ({ open, setOpen, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: form.name || "User",
      email: form.email,
    };

    sessionStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 40, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 30, scale: 0.95 }}
            className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-7 relative"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-2xl text-slate-500"
            >
              <MdClose />
            </button>

            <h2 className="text-3xl font-bold text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            <p className="text-center text-slate-500 mt-2 mb-6">
              {isLogin ? "Login to continue" : "Signup to begin"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border p-3 rounded-xl outline-none"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              )}

              <input
                type="email"
                placeholder="Email"
                className="w-full border p-3 rounded-xl outline-none"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full border p-3 rounded-xl outline-none"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
              />

              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-semibold">
                {isLogin ? "Login" : "Signup"}
              </button>
            </form>

            <p className="text-center mt-5 text-sm">
              {isLogin ? "No account?" : "Already have one?"}

              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 font-semibold"
              >
                {isLogin ? "Signup" : "Login"}
              </button>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;