import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // CSS küçültücü --no: 2416501002 değerini 2416500000'e yuvarlıyor ve
    // --ton: mod(var(--no), 360) sonucu 0 (kırmızı) oluyor. Rengin bozulmaması için kapalı.
    cssMinify: false,
  },
})
