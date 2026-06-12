import { useState, useRef, useEffect } from "react";

/* ─── Intent matching engine ─── */
const INTENTS = [
  {
    keys: ["price", "cost", "pricing", "fees", "charge", "rate", "how much", "rupee", "₹", "inr"],
    answer: `💰 **Service Pricing (Starting Rates)**\n\n• 🌐 Website Development — ₹4,999+\n• 📄 Resume Rewrite (ATS) — ₹999+\n• 🔗 LinkedIn Optimization — ₹999+\n• 📚 Selenium/Java Course — ₹2,999+\n• 🎯 1-on-1 Career Mentorship — ₹4,999/month\n• 📦 Premium Bundle Packages — Custom\n\nAll services include a **free 30-min consultation!**`
  },
  {
    keys: ["resume", "ats", "cv", "curriculum", "rewrite", "keyword", "applicant"],
    answer: `📄 **Resume Rewrite & ATS Optimization**\n\nI rewrite resumes to beat ATS systems:\n✅ Keyword optimization for target roles\n✅ Action verb & impact quantification\n✅ ATS-friendly formatting\n✅ LinkedIn headline sync\n\n**Starting at ₹999** | Delivery in 48 hrs\nBook a free review call today! 📞`
  },
  {
    keys: ["website", "web", "development", "landing", "ecommerce", "wordpress", "html", "react", "frontend"],
    answer: `🌐 **Website Development**\n\nI build fast, modern websites:\n✅ Business/Portfolio sites\n✅ E-commerce & Payment integration\n✅ Landing pages (high-conversion)\n✅ React / HTML+CSS / WordPress\n\n**Starting at ₹4,999** | Responsive + SEO-ready\nFree 30-min consultation available! 🚀`
  },
  {
    keys: ["linkedin", "profile", "optimize", "recruiter", "sso", "headline"],
    answer: `🔗 **LinkedIn Profile Optimization**\n\nI transform your LinkedIn into a recruiter magnet:\n✅ Keyword-rich headline & About section\n✅ Experience bullets with impact metrics\n✅ Skills endorsement strategy\n✅ Connection & outreach tips\n\n**Starting at ₹999** | Results in 3–5 days`
  },
  {
    keys: ["selenium", "java", "automation", "course", "training", "learn", "testing", "api", "rest", "postman"],
    answer: `📚 **Training Courses**\n\nHands-on courses for QA professionals:\n✅ Selenium + Java (Beginner → Expert)\n✅ API Testing with RestAssured\n✅ Cucumber/BDD Framework\n✅ 5000+ students taught on Udemy!\n\n**Starting at ₹2,999** | Live + Recorded\nAvailable on Udemy & direct mentorship!`
  },
  {
    keys: ["contact", "call", "phone", "whatsapp", "email", "reach", "message", "talk", "number"],
    answer: `📬 **Let's Connect!**\n\n📞 Call/WhatsApp: **+91 70080 99610**\n📧 Email: **sudhanshu124197@gmail.com**\n🌍 Location: Greater Noida, UP, India\n⏰ Available: Mon–Sat, 9AM–8PM IST\n\nOr [book a free consultation](/contact) directly on this site!`
  },
  {
    keys: ["available", "availability", "free slot", "book", "schedule", "appointment", "busy", "open"],
    answer: `✅ **Current Availability**\n\n🟢 **Open for new projects!**\n\nI typically take 2–3 new clients per month to ensure quality. Slots fill fast!\n\n📅 Best to book your **free 30-min consultation** now to lock in your spot.\n\nVisit the [Contact page](/contact) to schedule!`
  },
  {
    keys: ["experience", "year", "tcs", "tata", "natwest", "bank", "background", "worked"],
    answer: `💼 **About Sudhanshu**\n\n🎓 6+ years as a **Senior Automation Test Engineer**\n🏢 Currently at **Tata Consultancy Services (TCS)**\n🏦 Working on projects for **NatWest Bank, UK**\n📚 Teaching 5000+ students worldwide on Udemy\n🌍 Based in Greater Noida, UP, India\n\nSpecializing in Selenium, Java, API Testing & Web Dev!`
  },
  {
    keys: ["mentor", "mentorship", "career", "guidance", "switch", "job", "sdet", "qa engineer", "transition", "growth"],
    answer: `🎯 **1-on-1 Career Mentorship**\n\nPersonalized guidance to accelerate your career:\n✅ QA → SDET transition roadmap\n✅ Interview preparation (mock interviews)\n✅ Portfolio & project building\n✅ LinkedIn + Resume strategy\n✅ Weekly 1-on-1 sessions\n\n**Starting at ₹4,999/month**\nFree discovery call to assess your goals!`
  },
  {
    keys: ["service", "what", "offer", "help", "provide", "do you"],
    answer: `🚀 **My Services**\n\n1. 🌐 Website Development\n2. 📄 Resume Rewrite & ATS Optimization\n3. 🔗 LinkedIn Profile Optimization\n4. 📚 Selenium/Java/API Training Courses\n5. 🎯 1-on-1 Career Mentorship\n6. 📦 Premium Bundle Packages\n7. 🤖 AI & Productivity Consulting\n\nWhich one interests you? Just ask! 😊`
  }
];

const QUICK_REPLIES = ["💰 Pricing", "🌐 Website", "📄 Resume", "📞 Contact", "🎯 Mentorship", "📚 Courses"];

const WELCOME = {
  id: 0,
  from: "bot",
  text: `👋 Hi! I'm **Sage**, Sudhanshu's AI assistant!\n\nI can answer questions about services, pricing, courses, and how to get started.\n\nWhat would you like to know?`,
  time: new Date()
};

function parseText(text) {
  // Bold (**text**) → <strong>
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
}

function getReply(input) {
  const lower = input.toLowerCase();
  for (const intent of INTENTS) {
    if (intent.keys.some(k => lower.includes(k))) return intent.answer;
  }
  return `🤔 I'm not sure about that, but I'm happy to help!\n\nTry asking about:\n• **Pricing** — What services cost\n• **Resume** — ATS rewrite service\n• **Website** — Web development\n• **Courses** — Selenium/Java training\n• **Contact** — How to reach Sudhanshu\n• **Mentorship** — Career guidance`;
}

let msgId = 1;

export default function ChatBot({ dark }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;
    const userMsg = { id: msgId++, from: "user", text: trimmed, time: new Date() };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = getReply(trimmed);
      setMsgs(prev => [...prev, { id: msgId++, from: "bot", text: reply, time: new Date() }]);
      setTyping(false);
      if (!open) setUnread(n => n + 1);
    }, 820);
  };

  const fmt = (d) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const bg = dark ? "#0d0a1f" : "#fafafa";
  const surface = dark ? "#100d22" : "#ffffff";
  const border = dark ? "rgba(124,58,237,.18)" : "rgba(109,40,217,.12)";
  const textColor = dark ? "#ede9fe" : "#1e1b4b";
  const muted = dark ? "#6b6894" : "#6c6894";

  return (
    <>
      {/* Chat Panel */}
      <div style={{
        position: "fixed", bottom: 104, left: 24, zIndex: 1000,
        width: 360, maxWidth: "calc(100vw - 48px)",
        borderRadius: 20, overflow: "hidden",
        background: bg, border: `1px solid ${border}`,
        boxShadow: "0 24px 80px rgba(0,0,0,.45)",
        display: "flex", flexDirection: "column",
        transform: open ? "translateY(0) scale(1)" : "translateY(20px) scale(0.92)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "all .3s cubic-bezier(.16,1,.3,1)",
        transformOrigin: "bottom left",
        maxHeight: "75vh"
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 18px", background: "linear-gradient(135deg,#7c3aed,#c026d3)",
          display: "flex", alignItems: "center", gap: 12
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: "rgba(255,255,255,.18)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, color: "#fff", fontSize: 14,
            border: "1px solid rgba(255,255,255,.25)"
          }}>SD</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Sage — AI Assistant</div>
            <div style={{ color: "rgba(255,255,255,.7)", fontSize: 12, display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Online · Replies instantly
            </div>
          </div>
          <button onClick={() => setOpen(false)} style={{
            background: "rgba(255,255,255,.15)", border: "none", color: "#fff", borderRadius: 8,
            width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", fontSize: 16, transition: "background .2s"
          }}>✕</button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10,
          scrollbarWidth: "thin"
        }}>
          {msgs.map(m => (
            <div key={m.id} style={{ display: "flex", flexDirection: m.from === "user" ? "row-reverse" : "row", alignItems: "flex-end", gap: 8 }}>
              {m.from === "bot" && (
                <div style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: "linear-gradient(135deg,#7c3aed,#c026d3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 800, color: "#fff"
                }}>SD</div>
              )}
              <div style={{ maxWidth: "78%" }}>
                <div style={{
                  background: m.from === "user"
                    ? "linear-gradient(135deg,#7c3aed,#c026d3)"
                    : surface,
                  color: m.from === "user" ? "#fff" : textColor,
                  border: m.from === "user" ? "none" : `1px solid ${border}`,
                  borderRadius: m.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  padding: "10px 13px", fontSize: 13.5, lineHeight: 1.6,
                  whiteSpace: "pre-line"
                }}>
                  {m.text.split("\n").map((line, i) => (
                    <div key={i}>{parseText(line)}</div>
                  ))}
                </div>
                <div style={{ fontSize: 10.5, color: muted, marginTop: 3, textAlign: m.from === "user" ? "right" : "left" }}>
                  {fmt(m.time)}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: "linear-gradient(135deg,#7c3aed,#c026d3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 800, color: "#fff"
              }}>SD</div>
              <div style={{
                background: surface, border: `1px solid ${border}`,
                borderRadius: "16px 16px 16px 4px", padding: "12px 16px",
                display: "flex", gap: 5, alignItems: "center"
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 7, height: 7, borderRadius: "50%", background: "#7c3aed",
                    animation: `dotPulse 1.2s ${i * 0.2}s ease-in-out infinite`
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick Replies */}
        <div style={{ padding: "8px 14px 0", display: "flex", flexWrap: "wrap", gap: 6 }}>
          {QUICK_REPLIES.map(q => (
            <button key={q} onClick={() => send(q)} style={{
              padding: "5px 12px", borderRadius: 100, fontSize: 12,
              background: "rgba(124,58,237,.1)", border: "1px solid rgba(124,58,237,.25)",
              color: "#a78bfa", cursor: "pointer", fontFamily: "'Inter',sans-serif",
              transition: "all .2s"
            }}>{q}</button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: "12px 14px 14px", display: "flex", gap: 8 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask me anything..."
            style={{
              flex: 1, background: surface, border: `1px solid ${border}`,
              borderRadius: 12, padding: "10px 14px", color: textColor,
              fontSize: 13.5, fontFamily: "'Inter',sans-serif", outline: "none",
              transition: "border-color .2s"
            }}
            onFocus={e => e.target.style.borderColor = "#7c3aed"}
            onBlur={e => e.target.style.borderColor = border}
          />
          <button onClick={() => send()} style={{
            width: 42, height: 42, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg,#7c3aed,#c026d3)",
            border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 17, transition: "all .2s"
          }}>➤</button>
        </div>
      </div>

      {/* FAB Toggle Button */}
      <button onClick={() => setOpen(o => !o)} style={{
        position: "fixed", bottom: 30, left: 24, zIndex: 1001,
        width: 56, height: 56, borderRadius: "50%",
        background: open ? "linear-gradient(135deg,#7c3aed,#c026d3)" : "linear-gradient(135deg,#7c3aed,#c026d3)",
        border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 6px 28px rgba(124,58,237,.55)",
        transition: "transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s",
        transform: open ? "rotate(0deg) scale(1)" : "scale(1)"
      }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        title="Chat with Sage — AI Assistant"
      >
        {/* Unread badge */}
        {!open && unread > 0 && (
          <div style={{
            position: "absolute", top: -4, right: -4,
            width: 20, height: 20, borderRadius: "50%",
            background: "#f97316", color: "#fff",
            fontSize: 11, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid var(--cb)"
          }}>{unread}</div>
        )}
        <span style={{ fontSize: open ? 20 : 22, transition: "all .2s" }}>
          {open ? "✕" : "💬"}
        </span>
      </button>
    </>
  );
}
