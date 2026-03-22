// Weekly workout rotation — 7-day cycle, repeats for the full 30–60 day program
const weeklyWorkouts = [
  {
    day: 0, // Sunday
    type: "Rest & Recovery",
    emoji: "🧘‍♀️",
    exercises: [],
    message: "Rest day! Your body grows stronger while it recovers. Try light stretching or a leisurely walk.",
  },
  {
    day: 1, // Monday
    type: "Leg Day",
    emoji: "🦵",
    exercises: [
      "3x15 Squats (bodyweight or add resistance)",
      "3x12 Romanian Deadlifts",
      "3x15 Glute Bridges",
      "3x12 Lateral Band Walks",
      "3x20 Calf Raises",
      "2x30s Wall Sit",
    ],
    message: "It's LEG DAY, queen! 🦵 Strong legs carry you through life. Let's build that power!",
  },
  {
    day: 2, // Tuesday
    type: "Back & Posture",
    emoji: "💪",
    exercises: [
      "3x12 Resistance Band Rows",
      "3x10 Superman Holds (3s hold each)",
      "3x15 Reverse Flys",
      "3x12 Lat Pulldown (band)",
      "3x15 Good Mornings (bodyweight)",
      "2x30s Dead Hang or Doorway Stretch",
    ],
    message: "BACK DAY! 💪 A strong back = perfect posture. Stand tall, you got this!",
  },
  {
    day: 3, // Wednesday
    type: "Cardio & Core",
    emoji: "🔥",
    exercises: [
      "20 min brisk walk or jog",
      "3x20 Bicycle Crunches",
      "3x15 Leg Raises",
      "3x30s Plank",
      "3x15 Russian Twists",
      "3x10 Mountain Climbers (slow)",
    ],
    message: "Cardio & Core day! 🔥 Let's get that heart pumping and core strong!",
  },
  {
    day: 4, // Thursday
    type: "Glute & Hip Focus",
    emoji: "✨",
    exercises: [
      "4x15 Hip Thrusts",
      "3x12 Single-Leg Glute Bridge",
      "3x15 Donkey Kicks (each side)",
      "3x15 Fire Hydrants (each side)",
      "3x12 Sumo Squats",
      "3x20 Clamshells (with band)",
    ],
    message: "Glute focus day! ✨ Building that strong, sculpted silhouette — you're doing amazing!",
  },
  {
    day: 5, // Friday
    type: "Upper Body Tone",
    emoji: "🌸",
    exercises: [
      "3x12 Push-Ups (modify as needed)",
      "3x15 Resistance Band Bicep Curls",
      "3x15 Overhead Tricep Extension (band)",
      "3x12 Lateral Raises (light weights)",
      "3x15 Front Raises",
      "3x12 Chest Press (band or light dumbbells)",
    ],
    message: "Upper body toning! 🌸 Sculpted arms and shoulders incoming — let's get it!",
  },
  {
    day: 6, // Saturday
    type: "Full Body HIIT",
    emoji: "⚡",
    exercises: [
      "45s Jump Squats / 15s rest",
      "45s Push-Ups / 15s rest",
      "45s High Knees / 15s rest",
      "45s Glute Bridges / 15s rest",
      "45s Burpees (modify as needed) / 15s rest",
      "45s Jumping Jacks / 15s rest",
      "Repeat circuit 2–3x",
    ],
    message: "Full Body HIIT Saturday! ⚡ Your strongest session of the week — you're unstoppable!",
  },
];

// Breakfast rotation — 7 healthy, female-friendly options
const weeklyBreakfasts = [
  {
    name: "Greek Yogurt Parfait",
    emoji: "🫐",
    ingredients: "Greek yogurt + granola + blueberries + honey drizzle",
    benefits: "High protein, antioxidants, probiotics for gut health",
  },
  {
    name: "Avocado Toast & Eggs",
    emoji: "🥑",
    ingredients: "Whole grain toast + mashed avocado + 2 poached eggs + chili flakes",
    benefits: "Healthy fats, protein, complex carbs for lasting energy",
  },
  {
    name: "Green Smoothie Bowl",
    emoji: "🥗",
    ingredients: "Spinach + banana + mango + almond milk, topped with seeds & berries",
    benefits: "Iron, vitamins, fiber — beauty from the inside out",
  },
  {
    name: "Oatmeal Power Bowl",
    emoji: "🌾",
    ingredients: "Rolled oats + almond butter + banana slices + chia seeds + cinnamon",
    benefits: "Slow-release energy, fiber, omega-3s — keeps you full all morning",
  },
  {
    name: "Veggie Egg Muffins",
    emoji: "🥚",
    ingredients: "3 egg muffins with spinach, bell peppers & feta (meal-prep friendly)",
    benefits: "High protein, micronutrients, low carb — prep Sunday night!",
  },
  {
    name: "Chia Pudding",
    emoji: "🌺",
    ingredients: "Chia seeds + coconut milk (overnight) + mango chunks + mint",
    benefits: "Omega-3s, calcium, fiber — a hormone-balancing powerhouse",
  },
  {
    name: "Banana Protein Pancakes",
    emoji: "🍌",
    ingredients: "1 banana + 2 eggs + dash of cinnamon — pan-fried, topped with berries",
    benefits: "Natural energy, protein, potassium — treat yourself, it's healthy!",
  },
];

function getTodayWorkout() {
  const dayOfWeek = new Date().getDay();
  return weeklyWorkouts[dayOfWeek];
}

function getTodayBreakfast() {
  const dayOfWeek = new Date().getDay();
  return weeklyBreakfasts[dayOfWeek];
}

module.exports = { weeklyWorkouts, weeklyBreakfasts, getTodayWorkout, getTodayBreakfast };
