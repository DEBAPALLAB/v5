"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   LetterSection — Forge-style personal letter from founder.
   Scrolls with subtle parallax on the side annotation.
   ───────────────────────────────────────────────────────── */

export default function LetterSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const annotationY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        backgroundColor: "#E8E2D9",
        color: "#0D0C0B",
        padding: "140px 56px",
        overflow: "hidden",
      }}
    >
      <div className="grain" style={{ opacity: 0.025, mixBlendMode: "multiply" }} />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        {/* Left: floating annotation */}
        <motion.div style={{ y: annotationY }}>
          <span className="label" style={{ display: "block", marginBottom: 24, color: "#0D0C0B", opacity: 0.4 }}>
            05 — The Letter
          </span>
          <div
            style={{
              width: 1,
              height: 120,
              backgroundColor: "rgba(13,12,11,0.12)",
              marginBottom: 24,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.18em",
              lineHeight: 1.8,
              color: "rgba(13,12,11,0.35)",
              textTransform: "uppercase",
              maxWidth: 160,
            }}
          >
            A note on why we exist and who this is for.
          </p>
        </motion.div>

        {/* Right: the actual letter */}
        <div>
          <h2
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3.2rem)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1.2,
              marginBottom: 48,
              color: "#0D0C0B",
              letterSpacing: "-0.01em",
            }}
          >
            To the founder who's been burned by an agency before:
          </h2>

          {[
            "We know exactly what happened. They showed you a beautiful pitch deck. They used words like 'brand ecosystem' and 'omnichannel storytelling.' You got excited. You signed. Three months later, you had a website that looked nothing like the deck, cost twice as much, and converted nobody.",
            "We started Lucide because we were tired of watching that happen. We're a small team. On purpose. When you hire us, you get the people who will actually do the work — not account managers who relay messages to a junior in another timezone.",
            "We're not the cheapest option. We're not trying to be. We're the option you choose when you're done with options that waste your time. When you want something done once, done right, and done in a way that actually moves the needle.",
            "If that's you — drop us a message. We'll know in the first conversation whether we're the right fit. If we're not, we'll tell you that too.",
          ].map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: i === 3 ? "italic" : "normal",
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                lineHeight: 1.85,
                color: i === 0 ? "rgba(13,12,11,0.75)" : "rgba(13,12,11,0.55)",
                marginBottom: 28,
              }}
            >
              {para}
            </p>
          ))}

          {/* Signature */}
          <div style={{ marginTop: 56, display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                backgroundColor: "#0D0C0B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontStyle: "italic",
                  fontSize: 18,
                  color: "#C8F135",
                }}
              >
                L
              </span>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontStyle: "italic",
                  fontSize: 17,
                  color: "#0D0C0B",
                  marginBottom: 2,
                }}
              >
                The Lucide Team
              </p>
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: "rgba(13,12,11,0.35)",
                  textTransform: "uppercase",
                }}
              >
                Nagpur, India
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
