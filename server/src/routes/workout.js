const express = require("express");
const router  = express.Router();
const { weeklyWorkouts, weeklyBreakfasts, getTodayWorkout, getTodayBreakfast } = require("../data/workouts");
const { weeklyLunches, weeklyDinners, getTodayLunch, getTodayDinner } = require("../data/meals");
const { getDailyQuote } = require("../data/quotes");

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

router.get("/today", (req, res) => {
  res.json({
    workout:   getTodayWorkout(),
    breakfast: getTodayBreakfast(),
    lunch:     getTodayLunch(),
    dinner:    getTodayDinner(),
    quote:     getDailyQuote(),
  });
});

router.get("/week", (req, res) => {
  res.json({
    workouts:   weeklyWorkouts.map((w, i)   => ({ ...w,   dayName: DAYS[i] })),
    breakfasts: weeklyBreakfasts.map((b, i) => ({ ...b,   dayName: DAYS[i] })),
    lunches:    weeklyLunches.map((l, i)    => ({ ...l,   dayName: DAYS[i] })),
    dinners:    weeklyDinners.map((d, i)    => ({ ...d,   dayName: DAYS[i] })),
  });
});

module.exports = router;
