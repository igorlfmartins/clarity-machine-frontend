import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  preview: {
    allowedHosts: ['consultoria-de-negocios.up.railway.app']
  }
})

