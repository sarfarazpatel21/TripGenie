import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage might be full or unavailable (e.g. private browsing) — fail silently
    }
  }, [key, value]);

  return [value, setValue];
}

export function useFavourites() {
  return useLocalStorage("trip-planner-favourites", []);
}
