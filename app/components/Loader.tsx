"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

const LINES = [
  { text: "Understanding the problem.", serif: true },
  { text: "Questioning the brief.", serif: true },
  { text: "Ignoring the brief.", serif: true },
  { text: "Building something better.", serif: true },
  { text: "L U C I D E", serif: false },
];

export default function Loader({ onComplete }: LoaderProps) {
  const [idx, setIdx] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const total = 5200;
    const step = 20;
    const inc = 100 / (total / step);
    const id = setInterval(() => {
      setPct((p) => {
        const n = Math.min(p + inc + Math.random() * 0.2, 100);
        if (n < 20) setIdx(0);
        else if (n < 40) setIdx(1);
        else if (n < 60) setIdx(2);
        else if (n < 80) setIdx(3);
        else setIdx(4);
        if (n >= 100) {
          clearInterval(id);
          setTimeout(onComplete, 900);
          return 100;
        }
        return n;
      });
    }, step);
    return () => clearInterval(id);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 1.1, ease: [0.87, 0, 0.13, 1] } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0D0C0B",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div className="grain" style={{ opacity: 0.06 }} />

      {/* Scanning line */}
      <motion.div
        animate={{ top: ["-20%", "120%"] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: "30vh",
          background: "linear-gradient(to bottom, transparent, rgba(200,241,53,0.03), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* Word reveal */}
      <div style={{ position: "relative", height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
            transition={{ duration: 0.38, ease: [0.215, 0.61, 0.355, 1] }}
            style={{
              fontFamily: LINES[idx].serif
                ? "var(--font-playfair), Georgia, serif"
                : "var(--font-inter), sans-serif",
              fontStyle: LINES[idx].serif ? "italic" : "normal",
              fontSize: LINES[idx].serif ? "clamp(1.6rem, 3.5vw, 2.8rem)": "clamp(0.7rem, 1.4vw, 1rem)",
              fontWeight: LINES[idx].serif ? 400 : 400,
              letterSpacing: LINES[idx].serif ? "-0.01em": "0.55em",
              color: idx === 4 ? "#C8F135" : "#E8E2D9",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {LINES[idx].text}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 56,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 100,
            height: 1,
            backgroundColor: "rgba(232,226,217,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#C8F135",
              originX: 0,
              scaleX: pct / 100,
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.3em",
            opacity: 0.3,
            color: "#E8E2D9",
          }}
        >
          {Math.floor(pct).toString().padStart(2, "0")} %
        </span>
      </div>
    </motion.div>
  );
}
