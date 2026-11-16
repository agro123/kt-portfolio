// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Flexible deployment target:
//   - User/organisation site or custom domain:  SITE_URL=https://example.com      BASE_PATH=/
//   - Project site (username.github.io/repo):    SITE_URL=https://user.github.io   BASE_PATH=/repo
// The GitHub Actions workflow fills both automatically from the Pages settings.
const site = process.env.SITE_URL || 'https://example.github.io';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'always',
  prefetch: { defaultStrategy: 'hover' },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
