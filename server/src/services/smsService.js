const twilio = require("twilio");
const { getTodayWorkout, getTodayBreakfast } = require("../data/workouts");
const { getTodayLunch, getTodayDinner, getTodaySnack } = require("../data/meals");
const { getDailyQuote } = require("../data/quotes");

let client = null;

function initTwilio() {
  const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_ACCOUNT_SID !== "your_account_sid_here") {
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
    console.log(`\n📱 [SMS PREVIEW] ─────────────────────────\n${message}\n──────────────────────────────────────────\n`);
    return { success: true, preview: true };
  }
}

// ── Message builders ──────────────────────────────────────────────────────────

function getWakeUpMessage() {
  const quote = getDailyQuote();
  return `☀️ Good morning, gorgeous! Time to rise & shine!\n\n💬 Today's quote:\n"${quote.text}"\n— ${quote.author}\n\nYou've got this! 💕`;
}

function getBathroomMessage() {
  return `🪥 7:15 AM — Freshen up time!\nBrush your teeth, wash your face, and let that natural glow show. Start your morning ritual! ✨`;
}

function getCoffeeMessage() {
  return `☕ 7:30 AM — Coffee time!\nBrew your favorite cup and take a quiet moment just for you. Sip slowly, breathe deeply, enjoy. 🌸`;
}

function getWorkoutMessage() {
  const workout = getTodayWorkout();
  const exList = workout.exercises.length > 0
    ? `\n\n📋 EXERCISES:\n${workout.exercises.map(e => `• ${e}`).join("\n")}`
    : "";
  return `${workout.emoji} 7:45 AM — Workout time!\n\nToday: ${workout.type.toUpperCase()}\n${workout.message}${exList}\n\n💪 Head outside and crush it, queen!`;
}

function getShowerMessage() {
  return `🚿 8:00 AM — Great workout! Come back and shower.\nRinse off, feel refreshed, and step into your glow. 🌊✨`;
}

function getBreakfastMessage() {
  const b = getTodayBreakfast();
  return `${b.emoji} 9:00 AM — Breakfast time!\n\n🍽️ ${b.name}\n📝 ${b.ingredients}\n💚 ${b.benefits}\n\nFuel your beautiful body! 🌟`;
}

function getSkincareMessage() {
  return `✨ 9:30 AM — Morning skincare time!\n\nYour routine:\n• Gentle cleanser\n• Vitamin C serum\n• Moisturizer\n• SPF (non-negotiable! ☀️)\n\nGlow from the outside in! 🌸`;
}

function getMorningJournalMessage() {
  return `📓 10:00 AM — Journal time!\n\nPrompts for today:\n• 3 things I'm grateful for...\n• My intention for today is...\n• One thing I'll do for myself today...\n\nYour thoughts matter! 💜`;
}

function getHydrationMessage() {
  return `💧 Noon — Hydration check!\nHave you had at least 4 glasses of water today? Your skin, energy, and mood will thank you. Keep drinking! 🌊\n\nGoal: 8 glasses by bedtime 💪`;
}

function getLunchMessage() {
  const l = getTodayLunch();
  return `${l.emoji} 12:30 PM — Lunch time!\n\n🍽️ ${l.name}\n📝 ${l.ingredients}\n💚 ${l.benefits}\n\nNourish yourself, queen! 🌿`;
}

function getSnackMessage() {
  const s = getTodaySnack();
  return `${s.emoji} 3:00 PM — Afternoon snack time!\n\nToday's pick: ${s.name}\n\nKeeping your energy stable and cravings at bay. Smart snacking = smart girl! 💪`;
}

function getDinnerMessage() {
  const d = getTodayDinner();
  return `${d.emoji} 6:30 PM — Dinner time!\n\n🍽️ ${d.name}\n📝 ${d.ingredients}\n💚 ${d.benefits}\n\nEnd the day with a nourishing meal. You deserve it! 🌙`;
}

function getEveningSkincareMessage() {
  return `🌙 8:00 PM — Evening skincare time!\n\nYour PM routine:\n• Makeup remover / cleanse\n• Toner\n• Retinol or nourishing serum\n• Rich moisturizer or night cream\n• Eye cream (optional)\n\nSkin repairs itself at night — give it the good stuff! ✨`;
}

function getWindDownMessage() {
  return `🧘‍♀️ 9:30 PM — Wind-down time!\n\nSuggestions:\n• Put your phone on Do Not Disturb\n• Light stretching or gentle yoga\n• Herbal tea (chamomile, lavender)\n• Read something calming\n• Evening journal or gratitude list\n\nYou did so well today! 💕`;
}

function getSleepMessage() {
  return `🌸 10:30 PM — Time to sleep, beautiful!\n\nYour body heals, your muscles grow, your mind resets — all while you sleep. Aim for 7–8 hours.\n\nSweet dreams. Tomorrow is another beautiful day. 🌙💫`;
}

// ── Full day schedule ──────────────────────────────────────────────────────────

const notificationSchedule = [
  { cron: "0 7 * * *",   name: "wake-up",          label: "7:00 AM",  emoji: "☀️",  getMessage: getWakeUpMessage         },
  { cron: "15 7 * * *",  name: "bathroom",         label: "7:15 AM",  emoji: "🪥",  getMessage: getBathroomMessage        },
  { cron: "30 7 * * *",  name: "coffee",           label: "7:30 AM",  emoji: "☕",  getMessage: getCoffeeMessage          },
  { cron: "45 7 * * *",  name: "workout",          label: "7:45 AM",  emoji: "🏋️‍♀️", getMessage: getWorkoutMessage         },
  { cron: "0 8 * * *",   name: "shower",           label: "8:00 AM",  emoji: "🚿",  getMessage: getShowerMessage          },
  { cron: "0 9 * * *",   name: "breakfast",        label: "9:00 AM",  emoji: "🍳",  getMessage: getBreakfastMessage       },
  { cron: "30 9 * * *",  name: "skincare-am",      label: "9:30 AM",  emoji: "✨",  getMessage: getSkincareMessage        },
  { cron: "0 10 * * *",  name: "journal-am",       label: "10:00 AM", emoji: "📓",  getMessage: getMorningJournalMessage  },
  { cron: "0 12 * * *",  name: "hydration",        label: "12:00 PM", emoji: "💧",  getMessage: getHydrationMessage       },
  { cron: "30 12 * * *", name: "lunch",            label: "12:30 PM", emoji: "🥗",  getMessage: getLunchMessage           },
  { cron: "0 15 * * *",  name: "snack",            label: "3:00 PM",  emoji: "🍎",  getMessage: getSnackMessage           },
  { cron: "30 18 * * *", name: "dinner",           label: "6:30 PM",  emoji: "🍽️",  getMessage: getDinnerMessage          },
  { cron: "0 20 * * *",  name: "skincare-pm",      label: "8:00 PM",  emoji: "🌙",  getMessage: getEveningSkincareMessage },
  { cron: "30 21 * * *", name: "wind-down",        label: "9:30 PM",  emoji: "🧘‍♀️", getMessage: getWindDownMessage        },
  { cron: "30 22 * * *", name: "sleep",            label: "10:30 PM", emoji: "🌸",  getMessage: getSleepMessage           },
];

module.exports = {
  initTwilio, sendSMS, notificationSchedule,
  getWakeUpMessage, getBathroomMessage, getCoffeeMessage, getWorkoutMessage,
  getShowerMessage, getBreakfastMessage, getSkincareMessage, getMorningJournalMessage,
  getHydrationMessage, getLunchMessage, getSnackMessage, getDinnerMessage,
  getEveningSkincareMessage, getWindDownMessage, getSleepMessage,
};
