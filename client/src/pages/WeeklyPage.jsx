import React, { useEffect, useState } from "react";
import axios from "axios";

const TODAY_IDX = new Date().getDay();
const MEAL_TABS = ["breakfast", "lunch", "dinner"];

export default function WeeklyPage() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [dayIdx,  setDayIdx]  = useState(TODAY_IDX);
  const [mealTab, setMealTab] = useState("breakfast");

  useEffect(() => {
    axios.get("/api/workout/week")
      .then(({ data }) => setData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Loading week plan…</div>;
  if (!data)   return <div style={{ padding: 40, textAlign: "center", color: "#f43f5e" }}>Could not load plan.</div>;

  const workout    = data.workouts[dayIdx];
  const mealMap    = { breakfast: data.breakfasts[dayIdx], lunch: data.lunches[dayIdx], dinner: data.dinners[dayIdx] };
  const emojiMap   = { breakfast: data.breakfasts[dayIdx]?.emoji || "🍳", lunch: data.lunches[dayIdx]?.emoji || "🥗", dinner: data.dinners[dayIdx]?.emoji || "🍽️" };

  return (
    <div style={page}>
      <header style={header}>
        <h1 style={h1}>📅 Weekly Plan</h1>
        <p style={sub}>7-day rotating schedule</p>
      </header>

      <div style={content}>
        {/* Day selector */}
        <div style={daySelectorWrap}>
          <div style={daySelector}>
            {data.workouts.map((w, i) => (
              <button key={i} style={dayBtn(i === dayIdx, i === TODAY_IDX)} onClick={() => setDayIdx(i)}>
                <span style={{ fontSize: 11, opacity: 0.8 }}>{w.dayName.slice(0, 3)}</span>
                <span style={{ fontSize: 16 }}>{w.emoji}</span>
                {i === TODAY_IDX && <span style={todayDot} />}
              </button>
            ))}
          </div>
        </div>

        {/* Workout card */}
        <div style={card}>
          <div style={cardHeader}>
            <span style={{ fontSize: 28 }}>{workout.emoji}</span>
            <div>
              <h2 style={cardTitle}>{workout.dayName}</h2>
              <p style={cardType}>{workout.type}</p>
            </div>
            {dayIdx === TODAY_IDX && <span style={todayPill}>TODAY</span>}
          </div>
          <p style={cardMsg}>{workout.message}</p>
          {workout.exercises.length > 0 ? (
            <ul style={exList}>
              {workout.exercises.map((ex, i) => (
                <li key={i} style={exItem}><span style={dot}>•</span>{ex}</li>
              ))}
            </ul>
          ) : (
            <p style={restDay}>🧘‍♀️ Rest & recovery — your muscles grow during rest!</p>
          )}
        </div>

        {/* Meals */}
        <div style={card}>
          <div style={mealTabs}>
            {MEAL_TABS.map(t => (
              <button key={t} style={mealTabBtn(mealTab === t)} onClick={() => setMealTab(t)}>
                {emojiMap[t]} {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          {mealMap[mealTab] && (
            <div>
              <h3 style={mealName}>{mealMap[mealTab].name}</h3>
              <p style={mealIng}>📝 {mealMap[mealTab].ingredients}</p>
              <div style={benefitBox}>
                <span style={benefitLbl}>Why it's great</span>
                <p style={benefitTxt}>{mealMap[mealTab].benefits}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const page         = { minHeight: "100vh", paddingBottom: 90 };
const header       = { background: "linear-gradient(135deg,#f43f5e,#a855f7)", color: "#fff", padding: "28px 24px 24px" };
const h1           = { fontSize: 24, fontFamily: "'Playfair Display',serif" };
const sub          = { fontSize: 13, opacity: 0.8, marginTop: 4 };
const content      = { padding: "20px 16px", maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 };
const daySelectorWrap = { overflowX: "auto", paddingBottom: 4 };
const daySelector  = { display: "flex", gap: 8, minWidth: "max-content" };
const dayBtn       = (a, today) => ({ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "10px 12px", borderRadius: 14, border: `2px solid ${a ? "#f43f5e" : today ? "#fda4af" : "#f3e8ff"}`, background: a ? "linear-gradient(135deg,#f43f5e,#a855f7)" : "#fff", color: a ? "#fff" : "#374151", cursor: "pointer", minWidth: 52, position: "relative", transition: "all 0.2s" });
const todayDot     = { width: 6, height: 6, background: "#f43f5e", borderRadius: "50%", position: "absolute", bottom: 6 };
const todayPill    = { marginLeft: "auto", background: "linear-gradient(135deg,#f43f5e,#a855f7)", color: "#fff", borderRadius: 99, padding: "4px 10px", fontSize: 10, fontWeight: 700, letterSpacing: 0.5 };
const card         = { background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 4px 20px rgba(244,63,94,0.08)", border: "1.5px solid #fce7f3" };
const cardHeader   = { display: "flex", alignItems: "center", gap: 14, marginBottom: 14 };
const cardTitle    = { fontSize: 18, color: "#1e1b4b" };
const cardType     = { fontSize: 13, color: "#9ca3af", marginTop: 2 };
const cardMsg      = { fontSize: 14, color: "#6b7280", lineHeight: 1.6, marginBottom: 14 };
const exList       = { listStyle: "none", display: "flex", flexDirection: "column", gap: 8 };
const exItem       = { fontSize: 14, color: "#374151", display: "flex", gap: 8, lineHeight: 1.5 };
const dot          = { color: "#f43f5e", fontWeight: 700, flexShrink: 0 };
const restDay      = { color: "#10b981", fontWeight: 600, fontSize: 14 };
const mealTabs     = { display: "flex", gap: 8, marginBottom: 16 };
const mealTabBtn   = (a) => ({ flex: 1, padding: "8px 6px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12, background: a ? "linear-gradient(135deg,#f43f5e,#a855f7)" : "#fce7f3", color: a ? "#fff" : "#9d174d", transition: "all 0.2s" });
const mealName     = { fontSize: 17, color: "#1e1b4b", marginBottom: 8 };
const mealIng      = { fontSize: 14, color: "#6b7280", marginBottom: 12, lineHeight: 1.6 };
const benefitBox   = { background: "#d1fae5", borderRadius: 10, padding: "10px 14px" };
const benefitLbl   = { fontSize: 11, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: 0.5 };
const benefitTxt   = { fontSize: 14, color: "#065f46", marginTop: 4 };
