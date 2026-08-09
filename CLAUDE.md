# CLAUDE.md

## Commands

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Architecture

Single-page portfolio built with React 19, TypeScript, Vite, and Tailwind CSS v4. All content lives in `src/data/portfolio.ts`; `src/App.tsx` composes the page sections in order. Navigation is anchor-based with no router.

## Current visual system

The design is an editorial “systems lab”: near-black technical surfaces, off-white editorial sections, acid green highlights, periwinkle supporting accents, mono metadata, large Instrument Sans display type, fine grids, and visible system diagrams. Keep the visual language bold and precise rather than turning it into a generic card-based developer template.

Animations use CSS and small browser APIs only. New motion must respect `prefers-reduced-motion`, avoid layout thrashing, and communicate something about the content. The hero pointer glow is updated through `requestAnimationFrame`; section reveals use the global `IntersectionObserver` in `App.tsx`.

## Key components

- `Hero.tsx`: kinetic headline, pointer-reactive light field, animated systems orbit, and capability ticker.
- `Work.tsx`: three project stories with code-native product visualizations: an XRPL ticket flow, multi-agent research network, and email-to-calendar workflow.
- `Experience.tsx`: keyboard-accessible tabbed experience console.
- `About.tsx`: working principles and capability index.
- `Contact.tsx`: high-contrast contact close with copy-email interaction.

The share card is `public/og.png` and its metadata is in `index.html`.
