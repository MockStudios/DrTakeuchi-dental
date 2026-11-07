"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Blocks that fade up as they scroll in, on any page. Homepage sections built with
// inline styles opt in through a data-reveal attribute instead of a class.
const REVEAL = [
  "[data-reveal]",
  ".launchSectionHead",
  ".toothRouteHead",
  ".toothRouteCard",
  ".authorityFigure",
  ".authorityCopy",
  ".anxietyTabs",
  ".anxietyPanel",
  ".proofCard",
  ".proofMediaCard",
  ".newPatientsCopy",
  ".newPatientsSection .appointmentForm",
  ".financeCard",
  ".patientInfoCard",
  ".locationCopy",
  ".locationMap",
  ".contentGrid > *",
  ".concernGrid > *",
  ".photoGrid > figure",
  ".reviewGrid > *",
  ".letterGrid > *",
  ".videoGrid > *",
  ".comparisonTable",
  ".featureImage",
].join(",");

const SPOTLIGHT = ".toothRouteCard, .patientInfoCard";
const STAGGER_MS = 70;
const MAX_STAGGERED = 5;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Adds no markup. It only sets attributes and custom properties that site-effects.css reads,
// so with JavaScript off or reduced motion on, every page simply renders as normal.
export default function SiteEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Only blocks still below the fold, so nothing on screen ever blinks out. A block
    // nested inside another reveal target moves with its parent.
    const blocks = Array.from(document.querySelectorAll<HTMLElement>(REVEAL)).filter(
      (el) =>
        !el.dataset.revealState &&
        !el.parentElement?.closest(REVEAL) &&
        el.getBoundingClientRect().top > window.innerHeight
    );

    const observer = new IntersectionObserver(
      (entries) => {
        // Blocks that arrive together, like a row of cards, stagger left to right.
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          el.style.setProperty("--reveal-delay", `${Math.min(order++, MAX_STAGGERED) * STAGGER_MS}ms`);
          el.dataset.revealState = "in";
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );

    for (const el of blocks) {
      el.dataset.revealState = "pending";
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      // Never leave anything hidden once nothing is watching it.
      for (const el of blocks) {
        if (el.dataset.revealState === "pending") delete el.dataset.revealState;
      }
    };
  }, [pathname]);

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onPointerMove = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;

      const card = event.target.closest<HTMLElement>(SPOTLIGHT);
      if (card) {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${event.clientX - box.left}px`);
        card.style.setProperty("--spot-y", `${event.clientY - box.top}px`);
      }

      // The film is several screens tall, so the drift is measured against the viewport.
      const hero = event.target.closest<HTMLElement>(".dentalHero");
      if (hero) {
        hero.style.setProperty("--hero-x", (event.clientX / window.innerWidth - 0.5).toFixed(3));
        hero.style.setProperty("--hero-y", (event.clientY / window.innerHeight - 0.5).toFixed(3));
      }
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  return null;
}
