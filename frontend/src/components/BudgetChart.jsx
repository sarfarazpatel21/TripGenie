import { motion } from "framer-motion";

const COLORS = [
  "bg-primary-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-fuchsia-500",
  "bg-rose-500",
];

const LABELS = {
  accommodation: "Accommodation",
  transport: "Transport",
  food: "Food",
  shopping: "Shopping",
  activities: "Activities",
  emergency_buffer: "Emergency Buffer",
};

export default function BudgetChart({ breakdown = {}, totalBudget }) {
  const entries = Object.entries(breakdown).filter(([, v]) => typeof v === "number");
  const sum = entries.reduce((acc, [, v]) => acc + v, 0) || totalBudget || 1;

  if (entries.length === 0) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No budget breakdown available.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map(([key, value], i) => {
        const pct = Math.round((value / sum) * 100);
        return (
          <div key={key}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-medium">{LABELS[key] || key}</span>
              <span className="text-slate-500 dark:text-slate-400">
                {value.toLocaleString()} ({pct}%)
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`h-full rounded-full ${COLORS[i % COLORS.length]}`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
