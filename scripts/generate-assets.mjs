/**
 * Regenerates raster assets from the HTML templates in scripts/asset-templates
 * using a locally installed Chrome or Edge (headless). Run: npm run assets
 * Set CHROME_PATH to override browser detection.
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const templates = join(root, 'scripts', 'asset-templates')

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)

const browser = candidates.find((p) => existsSync(p))
if (!browser) {
  console.error('No Chrome/Edge found. Set CHROME_PATH to your browser executable.')
  process.exit(1)
}

const common = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--force-device-scale-factor=1']
const url = (name) => pathToFileURL(join(templates, name)).href

function run(args) {
  execFileSync(browser, [...common, ...args], { stdio: 'ignore' })
}

run([`--screenshot=${join(root, 'public', 'og-image.png')}`, '--window-size=1200,630', url('og-image.html')])
run([`--screenshot=${join(root, 'public', 'apple-touch-icon.png')}`, '--window-size=180,180', url('apple-touch-icon.html')])
// Only create the placeholder resume if no resume exists — never overwrite a real one.
const resume = join(root, 'public', 'resume', 'Naveenkumar-M-Resume.pdf')
if (!existsSync(resume)) {
  run([`--print-to-pdf=${resume}`, '--no-pdf-header-footer', url('resume-placeholder.html')])
  console.log('Created placeholder resume PDF.')
}
console.log('Generated og-image.png and apple-touch-icon.png.')
