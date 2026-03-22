const express = require("express");
const router  = express.Router();
const { sendSMS, notificationSchedule,
        getWakeUpMessage, getBathroomMessage, getCoffeeMessage,
        getWorkoutMessage, getShowerMessage, getBreakfastMessage } = require("../services/smsService");
const { getScheduleStatus } = require("../services/schedulerService");

// GET /api/notifications/schedule — view the cron schedule
router.get("/schedule", (req, res) => {
  res.json({ schedule: getScheduleStatus() });
});

// POST /api/notifications/test — send a test SMS right now
router.post("/test", async (req, res) => {
  const { type } = req.body;

  const messageMap = {
    "wake-up":   getWakeUpMessage,
    "bathroom":  getBathroomMessage,
    "coffee":    getCoffeeMessage,
    "workout":   getWorkoutMessage,
    "shower":    getShowerMessage,
    "breakfast": getBreakfastMessage,
  };

  const getMessage = messageMap[type];
  if (!getMessage) {
    return res.status(400).json({
      error: "Invalid type. Use: wake-up, bathroom, coffee, workout, shower, breakfast",
    });
  }

  const message = getMessage();
  const result  = await sendSMS(message);
  res.json({ sent: result.success, message, preview: result.preview || false });
});

// POST /api/notifications/send — send a custom message
router.post("/send", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "message required" });

  const result = await sendSMS(message);
  res.json({ sent: result.success });
});

module.exports = router;
