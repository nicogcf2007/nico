import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  site: 'https://nicogcf2007.github.io',
  base: '/nico',
  integrations: [react()],
  build: {
    assets: '_assets',
  },
});
