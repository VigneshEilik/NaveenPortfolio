import { Mail } from 'lucide-react'
import { contact, navItems, profile } from '../content'
import { mailtoHref } from '../lib/links'
import { SocialIcon } from './ui/BrandIcons'
import { SmartLink } from './ui/SmartLink'

/** Evaluated when the page loads, so the copyright year is always current. */
const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-deep text-on-navy">
      <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-10 px-5 py-14 sm:px-8 lg:flex-row lg:items-start lg:justify-between lg:px-14">
        <div className="max-w-sm">
          <a href="#top" className="inline-flex items-center gap-3">
            <span className="inline-flex size-10 items-center justify-center rounded-full bg-sun font-display text-sm font-semibold text-navy-deep">
              {profile.initials}
            </span>
            <span className="font-display text-xl font-medium">{profile.name}</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-on-navy/60">
            {profile.role} · MBA, Tourism Management. Planning domestic and international journeys.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="link-underline text-on-navy/65 transition-colors hover:text-on-navy">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex items-center gap-2" aria-label="Social links">
          <li>
            <a
              href={mailtoHref(contact.email)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-on-navy/75 transition-colors hover:border-sun hover:text-sun"
              aria-label={`Email ${profile.name}`}
            >
              <Mail aria-hidden="true" className="size-[18px]" />
            </a>
          </li>
          {contact.socials.map((social) => (
            <li key={social.href}>
              <SmartLink
                href={social.href}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 text-on-navy/75 transition-colors hover:border-sun hover:text-sun"
                aria-label={`${profile.name} on ${social.label}`}
              >
                <SocialIcon icon={social.icon} className="size-[18px]" />
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-[88rem] px-5 py-6 text-xs text-on-navy/50 sm:px-8 lg:px-14">
          © {year} {profile.name}. All rights reserved.
          <span aria-hidden="true" className="mx-2">
            ·
          </span>
          <a href="/credits.html" className="link-underline hover:text-on-navy">
            Photo credits
          </a>
        </p>
      </div>
    </footer>
  )
}
