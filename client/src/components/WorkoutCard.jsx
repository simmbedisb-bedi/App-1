import React, { useState } from "react";

export default function WorkoutCard({ workout, breakfast }) {
  const [tab, setTab] = useState("workout");

  if (!workout) return null;

  return (
    <div style={card}>
      <div style={tabs}>
        {["workout", "breakfast"].map(t => (
          <button key={t} style={tabBtn(tab === t)} onClick={() => setTab(t)}>
            {t === "workout" ? `${workout.emoji} Workout` : `${breakfast?.emoji || "🍳"} Breakfast`}
          </button>
        ))}
      </div>

      {tab === "workout" && (
        <div>
          <h3 style={title}>{workout.type}</h3>
          <p style={msg}>{workout.message}</p>
          {workout.exercises.length > 0 && (
            <ul style={list}>
              {workout.exercises.map((ex, i) => (
                <li key={i} style={listItem}><span style={dot}>•</span>{ex}</li>
              ))}
            </ul>
          )}
          {workout.exercises.length === 0 && (
            <p style={{ color: "#10b981", fontWeight: 500, marginTop: 8 }}>
              🧘‍♀️ Enjoy your rest day — you've earned it!
            </p>
          )}
        </div>
      )}

      {tab === "breakfast" && breakfast && (
        <div>
          <h3 style={title}>{breakfast.name}</h3>
          <p style={sub}>📝 {breakfast.ingredients}</p>
          <div style={benefitBox}>
            <span style={benefitLabel}>Why it's great:</span>
            <p style={benefitText}>{breakfast.benefits}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const card       = { background: "#fff", borderRadius: 18, padding: 22, boxShadow: "0 4px 20px rgba(244,63,94,0.10)", border: "1.5px solid #fce7f3" };
const tabs       = { display: "flex", gap: 8, marginBottom: 18 };
const tabBtn     = (a) => ({ flex: 1, padding: "8px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, background: a ? "linear-gradient(135deg,#f43f5e,#a855f7)" : "#fce7f3", color: a ? "#fff" : "#9d174d", transition: "all 0.2s" });
const title      = { fontSize: 18, marginBottom: 8, color: "#1e1b4b" };
const msg        = { fontSize: 14, color: "#6b7280", marginBottom: 14, lineHeight: 1.6 };
const list       = { listStyle: "none", display: "flex", flexDirection: "column", gap: 8 };
const listItem   = { fontSize: 14, color: "#374151", display: "flex", gap: 8, alignItems: "flex-start", lineHeight: 1.5 };
const dot        = { color: "#f43f5e", fontWeight: 700, marginTop: 1 };
const sub        = { fontSize: 14, color: "#6b7280", marginBottom: 14, lineHeight: 1.6 };
const benefitBox = { background: "#d1fae5", borderRadius: 10, padding: "10px 14px" };
const benefitLabel = { fontSize: 12, fontWeight: 700, color: "#059669", textTransform: "uppercase", letterSpacing: 0.5 };
const benefitText  = { fontSize: 14, color: "#065f46", marginTop: 4 };
