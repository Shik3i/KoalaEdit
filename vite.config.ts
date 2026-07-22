import { svelte } from '@sveltejs/vite-plugin-svelte'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    svelte(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['koalaedit-192.png', 'koalaedit-512.png'],
      manifest: {
        name: 'KoalaEdit',
        short_name: 'KoalaEdit',
        description: 'Flat Markdown Editor',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        icons: [
          { src: '/koalaedit-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/koalaedit-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
      },
    }),
  ],
  build: {
    target: 'esnext',
    cssMinify: true,
    sourcemap: false,
  },
  server: {
    port: 3000,
    strictPort: false,
  },
})
