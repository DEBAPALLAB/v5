"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   CTAFinal — the closing punch.
   Full-screen, obsidian dark, acid glow, manifesto CTA.
   ───────────────────────────────────────────────────────── */

export default function CTAFinal() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0D0C0B",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "80px var(--px)",
      }}
    >
      <div className="grain" />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,241,53,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: 900,
        }}
      >
        <span className="label" style={{ display: "block", marginBottom: 40, color: "#E8E2D9", opacity: 0.4 }}>
          07 — Start a Project
        </span>

        <h2
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(3.5rem, 8vw, 8rem)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            marginBottom: 40,
          }}
        >
          <span style={{ color: "#E8E2D9" }}>Got a project?</span>
          <br />
          <em
            style={{
              fontStyle: "italic",
              color: "#C8F135",
            }}
          >
            Let&apos;s make it impossible to ignore.
          </em>
        </h2>

        {/* Vertical rule */}
        <div
          style={{
            width: 1,
            height: 60,
            backgroundColor: "rgba(232,226,217,0.12)",
            margin: "0 auto 40px",
          }}
        />

        <p
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontStyle: "italic",
            fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
            lineHeight: 1.7,
            color: "rgba(232,226,217,0.45)",
            maxWidth: 460,
            margin: "0 auto var(--px)",
          }}
        >
          Drop us a message. We&apos;ll get back within 24 hours. No agency jargon,
          no bloated proposals — just a straight conversation about what you need.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.a
            href="mailto:techlucide@gmail.com"
            whileHover={{ scale: 1.03, backgroundColor: "#d4ff4a" }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 44px",
              backgroundColor: "#C8F135",
              color: "#0D0C0B",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              textDecoration: "none",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            techlucide@gmail.com →
          </motion.a>

          <motion.a
            href="https://wa.me/916000942593"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ borderColor: "rgba(232,226,217,0.4)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 44px",
              border: "1px solid rgba(232,226,217,0.12)",
              color: "rgba(232,226,217,0.55)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              textDecoration: "none",
              cursor: "pointer",
              transition: "border-color 0.25s",
            }}
          >
            WhatsApp: +91 60009 42593
          </motion.a>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "24px var(--px) 40px",
          borderTop: "1px solid rgba(232,226,217,0.04)",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-playfair), serif",
              fontStyle: "italic",
              fontSize: 20,
              color: "rgba(232,226,217,0.55)",
              marginBottom: 4,
            }}
          >
            Lucide
          </p>
          <p className="label" style={{ color: "#E8E2D9", opacity: 0.2 }}>
            Design & Engineering Studio — India
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              display: "flex",
              gap: 24,
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            {["Twitter", "Dribbble", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                className="label"
                style={{ color: "#E8E2D9", opacity: 0.2 }}
              >
                {s}
              </a>
            ))}
          </div>
          <p className="label" style={{ color: "#E8E2D9", opacity: 0.15 }}>
            © 2025 Lucide. Built in India.
          </p>
        </div>
      </div>
    </section>
  );
}
