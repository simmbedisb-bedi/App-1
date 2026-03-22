/**
 * Simple JSON file-based storage (no DB required for MVP).
 * Stores progress per day: { "2024-01-15": { completedTasks: [...], points: 0 } }
 */
const fs   = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../data/progress.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({}));
}

function loadData() {
  ensureDataDir();
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveData(data) {
  ensureDataDir();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
}

function getTodayProgress() {
  const data = loadData();
  const today = getTodayKey();
  if (!data[today]) {
    data[today] = { completedTasks: [], points: 0, date: today };
    saveData(data);
  }
  return data[today];
}

function updateTodayProgress(completedTasks, points) {
  const data = loadData();
  const today = getTodayKey();
  data[today] = { completedTasks, points, date: today };
  saveData(data);
  return data[today];
}

function getAllProgress() {
  return loadData();
}

function getStreakCount() {
  const data = loadData();
  const dates = Object.keys(data).sort().reverse();
  let streak = 0;

  for (const date of dates) {
    const entry = data[date];
    // Count day as "completed" if at least 50% of tasks done
    if (entry.completedTasks && entry.completedTasks.length >= 6) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

module.exports = { getTodayProgress, updateTodayProgress, getAllProgress, getStreakCount };
