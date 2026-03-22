const express = require("express");
const router  = express.Router();
const { weeklyWorkouts, weeklyBreakfasts, getTodayWorkout, getTodayBreakfast } = require("../data/workouts");

// GET /api/workout/today
router.get("/today", (req, res) => {
  res.json({ workout: getTodayWorkout(), breakfast: getTodayBreakfast() });
});

// GET /api/workout/week — full weekly plan
router.get("/week", (req, res) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  res.json({
    workouts:   weeklyWorkouts.map((w, i)   => ({ ...w, dayName: days[i] })),
    breakfasts: weeklyBreakfasts.map((b, i) => ({ ...b, dayName: days[i] })),
  });
});

module.exports = router;
