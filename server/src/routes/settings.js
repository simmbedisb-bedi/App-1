const express = require("express");
const router  = express.Router();
const { getSettings, updateSettings } = require("../utils/storage");
const { getDailyQuote } = require("../data/quotes");
const { startScheduler } = require("../services/schedulerService");

router.get("/", (req, res) => {
  res.json({ settings: getSettings(), quote: getDailyQuote() });
});

router.patch("/", (req, res) => {
  const allowed = ["phoneNumber", "timezone", "startDate"];
  const updates = {};
  allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });

  if (Object.keys(updates).length === 0)
    return res.status(400).json({ error: "No valid fields provided" });

  const settings = updateSettings(updates);

  // Restart scheduler if timezone changed
  if (updates.timezone) {
    process.env.TIMEZONE = updates.timezone;
    startScheduler();
  }

  res.json({ settings });
});

module.exports = router;
