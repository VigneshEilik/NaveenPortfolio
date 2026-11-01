# Naveenkumar M — Portfolio Website

Personal portfolio for **Naveenkumar M, Travel Sales Consultant (MBA, Tourism Management)**.
A fast, static website for sharing on LinkedIn, in job applications and in an email signature.

- **Stack:** React 19 · TypeScript 7 (strict) · Vite 8 · Tailwind CSS 4 · Lucide icons
- **Hosting:** static files (configured for Vercel; works on any static host)
- **No backend, database, tracking or third-party scripts.** Fonts are self-hosted.

---

## 1. Quick start

Requires **Node.js 20.19 or newer** (tested on Node 24).

```bash
npm install        # install dependencies
npm run dev        # start local site at http://localhost:5173
```

| Command                | What it does                                                        |
| ---------------------- | ------------------------------------------------------------------- |
| `npm run dev`          | Local development server with live reload                           |
| `npm run build`        | Type-check and create the production site in `dist/`                |
| `npm run preview`      | Serve the production build locally (http://localhost:4173)          |
| `npm run check`        | **Full quality gate:** typecheck → lint → tests → build → verify   |
| `npm test`             | Run the automated test suite once                                    |
| `npm run lint`         | Lint (oxlint, incl. React, jsx-a11y, TypeScript rules)               |
| `npm run audit:deps`   | Check dependencies for known vulnerabilities                         |
| `npm run assets`       | Regenerate social image, iOS icon and placeholder resume (needs Chrome/Edge) |

---

## 2. Updating your content (no coding needed)

All text lives in **`src/content/`**. Edit a file, save, and the site updates.

| File                       | Controls                                                    |
| -------------------------- | ----------------------------------------------------------- |
| `site.ts`                  | Website address, page title, Google/LinkedIn description    |
| `profile.ts`               | Name, headline, rotating words, stats, About text, email, phone, LinkedIn, resume |
| `skills.ts`                | Expertise section                                           |
| `approach.ts`              | "How I plan a journey" steps + scrolling services ribbon    |
| `destinations.ts`          | Destinations photo carousel                                 |
| `photos.ts`                | Photo library (file paths, sizes, alt text)                 |
| `experience.ts`            | Experience timeline                                         |
| `work.ts`                  | Itinerary case studies                                      |
| `education.ts`             | Education & certifications                                  |

**Placeholders:** any text in `[square brackets]` is a placeholder. Replace the whole thing, brackets included.

- In **`npm run dev`** placeholders are **highlighted in yellow**, and a badge in the bottom-left corner
  shows how many are left.
- On the **live site** (production build) placeholders are **hidden automatically**: unfinished list
  items, company names, dates and empty skill groups simply don't appear, so recruiters never see brackets.
  Fill them in to make that information show up.

### Status

Already filled in from the resume: name, roles at LEGSGO Holidays / College Group Tours / Trabliss Holidays,
education (MBA, B.Tech), skills, languages, location, email, phone, LinkedIn, portrait photo and the resume PDF.

Still to do:

- [ ] After deploying: set `url` in `src/content/site.ts` to your live address, then redeploy
- [ ] `work.ts` → replace the two **Sample** case studies with real trips you sold, and add the College Group Tours duration
- [ ] **Trip photos:** swap the stock case-study photos for your own (see `src/content/photos.ts`)
- [ ] `destinations.ts` → keep only destinations you actually sell
- [ ] `education.ts` → add certifications as you earn them
- [ ] When your resume changes: replace `public/resume/Naveenkumar-M-Resume.pdf` (same file name)

Months of experience in the current role are calculated automatically from `currentRoleStart` in `profile.ts`.

> Tip: search the project for `[` inside `src/content/` to find every remaining placeholder.

---

## 3. Deploying to Vercel (free)

1. Create a GitHub account and a new **private or public** repository (e.g. `portfolio`).
2. In this folder:
   ```bash
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
3. Go to <https://vercel.com>, sign in with GitHub → **Add New → Project** → import the repository.
   Vercel detects Vite automatically (settings are also in `vercel.json`). Click **Deploy**.
4. Copy your live URL (e.g. `https://portfolio-xyz.vercel.app`), put it in `src/content/site.ts` → `url`,
   commit and push. Vercel redeploys automatically.
5. Check the share preview with LinkedIn's **Post Inspector**: <https://www.linkedin.com/post-inspector/>.

HTTPS is automatic on Vercel. A custom domain can be added under **Project → Settings → Domains**.

> Other hosts (Netlify, Cloudflare Pages, GitHub Pages) work too: build command `npm run build`,
> output folder `dist`. Security headers in `vercel.json` must then be re-created in that host's format.

---

## 4. Project structure

```
├── index.html                 HTML shell; SEO tokens filled from src/content/site.ts
├── vercel.json                Hosting config + security headers (CSP, HSTS, …)
├── vite.config.ts             Build config + SEO plugin (meta tags, sitemap.xml, robots.txt)
├── public/
│   ├── resume/                Resume PDF (placeholder until replaced)
│   ├── images/photos/         Self-hosted responsive WebP photos (+ CREDITS.md)
│   ├── favicon.svg, apple-touch-icon.png, og-image.png, site.webmanifest
│   └── theme-init.js          Applies light/dark theme before first paint
├── scripts/
│   ├── generate-assets.mjs    Renders og-image / icon / placeholder PDF via headless Chrome
│   ├── asset-templates/       HTML sources for those assets
│   └── verify-build.mjs       Post-build checks on dist/
└── src/
    ├── content/               ← ALL editable content
    ├── components/
    │   ├── sections/          Hero, Ribbon, About, Expertise, Approach, Experience, Work, Destinations, Education, Contact
    │   ├── ui/                Section, RevealGroup, Tabs, Photo, SmartLink, Text, BrandIcons
    │   ├── BoardingPass.tsx   Hero profile card
    │   ├── Scenes.tsx         SVG postcard illustrations for case studies
    │   ├── Header.tsx, Footer.tsx, ThemeToggle.tsx, FloatingUi.tsx
    ├── hooks/                 useTheme, useActiveSection, useReveal, useMotion (counters, rotating words, spotlight)
    ├── lib/                   Link sanitising, placeholder helpers
    ├── test/                  Automated tests
    └── index.css              Design tokens (colours, fonts, motion) + Tailwind
```

**Design tokens** (colours for light and dark mode, fonts, easing) are defined once in `src/index.css`.

---

## 5. Security

| Control | Implementation |
| --- | --- |
| HTTPS | Automatic on Vercel; `Strict-Transport-Security` (2 years, preload-ready) + `upgrade-insecure-requests` |
| Content Security Policy | `default-src 'self'`, `script-src 'self'`, `style-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'` — **no `unsafe-inline` / `unsafe-eval`** |
| Other headers | `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY`, restrictive `Permissions-Policy`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy` |
| Safe links | All URLs pass through `safeHref()` (blocks `javascript:`, `data:`, protocol-relative); external links use `rel="noopener noreferrer"` |
| No unsafe HTML | No `dangerouslySetInnerHTML` / `innerHTML` / `eval` — enforced by lint rules and a test that scans the source |
| No secrets | The site needs no environment variables. `.env*` files are git-ignored. See `.env.example` for why `VITE_` variables must never hold secrets |
| Third parties | None: no analytics, no CDN scripts, no Google Fonts, no hot-linked images (fonts and photos are self-hosted) |
| Data collection | None. Contact is via `mailto:` — no form, so no personal data is stored or processed |
| Dependencies | Lockfile committed, `npm audit` script, minimal dependency set |

**Limitations (honest notes):**
- Security headers are applied by **Vercel** via `vercel.json`. `npm run preview` / `npm run dev` do not send them,
  and other hosts need equivalent configuration.
- `Strict-Transport-Security … preload` only takes effect browser-wide if you submit your custom domain at
  <https://hstspreload.org>; on a `*.vercel.app` address Vercel manages HSTS itself.
- A contact form was intentionally **not** built: doing it securely requires a server-side handler, spam
  protection and data-handling obligations. `mailto:` links avoid all of that.
- The email address is visible on the page (needed for recruiters), so it can be collected by spam bots.
  Consider a dedicated job-search email address.

---

## 6. Quality & testing

`npm run check` runs everything below and fails on any error:

- **TypeScript** strict mode (`strict`, `noUncheckedIndexedAccess`, …) for app, tests and build config
- **Lint:** oxlint with React, React Hooks, jsx-a11y, TypeScript, import and Vitest rules (0 warnings allowed)
- **Tests (Vitest + Testing Library + axe-core):** rendering of every section, navigation & mobile menu
  (incl. keyboard/Escape), theme switching & persistence, case-study cards, external-link safety,
  resume download, mailto/copy-email, automated accessibility audit, heading order, security headers,
  CSP compatibility of the HTML, content URL validation, secret scanning
- **Build verification:** required files present, SEO tokens replaced, no inline scripts/styles, no source maps, JS size budget

Responsive layouts and dark mode were checked visually in headless Chrome at desktop and mobile widths.
Colour contrast can't be measured in the jsdom test environment; the colour tokens were chosen to meet WCAG AA.

---

## 7. Design & interaction

Modern travel-UI style with **real photography and glassmorphism**:

- Full-bleed photo hero in a rounded frame, frosted-glass navbar, frosted **boarding-pass** profile card,
  rotating headline and a "booking bar" of animated career stats
- Photo bento skills grid, frosted "How I plan a journey" steps over a dusk-lake photo
- Photo case-study cards whose frosted panel expands into tabs (Brief / Itinerary / Services)
- Swipeable destinations carousel (scroll-snap + buttons) with glass labels
- Typography: Plus Jakarta Sans (headings), Inter (body), Instrument Serif italic (accents) — all self-hosted
- Glass styles (`.glass`, `.glass-dark`, `.glass-card` in `src/index.css`) fall back to solid panels where
  `backdrop-filter` is unsupported; dark overlays keep white text readable on every photo
- **Photos** are self-hosted responsive WebP files (`public/images/photos`, credits in `CREDITS.md`);
  the hero is preloaded, everything else lazy-loads, and each device downloads only the size it needs
- All motion is CSS/SVG + small hooks (no animation library) and is disabled for reduced-motion users

## 8. Accessibility & performance

- Semantic landmarks, skip link, one `h1`, labelled sections, visible focus rings, ≥ 44 px tap targets
- Keyboard-operable menu (Escape closes and returns focus), `aria-current` on the active section
- Respects **reduced-motion** preferences (animations and smooth scroll disabled)
- Light/dark theme follows the OS setting, with a manual toggle that is remembered
- Static build, single JS bundle (~83 KB gzipped), self-hosted variable fonts loaded per character set,
  lazy-loaded images with explicit dimensions, long-term caching for hashed assets
