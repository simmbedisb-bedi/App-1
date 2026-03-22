import React from "react";

export default function QuoteCard({ quote }) {
  if (!quote) return null;
  return (
    <div style={card}>
      <span style={mark}>"</span>
      <p style={text}>{quote.text}</p>
      <p style={author}>— {quote.author}</p>
    </div>
  );
}

const card   = { background: "linear-gradient(135deg,#f43f5e,#a855f7)", borderRadius: 16, padding: "18px 22px", color: "#fff", position: "relative", overflow: "hidden" };
const mark   = { position: "absolute", top: -10, left: 14, fontSize: 80, opacity: 0.15, fontFamily: "Georgia,serif", lineHeight: 1 };
const text   = { fontSize: 15, lineHeight: 1.7, fontStyle: "italic", position: "relative" };
const author = { fontSize: 12, opacity: 0.8, marginTop: 8, fontWeight: 600, position: "relative" };
