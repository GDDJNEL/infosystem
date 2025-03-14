import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/infosystem/',
  publicDir: path.join(__dirname, 'public'),
  root: path.join(__dirname, 'src'),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:3001',
      '/webhook': 'http://localhost:3001'
    },
    host: true,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '.ngrok-free.app',
      '.ngrok.io'
    ]
  },
}) 