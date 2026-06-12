import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Phone, Mail, Linkedin, MapPin, Clock, ChevronRight, MessageSquare
} from "lucide-react";
import { SERVICES } from "../data/sharedData.js";
import SH from "../components/SH.jsx";
import BookingCalendar from "../components/BookingCalendar.jsx";

export default function Contact({ dark }) {
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    msg: ""
  });

  const [formErr, setFormErr] = useState({});
  const [sent, setSent] = useState(false);
  const [selOpen, setSelOpen] = useState(false);
  const selRef = useRef(null);

  // Sync state if redirected from quiz or builder
  useEffect(() => {
    if (location.state) {
      setForm(prev => ({
        ...prev,
        service: location.state.service || prev.service,
        msg: location.state.msg || prev.msg
      }));
    }
  }, [location.state]);

  useEffect(() => {
    const clickOutside = (e) => {
      if (selRef.current && !selRef.current.contains(e.target)) {
        setSelOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  const submit = e => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Valid email required";
    if (!form.msg.trim()) err.msg = "Message is required";
    if (Object.keys(err).length) { setFormErr(err); return; }
    setSent(true);
    setForm({ name: "", email: "", phone: "", service: "", msg: "" });
    setFormErr({});
  };

  const handleBook = (date, slot) => {
    setForm(prev => ({
      ...prev,
      msg: `Hi Sudhanshu! I'd like to book a Free Consultation on ${date} at ${slot}. Please confirm availability. Thank you!`
    }));
    // Scroll to the form
    setTimeout(() => {
      document.getElementById("contactForm")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div style={{ padding: "24px 24px 100px", position: "relative" }}>
      <div className="orb orb3" style={{ bottom: "-5%", left: "-5%", opacity: .08 }} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        <SH tag="Contact" tagIcon={Mail} h1="Let's Work" h2="Together" sub="Ready to start your project? Book a free 30-minute consultation — no strings attached." />

        {/* Consultation Banner */}
        <div className="reveal" style={{ marginBottom: 44, display: "flex", justifyContent: "center" }}>
          <div className="glass gradBorder" style={{
            borderRadius: 12, padding: "24px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: 24, flexWrap: "wrap", background: "rgba(16,185,129,.04)", border: "1px solid rgba(16,185,129,.15)", maxWidth: 900, width: "100%",
            boxShadow: "0 12px 40px rgba(16,185,129,.02)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 6, background: "rgba(16,185,129,.1)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0
              }}>🎁</div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 17, color: "#10b981", letterSpacing: "-.2px" }}>Free 30-Minute Consultation</div>
                <div style={{ color: "var(--cm)", fontSize: 13.5, marginTop: 3, fontWeight: 500 }}>No Obligation • Personalized Guidance</div>
              </div>
            </div>
            <a href="https://wa.me/917008099610?text=Hi%20Sudhanshu!%20I'd%20like%20to%20book%20a%20free%20consultation." target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btnP" style={{ padding: "10px 20px", fontSize: 13.5, display: "flex", alignItems: "center", gap: 8, background: "var(--cp-bg)", color: "var(--cp-fg)", border: "1px solid var(--cp-border)" }}>
                Book Free Call <MessageSquare size={14} />
              </button>
            </a>
          </div>
        </div>

        {/* ── Booking Calendar ── */}
        <div className="reveal">
          <BookingCalendar dark={dark} onBook={handleBook} />
        </div>

        <div id="contactForm" style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
          
          {/* LEFT — Info column */}

          <div className="revL" style={{ flex: "1 1 270px", maxWidth: 340, display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: Phone, l: "Call / WhatsApp", v: "+91 70080 99610", href: "tel:+917008099610", c: "#06b6d4" },
              { icon: Mail, l: "Email Me", v: "sudhanshu124197@gmail.com", href: "mailto:sudhanshu124197@gmail.com", c: "#f97316" },
              { icon: Linkedin, l: "LinkedIn", v: "in/sudhanshuksingh1", href: "https://www.linkedin.com/in/sudhanshuksingh1", c: "#0ea5e9" },
              { icon: MapPin, l: "Location", v: "Greater Noida, UP, India", href: null, c: "#8b5cf6" },
              { icon: Clock, l: "Working Hours", v: "Mon–Sat: 9AM – 8PM IST", href: null, c: "#10b981" },
            ].map((ci, i) => {
              const CIcon = ci.icon;
              const inner = (
                <div className="gcard" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, cursor: ci.href ? "pointer" : "default", transition: "transform .3s, border-color .3s" }}
                  onMouseEnter={e => { if (ci.href) { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `${ci.c}30`; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--cgb)"; }}>
                  <div style={{ width: 38, height: 38, borderRadius: 6, background: `${ci.c}10`, border: `1px solid ${ci.c}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CIcon size={16} color={ci.c} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--cm)", marginBottom: 2, fontWeight: 500, letterSpacing: ".3px", textTransform: "uppercase" }}>{ci.l}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, wordBreak: "break-all" }}>{ci.v}</div>
                  </div>
                </div>
              );
              return ci.href ? (
                <a key={i} href={ci.href} target={ci.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>{inner}</a>
              ) : <div key={i}>{inner}</div>;
            })}

            <a href="https://wa.me/917008099610?text=Hello!%20I'd%20like%20a%20free%20consultation." target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button style={{
                width: "100%", padding: "12px 20px", borderRadius: 6, fontSize: 13.5, fontWeight: 600,
                background: "linear-gradient(180deg, #18181b, #09090b)",
                color: "#fff", border: "1px solid var(--cgb)",
                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                gap: 10, fontFamily: "'Inter',sans-serif", transition: "all .2s",
                letterSpacing: "-.1px", textDecoration: "none"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.borderColor = "var(--cgb-hover)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--cgb)"; }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.539 4.064 1.484 5.779L0 24l6.388-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.523-5.2-1.432l-.372-.22-3.795.871.928-3.7-.242-.381A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
                Chat on WhatsApp
              </button>
            </a>
          </div>

          {/* RIGHT — Form */}
          <div className="gcard revR gradBorder" style={{ flex: "1 1 390px", padding: "36px", maxWidth: 560 }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "50px 0" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: "var(--cm)", fontSize: 15, lineHeight: 1.7 }}>Thanks! I'll get back to you within 24 hours.</p>
                <button className="btnP" onClick={() => setSent(false)} style={{ marginTop: 26, padding: "10px 20px", fontSize: 13.5 }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 6, letterSpacing: "-.4px" }}>Send a Message</h3>
                <p style={{ color: "var(--cm)", fontSize: 13.5, marginBottom: 26, lineHeight: 1.6 }}>Fill out the form and I'll respond within 24 hours.</p>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 7, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px" }}>Full Name *</label>
                    <input className="finput" type="text" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    {formErr.name && <div style={{ color: "#ef4444", fontSize: 11.5, marginTop: 4 }}>{formErr.name}</div>}
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 7, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px" }}>Email *</label>
                    <input className="finput" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    {formErr.email && <div style={{ color: "#ef4444", fontSize: 11.5, marginTop: 4 }}>{formErr.email}</div>}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 7, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px" }}>Phone (optional)</label>
                    <input className="finput" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div style={{ position: "relative" }} ref={selRef}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 7, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px" }}>Service Required</label>
                    <div
                      onClick={() => setSelOpen(!selOpen)}
                      className="finput"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer",
                        userSelect: "none"
                      }}
                    >
                      <span style={{ color: form.service ? "var(--ct)" : "var(--cm)" }}>
                        {form.service || "Select service..."}
                      </span>
                      <ChevronRight
                        size={16}
                        style={{
                          transform: selOpen ? "rotate(90deg)" : "rotate(0deg)",
                          transition: "transform .2s ease",
                          color: "var(--cm)"
                        }}
                      />
                    </div>

                    {selOpen && (
                      <div
                        className="glass gradBorder"
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          zIndex: 100,
                          marginTop: 8,
                          borderRadius: 8,
                          boxShadow: "0 16px 40px rgba(0,0,0,.35)",
                          overflow: "hidden"
                        }}
                      >
                        <div
                          style={{
                            maxHeight: 280,
                            overflowY: "auto",
                            padding: "6px 0"
                          }}
                        >
                          <div
                            onClick={() => { setForm({ ...form, service: "" }); setSelOpen(false); }}
                            style={{
                              padding: "10px 18px",
                              fontSize: 13.5,
                              cursor: "pointer",
                              color: "var(--cm)",
                              transition: "all .2s"
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,.08)"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}
                          >
                            Select service...
                          </div>
                          {SERVICES.map((sv, i) => (
                            <div
                              key={i}
                              onClick={() => { setForm({ ...form, service: sv.title }); setSelOpen(false); }}
                              style={{
                                padding: "10px 18px",
                                fontSize: 13.5,
                                cursor: "pointer",
                                fontWeight: form.service === sv.title ? 600 : 500,
                                color: form.service === sv.title ? "var(--cp)" : "var(--ct)",
                                transition: "all .2s"
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,.08)"}
                              onMouseLeave={e => e.currentTarget.style.background = "none"}
                            >
                              {sv.title}
                            </div>
                          ))}
                          <div
                            onClick={() => { setForm({ ...form, service: "Other" }); setSelOpen(false); }}
                            style={{
                              padding: "10px 18px",
                              fontSize: 13.5,
                              cursor: "pointer",
                              fontWeight: form.service === "Other" ? 600 : 500,
                              color: form.service === "Other" ? "var(--cp)" : "var(--ct)",
                              transition: "all .2s",
                              borderTop: "1px solid var(--cgb)"
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(124,58,237,.08)"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}
                          >
                            Other / Custom
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 7, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px" }}>Message *</label>
                  <textarea className="finput" rows={4} placeholder="Tell me about your requirements, goals, or questions..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} style={{ resize: "vertical", minHeight: 100 }} />
                  {formErr.msg && <div style={{ color: "#ef4444", fontSize: 11.5, marginTop: 4 }}>{formErr.msg}</div>}
                </div>

                <button type="submit" className="btnP" style={{ width: "100%", padding: "14px", fontSize: 14.5, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, letterSpacing: "-.1px" }}>
                  <MessageSquare size={16} /> Send Message — It's Free
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
