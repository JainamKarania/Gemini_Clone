import React, { useEffect, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Auth States */
  const [authOpen, setAuthOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  /* Load Session */
  useEffect(() => {
    const savedUser = sessionStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  /* Scroll Effect */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => setMenuOpen(false);

  /* Smooth Scroll */
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

  const handleNavClick = (sectionId) => {
    handleClose();

    if (location.pathname !== "/") {
      navigate("/");

      setTimeout(() => {
        scrollToSection(sectionId);
      }, 150);
    } else {
      scrollToSection(sectionId);
    }
  };

  /* Auth Submit */
  const handleAuth = (e) => {
    e.preventDefault();

    const userData = {
      name: form.name || "User",
      email: form.email,
    };

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

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="text-2xl font-bold text-white tracking-wide"
          >
            GForce{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              AI
            </span>
          </button>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-white font-medium">
            {navLinks.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="hover:text-cyan-400 transition"
                >
                  {item.name}
                </button>
              </li>
            ))}

            <Link
              to="/chat"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition shadow-lg"
            >
              Try Now
            </Link>

            {user ? (
              <button
                onClick={logout}
                className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition"
              >
                Login / Signup
              </button>
            )}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mx-4 mb-4 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-5"
            >
              <ul className="flex flex-col gap-5 text-white font-medium">
                {navLinks.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className="hover:text-cyan-400 transition"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}

                <Link
                  to="/chat"
                  onClick={handleClose}
                  className="text-center px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
                >
                  Try Now
                </Link>

                {user ? (
                  <button
                    onClick={logout}
                    className="px-5 py-3 rounded-full border border-white/20"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setAuthOpen(true);
                      setMenuOpen(false);
                    }}
                    className="px-5 py-3 rounded-full border border-white/20"
                  >
                    Login / Signup
                  </button>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

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
              {/* Close */}
              <button
                onClick={() => setAuthOpen(false)}
                className="absolute top-4 right-4 text-slate-500"
              >
                <MdClose size={24} />
              </button>

              <h2 className="text-3xl font-bold text-center text-slate-800">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              <p className="text-center text-slate-500 mt-2 mb-6">
                {isLogin
                  ? "Login to continue"
                  : "Signup to begin"}
              </p>

              <form
                onSubmit={handleAuth}
                className="space-y-4"
              >
                {!isLogin && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                />

                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
                />

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition">
                  {isLogin ? "Login" : "Signup"}
                </button>
              </form>

              <p className="text-center text-sm mt-5 text-slate-600">
                {isLogin
                  ? "No account?"
                  : "Already have one?"}

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

export default Navbar;