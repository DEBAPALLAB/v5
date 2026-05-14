"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   ManifestoScroll V2
   - Word-by-word staggered reveals (blur + y + opacity)
   - Each word is its own component — hooks at top level ✓
   - "impossible to ignore." gets an animated draw underline
   ───────────────────────────────────────────────────────── */

interface WordProps {
  children: string;
  scrollYProgress: MotionValue<number>;
  start: number;
  end: number;
  underlined?: boolean;
  underlineProgress?: MotionValue<number>;
}

/* Single animated word */
function Word({ children, scrollYProgress, start, end, underlined, underlineProgress }: WordProps) {
  const opacity  = useTransform(scrollYProgress, [start, end], [0, 1], { clamp: true });
  const y        = useTransform(scrollYProgress, [start, end], [22, 0], { clamp: true });
  const rawBlur  = useTransform(scrollYProgress, [start, end], [10, 0], { clamp: true });
  const filter   = useTransform(rawBlur, (v) => `blur(${v}px)`);
  const scaleX   = underlined && underlineProgress
    ? useTransform(underlineProgress, [0, 1], [0, 1], { clamp: true })
    : null;

  return (
    <motion.span
      style={{
        opacity,
        y,
        filter,
        display: "inline-block",
        position: "relative",
        marginRight: "0.28em",
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
      {/* Animated underline draw */}
      {underlined && scaleX && (
        <motion.span
          style={{
            position: "absolute",
            left: 0,
            bottom: "-0.06em",
            width: "100%",
            height: "0.055em",
            backgroundColor: "#C8F135",
            transformOrigin: "left center",
            scaleX,
          }}
        />
      )}
    </motion.span>
  );
}

/* ── Line config ─────────────────────────────────────── */
interface LineConfig {
  text: string;
  underlinePhrase?: string; // words that get the animated underline
}

const LINES: LineConfig[] = [
  { text: "Most design agencies are in the business of looking busy." },
  { text: "Long decks. Weekly syncs. Revisions on revisions." },
  { text: "We are in the business of being impossible to ignore.", underlinePhrase: "impossible to ignore." },
  { text: "We don't manage expectations." },
  { text: "We exceed them — and then send you the invoice." },
];

/* ── ManifestoLine ──────────────────────────────────── */
function ManifestoLine({
  config,
  lineIndex,
  scrollYProgress,
}: {
  config: LineConfig;
  lineIndex: number;
  scrollYProgress: MotionValue<number>;
}) {
  const words = config.text.split(" ");
  // Rebuild underlinePhrase into word set for matching
  const underlineWords = new Set(config.underlinePhrase?.split(" ") ?? []);

  const LINE_SPAN    = 0.09;  // how long a single word takes to reveal
  const WORD_STAGGER  = 0.016; // delay between consecutive words
  const lineStart     = 0.03 + lineIndex * 0.10;

  // underline progress: uses the same scroll range as the last underlined word
  const lastUnderlineWordIdx = config.underlinePhrase
    ? words.lastIndexOf(config.underlinePhrase.split(" ").slice(-1)[0])
    : -1;
  const underlineStart = lineStart + lastUnderlineWordIdx * WORD_STAGGER;
  const underlineProgress = useTransform(
    scrollYProgress,
    [underlineStart, underlineStart + 0.09],
    [0, 1]
  );

  return (
    <p
      style={{
        marginBottom: "0.45em",
        fontFamily: "var(--font-playfair), Georgia, serif",
        fontSize: "clamp(1.55rem, 3vw, 3.1rem)",
        fontStyle: "italic",
        fontWeight: 400,
        lineHeight: 1.35,
        color: "#0D0C0B",
        wordSpacing: "-0.02em",
      }}
    >
      {words.map((word, wi) => {
        const wordStart = lineStart + wi * WORD_STAGGER;
        const wordEnd   = Math.min(wordStart + LINE_SPAN, 1);
        const isUnderlined = underlineWords.has(word);

        return (
          <Word
            key={`${lineIndex}-${wi}`}
            scrollYProgress={scrollYProgress}
            start={wordStart}
            end={wordEnd}
            underlined={isUnderlined}
            underlineProgress={isUnderlined ? underlineProgress : undefined}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

/* ── Main export ─────────────────────────────────────── */
export default function ManifestoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.15"],
  });

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        backgroundColor: "#E8E2D9",
        color: "#0D0C0B",
        padding: "140px var(--px)",
        overflow: "hidden",
      }}
    >
      {/* Top rule */}
      <div style={{ width: "100%", height: 1, backgroundColor: "rgba(13,12,11,0.1)", marginBottom: 64 }} />

      {/* Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 80 }}>
        <span className="label" style={{ opacity: 0.4, color: "#0D0C0B" }}>
          02 — Philosophy
        </span>
        <span className="label" style={{ opacity: 0.3, color: "#0D0C0B" }}>
          N 21°09′ E 79°05′
        </span>
      </div>

      {/* Lines */}
      <div style={{ maxWidth: 1050 }}>
        {LINES.map((config, i) => (
          <ManifestoLine
            key={i}
            config={config}
            lineIndex={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* Bottom rule */}
      <div style={{ width: "100%", height: 1, backgroundColor: "rgba(13,12,11,0.1)", marginTop: 80 }} />
    </section>
  );
}
