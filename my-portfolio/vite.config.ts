// my-portfolio/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isVercel = Boolean(process.env.VERCEL);
const isGhPages = Boolean(process.env.GITHUB_PAGES);

export default defineConfig({
  plugins: [react()],
  base: isVercel ? '/' : isGhPages ? '/Jeremiah-Zhiya/' : './'
});