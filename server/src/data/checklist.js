// Default daily checklist tasks
const defaultTasks = [
  { id: "wake-up",    time: "7:00 AM",  emoji: "☀️",  label: "Wake up & rise",             points: 10 },
  { id: "bathroom",  time: "7:15 AM",  emoji: "🪥",  label: "Bathroom & freshen up",      points: 10 },
  { id: "coffee",    time: "7:30 AM",  emoji: "☕",  label: "Morning coffee / tea",        points: 10 },
  { id: "workout",   time: "7:45 AM",  emoji: "🏋️‍♀️", label: "Outdoor workout",             points: 30 },
  { id: "shower",    time: "8:00 AM",  emoji: "🚿",  label: "Come back & shower",          points: 20 },
  { id: "breakfast", time: "9:00 AM",  emoji: "🍳",  label: "Healthy breakfast",           points: 20 },
  { id: "skincare",  time: "9:30 AM",  emoji: "✨",  label: "Morning skincare routine",    points: 15 },
  { id: "journal",   time: "10:00 AM", emoji: "📓",  label: "Journaling / gratitude",      points: 20 },
  { id: "hydrate",   time: "All day",  emoji: "💧",  label: "Drink 8 glasses of water",    points: 20 },
  { id: "walk",      time: "Anytime",  emoji: "🚶‍♀️", label: "Evening walk or stretch",     points: 15 },
  { id: "no-phone",  time: "Anytime",  emoji: "📵",  label: "Phone-free hour",             points: 20 },
  { id: "sleep",     time: "10:30 PM", emoji: "🌙",  label: "Wind down & sleep by 11 PM", points: 15 },
];

module.exports = { defaultTasks };
