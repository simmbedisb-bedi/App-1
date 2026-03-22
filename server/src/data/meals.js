// Weekly lunch rotation
const weeklyLunches = [
  {
    name: "Mediterranean Quinoa Bowl",
    emoji: "🫙",
    ingredients: "Quinoa + cherry tomatoes + cucumber + olives + feta + lemon-olive oil dressing",
    benefits: "Anti-inflammatory, high protein, complex carbs",
  },
  {
    name: "Grilled Chicken Wrap",
    emoji: "🌯",
    ingredients: "Whole wheat wrap + grilled chicken + avocado + lettuce + Greek yogurt sauce",
    benefits: "Lean protein, healthy fats, fiber — keeps you satiated",
  },
  {
    name: "Lentil & Veggie Soup",
    emoji: "🍲",
    ingredients: "Red lentils + carrots + celery + cumin + turmeric + crusty bread",
    benefits: "Plant protein, iron, folate — great for hormonal balance",
  },
  {
    name: "Asian Salmon Salad",
    emoji: "🐟",
    ingredients: "Mixed greens + canned salmon + edamame + sesame dressing + rice crackers",
    benefits: "Omega-3s, collagen support, brain fuel",
  },
  {
    name: "Stuffed Bell Peppers",
    emoji: "🫑",
    ingredients: "Bell peppers stuffed with brown rice + black beans + corn + salsa",
    benefits: "Vitamin C boost, plant protein, fiber-rich",
  },
  {
    name: "Tuna Avocado Bowl",
    emoji: "🥣",
    ingredients: "Brown rice + tuna + avocado + edamame + soy sauce + sesame seeds",
    benefits: "Lean protein, healthy fats, minerals for glowing skin",
  },
  {
    name: "Caprese & Lentil Plate",
    emoji: "🍅",
    ingredients: "Fresh mozzarella + tomatoes + basil + lentil side + balsamic glaze",
    benefits: "Calcium, lycopene, plant protein — light yet nourishing",
  },
];

// Weekly dinner rotation
const weeklyDinners = [
  {
    name: "Baked Salmon & Sweet Potato",
    emoji: "🍠",
    ingredients: "Salmon fillet + roasted sweet potato + steamed broccoli + lemon butter",
    benefits: "Omega-3s, beta-carotene, complete macros for recovery",
  },
  {
    name: "Stir-Fried Tofu & Veggies",
    emoji: "🥦",
    ingredients: "Firm tofu + bok choy + snap peas + ginger-soy sauce + brown rice",
    benefits: "Plant protein, phytoestrogens for hormone balance, low calorie",
  },
  {
    name: "Turkey Meatball Zoodles",
    emoji: "🍝",
    ingredients: "Zucchini noodles + turkey meatballs + marinara + parmesan",
    benefits: "High protein, lower carb, satisfying comfort food — no guilt!",
  },
  {
    name: "Chickpea Curry",
    emoji: "🍛",
    ingredients: "Chickpeas + coconut milk + spinach + turmeric + basmati rice",
    benefits: "Gut-friendly, anti-inflammatory, iron-rich for energy",
  },
  {
    name: "Greek Chicken & Roasted Veg",
    emoji: "🫒",
    ingredients: "Chicken thigh + zucchini + eggplant + tomato + feta + herbs",
    benefits: "Lean protein, Mediterranean diet benefits, satisfying and light",
  },
  {
    name: "Black Bean Tacos",
    emoji: "🌮",
    ingredients: "Corn tortillas + black beans + avocado + pickled red onion + lime crema",
    benefits: "Plant-based protein, fiber, folate — Taco Friday!",
  },
  {
    name: "Baked Cod & Asparagus",
    emoji: "🌿",
    ingredients: "Cod fillet + asparagus + lemon + capers + quinoa side",
    benefits: "Light, detoxifying, high protein — perfect Sunday reset dinner",
  },
];

// Healthy snack options (rotate randomly)
const snacks = [
  { name: "Apple + almond butter", emoji: "🍎" },
  { name: "Hummus + veggie sticks", emoji: "🥕" },
  { name: "Handful of mixed nuts & dark chocolate", emoji: "🍫" },
  { name: "Rice cakes + avocado", emoji: "🥑" },
  { name: "Greek yogurt + honey", emoji: "🍯" },
  { name: "Edamame with sea salt", emoji: "🫘" },
  { name: "Banana + peanut butter", emoji: "🍌" },
];

function getTodayLunch()  { return weeklyLunches[new Date().getDay()]; }
function getTodayDinner() { return weeklyDinners[new Date().getDay()]; }
function getTodaySnack()  { return snacks[new Date().getDay()]; }

module.exports = { weeklyLunches, weeklyDinners, snacks, getTodayLunch, getTodayDinner, getTodaySnack };
