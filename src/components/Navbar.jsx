import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Search } from "lucide-react";

const NAV = [
  { l: "Home", to: "/" },
  { l: "Services", to: "/services" },
  { l: "Interactive Tools", to: "/tools" },
  { l: "Portfolio", to: "/portfolio" },
  { l: "About", to: "/about" },
  { l: "Contact", to: "/contact" }
];

export default function Navbar({ dark, setDark }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile menu on route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (path) => location.pathname === path;

  const toggleDark = (e) => {
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDark(!dark);
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      setDark(!dark);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ],
        },
        {
          duration: 450,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <nav style={{
      position: "fixed",
      top: scrolled ? 12 : 0,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      width: scrolled ? "calc(100% - 24px)" : "100%",
      maxWidth: 1200,
      borderRadius: scrolled ? 8 : 0,
      background: scrolled ? "var(--cgl)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      border: scrolled ? "1px solid var(--cgb)" : "1px solid transparent",
      boxShadow: scrolled ? "var(--cshadow)" : "none",
      transition: "all .3s cubic-bezier(0.16, 1, 0.3, 1)"
    }}>
      {/* ── Top bar ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyOrigin: "center", justifyContent: "space-between", height: 56 }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", textDecoration: "none", color: "inherit" }}>
            <div style={{
              width: 32, height: 32, borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", border: "1px solid var(--cgb)"
            }}>
              <img src="/icon-192.png" alt="Sudhanshu Digital Logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, letterSpacing: "-0.3px" }}>Sudhanshu Digital</div>
              <div style={{ fontSize: 8.5, color: "var(--cm)", marginTop: -1, letterSpacing: "1px", textTransform: "uppercase" }}>Services</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="deskNav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {NAV.map(n => (
              <Link key={n.to} to={n.to} className={`navLink${isActive(n.to) ? " act" : ""}`}
                style={{
                  padding: "6px 12px", fontSize: 13, fontWeight: 500,
                  color: isActive(n.to) ? "var(--cp)" : "var(--cm)",
                  letterSpacing: "-.1px", textDecoration: "none"
                }}>
                {n.l}
              </Link>
            ))}
            <Link to="/contact" style={{ textDecoration: "none" }}>
              <button className="btnP" style={{ marginLeft: 12, padding: "8px 16px", fontSize: 13 }}>
                Free Consultation
              </button>
            </Link>
          </div>

          {/* Icon Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 12px",
                borderRadius: 6,
                background: "var(--cs)",
                border: "1px solid var(--cgb)",
                color: "var(--cm)",
                cursor: "pointer",
                transition: "all .2s ease",
                height: 32
              }}
              className="deskNav"
            >
              <Search size={13} />
              <span style={{ fontSize: 12, fontWeight: 500 }}>Search...</span>
              <kbd style={{ fontSize: 9, fontFamily: "monospace", background: "var(--cgb)", padding: "1px 4px", borderRadius: 3 }}>⌘K</kbd>
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-command-palette"))}
              style={{
                width: 32, height: 32, borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--cm)", transition: "all .2s"
              }}
              className="mobBtn"
            >
              <Search size={14} />
            </button>

            <button onClick={toggleDark} style={{
              width: 32, height: 32, borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "var(--cm)", transition: "all .2s"
            }}>
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button className="mobBtn" onClick={() => setMobileOpen(!mobileOpen)} style={{
              width: 32, height: 32, borderRadius: 6, background: "var(--cs)", border: "1px solid var(--cgb)",
              display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--cm)"
            }}>
              {mobileOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu Overlay ── */}
      <div className={`mmenu${mobileOpen ? " open" : ""}`}>
        {/* Dimmed backdrop – tap to close */}
        <div className="mmenuBd" onClick={() => setMobileOpen(false)} />
        {/* Solid content panel */}
        <div className="mmenuPanel" style={{ borderRadius: "0 0 12px 12px" }}>
          {NAV.map(n => (
            <Link key={n.to} to={n.to} onClick={() => setMobileOpen(false)} style={{
              background: isActive(n.to) ? "var(--cs)" : "none",
              textAlign: "left", color: isActive(n.to) ? "var(--cp)" : "var(--ct)",
              padding: "10px 14px", borderRadius: 8, cursor: "pointer", fontSize: 14.5,
              fontWeight: 500, fontFamily: "'Inter',sans-serif", textDecoration: "none",
              display: "block", transition: "background .15s, color .15s"
            }}>{n.l}</Link>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <a href="tel:+917008099610" style={{ flex: 1, textDecoration: "none" }}>
              <button className="btnS" style={{ width: "100%", padding: "10px", borderRadius: 8, fontSize: 13.5 }}>📞 Call Now</button>
            </a>
            <Link to="/contact" onClick={() => setMobileOpen(false)} style={{ flex: 1, textDecoration: "none" }}>
              <button className="btnP" style={{ width: "100%", padding: "10px", borderRadius: 8, fontSize: 13.5 }}>💬 Consultation</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
