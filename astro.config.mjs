import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import UnoCSS from 'unocss/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE ?? 'https://bottenmisa.vercel.app',
  integrations: [
    react(),
    sitemap(),
    UnoCSS({
      injectReset: true, 
    }),
  ],
});
