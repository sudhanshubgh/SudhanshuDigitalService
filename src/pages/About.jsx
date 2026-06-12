import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, Linkedin, Mail, Plus, Minus, MessageSquare } from "lucide-react";
import { FAQS } from "../data/sharedData.js";
import SH from "../components/SH.jsx";

export default function About({ dark }) {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div style={{ padding: "24px 24px 100px", position: "relative" }}>
      <div className="orb orb1" style={{ bottom: "-5%", left: "-10%", opacity: .07 }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* BIOGRAPHY */}
        <SH tag="About Me" tagIcon={Award} h1="Turning Ideas into" h2="Digital Reality" />

        <div className="aboutFlex" style={{ display: "flex", gap: 64, alignItems: "center", flexWrap: "wrap", justifyContent: "center", marginBottom: 110 }}>
          {/* Avatar column */}
          <div className="revL" style={{ flex: "0 0 auto" }}>
            <div style={{ position: "relative", width: 320 }}>
              <div style={{
                width: 300, height: 360, borderRadius: 12,
                background: dark ? "linear-gradient(135deg,rgba(255,255,255,.03),rgba(255,255,255,.01))" : "linear-gradient(135deg,rgba(0,0,0,.02),rgba(0,0,0,.01))",
                border: "1px solid var(--cgb)", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 110, position: "relative", overflow: "hidden"
              }}>
                <img
                  src="/sudhanshu.jpg"
                  alt="Sudhanshu Kumar Singh"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: 1,
                    position: "absolute",
                    inset: 0
                  }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9, 9, 11, 0.9) 0%, rgba(9, 9, 11, 0.3) 50%, transparent 100%)", zIndex: 1 }} />
                <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, zIndex: 2 }}>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 17, color: "#ffffff" }}>Sudhanshu Kumar Singh</div>
                  <div style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: 12.5, marginTop: 5 }}>Senior ATE · TCS · Udemy Instructor</div>
                </div>
              </div>
              {/* Experience badge */}
              <div className="gcard" style={{
                position: "absolute", top: -16, right: -16, borderRadius: 8, padding: "12px 14px",
                textAlign: "center", animation: "float 7s ease-in-out infinite", zIndex: 2, border: "1px solid var(--cgb)"
              }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 28, color: "var(--cp)", lineHeight: 1 }}>6+</div>
                <div style={{ fontSize: 10, color: "var(--cm)", maxWidth: 56, lineHeight: 1.4, marginTop: 3 }}>Years Exp</div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div className="revR" style={{ flex: "1 1 360px", maxWidth: 540 }}>
            <span className="pill"><Award size={12} /> My Profile</span>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, letterSpacing: "-0.04em", margin: "14px 0 20px", lineHeight: 1.15 }}>
              Senior Automation Engineer & <span style={{ color: "var(--cp)" }}>Career Mentor</span>
            </h2>
            <p style={{ color: "var(--cm)", fontSize: 15, lineHeight: 1.85, marginBottom: 18 }}>
              I'm <strong style={{ color: "var(--ct)" }}>Sudhanshu Kumar Singh</strong>, a Senior Automation Test Engineer with <strong style={{ color: "var(--cp)" }}>6+ years of experience</strong> at Tata Consultancy Services (TCS), specializing in building high-performance automation frameworks for NatWest Bank, UK.
            </p>
            <p style={{ color: "var(--cm)", fontSize: 15, lineHeight: 1.85, marginBottom: 28 }}>
              Beyond testing, I teach 5000+ students worldwide as a <strong style={{ color: "var(--ct)" }}>Udemy Instructor</strong>, build full-stack web applications, rewrite resumes for ATS compliance, and consult professionals navigating job changes in the IT industry.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 30 }}>
              {["Selenium/Java", "API Testing", "REST Assured", "PHP/MySQL", "React/Node.js", "Resume Writing", "Career Coaching", "AI Consulting"].map((sk, i) => (
                <span key={i} className="skillTag">{sk}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="https://www.linkedin.com/in/sudhanshuksingh1" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="btnP" style={{ padding: "10px 20px", fontSize: 13.5, display: "flex", alignItems: "center", gap: 8 }}><Linkedin size={15} /> LinkedIn Profile</button>
              </a>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <button className="btnS" style={{ padding: "10px 20px", fontSize: 13.5, display: "flex", alignItems: "center", gap: 8 }}><Mail size={15} /> Get In Touch</button>
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ ACCORDION */}
        <div id="faq" style={{ maxWidth: 800, margin: "0 auto" }}>
          <SH tag="FAQ" tagIcon={MessageSquare} h1="Frequently Asked" h2="Questions" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((faq, i) => (
              <div key={i} className="gcard reveal" style={{ borderRadius: 8, overflow: "hidden", transitionDelay: `${i * .04}s`, border: openFAQ === i ? "1px solid var(--cgb-hover)" : "1px solid var(--cgb)", transition: "border-color .2s" }}>
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)} style={{
                  width: "100%", padding: "16px 20px", background: "none", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                  cursor: "pointer", color: "var(--ct)", textAlign: "left", fontFamily: "'Inter',sans-serif"
                }}>
                  <span style={{ fontWeight: 600, fontSize: 14, lineHeight: 1.4 }}>{faq.q}</span>
                  <div style={{
                    width: 24, height: 24, borderRadius: 4, flexShrink: 0,
                    background: openFAQ === i ? "var(--cp)" : "var(--cs)",
                    border: "1px solid var(--cgb)",
                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s"
                  }}>
                    {openFAQ === i ? <Minus size={11} color={dark ? "#09090b" : "#ffffff"} /> : <Plus size={11} color="var(--cp)" />}
                  </div>
                </button>
                <div className={`faqBody${openFAQ === i ? " open" : ""}`}>
                  <div style={{ padding: "0 20px 16px", color: "var(--cm)", fontSize: 13.5, lineHeight: 1.6, borderTop: "1px solid var(--cgb)", paddingTop: 12 }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
