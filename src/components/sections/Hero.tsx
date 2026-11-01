import { ArrowRight, Briefcase, Download, GraduationCap, Globe, MapPinned, type LucideIcon } from 'lucide-react'
import { contact, photos, profile } from '../../content'
import { useCountUp, useInView, useRotatingWord } from '../../hooks/useMotion'
import { BoardingPass } from '../BoardingPass'
import { SocialIcon } from '../ui/BrandIcons'
import { Photo } from '../ui/Photo'
import { SmartLink } from '../ui/SmartLink'
import { Text } from '../ui/Text'

const statIcons: LucideIcon[] = [Briefcase, MapPinned, GraduationCap, Globe]

export function Hero() {
  const word = useRotatingWord(profile.rotatingWords)

  return (
    <section id="top" aria-labelledby="hero-heading" className="p-2 sm:p-3">
      <div className="relative isolate flex min-h-[min(calc(100svh-1rem),62rem)] flex-col overflow-hidden rounded-[28px] text-white sm:min-h-[min(calc(100svh-1.5rem),62rem)] sm:rounded-[40px]">
        {/* Photo + readability overlays */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Photo
            photo={photos.heroLake}
            sizes="100vw"
            priority
            decorative
            className="size-full object-cover motion-safe:animate-[hero-zoom_20s_ease-out_both]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06122b]/85 via-[#06122b]/45 to-[#06122b]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06122b]/80 via-transparent to-[#06122b]/40" />
        </div>

        <div className="mx-auto grid w-full max-w-[88rem] flex-1 items-center gap-12 px-5 pt-32 pb-10 sm:px-8 sm:pt-36 lg:grid-cols-12 lg:gap-10 lg:px-14">
          <div className="lg:col-span-7">
            <p className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400 motion-safe:animate-ping-soft" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {profile.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className="mt-7 font-display text-[clamp(2.6rem,6.4vw,5.5rem)] leading-[0.95] font-bold tracking-[-0.045em]"
            >
              {profile.name}
            </h1>

            <p className="mt-6 font-display text-2xl leading-snug font-medium tracking-tight text-white/90 sm:text-3xl">
              <span className="sr-only">
                I plan {profile.rotatingWords.join(', ')} — from first call to final transfer.
              </span>
              <span aria-hidden="true">
                I plan{' '}
                <span className="relative inline-block min-w-[9ch]">
                  <span key={word} className="inline-block font-serif text-[1.2em] font-normal text-sun italic motion-safe:animate-word-in">
                    {word}
                  </span>
                </span>
                <br />
                <span className="text-white/70">from first call to final transfer.</span>
              </span>
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              <Text>{profile.intro}</Text>
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#work"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-navy-deep transition-transform duration-300 hover:-translate-y-0.5"
              >
                View My Work
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={profile.resumePath}
                download={profile.resumeFileName}
                className="glass inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold transition-colors hover:bg-white/25"
              >
                <Download aria-hidden="true" className="size-4" />
                Download Resume
              </a>
              {contact.socials.map((social) => (
                <SmartLink
                  key={social.href}
                  href={social.href}
                  aria-label={`${profile.name} on ${social.label}`}
                  className="glass hidden size-12 items-center justify-center rounded-full transition-colors hover:bg-white/25 sm:inline-flex"
                >
                  <SocialIcon icon={social.icon} className="size-[18px]" />
                </SmartLink>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <BoardingPass />
          </div>
        </div>

        {/* Booking-bar style stats strip */}
        <div className="mx-auto w-full max-w-[88rem] px-3 pb-3 sm:px-8 sm:pb-8 lg:px-14">
          <div className="glass flex flex-col gap-2 rounded-[24px] p-2 lg:flex-row lg:items-stretch lg:rounded-full">
            <ul aria-label="Career snapshot" className="grid flex-1 grid-cols-2 lg:grid-cols-4">
              {profile.stats.map((stat, i) => (
                <Stat key={stat.label} {...stat} icon={statIcons[i % statIcons.length] ?? Globe} divider={i > 0} />
              ))}
            </ul>
            <a
              href="#contact"
              className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-[18px] bg-sun px-7 text-sm font-semibold text-navy-deep transition-transform hover:-translate-y-0.5 lg:rounded-full"
            >
              Let&apos;s talk
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({
  value,
  suffix = '',
  label,
  icon: Icon,
  divider,
}: {
  value: number | string
  suffix?: string
  label: string
  icon: LucideIcon
  divider: boolean
}) {
  const { ref, inView } = useInView<HTMLLIElement>('0px')
  const count = useCountUp(typeof value === 'number' ? value : 0, inView)
  const display = typeof value === 'number' ? `${count}${suffix}` : value
  return (
    <li ref={ref} className={`flex items-center gap-3 px-4 py-3 lg:px-6 ${divider ? 'lg:border-l lg:border-white/15' : ''}`}>
      <span className="hidden size-10 shrink-0 items-center justify-center rounded-full bg-white/15 sm:inline-flex">
        <Icon aria-hidden="true" className="size-[18px]" />
      </span>
      <p className="flex min-w-0 flex-col">
        <span className="font-display text-lg font-bold tracking-tight tabular-nums sm:text-xl">
          <span aria-hidden="true">{display}</span>
          <span className="sr-only">{typeof value === 'number' ? `${value}${suffix}` : value}</span>
        </span>
        <span className="text-xs leading-snug text-white/70">{label}</span>
      </p>
    </li>
  )
}
