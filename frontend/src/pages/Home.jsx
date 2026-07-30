import { useRef, useState } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import PopularDestinations from "../components/PopularDestinations";
import TripForm from "../components/TripForm";
import LoadingSkeleton from "../components/LoadingSkeleton";
import TripResults from "../components/TripResults";
import { useTripPlanner } from "../hooks/useTripPlanner";

export default function Home() {
  const { trip, formData, loading, planTrip } = useTripPlanner();
  const [prefillDestination, setPrefillDestination] = useState("");
  const resultsRef = useRef(null);

  const handleSelectDestination = (name) => {
    setPrefillDestination(name);
    document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (payload) => {
    try {
      await planTrip(payload);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch {
      // error toast already handled inside the hook
    }
  };

  return (
    <>
      <Hero />
      <Features />
      <PopularDestinations onSelect={handleSelectDestination} />
      <TripForm
        onSubmit={handleSubmit}
        loading={loading}
        prefillDestination={prefillDestination}
        key={prefillDestination}
      />

      <div ref={resultsRef}>
        {loading && <LoadingSkeleton />}
        {!loading && trip && <TripResults trip={trip} formData={formData} />}
      </div>
    </>
  );
}
