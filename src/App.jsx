import React, { useState, useEffect, useRef } from 'react';

import VirtualSmilePreview from './components/VirtualSmilePreview.jsx';
import TreatmentFinder from './components/TreatmentFinder.jsx';

const FORMSPREE = "https://formspree.io/f/xrejyeko";
const encode = (data) => Object.keys(data).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])).join("&");

const TWEAK_DEFAULTS = {
  accentColor: "#2a9d8f",
  heroHeadline: "Your best smile starts here.",
  showBanner: true,
  ctaLabel: "Request an Appointment",
  font: "Playfair Display"
};

const T = {
  teal: "oklch(0.52 0.13 192)",
  tealLight: "oklch(0.94 0.04 192)",
  tealMid: "oklch(0.70 0.09 192)",
  gold: "oklch(0.72 0.13 82)",
  goldLight: "oklch(0.95 0.04 82)",
  slate: "oklch(0.18 0.02 240)",
  slateMid: "oklch(0.40 0.02 240)",
  slateLight: "oklch(0.62 0.02 240)",
  white: "oklch(0.985 0.008 60)",
  offWhite: "oklch(0.97 0.01 60)",
  surface: "oklch(0.975 0.012 60)"
};

const Icon = ({ name, size = 22, color = "currentColor" }) => {
  const paths = {
    tooth: "M8 2C5.5 2 4 4 4 6c0 2 1 3.5 1.5 5C6 13 6 15 6 17c0 2 .5 3 2 3s2-2 2-3.5c0-.5.3-.5.5-.5s.5 0 .5.5C11 18 12 20 14 20s2-1 2-3c0-2 0-4 .5-6C17 9.5 18 8 18 6c0-2-1.5-4-4-4-1 0-2 .5-3 1.5C10 2.5 9 2 8 2z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    phone: "M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z",
    calendar: "M8 2v3M16 2v3M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    check: "M20 6L9 17l-5-5",
    shield: "M12 2L3 7v6c0 5.25 3.75 10.15 9 11.25C17.25 23.15 21 18.25 21 13V7L12 2z",
    smile: "M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z",
    sparkle: "M12 3v3m0 12v3m9-9h-3M6 12H3m12.36-6.36-2.12 2.12M8.46 15.54l-2.12 2.12m12.02 0-2.12-2.12M8.46 8.46 6.34 6.34",
    map: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    implant: "M12 2v6m0 0c-2.5 0-5 1.5-5 4v8h10v-8c0-2.5-2.5-4-5-4zM9 20h6",
    sedation: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
    chevron: "M19 9l-7 7-7-7",
    arrow: "M5 12h14M12 5l7 7-7 7",
    close: "M18 6L6 18M6 6l12 12"
  };
  const d = paths[name] || paths.star;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={name === "star" || name === "tooth" ? color : "none"}
      stroke={name === "star" || name === "tooth" ? "none" : color}
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>);
};

const Banner = ({ tweaks }) => {
  const [show, setShow] = useState(true);
  if (!tweaks.showBanner || !show) return null;
  return (
    <div style={{
      background: T.teal, color: "#fff", textAlign: "center",
      padding: "10px 20px", fontSize: 14, fontWeight: 500,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
      position: "relative"
    }}>
      <span>✦ New patients welcome — book this month and receive a <strong>free consultation</strong> ✦</span>
      <button onClick={() => setShow(false)} style={{
        position: "absolute", right: 16, background: "none", border: "none",
        color: "#fff", cursor: "pointer", opacity: 0.8, lineHeight: 1
      }}>
        <Icon name="close" size={16} color="#fff" />
      </button>
    </div>);
};

const Nav = ({ tweaks }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const links = ["Services", "About", "Reviews", "Contact"];
  const solidBg = scrolled || menuOpen;

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      <nav style={{
        background: solidBg ? "rgba(252,250,248,0.97)" : "transparent",
        backdropFilter: solidBg ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid oklch(0.90 0.01 60)` : "1px solid transparent",
        transition: "all 0.35s ease",
        padding: "0 clamp(20px, 5vw, 80px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68
      }}>
        <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img src="/uploads/Doug Takeuchi Logo web.png" alt="Doug Takeuchi, DDS"
            style={{ height: 48, width: "auto", display: "block", objectFit: "contain" }} />
        </a>

        {isMobile ? (
          <button onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu" style={{
            background: "none", border: "none", cursor: "pointer", padding: 8,
            display: "flex", flexDirection: "column", justifyContent: "center", gap: 5
          }}>
            <span style={{
              display: "block", width: 24, height: 2, borderRadius: 2,
              background: menuOpen ? T.teal : T.slate, transition: "all 0.3s",
              transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : ""
            }} />
            <span style={{
              display: "block", width: 24, height: 2, borderRadius: 2,
              background: menuOpen ? T.teal : T.slate, transition: "all 0.3s",
              opacity: menuOpen ? 0 : 1
            }} />
            <span style={{
              display: "block", width: 24, height: 2, borderRadius: 2,
              background: menuOpen ? T.teal : T.slate, transition: "all 0.3s",
              transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : ""
            }} />
          </button>
        ) : (
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {links.map((l) =>
              <a key={l} href={`#${l.toLowerCase()}`} style={{
                textDecoration: "none", color: T.slateMid, fontSize: 14, fontWeight: 500,
                transition: "color 0.2s"
              }}
                onMouseEnter={(e) => e.target.style.color = T.teal}
                onMouseLeave={(e) => e.target.style.color = T.slateMid}>
                {l}</a>
            )}
            <a href="#contact" style={{
              background: tweaks.accentColor || T.teal, color: "#fff",
              padding: "9px 22px", borderRadius: 30, fontSize: 14, fontWeight: 600,
              textDecoration: "none", transition: "opacity 0.2s, transform 0.15s",
              display: "flex", alignItems: "center", gap: 7
            }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}>
              <Icon name="phone" size={14} color="#fff" />
              408-295-5651
            </a>
          </div>
        )}
      </nav>

      {isMobile && menuOpen && (
        <div style={{
          background: "rgba(252,250,248,0.97)", backdropFilter: "blur(12px)",
          borderBottom: `1px solid oklch(0.90 0.01 60)`,
          padding: "16px clamp(20px, 5vw, 80px) 28px",
          display: "flex", flexDirection: "column"
        }}>
          {links.map((l) =>
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                textDecoration: "none", color: T.slate, fontSize: 18, fontWeight: 500,
                padding: "14px 0", borderBottom: `1px solid oklch(0.92 0.01 60)`,
                display: "block"
              }}>
              {l}
            </a>
          )}
          <a href="tel:4082955651" style={{
            marginTop: 20, background: tweaks.accentColor || T.teal, color: "#fff",
            padding: "14px 22px", borderRadius: 50,
            textDecoration: "none", fontWeight: 600, fontSize: 15,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 9
          }}>
            <Icon name="phone" size={16} color="#fff" />
            Call 408-295-5651
          </a>
        </div>
      )}
    </div>);
};

const Hero = ({ tweaks }) => {
  const accent = tweaks.accentColor || T.teal;
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 900);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const chip = (label) => (
    <span key={label} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 13, color: "oklch(0.90 0.02 200)"
    }}>
      <Icon name="check" size={13} color={T.gold} /> {label}
    </span>
  );

  return (
    <section id="home" style={{
      minHeight: isMobile ? "auto" : "calc(100vh - 68px)",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1.05fr 1fr"
    }}>
      {/* LEFT — brand panel */}
      <div style={{
        background: "linear-gradient(155deg, oklch(0.18 0.04 232) 0%, oklch(0.27 0.08 202) 55%, oklch(0.40 0.11 190) 100%)",
        color: "#fff",
        padding: "clamp(48px,6vw,88px) clamp(28px,5vw,76px)",
        display: "flex", flexDirection: "column", justifyContent: "center",
        position: "relative", overflow: "hidden"
      }}>
        <div style={{ position: "absolute", top: -110, right: -90, width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, oklch(0.72 0.13 82 / 0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -150, left: -110, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, oklch(0.62 0.13 192 / 0.22) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", maxWidth: 560 }}>
          <div className="fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "oklch(1 0 0 / 0.10)", border: "1px solid oklch(1 0 0 / 0.22)",
            borderRadius: 30, padding: "6px 16px", marginBottom: 26
          }}>
            <Icon name="shield" size={14} color={T.gold} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#fff", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              20+ Years · San Jose's Trusted Dentist
            </span>
          </div>

          <h1 className="fade-up delay-1" style={{
            fontFamily: `'${tweaks.font || "Playfair Display"}',serif`,
            fontSize: "clamp(40px,5vw,66px)", fontWeight: 700,
            lineHeight: 1.08, margin: "0 0 22px", textWrap: "balance"
          }}>
            {tweaks.heroHeadline}
          </h1>

          <p className="fade-up delay-2" style={{
            fontSize: "clamp(16px,1.4vw,19px)", color: "oklch(0.92 0.02 200)",
            lineHeight: 1.65, maxWidth: 500, marginBottom: 28
          }}>
            Gentle family &amp; cosmetic dentistry in San Jose, CA — comfortable,
            judgment-free care for every smile, from routine checkups to complete
            makeovers with Dr. Doug Takeuchi, DDS.
          </p>

          <div className="fade-up delay-2" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 34, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 2 }}>
              {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={18} color={T.gold} />)}
            </div>
            <span style={{ fontSize: 14, color: "oklch(0.90 0.02 200)" }}>
              <strong style={{ color: "#fff" }}>4.9</strong> · 500+ Google reviews
            </span>
          </div>

          <div className="fade-up delay-3" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 24 }}>
            <a href="#contact" style={{
              background: "#fff", color: accent,
              padding: "15px 30px", borderRadius: 50,
              textDecoration: "none", fontWeight: 700, fontSize: 16,
              display: "flex", alignItems: "center", gap: 9,
              boxShadow: "0 10px 30px oklch(0 0 0 / 0.28)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 16px 40px oklch(0 0 0 / 0.34)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 10px 30px oklch(0 0 0 / 0.28)"; }}>
              <Icon name="calendar" size={16} color={accent} />
              {tweaks.ctaLabel || "Book a Free Consultation"}
            </a>
            <a href="tel:4082955651" style={{
              background: "oklch(1 0 0 / 0.10)", border: "1px solid oklch(1 0 0 / 0.30)",
              color: "#fff", padding: "15px 26px", borderRadius: 50,
              textDecoration: "none", fontWeight: 500, fontSize: 16,
              display: "flex", alignItems: "center", gap: 9, transition: "background 0.2s"
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = "oklch(1 0 0 / 0.18)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "oklch(1 0 0 / 0.10)"}>
              <Icon name="phone" size={16} color="#fff" />
              408-295-5651
            </a>
          </div>

          <div className="fade-up delay-4" style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            {["Same-day emergencies", "New patients welcome", "Financing available"].map(chip)}
          </div>
        </div>
      </div>

      {/* RIGHT — patient portrait */}
      <div style={{
        position: "relative",
        minHeight: isMobile ? 340 : "auto",
        overflow: "hidden", background: "oklch(0.9 0.01 200)"
      }}>
        <img
          src="/uploads/DrWPatient2.jpeg"
          alt="A happy patient admiring her brighter smile in a mirror with Dr. Takeuchi"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "58% center" }}
        />
        {!isMobile &&
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, oklch(0.27 0.08 202 / 0.55) 0%, transparent 20%)", pointerEvents: "none" }} />
        }
        <div style={{
          position: "absolute", bottom: "clamp(18px,3vw,32px)", left: "clamp(18px,3vw,32px)",
          background: "oklch(1 0 0 / 0.92)", backdropFilter: "blur(6px)",
          borderRadius: 16, padding: "14px 18px", maxWidth: 260,
          boxShadow: "0 16px 40px oklch(0 0 0 / 0.25)",
          display: "flex", alignItems: "center", gap: 12
        }}>
          <div style={{ fontSize: 26 }}>😁</div>
          <div>
            <div style={{ display: "flex", gap: 1, marginBottom: 3 }}>
              {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={12} color={T.gold} />)}
            </div>
            <div style={{ fontSize: 13, color: T.slate, fontWeight: 600, lineHeight: 1.3 }}>
              "I finally love my smile."
            </div>
            <div style={{ fontSize: 11, color: T.slateMid }}>Verified patient review</div>
          </div>
        </div>
      </div>
    </section>);
};

const TrustBar = () =>
  <section style={{
    background: T.slate, padding: "24px clamp(20px,6vw,100px)"
  }}>
    <div style={{
      maxWidth: 1100, margin: "0 auto",
      display: "flex", alignItems: "center", justifyContent: "space-around",
      flexWrap: "wrap", gap: 24
    }}>
      {[
        { icon: "shield", label: "Anxiety-Free Sedation" },
        { icon: "users", label: "All Ages Welcome" },
        { icon: "calendar", label: "Same-Day Emergencies" },
        { icon: "smile", label: "Financing Available" },
        { icon: "calendar", label: "Mon–Fri · 8am–5pm" }].
        map(({ icon, label }) =>
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name={icon} size={18} color={T.tealMid} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "oklch(0.80 0.02 220)", letterSpacing: "0.02em" }}>{label}</span>
          </div>
        )}
    </div>
  </section>;

const AEOBlock = ({ tweaks }) =>
  <section style={{ padding: "64px clamp(20px,6vw,100px)", background: T.tealLight }}>
    <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        color: tweaks.accentColor || T.teal, fontSize: 12, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16
      }}>
        <Icon name="sparkle" size={13} color={tweaks.accentColor || T.teal} />
        Every Patient. Every Need.
      </div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, color: T.slate, lineHeight: 1.3, marginBottom: 20 }}>
        What kind of dental care do you need?
      </h2>
      <p style={{ fontSize: 17, color: T.slateMid, lineHeight: 1.8, marginBottom: 32 }}>
        Maybe it's been a while. Maybe you're nervous about what you'll find. Maybe you just moved to San Jose and need a dentist you can actually trust. Whatever brought you here, Dr. Takeuchi's practice is built to handle it — from routine checkups and kids' first visits to cosmetic makeovers, dental implants, sedation for anxious patients, and same-day emergency care.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
        {["Family Dentistry", "Cosmetic Dentistry", "Dental Implants", "Teeth Whitening", "Sedation Dentistry", "Emergency Care", "Root Canals", "Veneers", "Children's Dentistry", "Restorative Dentistry"].map((tag) =>
          <span key={tag} style={{
            background: "#fff", border: `1.5px solid ${tweaks.accentColor || T.teal}33`,
            color: tweaks.accentColor || T.teal, borderRadius: 30,
            padding: "6px 16px", fontSize: 13, fontWeight: 600
          }}>{tag}</span>
        )}
      </div>
    </div>
  </section>;

const services_data = [
  { icon: "users", title: "Family Dentistry", highlight: null, desc: "Comprehensive preventive and restorative care for every member of your family — from children's first visits to senior smile maintenance." },
  { icon: "sparkle", title: "Cosmetic Dentistry", highlight: "Most Popular", desc: "Veneers, bonding, whitening, and smile makeovers designed to give you a radiant, confidence-boosting smile." },
  { icon: "tooth", title: "Restorative Dentistry", highlight: null, desc: "Crowns, bridges, and fillings that repair damaged teeth, restore full function, and blend naturally with your smile." },
  { icon: "implant", title: "Tooth Replacement", highlight: null, desc: "Dental implants, bridges, and dentures — permanent and removable solutions for one or more missing teeth." },
  { icon: "sedation", title: "Sedation Dentistry", highlight: "Anxiety-Free", desc: "Oral and nitrous oxide sedation so even the most anxious patients can relax and get the care they need comfortably." },
  { icon: "phone", title: "Emergency Dentistry", highlight: "Same Day", desc: "Same-day appointments for tooth pain, broken teeth, lost fillings, and dental trauma. Call 408-295-5651." },
  { icon: "smile", title: "Children's Dentistry", highlight: null, desc: "Gentle, kid-friendly care that builds healthy habits and creates positive dental experiences from the very first visit." },
  { icon: "tooth", title: "Root Canals", highlight: null, desc: "Modern, comfortable root canal treatment to save infected teeth and relieve pain — often completed in a single visit." },
  { icon: "shield", title: "Dental Crowns", highlight: null, desc: "Natural-looking porcelain crowns that protect damaged teeth and blend seamlessly with your surrounding smile." },
  { icon: "sparkle", title: "Teeth Whitening", highlight: null, desc: "Professional whitening treatments that deliver dramatically brighter results safely, quickly, and effectively." },
  { icon: "smile", title: "Veneers", highlight: null, desc: "Ultra-thin porcelain shells that correct chips, gaps, stains, and shape — transforming your smile in just two visits." },
  { icon: "tooth", title: "Tooth-Colored Fillings", highlight: null, desc: "Composite resin fillings that match your natural tooth color, leaving no visible trace of the repair." }
];

const ServiceCard = ({ svc, tweaks }) => {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const ref = useRef(null);
  const accent = tweaks.accentColor || T.teal;

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: (0.5 - py) * 12, ry: (px - 0.5) * 14 });
    setGlow({ x: px * 100, y: py * 100 });
  };
  const onLeave = () => {
    setHov(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: hov
          ? `radial-gradient(circle at ${glow.x}% ${glow.y}%, oklch(0.28 0.04 210) 0%, ${T.slate} 60%)`
          : "#fff",
        borderRadius: 16, padding: "32px 28px",
        border: `1.5px solid ${hov ? "oklch(0.52 0.13 192 / 0.5)" : "oklch(0.91 0.01 60)"}`,
        transition: hov ? "background 0.3s ease, box-shadow 0.3s ease" : "all 0.4s ease",
        cursor: "default", position: "relative",
        transformStyle: "preserve-3d",
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0) ${hov ? "scale(1.03)" : ""}`,
        boxShadow: hov
          ? `0 30px 60px oklch(0 0 0 / 0.28), 0 0 0 1px ${accent}22`
          : "0 2px 12px oklch(0 0 0 / 0.04)",
        willChange: "transform"
      }}>

      {svc.highlight &&
        <div style={{
          position: "absolute", top: 20, right: 20,
          background: tweaks.accentColor || T.teal,
          color: "#fff", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.05em", textTransform: "uppercase",
          padding: "3px 10px", borderRadius: 20
        }}>{svc.highlight}</div>
      }
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: hov ? "oklch(0.52 0.13 192 / 0.25)" : T.tealLight,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20, transition: "background 0.3s",
        transform: hov ? "translateZ(45px)" : "translateZ(0)"
      }}>
        <Icon name={svc.icon} size={22} color={hov ? T.tealMid : tweaks.accentColor || T.teal} />
      </div>
      <h3 style={{
        fontFamily: "'Playfair Display',serif", fontSize: 20,
        color: hov ? "#fff" : T.slate, marginBottom: 10,
        transition: "color 0.3s",
        transform: hov ? "translateZ(30px)" : "translateZ(0)"
      }}>{svc.title}</h3>
      <p style={{
        fontSize: 14, lineHeight: 1.7,
        color: hov ? "oklch(0.75 0.02 220)" : T.slateMid,
        transition: "color 0.3s"
      }}>{svc.desc}</p>
      <a href="#contact" style={{
        marginTop: 20, display: "flex", alignItems: "center", gap: 6,
        color: hov ? T.tealMid : (tweaks.accentColor || T.teal), fontSize: 13, fontWeight: 600,
        opacity: hov ? 1 : 0.7, transition: "opacity 0.3s",
        textDecoration: "none"
      }}>
        Book a Consultation <Icon name="arrow" size={13} color={hov ? T.tealMid : (tweaks.accentColor || T.teal)} />
      </a>
    </div>);
};

const Services = ({ tweaks }) =>
  <section id="services" style={{
    padding: "100px clamp(20px,6vw,100px)",
    background: T.offWhite
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: tweaks.accentColor || T.teal, fontSize: 12, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14
        }}>
          <Icon name="tooth" size={14} color={tweaks.accentColor || T.teal} />
          San Jose Dental Services
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, color: T.slate, lineHeight: 1.2 }}>
          What dental services are available in San Jose?
        </h2>
        <p style={{ fontSize: 17, color: T.slateMid, marginTop: 16, maxWidth: 560, margin: "16px auto 0" }}>
          Dr. Takeuchi's San Jose practice offers a full range of dental services — from routine cleanings and children's dentistry to dental implants, cosmetic smile makeovers, and emergency care.
        </p>
      </div>

      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24,
        perspective: 1200
      }}>
        {services_data.map((svc) =>
          <ServiceCard key={svc.title} svc={svc} tweaks={tweaks} />
        )}
      </div>
    </div>
  </section>;

const About = ({ tweaks }) =>
  <section id="about" style={{
    padding: "100px clamp(20px,6vw,100px)",
    background: "#fff"
  }}>
    <div style={{
      maxWidth: 1100, margin: "0 auto",
      display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center"
    }}>
      <div style={{ position: "relative" }}>
        <div style={{
          width: "100%", aspectRatio: "4/5",
          borderRadius: 24, overflow: "hidden"
        }}>
          <img src="/uploads/DTakeuchiHeadshot.jpeg" alt="Dr. Doug Takeuchi, DDS"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
        </div>
        <div style={{
          position: "absolute", top: 28, left: -24,
          background: T.slate, borderRadius: 14, padding: "12px 18px",
          boxShadow: "0 8px 28px oklch(0 0 0 / 0.22)"
        }}>
          <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
            {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={13} color={T.gold} />)}
          </div>
          <div style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>500+ Yelp Reviews</div>
        </div>
      </div>

      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: tweaks.accentColor || T.teal, fontSize: 12, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16
        }}>
          <Icon name="sparkle" size={13} color={tweaks.accentColor || T.teal} />
          Who is Dr. Doug Takeuchi, DDS?
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, color: T.slate, lineHeight: 1.2, marginBottom: 24 }}>
          Dr. Doug Takeuchi,&nbsp;DDS
        </h2>
        <p style={{ fontSize: 16, color: T.slateMid, lineHeight: 1.75, marginBottom: 20 }}>
          With over <strong>20 years of practice</strong> in San Jose, Dr. Takeuchi has built a reputation for combining clinical excellence with genuine warmth. He personally answers patient emails — because to him, every patient is a guest.
        </p>
        <p style={{ fontSize: 16, color: T.slateMid, lineHeight: 1.75, marginBottom: 36 }}>
          His office features high-tech diagnostic equipment, in-ceiling DirectTV, and multiple sedation options — because great dentistry shouldn't mean suffering through it.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
          {[
            "Oral & nitrous sedation for anxious patients",
            "High-tech imaging & same-day care",
            "Full cosmetic & restorative capabilities",
            "Flexible payment plans & CareCredit accepted"].
            map((item) =>
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                }}>
                  <Icon name="check" size={13} color={tweaks.accentColor || T.teal} />
                </div>
                <span style={{ fontSize: 15, color: T.slate }}>{item}</span>
              </div>
            )}
        </div>

        <div style={{ borderTop: `1px solid oklch(0.91 0.01 60)`, paddingTop: 24, marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.slateLight, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
            Education &amp; Credentials
          </div>
          {[
            "D.D.S., UCSF School of Dentistry — ranked #2 in the nation",
            "B.S. Biology, University of the Pacific",
            "Quintessence Award — Outstanding Achievement in Restorative Dentistry",
            "Honors, American College of Dentists"
          ].map((item) =>
            <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: tweaks.accentColor || T.teal, marginTop: 8, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: T.slateMid, lineHeight: 1.55 }}>{item}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>;

const reviews = [
  { name: "Tobi B.", text: "Dr. Takeuchi and his staff are tremendous. I had a semi-complicated procedure with multiple steps — he talked me through everything clearly and helped me make the best decision.", stars: 5 },
  { name: "Amanda T.", text: "I get terrible anxiety going to the dentist. I have never been able to find a dentist that put me at ease enough to get work done — until Dr. Takeuchi. Total game changer.", stars: 5 },
  { name: "Jeff T.", text: "Our family has been going to Dr. Takeuchi for years. Doug is a great dentist and always makes us feel comfortable. His staff is fantastic. The office is clean and modern.", stars: 5 },
  { name: "Quynh P.", text: "Been to many dentists, he's the best. Don't know how else to say it. Cool equipment. Explains everything in detail and shows you pictures while telling the story.", stars: 5 },
  { name: "Mike L.", text: "I can honestly say that thanks to Dr. Takeuchi and his staff, a dentist appointment is an activity I no longer dread. That says a lot.", stars: 5 },
  { name: "David M.", text: "One of the very few dentists I know that personally answers patient email inquiries, and responds very quickly. He clearly cares a great deal about his business and patients.", stars: 5 }
];

const ReviewCard = ({ review, tweaks }) => (
  <div style={{
    background: "#fff", borderRadius: 16, padding: "32px 28px",
    boxShadow: "0 4px 24px oklch(0 0 0 / 0.06)",
    display: "flex", flexDirection: "column", gap: 16, flex: 1
  }}>
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={14} color={T.gold} />)}
    </div>
    <p style={{ fontSize: 15, lineHeight: 1.75, color: T.slate, fontStyle: "italic", flex: 1 }}>
      "{review.text}"
    </p>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
      }}>
        <Icon name="users" size={16} color={tweaks.accentColor || T.teal} />
      </div>
      <div>
        <div style={{ fontWeight: 700, color: T.slate, fontSize: 14 }}>{review.name}</div>
        <div style={{ fontSize: 12, color: T.slateLight }}>Verified Yelp Review</div>
      </div>
    </div>
  </div>
);

const Reviews = ({ tweaks }) => {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(reviews.length / perPage);
  const visible = reviews.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="reviews" style={{
      padding: "100px clamp(20px,6vw,100px)",
      background: T.offWhite
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: tweaks.accentColor || T.teal, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14
          }}>
            <Icon name="star" size={13} color={tweaks.accentColor || T.teal} />
            Patient Reviews
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, color: T.slate, marginBottom: 16 }}>
            What San Jose Patients Say
          </h2>
          <div style={{ display: "flex", justifyContent: "center", gap: 3, marginBottom: 8 }}>
            {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={20} color={T.gold} />)}
          </div>
          <p style={{ color: T.slateLight, fontSize: 14 }}>
            5.0 average · <a href="https://www.yelp.com/biz/doug-takeuchi-dds-san-jose" target="_blank" rel="noopener noreferrer" style={{ color: T.teal, textDecoration: "none", fontWeight: 600 }}>500+ reviews on Yelp ↗</a>
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 40 }}>
          {visible.map((r) => <ReviewCard key={r.name} review={r} tweaks={tweaks} />)}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {Array.from({ length: pages }).map((_, i) =>
            <button key={i} onClick={() => setPage(i)} style={{
              width: i === page ? 28 : 10, height: 10, borderRadius: 5, border: "none", cursor: "pointer",
              background: i === page ? tweaks.accentColor || T.teal : "oklch(0.85 0.02 200)",
              transition: "all 0.3s ease"
            }} />
          )}
        </div>
      </div>
    </section>);
};

const Gallery = ({ tweaks }) =>
  <section style={{ padding: "100px clamp(20px,6vw,100px)", background: T.slate }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: T.tealMid, fontSize: 12, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14
        }}>
          <Icon name="sparkle" size={13} color={T.tealMid} />
          Our Patients
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, color: "#fff", lineHeight: 1.2 }}>
          Healthy Smiles, Happy Patients
        </h2>
        <p style={{ fontSize: 17, color: "oklch(0.62 0.03 220)", marginTop: 16, maxWidth: 480, margin: "16px auto 0" }}>
          A glimpse into the care and results Dr. Takeuchi delivers every day.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 80px oklch(0 0 0 / 0.4)" }}>
          <img
            src="/uploads/BeforeAfter-Whitening.jpeg"
            alt="Teeth whitening before and after results"
            style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
          />
        </div>
        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 80px oklch(0 0 0 / 0.4)" }}>
          <img
            src="/uploads/DrWPatient2.jpeg"
            alt="Patient admiring her new smile after treatment with Dr. Takeuchi"
            style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
          />
        </div>
        <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 80px oklch(0 0 0 / 0.4)" }}>
          <img
            src="/uploads/DrWPatient.jpeg"
            alt="Dr. Takeuchi with a happy patient"
            style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
          />
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <a href="#contact" style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          background: tweaks.accentColor || T.teal, color: "#fff",
          padding: "14px 32px", borderRadius: 50, textDecoration: "none",
          fontWeight: 600, fontSize: 15, transition: "opacity 0.2s, transform 0.15s"
        }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}>
          Get Your Smile Transformation
          <Icon name="arrow" size={15} color="#fff" />
        </a>
      </div>
    </div>
  </section>;

const LocalSEO = ({ tweaks }) =>
  <section style={{ padding: "80px clamp(20px,6vw,100px)", background: "#fff" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
      <div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: tweaks.accentColor || T.teal, fontSize: 12, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16
        }}>
          <Icon name="map" size={13} color={tweaks.accentColor || T.teal} />
          Where is the office located?
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 34, color: T.slate, lineHeight: 1.25, marginBottom: 20 }}>
          San Jose Dental Care Near Bascom Avenue
        </h2>
        <p style={{ fontSize: 16, color: T.slateMid, lineHeight: 1.8, marginBottom: 16 }}>
          Our dental office is conveniently located at <strong>189 North Bascom Avenue, Suite 110, San Jose, CA 95128</strong> — just minutes from Rose Garden, Willow Glen, Campbell, West San Jose, Burbank, and downtown San Jose.
        </p>
        <p style={{ fontSize: 16, color: T.slateMid, lineHeight: 1.8, marginBottom: 28 }}>
          Whether you're searching for a dentist near Bascom Avenue or a trusted dental office serving the greater San Jose area, Dr. Takeuchi's practice is welcoming new patients and families.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
          {["Rose Garden", "Willow Glen", "Campbell", "West San Jose", "Burbank", "Downtown San Jose"].map((n) =>
            <span key={n} style={{
              background: T.tealLight, color: tweaks.accentColor || T.teal,
              borderRadius: 20, padding: "5px 14px", fontSize: 13, fontWeight: 600
            }}>{n}</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <a href="#contact" style={{
            background: tweaks.accentColor || T.teal, color: "#fff",
            padding: "12px 26px", borderRadius: 50, textDecoration: "none",
            fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8
          }}>
            <Icon name="calendar" size={14} color="#fff" />
            Request an Appointment
          </a>
          <a href="tel:4082955651" style={{
            border: `2px solid ${tweaks.accentColor || T.teal}`, color: tweaks.accentColor || T.teal,
            padding: "12px 26px", borderRadius: 50, textDecoration: "none",
            fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8
          }}>
            <Icon name="phone" size={14} color={tweaks.accentColor || T.teal} />
            Call 408-295-5651
          </a>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          { icon: "map", label: "Address", value: "189 North Bascom Ave, Suite 110", sub: "San Jose, CA 95128", href: "https://maps.google.com/?q=189+N+Bascom+Ave+San+Jose+CA+95128" },
          { icon: "phone", label: "Phone", value: "408-295-5651", sub: "Mon–Fri 8am–5pm", href: "tel:4082955651" },
          { icon: "calendar", label: "New Patients", value: "Always Welcome", sub: "Same-day emergency slots available", href: "#contact" }
        ].map((item) =>
          <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
            style={{
              display: "flex", gap: 16, padding: "20px 24px", background: T.offWhite, borderRadius: 14, textDecoration: "none",
              border: `1.5px solid oklch(0.91 0.01 60)`, transition: "border-color 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = tweaks.accentColor || T.teal}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "oklch(0.91 0.01 60)"}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name={item.icon} size={18} color={tweaks.accentColor || T.teal} />
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.slateLight, textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.label}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.slate, marginTop: 2 }}>{item.value}</div>
              <div style={{ fontSize: 13, color: T.slateMid }}>{item.sub}</div>
            </div>
          </a>
        )}
      </div>
    </div>
  </section>;

const OfficePhotos = ({ tweaks }) =>
  <section style={{ padding: "80px clamp(20px,6vw,100px)", background: T.offWhite }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: tweaks.accentColor || T.teal, fontSize: 12, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14
        }}>
          <Icon name="users" size={13} color={tweaks.accentColor || T.teal} />
          Our Practice
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 36, color: T.slate, lineHeight: 1.2 }}>
          A Welcoming Home for Your Smile
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
        {[
          { src: "/uploads/TakeuchiTeamShot.jpeg", alt: "Dr. Takeuchi and the dental team", caption: "Our Team" },
          { src: "/uploads/TakeuchiOfficeExterior.jpeg", alt: "Doug Takeuchi DDS office at 189 N Bascom Ave, San Jose", caption: "Our Office" },
          { src: "/uploads/Parentchild-Waitingroom.jpeg", alt: "Family reading together in the waiting room", caption: "Family Friendly" }
        ].map(({ src, alt, caption }) =>
          <div key={src} style={{ borderRadius: 20, overflow: "hidden", position: "relative", boxShadow: "0 8px 32px oklch(0 0 0 / 0.10)" }}>
            <img src={src} alt={alt} style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, oklch(0.12 0.02 240 / 0.74) 0%, transparent 100%)",
              padding: "32px 20px 16px",
              fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: "0.02em"
            }}>{caption}</div>
          </div>
        )}
      </div>
    </div>
  </section>;

const FAQ = ({ tweaks }) => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "Who is a good dentist in San Jose for anxious patients?", a: "Dr. Doug Takeuchi, DDS is widely recommended for anxious patients. His practice offers oral sedation and nitrous oxide (laughing gas). His gentle, unhurried approach has earned hundreds of five-star Yelp reviews from patients who previously avoided the dentist." },
    { q: "Does Dr. Takeuchi offer cosmetic dentistry?", a: "Yes. Dr. Takeuchi provides porcelain veneers, professional teeth whitening, dental bonding, and complete smile makeovers at his San Jose office at 189 North Bascom Avenue, Suite 110." },
    { q: "Does this office treat children and families?", a: "Yes. Dr. Takeuchi's practice welcomes patients of all ages — from children's first dental visits to full-arch restorations for seniors. New family patients are always welcome." },
    { q: "What tooth replacement options are available?", a: "Dr. Takeuchi offers dental implants, fixed bridges, and dentures. Dental implants are the gold standard — they look, feel, and function like natural teeth and are designed to last a lifetime." },
    { q: "Where is Dr. Takeuchi's dental office located?", a: "189 North Bascom Avenue, Suite 110, San Jose, CA 95128. The office is convenient to Rose Garden, Willow Glen, Campbell, West San Jose, Burbank, and downtown San Jose." },
    { q: "What number should I call to request an appointment?", a: "Call 408-295-5651, Monday through Friday, 8am–5pm. You can also request an appointment online using the form on this page." },
    { q: "Does Dr. Takeuchi help with root canals?", a: "Yes. Dr. Takeuchi performs modern, comfortable root canal treatments to save infected or damaged teeth. Most root canals are completed in a single visit with minimal discomfort." },
    { q: "Does the office help with dental insurance and financing?", a: "Yes. The office accepts most major dental insurance plans and offers CareCredit for flexible payment financing. Patients without insurance are also welcome — call 408-295-5651 to discuss your options." }
  ];
  return (
    <section id="faq" style={{ padding: "100px clamp(20px,6vw,100px)", background: T.offWhite }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: tweaks.accentColor || T.teal, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14
          }}>
            <Icon name="sparkle" size={13} color={tweaks.accentColor || T.teal} />
            Patient Questions
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, color: T.slate, lineHeight: 1.2 }}>
            Frequently Asked Questions
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) =>
            <div key={i} style={{
              background: "#fff", borderRadius: 14,
              border: `1.5px solid ${open === i ? (tweaks.accentColor || T.teal) : "oklch(0.91 0.01 60)"}`,
              overflow: "hidden", transition: "border-color 0.2s"
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", padding: "20px 24px", background: "none", border: "none",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer", gap: 16, textAlign: "left"
              }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: T.slate, lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{
                  flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                  background: open === i ? (tweaks.accentColor || T.teal) : T.tealLight,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s"
                }}>
                  <Icon name="chevron" size={14} color={open === i ? "#fff" : (tweaks.accentColor || T.teal)} />
                </span>
              </button>
              {open === i &&
                <div style={{ padding: "0 24px 20px", fontSize: 15, color: T.slateMid, lineHeight: 1.75 }}>
                  {faq.a}
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Contact = ({ tweaks }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "", submitted: false });
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(FORMSPREE, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ form: "Contact", name: form.name, email: form.email, phone: form.phone, message: form.message })
    }).finally(() => setForm((s) => ({ ...s, submitted: true })));
  };

  return (
    <section id="contact" style={{
      padding: "100px clamp(20px,6vw,100px)",
      background: `linear-gradient(135deg, oklch(0.10 0.025 240 / 0.50) 0%, oklch(0.18 0.05 210 / 0.46) 100%), url('/uploads/TakeuchiOfficeExterior.jpeg') center/cover no-repeat`
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start"
      }}>
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: T.tealMid, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16
          }}>
            <Icon name="calendar" size={13} color={T.tealMid} />
            Get in Touch
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 42, color: "#fff", lineHeight: 1.2, marginBottom: 24 }}>
            How do I request an appointment?
          </h2>
          <p style={{ fontSize: 17, color: "oklch(0.72 0.03 220)", lineHeight: 1.7, marginBottom: 40 }}>
            New patients are always welcome. Call us at 408-295-5651, send a message below, or visit us at 189 North Bascom Avenue, Suite 110, San Jose, CA 95128.
          </p>

          {[
            { icon: "phone", label: "Phone", value: "408-295-5651", sub: "Mon–Fri 8am–5pm", href: "tel:4082955651" },
            { icon: "map", label: "Location", value: "189 North Bascom Ave, Suite 110", sub: "San Jose, CA 95128", href: "https://maps.google.com/?q=189+N+Bascom+Ave+San+Jose+CA+95128" },
            { icon: "calendar", label: "Appointments", value: "Same-day available", sub: "For dental emergencies", href: "#contact" }].
            map((item) =>
              <div key={item.label} style={{ display: "flex", gap: 16, marginBottom: 28 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  background: "oklch(0.52 0.13 192 / 0.18)",
                  border: "1px solid oklch(0.52 0.13 192 / 0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Icon name={item.icon} size={18} color={T.tealMid} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "oklch(0.60 0.03 220)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
                    style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginTop: 2, display: "block", textDecoration: "none" }}>
                    {item.value}
                  </a>
                  <div style={{ fontSize: 13, color: "oklch(0.62 0.04 200)" }}>{item.sub}</div>
                </div>
              </div>
            )}
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "40px 36px" }}>
          {form.submitted ?
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: T.tealLight, display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 20px"
              }}>
                <Icon name="check" size={28} color={T.teal} />
              </div>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, marginBottom: 10, color: T.slate }}>Message Sent!</h3>
              <p style={{ color: T.slateMid, fontSize: 15 }}>We'll be in touch within one business hour.</p>
            </div> :

            <>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: T.slate, marginBottom: 6 }}>Send Us a Message</h3>
              <p style={{ fontSize: 14, color: T.slateMid, marginBottom: 22 }}>We'll respond within one business hour.</p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Full Name</label>
                  <input
                    type="text" name="name" required placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid oklch(0.88 0.01 60)`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "'DM Sans',sans-serif",
                      background: T.offWhite, color: T.slate, transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.teal}
                    onBlur={(e) => e.target.style.borderColor = "oklch(0.88 0.01 60)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Email</label>
                  <input
                    type="email" name="email" required placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid oklch(0.88 0.01 60)`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "'DM Sans',sans-serif",
                      background: T.offWhite, color: T.slate, transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.teal}
                    onBlur={(e) => e.target.style.borderColor = "oklch(0.88 0.01 60)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Phone (optional)</label>
                  <input
                    type="tel" name="phone" placeholder="(408) 555-0000"
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid oklch(0.88 0.01 60)`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "'DM Sans',sans-serif",
                      background: T.offWhite, color: T.slate, transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.teal}
                    onBlur={(e) => e.target.style.borderColor = "oklch(0.88 0.01 60)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }}>Message</label>
                  <textarea
                    name="message" required placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    rows={4}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid oklch(0.88 0.01 60)`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "'DM Sans',sans-serif",
                      background: T.offWhite, color: T.slate, transition: "border-color 0.2s",
                      resize: "vertical"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.teal}
                    onBlur={(e) => e.target.style.borderColor = "oklch(0.88 0.01 60)"} />
                </div>
                <button type="submit" style={{
                  background: T.teal, color: "#fff", border: "none", borderRadius: 50,
                  padding: "15px", fontSize: 16, fontWeight: 600, cursor: "pointer",
                  fontFamily: "'DM Sans',sans-serif", transition: "opacity 0.2s, transform 0.15s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "" }}>
                  <Icon name="arrow" size={17} color="#fff" />
                  Send Message
                </button>
              </form>
            </>
          }
        </div>
      </div>
    </section>);
};

const Footer = ({ tweaks }) =>
  <footer style={{
    background: T.slate, padding: "48px clamp(20px,6vw,100px) 32px",
    borderTop: `1px solid oklch(0.28 0.02 240)`
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div style={{
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 40
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <img src="/uploads/Doug Takeuchi Logo web.png" alt="Doug Takeuchi, DDS"
              style={{ height: 44, width: "auto", display: "block", objectFit: "contain" }} />
          </div>
          <p style={{ fontSize: 14, color: "oklch(0.62 0.03 220)", lineHeight: 1.7, maxWidth: 300 }}>
            Providing comfortable, anxiety-free dental care to San Jose families for over 20 years.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "oklch(0.55 0.03 220)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Services</div>
          {["Cosmetic Dentistry", "Dental Implants", "Sedation", "Family Care", "Periodontics"].map((s) =>
            <a key={s} href="#services" style={{ fontSize: 14, color: "oklch(0.70 0.02 220)", marginBottom: 9, display: "block", textDecoration: "none", cursor: "pointer" }}>{s}</a>
          )}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "oklch(0.55 0.03 220)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Contact</div>
          <a href="tel:4082955651" style={{ fontSize: 14, color: "oklch(0.70 0.02 220)", marginBottom: 9, display: "block", textDecoration: "none" }}>408-295-5651</a>
          <a href="https://maps.google.com/?q=189+N+Bascom+Ave+San+Jose+CA+95128" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "oklch(0.70 0.02 220)", marginBottom: 9, display: "block", textDecoration: "none" }}>189 North Bascom Ave, Suite 110, San Jose, CA 95128</a>
          <div style={{ fontSize: 14, color: "oklch(0.70 0.02 220)", marginBottom: 9 }}>Mon–Fri: 8am – 5pm</div>
          <a href="#contact" style={{
            marginTop: 12, display: "inline-flex", alignItems: "center", gap: 7,
            background: tweaks.accentColor || T.teal, color: "#fff",
            padding: "10px 20px", borderRadius: 30, textDecoration: "none",
            fontSize: 13, fontWeight: 600, transition: "opacity 0.2s"
          }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
            <Icon name="calendar" size={13} color="#fff" />
            Book Appointment
          </a>
        </div>
      </div>
      <div style={{
        borderTop: `1px solid oklch(0.28 0.02 240)`, paddingTop: 24,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12
      }}>
        <div style={{ fontSize: 13, color: "oklch(0.48 0.02 220)" }}>
          © 2026 Doug Takeuchi, DDS · All rights reserved
        </div>
        <div style={{ fontSize: 13, color: "oklch(0.48 0.02 220)", display: "flex", gap: 20, alignItems: "center" }}>
          <a href="https://www.yelp.com/biz/doug-takeuchi-dds-san-jose" target="_blank" rel="noopener noreferrer"
            style={{ color: "oklch(0.60 0.04 200)", textDecoration: "none", fontWeight: 600 }}>
            ★ Read Our Yelp Reviews
          </a>
        </div>
      </div>
    </div>
  </footer>;

const FloatingCTA = ({ tweaks }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 200,
      display: "flex", flexDirection: "column", gap: 10,
      transform: visible ? "translateY(0)" : "translateY(140px)",
      opacity: visible ? 1 : 0,
      transition: "transform 0.4s cubic-bezier(.34,1.56,.64,1), opacity 0.3s"
    }}>
      <a href="#contact" style={{
        background: tweaks.accentColor || T.teal, color: "#fff", borderRadius: 50,
        padding: "12px 20px", display: "flex", alignItems: "center", gap: 8,
        textDecoration: "none", fontWeight: 700, fontSize: 14,
        boxShadow: `0 6px 24px ${tweaks.accentColor || T.teal}66`
      }}>
        <Icon name="calendar" size={15} color="#fff" />
        Request Appointment
      </a>
      <a href="tel:4082955651" style={{
        background: "#fff", color: tweaks.accentColor || T.teal, borderRadius: 50,
        padding: "12px 20px", display: "flex", alignItems: "center", gap: 8,
        textDecoration: "none", fontWeight: 700, fontSize: 14,
        boxShadow: "0 6px 24px oklch(0 0 0 / 0.12)",
        border: `2px solid ${tweaks.accentColor || T.teal}`
      }}>
        <div style={{ position: "relative", width: 15, height: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", width: 20, height: 20, borderRadius: "50%", background: `${tweaks.accentColor || T.teal}33`, animation: "pulse-ring 1.6s ease-out infinite" }} />
          <Icon name="phone" size={15} color={tweaks.accentColor || T.teal} />
        </div>
        Call Now
      </a>
    </div>);
};

const App = () => {
  const tweaks = TWEAK_DEFAULTS;
  return (
    <>
      <Banner tweaks={tweaks} />
      <Nav tweaks={tweaks} />
      <Hero tweaks={tweaks} />
      <TrustBar />
      <AEOBlock tweaks={tweaks} />
      <Services tweaks={tweaks} />
      <VirtualSmilePreview tweaks={tweaks} />
      <About tweaks={tweaks} />
      <Gallery tweaks={tweaks} />
      <Reviews tweaks={tweaks} />
      <LocalSEO tweaks={tweaks} />
      <OfficePhotos tweaks={tweaks} />
      <FAQ tweaks={tweaks} />
      <TreatmentFinder tweaks={tweaks} />
      <Contact tweaks={tweaks} />
      <Footer tweaks={tweaks} />
      <FloatingCTA tweaks={tweaks} />
    </>);
};

export default App;
