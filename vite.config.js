import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Le proxy évite les problèmes CORS : /api -> back-end Express (port 5000)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:5000' },
  },
})
