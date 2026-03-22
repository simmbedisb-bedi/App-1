import React, { useState } from "react";
import axios from "axios";

const TYPES = [
  { id: "wake-up",   label: "7:00 AM Wake Up",  emoji: "☀️" },
  { id: "bathroom",  label: "7:15 AM Bathroom",  emoji: "🪥" },
  { id: "coffee",    label: "7:30 AM Coffee",    emoji: "☕" },
  { id: "workout",   label: "7:45 AM Workout",   emoji: "🏋️‍♀️" },
  { id: "shower",    label: "8:00 AM Shower",    emoji: "🚿" },
  { id: "breakfast", label: "9:00 AM Breakfast", emoji: "🍳" },
];

export default function TestSMS() {
  const [open,    setOpen]    = useState(false);
  const [loading, setLoading] = useState(null);
  const [preview, setPreview] = useState(null);

  const sendTest = async (type) => {
    setLoading(type);
    setPreview(null);
    try {
      const { data } = await axios.post("/api/notifications/test", { type });
      setPreview({ message: data.message, isPreview: data.preview });
    } catch {
      setPreview({ message: "Error sending test. Check server.", isPreview: true });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={wrapper}>
      <button style={toggle} onClick={() => { setOpen(!open); setPreview(null); }}>
        📱 {open ? "Hide" : "Test"} Notifications
      </button>

      {open && (
        <div style={panel}>
          <p style={hint}>Send a test message to preview each notification:</p>
          <div style={grid}>
            {TYPES.map(t => (
              <button key={t.id} style={btn(loading === t.id)} onClick={() => sendTest(t.id)} disabled={!!loading}>
                {loading === t.id ? "Sending…" : `${t.emoji} ${t.label}`}
              </button>
            ))}
          </div>

          {preview && (
            <div style={previewBox(preview.isPreview)}>
              <div style={previewLabel}>
                {preview.isPreview ? "📋 Message Preview (no Twilio yet):" : "✅ SMS Sent!"}
              </div>
              <pre style={previewText}>{preview.message}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const wrapper      = { borderRadius: 18, overflow: "hidden" };
const toggle       = { width: "100%", padding: "14px 20px", background: "linear-gradient(135deg,#1e1b4b,#4c1d95)", color: "#fff", border: "none", borderRadius: 14, cursor: "pointer", fontWeight: 600, fontSize: 14 };
const panel        = { background: "#fff", border: "1.5px solid #fce7f3", borderTop: "none", borderRadius: "0 0 14px 14px", padding: 18 };
const hint         = { fontSize: 13, color: "#9ca3af", marginBottom: 12 };
const grid         = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 };
const btn          = (active) => ({ padding: "10px 8px", borderRadius: 10, border: "1.5px solid #f3e8ff", background: active ? "#fce7f3" : "#fffbf7", cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#4c1d95", transition: "all 0.2s" });
const previewBox   = (p) => ({ marginTop: 14, background: p ? "#fffbf7" : "#d1fae5", borderRadius: 10, padding: "12px 14px", border: `1.5px solid ${p ? "#fce7f3" : "#6ee7b7"}` });
const previewLabel = { fontSize: 12, fontWeight: 700, color: "#6b7280", marginBottom: 6 };
const previewText  = { fontSize: 13, whiteSpace: "pre-wrap", color: "#1e1b4b", lineHeight: 1.6, fontFamily: "inherit" };
