/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { contact, profile } from './src/content/profile.ts'
import { site } from './src/content/site.ts'

const siteUrl = site.url.replace(/\/+$/, '')

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

/** Structured data so search engines understand who the page is about. */
function jsonLd(): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description: site.description,
    url: `${siteUrl}/`,
    image: `${siteUrl}/images/photos/headshot-256.webp`,
    worksFor: { '@type': 'Organization', name: site.person.worksFor },
    alumniOf: { '@type': 'CollegeOrUniversity', name: site.person.alumniOf },
    address: {
      '@type': 'PostalAddress',
      addressLocality: site.person.locality,
      addressRegion: site.person.region,
      addressCountry: site.person.country,
    },
    knowsLanguage: site.person.languages,
    sameAs: contact.socials.map((s) => s.href),
  }
  // Escape "<" so the JSON can never close the surrounding <script> element.
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/**
 * Fills SEO tokens in index.html from src/content/site.ts and emits
 * sitemap.xml + robots.txt, so all SEO settings live in one file.
 */
function seoPlugin(): Plugin {
  const tokens: Record<string, string> = {
    __SITE_TITLE__: escapeHtml(site.title),
    __SITE_DESCRIPTION__: escapeHtml(site.description),
    __SITE_URL__: escapeHtml(siteUrl),
    __OG_IMAGE__: escapeHtml(site.ogImage),
    __PERSON_NAME__: escapeHtml(profile.name),
    __LOCALE__: escapeHtml(site.locale),
    __THEME_LIGHT__: escapeHtml(site.themeColorLight),
    __THEME_DARK__: escapeHtml(site.themeColorDark),
  }

  return {
    name: 'portfolio-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        let output = html.replace('__JSON_LD__', jsonLd())
        for (const [token, value] of Object.entries(tokens)) {
          output = output.replaceAll(token, value)
        }
        return output
      },
    },
    generateBundle() {
      if (siteUrl.includes('example.com')) {
        this.warn('site.url in src/content/site.ts is still the placeholder "https://example.com" — update it after deploying.')
      }
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${escapeHtml(siteUrl)}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  build: {
    target: 'es2022',
    sourcemap: false,
    cssCodeSplit: false,
    // Never inline assets as data: URLs — the CSP only allows fonts/scripts from 'self'.
    assetsInlineLimit: 0,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    restoreMocks: true,
  },
})
