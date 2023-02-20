import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://filmvisarna-backend.emanueljg.com',
        // TODO fråga thomas mer exakt vad dessa gör
        changeOrigin: true,
        secure: false
      }
    }
  }
})
