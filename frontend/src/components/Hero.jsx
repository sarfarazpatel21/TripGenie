import { motion } from "framer-motion";
import { FiArrowRight, FiMapPin, FiStar } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-28 md:pt-44 md:pb-36">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary-500 via-cyan-400 to-primary-700 bg-200% animate-gradient opacity-90 dark:opacity-70" />
      <div className="absolute inset-0 -z-10 bg-white/10 dark:bg-slate-950/40" />

      {/* Floating Blobs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/20 blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-cyan-300/20 blur-3xl animate-float [animation-delay:2s]" />

      <div className="relative max-w-6xl mx-auto px-6 text-center text-white">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-6 py-2 text-sm font-semibold tracking-wide shadow-xl"
        >
          <FiStar className="text-yellow-300" />
          AI-Powered Travel Agent v2.0
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-[-0.05em]"
        >
          Design Your Dream
          <br />
          <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            Getaway in Seconds
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 max-w-3xl mx-auto text-lg md:text-2xl font-light leading-relaxed text-white/85"
        >
          Tell us where you want to go, and let our advanced AI craft the
          perfect itinerary tailored to your budget, interests, and travel
          style.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          <a
            href="#planner"
            className="inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-semibold text-primary-700 shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Planning
            <FiArrowRight className="text-xl" />
          </a>

          <a
            href="#destinations"
            className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md px-10 py-5 text-lg font-semibold hover:bg-white/20 transition-all duration-300"
          >
            <FiMapPin />
            Explore Destinations
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto"
        >
          <div>
            <h3 className="text-4xl font-bold">190+</h3>
            <p className="mt-2 text-white/80 uppercase tracking-wider text-sm">
              Countries
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">30s</h3>
            <p className="mt-2 text-white/80 uppercase tracking-wider text-sm">
              Average Plan
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">AI</h3>
            <p className="mt-2 text-white/80 uppercase tracking-wider text-sm">
              Personalized
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">24/7</h3>
            <p className="mt-2 text-white/80 uppercase tracking-wider text-sm">
              Available
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}