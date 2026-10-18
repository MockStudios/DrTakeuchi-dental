"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { T, Icon } from "@/components/brand";
import { site } from "@/lib/site";
import { events } from "@/lib/analytics";

// Matches the homepage accent (TWEAK_DEFAULTS.accentColor).
const ACCENT = "#2a9d8f";

const links = [
  ["Services", "/#services"],
  ["About", "/about"],
  ["New Patients", "/new-patients"],
  ["Reviews", "/reviews"],
  ["Contact", "/contact"],
];

const Banner = () => {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div style={{
      background: T.teal, color: "#fff", textAlign: "center",
      padding: "10px 44px", fontSize: 14, fontWeight: 500,
      display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
      position: "relative"
    }}>
      <span>✦ New patients welcome — book this month and receive a <strong>free consultation</strong> ✦</span>
      <button onClick={() => setShow(false)} aria-label="Dismiss announcement" style={{
        position: "absolute", right: 16, background: "none", border: "none",
        color: "#fff", cursor: "pointer", opacity: 0.8, lineHeight: 1
      }}>
        <Icon name="close" size={16} color="#fff" />
      </button>
    </div>);
};

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const solidBg = scrolled || menuOpen;

  return (
    <>
      <Banner />
      <header style={{ position: "sticky", top: 0, zIndex: 100 }}>
        <nav aria-label="Main" style={{
          background: solidBg ? "rgba(252,250,248,0.97)" : "transparent",
          backdropFilter: solidBg ? "blur(12px)" : "none",
          borderBottom: scrolled ? `1px solid oklch(0.90 0.01 60)` : "1px solid transparent",
          transition: "all 0.35s ease",
          padding: "0 clamp(20px, 5vw, 80px)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 68
        }}>
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <img src="/uploads/Doug Takeuchi Logo web.png" alt="Doug Takeuchi, DDS — home"
              style={{ height: 48, width: "auto", display: "block", objectFit: "contain" }} />
          </Link>

          <div className="navDesktop" style={{ gap: 28, alignItems: "center" }}>
            {links.map(([label, href]) =>
              <Link key={href} href={href} className="navLink"
                aria-current={pathname === href ? "page" : undefined}>
                {label}
              </Link>
            )}
            <a href={site.phoneHref} onClick={() => events.phone("header")} style={{
              background: ACCENT, color: "#fff",
              padding: "9px 22px", borderRadius: 30, fontSize: 14, fontWeight: 600,
              textDecoration: "none", display: "flex", alignItems: "center", gap: 7
            }}>
              <Icon name="phone" size={14} color="#fff" />
              {site.phoneDisplay}
            </a>
          </div>

          <button className="navToggle" onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu" aria-expanded={menuOpen} style={{
              background: "none", border: "none", cursor: "pointer", padding: 8,
              flexDirection: "column", justifyContent: "center", gap: 5
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
        </nav>

        {menuOpen && (
          <div className="navMobileMenu" style={{
            background: "rgba(252,250,248,0.97)", backdropFilter: "blur(12px)",
            borderBottom: `1px solid oklch(0.90 0.01 60)`,
            padding: "16px clamp(20px, 5vw, 80px) 28px",
            flexDirection: "column"
          }}>
            {links.map(([label, href]) =>
              <Link key={href} href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  textDecoration: "none", color: T.slate, fontSize: 18, fontWeight: 500,
                  padding: "14px 0", borderBottom: `1px solid oklch(0.92 0.01 60)`,
                  display: "block"
                }}>
                {label}
              </Link>
            )}
            <a href={site.phoneHref} onClick={() => events.phone("mobile_menu")} style={{
              marginTop: 20, background: ACCENT, color: "#fff",
              padding: "14px 22px", borderRadius: 50,
              textDecoration: "none", fontWeight: 600, fontSize: 15,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 9
            }}>
              <Icon name="phone" size={16} color="#fff" />
              Call {site.phoneDisplay}
            </a>
          </div>
        )}
      </header>
    </>);
}
