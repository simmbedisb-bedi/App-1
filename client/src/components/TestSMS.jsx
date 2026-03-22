import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TestSMS() {
  const [schedule, setSchedule] = useState([]);
  const [open,     setOpen]     = useState(false);
  const [loading,  setLoading]  = useState(null);
  const [preview,  setPreview]  = useState(null);

  useEffect(() => {
    axios.get("/api/notifications/schedule")
      .then(({ data }) => setSchedule(data.schedule))
      .catch(() => {});
  }, []);

  const sendTest = async (name) => {
    setLoading(name);
    setPreview(null);
    try {
      const { data } = await axios.post("/api/notifications/test", { type: name });
      setPreview({ message: data.message, isPreview: data.preview });
    } catch {
      setPreview({ message: "Error sending test. Is the server running?", isPreview: true });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={wrapper}>
      <button style={toggle} onClick={() => { setOpen(!open); setPreview(null); }}>
        📱 {open ? "Hide" : "Test"} SMS Notifications
      </button>

      {open && (
        <div style={panel}>
          <p style={hint}>Tap any notification to preview or send a test SMS:</p>
          <div style={grid}>
            {schedule.map(n => (
              <button key={n.name} style={btn(loading === n.name)}
                onClick={() => sendTest(n.name)} disabled={!!loading}>
                <span style={{ fontSize: 16 }}>{n.emoji}</span>
                <span style={{ fontSize: 11, lineHeight: 1.3 }}>
                  {loading === n.name ? "Sending…" : n.label}
                </span>
              </button>
            ))}
          </div>

          {preview && (
            <div style={previewBox(preview.isPreview)}>
              <div style={previewLabel}>
                {preview.isPreview ? "📋 Message Preview (configure Twilio to send for real):" : "✅ SMS Sent!"}
              </div>
              <pre style={previewText}>{preview.message}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const wrapper     = { borderRadius: 18, overflow: "hidden" };
const toggle      = { width: "100%", padding: "14px 20px", background: "linear-gradient(135deg,#1e1b4b,#4c1d95)", color: "#fff", border: "none", borderRadius: 14, cursor: "pointer", fontWeight: 600, fontSize: 14 };
const panel       = { background: "#fff", border: "1.5px solid #fce7f3", borderTop: "none", borderRadius: "0 0 14px 14px", padding: 18 };
const hint        = { fontSize: 12, color: "#9ca3af", marginBottom: 12 };
const grid        = { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 };
const btn         = (a) => ({ padding: "10px 6px", borderRadius: 10, border: "1.5px solid #f3e8ff", background: a ? "#fce7f3" : "#fffbf7", cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#4c1d95", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 });
const previewBox  = (p) => ({ marginTop: 14, background: p ? "#fffbf7" : "#d1fae5", borderRadius: 10, padding: "12px 14px", border: `1.5px solid ${p ? "#fce7f3" : "#6ee7b7"}` });
const previewLabel = { fontSize: 11, fontWeight: 700, color: "#6b7280", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.4 };
const previewText = { fontSize: 13, whiteSpace: "pre-wrap", color: "#1e1b4b", lineHeight: 1.7, fontFamily: "inherit" };
