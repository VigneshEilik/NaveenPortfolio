import { ArrowUpRight, Check, Copy, Mail, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { contact, photos, profile } from '../../content'
import { useReveal } from '../../hooks/useReveal'
import { mailtoHref, telHref } from '../../lib/links'
import { SocialIcon } from '../ui/BrandIcons'
import { Photo } from '../ui/Photo'
import { SmartLink } from '../ui/SmartLink'

export function Contact() {
  const { ref, revealProps } = useReveal<HTMLDivElement>()
  const subject = `Opportunity for ${profile.name}`
  return (
    <section id="contact" aria-labelledby="contact-heading" className="px-2 py-1 sm:px-3 sm:pt-1.5 sm:pb-3">
      <div className="relative isolate overflow-hidden rounded-[28px] py-24 text-white sm:rounded-[40px] sm:py-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Photo photo={photos.contactWing} sizes="100vw" decorative className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06122b]/90 via-[#06122b]/60 to-[#06122b]/20" />
        </div>

        <div ref={ref} {...revealProps} className="mx-auto grid w-full max-w-[88rem] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-14">
          <div className="lg:col-span-7">
            <p data-reveal-item className="glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] uppercase">
              <span className="tabular-nums opacity-70">08</span>
              <span aria-hidden="true" className="h-3 w-px bg-current opacity-40" />
              Contact
            </p>
            <h2
              id="contact-heading"
              data-reveal-item
              className="mt-6 font-display text-5xl leading-[0.98] font-bold tracking-[-0.04em] sm:text-7xl lg:text-[5.5rem]"
            >
              Let&apos;s plan <em className="font-serif font-normal tracking-normal text-sun italic">what&apos;s next.</em>
            </h2>
            <p data-reveal-item className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">
              {contact.availability} The quickest way to reach me is by email.
            </p>
          </div>

          <div data-reveal-item className="glass rounded-[28px] p-6 sm:p-8 lg:col-span-5">
            <p className="text-sm text-white/70">Email</p>
            <a
              href={mailtoHref(contact.email, subject)}
              className="group mt-1 inline-flex max-w-full items-center gap-2 font-display text-xl font-bold tracking-tight break-all sm:text-2xl"
            >
              <span className="link-underline">{contact.email}</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 shrink-0 text-sun transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <a
                href={mailtoHref(contact.email, subject)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sun px-6 text-sm font-semibold text-navy-deep transition-transform hover:-translate-y-0.5"
              >
                <Mail aria-hidden="true" className="size-4" />
                Send an email
              </a>
              <CopyEmailButton email={contact.email} />
            </div>

            <ul className="mt-6 space-y-2 border-t border-white/15 pt-6 text-sm">
              {contact.socials.map((social) => (
                <li key={social.href}>
                  <SmartLink href={social.href} className="inline-flex min-h-10 items-center gap-3 text-white/85 hover:text-white">
                    <SocialIcon icon={social.icon} className="size-4" />
                    Connect on {social.label}
                  </SmartLink>
                </li>
              ))}
              {contact.phone && (
                <li>
                  <a href={telHref(contact.phone)} className="inline-flex min-h-10 items-center gap-3 text-white/85 hover:text-white">
                    <Phone aria-hidden="true" className="size-4" />
                    {contact.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  if (typeof navigator === 'undefined' || !navigator.clipboard) return null

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(email).then(
          () => setCopied(true),
          () => setCopied(false),
        )
      }}
      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-semibold transition-colors hover:bg-white/15"
    >
      {copied ? <Check aria-hidden="true" className="size-4 text-emerald-300" /> : <Copy aria-hidden="true" className="size-4" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  )
}
