import { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiLoader, FiCompass } from "react-icons/fi";

const budgetTypes = ["Budget", "Standard", "Luxury"];
const travelStyles = [
  "Solo",
  "Family",
  "Couple",
  "Friends",
  "Adventure",
  "Luxury",
  "Backpacking",
];
const transports = ["Flight", "Train", "Bus", "Car"];
const accommodations = ["Hotel", "Hostel", "Resort", "Homestay"];
const foods = ["Veg", "Non-Veg", "Mixed"];

const initialState = {
  destination: "",
  starting_location: "",
  days: 5,
  budget: 30000,
  budget_type: "Standard",
  travellers: 2,
  travel_style: "Couple",
  transport: "Flight",
  accommodation: "Hotel",
  food: "Mixed",
  preferences: "",
};

export default function TripForm({ onSubmit, loading, prefillDestination }) {
  const [form, setForm] = useState(() => ({
    ...initialState,
    destination: prefillDestination || "",
  }));

  const update = (field) => (e) => {
    const value = e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.destination.trim()) return;
    onSubmit(form);
  };

  return (
    <section id="planner" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">
            Get Started
          </span>
          <h2 className="section-heading mt-3">Plan Your Trip</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400">
            Fill in your preferences and let AI do the heavy lifting.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="glass-card p-6 sm:p-10 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="label-text">Destination *</label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="text"
                  placeholder="e.g. Goa, India"
                  value={form.destination}
                  onChange={update("destination")}
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="label-text">Starting Location (optional)</label>
              <input
                type="text"
                placeholder="e.g. Delhi"
                value={form.starting_location}
                onChange={update("starting_location")}
                className="input-field"
              />
            </div>

            <div>
              <label className="label-text">Number of Days</label>
              <input
                required
                type="number"
                min={1}
                max={30}
                value={form.days}
                onChange={update("days")}
                className="input-field"
              />
            </div>

            <div>
              <label className="label-text">Budget (total)</label>
              <input
                required
                type="number"
                min={1}
                value={form.budget}
                onChange={update("budget")}
                className="input-field"
              />
            </div>

            <div>
              <label className="label-text">Budget Type</label>
              <select
                value={form.budget_type}
                onChange={update("budget_type")}
                className="input-field"
              >
                {budgetTypes.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text">Travellers</label>
              <input
                required
                type="number"
                min={1}
                max={20}
                value={form.travellers}
                onChange={update("travellers")}
                className="input-field"
              />
            </div>

            <div>
              <label className="label-text">Travel Style</label>
              <select
                value={form.travel_style}
                onChange={update("travel_style")}
                className="input-field"
              >
                {travelStyles.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text">Transportation</label>
              <select
                value={form.transport}
                onChange={update("transport")}
                className="input-field"
              >
                {transports.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text">Accommodation</label>
              <select
                value={form.accommodation}
                onChange={update("accommodation")}
                className="input-field"
              >
                {accommodations.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-text">Food Preference</label>
              <select value={form.food} onChange={update("food")} className="input-field">
                {foods.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="label-text">Extra Preferences</label>
              <textarea
                rows={3}
                placeholder="Anything else? e.g. beach + nightlife, avoid crowded spots, vegetarian only..."
                value={form.preferences}
                onChange={update("preferences")}
                className="input-field resize-none"
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-base"
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin" /> Planning your trip...
              </>
            ) : (
              <>
                <FiCompass /> Plan My Trip
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
