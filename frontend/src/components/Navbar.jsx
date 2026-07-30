import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiCompass,
  FiClock,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/#planner", label: "Plan a Trip" },
  { to: "/history", label: "Trip History" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl transition-all duration-500 ${
          scrolled
            ? "rounded-2xl border border-white/20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl"
            : "bg-transparent"
        }`}
      >
        <div className="flex h-20 items-center justify-between px-6">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400 text-white shadow-lg shadow-primary-500/30 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
              <FiCompass size={21} />
            </div>

            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary-600 to-cyan-500 bg-clip-text text-transparent">
              TripGenie
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className={`relative text-[15px] font-medium transition-all duration-300 ${
                  location.pathname === link.to
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400"
                }`}
              >
                {link.label}

                <span
                  className={`absolute -bottom-2 left-0 h-[2px] rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 transition-all duration-300 ${
                    location.pathname === link.to
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            <Link
              to="/history"
              className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 shadow-sm hover:border-primary-400 hover:text-primary-600 transition-all duration-300"
            >
              <FiClock />
              History
            </Link>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md shadow-sm hover:shadow-md transition-all duration-300"
            >
              {theme === "dark" ? (
                <FiSun className="text-yellow-400" size={18} />
              ) : (
                <FiMoon className="text-slate-700" size={18} />
              )}
            </motion.button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-full border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md md:hidden"
            >
              {mobileOpen ? <FiX /> : <FiMenu />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Menu */}

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-4 mt-3 rounded-2xl border border-white/20 bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl shadow-xl md:hidden"
        >
          <div className="flex flex-col gap-2 p-5">

            {links.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-primary-50 dark:hover:bg-slate-800 transition"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 py-3 font-medium"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
              Toggle Theme
            </button>

          </div>
        </motion.div>
      )}
    </header>
  );
}