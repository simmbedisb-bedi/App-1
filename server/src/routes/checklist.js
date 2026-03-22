const express = require("express");
const router  = express.Router();
const { defaultTasks }                             = require("../data/checklist");
const { getTodayProgress, updateTodayProgress, getAllProgress, getStreakCount } = require("../utils/storage");

// GET /api/checklist — today's tasks + progress
router.get("/", (req, res) => {
  const progress = getTodayProgress();
  const streak   = getStreakCount();
  const totalPoints = defaultTasks.reduce((sum, t) => sum + t.points, 0);

  res.json({
    tasks: defaultTasks.map(task => ({
      ...task,
      completed: progress.completedTasks.includes(task.id),
    })),
    progress: {
      completedCount: progress.completedTasks.length,
      totalCount: defaultTasks.length,
      points: progress.points,
      totalPoints,
      percentage: Math.round((progress.completedTasks.length / defaultTasks.length) * 100),
      streak,
      date: progress.date,
    },
  });
});

// POST /api/checklist/toggle — toggle a task on/off
router.post("/toggle", (req, res) => {
  const { taskId } = req.body;
  if (!taskId) return res.status(400).json({ error: "taskId required" });

  const task = defaultTasks.find(t => t.id === taskId);
  if (!task) return res.status(404).json({ error: "Task not found" });

  const progress = getTodayProgress();
  let { completedTasks, points } = progress;

  if (completedTasks.includes(taskId)) {
    completedTasks = completedTasks.filter(id => id !== taskId);
    points -= task.points;
  } else {
    completedTasks.push(taskId);
    points += task.points;
  }

  const updated = updateTodayProgress(completedTasks, Math.max(0, points));
  res.json({ taskId, completed: updated.completedTasks.includes(taskId), points: updated.points });
});

// GET /api/checklist/history — full 30-60 day history
router.get("/history", (req, res) => {
  const all    = getAllProgress();
  const streak = getStreakCount();
  const entries = Object.values(all).sort((a, b) => b.date.localeCompare(a.date));
  res.json({ entries, streak, totalDays: entries.length });
});

module.exports = router;
