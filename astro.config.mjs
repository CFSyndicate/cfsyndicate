// astro.config.ts
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  integrations: [vue(), mdx()],
  site: isProd
    ? 'https://kru42.github.io'             // ← no `/cfsyndicate` here
    : 'http://localhost:4321',               // ← your local dev URL
  base: isProd
    ? '/cfsyndicate/'                        // ← the sub‑path GitHub Pages uses
    : '/',                                   // ← root in dev
  vite: {
    plugins: [tailwindcss()]
  }
});
