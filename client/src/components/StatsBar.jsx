import React from "react";
import ProgressRing from "./ProgressRing";

export default function StatsBar({ progress }) {
  if (!progress) return null;

  const stats = [
    { label: "Points Today",  value: `${progress.points}`, sub: `/${progress.totalPoints} max`,  color: "#f43f5e" },
    { label: "Tasks Done",    value: `${progress.completedCount}`, sub: `/${progress.totalCount} tasks`, color: "#a855f7" },
    { label: "Day Streak 🔥", value: `${progress.streak}`,  sub: "days in a row",               color: "#f59e0b" },
  ];

  return (
    <div style={wrapper}>
      {/* Ring + completion % */}
      <div style={ringBox}>
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <ProgressRing percentage={progress.percentage} size={110} stroke={10} />
          <div style={ringLabel}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#f43f5e" }}>{progress.percentage}%</span>
            <span style={{ fontSize: 10, color: "#9ca3af" }}>complete</span>
          </div>
        </div>
      </div>

      {/* Stat chips */}
      <div style={chips}>
        {stats.map(s => (
          <div key={s.label} style={chip}>
            <span style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: 11, color: "#9ca3af" }}>{s.sub}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const wrapper  = { display: "flex", alignItems: "center", gap: 20, background: "#fff", borderRadius: 18, padding: "18px 22px", boxShadow: "0 4px 20px rgba(244,63,94,0.08)", border: "1.5px solid #fce7f3", flexWrap: "wrap" };
const ringBox  = { display: "flex", alignItems: "center", justifyContent: "center" };
const ringLabel= { position: "absolute", display: "flex", flexDirection: "column", alignItems: "center" };
const chips    = { display: "flex", gap: 12, flex: 1, flexWrap: "wrap" };
const chip     = { flex: 1, minWidth: 80, display: "flex", flexDirection: "column", alignItems: "center", background: "#fffbf7", borderRadius: 12, padding: "12px 8px", border: "1px solid #fce7f3", gap: 2 };
