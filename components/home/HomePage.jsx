"use client";

import { useState, useRef } from "react";
import DentalHero from "@/components/DentalHero";
import ToothXRayRouteLayer from "@/components/ToothXRayRouteLayer";
import LaunchTierAdditions from "@/components/LaunchTierAdditions";
import { T, Icon } from "@/components/brand";
import { faqs, services } from "@/lib/content";
import { site } from "@/lib/site";

const FORMSPREE = site.formEndpoint;
const encode = (data) => Object.keys(data).map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k])).join("&");

const TWEAK_DEFAULTS = {
  accentColor: "#3054B8",
  showBanner: true
};

const TrustBar = () =>
  <section style={{
    background: T.navy, padding: "24px clamp(20px,6vw,100px)"
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
            <Icon name={icon} size={18} color={T.sky} />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#D3DCEB", letterSpacing: "0.02em" }}>{label}</span>
          </div>
        )}
    </div>
  </section>;

const ServiceCard = ({ svc, tweaks }) => {
  const [hov, setHov] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const ref = useRef(null);
  const accent = tweaks.accentColor || T.blue;

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
      data-reveal=""
      onMouseEnter={() => setHov(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        background: hov
          ? `radial-gradient(circle at ${glow.x}% ${glow.y}%, #233A9C 0%, ${T.navy} 60%)`
          : "#fff",
        borderRadius: 16, padding: "32px 28px",
        border: `1.5px solid ${hov ? "rgb(48 84 184 / 0.5)" : "#E1E5EC"}`,
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
          background: tweaks.accentColor || T.blue,
          color: "#fff", fontSize: 11, fontWeight: 700,
          letterSpacing: "0.05em", textTransform: "uppercase",
          padding: "3px 10px", borderRadius: 20
        }}>{svc.highlight}</div>
      }
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: hov ? "rgb(48 84 184 / 0.25)" : T.tint,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 20, transition: "background 0.3s",
        transform: hov ? "translateZ(45px)" : "translateZ(0)"
      }}>
        <Icon name={svc.icon} size={22} color={hov ? T.sky : tweaks.accentColor || T.blue} />
      </div>
      <h3 style={{
        fontFamily: "var(--font-heading), sans-serif", fontSize: 20,
        color: hov ? "#fff" : T.navy, marginBottom: 10,
        transition: "color 0.3s",
        transform: hov ? "translateZ(30px)" : "translateZ(0)"
      }}>{svc.title}</h3>
      <p style={{
        fontSize: 14, lineHeight: 1.7,
        color: hov ? "#C9D3E6" : T.slateMid,
        transition: "color 0.3s"
      }}>{svc.desc}</p>
      <a href={svc.href} style={{
        marginTop: 20, display: "flex", alignItems: "center", gap: 6,
        color: hov ? T.sky : (tweaks.accentColor || T.blue), fontSize: 13, fontWeight: 600,
        textDecoration: "none"
      }}>
        Learn More <Icon name="arrow" size={13} color={hov ? T.sky : (tweaks.accentColor || T.blue)} />
      </a>
    </div>);
};

const Services = ({ tweaks }) =>
  <section id="services" style={{
    padding: "100px clamp(20px,6vw,100px)",
    background: T.offWhite
  }}>
    <div style={{ maxWidth: 1100, margin: "0 auto" }}>
      <div data-reveal="" style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          color: tweaks.accentColor || T.blue, fontSize: 12, fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14
        }}>
          <Icon name="tooth" size={14} color={tweaks.accentColor || T.blue} />
          San Jose Dental Services
        </div>
        <h2 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: 40, color: T.navy, lineHeight: 1.2 }}>
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
        {services.map((svc) =>
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
        <div data-reveal="" style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: tweaks.accentColor || T.blue, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14
          }}>
            <Icon name="sparkle" size={13} color={tweaks.accentColor || T.blue} />
            Patient Questions
          </div>
          <h2 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: 40, color: T.navy, lineHeight: 1.2 }}>
            Frequently Asked Questions
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) =>
            <div key={i} data-reveal="" style={{
              background: "#fff", borderRadius: 14,
              border: `1.5px solid ${open === i ? (tweaks.accentColor || T.blue) : "#E1E5EC"}`,
              overflow: "hidden", transition: "border-color 0.2s"
            }}>
              <button type="button" className="faqQuestion" onClick={() => setOpen(open === i ? null : i)}
                id={`faq-question-${i}`} aria-expanded={open === i} aria-controls={`faq-answer-${i}`} style={{
                width: "100%", padding: "20px 24px", border: "none", fontFamily: "inherit",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer", gap: 16, textAlign: "left"
              }}>
                <span style={{ fontSize: 16, fontWeight: 600, color: T.navy, lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{
                  flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
                  background: open === i ? (tweaks.accentColor || T.blue) : T.tint,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transform: open === i ? "rotate(180deg)" : "none",
                  transition: "all 0.2s"
                }}>
                  <Icon name="chevron" size={14} color={open === i ? "#fff" : (tweaks.accentColor || T.blue)} />
                </span>
              </button>
              {open === i &&
                <div id={`faq-answer-${i}`} className="faqAnswer" role="region" aria-labelledby={`faq-question-${i}`}
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
      background: `linear-gradient(135deg, rgb(11 22 64 / 0.50) 0%, rgb(22 43 122 / 0.46) 100%), url('/uploads/TakeuchiExterior.webp') center/cover no-repeat`
    }}>
      <div className="stackOnMobile" style={{
        maxWidth: 1100, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start"
      }}>
        <div data-reveal="">
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: T.sky, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16
          }}>
            <Icon name="calendar" size={13} color={T.sky} />
            Get in Touch
          </div>
          <h2 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: 42, color: "#fff", lineHeight: 1.2, marginBottom: 24 }}>
            How do I request an appointment?
          </h2>
          <p style={{ fontSize: 17, color: "#C2CEE4", lineHeight: 1.7, marginBottom: 40 }}>
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
                  background: "rgb(48 84 184 / 0.18)",
                  border: "1px solid rgb(48 84 184 / 0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <Icon name={item.icon} size={18} color={T.sky} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#A3B3D3", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</div>
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer"
                    style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginTop: 2, display: "block", textDecoration: "none" }}>
                    {item.value}
                  </a>
                  <div style={{ fontSize: 13, color: "#A7CBE3" }}>{item.sub}</div>
                </div>
              </div>
            )}
        </div>

        <div data-reveal="" style={{ background: "#fff", borderRadius: 20, padding: "40px 36px" }}>
          {status === "sent" ?
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: T.tint, display: "flex", alignItems: "center",
                justifyContent: "center", margin: "0 auto 20px"
              }}>
                <Icon name="check" size={28} color={T.blue} />
              </div>
              <h3 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: 22, marginBottom: 10, color: T.navy }}>Message Sent!</h3>
              <p style={{ color: T.slateMid, fontSize: 15 }}>We'll be in touch within one business hour.</p>
            </div> :

            <>
              <h3 style={{ fontFamily: "var(--font-heading), sans-serif", fontSize: 22, color: T.navy, marginBottom: 6 }}>Send Us a Message</h3>
              <p style={{ fontSize: 14, color: T.slateMid, marginBottom: 22 }}>We'll respond within one business hour.</p>
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }} htmlFor="contact-name">Full Name</label>
                  <input
                    id="contact-name" autoComplete="name" type="text" name="name" required placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid #D2D7E0`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      background: T.offWhite, color: T.navy, transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.blue}
                    onBlur={(e) => e.target.style.borderColor = "#D2D7E0"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }} htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email" autoComplete="email" type="email" name="email" required placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid #D2D7E0`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      background: T.offWhite, color: T.navy, transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.blue}
                    onBlur={(e) => e.target.style.borderColor = "#D2D7E0"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }} htmlFor="contact-phone">Phone (optional)</label>
                  <input
                    id="contact-phone" autoComplete="tel" type="tel" name="phone" placeholder="(408) 555-0000"
                    value={form.phone}
                    onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid #D2D7E0`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      background: T.offWhite, color: T.navy, transition: "border-color 0.2s"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.blue}
                    onBlur={(e) => e.target.style.borderColor = "#D2D7E0"} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.slateMid, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" }} htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message" name="message" required placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                    rows={4}
                    style={{
                      width: "100%", padding: "12px 14px", border: `1.5px solid #D2D7E0`,
                      borderRadius: 10, fontSize: 15, outline: "none",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      background: T.offWhite, color: T.navy, transition: "border-color 0.2s",
                      resize: "vertical"
                    }}
                    onFocus={(e) => e.target.style.borderColor = T.blue}
                    onBlur={(e) => e.target.style.borderColor = "#D2D7E0"} />
                </div>
                {status === "error" &&
                  <p role="alert" style={{ fontSize: 14, fontWeight: 600, color: "#B8322A", lineHeight: 1.5 }}>
                    Sorry, your message didn’t go through. Please try again or call{" "}
                    <a href={site.phoneHref} style={{ color: "inherit" }}>{site.phoneDisplay}</a>.
                  </p>
                }
                <button type="submit" disabled={status === "sending"} style={{
                  background: T.blue, color: "#fff", border: "none", borderRadius: 50,
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
      <DentalHero />
      <TrustBar />
      <ToothXRayRouteLayer />
      <Services tweaks={tweaks} />
      <LaunchTierAdditions />
      <FAQ tweaks={tweaks} />
      <Contact tweaks={tweaks} />
    </main>);
};

export default HomePage;
