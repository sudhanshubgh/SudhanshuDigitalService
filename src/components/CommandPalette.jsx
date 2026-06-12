import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, FileText, Globe, GraduationCap, Laptop,
  MessageSquare, User, Phone, Check, RefreshCw, Zap,
  Columns, Star, Compass, Settings, Sun, Moon
} from "lucide-react";

export default function CommandPalette({ dark, setDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const COMMANDS = [
    // Pages
    { label: "Go to Home", category: "Navigation", icon: Compass, action: () => navigate("/") },
    { label: "Go to Services", category: "Navigation", icon: Zap, action: () => navigate("/services") },
    { label: "Go to Interactive Tools", category: "Navigation", icon: Laptop, action: () => navigate("/tools") },
    { label: "Go to Portfolio Showcase", category: "Navigation", icon: Star, action: () => navigate("/portfolio") },
    { label: "Go to About Sudhanshu", category: "Navigation", icon: User, action: () => navigate("/about") },
    { label: "Go to Contact", category: "Navigation", icon: Phone, action: () => navigate("/contact") },

    // Services
    { label: "Service: Website Development & Design", category: "Services", icon: Globe, action: () => navigate("/services") },
    { label: "Service: Resume Rewrite & ATS Optimization", category: "Services", icon: FileText, action: () => navigate("/services") },
    { label: "Service: LinkedIn Profile Optimization", category: "Services", icon: Settings, action: () => navigate("/services") },
    { label: "Service: Live 1:1 Mentorship / Mock Prep", category: "Services", icon: MessageSquare, action: () => navigate("/services") },
    { label: "Service: Selenium & Java Training Courses", category: "Services", icon: GraduationCap, action: () => navigate("/services") },

    // Tools
    { label: "Tool: ATS Resume Scanner", category: "Tools", icon: FileText, action: () => navigate("/tools?tab=scanner") },
    { label: "Tool: Salary Hike ROI Calculator", category: "Tools", icon: Laptop, action: () => navigate("/tools?tab=roi") },
    { label: "Tool: Career Diagnostic Wizard", category: "Tools", icon: Settings, action: () => navigate("/tools?tab=wizard") },
    { label: "Tool: Technical Mock Interview Prep", category: "Tools", icon: MessageSquare, action: () => navigate("/tools?tab=interview") },
    { label: "Tool: Website Speed & SEO Auditor", category: "Tools", icon: Globe, action: () => navigate("/tools?tab=audit") },
    { label: "Tool: Smart Service Comparison Builder", category: "Tools", icon: Columns, action: () => navigate("/tools?tab=comparison") },

    // Quick Actions
    { label: dark ? "Switch to Light Mode" : "Switch to Dark Mode", category: "System Actions", icon: dark ? Sun : Moon, action: () => setDark(!dark) },
    { label: "Open WhatsApp Chat", category: "Quick Connect", icon: Phone, action: () => window.open("https://wa.me/917008099610?text=Hello!%20I'm%20interested%20in%20your%20services.", "_blank") },
    { label: "Book Free Consultation Call", category: "Quick Connect", icon: Phone, action: () => navigate("/contact") },
  ];

  // Listen to Cmd/Ctrl + K and toggle custom events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleToggleEvent = () => {
      setIsOpen((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-command-palette", handleToggleEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-command-palette", handleToggleEvent);
    };
  }, []);

  // Set focus on input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      setQuery("");
      setActiveIndex(0);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const filteredCommands = COMMANDS.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (cmd) => {
    cmd.action();
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        handleSelect(filteredCommands[activeIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "12vh",
        background: "rgba(6, 4, 15, 0.45)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: 600,
          background: "var(--cs)",
          borderRadius: 8,
          border: "1px solid var(--cgb)",
          boxShadow: "var(--cshadow)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "60vh",
          animation: "pageIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) both",
        }}
      >
        {/* Search Input Wrapper */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 18px",
            borderBottom: "1px solid var(--cgb)",
          }}
        >
          <Search size={16} color="var(--cm)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Type a command or search services..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              fontFamily: "'Inter', sans-serif",
              color: "var(--ct)",
            }}
          />
          <kbd
            style={{
              padding: "2px 6px",
              borderRadius: 4,
              background: "var(--cb2)",
              border: "1px solid var(--cgb)",
              fontSize: 9.5,
              color: "var(--cm)",
              fontFamily: "monospace",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Scrollable Results List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: 8,
          }}
        >
          {filteredCommands.length === 0 ? (
            <div style={{ padding: "32px 16px", textAlign: "center", color: "var(--cm)" }}>
              <p style={{ fontSize: 13, fontWeight: 500 }}>No results found for "{query}"</p>
              <p style={{ fontSize: 11, marginTop: 4 }}>Try searching for "web", "resume", "courses", or "theme"</p>
            </div>
          ) : (
            <div>
              {/* Group items by category */}
              {Object.entries(
                filteredCommands.reduce((groups, item) => {
                  if (!groups[item.category]) groups[item.category] = [];
                  groups[item.category].push(item);
                  return groups;
                }, {})
              ).map(([category, items]) => (
                <div key={category}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "var(--cm)",
                      padding: "8px 12px 4px",
                    }}
                  >
                    {category}
                  </div>
                  {items.map((cmd) => {
                    const globalIdx = filteredCommands.indexOf(cmd);
                    const isActive = globalIdx === activeIndex;
                    const CmdIcon = cmd.icon;

                    return (
                      <div
                        key={cmd.label}
                        onClick={() => handleSelect(cmd)}
                        onMouseEnter={() => setActiveIndex(globalIdx)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 12px",
                          borderRadius: 6,
                          background: isActive
                            ? "var(--cb2)"
                            : "transparent",
                          cursor: "pointer",
                          transition: "all 0.15s ease",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div
                            style={{
                              width: 28,
                              height: 28,
                              borderRadius: 4,
                              background: isActive
                                ? "var(--cgb)"
                                : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: isActive
                                ? "var(--cp)"
                                : "var(--cm)",
                              transition: "all 0.15s ease",
                            }}
                          >
                            <CmdIcon size={14} />
                          </div>
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: isActive ? 600 : 500,
                              color: "var(--ct)",
                            }}
                          >
                            {cmd.label}
                          </span>
                        </div>
                        {isActive && (
                          <span
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: "var(--cp)",
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            Select <kbd style={{ fontFamily: "monospace" }}>↵</kbd>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer controls guide */}
        <div
          style={{
            padding: "8px 16px",
            background: "var(--cb2)",
            borderTop: "1px solid var(--cgb)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 10.5,
            color: "var(--cm)",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <span><kbd style={{ fontFamily: "monospace" }}>↑↓</kbd> to navigate</span>
            <span><kbd style={{ fontFamily: "monospace" }}>↵</kbd> to select</span>
            <span><kbd style={{ fontFamily: "monospace" }}>esc</kbd> to close</span>
          </div>
          <div style={{ fontWeight: 600, color: "var(--cp)" }}>
            Sudhanshu Digital Cmd
          </div>
        </div>
      </div>
    </div>
  );
}
