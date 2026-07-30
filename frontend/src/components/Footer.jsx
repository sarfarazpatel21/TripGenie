import { FiCompass, FiGithub, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-400 text-white">
            <FiCompass />
          </span>
          TripGenie
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
          Built with React, FastAPI &amp; Google Gemini. &copy; {new Date().getFullYear()} TripGenie.
        </p>

        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <a href="#" aria-label="GitHub" className="hover:text-primary-500 transition-colors">
            <FiGithub size={18} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-primary-500 transition-colors">
            <FiTwitter size={18} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-primary-500 transition-colors">
            <FiInstagram size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
