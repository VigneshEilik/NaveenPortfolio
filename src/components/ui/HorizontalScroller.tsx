import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/useMotion'
import { useReveal } from '../../hooks/useReveal'

interface HorizontalScrollerProps {
  /** Accessible name for the card row. */
  label: string
  items: { key: string; node: ReactNode }[]
  /** Size classes for each card slot. */
  itemClassName: string
  /** Auto-scroll direction of the cards. */
  direction?: 'left-to-right' | 'right-to-left'
  /** Auto-scroll speed in pixels per second. */
  speed?: number
}

/** The row is rendered 3× so it can loop seamlessly; copies 2 and 3 are hidden from assistive tech. */
export const COPIES = 3
const RESUME_DELAY_MS = 2500

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

/**
 * Auto-scrolling, endlessly looping horizontal card row.
 *  - Drifts continuously (default: cards travel left → right) using requestAnimationFrame.
 *  - Pauses on hover, keyboard focus, touch/drag, when off-screen or when the tab is hidden.
 *  - Does not auto-scroll at all for visitors who prefer reduced motion.
 *  - Depth effect: cards turn in 3D, scale and fade by distance from the centre; photos parallax.
 * The row is a native scroll container, so it can always be swiped or dragged by hand.
 */
export function HorizontalScroller({
  label,
  items,
  itemClassName,
  direction = 'left-to-right',
  speed = 60,
}: HorizontalScrollerProps) {
  const reduced = usePrefersReducedMotion()
  const trackRef = useRef<HTMLUListElement>(null)
  const { ref: revealRef, revealProps } = useReveal<HTMLDivElement>()
  const count = items.length

  useEffect(() => {
    const track = trackRef.current
    if (!track || typeof requestAnimationFrame === 'undefined') return

    const state = {
      pos: 0, // own float scroll position (the browser rounds scrollLeft)
      loop: 0, // width of one copy of the row
      visible: typeof IntersectionObserver === 'undefined',
      holdUntil: 0, // auto-scroll held until this time (touch, drag, buttons)
      hovering: false,
      focused: false,
      tween: null as null | { from: number; to: number; start: number },
    }
    const cards = () => Array.from(track.children) as HTMLElement[]

    const measure = () => {
      const all = cards()
      const first = all[0]
      state.loop = first && all[count] ? all[count].offsetLeft - first.offsetLeft : 0
      if (state.pos === 0 && state.loop > 0) state.pos = state.loop // start on the middle copy
      track.scrollLeft = state.pos
    }

    // Keep the position inside the middle copy so the loop is seamless in both directions.
    const wrap = () => {
      if (state.loop <= 0) return
      if (state.pos < state.loop * 0.5) state.pos += state.loop
      else if (state.pos >= state.loop * 1.5) state.pos -= state.loop
    }

    const paint = () => {
      if (reduced) return
      const centre = window.innerWidth / 2
      cards().forEach((el) => {
        const rect = el.getBoundingClientRect()
        const d = clamp((rect.left + rect.width / 2 - centre) / window.innerWidth, -1, 1)
        el.style.setProperty('--ry', `${(-d * 14).toFixed(2)}deg`)
        el.style.setProperty('--sc', (1 - Math.abs(d) * 0.1).toFixed(3))
        el.style.setProperty('--fade', (1 - Math.abs(d) * 0.4).toFixed(3))
        el.style.setProperty('--px', `${(-d * 36).toFixed(1)}px`)
      })
    }

    let frame = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000
      last = now
      if (state.tween) {
        const t = Math.min((now - state.tween.start) / 550, 1)
        state.pos = state.tween.from + (state.tween.to - state.tween.from) * (1 - Math.pow(1 - t, 3))
        if (t >= 1) {
          state.tween = null
          wrap()
        }
        track.scrollLeft = state.pos
      } else if (
        !reduced &&
        state.visible &&
        !state.hovering &&
        !state.focused &&
        now >= state.holdUntil &&
        document.visibilityState === 'visible'
      ) {
        state.pos += (direction === 'left-to-right' ? -1 : 1) * speed * dt
        wrap()
        track.scrollLeft = state.pos
      }
      paint()
      frame = requestAnimationFrame(tick)
    }

    const hold = () => {
      state.holdUntil = performance.now() + RESUME_DELAY_MS
    }
    // Manual swipe / drag / wheel: adopt the user's position, hold briefly, then continue.
    const onUserScroll = () => {
      if (!state.tween && Math.abs(track.scrollLeft - Math.round(state.pos)) > 2) {
        state.pos = track.scrollLeft
        hold()
      }
    }
    const onEnter = () => {
      state.hovering = true
    }
    const onLeave = () => {
      state.hovering = false
    }
    const onFocusIn = (event: FocusEvent) => {
      state.focused = true
      const li = (event.target as HTMLElement).closest('li')
      if (li) {
        // Centre the focused card so keyboard users can always see it.
        const target = li.offsetLeft - (track.clientWidth - li.offsetWidth) / 2
        state.tween = { from: state.pos, to: target, start: performance.now() }
      }
    }
    const onFocusOut = (event: FocusEvent) => {
      if (!track.contains(event.relatedTarget as Node | null)) state.focused = false
    }

    const visibility =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(([entry]) => {
            state.visible = !!entry?.isIntersecting
          })
    visibility?.observe(track)
    const resize = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)
    resize?.observe(track)

    measure()
    paint()
    frame = requestAnimationFrame(tick)
    track.addEventListener('scroll', onUserScroll, { passive: true })
    track.addEventListener('pointerdown', hold)
    track.addEventListener('wheel', hold, { passive: true })
    track.addEventListener('touchstart', hold, { passive: true })
    track.addEventListener('pointerenter', onEnter)
    track.addEventListener('pointerleave', onLeave)
    track.addEventListener('focusin', onFocusIn)
    track.addEventListener('focusout', onFocusOut)
    return () => {
      cancelAnimationFrame(frame)
      visibility?.disconnect()
      resize?.disconnect()
      track.removeEventListener('scroll', onUserScroll)
      track.removeEventListener('pointerdown', hold)
      track.removeEventListener('wheel', hold)
      track.removeEventListener('touchstart', hold)
      track.removeEventListener('pointerenter', onEnter)
      track.removeEventListener('pointerleave', onLeave)
      track.removeEventListener('focusin', onFocusIn)
      track.removeEventListener('focusout', onFocusOut)
    }
  }, [count, direction, speed, reduced])

  return (
    <div className="relative ml-[calc(50%-50vw)] w-screen">
      <div ref={revealRef} {...revealProps}>
        <ul
          ref={trackRef}
          aria-label={label}
          className="no-scrollbar flex gap-6 overflow-x-auto px-[max(1.25rem,calc((100vw-88rem)/2+3.5rem))] py-8"
        >
          {Array.from({ length: COPIES }, (_, copy) =>
            items.map((item, i) => (
              <li
                key={`${copy}-${item.key}`}
                data-jump
                aria-hidden={copy > 0 || undefined}
                inert={copy > 0}
                style={{ '--i': i } as CSSProperties}
                className={`hs-card flex shrink-0 ${itemClassName}`}
              >
                {item.node}
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  )
}
