import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ThemeToggle } from '../components/ThemeToggle'
import { THEME_STORAGE_KEY } from '../hooks/useTheme'
import { installMatchMedia } from './setup'

describe('Theme switching', () => {
  it('defaults to light when the OS prefers light', () => {
    render(<ThemeToggle />)
    expect(document.documentElement).not.toHaveClass('dark')
    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toHaveAttribute('aria-pressed', 'false')
  })

  it('follows the OS dark preference when nothing is saved', () => {
    installMatchMedia(true)
    render(<ThemeToggle />)
    expect(document.documentElement).toHaveClass('dark')
  })

  it('toggles dark mode and remembers the choice', async () => {
    const user = userEvent.setup()
    render(<ThemeToggle />)
    await user.click(screen.getByRole('button', { name: /switch to dark theme/i }))

    expect(document.documentElement).toHaveClass('dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark')
    const button = screen.getByRole('button', { name: /switch to light theme/i })
    expect(button).toHaveAttribute('aria-pressed', 'true')

    await user.click(button)
    expect(document.documentElement).not.toHaveClass('dark')
    expect(window.localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
  })

  it('a saved preference wins over the OS setting', () => {
    installMatchMedia(true)
    window.localStorage.setItem(THEME_STORAGE_KEY, 'light')
    render(<ThemeToggle />)
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('ignores invalid stored values', () => {
    window.localStorage.setItem(THEME_STORAGE_KEY, '<script>')
    render(<ThemeToggle />)
    expect(document.documentElement).not.toHaveClass('dark')
  })
})
