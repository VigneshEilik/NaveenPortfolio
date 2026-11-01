import { useInView } from './useMotion'

/**
 * Fade-up reveal. Spread `revealProps` on a container; children marked with
 * `data-reveal-item` animate in sequence. Without IntersectionObserver, or with
 * reduced motion (handled in CSS), content is simply visible.
 */
export function useReveal<T extends HTMLElement>() {
  const { ref, inView } = useInView<T>('0px 0px -8% 0px')
  return { ref, revealProps: { 'data-reveal': inView ? 'shown' : 'hidden' } as const }
}
