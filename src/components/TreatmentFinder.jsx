import React, { useState } from "react";

const T = {
  teal: "oklch(0.52 0.13 192)",
  tealLight: "oklch(0.94 0.04 192)",
  gold: "oklch(0.72 0.13 82)",
  slate: "oklch(0.18 0.02 240)",
  slateMid: "oklch(0.40 0.02 240)",
  offWhite: "oklch(0.97 0.01 60)"
};

const STEPS = [
  {
    q: "What brought you in today?",
    key: "goal",
    options: [
      { label: "Brighten & improve my smile", tag: "cosmetic", emoji: "✨" },
      { label: "Routine checkup & cleaning", tag: "family", emoji: "🪥" },
      { label: "Fix or replace a tooth", tag: "restore", emoji: "🦷" },
      { label: "I'm in pain / it's urgent", tag: "emergency", emoji: "🚨" }
    ]
  },
  {
    q: "How do you feel about dental visits?",
    key: "comfort",
    options: [
      { label: "Totally comfortable", tag: "calm", emoji: "😌" },
      { label: "A little nervous", tag: "calm", emoji: "🙂" },
      { label: "Very anxious", tag: "sedation", emoji: "😰" }
    ]
  },
  {
    q: "Who is this visit for?",
    key: "who",
    options: [
      { label: "Just me", tag: "adult", emoji: "🙋" },
      { label: "My child", tag: "kids", emoji: "🧒" },
      { label: "The whole family", tag: "family", emoji: "👨‍👩‍👧" }
    ]
  }
];

const RESULTS = {
  cosmetic: {
    title: "Cosmetic Dentistry & Whitening",
    blurb:
      "Based on your answers, a cosmetic consultation is your best first step — whitening, veneers, or a full smile makeover tailored to you.",
    cta: "Book My Cosmetic Consult"
  },
  family: {
    title: "Family Dentistry & Cleaning",
    blurb:
      "A comprehensive family checkup and cleaning is the right fit — gentle, preventive care for every age at one San Jose office.",
    cta: "Book Our Family Visit"
  },
  restore: {
    title: "Restorative Dentistry",
    blurb:
      "You'll want a restorative consultation — crowns, implants, or bridges to repair and replace teeth so they look and feel natural.",
    cta: "Book My Restorative Consult"
  },
  emergency: {
    title: "Same-Day Emergency Care",
    blurb:
      "This sounds urgent — Dr. Takeuchi offers same-day emergency appointments. Call 408-295-5651 now or request the next opening.",
    cta: "Get Seen Today"
  },
  sedation: {
    title: "Sedation Dentistry",
    blurb:
      "Because comfort matters most to you, sedation dentistry lets you relax completely while you get the care you need — anxiety-free.",
    cta: "Book a Relaxed Visit"
  },
  kids: {
    title: "Children's Dentistry",
    blurb:
      "Kid-friendly, gentle care that builds healthy habits and happy first visits — perfect for your little one.",
    cta: "Book My Child's Visit"
  }
};

const scoreResult = (answers) => {
  // Priority: emergency > sedation > kids > goal-based
  if (answers.goal === "emergency") return "emergency";
  if (answers.comfort === "sedation") return "sedation";
  if (answers.who === "kids") return "kids";
  return RESULTS[answers.goal] ? answers.goal : "family";
};

const TreatmentFinder = ({ tweaks = {} }) => {
  const accent = tweaks.accentColor || T.teal;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  const pick = (key, tag) => {
    const next = { ...answers, [key]: tag };
    setAnswers(next);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  const progress = done ? 100 : (step / STEPS.length) * 100;
  const result = done ? RESULTS[scoreResult(answers)] : null;

  return (
    <section
      id="treatment-finder"
      style={{
        padding: "100px clamp(20px,6vw,100px)",
        background: `linear-gradient(135deg, ${T.slate} 0%, oklch(0.24 0.05 210) 100%)`
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: T.gold,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 14
          }}
        >
          ✦ 30-Second Treatment Finder
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: 38,
            color: "#fff",
            lineHeight: 1.2,
            marginBottom: 36
          }}
        >
          Which treatment is right for you?
        </h2>

        <div
          style={{
            background: "oklch(1 0 0 / 0.06)",
            border: "1px solid oklch(1 0 0 / 0.12)",
            borderRadius: 24,
            padding: "clamp(28px,5vw,48px)",
            backdropFilter: "blur(6px)"
          }}
        >
          {/* Progress bar */}
          <div
            style={{
              height: 6,
              borderRadius: 6,
              background: "oklch(1 0 0 / 0.12)",
              overflow: "hidden",
              marginBottom: 32
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: accent,
                borderRadius: 6,
                transition: "width 0.4s ease"
              }}
            />
          </div>

          {!done ? (
            <div key={step} className="quiz-fade">
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 24,
                  color: "#fff",
                  marginBottom: 28
                }}
              >
                {STEPS[step].q}
              </h3>
              <div style={{ display: "grid", gap: 14 }}>
                {STEPS[step].options.map((o) => (
                  <button
                    key={o.label}
                    onClick={() => pick(STEPS[step].key, o.tag)}
                    style={optBtn}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "oklch(1 0 0 / 0.14)";
                      e.currentTarget.style.borderColor = accent;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "oklch(1 0 0 / 0.06)";
                      e.currentTarget.style.borderColor = "oklch(1 0 0 / 0.18)";
                      e.currentTarget.style.transform = "";
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{o.emoji}</span>
                    <span>{o.label}</span>
                  </button>
                ))}
              </div>
              <div
                style={{
                  marginTop: 24,
                  fontSize: 13,
                  color: "oklch(0.75 0.03 220)"
                }}
              >
                Step {step + 1} of {STEPS.length}
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    style={{
                      background: "none",
                      border: "none",
                      color: T.gold,
                      cursor: "pointer",
                      marginLeft: 12,
                      fontWeight: 600,
                      fontSize: 13
                    }}
                  >
                    ← Back
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="quiz-fade">
              <div style={{ fontSize: 42, marginBottom: 12 }}>🎯</div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: T.gold,
                  marginBottom: 10
                }}
              >
                Your recommended path
              </div>
              <h3
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: 28,
                  color: "#fff",
                  marginBottom: 14
                }}
              >
                {result.title}
              </h3>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: "oklch(0.85 0.02 220)",
                  maxWidth: 480,
                  margin: "0 auto 28px"
                }}
              >
                {result.blurb}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap"
                }}
              >
                <a
                  href="#contact"
                  style={{
                    background: accent,
                    color: "#fff",
                    padding: "15px 32px",
                    borderRadius: 50,
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: 16,
                    boxShadow: `0 6px 28px ${accent}66`
                  }}
                >
                  {result.cta} →
                </a>
                <button
                  onClick={restart}
                  style={{
                    background: "oklch(1 0 0 / 0.1)",
                    border: "1px solid oklch(1 0 0 / 0.22)",
                    color: "#fff",
                    padding: "15px 26px",
                    borderRadius: 50,
                    fontWeight: 500,
                    fontSize: 15,
                    cursor: "pointer"
                  }}
                >
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const optBtn = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  width: "100%",
  textAlign: "left",
  background: "oklch(1 0 0 / 0.06)",
  border: "1px solid oklch(1 0 0 / 0.18)",
  borderRadius: 14,
  padding: "16px 20px",
  color: "#fff",
  fontSize: 16,
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  fontFamily: "inherit"
};

export default TreatmentFinder;
