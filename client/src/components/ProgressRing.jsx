import React from "react";

export default function ProgressRing({ percentage = 0, size = 120, stroke = 10 }) {
  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;
  const offset = circ - (percentage / 100) * circ;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      {/* Background circle */}
      <circle cx={size/2} cy={size/2} r={r}
        fill="none" stroke="#fce7f3" strokeWidth={stroke} />
      {/* Progress circle */}
      <circle cx={size/2} cy={size/2} r={r}
        fill="none"
        stroke="url(#ringGradient)"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <defs>
        <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  );
}
