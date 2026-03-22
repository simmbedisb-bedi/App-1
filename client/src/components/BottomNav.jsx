import React from "react";

const TABS = [
  { id: "dashboard", label: "Today",   icon: "☀️" },
  { id: "weekly",    label: "Plan",    icon: "📅" },
  { id: "history",   label: "History", icon: "📊" },
  { id: "badges",    label: "Badges",  icon: "🏆" },
  { id: "settings",  label: "Settings",icon: "⚙️" },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav style={nav}>
      {TABS.map(tab => (
        <button key={tab.id} style={btn(active === tab.id)} onClick={() => onChange(tab.id)}>
          <span style={{ fontSize: 20 }}>{tab.icon}</span>
          <span style={lbl(active === tab.id)}>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

const nav = {
  position: "fixed", bottom: 0, left: 0, right: 0,
  background: "#fff",
  borderTop: "1.5px solid #fce7f3",
  display: "flex",
  boxShadow: "0 -4px 20px rgba(244,63,94,0.10)",
  zIndex: 100,
  paddingBottom: "env(safe-area-inset-bottom, 0px)",
};
const btn = (a) => ({
  flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
  gap: 2, padding: "10px 4px 8px",
  background: "none", border: "none", cursor: "pointer",
  borderTop: a ? "2.5px solid #f43f5e" : "2.5px solid transparent",
  transition: "all 0.2s",
});
const lbl = (a) => ({
  fontSize: 10, fontWeight: a ? 700 : 400,
  color: a ? "#f43f5e" : "#9ca3af",
  letterSpacing: 0.3,
});
