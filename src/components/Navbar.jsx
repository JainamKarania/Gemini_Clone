import React, { useEffect, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClose = () => setMenuOpen(false);

  // Smooth scroll function
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

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    // { name: "Why Us", id: "features" },
    // { name: "Contact", id: "contact" },
  ];

  return (
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
                className="hover:text-cyan-400 transition duration-300"
              >
                {item.name}
              </button>
            </li>
          ))}

          {/* CTA Button */}
          <Link
            to="/chat"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/20"
          >
            Try Now
          </Link>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
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
                    className="hover:text-cyan-400 transition duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ))}

              <Link
                to="/chat"
                onClick={handleClose}
                className="mt-2 text-center px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600"
              >
                Try Now
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;