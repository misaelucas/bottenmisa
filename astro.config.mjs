import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import UnoCSS from 'unocss/astro';

export default defineConfig({
  site: process.env.SITE ?? 'https://bottenmisa.vercel.app',
  integrations: [
    react(),
    UnoCSS({
      injectReset: true, 
    }),
  ],
});
