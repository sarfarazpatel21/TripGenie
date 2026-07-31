import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiSun, FiMoon, FiCompass, FiClock } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-2 sm:pt-3" : "pt-3 sm:pt-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl transition-all duration-500 ${
          scrolled
            ? "rounded-2xl border border-white/20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex h-16 sm:h-20 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2 sm:gap-3">
            <div className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400 text-white shadow-lg shadow-primary-500/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <FiCompass size={20} />
            </div>

            <span className="bg-gradient-to-r from-primary-600 to-cyan-500 bg-clip-text text-xl sm:text-2xl font-extrabold tracking-tight text-transparent">
              TripGenie
            </span>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* History Button */}
            <Link
              to="/history"
              className="flex h-10 w-10 sm:h-auto sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md sm:px-5 sm:py-2.5 text-slate-700 dark:text-slate-200 shadow-sm hover:border-primary-400 hover:text-primary-600 transition-all duration-300"
            >
              <FiClock className="text-lg" />
              <span className="hidden sm:inline text-sm font-medium">
                History
              </span>
            </Link>

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300"
            >
              {theme === "dark" ? (
                <FiSun className="text-yellow-400" size={18} />
              ) : (
                <FiMoon className="text-slate-700 dark:text-slate-200" size={18} />
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}