import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach } from 'vitest'

const noop = () => {}

/** jsdom has no matchMedia — install a stub that reports `matches` for every query. */
export function installMatchMedia(matches = false) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string): MediaQueryList => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: noop,
      removeEventListener: noop,
      addListener: noop,
      removeListener: noop,
      dispatchEvent: () => false,
    }),
  })
}

beforeEach(() => {
  installMatchMedia(false)
  window.localStorage.clear()
  document.documentElement.className = ''
})

afterEach(() => {
  cleanup()
})
