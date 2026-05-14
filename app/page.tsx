"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import Dock from "./components/Dock";
import Loader from "./components/Loader";
import ManifestoScroll from "./components/ManifestoScroll";
import WorkFilmstrip from "./components/WorkFilmstrip";
import ServicesAccordion from "./components/ServicesAccordion";
import LetterSection from "./components/LetterSection";
import PricingTable from "./components/PricingTable";
import CTAFinal from "./components/CTAFinal";
import { Home, Layers, Briefcase, Mail, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

/* ─── Lenis smooth scroll ─────────────────────────────── */
function useLenis(ready: boolean) {
  useEffect(() => {
    if (!ready) return;
    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let raf: number;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, [ready]);
}

/* ─── Dock Nav ────────────────────────────────────────── */
const SZ = 17;

function SiteNav() {
  const items = [
    { icon: <Home size={SZ} strokeWidth={1.4} />, label: "Home", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    { icon: <Briefcase size={SZ} strokeWidth={1.4} />, label: "Work", onClick: () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <Layers size={SZ} strokeWidth={1.4} />, label: "Services", onClick: () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <Mail size={SZ} strokeWidth={1.4} />, label: "Contact", onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <ArrowUpRight size={SZ} strokeWidth={1.4} />, label: "Start a Project", onClick: () => { window.location.href = "mailto:hello@lucide.tech"; }, className: "dock-cta" },
  ];
  return <Dock items={items} panelHeight={56} baseItemSize={42} magnification={64} distance={155} />;
}

/* ─── Hero ────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100dvh",
        backgroundColor: "#0D0C0B",
        display: "flex",
        flexDirection: "column",
        padding: "0 56px",
        overflow: "hidden",
      }}
    >
      <div className="grain" />

      {/* Coordinate grid lines — Ship influence */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025, pointerEvents: "none" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#E8E2D9" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Acid gradient bloom — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-5%",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,241,53,0.055) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 40,
          paddingBottom: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              fontSize: 20,
              color: "#E8E2D9",
            }}
          >
            Lucide
          </span>
          <span className="label" style={{ opacity: 0.3, color: "#E8E2D9" }}>
            — Design & Engineering
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <span className="label" style={{ color: "#E8E2D9", opacity: 0.25 }}>
            EST. 2023
          </span>
          <motion.a
            href="mailto:hello@lucide.tech"
            whileHover={{ color: "#C8F135" }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(232,226,217,0.4)",
              textDecoration: "none",
              transition: "color 0.25s",
            }}
          >
            hello@lucide.tech
          </motion.a>
        </div>
      </motion.div>

      {/* Main hero content */}
      <motion.div
        style={{ y, opacity }}
        className="hero-content"
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: 72,
            paddingTop: 80,
          }}
        >
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 48 }}
          >
            <span className="label" style={{ color: "#C8F135" }}>01 — Studio</span>
            <div style={{ width: 40, height: 1, backgroundColor: "rgba(200,241,53,0.3)" }} />
            <span className="label" style={{ color: "#E8E2D9", opacity: 0.3 }}>Nagpur, India</span>
          </motion.div>

          {/* Headline — clipPath masks only the TOP so descenders are never cut */}
          <div>
            {[
              { text: "We design websites", delay: 0.55 },
              { text: "that make people", delay: 0.65 },
              { text: "stop scrolling.", delay: 0.75, accent: true },
            ].map((line, i) => (
              <div
                key={i}
                style={{
                  clipPath: "inset(-20% 0 -30% 0)",
                  lineHeight: 1,
                  marginBottom: "-0.08em",
                }}
              >
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.0,
                    delay: line.delay,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                    fontStyle: line.accent ? "italic" : "normal",
                    fontSize: "clamp(3.2rem, 8.5vw, 9.5rem)",
                    lineHeight: 0.95,
                    color: line.accent ? "#C8F135" : "#E8E2D9",
                    letterSpacing: "-0.03em",
                    display: "block",
                    textDecoration: line.accent ? "underline" : "none",
                    textDecorationColor: line.accent ? "#C8F135" : "transparent",
                    textUnderlineOffset: "0.12em",
                    textDecorationThickness: "0.04em",
                  }}
                >
                  {line.text}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Sub-row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginTop: 56,
              flexWrap: "wrap",
              gap: 32,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                lineHeight: 1.7,
                color: "rgba(232,226,217,0.45)",
                maxWidth: 420,
              }}
            >
              Not because we&apos;re clever with code — but because we understand the
              person on the other side of the screen. Strategy, design, and
              engineering. Under one roof.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <motion.a
                href="mailto:hello@lucide.tech"
                whileHover={{ backgroundColor: "#d4ff4a", scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 40px",
                  backgroundColor: "#C8F135",
                  color: "#0D0C0B",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                Start a project →
              </motion.a>

              <motion.a
                href="#work"
                onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
                whileHover={{ borderColor: "rgba(232,226,217,0.3)", color: "#E8E2D9" }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 40px",
                  border: "1px solid rgba(232,226,217,0.12)",
                  color: "rgba(232,226,217,0.4)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "border-color 0.25s, color 0.25s",
                }}
              >
                See our work
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom coordinates bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 56px",
          borderTop: "1px solid rgba(232,226,217,0.04)",
          zIndex: 2,
        }}
      >
        <span className="label" style={{ color: "#E8E2D9", opacity: 0.2 }}>
          N 21°09′ E 79°05′ — Nagpur
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 32,
            backgroundColor: "rgba(200,241,53,0.35)",
          }}
        />
        <span className="label" style={{ color: "#E8E2D9", opacity: 0.2 }}>
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}

/* ─── Stats band ─────────────────────────────────────── */
function StatsBand() {
  const stats = [
    { n: "48", label: "Projects shipped" },
    { n: "< 3s", label: "Avg. load time" },
    { n: "100%", label: "Client ownership" },
    { n: "2wk", label: "Fastest turnaround" },
  ];

  return (
    <section
      style={{
        backgroundColor: "#C8F135",
        padding: "32px 56px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 24,
      }}
    >
      {stats.map((s) => (
        <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              color: "#0D0C0B",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {s.n}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "rgba(13,12,11,0.5)",
            }}
          >
            {s.label}
          </span>
        </div>
      ))}
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────── */
export default function Page() {
  const [ready, setReady] = useState(false);
  useLenis(ready);

  return (
    <>
      <AnimatePresence mode="wait">
        {!ready && <Loader key="loader" onComplete={() => setReady(true)} />}
      </AnimatePresence>

      <SiteNav />

      <main>
        <Hero />
        <StatsBand />

        <div style={{ position: "relative" }}>
          <ManifestoScroll />
        </div>

        <div id="work">
          <WorkFilmstrip />
        </div>

        <div id="services">
          <ServicesAccordion />
        </div>

        <LetterSection />
        <PricingTable />
        <CTAFinal />
      </main>
    </>
  );
}
