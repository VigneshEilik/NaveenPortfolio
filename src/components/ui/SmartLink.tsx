import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { isExternalHref, safeHref } from '../../lib/links'

type SmartLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'rel' | 'target'> & {
  href: string
  children: ReactNode
}

/**
 * Anchor that sanitises its href and opens external links safely in a new tab
 * (rel="noopener noreferrer" prevents reverse-tabnabbing and referrer leakage).
 */
export function SmartLink({ href, children, ...rest }: SmartLinkProps) {
  const safe = safeHref(href)
  const external = isExternalHref(safe)
  return (
    <a
      href={safe}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
