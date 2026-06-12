import { useState } from "react";
import { CheckCircle2, MessageCircle, Mail, HelpCircle, Columns, X } from "lucide-react";
import { SERVICES } from "../data/sharedData.js";

const COMPARISONS = {
  "Website Development": {
    price: "₹4,999 – ₹69,999",
    delivery: "5 – 15 Days",
    audience: "Startups, Small Businesses, Portfolio Seekers",
    support: "30-90 Days Free Maintenance",
    goal: "Establish premium web presence & capture customer leads",
    features: [
      "Fully Responsive Layouts",
      "Google Analytics & SEO Config",
      "WhatsApp Chat & Form Integration",
      "Custom Domain Hookup",
      "High performance PageSpeed optimization"
    ]
  },
  "Website Maintenance": {
    price: "₹999 – ₹4,999/mo",
    delivery: "Monthly Retainer",
    audience: "Existing Website Owners, Businesses",
    support: "Ongoing Daily/Weekly Monitoring",
    goal: "Maintain security, updates, speed optimizations & backups",
    features: [
      "Server/Database Checkups",
      "Bug Fixes & Content Updates",
      "Performance Optimization",
      "Daily/Weekly Backups",
      "Uptime monitoring & alert setup"
    ]
  },
  "Resume Services": {
    price: "₹799 – ₹2,999",
    delivery: "24 – 48 Hours",
    audience: "Freshers, Experienced & Senior Professionals",
    support: "7 Days Post-Delivery Revisions",
    goal: "Clear applicant tracking systems (ATS) filters",
    features: [
      "ATS-Friendly Single Column Format",
      "Impact Metrics & Action Verbs",
      "Keywords Gap Analysis",
      "Fresher/Senior Custom Formats",
      "Editable Source File Deliverables"
    ]
  },
  "LinkedIn Services": {
    price: "₹999 – ₹2,999",
    delivery: "1 – 3 Days",
    audience: "Job Seekers, Corporate Professionals, SDETs",
    support: "7 Days Profile Optimization Support",
    goal: "Attract recruiters organically and raise page visits",
    features: [
      "Keyword-rich Headline & Summary",
      "Optimized Experience Descriptions",
      "Endorsement & Connection Strategy",
      "Branding Guide Checklist",
      "Recruiter Search visibility booster"
    ]
  },
  "Training Courses": {
    price: "₹2,999 – ₹9,999",
    delivery: "Self-Paced / Cohort-based",
    audience: "QA Professionals, Students, Coding Beginners",
    support: "Lifetime Access + Direct Q&A Support",
    goal: "Master Java, Selenium WebDriver, and Rest Assured",
    features: [
      "Hands-on Coding Exercises",
      "Interactive Framework Projects",
      "Direct Support on Udemy/Slack",
      "Certificate of Completion",
      "Lifetime material access updates"
    ]
  },
  "1:1 Mentorship": {
    price: "₹999 – ₹3,999",
    delivery: "Per Session / Booking Basis",
    audience: "Job Seekers, Automation Testers",
    support: "1-on-1 direct session support",
    goal: "Resolve specific framework blockers or mock prep",
    features: [
      "Live Zoom/Google Meet Session",
      "Mock Interview & Technical Feedback",
      "Custom Code/Framework Design Help",
      "Resume Review Suggestions",
      "Session video recording download"
    ]
  },
  "Monthly Mentorship": {
    price: "₹7,999 – ₹24,999/mo",
    delivery: "Ongoing Weekly Catch-ups",
    audience: "Career Switchers, Aspiring SDETs",
    support: "Continuous Daily Slack/WhatsApp Q&A",
    goal: "Step-by-step career path transition and mentorship",
    features: [
      "Weekly 1-on-1 Direct Live Calls",
      "Structured Automation Roadmap",
      "Resume & LinkedIn Services Included",
      "Job Placement Preparation",
      "Daily chat/email query support"
    ]
  },
  "Premium Packages": {
    price: "₹29,999 – ₹49,999",
    delivery: "3 – 6 Months Roadmap",
    audience: "Manual QAs switching to SDET",
    support: "Full Job Search Support & Guarantee",
    goal: "Complete technical SDET transformation from scratch",
    features: [
      "Full Java/Selenium/API Cohorts",
      "Multi-Project Portfolio Setup",
      "Mock Interviews & Video Reviews",
      "Salary Negotiation Support",
      "Unlimited doubt sessions"
    ]
  },
  "AI & Productivity": {
    price: "₹1,499 – ₹9,999+",
    delivery: "1 – 5 Sessions",
    audience: "Individuals, Teams, Corporate Groups",
    support: "15 Days Post-Training Check-in",
    goal: "Learn AI prompting (ChatGPT/Claude) & Excel automation",
    features: [
      "Custom ChatGPT Prompt Guides",
      "Excel/Sheets Speed-up Hacks",
      "Workplace Automation Audits",
      "Team Cohort Training Sessions",
      "Prompt templates cheat sheet"
    ]
  }
};

export default function ComparisonBuilder({ dark }) {
  const [selectedSvcs, setSelectedSvcs] = useState(["Website Development", "Resume Services"]);

  const handleToggleSvc = (name) => {
    if (selectedSvcs.includes(name)) {
      if (selectedSvcs.length > 1) {
        setSelectedSvcs(selectedSvcs.filter((s) => s !== name));
      }
    } else {
      if (selectedSvcs.length < 3) {
        setSelectedSvcs([...selectedSvcs, name]);
      } else {
        // Replace the last one
        setSelectedSvcs([selectedSvcs[0], selectedSvcs[1], name]);
      }
    }
  };

  const getWhatsAppMessage = () => {
    const compareSummary = selectedSvcs
      .map((name, i) => {
        const item = COMPARISONS[name];
        return `${i + 1}. ${name} (${item.price})`;
      })
      .join("\n");
    const msg = `Hi Sudhanshu! I compared these services side-by-side on your website:\n\n${compareSummary}\n\nI would like to consult on which options fit best for my goals. Let's talk!`;
    return `https://wa.me/917008099610?text=${encodeURIComponent(msg)}`;
  };

  const getEmailLink = () => {
    const compareSummary = selectedSvcs
      .map((name, i) => {
        const item = COMPARISONS[name];
        return `${i + 1}. ${name} (Price: ${item.price}, Timeline: ${item.delivery})`;
      })
      .join("\n");
    const subject = "Service Comparison Discussion Request";
    const body = `Hi Sudhanshu,\n\nI compared the following services side-by-side on your site:\n\n${compareSummary}\n\nCould you please guide me on selecting the ideal package?\n\nThank you!`;
    return `mailto:sudhanshu124197@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="reveal vis" style={{ animation: "shimIn .5s cubic-bezier(.16,1,.3,1)" }}>
      {/* Intro info box */}
      <div
        className="glass gradBorder"
        style={{
          borderRadius: 12,
          padding: 24,
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 6,
            background: "rgba(124, 58, 237, 0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--cp)",
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          ⚖️
        </div>
        <div style={{ flex: 1 }}>
          <h4
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 16.5,
              fontWeight: 800,
              marginBottom: 4,
            }}
          >
            Smart Side-by-Side Comparison Matrix
          </h4>
          <p style={{ color: "var(--cm)", fontSize: 13, lineHeight: 1.6 }}>
            Select **up to 3 services** below to evaluate key features, delivery timelines, target
            demographics, and estimated budget ranges side-by-side.
          </p>
        </div>
      </div>

      {/* Selectors grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: 10,
          marginBottom: 36,
        }}
      >
        {SERVICES.map((sv) => {
          const isSelected = selectedSvcs.includes(sv.title);
          return (
            <button
              key={sv.title}
              onClick={() => handleToggleSvc(sv.title)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                borderRadius: 6,
                border: isSelected ? `1.5px solid var(--cp)` : "1px solid var(--cgb)",
                background: isSelected
                  ? (dark ? "rgba(124, 58, 237, 0.1)" : "rgba(109, 40, 217, 0.06)")
                  : "var(--cs)",
                color: isSelected ? "var(--cp)" : "var(--cm)",
                cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: 12.5,
                fontWeight: 600,
                textAlign: "left",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {sv.title}
              </span>
              {isSelected ? (
                <CheckCircle2 size={14} color="var(--cp)" style={{ flexShrink: 0, marginLeft: 8 }} />
              ) : (
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    border: "1px solid var(--cgb)",
                    flexShrink: 0,
                    marginLeft: 8,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Side-by-Side Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${selectedSvcs.length}, 1fr)`,
          gap: 20,
          alignItems: "stretch",
          marginBottom: 40,
        }}
        className="comparisonGrid"
      >
        {selectedSvcs.map((name) => {
          const sv = COMPARISONS[name];
          const serviceObj = SERVICES.find((s) => s.title === name);
          const Icon = serviceObj ? serviceObj.icon : HelpCircle;

          return (
            <div
              key={name}
              className="gcard gradBorder"
              style={{
                borderRadius: 12,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Delete tag */}
              {selectedSvcs.length > 1 && (
                <button
                  onClick={() => setSelectedSvcs(selectedSvcs.filter((s) => s !== name))}
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--cm)",
                    padding: 4,
                    display: "flex",
                    borderRadius: 6,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--cm)")}
                >
                  <X size={15} />
                </button>
              )}

              {/* Service header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 6,
                    background: serviceObj
                      ? `linear-gradient(${serviceObj.g})`
                      : "linear-gradient(135deg,#7c3aed,#c026d3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color="#fff" />
                </div>
                <h4
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 800,
                    fontSize: 15.5,
                    margin: 0,
                    lineHeight: 1.25,
                  }}
                >
                  {name}
                </h4>
              </div>

              {/* Pricing section */}
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 6,
                  background: "rgba(124, 58, 237, 0.05)",
                  border: "1px solid var(--cgb)",
                  marginBottom: 20,
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase" }}>
                  Estimated Price
                </div>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: 17.5,
                    fontWeight: 800,
                    color: "var(--cp)",
                    marginTop: 2,
                  }}
                >
                  {sv.price}
                </div>
              </div>

              {/* Attributes comparison list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase" }}>
                    Primary Goal
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginTop: 4, lineHeight: 1.45 }}>
                    {sv.goal}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase" }}>
                    Timeline
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                    {sv.delivery}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase" }}>
                    Target Audience
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ct)", marginTop: 4, lineHeight: 1.4 }}>
                    {sv.audience}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--cm)", textTransform: "uppercase" }}>
                    Client Support
                  </div>
                  <div style={{ fontSize: 13, color: "var(--ct)", marginTop: 4 }}>
                    {sv.support}
                  </div>
                </div>

                {/* Features Checklist */}
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--cm)",
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    Core Deliverables
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {sv.features.map((feat, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 6,
                          fontSize: 12,
                          color: "var(--cm)",
                          lineHeight: 1.3,
                        }}
                      >
                        <CheckCircle2
                          size={12}
                          color="var(--cp)"
                          style={{ marginTop: 2, flexShrink: 0 }}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Footer Actions */}
      <div
        className="glass gradBorder"
        style={{
          borderRadius: 12,
          padding: 24,
          textAlign: "center",
          background: "var(--cgl)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          alignItems: "center",
        }}
      >
        <div>
          <h4
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: 17,
              fontWeight: 800,
              marginBottom: 4,
            }}
          >
            Interested in these compared options?
          </h4>
          <p style={{ color: "var(--cm)", fontSize: 13 }}>
            Send this customized comparison directly to Sudhanshu to schedule a focused discovery
            call.
          </p>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a href={getWhatsAppMessage()} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button
              className="btnP"
              style={{
                padding: "12px 24px",
                borderRadius: 6,
                fontSize: 13.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MessageCircle size={15} /> WhatsApp Comparison
            </button>
          </a>

          <a href={getEmailLink()} style={{ textDecoration: "none" }}>
            <button
              className="btnS"
              style={{
                padding: "12px 24px",
                borderRadius: 6,
                fontSize: 13.5,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Mail size={14} /> Email Comparison
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
