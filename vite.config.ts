import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import WindiCSS from 'vite-plugin-windicss'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 3000
  },
  plugins: [
    vue(),
    WindiCSS(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
