import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@pinia/nuxt',],
  srcDir: 'src/',
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
  imports: {
    dirs: ['src/shared/api', 'src/shared/lib']
  },
  css: ['@/app/styles/main.css'],
})