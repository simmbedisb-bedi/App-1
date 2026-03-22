const quotes = [
  { text: "She believed she could, so she did.", author: "R.S. Grey" },
  { text: "Well-behaved women seldom make history.", author: "Laurel Thatcher Ulrich" },
  { text: "You are enough. You have always been enough.", author: "Unknown" },
  { text: "Be your own hero. It's cheaper than therapy.", author: "Unknown" },
  { text: "A strong woman looks a challenge in the eye and gives it a wink.", author: "Gina Carey" },
  { text: "Invest in your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn" },
  { text: "You don't have to be perfect to be amazing.", author: "Unknown" },
  { text: "Progress, not perfection.", author: "Unknown" },
  { text: "Your body can do it. It's your mind you need to convince.", author: "Unknown" },
  { text: "Glow differently. Don't glow to outshine others — glow to light your own path.", author: "Unknown" },
  { text: "She is clothed in strength and dignity, and she laughs without fear of the future.", author: "Proverbs 31:25" },
  { text: "Small steps every day lead to massive results.", author: "Unknown" },
  { text: "You are one workout away from a better mood.", author: "Unknown" },
  { text: "Every day is a chance to be better than yesterday.", author: "Unknown" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "You don't find willpower. You build it.", author: "Unknown" },
  { text: "Your future self is watching you right now through your memories. Make her proud.", author: "Unknown" },
  { text: "Nourish to flourish.", author: "Unknown" },
  { text: "Self-care is not selfish. You cannot serve from an empty vessel.", author: "Eleanor Brownn" },
];

function getDailyQuote() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return quotes[dayOfYear % quotes.length];
}

module.exports = { quotes, getDailyQuote };
