import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import {Link} from "react-router-dom"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on link click
  const handleClick = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="text-white font-bold text-xl select-none cursor-pointer">
          <a href="#home" onClick={handleClick}>
            GForce AI
          </a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-white font-semibold">
          <li>
            <a
              href="#home"
              className="hover:text-yellow-400"
              onClick={handleClick}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#why-choose-us"
              className="hover:text-yellow-400"
              onClick={handleClick}
            >
              Why Choose Us?
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-yellow-400"
              onClick={handleClick}
            >
              Contact
            </a>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden mt-2 space-y-4 bg-black bg-opacity-70 text-white font-semibold p-4 rounded shadow-lg mx-4">
          <li>
            <a
              href="#home"
              className="hover:text-yellow-400"
              onClick={handleClick}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#why-choose-us"
              className="hover:text-yellow-400"
              onClick={handleClick}
            >
              Why Choose Us?
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-yellow-400"
              onClick={handleClick}
            >
              Contact
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
