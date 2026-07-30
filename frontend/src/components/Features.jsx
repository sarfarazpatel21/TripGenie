import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCpu,
  FiDollarSign,
  FiCalendar,
  FiHeart,
  FiDownload,
  FiMessageCircle,
  FiPlus,
  FiMinus,
} from "react-icons/fi";

const features = [
  {
    icon: FiCpu,
    title: "How does AI create my itinerary?",
    description:
      "Google Gemini analyzes your destination, travel dates, budget, and interests to generate a personalized itinerary including hotels, attractions, restaurants, transportation, and local recommendations.",
  },
  {
    icon: FiDollarSign,
    title: "Can I customize my travel budget?",
    description:
      "Absolutely. TripGenie creates plans based on your budget and clearly breaks down estimated costs for accommodation, food, transport, activities, and miscellaneous expenses.",
  },
  {
    icon: FiCalendar,
    title: "Does TripGenie plan each day?",
    description:
      "Yes. Every itinerary includes a structured day-by-day schedule with morning, afternoon, and evening activities to help you make the most of your trip.",
  },
  {
    icon: FiHeart,
    title: "Will it recommend hidden gems?",
    description:
      "Besides famous attractions, TripGenie also recommends local cafés, scenic viewpoints, underrated destinations, authentic food spots, and useful travel tips.",
  },
  {
    icon: FiDownload,
    title: "Can I download or share my itinerary?",
    description:
      "Yes. You can export your travel plan as a PDF or share it with friends and family for collaborative trip planning.",
  },
  {
    icon: FiMessageCircle,
    title: "Can I ask follow-up questions?",
    description:
      "Of course. TripGenie works like your personal travel assistant—you can continue asking questions about hotels, transport, weather, food, or anything related to your itinerary.",
  },
];

export default function Features() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="inline-flex rounded-full bg-primary-500/10 border border-primary-500/20 px-5 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400">
            Why Choose TripGenie?
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-black tracking-tight">
            People Also Ask
          </h2>

          <p className="mt-5 text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about how TripGenie creates smarter,
            faster and personalized travel experiences.
          </p>

        </div>

        {/* Accordion */}

        <div className="space-y-4">

          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition"
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? -1 : index)
                }
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-400 flex items-center justify-center text-white text-xl">
                    <item.icon />
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                </div>

                <div className="text-primary-500 text-2xl">
                  {openIndex === index ? <FiMinus /> : <FiPlus />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pl-[88px]">
                      <p className="leading-8 text-slate-600 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

        </div>

        {/* Bottom Text */}

        <p className="mt-12 text-center text-sm text-slate-500 dark:text-slate-500">
          Still have questions? Your AI travel assistant is ready to help you
          plan the perfect trip.
        </p>

      </div>
    </section>
  );
}