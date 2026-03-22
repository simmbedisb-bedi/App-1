const express = require("express");
const router  = express.Router();
const { defaultTasks } = require("../data/checklist");
const {
  getTodayProgress, updateTodayProgress,
  getAllProgress, getStreakCount, getEarnedBadges,
} = require("../utils/storage");

router.get("/", (req, res) => {
  const progress   = getTodayProgress();
  const streak     = getStreakCount();
  const totalPoints = defaultTasks.reduce((s, t) => s + t.points, 0);

  res.json({
    tasks: defaultTasks.map(task => ({
      ...task,
      completed: progress.completedTasks.includes(task.id),
    })),
    progress: {
      completedCount: progress.completedTasks.length,
      totalCount:     defaultTasks.length,
      points:         progress.points,
      totalPoints,
      percentage:     Math.round((progress.completedTasks.length / defaultTasks.length) * 100),
      streak,
      date:           progress.date,
    },
  });
});

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

  // Check for newly earned badges
  const newBadges = getEarnedBadges().filter(b => b.earned);

  res.json({
    taskId,
    completed: updated.completedTasks.includes(taskId),
    points:    updated.points,
    newBadges,
  });
});

router.get("/history", (req, res) => {
  const all     = getAllProgress();
  const streak  = getStreakCount();
  const entries = Object.values(all).sort((a, b) => b.date.localeCompare(a.date));
  const totalPts = entries.reduce((s, e) => s + (e.points || 0), 0);
  const perfectDays = entries.filter(e => e.completedTasks?.length === defaultTasks.length).length;

  res.json({ entries, streak, totalDays: entries.length, totalPts, perfectDays });
});

module.exports = router;
