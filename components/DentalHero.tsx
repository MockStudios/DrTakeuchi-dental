"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  LazyMotion,
  domAnimation,
  easeOut,
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import { T, Icon } from "@/components/brand";
import { services } from "@/lib/content";
import { site } from "@/lib/site";
import { events } from "@/lib/analytics";

// The film is Dental Hero2.mp4 as a silent image sequence: scrubbing a <video> by scroll is
// unreliable on iOS Safari, while drawing frames to a canvas behaves the same everywhere.
// To regenerate: ffmpeg -i "Dental Hero2.mp4" -an -vf "scale=1600:-2" frame-%03d.png,
// then convert each frame to WebP at quality 74 in public/images/dental-hero/.
const FRAME_COUNT = 98;
const frameUrl = (index: number) =>
  `/images/dental-hero/frame-${String(index + 1).padStart(3, "0")}.webp`;

// On load the film plays its first moments once and settles on this frame, a clean front-on
// tooth, which is where the opening screen rests until the visitor scrolls.
const REST_FRAME = 22;
const LAST_FRAME = FRAME_COUNT - 1;
// The opening plays every other frame, so it downloads less before anything has moved.
const INTRO_STRIDE = 2;
const INTRO_MS_PER_STEP = 110;
const INTRO_WAIT_MS = 2500;
const AT_TOP_PX = 8;

// Each step's services suit its shot: the range of frames the film holds while that step's cards
// are on screen. The frames between shots play while no cards are showing, so if the film is ever
// re-cut, re-check these ranges against the new frames.
type Step = {
  title: string;
  services: string[];
  shot: [number, number];
};

const steps: Step[] = [
  {
    // The tooth as a glowing wireframe in front of an X-ray on the monitor: finding out what's going on.
    title: "A closer look.",
    services: ["Family Dentistry", "Children's Dentistry", "Emergency Dentistry"],
    shot: [48, 58],
  },
  {
    // A scan line sweeping the wireframe tooth, closer in on the monitor: planning the repair.
    title: "Every tooth needs its own plan.",
    services: ["Restorative Dentistry", "Root Canals", "Tooth Replacement"],
    shot: [62, 71],
  },
  {
    // The tooth restored, clean and pearly in soft light, once the healing swirl has played.
    title: "Then, make it shine.",
    services: ["Cosmetic Dentistry", "Teeth Whitening", "Veneers"],
    shot: [88, 94],
  },
];

// The opening screen holds the rest frame, each step holds its own shot, and the closing
// screen holds the film's last frame.
const shots: [number, number][] = [
  [REST_FRAME, REST_FRAME],
  ...steps.map((step) => step.shot),
  [LAST_FRAME, LAST_FRAME],
];

// How far either side of a beat's center (in steps) the film stays on that beat's shot.
const SHOT_HOLD = 0.4;
const lastBeat = shots.length - 1;
const scrollStops = shots.flatMap((_, i) => [Math.max(0, i - SHOT_HOLD), Math.min(lastBeat, i + SHOT_HOLD)]);
const frameStops = shots.flat();
// With reduced motion each beat shows one still instead of playing the film.
const stills = shots.map(([start, end]) => Math.round((start + end) / 2));
// After the last card has gone, the film slides off to the right, then the original hero slides in.
const FILM_OUT_START = lastBeat - 0.58;
const FILM_OUT_END = lastBeat - 0.36;
const HERO_IN_END = lastBeat - 0.12;

// Every 16th frame first, then filling in, so scrubbing works before the whole set has arrived.
function loadOrder() {
  const order: number[] = [];
  const queued = new Set<number>();
  for (const stride of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += stride) {
      if (!queued.has(i)) {
        queued.add(i);
        order.push(i);
      }
    }
  }
  return order;
}

function nearestLoaded(frames: (HTMLImageElement | undefined)[], target: number) {
  for (let distance = 0; distance < FRAME_COUNT; distance++) {
    if (frames[target - distance]) return target - distance;
    if (frames[target + distance]) return target + distance;
  }
  return -1;
}

// Matches the stacked layout in the stylesheet, with the film above the copy.
const STACKED_LAYOUT = "(max-width: 760px), (max-aspect-ratio: 1/1)";
const NAV_HEIGHT = 68;

// Fits the frame to the area below the frosted nav, so the nav doesn't cut off the top of a shot,
// at the smallest size that still leaves no gaps. .dentalHeroPoster in the stylesheet mirrors
// this, so the handover from image to canvas is seamless.
function drawFrame(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const context = canvas.getContext("2d");
  if (!context) return;
  const { width, height } = canvas;
  const { naturalWidth: frameWidth, naturalHeight: frameHeight } = image;
  const navHeight = NAV_HEIGHT * (height / canvas.clientHeight);
  const areaHeight = height - navHeight;
  const scale = Math.max(width / frameWidth, areaHeight / frameHeight);
  const drawWidth = frameWidth * scale;
  const drawHeight = frameHeight * scale;
  // Beside the copy, any crop comes off the right, keeping the tooth as far from the copy as it can be.
  const x = window.matchMedia(STACKED_LAYOUT).matches ? (width - drawWidth) / 2 : 0;
  const y = navHeight + (areaHeight - drawHeight) / 2;
  // Behind the frosted glass, the frame's top row stretched upward reads as more of the same background.
  if (y > 0) context.drawImage(image, 0, 0, frameWidth, 1, x, 0, drawWidth, y + 1);
  context.drawImage(image, x, y, drawWidth, drawHeight);
}

function Film({ stepPos, active }: { stepPos: MotionValue<number>; active: number }) {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<(HTMLImageElement | undefined)[]>([]);
  const wanted = useRef(REST_FRAME);
  const shown = useRef(-1);
  // While the opening frames arrive out of order, the poster stays up instead of the canvas flickering.
  const introPending = useRef(false);

  const show = (target: number) => {
    wanted.current = target;
    const canvas = canvasRef.current;
    const index = nearestLoaded(frames.current, target);
    const image = frames.current[index];
    if (!canvas || !image || index === shown.current) return;
    drawFrame(canvas, image);
    shown.current = index;
  };

  // The spring takes the notches out of a mouse wheel.
  const film = useTransform(stepPos, scrollStops, frameStops);
  const smoothFilm = useSpring(film, { stiffness: 140, damping: 30, mass: 0.5 });
  useMotionValueEvent(smoothFilm, "change", (frame) => {
    if (!reduce) show(Math.round(frame));
  });

  useEffect(() => {
    if (reduce) show(stills[active]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, active]);

  // Setting a canvas's size clears it, so repaint after every resize.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * pixelRatio);
      canvas.height = Math.round(canvas.clientHeight * pixelRatio);
      shown.current = -1;
      if (!introPending.current) show(wanted.current);
    });
    observer.observe(canvas);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A visitor who never scrolls only downloads the opening frames. The rest wait for a scroll.
  useEffect(() => {
    let cancelled = false;
    let animationFrame = 0;

    const load = async (index: number) => {
      if (frames.current[index]) return;
      const image = new Image();
      image.src = frameUrl(index);
      try {
        await image.decode();
      } catch {
        return; // A missing frame just falls back to its nearest neighbour.
      }
      if (cancelled) return;
      frames.current[index] = image;
      if (!introPending.current) show(wanted.current);
    };

    const loadAll = async (queue: number[]) => {
      const worker = async () => {
        for (let index = queue.shift(); index !== undefined && !cancelled; index = queue.shift()) {
          await load(index);
        }
      };
      await Promise.all(Array.from({ length: 6 }, worker));
    };

    const loadRest = () => void loadAll(loadOrder());

    if (reduce) {
      void loadAll([...stills]);
      return () => {
        cancelled = true;
      };
    }

    if (window.scrollY > AT_TOP_PX) {
      loadRest();
      return () => {
        cancelled = true;
      };
    }

    const playIntro = () => {
      const start = performance.now();
      const tick = (now: number) => {
        if (cancelled) return;
        if (window.scrollY > AT_TOP_PX) {
          show(Math.round(smoothFilm.get()));
          return;
        }
        const frame = Math.min(REST_FRAME, Math.floor((now - start) / INTRO_MS_PER_STEP) * INTRO_STRIDE);
        show(frame);
        if (frame < REST_FRAME) animationFrame = requestAnimationFrame(tick);
      };
      animationFrame = requestAnimationFrame(tick);
    };

    introPending.current = true;
    const openingFrames = Array.from({ length: REST_FRAME / INTRO_STRIDE + 1 }, (_, i) => i * INTRO_STRIDE);
    const ready = loadAll(openingFrames).then(() => true);
    const tooSlow = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), INTRO_WAIT_MS));
    void Promise.race([ready, tooSlow]).then((inTime) => {
      if (cancelled) return;
      introPending.current = false;
      // On a slow connection, or once the visitor has moved on, skip straight to the right frame.
      if (inTime && window.scrollY <= AT_TOP_PX) playIntro();
      else show(wanted.current);
    });

    window.addEventListener("scroll", loadRest, { once: true, passive: true });
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", loadRest);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  // Beside the opening copy the film sits further right, so the tooth is clear of the copy. It
  // glides to center as that copy leaves.
  const filmShift = useTransform(stepPos, [0, 0.04, 0.22, lastBeat], ["10vw", "10vw", "0vw", "0vw"]);
  const edgeVisibility = useTransform(stepPos, (s): string => (s < 0.22 ? "visible" : "hidden"));
  // After the last card, the whole film slides off to the right.
  const filmExit = useTransform(
    stepPos,
    [0, FILM_OUT_START, FILM_OUT_END, lastBeat],
    ["0vw", "0vw", "105vw", "105vw"]
  );

  return (
    <m.div className="dentalHeroFilmExit" style={{ x: filmExit }}>
      <m.div className="dentalHeroFilmLayer" style={{ x: filmShift }}>
        {/* The resting frame, flipped, fills the strip the opening slide leaves on the left,
            feathered into the film so there's no seam. */}
        <m.img
          className="dentalHeroFilmEdge"
          src={frameUrl(REST_FRAME)}
          alt=""
          style={{ visibility: edgeVisibility } as MotionStyle}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="dentalHeroPoster" src={frameUrl(0)} alt="" fetchPriority="high" />
        <canvas ref={canvasRef} className="dentalHeroFilm" />
      </m.div>
      <div className="dentalHeroShade" />
    </m.div>
  );
}

// The opening screen. Its fade runs from fully visible at the top of the page, so the headline
// paints straight from the server-rendered HTML and doesn't wait on JavaScript.
function Lead() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.36, 1], [1, 1, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.36, 1], [0, 0, -28, -28]);

  return (
    <div ref={ref} className="dentalHeroStep dentalHeroLead">
      <m.div className="dentalHeroLeadCopy" style={{ opacity, y }}>
        <p className="dentalHeroEyebrow fade-up">San Jose’s trusted dentist · 20+ years</p>
        <h1 id="dental-hero-title" className="fade-up delay-1">See what your teeth aren’t telling you.</h1>
        <p className="dentalHeroLede fade-up delay-2">
          Gentle, judgment-free dentistry in San Jose. Dr. Doug Takeuchi finds problems early and
          explains every option.
        </p>

        <div className="dentalHeroActions fade-up delay-3">
          <Link
            className="heroCta"
            href={site.appointmentHref}
            onClick={() => events.appointmentStart("hero")}
          >
            Book My Free Consultation <span aria-hidden="true">→</span>
          </Link>
          <a
            className="heroCall"
            href={site.phoneHref}
            aria-label={`Call ${site.phoneDisplay}`}
            onClick={() => events.phone("hero")}
          >
            <Icon name="phone" size={16} color="#fff" />
            <span className="heroCallNumber">{site.phoneDisplay}</span>
            <span className="heroCallShort">Call</span>
          </a>
        </div>

        <div className="dentalHeroProof fade-up delay-4">
          <div className="dentalHeroDoctor">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/uploads/DTakeuchiHeadshot.webp" alt="" width={48} height={48} />
            <div>
              <strong>Dr. Doug Takeuchi, DDS</strong>
              <span className="dentalHeroRating">
                <span className="dentalHeroStars" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={14} color={T.gold} />)}
                </span>
                4.6 · 31 Google reviews
              </span>
            </div>
          </div>
          <ul className="dentalHeroChips">
            {["Same-day emergencies", "New patients welcome", "Financing available"].map((label) => (
              <li key={label}>
                <Icon name="check" size={13} color={T.sky} /> {label}
              </li>
            ))}
          </ul>
        </div>
      </m.div>

      <m.figure className="dentalHeroReview fade-up delay-4" style={{ opacity }}>
        <span className="dentalHeroStars" role="img" aria-label="5 out of 5 stars">
          {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={13} color={T.gold} />)}
        </span>
        <blockquote>“He was able to get me in for an emergency visit and provided the best care.”</blockquote>
        <figcaption>Britten D. · Yelp review</figcaption>
      </m.figure>

      <m.div className="dentalHeroCue" style={{ opacity }} aria-hidden="true">
        Scroll to look closer
        <span />
      </m.div>
    </div>
  );
}

// A step's scroll progress runs 0 → 1 from its top entering the bottom of the viewport to its
// bottom leaving the top. 0.5 is the step centered on screen, and one step of scrolling is 0.5.
// So SHOT_HOLD maps to a window of progress, and copy is kept strictly inside it: a card arrives
// once its shot is on screen and has gone before the film moves on.
// Every scroll range here spells out 0 and 1. Left open, the browser-driven animation drifts
// back toward the element's resting style outside the range, and faded copy reappears.
const CARD_IN = 0.5 - SHOT_HOLD / 2;
const CARD_OUT = 0.5 + SHOT_HOLD / 2;
const CARD_FADE = 0.05;
const STAGGER = 0.01;
const RISE = 14;

function useLineStyle(progress: MotionValue<number>, index: number) {
  // Lines pull into focus one after another, then soften away together. The fades are
  // quick so the copy is sharp for most of the hold, wherever a visitor stops scrolling.
  const inStart = CARD_IN + 0.005 + index * STAGGER;
  const outStart = CARD_OUT - CARD_FADE - 0.01;
  const input = [0, inStart, inStart + 0.06, outStart, outStart + 0.05, 1];
  const range = <T,>(enter: T, rest: T, exit: T): T[] => [enter, enter, rest, rest, exit, exit];
  const options = { ease: easeOut };

  const y = useTransform(progress, input, range(RISE, 0, -RISE), options);
  const opacity = useTransform(progress, input, range(0, 1, 0), options);
  const filter = useTransform(progress, input, range("blur(10px)", "blur(0px)", "blur(8px)"), options);
  const scale = useTransform(progress, input, range(1.06, 1, 0.98), options);

  return { y, opacity, filter, scale, originX: 0 };
}

type LineProps = { progress: MotionValue<number>; index: number };

function TitleLine({ children, progress, index }: LineProps & { children: ReactNode }) {
  return <m.span style={useLineStyle(progress, index)}>{children}</m.span>;
}

function ServiceItem({
  service,
  progress,
  index,
}: LineProps & { service: (typeof services)[number] }) {
  return (
    <m.li style={useLineStyle(progress, index)}>
      <Link className="dentalHeroService" href={service.href}>
        <span className="dentalHeroServiceIcon" aria-hidden="true">
          <Icon name={service.icon} size={22} color={T.blue} />
        </span>
        <span className="dentalHeroServiceText">
          <strong>{service.title}</strong>
          {service.highlight && <em>{service.highlight}</em>}
          <span>{service.short}</span>
        </span>
        <span className="dentalHeroServiceArrow" aria-hidden="true">→</span>
      </Link>
    </m.li>
  );
}

function StepCard({ step }: { step: Step }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: progress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // The panel dissolves alongside its lines rather than lingering empty after them.
  const cardOpacity = useTransform(
    progress,
    [0, CARD_IN, CARD_IN + CARD_FADE, CARD_OUT - CARD_FADE, CARD_OUT, 1],
    [0, 0, 1, 1, 0, 0]
  );

  let order = 0;
  const line = () => ({ progress, index: order++ });

  return (
    <div ref={ref} className="dentalHeroStep">
      <m.div className="dentalHeroCard" style={{ opacity: cardOpacity }}>
        <h2><TitleLine {...line()}>{step.title}</TitleLine></h2>
        <ul className="dentalHeroServices">
          {services
            .filter((service) => step.services.includes(service.title))
            .map((service) => <ServiceItem key={service.title} service={service} {...line()} />)}
        </ul>
      </m.div>
    </div>
  );
}

// Once the film has slid away, the original hero slides in as a second lead screen. The track
// starts early and the screen inside it is sticky, so the hero is pinned in place and only moves
// sideways. It stays put as the section scrolls away, so its buttons are there on the way out.
function Closing({
  x,
  visible,
  pointerEvents,
  onFocus,
}: {
  x: MotionValue<string>;
  visible: MotionValue<number>;
  pointerEvents: MotionValue<string>;
  onFocus: () => void;
}) {
  return (
    <div className="dentalHeroClosingTrack">
      <div className="dentalHeroClosing">
        <m.div
          className="hero"
          style={{ x, pointerEvents, "--closing-visible": visible } as MotionStyle}
          onFocusCapture={onFocus}
        >
          <div className="heroPanel">
            <div className="heroCopy">
              <div className="heroBadge">
                <Icon name="shield" size={14} color={T.sky} />
                <span>20+ Years · San Jose’s Trusted Dentist</span>
              </div>
              <h2>Your best smile starts here.</h2>
              <p className="dentalHeroLede">
                Gentle family &amp; cosmetic dentistry in San Jose, CA — comfortable, judgment-free
                care for every smile, from routine checkups to complete makeovers with Dr. Doug
                Takeuchi, DDS.
              </p>
              <span className="dentalHeroRating">
                <span className="dentalHeroStars" aria-hidden="true">
                  {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={18} color={T.gold} />)}
                </span>
                <span><strong>4.6</strong> · 31 Google reviews</span>
              </span>
              <div className="dentalHeroActions">
                <Link
                  className="heroCta"
                  href={site.appointmentHref}
                  onClick={() => events.appointmentStart("hero_closing")}
                >
                  <Icon name="calendar" size={16} color={T.blue} />
                  Request an Appointment
                </Link>
                <a
                  className="heroCall"
                  href={site.phoneHref}
                  aria-label={`Call ${site.phoneDisplay}`}
                  onClick={() => events.phone("hero_closing")}
                >
                  <Icon name="phone" size={16} color="#fff" />
                  <span className="heroCallNumber">{site.phoneDisplay}</span>
                  <span className="heroCallShort">Call</span>
                </a>
              </div>
              <ul className="dentalHeroChips">
                {["Same-day emergencies", "New patients welcome", "Financing available"].map((label) => (
                  <li key={label}>
                    <Icon name="check" size={13} color={T.sky} /> {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="heroMedia">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="heroPhoto"
              src="/uploads/DrWPatient2.webp"
              alt="A happy patient admiring her brighter smile in a mirror with Dr. Takeuchi"
            />
            <figure className="heroReview">
              <div className="heroReviewFace" aria-hidden="true">😁</div>
              <div>
                <span className="dentalHeroStars" role="img" aria-label="5 out of 5 stars">
                  {[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" size={12} color={T.gold} />)}
                </span>
                <blockquote>“Our family has been going to Dr. Takeuchi for years. Doug is a great dentist and always makes us feel comfortable.”</blockquote>
                <figcaption>Jeff T. · Yelp review</figcaption>
              </div>
            </figure>
          </div>
        </m.div>
      </div>
    </div>
  );
}

export default function DentalHero() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // stepPos runs from 0 to lastBeat while the stage is pinned; whole numbers are beats centered on screen.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const stepPos = useTransform(scrollYProgress, [0, 1], [0, lastBeat]);
  useMotionValueEvent(stepPos, "change", (s) => {
    setActive(Math.min(lastBeat, Math.max(0, Math.round(s))));
  });
  // The navy wash clears before the film moves on, so the story plays on clean frames.
  const scrimOpacity = useTransform(stepPos, [0, 0.2, 0.4, lastBeat], [1, 1, 0, 0]);

  // The film slides away first, then the original hero slides in from the left.
  const heroX = useTransform(
    stepPos,
    [0, FILM_OUT_END, HERO_IN_END, lastBeat],
    ["-100vw", "-100vw", "0vw", "0vw"]
  );
  const heroVisible = useTransform(stepPos, [0, FILM_OUT_END, HERO_IN_END, lastBeat], [0, 0, 1, 1]);
  const heroPointer = useTransform(stepPos, (s): string => (s >= FILM_OUT_END ? "auto" : "none"));

  // Someone tabbing in lands on the finished screen, not on buttons that haven't slid in yet.
  const showClosing = () => {
    const section = sectionRef.current;
    if (!section || stepPos.get() >= HERO_IN_END) return;
    const top = section.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
    window.scrollTo({ top, behavior: "instant" });
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <section ref={sectionRef} id="home" className="dentalHero" aria-labelledby="dental-hero-title">
        <p className="srOnly">
          An animated film follows one tooth from healthy, through a diagnostic scan, alongside
          possible treatment pathways including repair, root canal treatment, or tooth
          replacement, and ends with the tooth restored. The
          section closes with a prompt to schedule an exam and discuss the right next step.
        </p>

        <div className="dentalHeroStage" aria-hidden="true">
          <Film stepPos={stepPos} active={active} />
          <m.div className="dentalHeroScrim" style={{ opacity: scrimOpacity }} />
          <ol className="dentalHeroProgress">
            {shots.map((_, i) => (
              <li key={i} className={i === active ? "isActive" : undefined} />
            ))}
          </ol>
        </div>

        <div className="dentalHeroSteps">
          <Lead />
          {steps.map((step) => <StepCard key={step.title} step={step} />)}
          <Closing x={heroX} visible={heroVisible} pointerEvents={heroPointer} onFocus={showClosing} />
        </div>
      </section>
    </LazyMotion>
  );
}
