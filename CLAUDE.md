# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, http://localhost:5173)
npm run build     # Type-check with tsc then build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build locally
```

## Architecture

Single-page portfolio site built with React 19 + TypeScript + Vite + Tailwind CSS v4.

**Data layer:** All portfolio content lives in `src/data/portfolio.ts` as exported constants. This is the single source of truth — update this file to change any displayed content.

**Component structure:** `App.tsx` composes all sections in order:
`Navbar → Hero → Experience → Work → About → Contact → Footer`

Each section is a standalone component in `src/components/`.

**Zero animation libraries.** No Framer Motion, no GSAP, no AOS. All animations are pure CSS keyframes/transitions or vanilla JS (canvas, IntersectionObserver).

---

## Design System — editorial minimal, Apple-gray monotone

**Philosophy:** Monotone restraint. Typography, whitespace, and 1px borders do the work. Berkeley blue (`#003262`) is the single sparing accent (nav active underline, card hover CTA, ~3 canvas mesh nodes). If it looks like a Tailwind UI template, redesign it.

**Backgrounds:**
- White: `#ffffff` — Hero, Work
- Light gray: `#f5f5f7` — Experience, About, card hover
- Black: `#000000` — Contact, Footer (footer separated by 1px `#1c1c1e` top border)

**Colors:**
- Text primary: `#1d1d1f`
- Text secondary: `#6e6e73`
- Text muted: `#86868b` (labels, dates — keep ≥ this for contrast; don't go lighter)
- Border: `#e5e5e5` light / `#d2d2d7` pills — always 1px
- Accent: `#003262` Berkeley blue, used sparingly
- On dark: `#8e8e93` muted, `#ffffff` hover

**Typography:**
- `Inter` (400/500/700/900) — body and display
- `Space Mono` (400/700) — labels, tags, dates, metadata
- Base: 15px, line-height 1.6
- Display headlines: Inter 900/700, `clamp()` sizing, letter-spacing `-0.02em`
- Section labels: Space Mono 11px, `#86868b`, `letter-spacing: 0.15em`, `// PREFIX`

**Buttons:** 6px border-radius (not pills). Primary: `#1d1d1f` fill, white text, 48px height. Secondary: transparent, 1px `#1d1d1f` border. Both have an animated `→` arrow (`.btn-arrow` translates on hover).

**Motion language:** ease curve `cubic-bezier(0.16, 1, 0.3, 1)` ("ease-out-quint") for reveals/arrows; 0.7s reveals with staggered inline `transitionDelay`; 150–250ms for hovers. All motion is disabled via a `prefers-reduced-motion` block at the bottom of `index.css` — keep new animations covered there.

**CSS classes (defined in `src/index.css`):**
- `.btn-primary` / `.btn-secondary` / `.btn-arrow` — buttons + hover arrow
- `.nav-link` / `.nav-link.active` — navbar links (blue active underline)
- `.logo-mark` — navbar logo (fills Berkeley blue on hover)
- `.scroll-progress` — 1px blue scroll-progress hairline at navbar bottom (scaleX driven by JS)
- `.reveal-word` — word-stagger reveal, driven by a parent `.reveal.visible` (Contact headline)
- `.section-label` — Space Mono section eyebrow
- `.hero-content` — hero text block (full-width below 640px)
- `.project-card-grid` / `.project-card-new` / `.card-num` / `.card-title` / `.card-tags` / `.card-desc` / `.card-cta` / `.cta-arrow` — project cards (3/2/1 columns at 900px/580px)
- `.tech-pill` — bordered mono tag
- `.timeline-gutter` / `.timeline-line` / `.timeline-progress` / `.timeline-entry` / `.timeline-node-dot` (+ `.live`) / `.timeline-date` / `.entry-index` — experience timeline (dates move above content below 640px)
- `.reveal` / `.reveal.visible` — scroll animation (IntersectionObserver in App.tsx)
- `.marquee-shell` / `.marquee-track` — hero bottom strip (pauses on hover)
- `.word-animate` — word-by-word headline fade-up
- `.email-dark` / `.contact-social-link` / `.footer-link` — dark-section links

---

## Key Components

### Hero (`Hero.tsx`)
- Full-viewport canvas "computational mesh": ~small geometric nodes (corners, squares, circles, crosses, dots) with proximity connections, density blobs centered right, focal knot, ≤3 Berkeley blue accent nodes. Pure vanilla JS via `useComputationalMesh`.
- Cursor-reactive: nodes within 130px of the (smoothed) pointer are gently repelled; gated behind `(hover: hover)` and reduced-motion checks.
- `useHeroParallax`: hero text translates down + fades as you scroll away.
- Perf invariants: node density/focal values are precomputed at spawn (`n.ld`/`n.lf` — never call `getDensity`/`getFocal` in the draw loop), the rAF loop pauses via IntersectionObserver when the hero scrolls out of view, and `prefers-reduced-motion` renders a single static frame.
- A radial white "fog" protects text legibility; below 640px the mesh dims globally (`meshMult`) and the fog recenters over the full-width text block.
- Eyebrow label + name (word-stagger) + tagline from `PERSONAL_INFO.tagline` + CTA buttons.
- Bottom marquee strip: 60px, 1px top border, infinite scroll, pauses on hover.

### App.tsx
- Global `IntersectionObserver` on all `.reveal` elements — adds `.visible` once; stagger via inline `transitionDelay`.

### Navbar (`Navbar.tsx`)
- Fixed 64px; on scroll gains frosted background (`rgba(255,255,255,0.85)` + backdrop blur) and 1px bottom border. Scroll-spy sets `.active` on nav links.

### Experience (`Experience.tsx`)
- "Traced path" timeline: a Berkeley-blue 1px line (`.timeline-progress`) fills down the gray track as you scroll (activation point = 55% of viewport, rAF-throttled scroll handler). Entries gain `.passed` when the path reaches their dot: gray dot → blue, mono `.entry-index` → blue. Roles with "Present" in the date get `.live` — a pulsing ring once passed. Reduced motion: path full, all passed, no pulse.
- Dates in left gutter (desktop) / above content (mobile). Per-entry IntersectionObserver reveals; stagger via `--stagger` custom property (never a blanket `transitionDelay` — it would delay hover/state transitions too).

### Work (`Work.tsx`)
- Card grid with 1px gaps; each card is its own `.reveal` with staggered delay; hover shifts number + CTA to Berkeley blue and nudges the `↗` arrow.

### About (`About.tsx`)
- 60/40 grid (stacks below 768px): bio paragraphs left, skill categories as `.tech-pill` clusters right, each category staggered.

### Contact (`Contact.tsx`)
- Black section, centered, click-to-copy email with "Copied!" tooltip. No form. Padding-based height (not 100vh).

---

## No Routing
Single page. Navigation is anchor-link based. `scroll-padding-top: 64px` accounts for fixed navbar.
