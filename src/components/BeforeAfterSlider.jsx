import React, { useState, useRef, useCallback } from "react";

// Reusable before/after wipe slider in a mouse-tracking 3D-tilt frame.
const BeforeAfterSlider = ({
  beforeSrc = "/uploads/smile-before.jpg",
  afterSrc = "/uploads/smile-after.jpg",
  accent = "oklch(0.52 0.13 192)",
  aspect = "960 / 950"
}) => {
  const [pos, setPos] = useState(50);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef(null);
  const wipeRef = useRef(null);

  const onTilt = (e) => {
    if (dragging || !frameRef.current) return;
    const r = frameRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 10 });
  };
  const resetTilt = () => setTilt({ rx: 0, ry: 0 });

  const moveWipe = useCallback((clientX) => {
    if (!wipeRef.current) return;
    const r = wipeRef.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const startDrag = (clientX) => {
    setDragging(true);
    resetTilt();
    moveWipe(clientX);
  };

  const pill = (side) => ({
    position: "absolute",
    bottom: 16,
    [side]: 16,
    background: "oklch(0.18 0.02 240 / 0.72)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "5px 12px",
    borderRadius: 20,
    pointerEvents: "none"
  });

  return (
    <div style={{ perspective: 1400 }}>
      <div
        ref={frameRef}
        onMouseMove={onTilt}
        onMouseLeave={resetTilt}
        style={{
          maxWidth: 720,
          margin: "0 auto",
          borderRadius: 24,
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: dragging ? "none" : "transform 0.3s ease",
          boxShadow: "0 40px 90px oklch(0 0 0 / 0.28), 0 0 0 1px oklch(0 0 0 / 0.04)"
        }}
      >
        <div
          ref={wipeRef}
          onMouseDown={(e) => startDrag(e.clientX)}
          onMouseMove={(e) => dragging && moveWipe(e.clientX)}
          onMouseUp={() => setDragging(false)}
          onMouseLeave={() => setDragging(false)}
          onTouchStart={(e) => startDrag(e.touches[0].clientX)}
          onTouchMove={(e) => moveWipe(e.touches[0].clientX)}
          onTouchEnd={() => setDragging(false)}
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            aspectRatio: aspect,
            cursor: dragging ? "grabbing" : "ew-resize",
            userSelect: "none",
            background: "#eee",
            transform: "translateZ(40px)"
          }}
        >
          <img
            src={afterSrc}
            alt="Smile after whitening"
            draggable={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
            <img
              src={beforeSrc}
              alt="Smile before whitening"
              draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          <span style={pill("left")}>Before</span>
          <span style={{ ...pill("right"), background: accent }}>After</span>

          <div
            style={{
              position: "absolute", top: 0, bottom: 0, left: `${pos}%`,
              width: 3, marginLeft: -1.5, background: "#fff",
              boxShadow: "0 0 12px oklch(0 0 0 / 0.4)"
            }}
          >
            <div
              style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                width: 46, height: 46, borderRadius: "50%", background: "#fff",
                boxShadow: "0 6px 20px oklch(0 0 0 / 0.35)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: accent, fontSize: 18, fontWeight: 700
              }}
            >
              ⇄
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
