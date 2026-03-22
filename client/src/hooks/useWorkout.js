import { useState, useEffect } from "react";
import axios from "axios";

export function useWorkout() {
  const [data,    setData]    = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/workout/today")
      .then(({ data }) => setData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return {
    workout:   data.workout,
    breakfast: data.breakfast,
    lunch:     data.lunch,
    dinner:    data.dinner,
    quote:     data.quote,
    loading,
  };
}
