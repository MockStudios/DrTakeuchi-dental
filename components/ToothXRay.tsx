"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { events } from "@/lib/analytics";

// Copy follows the-tooth-x-ray-copy.md; each step pairs with one frame.
type Step = {
  title: string[];
  body: string[];
  labels?: [string, string][];
  callout?: string;
  pathways?: { name: string; detail: string; color: string; href: string }[];
  cta?: string;
};

const steps: Step[] = [
  {
    title: ["What hurts?"],
    body: ["Your symptom is the first clue. We help you find the cause."],
  },
  {
    title: ["A closer look."],
    body: ["Beneath the surface, your tooth has layers."],
    labels: [
      ["Enamel", "oklch(0.96 0.01 80)"],
      ["Dentin", "oklch(0.80 0.08 70)"],
      ["Pulp", "oklch(0.60 0.19 35)"],
    ],
  },
  {
    title: ["Sensitivity."],
    body: ["Early signs can start below the surface."],
    callout: "Sensitivity",
  },
  {
    title: ["Persistent pain."],
    body: ["Sometimes the problem goes deeper."],
    callout: "Persistent pain",
  },
  {
    title: ["The cause isn’t always obvious."],
    body: ["Different issues may lead to different solutions."],
    pathways: [
      { name: "Repair", detail: "Fillings • Crowns • Bonding", color: "oklch(0.55 0.15 250)", href: "/restorative-dentistry-san-jose" },
      { name: "Root Canal", detail: "Save the tooth", color: "oklch(0.75 0.14 80)", href: "/restorative-dentistry-san-jose" },
      { name: "Replacement", detail: "Implants • Bridges • Dentures", color: "oklch(0.60 0.15 155)", href: "/dental-implants-san-jose" },
    ],
  },
  {
    title: ["Start with an exam.", "Leave with a plan."],
    body: [
      "The symptom may be simple. The cause isn’t always obvious.",
      "We help you find the right solution.",
    ],
    cta: "Tell us what’s bothering you",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function ToothXRay() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setReady(true);
    // A step becomes active when it crosses the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="xray" aria-labelledby="xray-title" data-ready={ready || undefined}>
      <p className="srOnly">
        The Tooth X-Ray: An educational visual showing how a tooth progresses from a
        healthy state to sensitivity and deeper pain, followed by possible treatment
        pathways including repair, root canal treatment, or tooth replacement. The
        experience ends with a prompt to schedule an exam and discuss the right next step.
      </p>

      <div className="xrayStage" aria-hidden="true">
        {steps.map((_, i) => (
          <div key={i} className={`xrayFrame${i === active ? " isActive" : ""}`}>
            <Image src={`/images/tooth-xray/frame-${i + 1}.webp`} alt="" fill sizes="100vw" />
          </div>
        ))}
        <div className="xrayShade" />
        <div className="xrayLabel">The Tooth X-Ray</div>
        <ol className="xrayProgress">
          {steps.map((_, i) => (
            <li key={i} className={i === active ? "isActive" : undefined} />
          ))}
        </ol>
      </div>

      <div className="xraySteps">
        {steps.map((step, i) => {
          const Heading = i === 0 ? "h2" : "h3";
          return (
            <div
              key={i}
              ref={(el) => { stepRefs.current[i] = el; }}
              data-step={i}
              className={`xrayStep${i === active ? " isActive" : ""}`}
            >
              <div className="xrayCard">
                <p className="xrayEyebrow">{pad(i + 1)} / {pad(steps.length)}</p>
                {step.callout && (
                  <p className="xrayCallout"><span aria-hidden="true" />{step.callout}</p>
                )}
                <Heading id={i === 0 ? "xray-title" : undefined}>
                  {step.title.map((line) => <span key={line}>{line}</span>)}
                </Heading>
                {step.body.map((line) => <p key={line}>{line}</p>)}

                {step.labels && (
                  <ul className="xrayLabels">
                    {step.labels.map(([name, color]) => (
                      <li key={name}><span style={{ background: color }} aria-hidden="true" />{name}</li>
                    ))}
                  </ul>
                )}

                {step.pathways && (
                  <ul className="xrayPathways">
                    {step.pathways.map((p) => (
                      <li key={p.name}>
                        <Link href={p.href}>
                          <span className="xrayOrb" style={{ background: p.color }} aria-hidden="true" />
                          <strong>{p.name}</strong>
                          <span>{p.detail}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {step.cta && (
                  <Link
                    className="primaryAction"
                    href={site.appointmentHref}
                    onClick={() => events.appointmentStart("tooth_xray")}
                  >
                    {step.cta} →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
