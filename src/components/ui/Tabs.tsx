import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

interface Tab {
  label: string
  content: ReactNode
}

/** Accessible tabs (WAI-ARIA pattern): arrow keys, Home/End, roving tabindex. */
export function Tabs({ tabs, label, tone = 'light' }: { tabs: Tab[]; label: string; tone?: 'light' | 'glass' }) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const glass = tone === 'glass'

  const focusTab = (index: number) => {
    const next = (index + tabs.length) % tabs.length
    setActive(next)
    refs.current[next]?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, () => void> = {
      ArrowRight: () => focusTab(active + 1),
      ArrowLeft: () => focusTab(active - 1),
      Home: () => focusTab(0),
      End: () => focusTab(tabs.length - 1),
    }
    const action = keys[event.key]
    if (action) {
      event.preventDefault()
      action()
    }
  }

  return (
    <div>
      <div role="tablist" aria-label={label} className={`flex gap-1 rounded-full p-1 ${glass ? 'bg-white/10' : 'bg-surface-muted'}`}>
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={onKeyDown}
            className={`min-h-9 flex-1 rounded-full px-3 text-xs font-semibold transition-all duration-300 ${
              active === i
                ? glass
                  ? 'bg-white text-navy-deep'
                  : 'bg-surface text-ink shadow-sm'
                : glass
                  ? 'text-white/75 hover:text-white'
                  : 'text-ink-muted hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={tab.label}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={active !== i}
          tabIndex={0}
          className="pt-5 motion-safe:animate-word-in"
        >
          {tab.content}
        </div>
      ))}
    </div>
  )
}
