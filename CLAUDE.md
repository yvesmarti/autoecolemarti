# CLAUDE.md — Auto-École Marti Project Memory

> Read this file at the start of every session. It contains everything known about this project.

---

## Project Overview

**Auto-École Marti** is a French driving school website based in Bayonne (64100), operating since 1962.
- Domain: `autoecolemarti.fr` (CNAME file at root)
- SIRET: 382 930 188 00018
- Address: 13 rue Marengo, Bayonne 64100
- Google Analytics: G-DEK5H3Z9DR

---

## Folder Structure

```
/autoecolemarti/
├── index.html                    # Homepage
├── reservation.html              # Booking form (Supabase)
├── merci.html                    # Thank-you page after booking
├── mentions-legales.html         # Legal notices
├── robots.txt                    # SEO directives
├── sitemap.xml                   # SEO sitemap
├── CNAME                         # Domain: autoecolemarti.fr
├── favicon.ico.png               # Brand icon
├── STYLE_GUIDE.md                # Design system documentation
├── CLAUDE.md                     # This file
│
├── css/
│   ├── fonts.css                 # Self-hosted font declarations (@font-face)
│   ├── index.css                 # Global styles: navbar, hero, cards, footer
│   ├── blog-index.css            # Blog listing: hero, filters, article cards
│   └── blog-article.css         # Blog article: hero, breadcrumbs, content, CTAs
│
├── fonts/                        # Self-hosted WOFF2 font files
│   ├── DM Sans (weights 300–700)
│   ├── Playfair Display (weights 400, 600, 700)
│   ├── Inter (weights 300, 400, 500)
│   └── DM Serif Display (weight 400)
│
├── formules/                     # Course/pricing detail pages
│   ├── conduite-accompagnee.html # Supervised driving (AAC), age 15+, €1,629 TTC
│   ├── permis-b-manuel.html      # Manual transmission license
│   ├── permis-b-automatique.html # Automatic transmission license
│   └── exemple.html              # Template/example page
│
├── blog/
│   ├── index.html                # Blog hub with 13 articles + category filters
│   ├── aac-apprentissage-anticipe-conduite.html
│   ├── boite-automatique-ou-manuelle.html
│   ├── comment-reussir-son-permis-conduire.html
│   ├── conduite-supervisee.html
│   ├── dangers-alcool.html
│   ├── distances-securite.html
│   ├── questions-pieges-code-route.html
│   ├── reflexes-quiz.html
│   ├── reflexes-urgence-conduite.html
│   ├── regles-permis-probatoire.html
│   ├── reussir-code-route-premier-coup.html
│   └── simulateur-ecoconduite.html
│
├── quizz/
│   ├── quizz_panneaux.html       # Interactive road sign quiz
│   ├── panneaux_data.js          # Database of 200+ French road signs
│   └── panneaux/                 # 100+ SVG road sign images
│
└── plaquettes/                   # Brochures/documents directory
```

---

## Design System

### Color Palette (Basque Identity)

| Role             | Name          | Hex       | Usage                          |
|------------------|---------------|-----------|--------------------------------|
| Primary Brand    | Basque Red    | `#d63031` | CTAs, buttons, primary accents |
| Secondary Brand  | Basque Teal   | `#00695c` | Secondary CTAs, success states |
| Accent           | Gold          | `#d4a853` | Premium highlights, tariffs    |
| Background       | Off-white     | `#fafaf8` | Primary page background        |
| Secondary BG     | Crème         | `#f5f0e8` | Cards, alternate sections      |
| Featured Card BG | Navy          | `#1e2a4a` | Featured pricing card          |
| Body Text        | Near-black    | `#0a0a0a` | All body text                  |
| Secondary Text   | Grey          | `#6b7280` | Metadata, descriptions         |
| Borders          | Light Grey    | `#e5e5e5` | Dividers, subtle borders       |

### Typography

- **H1, H2 (hero headings)**: Playfair Display, serif, italic for accent words
- **Body, Nav, UI, buttons**: DM Sans, sans-serif
- **Legal page only**: Inter + DM Serif Display
- **All fonts are self-hosted** (WOFF2, Latin + Latin-ext) — RGPD-compliant, no Google Fonts CDN

Fluid type scale uses `clamp()`:
- H1: `clamp(2rem, 5vw, 4.2rem)`

### Layout & Spacing

- Container max-width: **1200px** (global), **780px** (articles)
- Section padding: `6rem 2rem` desktop → `1.2rem` mobile
- Border-radius: `16px` standard, `10px` small, `50px` pills (buttons)
- Grid gaps: `1.5rem` standard
- Responsive breakpoints: `1024px` (tablet), `768px` (mobile)

### Buttons

- **Primary**: Red background `#d63031`, white text, pill shape, `box-shadow: 0 4px 20px rgba(red)`
- **Secondary**: Transparent, dark border
- Padding: `1rem 2rem`

### Animations

- Global easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` over `0.4s`
- Card hover: `translateY(-6px)` to `translateY(-8px)` + shadow increase
- Scroll animations: `IntersectionObserver`, opacity `0→1`, `translateY(30px→0)`
- Badge pulse: scale oscillation

---

## Pages & Sections

### Homepage (`index.html`)
1. **Navbar** — Fixed, transparent → blurred white on scroll, hamburger on mobile
2. **Hero** — 88vh, 2-col grid (text left, hero-card right), decorative color orbs
3. **Info bar** — 4 stats cards: students trained, success rate, years, affiliations
4. **Formations** — 3 pricing tiers (featured card in dark navy + gold)
5. **Tarifs/hourly rates** — Price per lesson hour
6. **File preparation** — Overlay/modal for required documents
7. **History/about** — "Since 1962" narrative section
8. **Testimonials** — Student reviews
9. **Contact/reservation** — CTA to booking form
10. **Footer** — Links, contact details, legal

### Blog (`blog/index.html` + 13 articles)
- Blog hub has featured article + 13 cards
- Category filters: Code de la route, Conduite, AAC, Tarifs, Réglementation, Conseils pratiques, Outils pédagogiques
- Each article has: category-colored hero gradient, breadcrumbs, reading time, callout boxes, related articles, CTA banner

### Formules / Course Pages
- Hero with price + age requirement
- Advantages grid
- Itemized tariff breakdown
- Step-by-step program
- Prerequisites & conditions
- Booking CTA
- FAQs

### Quiz (`quizz/quizz_panneaux.html`)
- Interactive road sign identification
- 200+ official French signs (CEREMA/IISR standard)
- Categories: danger, priorité, interdiction, obligation, information, service, temporaire
- Real-time feedback on answers

### Reservation (`reservation.html`)
- Supabase real-time integration
- Connection status indicator (red/green dot)
- Tabs for different reservation types
- Form validation

### Legal (`mentions-legales.html`)
- Uses Inter font instead of DM Sans (different from brand)
- SIRET, address, contact, legal disclaimers

---

## Technical Stack

- **Pure HTML/CSS/JS** — No frontend framework
- **Supabase** — Real-time backend for booking (reservation.html)
- **PDF.js** — Document viewer on formules pages
- **Google Analytics** — Tag ID: `G-DEK5H3Z9DR`
- **IntersectionObserver** — Scroll-triggered animations
- **SVG** — All road signs are SVG files in `quizz/panneaux/`

---

## Key Conventions

- All fonts self-hosted — never use Google Fonts CDN (RGPD compliance)
- Blog article hero backgrounds use per-category CSS color variables
- Callout boxes in articles are color-coded: info (green), warning (gold), success (light green), danger (red), left 4px border
- The featured pricing card uses navy `#1e2a4a` with gold `#d4a853` accents and a "POPULAIRE" badge
- Blog hero heights: `52vh` (shorter than homepage hero at `88vh`)
- Design reference: always check `STYLE_GUIDE.md` for detailed component specs

---

## Claude Code Integration & .claudeignore

**⚠️ Important for future debugging:** This project uses a `.claudeignore` file to optimize Claude Code performance.

### Why .claudeignore?

The following large/binary files are **intentionally ignored** to prevent timeouts and context bloat:

| Ignored Path | Size | Reason | Impact |
|---|---|---|---|
| `quizz/panneaux/` | 2.7 MB (294 SVG files) | Data files, never modified during development | Claude can't see these files |
| `fonts/` | 540 KB (WOFF2 binaries) | Binary assets, not touched during dev | Claude can't inspect these files |
| `quizz/panneaux_data.js` | 51 KB | Large static data file | Claude can't read this file |

**Total excluded:** ~3.3 MB (80% reduction in context size)

### What This Means

- ✅ Claude **CAN still modify** `quizz/quizz_panneaux.html` (the quiz page itself)
- ✅ Claude **CAN modify** CSS and HTML related to the quiz
- ❌ Claude **CANNOT see** the individual SVG files in `quizz/panneaux/`
- ❌ Claude **CANNOT inspect** the font files in `fonts/`
- ❌ Claude **CANNOT read** the full panneaux_data.js file

### If Claude Says "File Not Found"

If Claude responds with "I can't see that file" or "file not found", it's likely because:
1. The file is in `quizz/panneaux/` — this is expected and normal
2. The file is in `fonts/` — this is expected and normal
3. You need to describe the change differently (e.g., modify the HTML instead of the asset)

**This is not a bug — it's intentional to keep performance fast.**

### When to Update .claudeignore

If you add new large directories or binary files, update `.claudeignore` to exclude them. Never exclude:
- HTML, CSS, JS files (core code)
- CLAUDE.md, STYLE_GUIDE.md (documentation)
- robots.txt, sitemap.xml, CNAME (SEO config)
- Configuration files and documentation

---

## Owner Preferences

- Basque cultural identity is central to the brand (colors: red, teal/green)
- Clean, modern aesthetic with serif headings for elegance
- Self-hosted assets only (no external CDN dependencies)
- SEO-optimized (sitemap, canonical URLs, meta tags on every page)
- Educational content is a priority (13 blog articles, interactive quiz)
- Mobile-first responsive design
