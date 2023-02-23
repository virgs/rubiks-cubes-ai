import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/rubiks-cubes-ai",
  assetsInclude: ["**/*.m4a", "**/*.json"],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js',
    }
  },
  build: {
    rollupOptions: {
    },
    outDir: 'docs',
    assetsDir: '.'
  },
})
