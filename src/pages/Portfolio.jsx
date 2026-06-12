import { useState } from "react";
import { Link } from "react-router-dom";
import { Code, ArrowRight } from "lucide-react";
import { PORTFOLIO } from "../data/sharedData.js";
import SH from "../components/SH.jsx";

const FILTERS = ["All", "Web Development", "Automation Project", "AI Application", "Resume Service", "Training Program"];

export default function Portfolio({ dark }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All"
    ? PORTFOLIO
    : PORTFOLIO.filter(p => p.cat === activeFilter);

  return (
    <div style={{ padding: "24px 24px 100px", position: "relative" }}>
      <div className="orb orb3" style={{ top: "5%", right: "-8%", opacity: .09 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        <SH tag="Portfolio" tagIcon={Code} h1="My Work &" h2="Projects" sub="A curated selection of projects delivered across industries, technologies, and automation domains." />

        {/* Filter Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 40 }}>
          {FILTERS.map((f, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                border: activeFilter === f ? "1px solid var(--ct)" : "1px solid var(--cgb)",
                background: activeFilter === f ? "var(--ct)" : "var(--cs)",
                color: activeFilter === f ? "var(--cb)" : "var(--cm)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'Inter',sans-serif",
                transition: "all .2s"
              }}
              onMouseEnter={e => { if (activeFilter !== f) e.currentTarget.style.borderColor = "var(--cgb-hover)"; }}
              onMouseLeave={e => { if (activeFilter !== f) e.currentTarget.style.borderColor = "var(--cgb)"; }}
            >
              {f === "Automation Project" ? "Automation" : f === "AI Application" ? "AI Apps" : f}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="portfolioGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 24 }}>
          {filteredProjects.map((p, i) => (
            <div key={i} className="gcard reveal" style={{ overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 340 }}>
              <div style={{
                height: 160, background: `linear-gradient(135deg,${p.c}10,${p.c}04)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                borderBottom: "1px solid var(--cgb)", position: "relative"
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 6,
                  background: `linear-gradient(135deg,${p.c},${p.c}cc)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden", border: "1px solid var(--cgb)"
                }}>
                  {p.svg ? (
                    <div style={{ width: "100%", height: "100%", padding: 10 }} dangerouslySetInnerHTML={{ __html: p.svg }} />
                  ) : (
                    <img
                      src={p.img}
                      alt={p.t}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={e => {
                        e.target.style.display = "none";
                        e.target.parentNode.innerHTML = `<span style='font-size:24px'>💼</span>`;
                      }}
                    />
                  )}
                </div>
                <div style={{
                  position: "absolute", top: 14, right: 14, padding: "3px 8px", borderRadius: 4,
                  background: "var(--cpill-bg)", border: `1px solid var(--cgb)`, color: p.c,
                  fontSize: 10, fontWeight: 600, letterSpacing: ".3px"
                }}>{p.cat}</div>
              </div>
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 8, letterSpacing: "-.2px" }}>{p.t}</h3>
                <p style={{ color: "var(--cm)", fontSize: 13.5, lineHeight: 1.6, marginBottom: 18, flex: 1 }}>{p.d}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {p.tech.split(" · ").map((tt, j) => (
                    <span key={j} style={{
                      padding: "3px 8px", borderRadius: 4, background: "var(--cs)",
                      border: "1px solid var(--cgb)", fontSize: 11, color: "var(--cm)", fontWeight: 500
                    }}>{tt}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="gcard" style={{ padding: 32, marginTop: 72, textAlign: "center", background: "var(--cgl)" }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.02em" }}>Have a Specific Project in Mind?</h3>
          <p style={{ color: "var(--cm)", fontSize: 14, lineHeight: 1.6, marginBottom: 24, maxWidth: 520, margin: "0 auto 24px" }}>
            Let's discuss how we can build a similar high-performance solution for your business.
          </p>
          <Link to="/contact" style={{ textDecoration: "none" }}>
            <button className="btnP" style={{ padding: "10px 20px", fontSize: 13.5, display: "flex", alignItems: "center", gap: 8, margin: "0 auto" }}>
              Start My Project <ArrowRight size={14} />
            </button>
          </Link>
        </div>


      </div>
    </div>
  );
}
