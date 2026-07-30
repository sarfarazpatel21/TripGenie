import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

/**
 * Renders a responsive grid of glass cards for arrays of objects like
 * hotels, places_to_visit, or restaurants. `fields` maps a label to the
 * object key so the same component works for any of the three sections.
 */
export default function InfoCardGrid({ items = [], fields }) {
  if (!items.length) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">No results available.</p>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
          className="glass-card p-5 hover:-translate-y-1 hover:shadow-lg transition-all"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="font-semibold">{item[fields.title] || "Untitled"}</h4>
            {fields.rating && item[fields.rating] && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-500 shrink-0">
                <FiStar fill="currentColor" /> {item[fields.rating]}
              </span>
            )}
          </div>
          {fields.subtitle && item[fields.subtitle] && (
            <p className="text-xs uppercase tracking-wide text-primary-600 dark:text-primary-400 font-medium mb-1">
              {item[fields.subtitle]}
            </p>
          )}
          {fields.description && item[fields.description] && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
              {item[fields.description]}
            </p>
          )}
          {fields.meta && item[fields.meta] && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {item[fields.meta]}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
