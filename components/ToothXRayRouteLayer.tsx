"use client";

import Link from "next/link";
import { events } from "@/lib/analytics";

const routes = [
  ["Sensitivity", "/restorative-dentistry-san-jose", "Explore common restorative and preventive next steps."],
  ["Persistent pain", "/emergency-dentist-san-jose", "See the urgent-care pathway for pain, swelling and deeper concerns."],
  ["Something broke", "/restorative-dentistry-san-jose", "Broken teeth, crowns and fillings often need a repair-focused evaluation."],
  ["Missing tooth", "/dental-implants-san-jose", "Compare implant, bridge and removable replacement options."],
  ["Nothing hurts", "/new-patients", "Start with preventive care, an exam and a clear baseline."],
];

export default function ToothXRayRouteLayer() {
  return (
    <section className="toothRouteSection" aria-labelledby="tooth-route-title">
      <div className="launchShell">
        <div className="toothRouteHead">
          <span className="launchEyebrow">The Tooth X-Ray</span>
          <h2 id="tooth-route-title">What are you experiencing?</h2>
          <p>Choose what’s closest to what you’re feeling to find the right next step.</p>
        </div>
        <div className="toothRouteGrid">
          {routes.map(([label, href, body]) => (
            <Link href={href} className="toothRouteCard" key={label} onClick={() => events.symptom(label)}>
              <strong>{label}</strong>
              <p>{body}</p>
              <span>Find your next step →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
