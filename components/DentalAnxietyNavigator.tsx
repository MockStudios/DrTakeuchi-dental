"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

const states = [
  {
    id: "nervous",
    tab: "I’m a little nervous",
    eyebrow: "Mild dental anxiety",
    title: "You do not have to push through the visit silently.",
    body: "Clear explanations, a slower pace, advance notice before each step and extra time can make routine dental care feel much more manageable.",
  },
  {
    id: "bad",
    tab: "I’ve had a bad experience",
    eyebrow: "Past dental trauma",
    title: "What happened before can shape what you need now.",
    body: "Tell the team what made a previous dental visit difficult. Your comfort preferences can be discussed before treatment begins.",
  },
  {
    id: "years",
    tab: "I haven’t been in years",
    eyebrow: "Returning to dental care",
    title: "Start where you are. No lecture required.",
    body: "The first goal is to understand what is happening today, prioritize what matters most, and build a realistic plan from there.",
  },
  {
    id: "severe",
    tab: "I have severe anxiety",
    eyebrow: "Higher dental anxiety",
    title: "Comfort options can be part of the treatment conversation.",
    body: "For patients with stronger anxiety, the practice can discuss appropriate comfort and sedation options based on the visit and individual needs.",
  },
];

export default function DentalAnxietyNavigator() {
  const [active, setActive] = useState(states[0]);

  return (
    <section className="launchSection anxietySection" id="comfort">
      <div className="launchShell">
        <div className="launchSectionHead">
          <span className="launchEyebrow">Comfort-first dentistry</span>
          <h2>Haven’t loved going to the dentist?</h2>
          <p>Start with how you feel about dental care—not with a procedure name.</p>
        </div>
        <div className="anxietyExperience">
          <div className="anxietyTabs" role="tablist" aria-label="How you feel about dental visits">
            {states.map((s) => (
              <button
                key={s.id}
                id={`anxiety-tab-${s.id}`}
                type="button"
                role="tab"
                aria-selected={active.id === s.id}
                aria-controls="anxiety-panel"
                className={active.id === s.id ? "active" : ""}
                onClick={() => setActive(s)}
              >
                {s.tab}
              </button>
            ))}
          </div>
          <div className="anxietyPanel" id="anxiety-panel" role="tabpanel" aria-labelledby={`anxiety-tab-${active.id}`}>
            <span className="launchEyebrow">{active.eyebrow}</span>
            <h3>{active.title}</h3>
            <p>{active.body}</p>
            <div className="launchActions">
              <Link href="/sedation-dentistry-san-jose" className="launchButton launchButtonPrimary">See Your Comfort Options</Link>
              <Link href={site.appointmentHref} className="launchButton launchButtonGhost">Talk With the Team</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
