const twilio = require("twilio");
const { getTodayWorkout, getTodayBreakfast } = require("../data/workouts");

let client = null;

function initTwilio() {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN &&
      TWILIO_ACCOUNT_SID !== "your_account_sid_here") {
    client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
    console.log("✅ Twilio initialized — SMS notifications active");
  } else {
    console.log("⚠️  Twilio not configured — SMS notifications will log to console only");
  }
}

async function sendSMS(message) {
  const to   = process.env.USER_PHONE_NUMBER;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (client && to && from) {
    try {
      const result = await client.messages.create({ body: message, from, to });
      console.log(`📱 SMS sent: ${result.sid}`);
      return { success: true, sid: result.sid };
    } catch (err) {
      console.error("❌ SMS error:", err.message);
      return { success: false, error: err.message };
    }
  } else {
    // Dev mode — print to console
    console.log(`\n📱 [SMS PREVIEW] ─────────────────────────`);
    console.log(message);
    console.log(`─────────────────────────────────────────\n`);
    return { success: true, preview: true };
  }
}

// ── Notification message builders ──────────────────────────────────────────

function getWakeUpMessage() {
  return `☀️ Good morning, gorgeous! It's 7:00 AM — time to rise and shine! Today is going to be a beautiful day. You've got this! 💕`;
}

function getBathroomMessage() {
  return `🪥 7:15 AM — Time to freshen up! Brush your teeth, wash your face, and let that glow show. Start your morning ritual! ✨`;
}

function getCoffeeMessage() {
  return `☕ 7:30 AM — Coffee time! Brew your favorite cup and take a quiet moment just for you. Sip, breathe, enjoy. 🌸`;
}

function getWorkoutMessage() {
  const workout = getTodayWorkout();
  const exerciseList = workout.exercises.length > 0
    ? `\n\n📋 TODAY'S EXERCISES:\n${workout.exercises.map(e => `• ${e}`).join("\n")}`
    : "";
  return `${workout.emoji} 7:45 AM — Workout time! Today is ${workout.type.toUpperCase()}!\n${workout.message}${exerciseList}\n\n💪 Head outside and crush it, queen!`;
}

function getShowerMessage() {
  return `🚿 8:00 AM — Great workout! Time to come back, cool down, and hop in the shower. Rinse off and feel refreshed! 🌊✨`;
}

function getBreakfastMessage() {
  const breakfast = getTodayBreakfast();
  return `${breakfast.emoji} 9:00 AM — Breakfast time! Today's healthy pick:\n\n🍽️ ${breakfast.name}\n📝 ${breakfast.ingredients}\n💚 Why: ${breakfast.benefits}\n\nFuel your beautiful body! 🌟`;
}

// ── Message schedule map (used by scheduler) ────────────────────────────────

const notificationSchedule = [
  { cron: "0 7 * * *",  name: "wake-up",    getMessage: getWakeUpMessage   },
  { cron: "15 7 * * *", name: "bathroom",   getMessage: getBathroomMessage },
  { cron: "30 7 * * *", name: "coffee",     getMessage: getCoffeeMessage   },
  { cron: "45 7 * * *", name: "workout",    getMessage: getWorkoutMessage  },
  { cron: "0 8 * * *",  name: "shower",     getMessage: getShowerMessage   },
  { cron: "0 9 * * *",  name: "breakfast",  getMessage: getBreakfastMessage },
];

module.exports = {
  initTwilio,
  sendSMS,
  notificationSchedule,
  getWakeUpMessage,
  getBathroomMessage,
  getCoffeeMessage,
  getWorkoutMessage,
  getShowerMessage,
  getBreakfastMessage,
};
