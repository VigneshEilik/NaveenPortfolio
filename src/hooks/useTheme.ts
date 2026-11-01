import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'theme'

function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

/**
 * Theme state. The initial class is set before React loads by
 * public/theme-init.js (prevents a flash of the wrong theme).
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => readStoredTheme() ?? systemTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  // Follow OS changes only while the visitor hasn't picked a theme explicitly.
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!query) return
    const onChange = (event: MediaQueryListEvent) => {
      if (!readStoredTheme()) setTheme(event.matches ? 'dark' : 'light')
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark'
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next)
      } catch {
        /* storage unavailable (private mode) — theme still applies for this visit */
      }
      return next
    })
  }, [])

  return { theme, toggleTheme }
}
