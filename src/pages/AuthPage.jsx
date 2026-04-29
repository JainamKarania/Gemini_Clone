import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        name: form.name || "User",
        email: form.email,
      })
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <p className="text-center text-slate-500 mb-6">
          {isLogin ? "Login to continue" : "Signup to begin"}
        </p>

        <form onSubmit={submitHandler} className="space-y-4">

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

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-center mt-5 text-sm">
          {isLogin ? "No account?" : "Already have account?"}

          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-600 font-semibold"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;