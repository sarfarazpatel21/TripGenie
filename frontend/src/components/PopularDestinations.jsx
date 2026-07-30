import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

// Import images
import goaImg from "../assets/goa.jpg";
import baliImg from "../assets/bali.jpg";
import parisImg from "../assets/paris.jpg";
import tokyoImg from "../assets/tokyo.jpg";
import manaliImg from "../assets/manali.jpg";
import dubaiImg from "../assets/dubai.jpg";

const destinations = [
  {
    name: "Goa, India",
    tag: "Beaches & Nightlife",
    rating: 4.7,
    gradient: "from-orange-400 to-pink-500",
    image: goaImg,
  },
  {
    name: "Bali, Indonesia",
    tag: "Tropical Paradise",
    rating: 4.8,
    gradient: "from-emerald-400 to-teal-600",
    image: baliImg,
  },
  {
    name: "Paris, France",
    tag: "Romance & Culture",
    rating: 4.9,
    gradient: "from-indigo-400 to-purple-600",
    image: parisImg,
  },
  {
    name: "Tokyo, Japan",
    tag: "Food & Technology",
    rating: 4.8,
    gradient: "from-rose-400 to-red-500",
    image: tokyoImg,
  },
  {
    name: "Manali, India",
    tag: "Mountains & Adventure",
    rating: 4.6,
    gradient: "from-cyan-400 to-blue-600",
    image: manaliImg,
  },
  {
    name: "Dubai, UAE",
    tag: "Luxury & Shopping",
    rating: 4.7,
    gradient: "from-amber-400 to-orange-600",
    image: dubaiImg,
  },
];

export default function PopularDestinations({ onSelect }) {
  return (
    <section
      id="destinations"
      className="py-24 px-6 bg-slate-50 dark:bg-slate-900/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">
            Popular Right Now
          </span>

          <h2 className="section-heading mt-3">
            Trending Destinations
          </h2>

          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Tap a destination to start planning instantly.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.button
              key={dest.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => onSelect?.(dest.name)}
              className="group relative h-56 rounded-2xl overflow-hidden text-left shadow-soft"
            >
              {/* Background Image */}
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-colors duration-300" />

              {/* Optional Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${dest.gradient} opacity-30`}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-5 text-white">
                <div className="flex items-center gap-1 text-sm font-medium mb-1">
                  <FiStar
                    className="text-yellow-300"
                    fill="currentColor"
                  />
                  {dest.rating}
                </div>

                <h3 className="text-xl font-bold">
                  {dest.name}
                </h3>

                <p className="text-sm text-white/90">
                  {dest.tag}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}