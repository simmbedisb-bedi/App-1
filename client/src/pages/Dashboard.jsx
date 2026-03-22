import React from "react";
import { useChecklist } from "../hooks/useChecklist";
import { useWorkout }   from "../hooks/useWorkout";
import TaskCard         from "../components/TaskCard";
import StatsBar         from "../components/StatsBar";
import WorkoutCard      from "../components/WorkoutCard";
import TestSMS          from "../components/TestSMS";

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS= ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  const d = new Date();
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

export default function Dashboard() {
  const { tasks, progress, loading, error, toggleTask } = useChecklist();
  const { workout, breakfast }                          = useWorkout();

  return (
    <div style={page}>
      {/* Header */}
      <header style={header}>
        <div>
          <h1 style={h1}>✨ My Daily Glow</h1>
          <p style={subtitle}>{getGreeting()}, gorgeous! 🌸</p>
          <p style={dateText}>{formatDate()}</p>
        </div>
        {progress && (
          <div style={streakBadge}>
            <span style={{ fontSize: 28 }}>🔥</span>
            <span style={streakNum}>{progress.streak}</span>
            <span style={streakLbl}>day streak</span>
          </div>
        )}
      </header>

      <div style={content}>
        {/* Stats */}
        {progress && <StatsBar progress={progress} />}

        {/* Today's Workout & Breakfast */}
        {workout && <WorkoutCard workout={workout} breakfast={breakfast} />}

        {/* Checklist */}
        <div style={section}>
          <h2 style={h2}>Today's Checklist</h2>
          {loading && <p style={muted}>Loading your tasks…</p>}
          {error   && <p style={errStyle}>{error}</p>}
          {!loading && !error && (
            <div style={taskList}>
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} onToggle={toggleTask} />
              ))}
            </div>
          )}
        </div>

        {/* Completion message */}
        {progress?.percentage === 100 && (
          <div style={completeBanner}>
            <span style={{ fontSize: 32 }}>🎉</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>PERFECT DAY!</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>You completed every task. You're absolutely crushing it!</div>
            </div>
          </div>
        )}

        {/* Test Notifications */}
        <div style={section}>
          <h2 style={h2}>Notifications</h2>
          <p style={muted}>SMS notifications auto-fire daily. Test them here:</p>
          <TestSMS />
        </div>
      </div>
    </div>
  );
}

const page          = { minHeight: "100vh", paddingBottom: 40 };
const header        = { background: "linear-gradient(135deg,#f43f5e,#a855f7)", color: "#fff", padding: "30px 24px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" };
const h1            = { fontSize: 28, fontFamily: "'Playfair Display',serif", fontWeight: 700 };
const subtitle      = { fontSize: 15, opacity: 0.9, marginTop: 4 };
const dateText      = { fontSize: 13, opacity: 0.7, marginTop: 2 };
const streakBadge   = { background: "rgba(255,255,255,0.2)", borderRadius: 14, padding: "12px 18px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 };
const streakNum     = { fontSize: 22, fontWeight: 700 };
const streakLbl     = { fontSize: 11, opacity: 0.8 };
const content       = { padding: "20px 16px", maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 };
const section       = { display: "flex", flexDirection: "column", gap: 12 };
const h2            = { fontSize: 20, color: "#1e1b4b" };
const taskList      = { display: "flex", flexDirection: "column", gap: 10 };
const muted         = { fontSize: 13, color: "#9ca3af" };
const errStyle      = { fontSize: 14, color: "#f43f5e", background: "#fce7f3", padding: "10px 14px", borderRadius: 10 };
const completeBanner= { background: "linear-gradient(135deg,#f43f5e,#a855f7)", color: "#fff", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 };
