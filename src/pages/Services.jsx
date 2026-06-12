import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Globe, Wrench, FileText, Linkedin, GraduationCap, Video, Briefcase, Package, Bot,
  Check, ArrowRight, Plus, Minus, X, Mail, MessageCircle, MessageSquare, TrendingUp, Target, Shield, Zap
} from "lucide-react";
import { SERVICES } from "../data/sharedData.js";
import SH from "../components/SH.jsx";

export default function Services({ dark }) {
  const navigate = useNavigate();

  // ATS Resume Quiz State
  const [quizStep, setQuizStep] = useState(0); // 0: intro, 1..4: steps, 5: results
  const [quizAnswers, setQuizAnswers] = useState({ exp: 0, kw: 0, met: 0, fmt: 0 });

  // Custom Package Builder State
  const [selectedSubSvcs, setSelectedSubSvcs] = useState([]);
  const [expandedSvcs, setExpandedSvcs] = useState([]);

  const toggleSubSvc = (key) => setSelectedSubSvcs(prev => prev.includes(key) ? prev.filter(s => s !== key) : [...prev, key]);
  const toggleExpandSvc = (title) => setExpandedSvcs(prev => prev.includes(title) ? prev.filter(s => s !== title) : [...prev, title]);

  const handleSelectAllCategory = (sv) => {
    const catKeys = sv.items.map(sub => `${sv.title}::${sub.name}::${sub.price}`);
    const selectedInCat = selectedSubSvcs.filter(key => catKeys.includes(key));
    const isAllSelectedInCat = selectedInCat.length === sv.items.length;

    if (isAllSelectedInCat) {
      setSelectedSubSvcs(prev => prev.filter(key => !catKeys.includes(key)));
    } else {
      setSelectedSubSvcs(prev => {
        const filtered = prev.filter(key => !catKeys.includes(key));
        return [...filtered, ...catKeys];
      });
    }
  };

  const getCustomPricingDetails = (selectedSubKeys) => {
    if (selectedSubKeys.length === 0) return { baseTotal: 0, finalTotal: 0, discountText: "", customQuoteRequired: false };

    let baseTotal = 0;
    let finalTotal = 0;
    let discountText = "";
    let customQuoteRequired = false;

    // Parse selected keys: "Parent Title::Sub Service Name::Price"
    const selectedItems = selectedSubKeys.map(key => {
      const parts = key.split("::");
      return {
        parent: parts[0],
        name: parts[1],
        price: parseInt(parts[2], 10)
      };
    });

    selectedItems.forEach(item => {
      baseTotal += item.price;
    });

    finalTotal = baseTotal;

    const hasWeb = selectedItems.some(item => item.parent === "Website Development");
    const hasResume = selectedItems.some(item => item.parent === "Resume Services");
    const hasLinkedIn = selectedItems.some(item => item.parent === "LinkedIn Services");
    const hasMock = selectedItems.some(item => item.parent === "1:1 Mentorship" && item.name.includes("Mock"));
    const hasMaint = selectedItems.some(item => item.parent === "Website Maintenance");
    const hasCareer = selectedItems.some(item => item.parent === "1:1 Mentorship" || item.parent === "Monthly Mentorship" || item.parent === "Premium Packages" || item.parent === "Training Courses");

    // Apply special bundle discounts
    if (hasResume && hasLinkedIn && hasMock && selectedItems.length === 3) {
      if (baseTotal > 2999) {
        finalTotal = 2999;
        discountText = "✨ Special Combo Applied: Resume + LinkedIn + Mock Interview = ₹2,999";
      } else {
        finalTotal = Math.round(baseTotal * 0.85);
        discountText = "⭐ Multi-Service Deal: 15% Bundle Discount Applied";
      }
    } else if (hasWeb && hasMaint && selectedItems.length === 2) {
      finalTotal = Math.round(baseTotal * 0.85);
      discountText = "🔥 Website + Maintenance Bundle: 15% Discount Applied";
    } else if (hasWeb && hasResume && selectedItems.length === 2) {
      finalTotal = Math.round(baseTotal * 0.90);
      discountText = "🎉 Website + Resume Bundle: 10% Discount Applied";
    } else if (hasWeb && hasCareer) {
      if (selectedItems.length >= 3) {
        finalTotal = Math.round(baseTotal * 0.85);
        discountText = "🛡️ Web + Career Bundle: 15% Discount Applied (Contact for further custom quote!)";
      } else {
        finalTotal = Math.round(baseTotal * 0.90);
        discountText = "🛡️ Web + Career Bundle: 10% Discount Applied (Contact for further custom quote!)";
      }
      customQuoteRequired = false;
    } else if (selectedItems.length >= 3) {
      finalTotal = Math.round(baseTotal * 0.85);
      discountText = "⭐ Multi-Service Deal: 15% Bundle Discount Applied";
    } else if (selectedItems.length === 2) {
      finalTotal = Math.round(baseTotal * 0.90);
      discountText = "✨ Combo Deal: 10% Discount Applied";
    }

    return { baseTotal, finalTotal, discountText, customQuoteRequired };
  };

  const handleAutoFillQuiz = (score, rating, rec) => {
    navigate("/contact", {
      state: {
        service: "Resume Services",
        msg: `Hi Sudhanshu! I checked my Resume ATS Score on your website and got ${score}/100 (${rating}). I need professional resume optimization (${rec}). Let's discuss!`
      }
    });
  };

  return (
    <div style={{ padding: "24px 24px 100px", position: "relative" }}>
      <div className="orb orb2" style={{ top: "10%", left: "-5%", opacity: .08 }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* SERVICES OVERVIEW */}
        <SH tag="My Services" tagIcon={Zap} h1="Everything You Need to" h2="Grow & Succeed" sub="From building your digital presence to accelerating your career — comprehensive services tailored to your goals." />
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 20, marginBottom: 110 }}>
          {SERVICES.map((sv, i) => {
            const Icon = sv.icon;
            return (
              <div key={i} className="gcard reveal" style={{ padding: 28, cursor: "pointer", transitionDelay: `${i * .07}s`, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}
                onMouseEnter={e => {
                  const arr = e.currentTarget.querySelector(".svArrow");
                  if (arr) { arr.style.opacity = "1"; arr.style.transform = "translateX(4px)"; }
                  e.currentTarget.style.borderColor = `${sv.c}40`;
                }}
                onMouseLeave={e => {
                  const arr = e.currentTarget.querySelector(".svArrow");
                  if (arr) { arr.style.opacity = "0"; arr.style.transform = "translateX(0)"; }
                  e.currentTarget.style.borderColor = "var(--cgb)";
                }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle,${sv.c}05,transparent 70%)`, pointerEvents: "none" }} />
                <div style={{
                  width: 44, height: 44, borderRadius: 6, background: `linear-gradient(${sv.g})`,
                  display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20,
                  flexShrink: 0
                }}>
                  <Icon size={20} color="#fff" strokeWidth={1.8} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 6 }}>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 17, fontWeight: 700, letterSpacing: "-.2px", margin: 0 }}>{sv.title}</h3>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4, background: `${sv.c}15`, color: sv.c, border: `1px solid ${sv.c}28` }}>{sv.priceDisplay}</span>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  {sv.items.map((it, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "var(--cm)" }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: 4, background: `${sv.c}12`,
                        border: `1px solid ${sv.c}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                      }}>
                        <Check size={9} color={sv.c} strokeWidth={3} />
                      </div>
                      {it.name}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" style={{ textDecoration: "none", marginTop: 20 }}>
                  <button style={{
                    width: "100%", padding: "11px", borderRadius: 6,
                    background: `${sv.c}12`, border: `1px solid ${sv.c}28`, color: sv.c,
                    cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex",
                    alignItems: "center", justifyContent: "center", gap: 7,
                    fontFamily: "'Inter',sans-serif", transition: "background .2s, transform .2s"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${sv.c}22`; e.currentTarget.style.transform = "translateY(-1px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = `${sv.c}12`; e.currentTarget.style.transform = ""; }}>
                    Get This Service
                    <span className="svArrow" style={{ opacity: 0, transition: "all .2s", display: "flex" }}><ArrowRight size={13} /></span>
                  </button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── ATS RESUME CHECKER QUIZ ── */}
        <div id="ats-quiz" style={{ marginBottom: 110 }}>
          <SH 
            tag="Resume Tool" 
            tagIcon={FileText} 
            h1="Check Your Resume" 
            h2="ATS Compatibility" 
            sub="Is your resume getting blacklisted by automated application systems? Answer 4 quick questions to get an instant ATS strength score." 
          />

          <div className="gcard gradBorder" style={{ padding: "36px 30px", background: "var(--cgl)", boxShadow: "0 20px 50px rgba(0,0,0,.08)" }}>
            {quizStep === 0 && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 6, background: "rgba(129,140,248,.12)",
                  display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px",
                  border: "1px solid rgba(129,140,248,.25)"
                }}>
                  <FileText size={26} color="var(--cp)" />
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 12 }}>Does Your Resume Pass the 10-Second Scan?</h3>
                <p style={{ color: "var(--cm)", fontSize: 14.5, lineHeight: 1.7, maxWidth: 540, margin: "0 auto 30px" }}>
                  Most top companies use Applicant Tracking Systems (ATS) to filter resumes before a recruiter ever looks at them. Find out how yours ranks.
                </p>
                <button className="btnP" onClick={() => setQuizStep(1)} style={{ padding: "12px 28px", fontSize: 14, fontWeight: 600 }}>
                  Start Free Compatibility Check
                </button>
              </div>
            )}

            {quizStep >= 1 && quizStep <= 4 && (
              <div>
                {/* Progress bar */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase", letterSpacing: ".5px" }}>Question {quizStep} of 4</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--cp)" }}>{quizStep * 25}% Complete</span>
                </div>
                <div style={{ height: 4, background: "var(--cgb)", borderRadius: 2, overflow: "hidden", marginBottom: 32 }}>
                  <div style={{ height: "100%", width: `${quizStep * 25}%`, background: "var(--cp-brand)", borderRadius: 2, transition: "width .4s ease" }} />
                </div>

                {/* Question rendering */}
                {(() => {
                  let qTitle = "";
                  let qIcon = Briefcase;
                  let qKey = "";
                  let options = [];

                  if (quizStep === 1) {
                    qTitle = "What is your current career experience level?";
                    qIcon = Briefcase;
                    qKey = "exp";
                    options = [
                      { text: "Fresher / Entry-Level (0-2 years)", score: 15, desc: "Building core skills, starting career path" },
                      { text: "Mid-Level Professional (2-6 years)", score: 20, desc: "Individual contributor, some projects lead" },
                      { text: "Senior / Lead / Manager (6+ years)", score: 25, desc: "Enterprise experience, team leading, framework design" }
                    ];
                  } else if (quizStep === 2) {
                    qTitle = "How do you align keywords with job descriptions?";
                    qIcon = Target;
                    qKey = "kw";
                    options = [
                      { text: "I custom-tailor keywords for every job description I apply to", score: 25, desc: "High compatibility: matches requirements exactly" },
                      { text: "I list standard industry keywords in a fixed skills section", score: 15, desc: "Medium compatibility: general coverage but lacks specificity" },
                      { text: "I don't really pay attention to keywords, just list what I did", score: 5, desc: "Low compatibility: prone to automated filters" }
                    ];
                  } else if (quizStep === 3) {
                    qTitle = "Do you include quantifiable results (metrics) in your descriptions?";
                    qIcon = TrendingUp;
                    qKey = "met";
                    options = [
                      { text: "Yes, I list numbers, percentages, and metrics (e.g., 'Reduced runtime by 40%')", score: 25, desc: "Excellent: demonstrates measurable impact" },
                      { text: "Only standard responsibilities (e.g., 'Responsible for manual & automation testing')", score: 10, desc: "Moderate: lists tasks but lacks business outcomes" },
                      { text: "No, just a simple description of tasks and tools used", score: 5, desc: "Basic: leaves achievement scope unquantified" }
                    ];
                  } else if (quizStep === 4) {
                    qTitle = "What file format and layout design do you use?";
                    qIcon = FileText;
                    qKey = "fmt";
                    options = [
                      { text: "Single-column clean PDF text layout (ATS-Friendly)", score: 25, desc: "Best choice: easily parsed by scanner machines" },
                      { text: "Multi-column modern graphic layout (e.g. Canva templates)", score: 15, desc: "Risk factor: visual styling might confuse scanner parsers" },
                      { text: "Word doc (.docx) with tables, text boxes, or images", score: 5, desc: "Critical risk: graphic blocks and tables block parser readability" }
                    ];
                  }

                  const Icon = qIcon;

                  return (
                    <div>
                      <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 24 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 6, background: "rgba(129,140,248,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--cp)" }}>
                          <Icon size={16} />
                        </div>
                        <h4 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 18, fontWeight: 800, margin: 0 }}>{qTitle}</h4>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            onClick={() => {
                              setQuizAnswers(prev => ({ ...prev, [qKey]: opt.score }));
                              setQuizStep(prev => prev + 1);
                            }}
                            className="glass gradBorder"
                            style={{
                              borderRadius: 6, padding: "16px 20px", cursor: "pointer",
                              transition: "all .2s ease", display: "flex", alignItems: "center",
                              justifyContent: "space-between", gap: 16
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(129,140,248,.06)"}
                            onMouseLeave={e => e.currentTarget.style.background = "none"}
                          >
                            <div style={{ textAlign: "left" }}>
                              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{opt.text}</div>
                              <div style={{ fontSize: 12, color: "var(--cm)" }}>{opt.desc}</div>
                            </div>
                            <div style={{
                              width: 22, height: 22, borderRadius: 4, border: "1px solid var(--cgb)",
                              display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--cm)" }}>{String.fromCharCode(65 + oIdx)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {quizStep === 5 && (
              <div style={{ textAlign: "center" }}>
                {(() => {
                  const finalScore = (quizAnswers.exp || 0) + (quizAnswers.kw || 0) + (quizAnswers.met || 0) + (quizAnswers.fmt || 0);
                  
                  let rating = "";
                  let ratingColor = "";
                  let ratingBg = "";
                  let detailsText = "";
                  let packageRec = "";

                  if (finalScore >= 85) {
                    rating = "EXCELLENT (ATS-READY)";
                    ratingColor = "#10b981";
                    ratingBg = "rgba(16,185,129,.1)";
                    detailsText = "Your resume has high compatibility. Standard keyword formatting and regular updates are recommended to stay competitive.";
                    packageRec = "Fresher Resume Creation / Basic Review Package";
                  } else if (finalScore >= 60) {
                    rating = "AVERAGE (NEEDS WORK)";
                    ratingColor = "#f59e0b";
                    ratingBg = "rgba(245,158,11,.1)";
                    detailsText = "Your resume will parse partially, but lacks quantifiable metrics and high-impact action verbs. Competitive filters might reject it.";
                    packageRec = "Experienced Professional Resume Rewrite Package";
                  } else {
                    rating = "CRITICAL ISSUES (HIGH RISK)";
                    ratingColor = "#ef4444";
                    ratingBg = "rgba(239,68,68,.1)";
                    detailsText = "Your formatting or missing keyword structure is blocking automated tracking scanners. Graphic layouts or tables are major red flags.";
                    packageRec = "Senior Resume / Complete LinkedIn & Resume Package";
                  }

                  const whatsAppMsg = `Hi Sudhanshu! I checked my Resume ATS Score on your website and got ${finalScore}/100 (${rating}). I need professional resume optimization. Can we connect?`;

                  return (
                    <div>
                      <div style={{ fontSize: 13, textTransform: "uppercase", color: "var(--cm)", fontWeight: 700, letterSpacing: "1px", marginBottom: 12 }}>ATS COMPATIBILITY SCORE</div>
                      
                      <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="140" height="140" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                          <circle cx="50" cy="50" r="42" fill="transparent" stroke="var(--cgb)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="42" fill="transparent" stroke={ratingColor} strokeWidth="8" 
                            strokeDasharray={263.89} 
                            strokeDashoffset={263.89 - (263.89 * finalScore) / 100}
                            strokeLinecap="round"
                            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
                          />
                        </svg>
                        <div style={{ position: "absolute", textAlign: "center" }}>
                          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 30, fontWeight: 800, color: ratingColor }}>{finalScore}%</div>
                          <div style={{ fontSize: 10, color: "var(--cm)", fontWeight: 600 }}>SCORE</div>
                        </div>
                      </div>

                      <span style={{ display: "inline-flex", padding: "4px 10px", borderRadius: 4, fontSize: 11, fontWeight: 700, color: ratingColor, background: ratingBg, border: `1px solid ${ratingColor}30`, marginBottom: 20 }}>
                        {rating}
                      </span>

                      <p style={{ color: "var(--ct)", fontSize: 15, fontWeight: 600, maxWidth: 540, margin: "0 auto 10px", lineHeight: 1.6 }}>{detailsText}</p>
                      
                      <div style={{ maxWidth: 500, margin: "24px auto", padding: "16px 20px", borderRadius: 6, background: "rgba(129,140,248,.06)", border: "1px dashed var(--cgb)" }}>
                        <div style={{ fontSize: 12, color: "var(--cm)", textTransform: "uppercase", fontWeight: 700, letterSpacing: ".5px", marginBottom: 4 }}>Recommended Action</div>
                        <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--cp)" }}>{packageRec}</div>
                      </div>

                      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
                        <button
                          className="btnP"
                          onClick={() => handleAutoFillQuiz(finalScore, rating, packageRec)}
                          style={{ padding: "10px 20px", fontSize: 13.5 }}
                        >
                          Auto-Fill & Book Optimization
                        </button>
                        <a
                          href={`https://wa.me/917008099610?text=${encodeURIComponent(whatsAppMsg)}`}
                          target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}
                        >
                          <button style={{
                            padding: "10px 20px", borderRadius: 6, fontSize: 13.5, cursor: "pointer",
                            background: "linear-gradient(180deg, #18181b, #09090b)", color: "#fff",
                            border: "1px solid var(--cgb)", fontWeight: 600, display: "flex", alignItems: "center", gap: 8,
                            fontFamily: "'Inter',sans-serif", transition: "all .2s"
                          }}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.borderColor = "var(--cgb-hover)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--cgb)"; }}
                          >
                            <MessageCircle size={14} /> Chat on WhatsApp
                          </button>
                        </a>
                      </div>

                      <button
                        onClick={() => {
                          setQuizStep(0);
                          setQuizAnswers({ exp: 0, kw: 0, met: 0, fmt: 0 });
                        }}
                        style={{ display: "block", margin: "24px auto 0", background: "none", border: "none", fontSize: 12, color: "var(--cm)", cursor: "pointer", textDecoration: "underline" }}
                      >
                        Try Quiz Again
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* ── INTERACTIVE CUSTOM PACKAGE BUILDER ── */}
        <div id="pricing">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="pill" style={{ display: "inline-flex", gap: 7 }}>
              <Package size={12} /> Build Your Custom Package
            </div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(20px,2.8vw,30px)", fontWeight: 800, letterSpacing: "-.5px", marginBottom: 10 }}>
              Pick Your Services — <span className="gtxt">Get a Personalised Quote</span>
            </h3>
            <p style={{ color: "var(--cm)", fontSize: 14.5, lineHeight: 1.7 }}>
              Select any combination below. I'll send a custom quote within 30 minutes.
            </p>
          </div>

          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>

            {/* LEFT — Selectable service cards */}
            <div style={{ flex: "1 1 520px", display: "flex", flexDirection: "column", gap: 14 }}>
              {SERVICES.map((sv, i) => {
                const Icon = sv.icon;
                const parentPrefix = sv.title + "::";
                const selectedSubsInThisParent = selectedSubSvcs.filter(key => key.startsWith(parentPrefix));
                const isAnySel = selectedSubsInThisParent.length > 0;
                const isExpanded = expandedSvcs.includes(sv.title);

                return (
                  <div key={i} className="gcard"
                    style={{
                      padding: "20px 24px",
                      background: isAnySel
                        ? (dark ? `rgba(129,140,248,.05)` : `rgba(79,70,229,.03)`)
                        : "var(--cgl)",
                      border: isAnySel ? `1.5px solid var(--cp-brand)` : "1px solid var(--cgb)",
                      boxShadow: isAnySel ? `0 0 32px rgba(129,140,248,.05)` : "none",
                      position: "relative"
                    }}
                  >
                    {/* Header row (Click to expand/collapse) */}
                    <div
                      onClick={() => toggleExpandSvc(sv.title)}
                      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: 6,
                          background: `linear-gradient(${sv.g})`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          flexShrink: 0
                        }}>
                          <Icon size={18} color="#fff" strokeWidth={1.8} />
                        </div>
                        <div>
                          <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 15.5, letterSpacing: "-.2px" }}>
                            {sv.title}
                          </div>
                          <div style={{ fontSize: 12, color: sv.c, fontWeight: 700, marginTop: 2 }}>
                            {sv.priceDisplay}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {isAnySel && (
                          <span style={{
                            fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4,
                            background: "var(--cp-brand)", color: "#fff"
                          }}>
                            {selectedSubsInThisParent.length} selected
                          </span>
                        )}
                        <div style={{ color: "var(--cm)", display: "flex", alignItems: "center" }}>
                          {isExpanded ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                      </div>
                    </div>

                    {/* Sub-services list (renders if expanded) */}
                    {isExpanded && (
                      <div style={{
                        marginTop: 20, paddingTop: 16, borderTop: "1px dashed var(--cgb)",
                        display: "flex", flexDirection: "column", gap: 10
                      }}>
                        {/* Select All Toggle */}
                        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 2 }}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectAllCategory(sv);
                            }}
                            style={{
                              background: "rgba(129,140,248,0.06)",
                              border: "1px solid var(--cgb)",
                              borderRadius: 6,
                              padding: "6px 12px",
                              color: "var(--cp-brand)",
                              fontSize: 11.5,
                              fontWeight: 700,
                              cursor: "pointer",
                              fontFamily: "'Inter',sans-serif",
                              transition: "all .2s"
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = `rgba(129,140,248,.12)`;
                              e.currentTarget.style.borderColor = `rgba(129,140,248,.3)`;
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = "rgba(129,140,248,0.06)";
                              e.currentTarget.style.borderColor = "var(--cgb)";
                            }}
                          >
                            {selectedSubsInThisParent.length === sv.items.length ? "Deselect All" : "Select All"}
                          </button>
                        </div>

                        {sv.items.map((sub, j) => {
                          const subKey = `${sv.title}::${sub.name}::${sub.price}`;
                          const isSubSel = selectedSubSvcs.includes(subKey);
                          return (
                            <div
                              key={j}
                              onClick={(e) => { e.stopPropagation(); toggleSubSvc(subKey); }}
                              style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                padding: "12px 16px", borderRadius: 6, cursor: "pointer",
                                background: isSubSel ? "rgba(129,140,248,.08)" : "transparent",
                                border: isSubSel ? `1px solid rgba(129,140,248,.3)` : "1px solid var(--cgb)",
                                transition: "all .2s"
                              }}
                              onMouseEnter={e => { if (!isSubSel) e.currentTarget.style.background = "var(--cs)"; }}
                              onMouseLeave={e => { if (!isSubSel) e.currentTarget.style.background = "transparent"; }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                                {/* Custom Checkbox */}
                                <div style={{
                                  width: 16, height: 16, borderRadius: 3,
                                  background: isSubSel ? "var(--cp-brand)" : "transparent",
                                  border: isSubSel ? "none" : `1px solid var(--cgb)`,
                                  display: "flex", alignItems: "center", justifyContent: "center",
                                  transition: "all .2s", flexShrink: 0
                                }}>
                                  {isSubSel && <Check size={9} color="#fff" strokeWidth={3} />}
                                </div>
                                <span style={{ fontSize: 13.5, fontWeight: 600 }}>{sub.name}</span>
                              </div>
                              <div style={{ fontSize: 13.5, fontWeight: 700, color: isSubSel ? "var(--cp-brand)" : "var(--ct)" }}>
                                ₹{sub.price.toLocaleString('en-IN')}{sub.isMonthly ? "/mo" : ""}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT — Live summary panel */}
            <div style={{ flex: "0 1 300px", minWidth: 260, position: "sticky", top: 90 }}>
              <div className="gcard" style={{
                padding: "24px 22px",
                background: "var(--cgl)",
                border: "1px solid var(--cgb)"
              }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, fontSize: 17, marginBottom: 6, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  Your Package
                  {selectedSubSvcs.length > 0 && (
                    <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 4, background: "var(--cp-brand)", color: "#fff" }}>
                      {selectedSubSvcs.length} selected
                    </span>
                  )}
                </div>
                <div style={{ height: 1, background: "var(--cgb)", marginBottom: 20 }} />

                {selectedSubSvcs.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "28px 0" }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>☑️</div>
                    <div style={{ color: "var(--cm)", fontSize: 13.5, lineHeight: 1.7 }}>Select services on the left to build your custom package</div>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
                      {selectedSubSvcs.map((key, i) => {
                        const parts = key.split("::");
                        const parentTitle = parts[0];
                        const subName = parts[1];
                        const priceVal = parseInt(parts[2], 10);
                        const sv = SERVICES.find(x => x.title === parentTitle);

                        return (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 14px", borderRadius: 6, background: "rgba(129,140,248,.06)", border: "1px solid var(--cgb)" }}>
                            <div style={{ width: 28, height: 28, borderRadius: 4, background: `linear-gradient(${sv?.g || "135deg,#7c3aed,#c026d3"})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {sv && <sv.icon size={13} color="#fff" />}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>{subName}</div>
                              <div style={{ fontSize: 11, color: "var(--cm)", marginTop: 1 }}>{parentTitle} · ₹{priceVal.toLocaleString('en-IN')}</div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); toggleSubSvc(key); }} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--cm)", padding: 2, display: "flex", borderRadius: 6, transition: "color .2s" }}
                              onMouseEnter={e => e.currentTarget.style.color = "#ef4444"}
                              onMouseLeave={e => e.currentTarget.style.color = "var(--cm)"}>
                              <X size={13} />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {(() => {
                      const { baseTotal, finalTotal, discountText, customQuoteRequired } = getCustomPricingDetails(selectedSubSvcs);
                      const servicesListText = selectedSubSvcs.map((key, i) => {
                        const parts = key.split("::");
                        return `${i + 1}. ${parts[1]} (${parts[0]})`;
                      }).join('\n');
                      const msg = `Hi Sudhanshu! I'd like a custom package with the following services:\n\n${servicesListText}\n\nEstimated Price: ₹${finalTotal.toLocaleString('en-IN')}\n\nCan you share a custom quote?`;
                      const emailBody = `Hi Sudhanshu,\n\nI would like to request a custom package quote with the following services:\n\n${servicesListText}\n\nEstimated Price: ₹${finalTotal.toLocaleString('en-IN')}\n\nCan you get back to me with the details?\n\nThanks!`;

                      return (
                        <>
                          <div style={{ padding: "16px", borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)", marginBottom: 20 }}>
                            <div>
                              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "var(--cm)", marginBottom: 6 }}>
                                <span>Subtotal (Base Prices):</span>
                                <span>₹{baseTotal.toLocaleString('en-IN')}</span>
                              </div>
                              {baseTotal !== finalTotal && (
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#10b981", fontWeight: 600, marginBottom: 10 }}>
                                  <span>Bundle Discount:</span>
                                  <span>-₹{(baseTotal - finalTotal).toLocaleString('en-IN')}</span>
                                </div>
                              )}
                              <div style={{ height: 1, background: "var(--cgb)", marginBottom: 10 }} />
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                <span style={{ fontSize: 13.5, fontWeight: 700 }}>Est. Total:</span>
                                <div>
                                  <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 22, fontWeight: 800, color: "#10b981" }}>₹{finalTotal.toLocaleString('en-IN')}</span>
                                  {selectedSubSvcs.some(key => key.includes("Website Maintenance")) && <span style={{ fontSize: 11, color: "var(--cm)" }}> + maint. fee</span>}
                                </div>
                              </div>
                            </div>

                            {discountText && (
                              <div style={{ fontSize: 11.5, color: "#10b981", fontWeight: 600, marginTop: 10, borderTop: "1px dashed var(--cgb)", paddingTop: 8, lineHeight: 1.4 }}>
                                {discountText}
                              </div>
                            )}
                          </div>

                          <div style={{ padding: "12px 14px", borderRadius: 6, background: "rgba(16,185,129,.04)", border: "1px solid rgba(16,185,129,.15)", marginBottom: 20 }}>
                            <div style={{ fontSize: 12, color: "#10b981", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                              <Zap size={12} /> Quote sent within 30 mins
                            </div>
                            <div style={{ fontSize: 11.5, color: "var(--cm)", marginTop: 4, lineHeight: 1.6 }}>Free 1-on-1 discovery call & 30 days support included</div>
                          </div>

                          <a
                            href={`https://wa.me/917008099610?text=${encodeURIComponent(msg)}`}
                            target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                            <button className="btnP" style={{
                              width: "100%", padding: "14px", fontSize: 14,
                              fontWeight: 600, display: "flex", alignItems: "center",
                              justifyContent: "center", transition: "all .2s", letterSpacing: "-.1px"
                            }}>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, textAlign: "left", maxWidth: "100%" }}>
                                <MessageCircle size={16} style={{ flexShrink: 0 }} />
                                <span style={{ lineHeight: 1.3 }}>Share Selection on WhatsApp</span>
                              </div>
                            </button>
                          </a>
                          
                          <a
                            href={`mailto:sudhanshu124197@gmail.com?subject=${encodeURIComponent("Custom Package Quote Request")}&body=${encodeURIComponent(emailBody)}`}
                            style={{ textDecoration: "none", display: "block", marginTop: 10 }}>
                            <button className="btnS" style={{ width: "100%", padding: "12px", fontSize: 13.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <div style={{ display: "inline-flex", alignItems: "center", gap: 7, textAlign: "left", maxWidth: "100%" }}>
                                <Mail size={14} style={{ flexShrink: 0 }} />
                                <span style={{ lineHeight: 1.3 }}>Email My Requirements</span>
                              </div>
                            </button>
                          </a>
                        </>
                      );
                    })()}

                    <button onClick={() => setSelectedSubSvcs([])} style={{ display: "block", margin: "14px auto 0", background: "none", border: "none", fontSize: 12, color: "var(--cm)", cursor: "pointer", fontFamily: "'Inter',sans-serif", textDecoration: "underline" }}>Clear all</button>
                  </>
                )}

                <div style={{ marginTop: selectedSubSvcs.length > 0 ? 16 : 0, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: 11.5, color: "var(--cm)" }}>
                  <Shield size={11} /> No payment until you approve the quote
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
