import React, { useState, useRef, useEffect, useCallback } from "react";
import BeforeAfterSlider from "./BeforeAfterSlider.jsx";

const T = {
  teal: "oklch(0.52 0.13 192)",
  slate: "oklch(0.18 0.02 240)",
  slateMid: "oklch(0.40 0.02 240)",
  offWhite: "oklch(0.97 0.01 60)",
  line: "oklch(0.90 0.01 60)"
};

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/* ---------------- Try-your-photo whitening tool ---------------- */
const PhotoTool = ({ accent }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const originalRef = useRef(null); // cached ImageData
  const fileRef = useRef(null);
  const urlRef = useRef(null); // last object URL, for cleanup

  const [hasImage, setHasImage] = useState(false);
  const [whitening, setWhitening] = useState(60);
  const [oval, setOval] = useState({ cx: 0.5, cy: 0.7, rx: 0.26, ry: 0.12 });
  const [showOriginal, setShowOriginal] = useState(false);
  const [drag, setDrag] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Draw a loaded HTMLImageElement into the canvas + cache its pixels.
  const drawToCanvas = (img) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maxW = 560, maxH = 520;
    const scale = Math.min(maxW / img.width, maxH / img.height, 1);
    const W = Math.max(1, Math.round(img.width * scale));
    const H = Math.max(1, Math.round(img.height * scale));
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, W, H);
    originalRef.current = ctx.getImageData(0, 0, W, H);
    setOval({ cx: 0.5, cy: 0.7, rx: 0.26, ry: 0.12 });
    setShowOriginal(false);
    setError("");
    setHasImage(true);
    setBusy(false);
  };

  const loadImage = useCallback((src, revoke = false) => {
    setBusy(true);
    setError("");
    const img = new Image();
    img.onload = () => {
      // Canvas may not be mounted on the very first load — wait a tick if so.
      if (canvasRef.current) drawToCanvas(img);
      else requestAnimationFrame(() => drawToCanvas(img));
      if (revoke) { URL.revokeObjectURL(src); }
    };
    img.onerror = () => {
      setBusy(false);
      setError("Sorry, we couldn't read that image. Please try a JPG or PNG photo.");
      if (revoke) URL.revokeObjectURL(src);
    };
    img.src = src;
  }, []);

  const onFile = (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!f) return;
    if (!/^image\//.test(f.type) && !/\.(jpe?g|png|webp|gif)$/i.test(f.name)) {
      setError("That doesn't look like an image. Please choose a JPG or PNG.");
      return;
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = URL.createObjectURL(f);
    loadImage(urlRef.current, false);
  };

  const pickFile = () => fileRef.current && fileRef.current.click();

  // Re-render the whitened result whenever inputs change.
  useEffect(() => {
    const canvas = canvasRef.current;
    const orig = originalRef.current;
    if (!canvas || !orig) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (showOriginal) {
      ctx.putImageData(orig, 0, 0);
      return;
    }
    const W = canvas.width, H = canvas.height;
    const out = ctx.createImageData(W, H);
    out.data.set(orig.data);
    const d = out.data;
    const a = (whitening / 100) * 0.9;
    const cx = oval.cx * W, cy = oval.cy * H, rx = oval.rx * W, ry = oval.ry * H;
    const x0 = Math.max(0, Math.floor(cx - rx)), x1 = Math.min(W, Math.ceil(cx + rx));
    const y0 = Math.max(0, Math.floor(cy - ry)), y1 = Math.min(H, Math.ceil(cy + ry));
    for (let y = y0; y < y1; y++) {
      for (let x = x0; x < x1; x++) {
        const nx = (x - cx) / rx, ny = (y - cy) / ry;
        const dd = nx * nx + ny * ny;
        if (dd > 1) continue;
        const i = (y * W + x) * 4;
        const R = d[i], G = d[i + 1], B = d[i + 2];
        const bright = (R + G + B) / 3;
        // Only affect tooth-like pixels: bright, low red-dominance (skip lips/gums).
        if (bright < 75) continue;
        if (R - G > 35) continue;
        if (R - B > 95) continue;
        const edge = dd < 0.75 ? 1 : 1 - (dd - 0.75) / 0.25;
        const aa = a * edge;
        d[i] = R + (245 - R) * aa * 0.25;
        d[i + 1] = G + (248 - G) * aa * 0.3;
        d[i + 2] = B + (250 - B) * aa * 0.55; // lift blue most → removes yellow
      }
    }
    ctx.putImageData(out, 0, 0);
  }, [whitening, oval, showOriginal, hasImage]);

  // Oval dragging (pointer-captured so it keeps tracking outside the ellipse).
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDrag({ x: e.clientX, y: e.clientY, cx: oval.cx, cy: oval.cy });
  };
  const onPointerMove = (e) => {
    if (!drag || !containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    const dx = (e.clientX - drag.x) / r.width;
    const dy = (e.clientY - drag.y) / r.height;
    setOval((o) => ({
      ...o,
      cx: clamp(drag.cx + dx, o.rx, 1 - o.rx),
      cy: clamp(drag.cy + dy, o.ry, 1 - o.ry)
    }));
  };
  const onPointerUp = () => setDrag(null);

  const sliderStyle = {
    width: "100%", accentColor: accent, cursor: "pointer"
  };

  const uploadUI = (
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <div
          onClick={pickFile}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && pickFile()}
          style={{
            border: `2px dashed ${T.line}`, borderRadius: 20,
            padding: "48px 24px", cursor: "pointer", background: "#fff",
            transition: "border-color 0.2s"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = accent)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = T.line)}
        >
          <div style={{ fontSize: 40, marginBottom: 12 }}>📸</div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: T.slate, marginBottom: 8 }}>
            Upload a photo of your smile
          </div>
          <div style={{ fontSize: 14, color: T.slateMid, marginBottom: 20 }}>
            A clear, front-facing photo works best. {busy ? "Loading…" : ""}
          </div>
          <span
            style={{
              display: "inline-block", background: accent, color: "#fff",
              padding: "12px 26px", borderRadius: 50, fontWeight: 600, fontSize: 15
            }}
          >
            Choose photo
          </span>
        </div>
        <button
          onClick={() => loadImage("/uploads/smile-before.jpg")}
          style={{
            marginTop: 16, background: "none", border: "none", color: accent,
            fontWeight: 600, fontSize: 14, cursor: "pointer"
          }}
        >
          …or try it with a sample photo
        </button>
        {error && (
          <div style={{ marginTop: 14, fontSize: 13, color: "oklch(0.55 0.18 25)", fontWeight: 500 }}>
            ⚠ {error}
          </div>
        )}
        <div style={{ marginTop: 18, fontSize: 12.5, color: T.slateMid, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          🔒 Your photo stays on your device — it's never uploaded.
        </div>
      </div>
  );

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      {/* Single shared file input, triggered by the buttons below */}
      <input ref={fileRef} type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
      {!hasImage && uploadUI}
      <div style={{ display: hasImage ? "block" : "none" }}>
      <div
        ref={containerRef}
        style={{
          position: "relative", borderRadius: 20, overflow: "hidden",
          boxShadow: "0 30px 70px oklch(0 0 0 / 0.22)", background: "#eee",
          lineHeight: 0
        }}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "auto", display: "block" }} />

        {/* Positionable smile oval */}
        {!showOriginal && (
          <div
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            style={{
              position: "absolute",
              left: `${(oval.cx - oval.rx) * 100}%`,
              top: `${(oval.cy - oval.ry) * 100}%`,
              width: `${oval.rx * 200}%`,
              height: `${oval.ry * 200}%`,
              borderRadius: "50%",
              border: `2px solid ${accent}`,
              boxShadow: `0 0 0 9999px oklch(0.18 0.02 240 / 0.28)`,
              cursor: drag ? "grabbing" : "grab",
              touchAction: "none"
            }}
          >
            <span style={{
              position: "absolute", top: -26, left: "50%", transform: "translateX(-50%)",
              background: accent, color: "#fff", fontSize: 11, fontWeight: 700,
              padding: "2px 10px", borderRadius: 20, whiteSpace: "nowrap"
            }}>
              drag over your teeth
            </span>
          </div>
        )}

        <span style={{
          position: "absolute", bottom: 14, left: 14,
          background: "oklch(0.18 0.02 240 / 0.72)", color: "#fff",
          fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "5px 12px", borderRadius: 20, pointerEvents: "none"
        }}>
          {showOriginal ? "Before" : "Preview"}
        </span>
      </div>

      {/* Controls */}
      <div style={{ marginTop: 22, display: "grid", gap: 18 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 600, color: T.slate, marginBottom: 6 }}>
            <span>Whitening</span><span style={{ color: accent }}>{whitening}%</span>
          </div>
          <input type="range" min="0" max="100" value={whitening}
            onChange={(e) => setWhitening(+e.target.value)} style={sliderStyle} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.slate, marginBottom: 6 }}>Area width</div>
            <input type="range" min="10" max="42" value={Math.round(oval.rx * 100)}
              onChange={(e) => setOval((o) => ({ ...o, rx: clamp(+e.target.value / 100, 0.1, 0.42), cx: clamp(o.cx, +e.target.value / 100, 1 - +e.target.value / 100) }))}
              style={sliderStyle} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.slate, marginBottom: 6 }}>Area height</div>
            <input type="range" min="5" max="24" value={Math.round(oval.ry * 100)}
              onChange={(e) => setOval((o) => ({ ...o, ry: clamp(+e.target.value / 100, 0.05, 0.24), cy: clamp(o.cy, +e.target.value / 100, 1 - +e.target.value / 100) }))}
              style={sliderStyle} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onMouseDown={() => setShowOriginal(true)}
            onMouseUp={() => setShowOriginal(false)}
            onMouseLeave={() => setShowOriginal(false)}
            onTouchStart={() => setShowOriginal(true)}
            onTouchEnd={() => setShowOriginal(false)}
            style={{
              background: "#fff", border: `1.5px solid ${T.line}`, color: T.slate,
              padding: "11px 22px", borderRadius: 50, fontWeight: 600, fontSize: 14, cursor: "pointer"
            }}
          >
            👁 Hold to compare
          </button>
          <button
            onClick={pickFile}
            style={{
              background: "#fff", border: `1.5px solid ${T.line}`, color: T.slate,
              padding: "11px 22px", borderRadius: 50, fontWeight: 600, fontSize: 14, cursor: "pointer"
            }}
          >
            ↺ New photo
          </button>
        </div>
        <p style={{ fontSize: 12, color: T.slateMid, textAlign: "center", margin: 0 }}>
          Illustrative preview only — actual results vary. Your photo never leaves your device.
        </p>
      </div>
      </div>
    </div>
  );
};

/* ---------------- Combined tabbed section ---------------- */
const VirtualSmilePreview = ({ tweaks = {} }) => {
  const accent = tweaks.accentColor || T.teal;
  const [tab, setTab] = useState("example");

  const tabBtn = (id, label) => (
    <button
      onClick={() => setTab(id)}
      style={{
        padding: "10px 22px", borderRadius: 50, border: "none", cursor: "pointer",
        fontSize: 14.5, fontWeight: 600, fontFamily: "inherit",
        background: tab === id ? accent : "transparent",
        color: tab === id ? "#fff" : T.slateMid,
        transition: "all 0.2s"
      }}
    >
      {label}
    </button>
  );

  return (
    <section
      id="smile-simulator"
      style={{
        padding: "100px clamp(20px,6vw,100px)",
        background: `linear-gradient(180deg, ${T.offWhite} 0%, #fff 100%)`,
        overflow: "hidden"
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6, color: accent,
            fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14
          }}>
            ✦ Virtual Smile Preview
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 40, color: T.slate, lineHeight: 1.2 }}>
            See your brighter smile
          </h2>
          <p style={{ fontSize: 17, color: T.slateMid, marginTop: 16, maxWidth: 580, margin: "16px auto 0" }}>
            Preview what professional whitening could do — see a real example, or upload
            your own photo and try it yourself, right in your browser.
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "inline-flex", gap: 4, padding: 5, borderRadius: 50,
          background: "oklch(0.94 0.01 60)", margin: "0 auto 40px",
          left: "50%", position: "relative", transform: "translateX(-50%)"
        }}>
          {tabBtn("example", "See an example")}
          {tabBtn("photo", "Try your photo")}
        </div>

        <div>
          {tab === "example" ? <BeforeAfterSlider accent={accent} /> : <PhotoTool accent={accent} />}
        </div>

        <div style={{ textAlign: "center", marginTop: 44 }}>
          <a
            href="#contact"
            style={{
              background: accent, color: "#fff", padding: "15px 34px", borderRadius: 50,
              textDecoration: "none", fontWeight: 600, fontSize: 16,
              display: "inline-flex", alignItems: "center", gap: 9,
              boxShadow: `0 6px 28px ${accent}55`, transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 12px 36px ${accent}66`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = `0 6px 28px ${accent}55`; }}
          >
            Start My Smile Makeover →
          </a>
        </div>
      </div>
    </section>
  );
};

export default VirtualSmilePreview;
