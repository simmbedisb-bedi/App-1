import React, { useEffect, useState } from "react";
import axios from "axios";
import { useChecklist } from "../hooks/useChecklist";
import { useWorkout }   from "../hooks/useWorkout";
import TaskCard         from "../components/TaskCard";
import StatsBar         from "../components/StatsBar";
import WorkoutCard      from "../components/WorkoutCard";
import QuoteCard        from "../components/QuoteCard";
import TestSMS          from "../components/TestSMS";

const DAYS   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function Dashboard() {
  const { tasks, progress, loading, error, toggleTask } = useChecklist();
  const { workout, breakfast, lunch, dinner, quote }    = useWorkout();
  const [justEarned, setJustEarned] = useState(null);

  // Detect newly earned badge after toggle
  const handleToggle = async (taskId) => {
    await toggleTask(taskId);
  };

  const d = new Date();
  const dateStr = `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;

  return (
    <div style={page}>
      {/* Header */}
      <header style={header}>
        <div>
          <h1 style={h1}>✨ My Daily Glow</h1>
          <p style={subtitle}>{getGreeting()}, gorgeous! 🌸</p>
          <p style={dateText}>{dateStr}</p>
        </div>
        {progress && (
          <div style={streakBadge}>
            <span style={{ fontSize: 26 }}>🔥</span>
            <span style={streakNum}>{progress.streak}</span>
            <span style={streakLbl}>day streak</span>
          </div>
        )}
      </header>

      <div style={content}>
        {/* Daily quote */}
        {quote && <QuoteCard quote={quote} />}

        {/* Stats */}
        {progress && <StatsBar progress={progress} />}

        {/* Today's plan */}
        {workout && <WorkoutCard workout={workout} breakfast={breakfast} lunch={lunch} dinner={dinner} />}

        {/* Checklist */}
        <div style={section}>
          <h2 style={h2}>Today's Checklist</h2>
          {loading && <p style={muted}>Loading your tasks…</p>}
          {error   && <p style={errStyle}>{error}</p>}
          {!loading && !error && (
            <div style={taskList}>
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} onToggle={handleToggle} />
              ))}
            </div>
          )}
        </div>

        {/* Perfect day banner */}
        {progress?.percentage === 100 && (
          <div style={completeBanner}>
            <span style={{ fontSize: 34 }}>🎉</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>PERFECT DAY!</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 3 }}>
                All {progress.totalCount} tasks complete. You are absolutely crushing it, queen!
              </div>
            </div>
          </div>
        )}

        {/* Notifications tester */}
        <div style={section}>
          <h2 style={h2}>SMS Notifications</h2>
          <p style={muted}>15 daily messages auto-fire on schedule. Test any message below:</p>
          <TestSMS />
        </div>
      </div>
    </div>
  );
}

const page          = { minHeight: "100vh", paddingBottom: 90 };
const header        = { background: "linear-gradient(135deg,#f43f5e,#a855f7)", color: "#fff", padding: "30px 24px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" };
const h1            = { fontSize: 26, fontFamily: "'Playfair Display',serif", fontWeight: 700 };
const subtitle      = { fontSize: 15, opacity: 0.9, marginTop: 4 };
const dateText      = { fontSize: 13, opacity: 0.7, marginTop: 2 };
const streakBadge   = { background: "rgba(255,255,255,0.2)", borderRadius: 14, padding: "12px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 70 };
const streakNum     = { fontSize: 22, fontWeight: 700 };
const streakLbl     = { fontSize: 10, opacity: 0.8 };
const content       = { padding: "20px 16px", maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 };
const section       = { display: "flex", flexDirection: "column", gap: 12 };
const h2            = { fontSize: 20, color: "#1e1b4b" };
const taskList      = { display: "flex", flexDirection: "column", gap: 10 };
const muted         = { fontSize: 13, color: "#9ca3af" };
const errStyle      = { fontSize: 14, color: "#f43f5e", background: "#fce7f3", padding: "10px 14px", borderRadius: 10 };
const completeBanner= { background: "linear-gradient(135deg,#f43f5e,#a855f7)", color: "#fff", borderRadius: 16, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 };
