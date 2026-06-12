import { useState, useEffect, useRef } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./src/components/ScrollToTop.jsx";
import Navbar from "./src/components/Navbar.jsx";
import Footer from "./src/components/Footer.jsx";
import ChatBot from "./src/components/ChatBot.jsx";
import Home from "./src/pages/Home.jsx";
import Services from "./src/pages/Services.jsx";
import Tools from "./src/pages/Tools.jsx";
import Portfolio from "./src/pages/Portfolio.jsx";
import About from "./src/pages/About.jsx";
import Contact from "./src/pages/Contact.jsx";
import CommandPalette from "./src/components/CommandPalette.jsx";

/* ─────────────────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;overflow-x:hidden;max-width:100vw;transition:background .4s,color .4s;-webkit-font-smoothing:antialiased}

::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:var(--cb)}
::-webkit-scrollbar-thumb{background:var(--cgb);border-radius:10px}

/* ── Scroll Progress Bar ── */
#scrollBar{position:fixed;top:0;left:0;height:2px;z-index:1001;background:var(--cp-brand);width:0%;transition:width .1s linear}

/* ── Spotlight ── */
.spotlight{position:fixed;pointer-events:none;z-index:0;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,var(--cspot) 0%,transparent 65%);transform:translate(-50%,-50%);transition:opacity .4s}

/* ── Page Transition ── */
@keyframes pageIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.pageWrap{animation:pageIn .3s cubic-bezier(.16,1,.3,1) both}

/* ── Theme View Transition ── */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}
::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 9999;
}
.dark::view-transition-old(root) {
  z-index: 9999;
}
.dark::view-transition-new(root) {
  z-index: 1;
}

@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes floatB{0%,100%{transform:translateY(-3px) rotate(.2deg)}50%{transform:translateY(3px) rotate(-.2deg)}}
@keyframes gradShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
@keyframes orbDrift{0%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-40px) scale(1.05)}66%{transform:translate(-20px,30px) scale(.95)}100%{transform:translate(0,0) scale(1)}}
@keyframes orbDrift2{0%{transform:translate(0,0) scale(1)}33%{transform:translate(-40px,40px) scale(1.02)}66%{transform:translate(30px,-30px) scale(.98)}100%{transform:translate(0,0) scale(1)}}
@keyframes pulseGreen{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,.3)}50%{box-shadow:0 0 0 10px rgba(16,185,129,0)}}
@keyframes shimIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes dotPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:.6}}

.reveal{opacity:0;transform:translateY(16px);transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1)}
.reveal.vis{opacity:1;transform:translateY(0)}
.revL{opacity:0;transform:translateX(-20px);transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1)}
.revL.vis{opacity:1;transform:translateX(0)}
.revR{opacity:0;transform:translateX(20px);transition:opacity .5s cubic-bezier(.16,1,.3,1),transform .5s cubic-bezier(.16,1,.3,1)}
.revR.vis{opacity:1;transform:translateX(0)}

.gtxt{background:var(--cgtxt);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.gtxt2{background:linear-gradient(90deg,var(--ct),var(--cm));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

.glass{background:var(--cgl);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--cgb)}
.gcard{background:var(--cgl);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid var(--cgb);transition:transform .2s ease,box-shadow .2s ease,border-color .2s ease;border-radius:12px}
.gcard:hover{transform:translateY(-2px);box-shadow:var(--cshadow);border-color:var(--cgb-hover)}

.btnP{background:var(--cp-bg);color:var(--cp-fg);border:1px solid var(--cp-border);cursor:pointer;font-family:'Inter',sans-serif;font-weight:500;transition:opacity .2s,transform .2s;border-radius:6px}
.btnP:hover{opacity:0.9;transform:translateY(-1px)}
.btnP:active{transform:translateY(0)}

.btnS{background:transparent;border:1px solid var(--cgb);color:var(--ct);cursor:pointer;font-family:'Inter',sans-serif;font-weight:500;transition:background .2s,border-color .2s,transform .2s;border-radius:6px}
.btnS:hover{background:var(--cs);border-color:var(--cgb-hover);transform:translateY(-1px)}
.btnS:active{transform:translateY(0)}

.pill{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:100px;font-size:11px;font-weight:500;background:var(--cpill-bg);border:1px solid var(--cgb);color:var(--cm);margin-bottom:16px;letter-spacing:.3px;text-transform:uppercase}

.orb{position:absolute;border-radius:50%;filter:blur(100px);pointer-events:none;will-change:transform;opacity:var(--corb-op)}
.orb1{width:450px;height:450px;background:radial-gradient(circle,var(--corb1),transparent 70%);animation:orbDrift 20s ease-in-out infinite}
.orb2{width:350px;height:350px;background:radial-gradient(circle,var(--corb2),transparent 70%);animation:orbDrift2 25s ease-in-out infinite}
.orb3{width:300px;height:300px;background:radial-gradient(circle,var(--corb1),transparent 70%);animation:orbDrift 30s ease-in-out infinite reverse}
.orb4{width:280px;height:280px;background:radial-gradient(circle,var(--corb2),transparent 70%);animation:orbDrift2 22s ease-in-out infinite 3s}

.mmenu{position:fixed;top:68px;left:0;right:0;bottom:0;z-index:999;pointer-events:none;opacity:0;transform:translateY(-8px);transition:opacity .2s ease,transform .2s cubic-bezier(.16,1,.3,1)}
.mmenu.open{pointer-events:all;opacity:1;transform:translateY(0)}
.mmenuBd{position:absolute;inset:0;background:rgba(9,9,11,.4);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)}
.mmenuPanel{position:absolute;top:0;left:0;right:0;background:var(--cb2);border-bottom:1px solid var(--cgb);box-shadow:0 12px 30px rgba(0,0,0,.1);padding:16px 20px 28px;display:flex;flex-direction:column;gap:4px}
.faqBody{max-height:0;overflow:hidden;transition:max-height .3s cubic-bezier(.16,1,.3,1)}
.faqBody.open{max-height:400px}

.navLink{position:relative;background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;transition:color .2s;text-decoration:none}
.navLink::after{content:'';position:absolute;bottom:-3px;left:50%;transform:translateX(-50%);width:0;height:1px;background:var(--cp-brand);transition:width .2s cubic-bezier(.16,1,.3,1);border-radius:1px}
.navLink:hover::after,.navLink.act::after{width:100%}

.finput{background:var(--cs);border:1px solid var(--cgb);color:var(--ct);border-radius:6px;padding:10px 14px;width:100%;font-size:14px;font-family:'Inter',sans-serif;transition:border-color .2s,box-shadow .2s;outline:none}
.finput:focus{border-color:var(--cgb-hover);box-shadow:0 0 0 2px var(--cs)}
.finput::placeholder{color:var(--cm)}

.stars{color:#f59e0b}
.wafab{position:fixed;bottom:24px;right:24px;z-index:998;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#25d366,#128c7e);display:flex;align-items:center;justify-content:center;font-size:22px;text-decoration:none !important;box-shadow:0 4px 16px rgba(37,211,102,.3);transition:transform .2s,box-shadow .2s;animation:pulseGreen 2.8s infinite}
.wafab:hover{transform:scale(1.05);box-shadow:0 8px 24px rgba(37,211,102,.45)}
.wafab *{text-decoration:none !important}

.noiseBg{position:absolute;inset:0;opacity:.018;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");background-repeat:repeat;background-size:200px}
.dotGrid{position:absolute;inset:0;background-image:radial-gradient(var(--cgb) 1px,transparent 1px);background-size:24px 24px;pointer-events:none;opacity:.3}
.gradBorder{position:relative}.gradBorder::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02));-webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}

.skillTag{display:inline-flex;padding:5px 12px;border-radius:6px;font-size:12px;font-weight:500;background:var(--cs);border:1px solid var(--cgb);color:var(--cm);transition:border-color .2s,color .2s,background .2s}
.skillTag:hover{border-color:var(--cgb-hover);color:var(--ct);background:var(--cb2)}

@media(max-width:768px){.deskNav{display:none!important}.pricingWrap{flex-direction:column;align-items:center}.heroGrid{flex-direction:column}.portfolioGrid{grid-template-columns:1fr!important}.aboutFlex{flex-direction:column!important;align-items:center!important}.featGrid{grid-template-columns:1fr!important}.comparisonGrid{grid-template-columns:1fr!important}.bentoGrid{grid-template-columns:1fr!important}.bentoGrid > div{grid-column:span 1!important}}
@media(min-width:769px){.mmenu{display:none!important}.mobBtn{display:none!important}}
@media(max-width:768px){html,body{overflow-x:hidden;max-width:100%}}
`;

/* ─────────────────────────────────────────────────────
   CURSOR + SPOTLIGHT COMPONENT
───────────────────────────────────────────────────── */
function CursorSpotlight() {
  const spotRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const spot = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
      spot.current.x = lerp(spot.current.x, mouse.current.x, 0.08);
      spot.current.y = lerp(spot.current.y, mouse.current.y, 0.08);

      if (spotRef.current) {
        spotRef.current.style.left = spot.current.x + "px";
        spotRef.current.style.top = spot.current.y + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={spotRef} className="spotlight" style={{ opacity: 1 }} />
  );
}

/* ─────────────────────────────────────────────────────
   PAGE TRANSITION WRAPPER
───────────────────────────────────────────────────── */
function AnimatedRoutes({ dark }) {
  const location = useLocation();
  return (
    <div key={location.key} className="pageWrap" style={{ flex: 1, paddingTop: 68 }}>
      <Routes location={location}>
        <Route path="/" element={<Home dark={dark} />} />
        <Route path="/services" element={<Services dark={dark} />} />
        <Route path="/tools" element={<Tools dark={dark} />} />
        <Route path="/portfolio" element={<Portfolio dark={dark} />} />
        <Route path="/about" element={<About dark={dark} />} />
        <Route path="/contact" element={<Contact dark={dark} />} />
      </Routes>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(true);

  // Inject CSS styles globally on mount
  useEffect(() => {
    const s = document.createElement("style");
    s.textContent = CSS;
    document.head.appendChild(s);
    return () => document.head.removeChild(s);
  }, []);

  // Scroll Progress Bar
  useEffect(() => {
    const bar = document.getElementById("scrollBar");
    if (!bar) return;
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? (scrolled / total * 100) + "%" : "0%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection observer for scroll reveal animations
  useEffect(() => {
    const ob = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("vis"); }),
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );
    const queryAndObserve = () => {
      document.querySelectorAll(".reveal, .revL, .revR").forEach(el => {
        if (!el.classList.contains("vis")) ob.observe(el);
      });
    };
    queryAndObserve();
    const interval = setInterval(queryAndObserve, 500);
    return () => { clearInterval(interval); ob.disconnect(); };
  });

  // Dynamic Theme Colors Mapping
  const T = {
    "--cp": dark ? "#818cf8" : "#4f46e5", // Indigo accent for indicators and highlights
    "--cp2": dark ? "#a78bfa" : "#6d28d9", // secondary accent
    "--cg": dark ? "#22d3ee" : "#0891b2", // cyan indicator
    "--cp-bg": dark ? "#ffffff" : "#09090b", // White primary button background in dark mode
    "--cp-fg": dark ? "#09090b" : "#ffffff", // Black primary button text in dark mode
    "--cp-border": dark ? "#ffffff" : "#09090b",
    "--cp-brand": dark ? "#818cf8" : "#4f46e5", // Indigo accent
    "--cb": dark ? "#09090b" : "#ffffff", // Zinc-950 vs Pure White
    "--cb2": dark ? "#09090b" : "#ffffff",
    "--cs": dark ? "#18181b" : "#f4f4f5", // Zinc-900 vs Zinc-100
    "--ct": dark ? "#f4f4f5" : "#09090b", // Zinc-100 vs Zinc-950
    "--cm": dark ? "#a1a1aa" : "#71717a", // Zinc-400 vs Zinc-500
    "--cgl": dark ? "rgba(24, 24, 27, 0.75)" : "rgba(255, 255, 255, 0.75)",
    "--cgb": dark ? "rgba(255, 255, 255, 0.08)" : "rgba(9, 9, 11, 0.08)",
    "--cgb-hover": dark ? "rgba(255, 255, 255, 0.16)" : "rgba(9, 9, 11, 0.16)",
    "--cshadow": dark ? "0 12px 30px rgba(0, 0, 0, 0.5)" : "0 12px 30px rgba(9, 9, 11, 0.05)",
    "--cpill-bg": dark ? "rgba(255, 255, 255, 0.03)" : "rgba(9, 9, 11, 0.03)",
    "--cgtxt": dark ? "linear-gradient(to bottom, #ffffff 40%, #a1a1aa 100%)" : "linear-gradient(to bottom, #09090b 40%, #71717a 100%)",
    "--cspot": dark ? "rgba(129, 140, 248, 0.035)" : "rgba(79, 70, 229, 0.015)",
    "--corb1": dark ? "rgba(129, 140, 248, 0.12)" : "rgba(79, 70, 229, 0.06)",
    "--corb2": dark ? "rgba(192, 132, 252, 0.08)" : "rgba(167, 139, 250, 0.04)",
    "--corb-op": dark ? ".06" : ".03"
  };

  return (
    <Router>
      <ScrollToTop />
      {/* Scroll Progress Bar */}
      <div id="scrollBar" />
      {/* Custom Cursor + Spotlight */}
      <CursorSpotlight />
      <div style={{
        ...T,
        background: "var(--cb)",
        color: "var(--ct)",
        fontFamily: "'Inter',sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        transition: "background .4s, color .4s",
        position: "relative"
      }}>
        <Navbar dark={dark} setDark={setDark} />
        <CommandPalette dark={dark} setDark={setDark} />

        {/* Animated Routes with Page Transitions */}
        <AnimatedRoutes dark={dark} />

        <Footer dark={dark} />

        {/* AI Chatbot */}
        <ChatBot dark={dark} />

        {/* WhatsApp FAB */}
        <a href="https://wa.me/917008099610?text=Hello!%20I'm%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer" className="wafab" title="Chat on WhatsApp" style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.539 4.064 1.484 5.779L0 24l6.388-1.467A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.523-5.2-1.432l-.372-.22-3.795.871.928-3.7-.242-.381A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
        </a>

        {/* SEO Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org", "@type": "Person",
            "name": "Sudhanshu Kumar Singh",
            "jobTitle": "Senior Automation Test Engineer & Digital Consultant",
            "url": "https://sudhanshudigital.com",
            "telephone": "+91-7008099610",
            "email": "sudhanshu124197@gmail.com",
            "address": { "@type": "PostalAddress", "addressLocality": "Greater Noida", "addressCountry": "IN" },
            "sameAs": ["https://www.linkedin.com/in/sudhanshuksingh1"],
            "knowsAbout": ["Selenium", "Java", "API Testing", "Website Development", "Resume Writing", "LinkedIn Optimization"],
            "alumniOf": "Tata Consultancy Services"
          })
        }} />
      </div>
    </Router>
  );
}
