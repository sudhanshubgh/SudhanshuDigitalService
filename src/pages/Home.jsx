import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MessageSquare, ArrowRight, ChevronLeft, ChevronRight, Users, Star,
  TrendingUp, CheckCircle, Play, RefreshCw, Folder, FileCode, Code2, Terminal
} from "lucide-react";
import { STATS, FEATURES, TESTIMONIALS } from "../data/sharedData.js";
import SH from "../components/SH.jsx";
import ParticleHeroBg from "../components/ParticleHeroBg.jsx";

const SCENARIOS = {
  google: {
    name: "google.cy.js",
    label: "Google Search UI Automation",
    command: "npx cypress run --spec 'cypress/e2e/google.cy.js'",
    code: `describe('Google Search UI Test', () => {
  it('verifies Sudhanshu Digital ranking', () => {
    cy.visit('https://www.google.com');
    cy.get('input[name="q"]')
      .type('Sudhanshu Kumar Singh SDET{enter}');
    cy.get('#search').should('be.visible');
    cy.get('a').contains('sudhanshudigital.com').click();
  });
});`,
    steps: [
      { text: "🚀 [INFO] Initializing Cypress automation runner...", delay: 250 },
      { text: "🌐 [INFO] Launching browser engine (Headless Chrome)...", delay: 400 },
      { text: "🔗 [INFO] Navigating to: https://www.google.com", delay: 400 },
      { text: "⏳ [INFO] Waiting for element input[name='q'] to be visible...", delay: 300 },
      { text: "⌨️ [INFO] Typing search query: 'Sudhanshu Kumar Singh SDET'...", delay: 500 },
      { text: "🖱️ [INFO] Locating search button and simulating click...", delay: 300 },
      { text: "⏳ [INFO] Waiting for results page load...", delay: 500 },
      { text: "🔍 [PASS] Assert: Search results container is visible.", delay: 300 },
      { text: "✓ [PASS] Assert: First result link text matches 'sudhanshudigital.com'", delay: 300 },
      { text: "🎉 [SUCCESS] Test run completed: 1 passed, 0 failed (duration: 4.5s)", delay: 300 }
    ]
  },
  api: {
    name: "api_contract.json",
    label: "REST API Endpoint Integration Test",
    command: "newman run api_test_collection.json --env prod.json",
    code: `{
  "info": {
    "name": "REST API Integration Suite"
  },
  "item": [{
    "name": "GET active services",
    "request": {
      "url": "https://api.sudhanshudigital.com/v1/services",
      "method": "GET"
    },
    "event": [{
      "listen": "test",
      "script": "pm.test('Status is 200', () => pm.response.to.have.status(200));"
    }]
  }]
}`,
    steps: [
      { text: "🚀 [INFO] Initializing Postman Newman runner...", delay: 250 },
      { text: "📡 [INFO] Sending HTTP GET to: https://api.sudhanshudigital.com/v1/services", delay: 300 },
      { text: "📶 [INFO] TCP Handshake completed in 42ms.", delay: 200 },
      { text: "📥 [INFO] Received HTTP status code: 200 OK", delay: 300 },
      { text: "📄 [INFO] Headers: Content-Type: application/json; charset=utf-8", delay: 150 },
      { text: "🔎 [INFO] Response body size: 1.42 KB. Initiating JSON parsing...", delay: 300 },
      { text: "✓ [PASS] Assert: Content-Type header matches 'application/json'", delay: 200 },
      { text: "✓ [PASS] Assert: Response body contains array of active services", delay: 200 },
      { text: "✓ [PASS] Assert: Every service item has 'name', 'price', and 'duration' keys", delay: 300 },
      { text: "🎉 [SUCCESS] All 3 assertions passed. API contract matches specifications.", delay: 200 }
    ]
  },
  checkout: {
    name: "checkout.spec.js",
    label: "E-Commerce Checkout End-to-End Flow",
    command: "npx playwright test tests/checkout.spec.js --project=webkit",
    code: `import { test, expect } from '@playwright/test';

test('SauceDemo E2E Checkout Flow', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory.html/);
});`,
    steps: [
      { text: "🚀 [INFO] Initializing Playwright Test suite...", delay: 250 },
      { text: "🌐 [INFO] Launching WebKit (Apple Safari Headless)...", delay: 400 },
      { text: "🔗 [INFO] Navigating to target site: https://www.saucedemo.com/", delay: 300 },
      { text: "⌨️ [INFO] Autofilling username: 'standard_user'...", delay: 400 },
      { text: "⌨️ [INFO] Autofilling password: '••••••••'...", delay: 300 },
      { text: "🖱️ [INFO] Clicking LOGIN button...", delay: 200 },
      { text: "✓ [PASS] Assert: URL redirection path matches '/inventory.html'", delay: 300 },
      { text: "🛒 [INFO] Simulating clicking 'Add to Cart' for item ID 4 (Backpack)...", delay: 300 },
      { text: "🛍️ [INFO] Navigating to shopping cart page and clicking 'Checkout'...", delay: 400 },
      { text: "✓ [PASS] Assert: Cart count badge matches 1 item.", delay: 200 },
      { text: "🎉 [SUCCESS] Checkout E2E Scenario completed. Browser disposed successfully.", delay: 200 }
    ]
  }
};

export default function Home({ dark }) {
  const [tIdx, setTIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const tState = useRef({ wi: 0, ci: 0, del: false, tm: null });

  const [runningTest, setRunningTest] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState("google");
  const [terminalLogs, setTerminalLogs] = useState(["// Click 'Run Simulation' inside the IDE panel below to execute selected test..."]);
  const [testProgress, setTestProgress] = useState(0);
  const logEndRef = useRef(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollTop = logEndRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  const handleRunSimulation = (scenarioKey) => {
    if (runningTest) return;
    setRunningTest(scenarioKey);
    setTestProgress(0);
    const scenario = SCENARIOS[scenarioKey];
    setTerminalLogs([`$ ${scenario.command}`]);

    let stepIndex = 0;
    const runStep = () => {
      if (stepIndex < scenario.steps.length) {
        const step = scenario.steps[stepIndex];
        setTerminalLogs(prev => [...prev, step.text]);
        setTestProgress(Math.round(((stepIndex + 1) / scenario.steps.length) * 100));
        stepIndex++;
        setTimeout(runStep, step.delay);
      } else {
        setRunningTest(null);
      }
    };
    
    setTimeout(runStep, 400);
  };

  useEffect(() => {
    const WORDS = ["Website Development", "Resume Writing", "LinkedIn Optimization", "Career Guidance", "AI Consulting", "Test Automation"];
    const tick = () => {
      const st = tState.current;
      const word = WORDS[st.wi];
      if (!st.del) {
        st.ci++;
        setTyped(word.slice(0, st.ci));
        if (st.ci === word.length) { st.del = true; st.tm = setTimeout(tick, 2000); return; }
      } else {
        st.ci--;
        setTyped(word.slice(0, st.ci));
        if (st.ci === 0) { st.del = false; st.wi = (st.wi + 1) % WORDS.length; }
      }
      st.tm = setTimeout(tick, st.del ? 50 : 80);
    };
    tState.current.tm = setTimeout(tick, 800);
    return () => clearTimeout(tState.current.tm);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      
      {/* ── REDESIGNED HERO SECTION ── */}
      <section id="home" style={{ position: "relative", overflow: "hidden", minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 20px 60px" }}>
        <div className="orb orb1" style={{ top: "-10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600 }} />
        <div className="orb orb2" style={{ bottom: "0%", right: "-10%" }} />
        <div className="dotGrid" />
        <div className="noiseBg" />

        <div style={{ maxWidth: 900, width: "100%", position: "relative", zIndex: 1 }}>
          
          {/* Trust Stat Pills */}
          <div className="reveal" style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 24 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px",
              borderRadius: 100, background: "var(--cpill-bg)", border: "1px solid var(--cgb)",
              fontSize: 11, fontWeight: 500, color: "var(--cp)", letterSpacing: ".3px"
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cp)", display: "inline-block", animation: "dotPulse 1.5s ease-in-out infinite" }} />
              Available for New Projects
            </span>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 12px",
              borderRadius: 100, background: "var(--cpill-bg)", border: "1px solid var(--cgb)",
              fontSize: 11, fontWeight: 500, color: "var(--cm)", letterSpacing: ".3px"
            }}>
              ✨ Premium Services from ₹999
            </span>
          </div>

          <h1 className="reveal" style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(36px,5.5vw,68px)",
            fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.04em", margin: "0 auto 16px",
            background: "var(--cgtxt)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Accelerate Your Career & <br />
            Build Your <span style={{ color: "var(--cp)" }}>Digital Presence</span>
          </h1>

          <div className="reveal" style={{ marginBottom: 24, height: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 16, fontWeight: 500, color: "var(--cm)" }}>
              Specialized in:{" "}
              <span style={{ color: "var(--cp)", fontWeight: 600 }}>{typed}</span>
              <span style={{ animation: "blink .75s infinite", color: "var(--cp)", marginLeft: 1 }}>|</span>
            </span>
          </div>

          <p className="reveal" style={{ color: "var(--cm)", fontSize: 15.5, lineHeight: 1.7, marginBottom: 36, maxWidth: 600, margin: "0 auto 36px" }}>
            High-converting websites, ATS-optimized resumes, LinkedIn optimization, and live 1-on-1 mentorship to transition into high-paying engineering roles.
          </p>

          <div className="reveal" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 54 }}>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <button className="btnP" style={{ padding: "12px 24px", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <MessageSquare size={15} /> Get Free Consultation
              </button>
            </Link>
            <Link to="/services" style={{ textDecoration: "none" }}>
              <button className="btnS" style={{ padding: "12px 24px", fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
                Explore Services <ArrowRight size={15} />
              </button>
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 16, borderTop: "1px solid var(--cgb)", paddingTop: 32, maxWidth: 680, margin: "0 auto" }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 800, color: "var(--ct)", letterSpacing: "-0.04em" }}>{s.n}</div>
                <div style={{ fontSize: 11, color: "var(--cm)", marginTop: 4, fontWeight: 500 }}>{s.l}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── REDESIGNED IDE SIMULATOR ── */}
      <section style={{ padding: "80px 20px 60px", position: "relative", overflow: "hidden" }}>
        <div className="orb orb3" style={{ bottom: "5%", left: "-10%" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SH tag="Interactive IDE Sandbox" tagIcon={Code2} h1="Real-Time Automation" h2="Execution Environment" />
          
          <div className="reveal sandboxGrid" style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 32, alignItems: "stretch" }}>
            
            {/* Left: Tech Selector Folder Tree */}
            <div className="gcard" style={{ flex: "1 1 260px", padding: 16, background: "var(--cs)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 12 }}>
                <Folder size={12} /> Workspace Explorer
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {Object.entries(SCENARIOS).map(([key, sc]) => {
                  const active = selectedScenario === key;
                  return (
                    <button
                      key={key}
                      disabled={!!runningTest}
                      onClick={() => {
                        setSelectedScenario(key);
                        setTerminalLogs([`// Ready to execute scenario: ${sc.label}`, `// Script target: ${sc.name}`, `// Click "Run Simulation" in the IDE toolbar to start...`]);
                        setTestProgress(0);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 12px",
                        borderRadius: 6,
                        border: active ? "1px solid var(--cgb-hover)" : "1px solid transparent",
                        background: active ? "var(--cgb)" : "transparent",
                        color: active ? "var(--ct)" : "var(--cm)",
                        cursor: runningTest ? "not-allowed" : "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "all .15s ease"
                      }}
                    >
                      <FileCode size={14} color={active ? "var(--cp)" : "var(--cm)"} />
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>{sc.name}</div>
                        <span style={{ fontSize: 10, color: "var(--cm)" }}>{sc.label.split(" ")[0]} Scenario</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Code Editor & Console Wrapper */}
            <div className="gcard" style={{
              flex: "2 1 680px",
              background: "var(--cb)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              border: "1px solid var(--cgb)",
              boxShadow: "var(--cshadow)",
              minHeight: 460
            }}>
              
              {/* IDE Header Toolbar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid var(--cgb)", background: "var(--cs)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", gap: 5 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "var(--cm)", fontFamily: "monospace" }}>
                    editor - {SCENARIOS[selectedScenario].name}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {runningTest && (
                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--cp)", animation: "blink 1s infinite" }}>
                      Executing... {testProgress}%
                    </span>
                  )}
                  <button
                    onClick={() => handleRunSimulation(selectedScenario)}
                    disabled={!!runningTest}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      background: runningTest ? "var(--cgb)" : "var(--cp-bg)",
                      border: "1px solid var(--cgb)",
                      color: runningTest ? "var(--cm)" : "var(--cp-fg)",
                      padding: "5px 12px",
                      borderRadius: 6,
                      fontSize: 11.5,
                      fontWeight: 500,
                      cursor: runningTest ? "not-allowed" : "pointer",
                      transition: "transform .2s"
                    }}
                  >
                    {runningTest ? (
                      <RefreshCw size={11} className="spinSlow" style={{ animation: "spinSlow 2s linear infinite" }} />
                    ) : (
                      <Play size={11} fill="currentColor" />
                    )}
                    Run Scenario
                  </button>
                </div>
              </div>

              {/* Split Editor (Code + Console) */}
              <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                
                {/* Code Panel */}
                <div style={{ padding: 16, borderBottom: "1px solid var(--cgb)", background: "var(--cb2)", minHeight: 180 }}>
                  <pre style={{ margin: 0, fontFamily: "monospace", fontSize: 12, color: "var(--cm)", lineHeight: 1.5, textAlign: "left" }}>
                    <code>{SCENARIOS[selectedScenario].code}</code>
                  </pre>
                </div>

                {/* Console Output Panel */}
                <div style={{ flex: 1, padding: 16, background: "var(--cb)", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 8 }}>
                    <Terminal size={12} /> Execution Console logs
                  </div>
                  
                  <div
                    ref={logEndRef}
                    style={{
                      flex: 1,
                      overflowY: "auto",
                      fontFamily: "monospace",
                      fontSize: 12,
                      lineHeight: 1.5,
                      maxHeight: 180,
                      textAlign: "left",
                      paddingRight: 6
                    }}
                  >
                    {terminalLogs.map((line, idx) => {
                      let color = "var(--ct)";
                      if (line.startsWith("$ ")) {
                        color = "var(--cp)";
                      } else if (line.startsWith("//")) {
                        color = "var(--cm)";
                      } else if (line.includes("[PASS]")) {
                        color = "#10B981";
                      } else if (line.includes("[SUCCESS]")) {
                        color = "#10B981";
                      } else if (line.includes("✓")) {
                        color = "#10B981";
                      }
                      
                      return (
                        <div key={idx} style={{ color, marginBottom: 4, whiteSpace: "pre-wrap" }}>
                          {line}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ── ASYMMETRIC BENTO GRID (Why Choose Me) ── */}
      <section style={{ padding: "80px 20px", background: "var(--cb2)", position: "relative", overflow: "hidden", borderTop: "1px solid var(--cgb)", borderBottom: "1px solid var(--cgb)" }}>
        <div className="orb orb1" style={{ bottom: "-5%", right: "-10%" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SH tag="Why Choose Me" tagIcon={Star} h1="A Complete Profile Built" h2="For Your Goals" />

          {/* Bento Grid */}
          <div className="bentoGrid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 32 }}>
            
            {/* Card 1: Experience (Spans 2 columns on desktop) */}
            <div className="gcard reveal" style={{ gridColumn: "span 2", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 240 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--cp)", textTransform: "uppercase", letterSpacing: ".5px" }}>Professional Standard</span>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, margin: "6px 0 10px", letterSpacing: "-0.02em" }}>Senior Test Automation SDET</h3>
                <p style={{ color: "var(--cm)", fontSize: 13.5, lineHeight: 1.6 }}>
                  6+ years at TCS designing and maintaining enterprise frameworks for NatWest Banking UK. Specialized in robust architectures using Selenium, Java, REST Assured, and CI/CD pipelines.
                </p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
                {["Selenium", "Java", "REST Assured", "Jenkins", "Cucumber BDD"].map((tag, j) => (
                  <span key={j} style={{ padding: "3px 8px", borderRadius: 4, background: "var(--cs)", border: "1px solid var(--cgb)", fontSize: 11, color: "var(--cm)" }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Card 2: Udemy Instructor */}
            <div className="gcard reveal" style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 240 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--cg)", textTransform: "uppercase", letterSpacing: ".5px" }}>Global Education</span>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, margin: "6px 0 10px", letterSpacing: "-0.02em" }}>Udemy Instructor</h3>
                <p style={{ color: "var(--cm)", fontSize: 13.5, lineHeight: 1.5 }}>
                  Teaching 5000+ students globally through courses focusing on hands-on code scripts and frameworks.
                </p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--cgb)", paddingTop: 12 }}>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--ct)", letterSpacing: "-0.04em" }}>5000+</div>
                  <div style={{ fontSize: 9.5, color: "var(--cm)" }}>Students</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--ct)", letterSpacing: "-0.04em" }}>4.8★</div>
                  <div style={{ fontSize: 9.5, color: "var(--cm)" }}>Avg Rating</div>
                </div>
              </div>
            </div>

            {/* Card 3: Quick Turnaround */}
            <div className="gcard reveal" style={{ padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 240 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#10b981", textTransform: "uppercase", letterSpacing: ".5px" }}>Agile Pace</span>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, margin: "6px 0 10px", letterSpacing: "-0.02em" }}>Rapid Delivery</h3>
                <p style={{ color: "var(--cm)", fontSize: 13.5, lineHeight: 1.6 }}>
                  Resumes in 48 hours, fully responsive portfolio sites in days. Premium results, accelerated pace, zero compromises.
                </p>
              </div>
              <div style={{ display: "flex", gap: 6, fontSize: 12, fontWeight: 600, color: "#10b981", alignItems: "center" }}>
                <span>⚡ 48-Hour delivery guarantee</span>
              </div>
            </div>

            {/* Card 4: Support Channel (Spans 2 columns on desktop) */}
            <div className="gcard reveal" style={{ gridColumn: "span 2", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 240 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "var(--cp)", textTransform: "uppercase", letterSpacing: ".5px" }}>Direct Partnership</span>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 20, fontWeight: 700, margin: "6px 0 10px", letterSpacing: "-0.02em" }}>One-on-One Direct Consultation</h3>
                <p style={{ color: "var(--cm)", fontSize: 13.5, lineHeight: 1.6 }}>
                  No agencies, no middle-men. You consult directly with me. From requirements gathering to final testing, you have direct access via Slack, WhatsApp, and Zoom calls.
                </p>
              </div>
              <div style={{ display: "flex", gap: 32, borderTop: "1px solid var(--cgb)", paddingTop: 16 }}>
                <div>
                  <span style={{ fontSize: 10, color: "var(--cm)", textTransform: "uppercase" }}>Average Response</span>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ct)", marginTop: 2 }}>&lt; 30 Minutes</div>
                </div>
                <div>
                  <span style={{ fontSize: 10, color: "var(--cm)", textTransform: "uppercase" }}>Call Support</span>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ct)", marginTop: 2 }}>Included Premium</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 20px", position: "relative", overflow: "hidden" }}>
        <div className="orb orb2" style={{ top: -80, right: -80 }} />
        <div style={{ maxWidth: 880, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SH tag="Testimonials" tagIcon={Users} h1="Client Success" h2="Stories" />
          
          <div className="gcard reveal" style={{ padding: "36px 32px", textAlign: "center", transitionDelay: ".1s", position: "relative" }}>
            <div className="stars" style={{ fontSize: 18, marginBottom: 16, letterSpacing: 2 }}>{"★".repeat(TESTIMONIALS[tIdx].r)}</div>
            <blockquote style={{ fontSize: "clamp(14.5px,2vw,17px)", lineHeight: 1.7, color: "var(--ct)", marginBottom: 24, position: "relative", fontStyle: "italic", fontWeight: 400 }}>
              <span style={{ fontSize: 64, color: "var(--cp)", opacity: .1, position: "absolute", top: -20, left: -8, fontFamily: "Georgia", lineHeight: 1 }}>"</span>
              {TESTIMONIALS[tIdx].text}
            </blockquote>
            <div style={{ width: 32, height: 1.5, background: "var(--cgb-hover)", margin: "0 auto 16px" }} />
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14.5 }}>{TESTIMONIALS[tIdx].name}</div>
            <div style={{ color: "var(--cm)", fontSize: 12.5, marginTop: 4 }}>{TESTIMONIALS[tIdx].role}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 24 }}>
            <button onClick={() => setTIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} style={{
              width: 32, height: 32, borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ct)", transition: "all .2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cgb-hover)"; e.currentTarget.style.color = "var(--cp)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--cgb)"; e.currentTarget.style.color = "var(--ct)"; }}>
              <ChevronLeft size={14} />
            </button>
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setTIdx(i)} style={{
                width: i === tIdx ? 24 : 6, height: 6, borderRadius: 3, border: "none", cursor: "pointer",
                background: i === tIdx ? "var(--cp)" : "var(--cgb)",
                transition: "all .3s cubic-bezier(.16,1,.3,1)"
              }} />
            ))}
            <button onClick={() => setTIdx(i => (i + 1) % TESTIMONIALS.length)} style={{
              width: 32, height: 32, borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ct)", transition: "all .2s"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cgb-hover)"; e.currentTarget.style.color = "var(--cp)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--cgb)"; e.currentTarget.style.color = "var(--ct)"; }}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA section banner */}
      <section style={{ padding: "60px 20px", background: "var(--cs)", borderTop: "1px solid var(--cgb)", borderBottom: "1px solid var(--cgb)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.02em" }}>Ready to Accelerate Your Business or Career?</h3>
          <p style={{ color: "var(--cm)", fontSize: 14.5, lineHeight: 1.6, marginBottom: 24, maxWidth: 560, margin: "0 auto 24px" }}>
            Whether you need a high-converting web application, a modern ATS-ready resume rewrite, or 1-on-1 mentorship to switch jobs — I am ready to help.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/services" style={{ textDecoration: "none" }}>
              <button className="btnP" style={{ padding: "10px 20px", fontSize: 13.5 }}>Services & Calculator</button>
            </Link>
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <button className="btnS" style={{ padding: "10px 20px", fontSize: 13.5 }}>Book a Consultation</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

