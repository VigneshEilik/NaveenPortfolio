/**
 * Link helpers. All URLs coming from content files pass through `safeHref`
 * so a typo can never produce a `javascript:` or `data:` link.
 */

const ALLOWED_PROTOCOLS = new Set(['https:', 'http:', 'mailto:', 'tel:'])

/** Returns the href if it is a safe protocol or a same-site path/anchor; otherwise "#". */
export function safeHref(href: string): string {
  const value = href.trim()
  if (value.startsWith('#') || (value.startsWith('/') && !value.startsWith('//'))) {
    return value
  }
  try {
    const url = new URL(value)
    return ALLOWED_PROTOCOLS.has(url.protocol) ? url.href : '#'
  } catch {
    return '#'
  }
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href.trim())
}

export function mailtoHref(email: string, subject?: string): string {
  const base = `mailto:${email.trim()}`
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base
}

/** Converts "+91 98765 43210" into "tel:+919876543210". */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
