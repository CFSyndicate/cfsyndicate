// astro.config.ts
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  integrations: [vue(), mdx()],
  site: isProd
    ? 'https://cfsyndicate.github.io'
    : 'http://localhost:4321',
  base: "cfsyndicate",
  vite: {
    plugins: [tailwindcss()]
  }
});
