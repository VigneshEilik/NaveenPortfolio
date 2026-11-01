import type { ElementType, ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'

interface RevealGroupProps {
  as?: ElementType
  className?: string
  children: ReactNode
  'aria-label'?: string
}

/** Container whose `data-reveal-item` children fade up in sequence when scrolled into view. */
export function RevealGroup({ as: Tag = 'div', className, children, ...rest }: RevealGroupProps) {
  const { ref, revealProps } = useReveal<HTMLElement>()
  return (
    <Tag ref={ref} {...revealProps} className={className} {...rest}>
      {children}
    </Tag>
  )
}
