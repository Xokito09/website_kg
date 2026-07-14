import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  define: {
    // Baked into the bundle at build time so the rendered HTML is identical
    // across the prerender pass (Puppeteer) and the user's browser. Computing
    // `new Date().getFullYear()` inside a React component used to cause the
    // React #418 hydration warnings on every page (Footer copyright line) —
    // Puppeteer's V8 and the user's browser don't always agree near year
    // boundaries or when system clocks drift.
    __BUILD_YEAR__: JSON.stringify(String(new Date().getFullYear())),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'prop-types': path.resolve(__dirname, './src/prop-types-shim.js'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing vendors from app code so a content deploy
        // doesn't invalidate the visitor's cached React/motion bytes.
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion": ["motion"],
        },
      },
    },
  },
})
