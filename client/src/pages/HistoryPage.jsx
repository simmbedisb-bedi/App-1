import React, { useEffect, useState } from "react";
import axios from "axios";

const TOTAL_TASKS = 12;

export default function HistoryPage() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/checklist/history")
      .then(({ data }) => setData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (!data)   return <Error />;

  const { entries, streak, totalDays, totalPts, perfectDays } = data;

  return (
    <div style={page}>
      <header style={header}>
        <h1 style={h1}>📊 My Progress</h1>
        <p style={sub}>Your {totalDays}-day journey so far</p>
      </header>

      <div style={content}>
        {/* Summary chips */}
        <div style={chipRow}>
          {[
            { label: "Day Streak",    value: streak,      emoji: "🔥" },
            { label: "Total Days",    value: totalDays,   emoji: "📅" },
            { label: "Perfect Days",  value: perfectDays, emoji: "⭐" },
            { label: "Total Points",  value: totalPts,    emoji: "✨" },
          ].map(c => (
            <div key={c.label} style={chip}>
              <span style={{ fontSize: 22 }}>{c.emoji}</span>
              <span style={chipVal}>{c.value}</span>
              <span style={chipLbl}>{c.label}</span>
            </div>
          ))}
        </div>

        {/* Day entries */}
        {entries.length === 0 ? (
          <div style={empty}>
            <p style={{ fontSize: 40, marginBottom: 12 }}>🌱</p>
            <p style={{ fontWeight: 600, color: "#1e1b4b" }}>No history yet!</p>
            <p style={{ fontSize: 14, color: "#9ca3af", marginTop: 4 }}>Start checking off tasks today to build your streak.</p>
          </div>
        ) : (
          <div style={entriesList}>
            {entries.map(entry => (
              <DayEntry key={entry.date} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DayEntry({ entry }) {
  const pct       = Math.round((entry.completedTasks.length / TOTAL_TASKS) * 100);
  const perfect   = pct === 100;
  const dateLabel = formatDate(entry.date);

  return (
    <div style={entryCard(perfect)}>
      <div style={entryLeft}>
        <div style={entryDate}>{dateLabel}</div>
        <div style={entryStats}>
          <span style={entryCount}>{entry.completedTasks.length}/{TOTAL_TASKS} tasks</span>
          <span style={entryPts}>+{entry.points}pts</span>
        </div>
        {/* Mini progress bar */}
        <div style={barBg}>
          <div style={barFill(pct, perfect)} />
        </div>
      </div>
      <div style={entryRight}>
        {perfect ? (
          <div style={perfectBadge}>⭐ Perfect</div>
        ) : (
          <div style={pctBadge(pct)}>{pct}%</div>
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  const days   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

function Loader() {
  return <div style={{ textAlign: "center", padding: 60, color: "#9ca3af" }}>Loading history…</div>;
}
function Error() {
  return <div style={{ textAlign: "center", padding: 60, color: "#f43f5e" }}>Could not load history. Is the server running?</div>;
}

const page        = { minHeight: "100vh", paddingBottom: 90 };
const header      = { background: "linear-gradient(135deg,#f43f5e,#a855f7)", color: "#fff", padding: "28px 24px 24px" };
const h1          = { fontSize: 24, fontFamily: "'Playfair Display',serif" };
const sub         = { fontSize: 13, opacity: 0.8, marginTop: 4 };
const content     = { padding: "20px 16px", maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 };
const chipRow     = { display: "flex", gap: 10, flexWrap: "wrap" };
const chip        = { flex: "1 1 80px", background: "#fff", borderRadius: 14, padding: "14px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, boxShadow: "0 2px 10px rgba(244,63,94,0.08)", border: "1.5px solid #fce7f3" };
const chipVal     = { fontSize: 20, fontWeight: 700, color: "#f43f5e" };
const chipLbl     = { fontSize: 10, color: "#9ca3af", fontWeight: 500, textAlign: "center" };
const entriesList = { display: "flex", flexDirection: "column", gap: 10 };
const entryCard   = (p) => ({ background: "#fff", borderRadius: 14, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, border: `1.5px solid ${p ? "#fda4af" : "#f3e8ff"}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" });
const entryLeft   = { flex: 1 };
const entryDate   = { fontWeight: 600, fontSize: 14, color: "#1e1b4b", marginBottom: 4 };
const entryStats  = { display: "flex", gap: 10, marginBottom: 8 };
const entryCount  = { fontSize: 12, color: "#6b7280" };
const entryPts    = { fontSize: 12, fontWeight: 600, color: "#f43f5e" };
const barBg       = { height: 6, background: "#f3e8ff", borderRadius: 99, overflow: "hidden" };
const barFill     = (p, perfect) => ({ height: "100%", width: `${p}%`, background: perfect ? "linear-gradient(90deg,#f43f5e,#a855f7)" : "#c4b5fd", borderRadius: 99, transition: "width 0.5s ease" });
const entryRight  = { display: "flex", alignItems: "center" };
const perfectBadge= { background: "linear-gradient(135deg,#f43f5e,#a855f7)", color: "#fff", borderRadius: 10, padding: "6px 10px", fontSize: 12, fontWeight: 700 };
const pctBadge    = (p) => ({ background: p >= 75 ? "#d1fae5" : p >= 50 ? "#fef3c7" : "#fce7f3", color: p >= 75 ? "#059669" : p >= 50 ? "#d97706" : "#e11d48", borderRadius: 10, padding: "6px 12px", fontSize: 14, fontWeight: 700 });
const empty       = { textAlign: "center", padding: "40px 20px", background: "#fff", borderRadius: 18, border: "1.5px solid #fce7f3" };
