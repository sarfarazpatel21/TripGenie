import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTrash2, FiMapPin, FiUsers, FiCalendar, FiEye, FiHeart } from "react-icons/fi";
import { useLocalStorage, useFavourites } from "../hooks/useLocalStorage";
import TripResults from "../components/TripResults";

export default function History() {
  const [history, setHistory] = useLocalStorage("trip-planner-history", []);
  const [favourites, setFavourites] = useFavourites();
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState("recent");
  const navigate = useNavigate();

  const removeHistoryItem = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((item) => item.id !== id));
  };

  if (selected) {
    return (
      <div className="pt-28">
        <div className="max-w-5xl mx-auto px-6">
          <button
            onClick={() => setSelected(null)}
            className="btn-secondary text-sm px-4 py-2 mb-4"
          >
            ← Back to history
          </button>
        </div>
        <TripResults trip={selected.trip} formData={selected.formData} />
      </div>
    );
  }

  const list = tab === "recent" ? history : favourites;

  return (
    <div className="pt-28 pb-20 px-6 max-w-5xl mx-auto min-h-[60vh]">
      <div className="text-center mb-10">
        <h1 className="section-heading">Your Trips</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Revisit past itineraries or jump back into a favourite.
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setTab("recent")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            tab === "recent"
              ? "bg-gradient-to-r from-primary-500 to-cyan-500 text-white"
              : "glass-card text-slate-600 dark:text-slate-300"
          }`}
        >
          Recent ({history.length})
        </button>
        <button
          onClick={() => setTab("favourites")}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            tab === "favourites"
              ? "bg-gradient-to-r from-primary-500 to-cyan-500 text-white"
              : "glass-card text-slate-600 dark:text-slate-300"
          }`}
        >
          Favourites ({favourites.length})
        </button>
      </div>

      {list.length === 0 ? (
        <div className="text-center py-20 glass-card">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            {tab === "recent" ? "No trips planned yet." : "No favourites saved yet."}
          </p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Plan a Trip
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {list.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-lg flex items-center gap-1.5">
                  <FiMapPin className="text-primary-500" /> {item.destination}
                </h3>
                <button
                  onClick={() =>
                    tab === "recent" ? removeHistoryItem(item.id) : removeFavourite(item.id)
                  }
                  className="text-slate-400 hover:text-rose-500 transition-colors"
                  aria-label="Remove"
                >
                  {tab === "recent" ? <FiTrash2 /> : <FiHeart fill="currentColor" />}
                </button>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
                {item.formData?.days && (
                  <span className="flex items-center gap-1">
                    <FiCalendar /> {item.formData.days} days
                  </span>
                )}
                {item.formData?.travellers && (
                  <span className="flex items-center gap-1">
                    <FiUsers /> {item.formData.travellers}
                  </span>
                )}
              </div>

              <button
                onClick={() => setSelected(item)}
                className="btn-secondary text-sm px-4 py-2 w-full"
              >
                <FiEye /> View Itinerary
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
