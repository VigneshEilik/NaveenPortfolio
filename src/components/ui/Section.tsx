import type { ReactNode } from 'react'
import type { Photo as PhotoData } from '../../content'
import { useReveal } from '../../hooks/useReveal'
import { Photo } from './Photo'

interface SectionProps {
  id: string
  index: string
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
  /** Background photo for the full-width rounded panel. */
  photo?: PhotoData
  /**
   * `light` — photo softly washed with the page colour (dark text; adapts to dark mode).
   * `dark`  — photo under a deep navy overlay (white text).
   */
  tone?: 'light' | 'dark'
}

/** Shared content width for every section, the hero, header and footer. */
export const CONTAINER = 'mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-14'

/**
 * Uses overflow: clip (not hidden) so position: sticky keeps working inside the panel.
 *
 * Full-width rounded section panel with a background photo, numbered glass eyebrow,
 * large heading (serif-italic accents) and an intro on the right.
 */
export function Section({ id, index, eyebrow, title, intro, children, photo, tone = 'light' }: SectionProps) {
  const { ref, revealProps } = useReveal<HTMLDivElement>()
  const headingId = `${id}-heading`
  const dark = tone === 'dark'

  return (
    <section id={id} aria-labelledby={headingId} className="px-2 py-1 sm:px-3 sm:py-1.5">
      <div
        className={`relative isolate overflow-clip rounded-[28px] py-20 sm:rounded-[40px] sm:py-28 ${
          dark ? 'bg-navy-deep text-white' : 'bg-surface-muted'
        }`}
      >
        {photo && (
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            {/* The photo stays fixed while the section's content scrolls over it. */}
            <div className="sticky top-0 h-[100svh] max-h-full">
              <Photo photo={photo} sizes="100vw" decorative className="size-full object-cover" />
            </div>
            {dark ? (
              <>
                <div className="absolute inset-0 bg-[#06122b]/72" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#06122b]/50 via-transparent to-[#06122b]/70" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-paper/72" />
                <div className="absolute inset-0 bg-gradient-to-b from-paper/75 via-paper/10 to-paper/60" />
              </>
            )}
          </div>
        )}

        <div ref={ref} {...revealProps} className={`relative ${CONTAINER}`}>
          <div className="mb-12 grid gap-6 sm:mb-16 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div data-reveal-item className="lg:col-span-7">
              <p
                className={`inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase ${
                  dark ? 'glass text-white' : 'glass-card text-accent'
                }`}
              >
                <span className="tabular-nums opacity-70">{index}</span>
                <span aria-hidden="true" className="h-3 w-px bg-current opacity-40" />
                {eyebrow}
              </p>
              <h2
                id={headingId}
                className={`mt-6 font-display text-4xl leading-[1.05] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem] ${
                  dark ? 'text-white' : 'text-ink'
                }`}
              >
                {title}
              </h2>
            </div>
            {intro && (
              <div
                data-reveal-item
                className={`max-w-xl text-base leading-relaxed sm:text-lg lg:col-span-5 lg:justify-self-end lg:pb-2 ${
                  dark ? 'text-white/80' : 'text-ink-soft'
                }`}
              >
                {intro}
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}

/** Serif-italic accent for headings, e.g. <Accent>journey</Accent>. */
export function Accent({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <em className={`font-serif font-normal tracking-normal italic ${onDark ? 'text-sun' : 'text-accent'}`}>{children}</em>
  )
}
