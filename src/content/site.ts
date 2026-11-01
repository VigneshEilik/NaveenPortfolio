/**
 * SITE & SEO SETTINGS
 * ------------------------------------------------------------------
 * This file feeds the page <title>, meta description, social-share
 * (Open Graph / Twitter) tags, structured data, sitemap.xml and robots.txt.
 *
 * ⚠ After your first deployment, replace `url` with your real address
 *   (e.g. "https://naveenkumar-m.vercel.app" or your own domain).
 *   The build prints a warning while it is still "https://example.com".
 */
export const site = {
  url: 'https://example.com',
  title: 'Naveenkumar M — Tourism & Travel Sales Professional',
  description:
    'Naveenkumar M — MBA in Tourism Management (Alagappa University) and Telesales Executive at LEGSGO Holidays. Domestic & international package sales, group tour management, itinerary planning and vendor coordination. Based in Karaikudi, Tamil Nadu.',
  locale: 'en_IN',
  /** 1200×630 image used when the link is shared on LinkedIn, WhatsApp, etc. */
  ogImage: '/og-image.png',
  themeColorLight: '#faf8f4',
  themeColorDark: '#0b1220',
  /** Extra facts for search-engine structured data (schema.org Person). */
  person: {
    worksFor: 'LEGSGO Holidays',
    alumniOf: 'Alagappa University',
    locality: 'Karaikudi',
    region: 'Tamil Nadu',
    country: 'IN',
    languages: ['English', 'Tamil'],
  },
} as const

/** Navigation entries. `id` must match a section id on the page. */
export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'approach', label: 'Approach' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const
