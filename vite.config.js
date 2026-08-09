import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative assets keep the static build portable across GitHub Pages,
  // Render, Vercel, and direct local file previews.
  base: './',
})
