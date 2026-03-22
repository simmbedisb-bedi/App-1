import React, { useEffect, useState } from "react";
import axios from "axios";

export default function BadgesPage() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/badges")
      .then(({ data }) => setData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#9ca3af" }}>Loading badges…</div>;
  if (!data)   return <div style={{ padding: 40, textAlign: "center", color: "#f43f5e" }}>Could not load badges.</div>;

  const earned  = data.badges.filter(b => b.earned);
  const locked  = data.badges.filter(b => !b.earned);
  const pct     = Math.round((earned.length / data.total) * 100);

  return (
    <div style={page}>
      <header style={header}>
        <h1 style={h1}>🏆 My Badges</h1>
        <p style={sub}>{earned.length} of {data.total} earned</p>
      </header>

      <div style={content}>
        {/* Progress bar */}
        <div style={progressCard}>
          <div style={progressTop}>
            <span style={progressLabel}>Collection Progress</span>
            <span style={progressPct}>{pct}%</span>
          </div>
          <div style={barBg}>
            <div style={barFill(pct)} />
          </div>
          <p style={progressSub}>
            {earned.length === 0
              ? "Complete tasks every day to start earning badges! 🌱"
              : `You've earned ${earned.length} badge${earned.length > 1 ? "s" : ""}. Keep going! 💪`}
          </p>
        </div>

        {/* Earned badges */}
        {earned.length > 0 && (
          <section>
            <h2 style={sectionTitle}>✨ Earned</h2>
            <div style={grid}>
              {earned.map(b => <BadgeCard key={b.id} badge={b} earned />)}
            </div>
          </section>
        )}

        {/* Locked badges */}
        <section>
          <h2 style={sectionTitle}>🔒 Coming Up</h2>
          <div style={grid}>
            {locked.map(b => <BadgeCard key={b.id} badge={b} earned={false} />)}
          </div>
        </section>
      </div>
    </div>
  );
}

function BadgeCard({ badge, earned }) {
  return (
    <div style={card(earned)}>
      <span style={emoji(earned)}>{badge.emoji}</span>
      <div style={name(earned)}>{badge.name}</div>
      <div style={desc}>{badge.desc}</div>
      {earned && <div style={earnedPill}>Earned ✓</div>}
    </div>
  );
}

const page         = { minHeight: "100vh", paddingBottom: 90 };
const header       = { background: "linear-gradient(135deg,#f59e0b,#f43f5e)", color: "#fff", padding: "28px 24px 24px" };
const h1           = { fontSize: 24, fontFamily: "'Playfair Display',serif" };
const sub          = { fontSize: 13, opacity: 0.8, marginTop: 4 };
const content      = { padding: "20px 16px", maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 };
const progressCard = { background: "#fff", borderRadius: 18, padding: 20, boxShadow: "0 4px 20px rgba(244,63,94,0.08)", border: "1.5px solid #fce7f3" };
const progressTop  = { display: "flex", justifyContent: "space-between", marginBottom: 10 };
const progressLabel= { fontWeight: 600, fontSize: 14, color: "#1e1b4b" };
const progressPct  = { fontWeight: 700, fontSize: 16, color: "#f43f5e" };
const barBg        = { height: 10, background: "#f3e8ff", borderRadius: 99, overflow: "hidden", marginBottom: 12 };
const barFill      = (p) => ({ height: "100%", width: `${p}%`, background: "linear-gradient(90deg,#f59e0b,#f43f5e)", borderRadius: 99, transition: "width 0.6s ease" });
const progressSub  = { fontSize: 13, color: "#9ca3af" };
const sectionTitle = { fontSize: 18, color: "#1e1b4b", marginBottom: 12 };
const grid         = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
const card         = (e) => ({ background: e ? "#fff" : "#f9fafb", borderRadius: 16, padding: "18px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center", border: `2px solid ${e ? "#fda4af" : "#e5e7eb"}`, boxShadow: e ? "0 4px 16px rgba(244,63,94,0.12)" : "none", opacity: e ? 1 : 0.6 });
const emoji        = (e) => ({ fontSize: 36, filter: e ? "none" : "grayscale(100%)" });
const name         = (e) => ({ fontWeight: 700, fontSize: 14, color: e ? "#1e1b4b" : "#9ca3af" });
const desc         = { fontSize: 12, color: "#9ca3af", lineHeight: 1.4 };
const earnedPill   = { background: "linear-gradient(135deg,#f43f5e,#a855f7)", color: "#fff", borderRadius: 99, padding: "3px 10px", fontSize: 11, fontWeight: 700, marginTop: 4 };
