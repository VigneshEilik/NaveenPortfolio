import { render } from '@testing-library/react'
import axe from 'axe-core'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('Accessibility', () => {
  it('has no axe-core violations (light theme)', async () => {
    const { container } = render(<App />)
    const results = await axe.run(container, {
      // jsdom cannot compute colours or layout; contrast is checked manually against the design tokens.
      rules: { 'color-contrast': { enabled: false } },
    })
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)
    expect(summary).toEqual([])
  }, 20_000) // large page (looping card rows), so the full axe scan needs more time

  it('every image has alt text or is hidden from assistive technology', () => {
    const { container } = render(<App />)
    for (const img of container.querySelectorAll('img')) {
      expect(img.hasAttribute('alt')).toBe(true)
    }
    for (const svg of container.querySelectorAll('svg')) {
      const hidden = svg.closest('[aria-hidden="true"]') !== null
      expect(hidden, svg.outerHTML.slice(0, 80)).toBe(true)
    }
  })

  it('headings do not skip levels', () => {
    const { container } = render(<App />)
    const levels = [...container.querySelectorAll('h1, h2, h3, h4, h5, h6')].map((h) => Number(h.tagName[1]))
    let previous = 0
    for (const level of levels) {
      expect(level - previous).toBeLessThanOrEqual(1)
      previous = level
    }
  })

  it('every section has an accessible name', () => {
    const { container } = render(<App />)
    for (const section of container.querySelectorAll('section')) {
      const labelId = section.getAttribute('aria-labelledby')
      const named = labelId ? document.getElementById(labelId) !== null : !!section.getAttribute('aria-label')
      expect(named, section.id || section.outerHTML.slice(0, 60)).toBe(true)
    }
  })
})
