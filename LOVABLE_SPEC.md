# LOVABLE.AI MASTER SPECIFICATION: LUCIDE V5 (MULTIPAGE GOD MODE)

**INSTRUCTIONS FOR LOVABLE:**
*Copy and paste the entire block below into the Lovable prompt box. This defines a complete, high-fidelity multipage agency architecture.*

---

### PROMPT START

**Role:** Lead Creative Developer & UX Architect.
**Goal:** Build "LUCIDE V5" — a high-fidelity, **multipage** digital experience with seamless transitions and a luxury editorial aesthetic.

#### 1. DESIGN SYSTEM: THE "OBSIDIAN" PROTOCOL
*   **Palette:** `Canvas`: #0D0C0B | `Type`: #E8E2D9 | `Accent`: #C8F135.
*   **Atmosphere:** Heavy grain, 1px technical grids, and deep shadows.
*   **Typography:** Playfair Display (Editorial Serif) + Inter (Sans) + DM Mono (Data).
*   **Navigation:** A permanent "Dock" navigation component at the bottom that persists across page changes.

#### 2. SITE ARCHITECTURE & ROUTING

**PAGE A: HOME (THE VOID)**
*   **The Insane Hero**: A 5-Layer Depth System.
    *   Layer 0: **Three.js Obsidian Monolith** (Floating 3D geometry).
    *   Layer 1: Parallax coordinate grids.
    *   Layer 2: Kinetic Headline with repulsion logic ("We design websites that make people *stop scrolling.*").
*   **The Scroll Experience**: Highlights of `/work` (Filmstrip) and `/philosophy` (Word-by-word reveal).

**PAGE B: WORK (THE ARCHIVE)**
*   **Layout**: A rigid, 3-column technical grid using 1px borders.
*   **Interaction**: Hovering a project "expands" the border in Acid Chartreuse. 
*   **Transitions**: Click-to-open logic where the project card "morphs" into the header of the case study page.

**PAGE C: PHILOSOPHY (THE MANIFESTO)**
*   **Core Feature**: An ultra-slow, scroll-driven manifesto. 
*   **Visuals**: Use the **Blur-Reveal system** (words transition from 20px blur to sharp) for the entire page.
*   **Editorial**: Large-scale pull quotes and founder's note with shifting annotations.

**PAGE D: CONTACT (THE BRIEF)**
*   **Form**: A "Terminal-style" multi-step form. 
*   **Inputs**: Minimalist underlines, monospaced labels. No standard input boxes.
*   **Feedback**: Submitting shows a "Data Transmission" animation in Acid Chartreuse.

#### 3. GLOBAL INTERACTION & PERFORMANCE
*   **Page Transitions**: Use **Framer Motion `AnimatePresence`**. Implement a "Shutter Transition" where a black screen with the Lucide logo wipes across the screen on every route change.
*   **Smooth Scroll**: Use **Lenis** globally across all routes.
*   **Technical Spec**: Use **Next.js App Router**, **Tailwind**, **Framer Motion**, and **Three.js**.

#### 4. PERFORMANCE & MOTION
- Maintain 60FPS. 
- Animations only trigger when elements enter the viewport.
- No placeholders. Generate sharp, provocative copy for every page.

---

### PROMPT END
