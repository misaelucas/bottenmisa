import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import UnoCSS from 'unocss/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE ?? 'https://misaa.dev',
  integrations: [
    react(),
    sitemap({ filter: (page) => !new URL(page).pathname.includes('/pdf/productivity/') }),
    UnoCSS({
      injectReset: true, 
    }),
  ],
});
