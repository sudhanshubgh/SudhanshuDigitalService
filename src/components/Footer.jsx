import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SERVICES } from "../data/sharedData.js";

const NAV = [
  { l: "Home", to: "/" },
  { l: "Services", to: "/services" },
  { l: "Interactive Tools", to: "/tools" },
  { l: "Portfolio", to: "/portfolio" },
  { l: "About", to: "/about" },
  { l: "Contact", to: "/contact" }
];

export default function Footer({ dark }) {
  return (
    <footer style={{
      background: dark ? "#03020a" : "#100d22",
      color: "rgba(255,255,255,.55)",
      padding: "60px 24px 28px",
      borderTop: "1px solid rgba(124,58,237,.15)",
      position: "relative",
      zIndex: 10
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 44, flexWrap: "wrap", justifyContent: "space-between", marginBottom: 50 }}>
          
          {/* Brand Column */}
          <div style={{ flex: "2 1 280px", maxWidth: 380 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 18 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden", border: "1px solid rgba(255,255,255,.1)"
              }}>
                <img src="/icon-192.png" alt="Sudhanshu Digital Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14.5, color: "#fff", letterSpacing: "-.2px" }}>Sudhanshu Digital</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)", marginTop: -1, letterSpacing: "1px", textTransform: "uppercase" }}>Services</div>
              </div>
            </div>
            <p style={{ fontSize: 13.5, lineHeight: 1.7, marginBottom: 20, color: "rgba(255,255,255,.5)" }}>
              High-converting website development, ATS resume rewrites, LinkedIn optimization, and 1-on-1 test automation mentorship to launch your success.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                {
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  ),
                  h: "https://www.linkedin.com/in/sudhanshuksingh1",
                  l: "LinkedIn",
                  c: "#0ea5e9"
                },
                {
                  icon: <Phone size={14} />,
                  h: "tel:+917008099610",
                  l: "Call",
                  c: "#06b6d4"
                },
                {
                  icon: (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.539 4.064 1.484 5.779L0 24l6.388-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.523-5.2-1.432l-.372-.22-3.795.871.928-3.7-.242-.381A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  ),
                  h: "https://wa.me/917008099610",
                  l: "WhatsApp",
                  c: "#22c55e"
                }
              ].map((s, i) => (
                <a key={i} href={s.h} target={s.h.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" title={s.l}
                  style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(124,58,237,.06)", border: "1px solid rgba(124,58,237,.15)", display: "flex", alignItems: "center", justifyContent: "center", color: s.c, textDecoration: "none", transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${s.c}1c`; e.currentTarget.style.borderColor = `${s.c}60`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(124,58,237,.06)"; e.currentTarget.style.borderColor = "rgba(124,58,237,.15)"; e.currentTarget.style.transform = ""; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div style={{ flex: "1 1 140px" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 18, letterSpacing: "-.1px" }}>Services</div>
            {SERVICES.map((sv, i) => (
              <Link key={i} to="/services" style={{
                color: "rgba(255,255,255,.45)", fontSize: 13.5,
                padding: "4px 0", display: "block", fontFamily: "'Inter',sans-serif", textDecoration: "none", transition: "color .3s"
              }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(167,139,250,1)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.45)"}>
                {sv.title}
              </Link>
            ))}
          </div>

          {/* Quick Links Column */}
          <div style={{ flex: "1 1 110px" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 18, letterSpacing: "-.1px" }}>Quick Links</div>
            {NAV.map((n, i) => (
              <Link key={i} to={n.to} style={{
                color: "rgba(255,255,255,.45)", fontSize: 13.5,
                padding: "4px 0", display: "block", fontFamily: "'Inter',sans-serif", textDecoration: "none", transition: "color .3s"
              }}
                onMouseEnter={e => e.currentTarget.style.color = "rgba(167,139,250,1)"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.45)"}>
                {n.l}
              </Link>
            ))}
          </div>

          {/* Contact Column */}
          <div style={{ flex: "1 1 200px" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 18, letterSpacing: "-.1px" }}>Get In Touch</div>
            {[
              { icon: <Phone size={14} color="#06b6d4" style={{ flexShrink: 0, marginTop: 3.5 }} />, t: "+91 70080 99610", h: "tel:+917008099610" },
              { icon: <Mail size={14} color="#f97316" style={{ flexShrink: 0, marginTop: 3.5 }} />, t: "sudhanshu124197@gmail.com", h: "mailto:sudhanshu124197@gmail.com" },
              { icon: <MapPin size={14} color="#8b5cf6" style={{ flexShrink: 0, marginTop: 3.5 }} />, t: "Greater Noida, UP, India", h: null },
              { icon: <Clock size={14} color="#10b981" style={{ flexShrink: 0, marginTop: 3.5 }} />, t: "Mon–Sat: 9AM – 8PM IST", h: null },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                {c.icon}
                {c.h ? (
                  <a href={c.h} style={{ color: "rgba(255,255,255,.45)", fontSize: 13, textDecoration: "none", transition: "color .3s", wordBreak: "break-all", lineHeight: 1.55 }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(167,139,250,1)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.45)"}>
                    {c.t}
                  </a>
                ) : <span style={{ color: "rgba(255,255,255,.45)", fontSize: 13, lineHeight: 1.55 }}>{c.t}</span>}
              </div>
            ))}
          </div>

        </div>

        <div style={{ height: 1, background: "rgba(124,58,237,.15)", marginBottom: 24 }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 13 }}>© 2026 Sudhanshu Digital Services. All rights reserved.</span>
          <span style={{ fontSize: 13 }}>Made with ❤️ by <span style={{ color: "#a78bfa", fontWeight: 700 }}>Sudhanshu Kumar Singh</span></span>
        </div>
      </div>
    </footer>
  );
}
