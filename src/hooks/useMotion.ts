import { useEffect, useRef, useState } from 'react'

/** True when the visitor asked the OS to reduce motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!query) return
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Becomes true once the element enters the viewport (true immediately without IntersectionObserver). */
export function useInView<T extends Element>(rootMargin = '0px 0px -10% 0px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0.05 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [inView, rootMargin])
  return { ref, inView }
}

/** Animates 0 → target once `start` is true. Jumps straight to target with reduced motion. */
export function useCountUp(target: number, start: boolean, durationMs = 1400): number {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start || reduced) return
    let frame = 0
    const began = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - began) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, start, durationMs, reduced])
  // With reduced motion, show the final number straight away.
  if (reduced) return start ? target : 0
  return value
}

/**
 * Cycles through words. Stops after `cycles` loops (WCAG 2.2.2) and stays on
 * the first word for visitors who prefer reduced motion.
 */
export function useRotatingWord(words: string[], intervalMs = 2600, cycles = 3): string {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (reduced || words.length < 2) return
    let steps = 0
    const timer = window.setInterval(() => {
      steps += 1
      setIndex((i) => (i + 1) % words.length)
      if (steps >= words.length * cycles) window.clearInterval(timer)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [words, intervalMs, cycles, reduced])
  return words[index] ?? ''
}

/**
 * Pointer-follow spotlight for any element with the `spotlight` class.
 * Uses one delegated listener and CSS custom properties (CSP-safe CSSOM writes).
 */
export function useSpotlight(): void {
  useEffect(() => {
    if (!window.matchMedia?.('(pointer: fine)').matches) return
    const onMove = (event: PointerEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>('.spotlight')
      if (!target) return
      const rect = target.getBoundingClientRect()
      target.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      target.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
}
