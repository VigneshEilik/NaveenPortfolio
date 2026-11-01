import { ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { contact, navItems, profile } from '../content'
import { useActiveSection } from '../hooks/useActiveSection'
import { mailtoHref } from '../lib/links'
import { SocialIcon } from './ui/BrandIcons'
import { SmartLink } from './ui/SmartLink'
import { ThemeToggle } from './ThemeToggle'

const sectionIds = navItems.map((item) => item.id)

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(sectionIds)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Scroll state + reading-progress bar (CSSOM transform — CSP-safe).
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${progress})`)
      setScrolled(window.scrollY > 24)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Mobile menu: lock page scroll, focus first link, close on Escape.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', menuOpen)
    if (!menuOpen) return
    firstLinkRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('menu-open')
    }
  }, [menuOpen])

  // Close the mobile menu if the viewport grows to desktop size.
  useEffect(() => {
    const query = window.matchMedia?.('(min-width: 1024px)')
    if (!query) return
    const onChange = (event: MediaQueryListEvent) => event.matches && setMenuOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent to-sun"
      />
      <div
        className={`mx-auto mt-5 flex w-[calc(100%-2.5rem)] max-w-[88rem] items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 sm:mt-7 sm:w-[calc(100%-4rem)] sm:px-4 ${
          scrolled || menuOpen ? 'glass-card' : 'glass'
        }`}
      >
        <a
          href="#top"
          className="flex items-center gap-3 rounded-full pr-2"
          aria-label={`${profile.name} — back to top`}
        >
          <span className="inline-flex size-9 items-center justify-center rounded-full bg-sun font-display text-sm font-semibold text-navy-deep">
            {profile.initials}
          </span>
          <span
            className={`hidden text-sm font-semibold tracking-tight transition-colors sm:inline ${
              scrolled || menuOpen ? 'text-ink' : 'text-white'
            }`}
          >
            {profile.name}
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                      isActive
                        ? scrolled
                          ? 'bg-ink text-paper'
                          : 'bg-white text-navy-deep'
                        : scrolled
                          ? 'text-ink-muted hover:text-ink'
                          : 'text-white/85 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle tone={scrolled || menuOpen ? 'default' : 'onNavy'} />
          <a
            href={profile.resumePath}
            download={profile.resumeFileName}
            className="hidden min-h-10 items-center gap-2 rounded-full bg-sun px-4 text-sm font-semibold text-navy-deep transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            <Download aria-hidden="true" className="size-4" />
            Resume
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className={`inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden ${
              scrolled || menuOpen ? 'text-ink hover:bg-surface-muted' : 'text-white hover:bg-white/15'
            }`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="fixed inset-x-0 top-0 -z-10 h-dvh overflow-y-auto bg-paper px-6 pt-28 pb-10 lg:hidden"
      >
        <ul className="flex flex-col">
          {navItems.map((item, index) => (
            <li
              key={item.id}
              className="animate-menu-in border-b border-line [animation-delay:calc(var(--i)*60ms)]"
              ref={(el) => el?.style.setProperty('--i', String(index))}
            >
              <a
                ref={index === 0 ? firstLinkRef : undefined}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-16 items-center justify-between font-display text-3xl font-semibold tracking-tight text-ink"
              >
                {item.label}
                <span aria-hidden="true" className="font-sans text-xs text-ink-muted tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={mailtoHref(contact.email)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper"
          >
            Email me
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
          {contact.socials.map((social) => (
            <SmartLink
              key={social.href}
              href={social.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-5 text-sm font-medium text-ink"
            >
              <SocialIcon icon={social.icon} className="size-4" />
              {social.label}
            </SmartLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
