/**
 * Computes column spans for a bento grid so that every row is completely filled.
 * `wide` items prefer 2 columns; when a row would be left with a gap, the last
 * item(s) of that row are widened to close it.
 */
export function fillRowSpans(wide: boolean[], columns: number): number[] {
  const spans = wide.map((w) => (w ? Math.min(2, columns) : 1))
  let rowStart = 0
  let used = 0

  for (let i = 0; i < spans.length; i++) {
    const span = spans[i] ?? 1
    if (used > 0 && used + span > columns) {
      // Item doesn't fit: stretch the previous item to close the current row.
      spans[i - 1] = (spans[i - 1] ?? 1) + (columns - used)
      used = 0
      rowStart = i
    }
    used += span
    if (used === columns) {
      used = 0
      rowStart = i + 1
    }
  }

  // Close a partially filled last row by widening its items evenly from the end.
  let gap = used === 0 ? 0 : columns - used
  while (gap > 0 && rowStart < spans.length) {
    for (let i = spans.length - 1; gap > 0 && i >= rowStart; i--) {
      spans[i] = (spans[i] ?? 1) + 1
      gap -= 1
    }
  }
  return spans
}
