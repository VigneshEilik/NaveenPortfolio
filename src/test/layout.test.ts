import { describe, expect, it } from 'vitest'
import { monthsSince } from '../content/profile'
import { fillRowSpans } from '../lib/layout'

const rowsAreFull = (spans: number[], columns: number) => spans.reduce((a, b) => a + b, 0) % columns === 0

describe('fillRowSpans (bento grid fills every row)', () => {
  it.each([
    [[true, false, false, false, false, true, false, false], 4, [2, 1, 1, 1, 1, 2, 2, 2]],
    [[true, false, false, false, false, true, false, false], 2, [2, 1, 1, 1, 1, 2, 1, 1]],
    [[true, false, false, false, false, true], 4, [2, 1, 1, 1, 1, 2]],
    [[false, false, false], 2, [1, 1, 2]],
    [[false, true], 4, [1, 3]],
  ])('%j in %i columns → %j', (wide, columns, expected) => {
    const spans = fillRowSpans(wide, columns)
    expect(spans).toEqual(expected)
    expect(rowsAreFull(spans, columns)).toBe(true)
  })

  it('never exceeds the column count', () => {
    for (let n = 1; n <= 12; n++) {
      for (const columns of [2, 3, 4]) {
        const spans = fillRowSpans(Array.from({ length: n }, (_, i) => i % 3 === 0), columns)
        expect(Math.max(...spans)).toBeLessThanOrEqual(columns)
        expect(rowsAreFull(spans, columns)).toBe(true)
      }
    }
  })
})

describe('monthsSince (experience counter)', () => {
  const start = new Date(2026, 5, 1) // 1 June 2026
  it.each([
    [new Date(2026, 5, 15), 1],
    [new Date(2026, 10, 1), 5],
    [new Date(2026, 11, 1), 6],
    [new Date(2027, 5, 1), 12],
  ])('on %s → %i', (today, expected) => {
    expect(monthsSince(start, today)).toBe(expected)
  })
})
