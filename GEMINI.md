# Project Skills & Guidelines

## Project: Varad Hospital — Static Website

A modern, clean, trustworthy static multipage website for **Varad Hospital**, a multispeciality hospital in Chikhali, Pimpri-Chinchwad, Pune, Maharashtra.

**Build Prompt:** See `prompt.md` for the complete project brief with skill references.  
**Client Info:** See `Varad_hospital_info.md` for verified hospital data.  
**Logo:** `logo.webp` — blue cross + green leaf + human figure motif. D:\Varad Hospital\logo.webp

### Tech Stack
- HTML5 + CSS3 + Vanilla JavaScript (static site, no frameworks)
- Mobile-first responsive design
- WCAG AA accessibility compliance

### Design Direction
- **Tone:** Calm, trustworthy, clean, premium, professional healthcare
- **Colors:** Blue (#1D6FB8) = trust, Green (#1FA15B) = health, Teal (#2CB7A5) = accent
- **Typography:** Poppins (headings) + Inter (body)
- **Animations:** Subtle CSS-only — fades, slide-ups, gentle hovers. No flashy effects.

---

## Installed Skills

The following design and development skills are installed in `.gemini/skills/` and should be referenced when building UI/UX:

### 🎨 Frontend Design (Anthropics)
- **Path:** `.gemini/skills/frontend-design/SKILL.md`
- **Purpose:** Create distinctive, production-grade frontend interfaces with bold aesthetic direction. Avoid generic AI aesthetics. Focus on typography, color, motion, spatial composition, and visual details.
- **Usage for this project:** Read for aesthetic principles. Adapt for healthcare context — prioritize clarity, readability, and calm over experimental design.

### 🎬 Motion / Framer Motion
- **Path:** `.gemini/skills/motion-framer/SKILL.md`
- **Purpose:** Production-ready animation library for React/JS. Use motion components, variants, gestures (hover/tap/drag), layout animations, AnimatePresence exit animations, spring physics, and scroll-based effects.
- **Usage for this project:** Reference for animation patterns only. Implement using CSS transitions and vanilla JS IntersectionObserver (no React in this project).

### 🏆 UI/UX Pro Max (NextLevelBuilder)
- **Path:** `.gemini/skills/ui-ux-pro-max/`
- **Sub-skills:**
  - `ui-ux-pro-max/SKILL.md` — Main skill: 50+ visual styles, 161 color palettes, 57 font pairings, 99 UX heuristics, 25 chart types
  - `banner-design/SKILL.md` — 22 art direction styles for banners (social, ads, web, print)
  - `brand/SKILL.md` — Brand identity consistency
  - `design-system/SKILL.md` — Token architecture for consistent design systems
  - `design/SKILL.md` — 67 UI styles, 161 palettes, 57 font pairings, 99 UX guidelines
  - `slides/SKILL.md` — Slide/presentation design
  - `ui-styling/SKILL.md` — shadcn/ui + Tailwind CSS + canvas-based visual design
- **Search Command:** `python3 .gemini/skills/ui-ux-pro-max/src/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain>`
- **Domains:** product, style, typography, color, landing, chart, ux
- **Usage for this project:**
  1. Run `--design-system` with "healthcare hospital" query before coding
  2. Use `--domain color` for palette validation
  3. Use `--domain typography` for font pairing confirmation
  4. Apply Quick Reference §1–§7 as pre-delivery checklist

### 🧵 Stitch Skills (Google Labs)
- **Path:** `.gemini/skills/stitch-design/`, `.gemini/skills/stitch-build/`, `.gemini/skills/stitch-utilities/`
- **stitch-design** — Design generation, prompt enhancement, design system management
- **stitch-build** — React components, Remotion videos, shadcn/ui integration
- **stitch-utilities** — Design docs, prompt enhancement, iterative build loops, taste design
- **Usage for this project:** Reference `stitch-utilities/skills/taste-design/SKILL.md` for premium design quality standards.

---

## Design Principles for This Project

When building any UI for this project:
1. **Read the frontend-design skill** for aesthetic direction — adapt for healthcare (calm > bold)
2. **Reference motion-framer skill** for animation patterns — implement with CSS only (no React)
3. **Run ui-ux-pro-max search** for data-driven style, color, typography, and UX recommendations
4. **Apply ui-ux-pro-max Quick Reference** §1–§7 as quality control checklist before delivery
5. **Never use generic AI aesthetics** — but also never use experimental/shocking design for healthcare
6. **Prioritize:** Trust → Clarity → Readability → Accessibility → Aesthetics

## Content Rules
- Only use verified data from `Varad_hospital_info.md`
- Never invent testimonials, awards, statistics, certifications, or reviews
- Never make medical claims
- Label all placeholders clearly with `[PLACEHOLDER]`
