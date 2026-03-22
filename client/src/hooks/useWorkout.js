import { useState, useEffect } from "react";
import axios from "axios";

export function useWorkout() {
  const [workout,   setWorkout]   = useState(null);
  const [breakfast, setBreakfast] = useState(null);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    axios.get("/api/workout/today")
      .then(({ data }) => {
        setWorkout(data.workout);
        setBreakfast(data.breakfast);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { workout, breakfast, loading };
}
