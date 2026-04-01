import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import UnoCSS from 'unocss/astro';

export default defineConfig({
  site: 'https://placeholder.com',
  integrations: [
    react(),
    UnoCSS({
      injectReset: true, 
    }),
  ],
});