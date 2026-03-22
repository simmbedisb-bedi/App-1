import React, { useEffect, useState } from "react";
import axios from "axios";

const TIMEZONES = [
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "America/Phoenix",
  "Europe/London",
  "Europe/Paris",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Australia/Sydney",
];

export default function SettingsPage() {
  const [settings, setSettings] = useState(null);
  const [form,     setForm]     = useState({});
  const [saving,   setSaving]   = useState(false);
  const [saved,    setSaved]    = useState(false);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    axios.get("/api/settings")
      .then(({ data }) => {
        setSettings(data.settings);
        setForm(data.settings);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const { data } = await axios.patch("/api/settings", form);
      setSettings(data.settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Could not save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Loading settings…</div>;

  const started   = settings?.startDate;
  const dayNumber = started
    ? Math.floor((Date.now() - new Date(started).getTime()) / 86400000) + 1
    : 1;

  return (
    <div style={page}>
      <header style={header}>
        <h1 style={h1}>⚙️ Settings</h1>
        <p style={sub}>Configure your routine tracker</p>
      </header>

      <div style={content}>
        {/* Program progress */}
        <div style={infoCard}>
          <h2 style={sectionTitle}>🗓️ Program Status</h2>
          <div style={infoRow}>
            <span style={infoLabel}>Start Date</span>
            <span style={infoVal}>{settings?.startDate || "—"}</span>
          </div>
          <div style={infoRow}>
            <span style={infoLabel}>Day Number</span>
            <span style={infoVal}>Day {Math.min(dayNumber, 60)} of 60</span>
          </div>
          <div style={infoRow}>
            <span style={infoLabel}>Total Points</span>
            <span style={infoVal}>{settings?.totalPoints || 0} pts ✨</span>
          </div>
          {/* 60-day bar */}
          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: "#9ca3af" }}>60-Day Journey</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#f43f5e" }}>{Math.min(dayNumber, 60)}/60</span>
            </div>
            <div style={barBg}>
              <div style={barFill(Math.round((Math.min(dayNumber, 60) / 60) * 100))} />
            </div>
          </div>
        </div>

        {/* SMS Settings */}
        <div style={formCard}>
          <h2 style={sectionTitle}>📱 SMS Notifications</h2>
          <p style={hint}>Enter your Twilio credentials in <code style={code}>server/.env</code> to enable real SMS. Use the Test panel on the Dashboard to preview messages anytime.</p>

          <label style={label}>Your Phone Number</label>
          <input
            style={input}
            type="tel"
            placeholder="+1 555 000 0000"
            value={form.phoneNumber || ""}
            onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
          />
          <p style={inputHint}>This is saved locally for reference. Set in server/.env for Twilio.</p>

          <label style={label}>Timezone</label>
          <select
            style={select}
            value={form.timezone || "America/New_York"}
            onChange={e => setForm(f => ({ ...f, timezone: e.target.value }))}
          >
            {TIMEZONES.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
          <p style={inputHint}>Notifications fire at the listed times in this timezone.</p>
        </div>

        {/* Schedule overview */}
        <div style={scheduleCard}>
          <h2 style={sectionTitle}>⏰ Daily Notification Schedule</h2>
          <div style={scheduleList}>
            {SCHEDULE.map(n => (
              <div key={n.name} style={scheduleRow}>
                <span style={{ fontSize: 18 }}>{n.emoji}</span>
                <span style={scheduleTime}>{n.time}</span>
                <span style={scheduleLabel}>{n.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button style={saveBtn(saving)} onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Settings"}
        </button>
      </div>
    </div>
  );
}

const SCHEDULE = [
  { emoji: "☀️",  time: "7:00 AM",  label: "Wake up",            name: "wake-up" },
  { emoji: "🪥",  time: "7:15 AM",  label: "Freshen up",         name: "bathroom" },
  { emoji: "☕",  time: "7:30 AM",  label: "Coffee time",        name: "coffee" },
  { emoji: "🏋️‍♀️", time: "7:45 AM",  label: "Workout + exercises",name: "workout" },
  { emoji: "🚿",  time: "8:00 AM",  label: "Shower",             name: "shower" },
  { emoji: "🍳",  time: "9:00 AM",  label: "Breakfast",          name: "breakfast" },
  { emoji: "✨",  time: "9:30 AM",  label: "Morning skincare",   name: "skincare-am" },
  { emoji: "📓",  time: "10:00 AM", label: "Journal / gratitude",name: "journal-am" },
  { emoji: "💧",  time: "12:00 PM", label: "Hydration check",    name: "hydration" },
  { emoji: "🥗",  time: "12:30 PM", label: "Lunch suggestion",   name: "lunch" },
  { emoji: "🍎",  time: "3:00 PM",  label: "Afternoon snack",    name: "snack" },
  { emoji: "🍽️",  time: "6:30 PM",  label: "Dinner suggestion",  name: "dinner" },
  { emoji: "🌙",  time: "8:00 PM",  label: "Evening skincare",   name: "skincare-pm" },
  { emoji: "🧘‍♀️", time: "9:30 PM",  label: "Wind-down routine",  name: "wind-down" },
  { emoji: "🌸",  time: "10:30 PM", label: "Sleep reminder",     name: "sleep" },
];

const page         = { minHeight: "100vh", paddingBottom: 90 };
const header       = { background: "linear-gradient(135deg,#1e1b4b,#4c1d95)", color: "#fff", padding: "28px 24px 24px" };
const h1           = { fontSize: 24, fontFamily: "'Playfair Display',serif" };
const sub          = { fontSize: 13, opacity: 0.8, marginTop: 4 };
const content      = { padding: "20px 16px", maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 };
const sectionTitle = { fontSize: 17, color: "#1e1b4b", marginBottom: 14, fontFamily: "'Playfair Display',serif" };
const infoCard     = { background: "#fff", borderRadius: 18, padding: 20, border: "1.5px solid #fce7f3", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" };
const infoRow      = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #f3e8ff" };
const infoLabel    = { fontSize: 14, color: "#6b7280" };
const infoVal      = { fontSize: 14, fontWeight: 600, color: "#1e1b4b" };
const barBg        = { height: 8, background: "#f3e8ff", borderRadius: 99, overflow: "hidden" };
const barFill      = (p) => ({ height: "100%", width: `${p}%`, background: "linear-gradient(90deg,#f43f5e,#a855f7)", borderRadius: 99 });
const formCard     = { background: "#fff", borderRadius: 18, padding: 20, border: "1.5px solid #fce7f3", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 6 };
const hint         = { fontSize: 13, color: "#9ca3af", lineHeight: 1.6, marginBottom: 8 };
const label        = { fontSize: 13, fontWeight: 600, color: "#374151", marginTop: 8 };
const input        = { padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, color: "#1e1b4b", outline: "none", width: "100%" };
const select       = { padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e5e7eb", fontSize: 14, color: "#1e1b4b", outline: "none", width: "100%", background: "#fff" };
const inputHint    = { fontSize: 11, color: "#d1d5db" };
const code         = { background: "#f3f4f6", padding: "1px 6px", borderRadius: 4, fontSize: 12, fontFamily: "monospace" };
const scheduleCard = { background: "#fff", borderRadius: 18, padding: 20, border: "1.5px solid #fce7f3", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" };
const scheduleList = { display: "flex", flexDirection: "column", gap: 4 };
const scheduleRow  = { display: "flex", alignItems: "center", gap: 12, padding: "7px 0", borderBottom: "1px solid #fce7f3" };
const scheduleTime = { fontSize: 13, fontWeight: 700, color: "#f43f5e", minWidth: 70 };
const scheduleLabel= { fontSize: 13, color: "#374151" };
const saveBtn      = (saving) => ({ padding: "16px", borderRadius: 14, border: "none", cursor: saving ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 15, background: saving ? "#e5e7eb" : "linear-gradient(135deg,#f43f5e,#a855f7)", color: saving ? "#9ca3af" : "#fff", transition: "all 0.2s", boxShadow: "0 4px 16px rgba(244,63,94,0.3)" });
