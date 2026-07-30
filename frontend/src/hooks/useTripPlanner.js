import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { generateTrip } from "../services/api";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Encapsulates trip generation state (loading/error/result) plus trip
 * history persistence, so components stay focused on rendering.
 */
export function useTripPlanner() {
  const [trip, setTrip] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useLocalStorage("trip-planner-history", []);

  const planTrip = useCallback(
    async (payload) => {
      setLoading(true);
      setError(null);
      try {
        const response = await generateTrip(payload);
        if (!response.success || !response.data) {
          throw new Error(response.error || "Failed to generate trip.");
        }
        setTrip(response.data);
        setFormData(payload);

        const entry = {
          id: `${Date.now()}`,
          createdAt: new Date().toISOString(),
          destination: payload.destination,
          days: payload.days,
          travellers: payload.travellers,
          formData: payload,
          trip: response.data,
        };
        setHistory((prev) => [entry, ...prev].slice(0, 20));

        toast.success("Your trip is ready!");
        return response.data;
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setHistory]
  );

  const loadFromHistory = useCallback((entry) => {
    setTrip(entry.trip);
    setFormData(entry.formData);
  }, []);

  const removeFromHistory = useCallback(
    (id) => {
      setHistory((prev) => prev.filter((item) => item.id !== id));
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  return {
    trip,
    formData,
    loading,
    error,
    history,
    planTrip,
    loadFromHistory,
    removeFromHistory,
    clearHistory,
  };
}
