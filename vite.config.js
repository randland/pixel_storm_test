import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    UnoCSS(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('Tres') && tag !== 'TresCanvas',
        },
      },
    }),
  ],
  server: {
    port: 3000,
    host: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
