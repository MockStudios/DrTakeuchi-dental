"use client";

import { useState, useEffect, useRef } from "react";
import ToothXRay from "@/components/ToothXRay";
import ToothXRayRouteLayer from "@/components/ToothXRayRouteLayer";
import LaunchTierAdditions from "@/components/LaunchTierAdditions";
import { T, Icon } from "@/components/brand";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

const FORMSPREE = site.formEndpoint;
const encode = (data) => Object.keys(data).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])).join("&");

const TWEAK_DEFAULTS = {
  accentColor: "#0f766e",
  heroHeadline: "Your best smile starts here.",
  showBanner: true,
  ctaLabel: "Request an Appointment"
};

const Hero = ({ tweaks }) => {
  const accent = tweaks.accentColor || T.teal;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onResize();
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
            fontFamily: "var(--font-playfair), serif",
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
              <strong style={{ color: "#fff" }}>4.6</strong> · 31 Google reviews
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
          src="/uploads/DrWPatient2.webp"
          alt="A happy patient admiring her brighter smile in a mirror with Dr. Takeuchi"
          fetchPriority="high"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "58% center" }}
        />
        {!isMobile &&
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, oklch(0.27 0.08 202 / 0.55) 0%, transparent 20%)", pointerEvents: "none" }} />
        }
        <div style={{
          position: "absolute", bottom: "clamp(18px,3vw,32px)", left: "clamp(18px,3vw,32px)",
          background: "oklch(1 0 0 / 0.92)", backdropFilter: "blur(6px)",
          borderRadius: 16, padding: "14px 18px", maxWidth: 300,
          boxShadow: "0 16px 40px oklch(0 0 0 / 0.25)",
          display: "flex", alignItems: "center", gap: 12
        }}>
          <div style={{ fontSize: 26 }}>😁</div>
          <div>
            <div style={{ display: "flex", gap: 1, marginBottom: 3 }}>
              {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={12} color={T.gold} />)}
            </div>
            <div style={{ fontSize: 13, color: T.slate, fontWeight: 600, lineHeight: 1.3 }}>
              “He was able to get me in for an emergency visit and provided the best care.”
            </div>
            <div style={{ fontSize: 11, color: T.slateMid, marginTop: 3 }}>Britten D. · Yelp review</div>
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
      <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 32, color: T.slate, lineHeight: 1.3, marginBottom: 20 }}>
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
  { icon: "users", title: "Family Dentistry", href: "/family-dentist-san-jose", highlight: null, desc: "Comprehensive preventive and restorative care for every member of your family — from children's first visits to senior smile maintenance." },
  { icon: "sparkle", title: "Cosmetic Dentistry", href: "/cosmetic-dentist-san-jose", highlight: "Most Popular", desc: "Veneers, bonding, whitening, and smile makeovers designed to give you a radiant, confidence-boosting smile." },
  { icon: "tooth", title: "Restorative Dentistry", href: "/restorative-dentistry-san-jose", highlight: null, desc: "Crowns, bridges, and fillings that repair damaged teeth, restore full function, and blend naturally with your smile." },
  { icon: "implant", title: "Tooth Replacement", href: "/dental-implants-san-jose", highlight: null, desc: "Dental implants, bridges, and dentures — permanent and removable solutions for one or more missing teeth." },
  { icon: "sedation", title: "Sedation Dentistry", href: "/sedation-dentistry-san-jose", highlight: "Anxiety-Free", desc: "Oral and nitrous oxide sedation so even the most anxious patients can relax and get the care they need comfortably." },
  { icon: "phone", title: "Emergency Dentistry", href: "/emergency-dentist-san-jose", highlight: "Same Day", desc: "Same-day appointments for tooth pain, broken teeth, lost fillings, and dental trauma. Call 408-295-5651." },
  { icon: "smile", title: "Children's Dentistry", href: "/family-dentist-san-jose", highlight: null, desc: "Gentle, kid-friendly care that builds healthy habits and creates positive dental experiences from the very first visit." },
  { icon: "tooth", title: "Root Canals", href: "/restorative-dentistry-san-jose", highlight: null, desc: "Modern, comfortable root canal treatment to save infected teeth and relieve pain — often completed in a single visit." },
  { icon: "shield", title: "Dental Crowns", href: "/restorative-dentistry-san-jose", highlight: null, desc: "Natural-looking porcelain crowns that protect damaged teeth and blend seamlessly with your surrounding smile." },
  { icon: "sparkle", title: "Teeth Whitening", href: "/cosmetic-dentist-san-jose", highlight: null, desc: "Professional whitening treatments that deliver dramatically brighter results safely, quickly, and effectively." },
  { icon: "smile", title: "Veneers", href: "/cosmetic-dentist-san-jose", highlight: null, desc: "Ultra-thin porcelain shells that correct chips, gaps, stains, and shape — transforming your smile in just two visits." },
  { icon: "tooth", title: "Tooth-Colored Fillings", href: "/restorative-dentistry-san-jose", highlight: null, desc: "Composite resin fillings that match your natural tooth color, leaving no visible trace of the repair." }
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
        fontFamily: "var(--font-playfair), serif", fontSize: 20,
        color: hov ? "#fff" : T.slate, marginBottom: 10,
        transition: "color 0.3s",
        transform: hov ? "translateZ(30px)" : "translateZ(0)"
      }}>{svc.title}</h3>
      <p style={{
        fontSize: 14, lineHeight: 1.7,
        color: hov ? "oklch(0.75 0.02 220)" : T.slateMid,
        transition: "color 0.3s"
      }}>{svc.desc}</p>
      <a href={svc.href} style={{
        marginTop: 20, display: "flex", alignItems: "center", gap: 6,
        color: hov ? T.tealMid : (tweaks.accentColor || T.teal), fontSize: 13, fontWeight: 600,
        textDecoration: "none"
      }}>
        Learn More <Icon name="arrow" size={13} color={hov ? T.tealMid : (tweaks.accentColor || T.teal)} />
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
        <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 40, color: T.slate, lineHeight: 1.2 }}>
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

const FAQ = ({ tweaks }) => {
  const [open, setOpen] = useState(null);
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
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 40, color: T.slate, lineHeight: 1.2 }}>
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
              <button type="button" onClick={() => setOpen(open === i ? null : i)}
                id={`faq-question-${i}`} aria-expanded={open === i} aria-controls={`faq-answer-${i}`} style={{
                width: "100%", padding: "20px 24px", background: "none", border: "none", fontFamily: "inherit",
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
                <div id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`}
                  style={{ padding: "0 24px 20px", fontSize: 15, color: T.slateMid, lineHeight: 1.75 }}>
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ form: "Contact", name: form.name, email: form.email, phone: form.phone, message: form.message })
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" style={{
      padding: "100px clamp(20px,6vw,100px)",
      background: `linear-gradient(135deg, oklch(0.10 0.025 240 / 0.50) 0%, oklch(0.18 0.05 210 / 0.46) 100%), url('/uploads/TakeuchiExterior.webp') center/cover no-repeat`
    }}>
      <div className="stackOnMobile" style={{
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
          <h2 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 42, color: "#fff", lineHeight: 1.2, marginBottom: 24 }}>
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
          {status === "sent" ?
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: T.tealLight, display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 20px"
              }}>
                <Icon name="check" size={28} color={T.teal} />
              </div>
              <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 22, marginBottom: 10, color: T.slate }}>Message Sent!</h3>
              <p style={{ color: T.slateMid, fontSize: 15 }}>We'll be in touch within one business hour.</p>
            </div> :

            <>
              <h3 style={{ fontFamily: "var(--font-playfair), serif", fontSize: 22, color: T.slate, marginBottom: 6 }}>Send Us a Message</h3>
              <p style={{ fontSize: 14, color: T.slateMid, marginBottom: 22 }}>We'll respond within one business hour.</p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }} htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name" autoComplete="name" type="text" name="name" required placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid oklch(0.88 0.01 60)`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      background: T.offWhite, color: T.slate, transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.teal}
                    onBlur={(e) => e.target.style.borderColor = "oklch(0.88 0.01 60)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email" autoComplete="email" type="email" name="email" required placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid oklch(0.88 0.01 60)`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      background: T.offWhite, color: T.slate, transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.teal}
                    onBlur={(e) => e.target.style.borderColor = "oklch(0.88 0.01 60)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }} htmlFor="contact-phone">Phone (optional)</label>
                  <input
                    id="contact-phone" autoComplete="tel" type="tel" name="phone" placeholder="(408) 555-0000"
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid oklch(0.88 0.01 60)`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      background: T.offWhite, color: T.slate, transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.teal}
                    onBlur={(e) => e.target.style.borderColor = "oklch(0.88 0.01 60)"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }} htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message" name="message" required placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    rows={4}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid oklch(0.88 0.01 60)`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      background: T.offWhite, color: T.slate, transition: "border-color 0.2s",
                      resize: "vertical"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.teal}
                    onBlur={(e) => e.target.style.borderColor = "oklch(0.88 0.01 60)"} />
                </div>
                {status === "error" &&
                  <p role="alert" style={{ fontSize: 14, fontWeight: 600, color: "oklch(0.45 0.17 25)", lineHeight: 1.5 }}>
                    Sorry, your message didn’t go through. Please try again or call{" "}
                    <a href={site.phoneHref} style={{ color: "inherit" }}>{site.phoneDisplay}</a>.
                  </p>
                }
                <button type="submit" disabled={status === "sending"} style={{
                  background: T.teal, color: "#fff", border: "none", borderRadius: 50,
                  padding: "15px", fontSize: 16, fontWeight: 600, cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif", transition: "opacity 0.2s, transform 0.15s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "" }}>
                  <Icon name="arrow" size={17} color="#fff" />
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
              </form>
            </>
          }
        </div>
      </div>
    </section>);
};

const HomePage = () => {
  const tweaks = TWEAK_DEFAULTS;
  return (
    <main>
      <Hero tweaks={tweaks} />
      <TrustBar />
      <AEOBlock tweaks={tweaks} />
      <Services tweaks={tweaks} />
      <ToothXRay />
      <ToothXRayRouteLayer />
      <LaunchTierAdditions />
      <FAQ tweaks={tweaks} />
      <Contact tweaks={tweaks} />
    </main>);
};

export default HomePage;
