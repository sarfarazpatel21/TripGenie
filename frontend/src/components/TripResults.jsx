import { motion } from "framer-motion";
import {
  FiSun,
  FiCalendar,
  FiPackage,
  FiHome,
  FiMapPin,
  FiCoffee,
  FiCamera,
  FiShoppingBag,
  FiMoon,
  FiUsers,
  FiAlertTriangle,
  FiShield,
  FiCloudRain,
  FiPhone,
} from "react-icons/fi";
import BudgetChart from "./BudgetChart";
import ItineraryTimeline from "./ItineraryTimeline";
import InfoCardGrid from "./InfoCardGrid";
import TagList from "./TagList";
import TripActionsBar from "./TripActionsBar";
import ChatAssistant from "./ChatAssistant";
import { useFavourites } from "../hooks/useLocalStorage";

function SectionCard({ icon: Icon, title, children, id }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 sm:p-8"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-cyan-400 text-white grid place-items-center">
          <Icon />
        </span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      {children}
    </motion.section>
  );
}

export default function TripResults({ trip, formData }) {
  const [favourites, setFavourites] = useFavourites();
  const favId = `${formData?.destination}-${formData?.days}-${formData?.travellers}`;
  const isFavourite = favourites.some((f) => f.id === favId);

  const toggleFavourite = () => {
    if (isFavourite) {
      setFavourites((prev) => prev.filter((f) => f.id !== favId));
    } else {
      setFavourites((prev) => [
        { id: favId, destination: formData?.destination, trip, formData, savedAt: new Date().toISOString() },
        ...prev,
      ]);
    }
  };

  if (!trip) return null;

  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">
            Your Itinerary
          </span>
          <h2 className="section-heading mt-2">
            {formData?.destination || "Your Trip"}
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {trip.summary}
          </p>
        </motion.div>

        <div className="flex justify-center">
          <TripActionsBar
            trip={trip}
            formData={formData}
            isFavourite={isFavourite}
            onToggleFavourite={toggleFavourite}
          />
        </div>

        {/* Quick facts */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="glass-card p-5 flex items-center gap-3">
            <FiSun className="text-2xl text-amber-500 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Weather</p>
              <p className="font-medium text-sm">{trip.weather || "N/A"}</p>
            </div>
          </div>
          <div className="glass-card p-5 flex items-center gap-3">
            <FiCalendar className="text-2xl text-primary-500 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Best Time to Visit</p>
              <p className="font-medium text-sm">{trip.best_time || "N/A"}</p>
            </div>
          </div>
          <div className="glass-card p-5 flex items-center gap-3">
            <FiUsers className="text-2xl text-cyan-500 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Estimated Total Cost</p>
              <p className="font-medium text-sm">
                {trip.estimated_total_cost
                  ? trip.estimated_total_cost.toLocaleString()
                  : formData?.budget?.toLocaleString() || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <SectionCard icon={FiPackage} title="Budget Breakdown" id="budget">
          <BudgetChart breakdown={trip.budget_breakdown} totalBudget={formData?.budget} />
        </SectionCard>

        <SectionCard icon={FiHome} title="Recommended Hotels" id="hotels">
          <InfoCardGrid
            items={trip.hotels}
            fields={{
              title: "name",
              subtitle: "area",
              description: "why",
              meta: "price_per_night",
              rating: "rating",
            }}
          />
        </SectionCard>

        <SectionCard icon={FiMapPin} title="Places to Visit" id="places">
          <InfoCardGrid
            items={trip.places_to_visit}
            fields={{
              title: "name",
              subtitle: "category",
              description: "description",
              meta: "entry_fee",
            }}
          />
        </SectionCard>

        <SectionCard icon={FiCoffee} title="Restaurants to Try" id="restaurants">
          <InfoCardGrid
            items={trip.restaurants}
            fields={{
              title: "name",
              subtitle: "cuisine",
              description: "must_try",
              meta: "price_range",
            }}
          />
        </SectionCard>

        <SectionCard icon={FiCalendar} title="Day-wise Itinerary" id="itinerary">
          <ItineraryTimeline itinerary={trip.itinerary} />
        </SectionCard>

        <div className="grid sm:grid-cols-2 gap-6">
          <SectionCard icon={FiPackage} title="Packing List">
            <TagList items={trip.packing_list} />
          </SectionCard>
          <SectionCard icon={FiShield} title="Travel Tips">
            <TagList items={trip.travel_tips} variant="success" />
          </SectionCard>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <SectionCard icon={FiCamera} title="Instagram Spots & Photography">
            <TagList items={[...(trip.instagram_spots || []), ...(trip.photography_spots || [])]} />
          </SectionCard>
          <SectionCard icon={FiMapPin} title="Hidden Gems">
            <TagList items={trip.hidden_gems} />
          </SectionCard>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <SectionCard icon={FiCoffee} title="Local Foods to Try">
            <TagList items={trip.local_foods} variant="success" />
          </SectionCard>
          <SectionCard icon={FiShoppingBag} title="Shopping Areas">
            <TagList items={trip.shopping_areas} />
          </SectionCard>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <SectionCard icon={FiMoon} title="Nightlife">
            <TagList items={trip.nightlife} />
          </SectionCard>
          <SectionCard icon={FiUsers} title="Family Activities">
            <TagList items={trip.family_activities} variant="success" />
          </SectionCard>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <SectionCard icon={FiAlertTriangle} title="Scam Alerts & Safety Tips">
            <div className="space-y-3">
              <TagList items={trip.scam_alerts} variant="danger" />
              <TagList items={trip.safety_tips} variant="warning" />
            </div>
          </SectionCard>
          <SectionCard icon={FiCloudRain} title="Rainy Day Alternatives">
            <TagList items={trip.rainy_day_alternatives} />
          </SectionCard>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <SectionCard icon={FiSun} title="Best Sunrise & Sunset Spots">
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Sunrise:</span>{" "}
                {trip.best_sunrise_location || "N/A"}
              </p>
              <p>
                <span className="font-medium">Sunset:</span>{" "}
                {trip.best_sunset_location || "N/A"}
              </p>
            </div>
          </SectionCard>
          <SectionCard icon={FiPhone} title="Emergency Numbers">
            {trip.emergency_numbers && Object.keys(trip.emergency_numbers).length > 0 ? (
              <ul className="text-sm space-y-1.5">
                {Object.entries(trip.emergency_numbers).map(([label, value]) => (
                  <li key={label} className="flex justify-between">
                    <span className="capitalize text-slate-500 dark:text-slate-400">
                      {label.replace(/_/g, " ")}
                    </span>
                    <span className="font-medium">{String(value)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400">Not available.</p>
            )}
          </SectionCard>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <SectionCard icon={FiMapPin} title="Free Attractions">
            <TagList items={trip.free_attractions} variant="success" />
          </SectionCard>
          <SectionCard icon={FiMapPin} title="Paid Attractions">
            <TagList items={trip.paid_attractions} />
          </SectionCard>
        </div>

        {trip.one_day_backup_plan && (
          <SectionCard icon={FiCalendar} title="One-Day Backup Plan">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              {trip.one_day_backup_plan}
            </p>
          </SectionCard>
        )}
      </div>

      <ChatAssistant tripContext={trip} />
    </section>
  );
}
