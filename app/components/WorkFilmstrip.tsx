"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   WorkFilmstrip
   - Continuously auto-scrolls the strip (RAF loop)
   - User page-scroll modulates speed (faster = more parallax)
   - Hover spotlight: a glowing radial that tracks the mouse
   ───────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    n: "01",
    name: "Strawberry",
    tag: "Decision Intelligence Platform",
    type: "Web Design",
    year: "2024",
    bg: "#1C2E4A",
    accent: "#7DA2F5",
  },
  {
    n: "02",
    name: "notaprompt",
    tag: "Pre-AI Thinking Layer",
    type: "Development",
    year: "2024",
    bg: "#1A1714",
    accent: "#C8F135",
  },
  {
    n: "03",
    name: "CompareFi",
    tag: "Financial Comparison Tool",
    type: "Brand Identity",
    year: "2023",
    bg: "#2A1A0E",
    accent: "#E8856A",
  },
  {
    n: "04",
    name: "HackHN",
    tag: "Hackathon Brand & Site",
    type: "Strategy",
    year: "2024",
    bg: "#0E2318",
    accent: "#5CDB95",
  },
];

/* Duplicate for seamless loop */
const ITEMS = [...PROJECTS, ...PROJECTS];

const CARD_W = 380;
const GAP = 24;
const STEP = CARD_W + GAP;
const TOTAL = STEP * PROJECTS.length; // loop point

/* ── Spotlight card ──────────────────────────────────── */
function SpotlightCard({ p, offsetX }: { p: typeof PROJECTS[0]; offsetX: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0, y: 0, visible: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  const handleMouseLeave = () => setSpotlight((s) => ({ ...s, visible: false }));

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        flexShrink: 0,
        width: CARD_W,
        cursor: "pointer",
        transform: `translateX(${offsetX}px)`,
      }}
    >
      {/* Card image area */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4/3",
          backgroundColor: p.bg,
          marginBottom: 24,
          overflow: "hidden",
          transition: "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
      >
        {/* Coordinate grid */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id={`g-${p.n}-${offsetX}`} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={p.accent} strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#g-${p.n}-${offsetX})`} />
        </svg>

        {/* Project name watermark */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(3rem, 7vw, 6rem)",
              fontWeight: 900,
              fontStyle: "italic",
              color: p.accent,
              opacity: 0.12,
              letterSpacing: "-0.04em",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {p.name}
          </span>
        </div>

        {/* Number badge */}
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: p.accent,
            opacity: 0.55,
          }}
        >
          {p.n} / 04
        </div>

        {/* Year */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 20,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "rgba(232,226,217,0.25)",
          }}
        >
          {p.year}
        </div>

        {/* ── Mouse spotlight ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: spotlight.visible ? 1 : 0,
            transition: "opacity 0.35s ease",
            background: spotlight.visible
              ? `radial-gradient(320px circle at ${spotlight.x}px ${spotlight.y}px, ${p.accent}26, transparent 70%)`
              : "none",
          }}
        />

        {/* Spotlight hard ring */}
        {spotlight.visible && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background: `radial-gradient(120px circle at ${spotlight.x}px ${spotlight.y}px, ${p.accent}14, transparent 60%)`,
            }}
          />
        )}
      </div>

      {/* Card meta */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: 16,
              fontWeight: 500,
              color: "#E8E2D9",
              marginBottom: 4,
              letterSpacing: "-0.01em",
            }}
          >
            {p.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              fontSize: 14,
              color: "rgba(232,226,217,0.4)",
            }}
          >
            {p.tag}
          </p>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            padding: "5px 10px",
            border: "1px solid rgba(232,226,217,0.1)",
            color: "rgba(232,226,217,0.35)",
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginLeft: 12,
          }}
        >
          {p.type}
        </span>
      </div>
    </div>
  );
}

/* ── Main export ─────────────────────────────────────── */
export default function WorkFilmstrip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoOffset = useRef(0);
  const lastTime = useRef(0);
  const rawX = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 60, damping: 20, mass: 0.8 });
  const [displayX, setDisplayX] = useState(0);

  /* Scroll-based speed boost */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollBonus = useTransform(scrollYProgress, [0, 0.5, 1], [0, -20, -40]);

  /* RAF auto-scroll loop */
  useEffect(() => {
    const SPEED = 0.1; // px per ms — gentle drift

    let raf: number;
    const tick = (time: number) => {
      if (lastTime.current) {
        const dt = Math.min(time - lastTime.current, 50); // cap to avoid jumps
        autoOffset.current += SPEED * dt;
        // seamless loop: reset when we've scrolled one full set
        if (autoOffset.current >= TOTAL) {
          autoOffset.current -= TOTAL;
        }
      }
      lastTime.current = time;

      const bonus = scrollBonus.get();
      rawX.set(-(autoOffset.current) + bonus);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Sync spring output to state for rendering */
  useEffect(() => {
    const unsub = smoothX.on("change", (v) => setDisplayX(v));
    return unsub;
  }, [smoothX]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundColor: "#0D0C0B",
        padding: "120px 0",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "0 56px",
          marginBottom: 64,
        }}
      >
        <div>
          <span className="label" style={{ display: "block", marginBottom: 20, color: "#E8E2D9" }}>
            03 — Selected Work
          </span>
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
              fontWeight: 400,
              lineHeight: 1,
              color: "#E8E2D9",
              letterSpacing: "-0.02em",
            }}
          >
            Work that lives{" "}
            <em style={{ fontStyle: "italic", color: "#C8F135" }}>rent-free</em>
            <br />
            in your head.
          </h2>
        </div>
        <a
          href="#"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(232,226,217,0.4)",
            borderBottom: "1px solid rgba(232,226,217,0.12)",
            paddingBottom: 6,
            whiteSpace: "nowrap",
            alignSelf: "flex-end",
          }}
        >
          View all →
        </a>
      </div>

      {/* Strip — translate via displayX from spring */}
      <div
        style={{
          display: "flex",
          gap: GAP,
          paddingLeft: 56,
          width: "max-content",
          transform: `translateX(${displayX}px)`,
          willChange: "transform",
        }}
      >
        {ITEMS.map((p, idx) => (
          <SpotlightCard
            key={`${p.n}-${idx}`}
            p={p}
            offsetX={0}
          />
        ))}
      </div>
    </section>
  );
}
