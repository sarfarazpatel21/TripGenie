import { motion } from "framer-motion";
import { FiCompass } from "react-icons/fi";

const messages = [
  "Scouting the best neighbourhoods...",
  "Checking the weather forecast...",
  "Finding hidden gems locals love...",
  "Balancing your budget...",
  "Building your day-by-day timeline...",
  "Packing your bags (virtually)...",
];

export default function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-400 grid place-items-center text-white text-2xl"
      >
        <FiCompass />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">Crafting your perfect trip...</h3>
      <motion.p
        key={Math.floor(Date.now() / 2000) % messages.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-slate-500 dark:text-slate-400 mb-10"
      >
        Our AI is analysing thousands of data points for you.
      </motion.p>

      <div className="grid gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="glass-card p-5 flex items-center gap-4 animate-pulse"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-700 shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 rounded bg-slate-200 dark:bg-slate-700 w-2/3" />
              <div className="h-3 rounded bg-slate-200 dark:bg-slate-700 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
