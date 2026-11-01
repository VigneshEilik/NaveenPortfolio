import { describe, expect, it } from 'vitest'
import {
  countPlaceholders,
  field,
  hasPlaceholder,
  SHOW_PLACEHOLDERS,
  splitPlaceholders,
  stripPlaceholders,
  visible,
} from '../lib/placeholder'

describe('placeholder helpers', () => {
  it('runs tests in "live site" mode (placeholders hidden)', () => {
    expect(SHOW_PLACEHOLDERS).toBe(false)
  })

  it('detects placeholders', () => {
    expect(hasPlaceholder('[Agency Name]')).toBe(true)
    expect(hasPlaceholder('Plain text')).toBe(false)
  })

  it('splits mixed text in order', () => {
    expect(splitPlaceholders('Worked at [Agency] in [City].')).toEqual([
      { text: 'Worked at ', isPlaceholder: false },
      { text: '[Agency]', isPlaceholder: true },
      { text: ' in ', isPlaceholder: false },
      { text: '[City]', isPlaceholder: true },
      { text: '.', isPlaceholder: false },
    ])
  })

  it.each([
    ['Sentence one. [Add more here.]', 'Sentence one.'],
    ['[City], India', 'India'],
    ['[Mon YYYY] – Present', 'Present'],
    ['No placeholders', 'No placeholders'],
    ['[Only placeholder]', ''],
  ])('strips %j → %j', (input, expected) => {
    expect(stripPlaceholders(input)).toBe(expected)
  })

  it('hides unfinished short fields, with optional fallback', () => {
    expect(field('[Agency Name]')).toBeNull()
    expect(field('[Intern Job Title]', 'Internship')).toBe('Internship')
    expect(field('Real Agency')).toBe('Real Agency')
  })

  it('filters pure-placeholder list items', () => {
    expect(visible(['Real skill', '[Add tools you use]'])).toEqual(['Real skill'])
  })

  it('counts placeholders in nested content', () => {
    expect(countPlaceholders({ a: '[x] and [y]', b: ['[z]', 'ok'], c: { d: 1 } })).toBe(3)
  })
})
