// @ts-check
import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';

const PRODUCTION_SITE = 'https://v-thomas.com';

// Preview deploys set SITE_URL to that deployment's origin. Production builds,
// including pushes to main, always keep the public site origin.
function siteOrigin() {
  const onMain = process.env.GITHUB_REF === 'refs/heads/main';
  const fromEnv = onMain ? '' : process.env.SITE_URL?.trim();
  if (!fromEnv) return PRODUCTION_SITE;
  const url = new URL(fromEnv);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error(`SITE_URL must be an http(s) origin, got ${fromEnv}`);
  }
  return url.origin;
}

// https://astro.build/config
export default defineConfig({
  site: siteOrigin(),
  integrations: [markdoc({ allowHTML: true })],
});
