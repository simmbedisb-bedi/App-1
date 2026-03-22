const BADGES = [
  // Streak badges
  { id: "first-day",   emoji: "🌱", name: "First Step",      desc: "Complete your first day",           type: "streak",  threshold: 1  },
  { id: "streak-3",    emoji: "🔥", name: "On Fire",         desc: "3-day streak",                      type: "streak",  threshold: 3  },
  { id: "streak-7",    emoji: "⚡", name: "One Full Week",   desc: "7-day streak",                      type: "streak",  threshold: 7  },
  { id: "streak-14",   emoji: "💫", name: "Two Weeks Strong", desc: "14-day streak",                    type: "streak",  threshold: 14 },
  { id: "streak-21",   emoji: "🏆", name: "21 Days Habit",   desc: "21-day streak — habit formed!",     type: "streak",  threshold: 21 },
  { id: "streak-30",   emoji: "👑", name: "30-Day Queen",    desc: "30-day streak — you are unstoppable!", type: "streak", threshold: 30 },
  { id: "streak-60",   emoji: "💎", name: "Diamond Status",  desc: "60-day streak — legendary!",        type: "streak",  threshold: 60 },

  // Points badges
  { id: "pts-100",     emoji: "✨", name: "Glowing Up",      desc: "Earn 100 total points",             type: "points",  threshold: 100  },
  { id: "pts-500",     emoji: "🌸", name: "Bloom",           desc: "Earn 500 total points",             type: "points",  threshold: 500  },
  { id: "pts-1000",    emoji: "🌺", name: "In Full Bloom",   desc: "Earn 1,000 total points",           type: "points",  threshold: 1000 },
  { id: "pts-5000",    emoji: "🏅", name: "Golden Girl",     desc: "Earn 5,000 total points",           type: "points",  threshold: 5000 },

  // Perfect day badges
  { id: "perfect-1",   emoji: "⭐", name: "Perfect Day",     desc: "Complete 100% of tasks in one day",  type: "perfect", threshold: 1  },
  { id: "perfect-7",   emoji: "🌟", name: "Perfect Week",    desc: "7 perfect days total",               type: "perfect", threshold: 7  },

  // Workout badges
  { id: "workout-7",   emoji: "💪", name: "Workout Warrior", desc: "Log 7 workout days",                type: "workout", threshold: 7  },
  { id: "workout-30",  emoji: "🦾", name: "Fitness Goddess", desc: "Log 30 workout days",               type: "workout", threshold: 30 },
];

module.exports = { BADGES };
