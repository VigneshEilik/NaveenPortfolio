/**
 * Post-build checks on dist/. Run after `npm run build`: npm run verify:build
 * Fails (exit 1) if the production output is missing required files or
 * contains something that would break the Content Security Policy.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const dist = resolve(import.meta.dirname, '..', 'dist')
const errors = []
const check = (condition, message) => condition || errors.push(message)

check(existsSync(dist), 'dist/ does not exist — run npm run build first')

if (existsSync(dist)) {
  for (const file of [
    'index.html',
    'robots.txt',
    'sitemap.xml',
    'favicon.svg',
    'og-image.png',
    'apple-touch-icon.png',
    'site.webmanifest',
    'theme-init.js',
    'resume/Naveenkumar-M-Resume.pdf',
    'credits.html',
  ]) {
    check(existsSync(join(dist, file)), `missing dist/${file}`)
  }

  const html = readFileSync(join(dist, 'index.html'), 'utf8')
  check(!/__[A-Z_]+__/.test(html), 'unreplaced __TOKEN__ placeholders in dist/index.html')
  check(/<title>[^<]{10,}<\/title>/.test(html), 'missing <title>')
  check(/<meta name="description" content="[^"]{50,}"/.test(html), 'missing meta description')
  check(/property="og:image" content="https?:\/\//.test(html), 'og:image must be an absolute URL')
  check(!/\sstyle=/.test(html), 'inline style attribute found (blocked by CSP)')

  for (const [, attrs, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (!attrs.includes('application/ld+json')) check(body.trim() === '', `inline script found: <script${attrs}>`)
  }

  const files = []
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name)
      if (statSync(full).isDirectory()) walk(full)
      else files.push(full)
    }
  }
  walk(dist)
  check(!files.some((f) => f.endsWith('.map')), 'source maps found in production output')
  check(!files.some((f) => /\.env/.test(f)), '.env file found in production output')

  for (const css of files.filter((f) => f.endsWith('.css'))) {
    check(!/url\(\s*["']?data:(font|application)/.test(readFileSync(css, 'utf8')), `inlined data: font in ${css} (blocked by CSP font-src)`)
  }

  const js = files.filter((f) => f.endsWith('.js') && !f.endsWith('theme-init.js'))
  const totalJs = js.reduce((sum, f) => sum + statSync(f).size, 0)
  console.log(`JS total: ${(totalJs / 1024).toFixed(1)} KiB (uncompressed) across ${js.length} file(s)`)
  check(totalJs < 400 * 1024, `JS bundle too large: ${(totalJs / 1024).toFixed(1)} KiB`)
}

if (errors.length) {
  console.error('Build verification FAILED:\n - ' + errors.join('\n - '))
  process.exit(1)
}
console.log('Build verification passed.')
