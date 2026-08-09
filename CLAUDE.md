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

The design uses near-black technical surfaces, off-white editorial sections, muted steel-blue highlights, mono metadata, large Instrument Sans display type, fine grids, and clear system diagrams. Keep the visual language professional, direct, and precise rather than turning it into a generic developer template.

Animations use CSS and small browser APIs only. New motion must respect `prefers-reduced-motion`, avoid layout thrashing, and communicate something about the content. The hero pointer glow is updated through `requestAnimationFrame`; section reveals use the global `IntersectionObserver` in `App.tsx`.

## Key components

- `Hero.tsx`: kinetic headline, pointer-reactive light field, animated systems orbit, and capability ticker.
- `Work.tsx`: three project stories with code-native product visualizations: an XRPL ticket flow, six-stage research pipeline, and email-to-calendar workflow.
- `Experience.tsx`: keyboard-accessible tabbed experience console.
- `About.tsx`: technical skills table.
- `Contact.tsx`: high-contrast contact close with copy-email interaction.

## Deployment

The build is a standard static Vite output. `scripts/inline-static-build.mjs` inlines the compiled JavaScript and CSS so `dist/index.html` can also be opened directly from the filesystem. `.github/workflows/deploy-pages.yml`, `render.yaml`, and `vercel.json` cover GitHub Pages, Render, and Vercel respectively. Do not add platform-specific server output to the normal `npm run build` path.
