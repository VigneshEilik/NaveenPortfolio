/**
 * Placeholder handling.
 * Content text like "[Agency Name]" is a placeholder.
 *  - `npm run dev`: placeholders are highlighted so you can find them.
 *  - Production build (and tests): placeholders are removed, so recruiters
 *    never see unfinished brackets on the live site.
 */

export const SHOW_PLACEHOLDERS: boolean = import.meta.env.DEV && import.meta.env.MODE !== 'test'

const SEGMENT = /(\[[^\]]+\])/g

export function hasPlaceholder(text: string): boolean {
  return /\[[^\]]+\]/.test(text)
}

/** Splits text into plain and placeholder segments, preserving order. */
export function splitPlaceholders(text: string): { text: string; isPlaceholder: boolean }[] {
  return text
    .split(SEGMENT)
    .filter((part) => part.length > 0)
    .map((part) => ({ text: part, isPlaceholder: /^\[[^\]]+\]$/.test(part) }))
}

/** Removes placeholder segments and tidies the leftover punctuation/spacing. */
export function stripPlaceholders(text: string): string {
  return text
    .replace(/\s*\[[^\]]+\]/g, '')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[\s,–—·:-]+|[\s,–—·:-]+$/g, '')
    .trim()
}

/**
 * For short fields (company, dates, location): returns the text when it is
 * complete, otherwise `fallback` (or null) on the live site.
 */
export function field(text: string, fallback: string | null = null): string | null {
  if (!hasPlaceholder(text) || SHOW_PLACEHOLDERS) return text
  return fallback
}

/** Filters out list items that are pure placeholders (live site only). */
export function visible(items: string[]): string[] {
  if (SHOW_PLACEHOLDERS) return items
  return items.filter((item) => stripPlaceholders(item).length > 0 && !/^\[[^\]]+\]$/.test(item.trim()))
}

/** Counts placeholder strings anywhere inside a content value. */
export function countPlaceholders(value: unknown): number {
  if (typeof value === 'string') return (value.match(/\[[^\]]+\]/g) ?? []).length
  if (Array.isArray(value)) return value.reduce<number>((sum, item) => sum + countPlaceholders(item), 0)
  if (value && typeof value === 'object') {
    return Object.values(value).reduce<number>((sum, item) => sum + countPlaceholders(item), 0)
  }
  return 0
}
