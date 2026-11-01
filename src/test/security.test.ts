import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { caseStudies, certifications, contact, profile } from '../content'
import { safeHref } from '../lib/links'

const root = process.cwd()

interface VercelConfig {
  headers: { source: string; headers: { key: string; value: string }[] }[]
}

const vercel = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8')) as VercelConfig
const globalHeaders = new Map(
  (vercel.headers.find((h) => h.source === '/(.*)')?.headers ?? []).map((h) => [h.key.toLowerCase(), h.value]),
)

describe('Security headers (vercel.json)', () => {
  it('sets a strict Content Security Policy', () => {
    const csp = globalHeaders.get('content-security-policy') ?? ''
    expect(csp).toContain("default-src 'self'")
    expect(csp).toContain("script-src 'self'")
    expect(csp).toContain("object-src 'none'")
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("base-uri 'self'")
    expect(csp).not.toMatch(/unsafe-inline|unsafe-eval|\*/)
  })

  it.each([
    ['x-content-type-options', 'nosniff'],
    ['referrer-policy', 'strict-origin-when-cross-origin'],
    ['x-frame-options', 'DENY'],
  ])('sets %s', (key, value) => {
    expect(globalHeaders.get(key)).toBe(value)
  })

  it('sets HSTS and a restrictive Permissions-Policy', () => {
    expect(globalHeaders.get('strict-transport-security')).toMatch(/max-age=\d{8,}/)
    const permissions = globalHeaders.get('permissions-policy') ?? ''
    for (const feature of ['camera=()', 'microphone=()', 'geolocation=()', 'payment=()']) {
      expect(permissions).toContain(feature)
    }
  })
})

describe('HTML shell', () => {
  const html = readFileSync(resolve(root, 'index.html'), 'utf8')

  it('contains no inline executable scripts (CSP-compatible)', () => {
    const executable = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].filter(
      ([, attrs = '']) => !attrs.includes('application/ld+json'),
    )
    expect(executable.length).toBeGreaterThan(0)
    expect(executable.map(([, , body = '']) => body.trim())).toEqual(executable.map(() => ''))
  })

  it('contains no inline style attributes (blocked by CSP)', () => {
    expect(html).not.toMatch(/\sstyle=/)
  })
})

describe('Content safety', () => {
  it('all content URLs are safe https links', () => {
    const urls = [
      ...contact.socials.map((s) => s.href),
      ...caseStudies.flatMap((s) => (s.link ? [s.link.href] : [])),
      ...certifications.flatMap((c) => (c.credentialUrl ? [c.credentialUrl] : [])),
    ]
    for (const url of urls) {
      expect(url).toMatch(/^https:\/\//)
      expect(safeHref(url)).not.toBe('#')
    }
  })

  it('local asset paths stay inside the site', () => {
    const paths = [profile.resumePath, profile.photo, ...caseStudies.map((s) => s.photo?.src ?? null)].filter(
      (p): p is string => p !== null,
    )
    for (const path of paths) {
      expect(path).toMatch(/^\/[^/]/)
      expect(path).not.toContain('..')
    }
  })

  it('source code contains no secrets, VITE_ env usage or unsafe HTML APIs', () => {
    const files: string[] = []
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const full = join(dir, name)
        if (statSync(full).isDirectory()) walk(full)
        else if (/\.(ts|tsx)$/.test(name) && !full.includes(`${join('src', 'test')}`)) files.push(full)
      }
    }
    walk(resolve(root, 'src'))
    expect(files.length).toBeGreaterThan(5)

    const forbidden = [
      /dangerouslySetInnerHTML/,
      /\.innerHTML\s*=/,
      /\beval\(/,
      /new Function\(/,
      /import\.meta\.env\.VITE_/,
      /(api[_-]?key|secret|password|token)\s*[:=]\s*['"][^'"]{8,}/i,
      /sk-[A-Za-z0-9]{20,}/,
      /AKIA[0-9A-Z]{16}/,
    ]
    for (const file of files) {
      const source = readFileSync(file, 'utf8')
      for (const pattern of forbidden) {
        expect(pattern.test(source), `${pattern} in ${file}`).toBe(false)
      }
    }
  })
})
