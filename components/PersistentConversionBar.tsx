"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { events } from "@/lib/analytics";

export default function PersistentConversionBar() {
  // The homepage hero already carries both CTAs, so the bar waits until it scrolls away.
  const isHome = usePathname() === "/";
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = isHome && !pastHero;

  return (
    <div
      className={`conversionBar${hidden ? " isHidden" : ""}`}
      aria-label="Quick contact"
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
    >
      <a href={site.phoneHref} onClick={() => events.phone("persistent_bar")}>
        Call {site.phoneDisplay}
      </a>
      <a
        href={site.appointmentHref}
        onClick={() => events.appointmentStart("persistent_bar")}
      >
        Request Appointment
      </a>
    </div>
  );
}
