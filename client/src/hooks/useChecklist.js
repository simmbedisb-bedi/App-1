import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useChecklist() {
  const [tasks,    setTasks]    = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const fetchChecklist = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/checklist");
      setTasks(data.tasks);
      setProgress(data.progress);
      setError(null);
    } catch (e) {
      setError("Could not load checklist. Is the server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchChecklist(); }, [fetchChecklist]);

  const toggleTask = useCallback(async (taskId) => {
    // Optimistic update
    setTasks(prev => prev.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));

    try {
      const { data } = await axios.post("/api/checklist/toggle", { taskId });
      // Refresh to get accurate points
      const updated  = await axios.get("/api/checklist");
      setTasks(updated.data.tasks);
      setProgress(updated.data.progress);
    } catch (e) {
      // Revert on error
      fetchChecklist();
    }
  }, [fetchChecklist]);

  return { tasks, progress, loading, error, toggleTask, refresh: fetchChecklist };
}
