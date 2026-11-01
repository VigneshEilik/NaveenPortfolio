import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import * as content from '../content'
import { countPlaceholders, SHOW_PLACEHOLDERS } from '../lib/placeholder'

/** "Back to top" button that appears after scrolling down. */
export function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <a
      href="#top"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed right-4 bottom-4 z-40 inline-flex size-12 items-center justify-center rounded-full bg-ink text-paper shadow-lg transition-all duration-500 hover:-translate-y-1 sm:right-6 sm:bottom-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </a>
  )
}

/** Development-only reminder of how many [placeholders] remain in src/content. */
export function PlaceholderBadge() {
  if (!SHOW_PLACEHOLDERS) return null
  const count = countPlaceholders({ ...content })
  if (count === 0) return null
  return (
    <p className="fixed bottom-4 left-4 z-40 rounded-full bg-mark px-4 py-2 text-xs font-semibold text-mark-ink shadow-lg">
      Dev only: {count} placeholder{count === 1 ? '' : 's'} left in src/content
    </p>
  )
}
