/**
 * JSON file-based storage.
 * progress.json: { "YYYY-MM-DD": { completedTasks, points, date } }
 * settings.json: { phoneNumber, timezone, startDate, totalPoints }
 */
const fs   = require("fs");
const path = require("path");
const { BADGES }       = require("../data/badges");
const { defaultTasks } = require("../data/checklist");

const DATA_DIR      = path.join(__dirname, "../../data");
const PROGRESS_FILE = path.join(DATA_DIR, "progress.json");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR))      fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(PROGRESS_FILE)) fs.writeFileSync(PROGRESS_FILE, JSON.stringify({}));
  if (!fs.existsSync(SETTINGS_FILE)) fs.writeFileSync(SETTINGS_FILE, JSON.stringify({
    phoneNumber: "", timezone: "America/New_York", startDate: new Date().toISOString().split("T")[0], totalPoints: 0,
  }));
}

function loadProgress() { ensureDataDir(); return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8")); }
function saveProgress(d) { ensureDataDir(); fs.writeFileSync(PROGRESS_FILE, JSON.stringify(d, null, 2)); }
function loadSettings() { ensureDataDir(); return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8")); }
function saveSettings(s) { ensureDataDir(); fs.writeFileSync(SETTINGS_FILE, JSON.stringify(s, null, 2)); }

function getTodayKey() { return new Date().toISOString().split("T")[0]; }

function getTodayProgress() {
  const data  = loadProgress();
  const today = getTodayKey();
  if (!data[today]) { data[today] = { completedTasks: [], points: 0, date: today }; saveProgress(data); }
  return data[today];
}

function updateTodayProgress(completedTasks, points) {
  const data  = loadProgress();
  const today = getTodayKey();
  data[today] = { completedTasks, points, date: today };
  // Update cumulative total points in settings
  const totalPoints = Object.values(data).reduce((s, d) => s + (d.points || 0), 0);
  const settings    = loadSettings();
  settings.totalPoints = totalPoints;
  saveSettings(settings);
  saveProgress(data);
  return data[today];
}

function getAllProgress() { return loadProgress(); }

function getStreakCount() {
  const data  = loadProgress();
  const today = getTodayKey();
  let streak  = 0;

  // Walk backwards from today
  const d = new Date();
  while (true) {
    const key   = d.toISOString().split("T")[0];
    const entry = data[key];
    if (entry && entry.completedTasks && entry.completedTasks.length >= 6) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

function getEarnedBadges() {
  const data     = loadProgress();
  const settings = loadSettings();
  const days     = Object.values(data);
  const streak   = getStreakCount();
  const totalPts = settings.totalPoints || 0;
  const perfectDays  = days.filter(d => d.completedTasks && d.completedTasks.length === defaultTasks.length).length;
  const workoutDays  = days.filter(d => d.completedTasks && d.completedTasks.includes("workout")).length;

  return BADGES.map(badge => {
    let earned = false;
    if (badge.type === "streak")  earned = streak     >= badge.threshold;
    if (badge.type === "points")  earned = totalPts   >= badge.threshold;
    if (badge.type === "perfect") earned = perfectDays >= badge.threshold;
    if (badge.type === "workout") earned = workoutDays >= badge.threshold;
    return { ...badge, earned };
  });
}

function getSettings() { return loadSettings(); }
function updateSettings(partial) {
  const s = { ...loadSettings(), ...partial };
  saveSettings(s);
  return s;
}

module.exports = {
  getTodayProgress, updateTodayProgress,
  getAllProgress, getStreakCount,
  getEarnedBadges, getSettings, updateSettings,
};
