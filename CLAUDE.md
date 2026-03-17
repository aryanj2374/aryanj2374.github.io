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

**Zero animation libraries.** No Framer Motion, no GSAP, no AOS. All animations are pure CSS keyframes or vanilla JS (canvas, cursor, IntersectionObserver).

---

## Design System — lapis.bet inspired, editorial minimal

**Philosophy:** No color. No gradients. No shadows. Pure typography, whitespace, and restraint. Editorial. Considered. If it looks like a Tailwind UI template, redesign it.

**Backgrounds (alternating rhythm):**
- Warm off-white: `#f5f4f0` — Hero, Work, Contact sections
- Pure white: `#ffffff` — Experience, About sections
- Dark: `#0a0a0a` — Footer only

**Colors:**
- Text primary: `#0a0a0a`
- Text secondary: `#6b6b6b`
- Text muted: `#9a9a9a`
- Border: `#e0deda` — always 1px, never thicker
- Accent: `#0a0a0a` (black is the only "accent")

**Typography:**
- `Inter` (400/500/700/900) — all body and display text
- `Space Mono` (400/700) — labels, tags, metadata, dates, monospace elements
- Base: 15px, line-height 1.6, 8px spacing grid
- Display headlines: Inter 900, `clamp()` sizing, letter-spacing `-0.03em`
- Section labels: Space Mono 11px, `#9a9a9a`, `letter-spacing: 0.15em`, `// PREFIX`

**Borders:** 1px solid `#e0deda`. Cards: no border-radius, no shadow.

**Buttons:**
- Primary: black fill (`#0a0a0a`), white text, pill-shaped (border-radius 999px), 48px height
- Secondary: transparent, 1px solid `#0a0a0a`, pill-shaped, 48px height
- Nav pill: 36px height variant

**CSS classes (defined in `src/index.css`):**
- `.btn-primary` / `.btn-secondary` / `.btn-nav` — button variants
- `.section-label` — Space Mono section eyebrow
- `.project-card` — card with hover border + `.view-link` reveal
- `.timeline-line` — 1px vertical line for experience section
- `.skill-item` — dot-prefixed skill row
- `.reveal` / `.reveal.visible` — scroll animation (triggered by IntersectionObserver in App.tsx)
- `.cursor-follower` / `.cursor-follower.is-hovering` — custom cursor
- `.marquee-track` — infinite horizontal scroll (hero bottom strip)
- `.word-animate` — word-by-word headline fade-up

**Animations (all pure CSS keyframes):**
- `wordFadeUp` — hero headline word-by-word stagger
- `fadeInUp` — hero subtext/buttons entrance
- `marqueeScroll` — infinite horizontal marquee

---

## Key Components

### Hero (`Hero.tsx`)
- Canvas particle field: 220 faint characters (`T L r ⌐ ¬ ┐ └ 0 1 · λ Σ ∂`) drifting downward. `position: absolute, right: 0, width: 65%`. Pure vanilla JS on `<canvas>`.
- Headline (`clamp(56px, 7.5vw, 108px)`, Inter 900) is `width: 75vw` — intentionally bleeds into the canvas area.
- Bottom marquee strip: 1px top/bottom borders, infinite scroll.

### App.tsx
- `CursorFollower`: 10px circle lerping to mouse (factor 0.1), scales to 32px on hover over links/buttons/cards. Uses `requestAnimationFrame`.
- Global `IntersectionObserver` on all `.reveal` elements — adds `.visible` class once, stagger via inline `transitionDelay`.

### Experience (`Experience.tsx`)
- Vertical timeline: 1px line at left, dots + dates positioned with `calc()`, content right-side.

### Work (`Work.tsx`)
- 3-column card grid on white cards, separated by 1px border gaps. "View project →" text hidden, revealed on hover via CSS `.view-link`.

### About (`About.tsx`)
- 60/40 grid split: bio paragraphs left, skill categories (dot-prefixed items) right.

### Contact (`Contact.tsx`)
- Click-to-copy email with tooltip. No form.

---

## No Routing
Single page. Navigation is anchor-link based. `scroll-padding-top: 64px` accounts for fixed navbar.
