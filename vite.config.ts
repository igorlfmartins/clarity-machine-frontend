import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      }
    }
  },
  preview: {
    allowedHosts: ['consultoria-de-negocios.up.railway.app'],
    headers: {
      "Content-Security-Policy": "default-src 'self' https: wss:; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob:; style-src 'self' 'unsafe-inline'; connect-src 'self' https: wss: http://localhost:* ws://localhost:*;"
    }
  }
})

