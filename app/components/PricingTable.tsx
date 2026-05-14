"use client";

import { motion } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   PricingTable — clean, editorial 3-column grid.
   ───────────────────────────────────────────────────────── */

const PLANS = [
  {
    id: "01",
    tier: "Launch",
    tagline: "For founders who need to exist on the internet. Properly.",
    body: "You've been putting this off. You know you need it. Let's get it done in two weeks and stop losing people to your competitor's website.",
    features: ["Up to 5 pages", "Mobile-first design", "Basic SEO + meta", "Contact form"],
    timeline: "2 weeks",
    price: "₹25,000",
    cta: "Start the clock →",
    highlight: false,
  },
  {
    id: "02",
    tier: "Build",
    tagline: "For brands who are serious about their digital presence.",
    body: "This is the one most clients choose. Full brand treatment, animations, CMS — the whole thing. Done once. Done right.",
    features: [
      "Up to 10 pages",
      "Full brand system",
      "Custom animations",
      "CMS integration",
      "30-day post-launch support",
    ],
    timeline: "4 weeks",
    price: "₹65,000",
    cta: "Let's build →",
    highlight: true,
  },
  {
    id: "03",
    tier: "Scale",
    tagline: "For products and platforms that don't fit in a box.",
    body: "Complex builds. SaaS interfaces. Marketing sites that need to do heavy lifting. We scope it together, price it honestly, and ship it.",
    features: [
      "Everything in Build",
      "Web app / SaaS UI",
      "Advanced integrations",
      "Retainer available",
    ],
    timeline: "Custom",
    price: "Custom",
    cta: "Start the conversation →",
    highlight: false,
  },
];

export default function PricingTable() {
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "#0D0C0B",
        padding: "120px var(--px)",
        borderTop: "1px solid rgba(232,226,217,0.06)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 80 }}>
        <span className="label" style={{ display: "block", marginBottom: 20, color: "#E8E2D9" }}>
          06 — Pricing
        </span>
        <h2
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            fontWeight: 400,
            lineHeight: 1,
            color: "#E8E2D9",
            letterSpacing: "-0.02em",
            maxWidth: 700,
          }}
        >
          No surprises.
          <br />
          <em style={{ fontStyle: "italic", color: "rgba(232,226,217,0.3)" }}>
            No retainers you forget to cancel.
          </em>
        </h2>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
          gap: 1,
          backgroundColor: "rgba(232,226,217,0.06)",
        }}
      >
        {PLANS.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              backgroundColor: plan.highlight ? "#C8F135" : "#0D0C0B",
              color: plan.highlight ? "#0D0C0B": "#E8E2D9",
              padding: "48px 40px",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.2em",
                opacity: 0.45,
                marginBottom: 20,
              }}
            >
              {plan.id}
            </div>

            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontSize: 36,
                fontWeight: 400,
                marginBottom: 12,
                letterSpacing: "-0.02em",
              }}
            >
              {plan.tier}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontStyle: "italic",
                fontSize: 14,
                lineHeight: 1.5,
                opacity: 0.6,
                marginBottom: 24,
                minHeight: 44,
              }}
            >
              {plan.tagline}
            </p>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: 13,
                lineHeight: 1.7,
                opacity: 0.55,
                marginBottom: 40,
                flexGrow: 0,
              }}
            >
              {plan.body}
            </p>

            {/* Features */}
            <ul style={{ listStyle: "none", padding: 0, flex: 1, marginBottom: 40 }}>
              {plan.features.map((f, fi) => (
                <li
                  key={fi}
                  style={{
                    fontFamily: "var(--font-inter), sans-serif",
                    fontSize: 13,
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    opacity: 0.7,
                  }}
                >
                  <span
                    style={{
                      color: plan.highlight ? "#0D0C0B": "#C8F135",
                      fontSize: 8,
                      opacity: 1,
                    }}
                  >
                    ◆
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div
              style={{
                borderTop: `1px solid ${plan.highlight ? "rgba(13,12,11,0.12)": "rgba(232,226,217,0.08)"}`,
                paddingTop: 32,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 24,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-playfair), serif",
                    fontSize: 28,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    opacity: 0.4,
                    textTransform: "uppercase",
                  }}
                >
                  {plan.timeline}
                </span>
              </div>

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=techlucide@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "14px 0",
                  textAlign: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  backgroundColor: plan.highlight ? "#0D0C0B": "rgba(232,226,217,0.06)",
                  color: plan.highlight ? "#C8F135" : "rgba(232,226,217,0.65)",
                  border: `1px solid ${plan.highlight ? "transparent": "rgba(232,226,217,0.1)"}`,
                  transition: "all 0.25s ease",
                  textDecoration: "none",
                }}
              >
                {plan.cta}
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.15em",
          color: "rgba(232,226,217,0.2)",
          textTransform: "uppercase",
          marginTop: 32,
          lineHeight: 1.8,
        }}
      >
        All prices in INR — USD pricing on request. 50% upfront, 50% on delivery. You own everything.
      </p>
    </section>
  );
}
