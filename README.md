# Aryan Jain Portfolio

Personal portfolio site built with React + Vite. It pairs a restrained editorial design with interactive experience navigation and project-specific product visualizations.

## Tech Stack
- React
- Vite
- TypeScript
- CSS (custom motion and design system)

## Local Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

Open `dist/index.html` to view the production build directly. Its JavaScript and CSS are inlined so it also works when opened as a local file. Opening the root `index.html` after a build redirects to that compiled page; during development, use `npm run dev`.

## Deployment

- **GitHub Pages:** the included workflow builds and deploys `dist` on every push to `main`. Select **GitHub Actions** as the Pages source in the repository settings.
- **Render:** create the site from the included `render.yaml` Blueprint.
- **Vercel:** import the repository; `vercel.json` supplies the Vite build and static output settings.

## Notes
- Portfolio content lives in `src/data/portfolio.ts`.
- Entry point: `src/main.tsx`.
- The production output is a standard static Vite bundle in `dist/`.
