"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LazyMotion,
  domAnimation,
  easeOut,
  m,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
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

// A step's scroll progress runs 0 → 1 from its top entering the bottom of the
// viewport to its bottom leaving the top; 0.5 is the step centered on screen.
// Lines pull into focus one after another before center, then soften away in the same order.
const STAGGER = 0.04;
const RISE = 14;

function useLineStyle(progress: MotionValue<number>, index: number, hold: boolean) {
  const reduce = useReducedMotion();
  const inStart = 0.1 + index * STAGGER;
  const outStart = 0.58 + index * STAGGER;
  const input = hold
    ? [inStart, inStart + 0.2]
    : [inStart, inStart + 0.2, outStart, outStart + 0.16];
  const range = <T,>(enter: T, rest: T, exit: T): T[] => (hold ? [enter, rest] : [enter, rest, rest, exit]);
  const options = { ease: easeOut };

  const y = useTransform(progress, input, range(RISE, 0, -RISE), options);
  const opacity = useTransform(progress, input, range(0, 1, 0), options);
  const filter = useTransform(progress, input, range("blur(10px)", "blur(0px)", "blur(8px)"), options);
  const scale = useTransform(progress, input, range(1.06, 1, 0.98), options);

  return reduce ? undefined : { y, opacity, filter, scale, originX: 0 };
}

type LineProps = { progress: MotionValue<number>; index: number; hold: boolean };

function Line({ children, progress, index, hold }: LineProps & { children: ReactNode }) {
  return <m.div style={useLineStyle(progress, index, hold)}>{children}</m.div>;
}

function TitleLine({ children, progress, index, hold }: LineProps & { children: ReactNode }) {
  return <m.span style={useLineStyle(progress, index, hold)}>{children}</m.span>;
}

function PathwayItem({
  pathway,
  progress,
  index,
  hold,
}: LineProps & { pathway: NonNullable<Step["pathways"]>[number] }) {
  return (
    <m.li style={useLineStyle(progress, index, hold)}>
      <Link href={pathway.href}>
        <span className="xrayOrb" style={{ background: pathway.color }} aria-hidden="true" />
        <strong>{pathway.name}</strong>
        <span>{pathway.detail}</span>
      </Link>
    </m.li>
  );
}

function XRayStep({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const reduce = useReducedMotion();

  // The last step stays put so its call to action is still there as the section scrolls away.
  // Otherwise the panel dissolves alongside its lines rather than lingering empty after them.
  const hold = index === steps.length - 1;
  const cardOpacity = useTransform(
    progress,
    hold ? [0.08, 0.2] : [0.08, 0.2, 0.66, 0.84],
    hold ? [0, 1] : [0, 1, 1, 0]
  );

  let order = 0;
  const line = () => ({ progress, index: order++, hold });
  const Heading = index === 0 ? "h2" : "h3";

  return (
    <div ref={ref} className="xrayStep">
      <m.div className="xrayCard" style={reduce ? undefined : { opacity: cardOpacity }}>
        {step.callout && (
          <Line {...line()}>
            <p className="xrayCallout"><span aria-hidden="true" />{step.callout}</p>
          </Line>
        )}
        <Heading id={index === 0 ? "xray-title" : undefined}>
          {step.title.map((text) => <TitleLine key={text} {...line()}>{text}</TitleLine>)}
        </Heading>
        {step.body.map((text) => (
          <Line key={text} {...line()}><p>{text}</p></Line>
        ))}

        {step.labels && (
          <Line {...line()}>
            <ul className="xrayLabels">
              {step.labels.map(([name, color]) => (
                <li key={name}><span style={{ background: color }} aria-hidden="true" />{name}</li>
              ))}
            </ul>
          </Line>
        )}

        {step.pathways && (
          <ul className="xrayPathways">
            {step.pathways.map((p) => <PathwayItem key={p.name} pathway={p} {...line()} />)}
          </ul>
        )}

        {step.cta && (
          <Line {...line()}>
            <Link
              className="primaryAction"
              href={site.appointmentHref}
              onClick={() => events.appointmentStart("tooth_xray")}
            >
              {step.cta} →
            </Link>
          </Line>
        )}
      </m.div>
    </div>
  );
}

// stepPos runs 0 → 5 while the stage is pinned; whole numbers are steps centered on screen.
// Frame k is scanned in over frame k - 1 between k - 0.75 and k - 0.25.
function Frame({ index, stepPos }: { index: number; stepPos: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const handoff = [index - 0.75, index - 0.25];
  const first = index === 0;

  const hidden = useTransform(stepPos, handoff, first ? [0, 0] : [100, 0]);
  const clipPath = useMotionTemplate`inset(0% 0% ${hidden}% 0%)`;
  // A slow camera push-in across the frame's time on screen.
  const scale = useTransform(stepPos, [index - 0.75, index + 0.75], [1, 1.1]);
  const opacity = useTransform(stepPos, handoff, first ? [1, 1] : [0, 1]);

  return (
    <m.div className="xrayFrame" style={reduce ? { opacity } : { clipPath, scale }}>
      <Image src={`/images/tooth-xray/frame-${index + 1}.webp`} alt="" fill sizes="100vw" />
    </m.div>
  );
}

// Where the beam is within the current handoff (0 top → 1 bottom), or null between handoffs.
function beamAt(s: number) {
  const k = Math.floor(s + 0.75);
  const f = (s + 0.75 - k) / 0.5;
  return k >= 1 && k < steps.length && f > 0 && f < 1 ? f : null;
}

function ScanBeam({ stepPos }: { stepPos: MotionValue<number> }) {
  const top = useTransform(stepPos, (s) => `${(beamAt(s) ?? 0) * 100}%`);
  // Fades in and out at the ends of each sweep.
  const opacity = useTransform(stepPos, (s) => {
    const f = beamAt(s);
    return f === null ? 0 : Math.sqrt(Math.sin(Math.PI * f));
  });
  return <m.div className="xrayBeam" style={{ top, opacity }} />;
}

export default function ToothXRay() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const stepPos = useTransform(scrollYProgress, [0, 1], [0, steps.length - 1]);
  useMotionValueEvent(stepPos, "change", (s) => {
    setActive(Math.min(steps.length - 1, Math.max(0, Math.round(s))));
  });

  return (
    <LazyMotion features={domAnimation} strict>
      <section ref={sectionRef} className="xray" aria-labelledby="xray-title">
        <p className="srOnly">
          The Tooth X-Ray: An educational visual showing how a tooth progresses from a
          healthy state to sensitivity and deeper pain, followed by possible treatment
          pathways including repair, root canal treatment, or tooth replacement. The
          experience ends with a prompt to schedule an exam and discuss the right next step.
        </p>

        <div className="xrayStage" aria-hidden="true">
          {steps.map((_, i) => <Frame key={i} index={i} stepPos={stepPos} />)}
          {!reduce && <ScanBeam stepPos={stepPos} />}
          <div className="xrayShade" />
          <div className="xrayLabel">The Tooth X-Ray</div>
          <ol className="xrayProgress">
            {steps.map((_, i) => (
              <li key={i} className={i === active ? "isActive" : undefined} />
            ))}
          </ol>
        </div>

        <div className="xraySteps">
          {steps.map((step, i) => <XRayStep key={i} step={step} index={i} />)}
        </div>
      </section>
    </LazyMotion>
  );
}
