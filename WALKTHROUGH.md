# Lucide V5: Agency Website Walkthrough

## 01 — Vision & Aesthetic
Lucide V5 is a high-fidelity, editorial-style agency landing page designed to filter for high-tier founders. It moves away from generic "AI-generated" looks toward a raw, minimalist, yet technically precise aesthetic.

### Color Palette: "Obsidian, Bone, and Acid"
- **Obsidian (`#0D0C0B`)**: The deep black canvas.
- **Bone (`#E8E2D9`)**: The primary typographic color (soft off-white).
- **Acid Chartreuse (`#C8F135`)**: The single high-impact accent for CTAs and highlights.

### Design Inspiration
- **Forge**: Manifesto-driven copywriting, editorial spacing, and raw founder letters.
- **Ship**: Technical precision, coordinate grids (`N 21°09′ E 79°05′`), and rigid 1px border systems.

---

## 02 — Tech Stack
- **Framework**: Next.js 15 (App Router, Turbopack).
- **Animation**: Framer Motion (Scroll-driven, staggered reveals, RAF loops).
- **Smooth Scroll**: Lenis (Optimized for momentum and sync).
- **Typography**: 
  - `Playfair Display`: High-contrast editorial serif.
  - `Inter`: Swiss-style functional sans-serif.
  - `DM Mono`: Technical system-status monospaced labels.

---

## 03 — Core Systems & Interactions

### The Loading Narrative (`Loader.tsx`)
A 5-phase sequence that builds anticipation rather than just showing a spinner.
1. `Understanding the problem...`
2. `Questioning the brief...`
3. `Ignoring the brief...`
4. `Building something better...`
5. `LUCIDE`
- Features an acid-glow progress counter and a scanning light effect.

### Hero & Descender Fix (`page.tsx`)
The Hero uses a triple-line stagger reveal. 
- **Technical Challenge**: Standard `overflow: hidden` line wrappers clip descenders (g, y, p).
- **Solution**: `clipPath: "inset(-20% 0 -30% 0)"`. This masks the "entry" from above but extends the clipping boundary below the baseline to preserve the beauty of the Playfair Display serif.

### The Filmstrip (`WorkFilmstrip.tsx`)
A horizontal gallery that feels alive.
- **Auto-Scroll**: A continuous RAF (Request Animation Frame) loop drifts the cards at `0.1px/ms`.
- **Scroll Modulation**: Page scroll speeds up or slows down the drift (`scrollBonus`).
- **Mouse Spotlight**: Each card has a `radial-gradient` that tracks the mouse position relative to the card's bounding box, creating a glowing "cone of light" on hover.

### Manifesto Reveal (`ManifestoScroll.tsx`)
A word-by-word reveal system.
- **Interaction**: As the user scrolls, words materialize out of a `10px` blur while lifting `22px`.
- **Optimization**: Uses `{ clamp: true }` and tight scroll offsets (`start 0.9` -> `end 0.15`) to ensure the animation completes while the section is perfectly centered in the viewport.
- **Animated Underline**: "impossible to ignore" gets a `scaleX` draw-in that triggers exactly as the words land.

---

## 04 — Component Library

| Component | Description | Key Feature |
| :--- | :--- | :--- |
| `Dock` | Floating bottom navigation. | macOS-style magnification + Acid CTA. |
| `StatsBand` | High-contrast accent strip. | Parallax-ready full-bleed layout. |
| `ServicesAccordion` | Technical service breakdown. | 1px grid borders + technical "deliverables" pill. |
| `LetterSection` | Editorial "Founder's Note". | Parallax-shifting sidebar annotations. |
| `PricingTable` | Transparent tier-based grid. | DM Mono labels + "Build" tier highlighting. |
| `CTAFinal` | Closing punch. | Large-scale serif type + Acid radial glow. |

---

## 05 — Design Philosophy
The copy is provocative and direct. 
- *"We design websites that make people stop scrolling."*
- *"We don't manage expectations. We exceed them — and then send you the invoice."*
- *"Work that lives rent-free in your head."*

The goal is **Zero Placeholders**. Every piece of text and every coordinate is intentional, referencing Nagpur, India and the studio's technical roots.
