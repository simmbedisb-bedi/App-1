import React, { useState } from "react";

const TABS = [
  { id: "workout",   label: "Workout" },
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch",     label: "Lunch" },
  { id: "dinner",    label: "Dinner" },
];

export default function WorkoutCard({ workout, breakfast, lunch, dinner }) {
  const [tab, setTab] = useState("workout");
  if (!workout) return null;

  const dataMap = { workout, breakfast, lunch, dinner };
  const emojiMap = {
    workout:   workout?.emoji   || "🏋️‍♀️",
    breakfast: breakfast?.emoji || "🍳",
    lunch:     lunch?.emoji     || "🥗",
    dinner:    dinner?.emoji    || "🍽️",
  };

  return (
    <div style={card}>
      <div style={tabs}>
        {TABS.map(t => (
          <button key={t.id} style={tabBtn(tab === t.id)} onClick={() => setTab(t.id)}>
            {emojiMap[t.id]} {t.label}
          </button>
        ))}
      </div>

      {tab === "workout" && <WorkoutPanel workout={workout} />}
      {tab !== "workout" && <MealPanel meal={dataMap[tab]} />}
    </div>
  );
}

function WorkoutPanel({ workout }) {
  return (
    <div>
      <h3 style={title}>{workout.type}</h3>
      <p style={desc}>{workout.message}</p>
      {workout.exercises.length > 0 ? (
        <ul style={list}>
          {workout.exercises.map((ex, i) => (
            <li key={i} style={listItem}><span style={dot}>•</span>{ex}</li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "#10b981", fontWeight: 600, marginTop: 8 }}>
          🧘‍♀️ Rest day — you've earned it! Light stretching optional.
        </p>
      )}
    </div>
  );
}

function MealPanel({ meal }) {
  if (!meal) return <p style={{ color: "#9ca3af" }}>Loading…</p>;
  return (
    <div>
      <h3 style={title}>{meal.name}</h3>
      <p style={desc}>📝 {meal.ingredients}</p>
      <div style={benefitBox}>
        <span style={benefitLabel}>Why it's great</span>
        <p style={benefitText}>{meal.benefits}</p>
      </div>
    </div>
  );
}

const card       = { background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 4px 20px rgba(244,63,94,0.09)", border: "1.5px solid #fce7f3" };
const tabs       = { display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 2 };
const tabBtn     = (a) => ({ padding: "7px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 12, whiteSpace: "nowrap", background: a ? "linear-gradient(135deg,#f43f5e,#a855f7)" : "#fce7f3", color: a ? "#fff" : "#9d174d", transition: "all 0.2s", flexShrink: 0 });
const title      = { fontSize: 17, marginBottom: 8, color: "#1e1b4b" };
const desc       = { fontSize: 14, color: "#6b7280", marginBottom: 14, lineHeight: 1.6 };
const list       = { listStyle: "none", display: "flex", flexDirection: "column", gap: 8 };
const listItem   = { fontSize: 14, color: "#374151", display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.5 };
const dot        = { color: "#f43f5e", fontWeight: 700, flexShrink: 0 };
const benefitBox = { background: "#d1fae5", borderRadius: 10, padding: "10px 14px" };
const benefitLabel = { fontSize: 11, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: 0.5 };
const benefitText  = { fontSize: 14, color: "#065f46", marginTop: 4 };
