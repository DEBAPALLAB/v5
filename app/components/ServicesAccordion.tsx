"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   ServicesAccordion — Ship-inspired expandable sections.
   Each service is a row that expands on click.
   ───────────────────────────────────────────────────────── */

const SERVICES = [
  {
    n: "01",
    name: "Web Design",
    pitch: "Built to earn trust before a word is read.",
    body: "A website is a salesperson that never sleeps, never has an off day, and talks to every single person who lands on it. We design to earn trust before a word is read. Layouts that guide. Details that delight. Form perfectly balanced with function. We engineer pages that convert the person sitting on the other side of the screen — the one who doesn't care about your design system and just wants to know if you're worth their time.",
    deliverables: ["Wireframes & UX Maps", "High-fidelity Figma designs", "Motion & interaction system", "Responsive layouts"],
    time: "2–4 weeks",
  },
  {
    n: "02",
    name: "Development",
    pitch: "Code the way it should be written. Fast. Clean. Permanent.",
    body: "We write code the way it should be written — clean, fast, and maintainable. We blow past benchmarks. We obsess over milliseconds. Everything is built in React & Next.js from the ground up. No page builders. No WordPress. No \"just use a template.\" Your site is a product. We treat it like one.",
    deliverables: ["Next.js / React builds", "Performance-first architecture", "API integrations", "CMS setup"],
    time: "2–6 weeks",
  },
  {
    n: "03",
    name: "Brand Identity",
    pitch: "Before you speak, your brand already has.",
    body: "Before anyone reads your headline, they've already formed an opinion. Your logo, your colours, your typeface — they're doing the talking before you get a chance. We build identities that say the right thing without saying anything at all. Distinct enough to be remembered. Consistent enough to scale. From day 1 to Series A.",
    deliverables: ["Logo system", "Color & type palette", "Brand guidelines", "Asset library"],
    time: "2–3 weeks",
  },
  {
    n: "04",
    name: "Strategy",
    pitch: "The part that happens before a single pixel loads.",
    body: "A strategy is the work that happens before we open Figma. Who is this for? What do they need to believe before they act? What is the one thing this page has to do? We answer that first — messaging architecture, user flows, positioning — so that when we design, every single decision has a reason. Not a feeling. A reason.",
    deliverables: ["Positioning workshop", "Messaging hierarchy", "Sitemap & flow", "Competitor audit"],
    time: "1–2 weeks",
  },
];

export default function ServicesAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#0D0C0B",
        padding: "120px var(--px)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80 }}>
        <div>
          <span className="label" style={{ display: "block", marginBottom: 20, color: "#E8E2D9" }}>
            04 — What We Build
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
            Four disciplines.
            <br />
            <em style={{ fontStyle: "italic", color: "rgba(232,226,217,0.35)" }}>One team.</em>
          </h2>
        </div>
      </div>

      {/* Accordion rows */}
      <div style={{ borderTop: "1px solid rgba(232,226,217,0.06)" }}>
        {SERVICES.map((s, i) => (
          <div key={s.n} style={{ borderBottom: "1px solid rgba(232,226,217,0.06)" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "clamp(16px, 3vw, 32px)",
                  padding: "28px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "clamp(16px, 4vw, 60px)" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: open === i ? "#C8F135" : "rgba(232,226,217,0.3)",
                      transition: "color 0.3s",
                      minWidth: "24px"
                    }}
                  >
                    {s.n}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)",
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      color: open === i ? "#E8E2D9" : "rgba(232,226,217,0.75)",
                      transition: "color 0.3s",
                    }}
                  >
                    {s.name}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                  <span
                    className="hide-on-mobile"
                    style={{
                      fontFamily: "var(--font-playfair), serif",
                      fontStyle: "italic",
                      fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)",
                      color: "rgba(232,226,217,0.3)",
                      display: "block",
                      maxWidth: 320,
                      lineHeight: 1.4,
                      textAlign: "right"
                    }}
                  >
                    {s.pitch}
                  </span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  color: open === i ? "#C8F135" : "rgba(232,226,217,0.3)",
                  fontSize: 22,
                  lineHeight: 1,
                  fontWeight: 200,
                }}
              >
                +
              </motion.span>
                </div>
            </button>

            {/* Expanded content */}
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "clamp(32px, 5vw, 64px)",
                      padding: "0 0 var(--px) clamp(0px, 5vw, 92px)",
                    }}
                  >
                    {/* Left: body */}
                    <div style={{ flex: "1 1 min(100%, 400px)" }}>
                      <p
                        style={{
                          fontFamily: "var(--font-playfair), serif",
                          fontStyle: "italic",
                          fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)",
                          lineHeight: 1.7,
                          color: "rgba(232,226,217,0.6)",
                        }}
                      >
                        {s.body}
                      </p>
                    </div>
                    {/* Right: deliverables + time */}
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          color: "rgba(232,226,217,0.3)",
                          marginBottom: 20,
                        }}
                      >
                        Deliverables
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, marginBottom: 40 }}>
                        {s.deliverables.map((d, di) => (
                          <li
                            key={di}
                            style={{
                              fontFamily: "var(--font-inter), sans-serif",
                              fontSize: 14,
                              color: "rgba(232,226,217,0.55)",
                              marginBottom: 10,
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                            }}
                          >
                            <span style={{ color: "#C8F135", fontSize: 10 }}>◆</span>
                            {d}
                          </li>
                        ))}
                      </ul>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "8px 16px",
                          border: "1px solid rgba(200,241,53,0.2)",
                          color: "#C8F135",
                          fontFamily: "var(--font-mono)",
                          fontSize: 9,
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                        }}
                      >
                        ⟳ {s.time}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
