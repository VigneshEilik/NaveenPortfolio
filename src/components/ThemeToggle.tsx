import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export function ThemeToggle({ tone = 'default' }: { tone?: 'default' | 'onNavy' }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      aria-pressed={isDark}
      className={`group inline-flex size-11 items-center justify-center rounded-full transition-colors ${
        tone === 'onNavy' ? 'text-on-navy hover:bg-white/10' : 'text-ink-soft hover:bg-surface-muted hover:text-ink'
      }`}
    >
      <span className="transition-transform duration-500 group-hover:rotate-45">
        {isDark ? <Sun aria-hidden="true" className="size-[18px]" /> : <Moon aria-hidden="true" className="size-[18px]" />}
      </span>
    </button>
  )
}
