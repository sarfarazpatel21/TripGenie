import { motion } from "framer-motion";
import { FiClock, FiMapPin } from "react-icons/fi";

export default function ItineraryTimeline({ itinerary = [] }) {
  if (!itinerary.length) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        No itinerary available.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {itinerary.map((day, dayIdx) => (
        <motion.div
          key={day.day ?? dayIdx}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative pl-10"
        >
          <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-cyan-400 text-white text-sm font-bold grid place-items-center">
            {day.day ?? dayIdx + 1}
          </div>
          {dayIdx !== itinerary.length - 1 && (
            <div className="absolute left-4 top-8 bottom-[-2rem] w-px bg-slate-200 dark:bg-slate-700" />
          )}

          <h4 className="font-semibold text-lg mb-3">
            Day {day.day ?? dayIdx + 1}
            {day.title ? `: ${day.title}` : ""}
          </h4>

          <div className="space-y-3">
            {(day.activities || []).map((activity, actIdx) => (
              <div
                key={actIdx}
                className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
              >
                {activity.time && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 dark:text-primary-400 shrink-0">
                    <FiClock /> {activity.time}
                  </span>
                )}
                <div className="flex-1">
                  <p className="font-medium">{activity.activity}</p>
                  {activity.location && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <FiMapPin /> {activity.location}
                    </p>
                  )}
                  {activity.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {activity.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
