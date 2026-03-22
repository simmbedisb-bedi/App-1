const express = require("express");
const router  = express.Router();
const sms     = require("../services/smsService");
const { getScheduleStatus } = require("../services/schedulerService");

const messageMap = {
  "wake-up":      sms.getWakeUpMessage,
  "bathroom":     sms.getBathroomMessage,
  "coffee":       sms.getCoffeeMessage,
  "workout":      sms.getWorkoutMessage,
  "shower":       sms.getShowerMessage,
  "breakfast":    sms.getBreakfastMessage,
  "skincare-am":  sms.getSkincareMessage,
  "journal-am":   sms.getMorningJournalMessage,
  "hydration":    sms.getHydrationMessage,
  "lunch":        sms.getLunchMessage,
  "snack":        sms.getSnackMessage,
  "dinner":       sms.getDinnerMessage,
  "skincare-pm":  sms.getEveningSkincareMessage,
  "wind-down":    sms.getWindDownMessage,
  "sleep":        sms.getSleepMessage,
};

router.get("/schedule", (req, res) => {
  res.json({ schedule: getScheduleStatus() });
});

router.post("/test", async (req, res) => {
  const { type } = req.body;
  const getMessage = messageMap[type];
  if (!getMessage) return res.status(400).json({ error: "Invalid type", validTypes: Object.keys(messageMap) });
  const message = getMessage();
  const result  = await sms.sendSMS(message);
  res.json({ sent: result.success, message, preview: result.preview || false });
});

router.post("/send", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "message required" });
  const result = await sms.sendSMS(message);
  res.json({ sent: result.success });
});

module.exports = router;
