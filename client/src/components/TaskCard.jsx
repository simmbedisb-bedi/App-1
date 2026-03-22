import React from "react";

const styles = {
  card: (completed) => ({
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 18px",
    background: completed ? "linear-gradient(135deg, #fce7f3, #ede9fe)" : "#fffbf7",
    borderRadius: "14px",
    border: `2px solid ${completed ? "#f9a8d4" : "#f3e8ff"}`,
    cursor: "pointer",
    transition: "all 0.25s ease",
    userSelect: "none",
    boxShadow: completed ? "0 2px 12px rgba(244,63,94,0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
    transform: completed ? "scale(1.01)" : "scale(1)",
  }),
  checkbox: (completed) => ({
    width: "28px",
    height: "28px",
    minWidth: "28px",
    borderRadius: "50%",
    border: `2px solid ${completed ? "#f43f5e" : "#d1d5db"}`,
    background: completed ? "linear-gradient(135deg, #f43f5e, #a855f7)" : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "14px",
    transition: "all 0.2s ease",
  }),
  emoji: { fontSize: "22px", minWidth: "28px", textAlign: "center" },
  content: { flex: 1 },
  label: (completed) => ({
    fontWeight: 500,
    fontSize: "15px",
    color: completed ? "#6b21a8" : "#1e1b4b",
    textDecoration: completed ? "line-through" : "none",
    opacity: completed ? 0.7 : 1,
  }),
  time: { fontSize: "12px", color: "#9ca3af", marginTop: "2px" },
  points: (completed) => ({
    fontSize: "12px",
    fontWeight: 600,
    color: completed ? "#f43f5e" : "#d1d5db",
    background: completed ? "#fce7f3" : "#f9fafb",
    padding: "2px 8px",
    borderRadius: "99px",
    whiteSpace: "nowrap",
  }),
};

export default function TaskCard({ task, onToggle }) {
  return (
    <div style={styles.card(task.completed)} onClick={() => onToggle(task.id)}
         role="checkbox" aria-checked={task.completed} tabIndex={0}
         onKeyDown={e => e.key === " " && onToggle(task.id)}>
      <div style={styles.emoji}>{task.emoji}</div>
      <div style={styles.checkbox(task.completed)}>
        {task.completed && "✓"}
      </div>
      <div style={styles.content}>
        <div style={styles.label(task.completed)}>{task.label}</div>
        <div style={styles.time}>{task.time}</div>
      </div>
      <div style={styles.points(task.completed)}>+{task.points}pts</div>
    </div>
  );
}
