# Varad Hospital — Static Website Build Prompt

> **Role:** You are a senior product designer + frontend engineer + UX writer specialized in healthcare websites.  
> **Project:** Build a modern, simple, premium, static multipage website for **Varad Hospital**.

---

## Skill Activation

Before writing any code, activate the following installed skills in order:

### 1. Design System Generation — `.gemini/skills/ui-ux-pro-max/`

Run the design system generator to get data-driven recommendations for a healthcare website:

```bash
python3 .gemini/skills/ui-ux-pro-max/src/ui-ux-pro-max/scripts/search.py "healthcare hospital multispeciality clean trustworthy" --design-system -p "Varad Hospital"
```

Then supplement with targeted domain searches:

```bash
# Color palette for healthcare
python3 .gemini/skills/ui-ux-pro-max/src/ui-ux-pro-max/scripts/search.py "healthcare hospital medical" --domain color

# Typography pairing for professional healthcare
python3 .gemini/skills/ui-ux-pro-max/src/ui-ux-pro-max/scripts/search.py "professional clean healthcare readable" --domain typography

# Landing page structure for hospital
python3 .gemini/skills/ui-ux-pro-max/src/ui-ux-pro-max/scripts/search.py "hero contact trust medical" --domain landing

# UX guidelines for healthcare
python3 .gemini/skills/ui-ux-pro-max/src/ui-ux-pro-max/scripts/search.py "accessibility contrast touch navigation" --domain ux
```

Use the **Quick Reference checklist** from `.gemini/skills/ui-ux-pro-max/ui-ux-pro-max/SKILL.md` for pre-delivery verification — especially §1 Accessibility (CRITICAL), §2 Touch & Interaction (CRITICAL), and §5 Layout & Responsive (HIGH).

### 2. Aesthetic Direction — `.gemini/skills/frontend-design/SKILL.md`

Read and apply the **Frontend Design skill** for aesthetic direction:

- **Purpose:** Hospital website for patients and families in Chikhali/Pune
- **Tone:** Calm, trustworthy, clean, modern healthcare — NOT brutalist, NOT maximalist
- **Differentiation:** A small multispeciality hospital that feels premium and reassuring, not generic
- **Constraints:** Static HTML/CSS/JS, mobile-first, WCAG AA, fast loading

Apply the aesthetics guidelines — but **adapt them for healthcare context**:
- Typography: Use clean, highly readable sans-serif fonts (Poppins/Montserrat for headings, Inter for body) — healthcare demands clarity over novelty
- Color: Use the provided brand palette (blue = trust, green = health) — commit fully to it
- Motion: Subtle only — gentle fades, scroll reveals. No flashy effects
- Spatial Composition: Clean grid, generous whitespace, card-based layouts — not experimental asymmetry
- Backgrounds: Light, airy, clean — not dark themes or heavy textures

### 3. Animation Guidelines — `.gemini/skills/motion-framer/SKILL.md`

Reference the Motion/Framer Motion skill for animation patterns, but **apply with restraint** for this healthcare context:

- Use CSS-only animations (no React dependency — this is a static site)
- Hero section: subtle fade-in + slide-up on load
- Cards/sections: gentle `whileInView` style fade-up using `IntersectionObserver`
- Buttons: soft scale on hover (1.02–1.05 max)
- No parallax, no spring physics, no drag interactions
- Keep all transitions 200–400ms with `ease-out`
- Respect `prefers-reduced-motion`

### 4. UX Quality Control — `.gemini/skills/ui-ux-pro-max/ui-ux-pro-max/SKILL.md`

Apply the **Rule Categories by Priority** from the main UI/UX Pro Max skill:

| Priority | Category | Apply How |
|----------|----------|-----------|
| 1 | Accessibility (CRITICAL) | Contrast 4.5:1, alt text, keyboard nav, aria-labels, heading hierarchy |
| 2 | Touch & Interaction (CRITICAL) | Min 44×44px buttons, 8px spacing, cursor-pointer, loading feedback |
| 3 | Performance (HIGH) | WebP images, lazy loading, font-display: swap, critical CSS |
| 4 | Style Selection (HIGH) | Consistent healthcare style across all pages, SVG icons only |
| 5 | Layout & Responsive (HIGH) | Mobile-first, 12-column grid, no horizontal scroll, min 16px body |
| 6 | Typography & Color (MEDIUM) | Line-height 1.5–1.75, semantic color tokens via CSS variables |
| 7 | Animation (MEDIUM) | 150–300ms duration, transform/opacity only, prefers-reduced-motion |

---

## Client Information

**Refer to:** `Varad_hospital_info.md` for verified client data.

### Hospital Identity

- **Name:** VARAD HOSPITAL
- **Email:** varadhospital25@gmail.com
- **Address:** Gat Number 16/12, Rustic Paradise Commercial Wing, Dehu - Moshi Rd, Patilnagar, Chikhali, Pimpri-Chinchwad, Maharashtra 411062
- **Emergency Contact:** 9552218673
- **Pathology Contact:** 9623812423
- **Logo:** `logo.webp` (provided — blue cross + green leaf + human figure)
- **WhatsApp (floating button):** 9552218673

### Google Maps Embed

```html
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d469.68683431302367!2d73.80738800948595!3d18.686909307518174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b7112e6e0915%3A0xdd020d4ff1908f0c!2sVARAD%20HOSPITAL%20CHIKHALI!5e1!3m2!1sen!2sin!4v1779357926095!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
```

---

## Brand / UI System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1D6FB8` | Trust, structure, navigation, headers |
| `--color-secondary` | `#1FA15B` | Health, positive highlights, success |
| `--color-accent` | `#2CB7A5` | Secondary healthcare accent |
| `--color-bg` | `#F7FAFC` | Light background |
| `--color-white` | `#FFFFFF` | Card/section backgrounds |
| `--color-text` | `#0F172A` | Primary text |
| `--color-text-secondary` | `#475569` | Secondary/body text |
| `--color-border` | `#D8E2EA` | Card borders, dividers |
| `--color-highlight` | `#EAF6FF` | Soft highlight sections |
| `--color-emergency` | `#E53935` | Emergency labels/buttons ONLY |

### Typography

- **Headings:** Poppins (600–700 weight)
- **Body:** Inter (400 weight, 16px minimum)
- **Hierarchy:** H1 bold/large → H2/H3 clean/structured → Body highly readable
- **Line-height:** 1.5–1.75 for body text

### Spacing Scale

`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64` px — consistent across all components.

### Component Tokens

- Border radius: 12px–16px (moderate rounded corners)
- Shadows: `0 1px 3px rgba(0,0,0,0.08)` for cards, `0 4px 12px rgba(0,0,0,0.1)` on hover
- Section padding: 64px–80px vertical (premium spacing)

---

## Site Structure

Build a simple multipage static website with these pages:

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Landing page with all key sections |
| About | `about.html` | Hospital story, mission, team overview |
| Departments | `departments.html` | Specialities and treatment areas |
| Doctors | `doctors.html` | Full consultant panel with cards |
| Services | `services.html` | Facilities, equipment, treatments |
| Pathology | `pathology.html` | Lab services, test categories, contact |
| Contact | `contact.html` | Emergency info, map, form placeholder, all contacts |

### Shared Components

Build reusable HTML components (via includes or copy-paste structure):

- **Header** — Sticky, logo + nav + emergency CTA, hamburger on mobile
- **Footer** — Quick links, contacts, location, copyright
- **Floating Action Buttons** — WhatsApp chat (9552218673) + Call button, bottom-right
- **Mobile Nav Drawer** — Slide-in menu for mobile

---

## Home Page Content Structure

The home page (`index.html`) must include these sections in order:

1. **Hero Section**
   - Hospital name + tagline ("Your Trusted Multispeciality Healthcare Partner in Chikhali, Pune")
   - Professional healthcare stock image background (from Unsplash/Pexels — doctor-patient, hospital interior, consultation)
   - Emergency Call CTA (red, prominent) → tel:9552218673
   - Book Appointment CTA (primary blue) → cal.com placeholder
   - Optional: Doctor consultation timing highlight

2. **Quick Action Cards** (4-card grid)
   - 📅 Book Appointment → cal.com placeholder
   - 🚨 Emergency Call → tel:9552218673
   - 👨‍⚕️ View Doctors → doctors.html
   - 🔬 Pathology Services → pathology.html

3. **About Summary** — Brief hospital intro with "Learn More" link to about.html

4. **Departments Grid** — Card layout of specialities with icons

5. **Doctor Highlights** — Top 4–5 doctor cards with "View All" link

6. **Services & Facilities** — Icon grid of OPD, IPD, ICU, OT, X-Ray, ECG

7. **Pathology Section** — Lab overview with test categories

8. **Contact Section** — Phone, WhatsApp, map embed, emergency number

9. **Footer** — Full footer with quick links, contacts, location

---

## Doctor Data

Each doctor card must show: Name, Qualification, Department, Role (if any), Consultation Timings (if available), subtle "Book Consultation" CTA.

| # | Name | Qualification | Department | Role | Timing |
|---|------|---------------|------------|------|--------|
| 1 | Dr. Abhaysinha Thote | General Physician & Intensivist | Medicine | Physician & Medical Director | Mon–Sat 9AM–3PM, 5PM–10PM |
| 2 | Dr. Ghanshyam Ahire | M.B.B.S., T.D.D | Chest Physician & Intensivist | Consulting | Mon–Sat 6PM–9PM |
| 3 | Dr. Nilesh Jagdale | M.B.B.S., M.D | Medicine | — | — |
| 4 | Dr. Aa. M. Devmane | M.B.B.S., M.S | Surgery | — | — |
| 5 | Dr. Pankaj Bhalerao | M.B.B.S., M.S | Surgery | — | — |
| 6 | Dr. Niranjan Ganjevar | M.B.B.S., M.S Ortho | Orthopedic | — | — |
| 7 | Dr. Tushar Agarwal | M.B.B.S., M.S / M.C.H Ortho | Orthopedic | — | — |
| 8 | Dr. Gautam Jugal | M.B.B.S, M.D, D.N.B Cardiology | Cardiology | — | — |
| 9 | Dr. Sachin Hundekari | M.B.B.S, M.D, D.N.B Cardiology | Cardiology | — | — |
| 10 | Dr. Jimesh Mavani | M.B.B.S, M.S (OBS & GYN) | Obstetrics & Gynecology | — | — |
| 11 | Dr. Navnath Shelke | M.D (Scholar), Fellowship Preventive Diabetology (U.K.) | Administration | Administrator & Director | — |

---

## Services & Facilities

### Hospital Facilities
OPD · IPD · ICU · OT · Digital X-Ray · ECG

### Special Treatments
Heart Attack Treatment · Blood Pressure Management · Diabetes Treatment · Asthma Treatment · Chest & Lung Diseases · Poisoning Treatment · Snake Bite Treatment · Paralysis Treatment · Brain Disorders · Fits / Seizure Treatment · Orthopedic Surgery Theatre

### Pathology Laboratory — Varad Pathology Laboratory
**Specialities:** Hematology · Histopathology · Biochemistry · Microbiology · Immunology · Molecular Biology · Serology · Clinical Pathology  
**Additional Tests:** Blood Tests · Urine Tests · Sputum Tests · Other Diagnostic Tests  
**Facilities:** 24/7 Helpline · Home Collection Available · Cashless & Insurance Support  
**Pathology Contact:** 9623812423

---

## Content Rules

- Do NOT invent facts not provided above
- Do NOT hallucinate address, email, WhatsApp, reception number, timings, certifications, or map links
- Do NOT add fake testimonials, awards, ratings, reviews, accreditations, or statistics
- Do NOT make medical claims or use aggressive sales language
- Use only verified content from `Varad_hospital_info.md`
- Keep copy simple, professional, and patient-friendly
- Clearly label any placeholders (e.g., `[PLACEHOLDER: Update cal.com link]`)

---

## Image Guidelines

- Use premium healthcare stock images from Unsplash/Pexels
- Prefer: doctor-patient consultation, supportive care, hospital interiors, lab context
- Use bright, natural light — avoid dark, cold, generic stock
- Consistent image style across all pages
- Use `loading="lazy"` for below-fold images
- Provide descriptive `alt` text for every image
- Use `logo.webp` for the hospital logo

---

## Technical Specifications

### Tech Stack
- **HTML5** + **CSS3** + **Vanilla JavaScript**
- No frameworks, no build tools, no dependencies
- Static files ready for simple hosting (Netlify, Vercel, GitHub Pages, any web server)

### File Structure
```
├── index.html
├── about.html
├── departments.html
├── doctors.html
├── services.html
├── pathology.html
├── contact.html
├── css/
│   └── style.css          (all styles — design tokens + components + pages)
├── js/
│   └── main.js            (mobile nav, scroll animations, floating buttons)
├── images/
│   └── logo.webp          (provided logo)
└── GEMINI.md
```

### CSS Architecture
- Define all design tokens as CSS custom properties in `:root`
- Use BEM-style class naming or clean semantic classes
- Mobile-first media queries
- Single stylesheet for simplicity

### JavaScript
- Vanilla JS only — no jQuery, no libraries
- Features: mobile hamburger menu, smooth scroll, `IntersectionObserver` for scroll animations, floating WhatsApp/call buttons
- Keep it minimal and performant

---

## Responsive Breakpoints

| Breakpoint | Target |
|------------|--------|
| Default | Mobile (≤767px) |
| `768px` | Tablet |
| `1024px` | Desktop |
| `1440px` | Large desktop (max-width container) |

---

## SEO Requirements

Each page must have:
- Unique `<title>` tag with hospital name and page context
- `<meta name="description">` with local SEO keywords
- Proper `<h1>` → `<h6>` hierarchy (single H1 per page)
- Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Local SEO keywords naturally integrated: "Varad Hospital Pune", "hospital in Chikhali", "multispeciality hospital Pimpri-Chinchwad", "hospital near Chinchwad"

---

## Accessibility (WCAG AA)

- Minimum contrast ratio 4.5:1 for text
- All images have descriptive `alt` attributes
- Semantic HTML with proper heading order
- Keyboard navigation works for all interactive elements
- Visible focus states on all focusable elements
- Touch targets minimum 44×44px
- `prefers-reduced-motion` respected for all animations
- No auto-playing audio/video
- Skip-to-content link

---

## Pre-Delivery Checklist

Before finalizing, verify against the **UI/UX Pro Max Pre-Delivery Checklist** (`.gemini/skills/ui-ux-pro-max/ui-ux-pro-max/SKILL.md` — bottom section):

- [ ] All icons are SVG or clean icon font — no emojis in production
- [ ] Consistent design tokens (CSS variables) used everywhere
- [ ] All tappable elements ≥44×44px with visible hover/focus states
- [ ] Primary text contrast ≥4.5:1 verified in light background
- [ ] Safe areas respected for sticky header and floating buttons
- [ ] Tested visually at 375px, 768px, 1024px, 1440px
- [ ] All images have `alt` text and use `loading="lazy"` where appropriate
- [ ] Emergency CTA is visible, accessible, and prominent on every page
- [ ] No invented content — only verified client data
- [ ] Clean, production-ready, well-commented code

---

## Output Expectations

- Produce clean, production-ready HTML/CSS/JS
- Keep the design system 100% consistent across all 7 pages
- Reuse CSS tokens and component classes
- Use `[PLACEHOLDER]` labels where content is missing
- Structure for easy future updates by non-developers
- The site must feel: **trustworthy, calm, clean, approachable, premium, and professional**
