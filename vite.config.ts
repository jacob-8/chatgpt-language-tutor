import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { SvelteScopedUno } from 'svelte-scoped-uno'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.js'

export default defineConfig({
  plugins: [
    SvelteScopedUno({
      addReset: 'tailwind'
    }),
    svelte(),
    crx({ manifest })
  ],
})
