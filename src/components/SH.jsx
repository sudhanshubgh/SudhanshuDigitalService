import React from "react";

export default function SH({ tag, tagIcon: Icon, h1, h2, sub, delay = 0 }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <div className="reveal pill" style={{ transitionDelay: `${delay}s`, display: "inline-flex" }}>
        {Icon && <Icon size={12} />} {tag}
      </div>
      <h2 className="reveal" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, transitionDelay: `${delay + 0.08}s` }}>
        {h1} <span className="gtxt">{h2}</span>
      </h2>
      {sub && <p className="reveal" style={{ color: "var(--cm)", fontSize: 15, marginTop: 14, maxWidth: 560, margin: "14px auto 0", lineHeight: 1.6, transitionDelay: `${delay + 0.14}s` }}>{sub}</p>}
    </div>
  );
}
