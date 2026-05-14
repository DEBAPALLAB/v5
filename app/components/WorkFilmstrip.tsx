"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────
   WorkFilmstrip
   - Continuously auto-scrolls the strip (RAF loop)
   - User page-scroll modulates speed (faster = more parallax)
   - Hover spotlight: a glowing radial that tracks the mouse
   ───────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    n: "01",
    name: "CompareFi",
    tag: "Financial Comparison Tool",
    type: "Web Application",
    year: "2023",
    bg: "#2A1A0E",
    accent: "#E8856A",
    overview: "CompareFi is a comprehensive financial comparison platform that empowers users to make informed decisions. We built an intuitive interface that simplifies complex financial data, allowing users to effortlessly compare credit cards, loans, and investment options tailored to their personal financial goals.",
    link: "https://www.comparefi.in/",
    image: "/images/comparefi.pnh.jpg",
  },
  {
    n: "02",
    name: "Luman",
    tag: "Organizational Dashboard",
    type: "Dashboard UI",
    year: "2024",
    bg: "#1C2E4A",
    accent: "#7DA2F5",
    overview: "Luman provides organizations with a powerful centralized dashboard for managing their internal operations. The platform features robust analytics, employee management modules, and a sleek, dark-mode optimized interface designed for prolonged use without eye strain.",
    link: "https://luman-five.vercel.app/org-login",
    image: "/images/luman.jpg",
  },
  {
    n: "03",
    name: "Aaradhya Herbals",
    tag: "Ayurvedic Wellness",
    type: "E-Commerce",
    year: "2024",
    bg: "#14532D",
    accent: "#86EFAC",
    overview: "Aaradhya Herbals bridges ancient Ayurvedic wisdom with modern wellness lifestyles by manufacturing authentic herbal preparations. Every product is crafted using traditional methods prescribed in classical texts—from respecting lunar cycles during harvest to precise purification rituals.",
    link: "https://aaradhyapreview.netlify.app/",
    image: "/images/aaradhya.jpg",
  },
  {
    n: "04",
    name: "Aarsh Globalex",
    tag: "Pharmaceutical Exporter",
    type: "Corporate Portal",
    year: "2024",
    bg: "#0C4A6E",
    accent: "#7DD3FC",
    overview: "Aarsh Globalex is a GMP and ISO 9001:2015 certified pharmaceutical merchant exporter delivering trusted healthcare solutions worldwide. Based in India, they provide complete end-to-end global trade solutions, including product sourcing, quality assurance, and export documentation.",
    link: "https://aarshglobalex.com/",
    image: "/images/aarshaglobalex.jpg",
  },
  {
    n: "05",
    name: "Strawberry",
    tag: "Decision Intelligence Platform",
    type: "Web Application",
    year: "2024",
    bg: "#1E1B4B",
    accent: "#F472B6",
    overview: "Strawberry is a next-generation decision intelligence platform offering precision agent-level simulation for strategic decision-making. The platform allows organizations to map adoption cascades, analyze agent psychographics with high-fidelity persona modeling.",
    link: "https://strawberry-v1.vercel.app/",
    image: "/images/strawberry.jpg",
  },
  {
    n: "06",
    name: "Superform",
    tag: "Data Collection",
    type: "Web Application",
    year: "2024",
    bg: "#3F2E0E",
    accent: "#FBBF24",
    overview: "Still building...",
    link: "#",
    image: "/images/superform.jpg",
  },
];

/* Duplicate for seamless loop */
const ITEMS = [...PROJECTS, ...PROJECTS];

const CARD_W = 380;
const GAP = 24;
const STEP = CARD_W + GAP;
const TOTAL = STEP * PROJECTS.length; // loop point

/* ── Spotlight card ──────────────────────────────────── */
function SpotlightCard({ p, offsetX, onSelect }: { p: typeof PROJECTS[0]; offsetX: number; onSelect: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0, y: 0, visible: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (p.image) return; // Prevent laggy unnecessary re-renders when hover effects are disabled
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  };

  const handleMouseLeave = () => {
    if (p.image) return;
    setSpotlight((s) => ({ ...s, visible: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
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
        {/* Coordinate grid - ONLY if no image */}
        {!p.image && (
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
        )}

        {/* Project image or watermark */}
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="400px"
            style={{ objectFit: "cover", position: "absolute", inset: 0, zIndex: 1 }}
          />
        ) : (
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
        )}

        {/* Number badge - ONLY if no image */}
        {!p.image && (
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
        )}

        {/* Year - ONLY if no image */}
        {!p.image && (
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
        )}

        {/* ── Mouse spotlight - ONLY if no image ── */}
        {!p.image && (
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
        )}

        {/* Spotlight hard ring - ONLY if no image */}
        {!p.image && spotlight.visible && (
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
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

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

  // Hardware-accelerated animation driven entirely by Framer Motion values, bypassing React re-renders.

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

      {/* Strip — translate via spring directly for 0 lag */}
      <motion.div
        style={{
          display: "flex",
          gap: GAP,
          paddingLeft: "var(--px)",
          width: "max-content",
          x: smoothX,
          willChange: "transform",
        }}
      >
        {ITEMS.map((p, idx) => (
          <SpotlightCard
            key={`${p.n}-${idx}`}
            p={p}
            offsetX={0}
            onSelect={() => setSelectedProject(p)}
          />
        ))}
      </motion.div>

      {/* Dialog Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "var(--px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(13,12,11,0.85)",
                backdropFilter: "blur(8px)",
                cursor: "pointer",
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 800,
                backgroundColor: "#0D0C0B",
                border: "1px solid rgba(232,226,217,0.1)",
                display: "flex",
                flexDirection: "column",
                maxHeight: "85vh",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 24px 64px rgba(0,0,0,0.6)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "clamp(200px, 35vh, 400px)",
                  backgroundColor: selectedProject.bg,
                  flexShrink: 0,
                }}
              >
                {selectedProject.image && (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    backgroundColor: "rgba(13,12,11,0.7)",
                    backdropFilter: "blur(4px)",
                    border: "1px solid rgba(232,226,217,0.2)",
                    color: "#E8E2D9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              
              <div style={{ padding: "var(--px)", overflowY: "auto", display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                      color: selectedProject.accent,
                      margin: 0,
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                      fontStyle: "italic",
                    }}
                  >
                    {selectedProject.name}
                  </h2>
                  <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,226,217,0.5)", border: "1px solid rgba(232,226,217,0.15)", padding: "4px 8px" }}>
                      {selectedProject.tag}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(232,226,217,0.5)", border: "1px solid rgba(232,226,217,0.15)", padding: "4px 8px" }}>
                      {selectedProject.year}
                    </span>
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "rgba(232,226,217,0.7)",
                    margin: 0,
                  }}
                >
                  {selectedProject.overview}
                </p>

                {selectedProject.link && selectedProject.link !== "#" && (
                  <div style={{ marginTop: 8 }}>
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "14px 28px",
                        backgroundColor: selectedProject.accent,
                        color: "#0D0C0B",
                        textDecoration: "none",
                        fontFamily: "var(--font-inter), sans-serif",
                        fontWeight: 500,
                        fontSize: 14,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      Visit Live Website
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
