import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repo = process.env.REPO_NAME || 'portfolioClarita'

export default defineConfig({
  plugins: [react()],
  base: process.env.GH_PAGES ? `/${repo}/` : '/'
})
