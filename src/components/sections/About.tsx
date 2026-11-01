import { Briefcase, GraduationCap, Languages, MapPin, Sparkles, type LucideIcon } from 'lucide-react'
import { photos, profile } from '../../content'
import { visible } from '../../lib/placeholder'
import { Photo } from '../ui/Photo'
import { RevealGroup } from '../ui/RevealGroup'
import { Accent, Section } from '../ui/Section'
import { Text } from '../ui/Text'

const factIcons: LucideIcon[] = [Briefcase, GraduationCap, MapPin, Languages]

export function About() {
  const paragraphs = visible(profile.about)
  return (
    <Section
      id="about"
      index="01"
      eyebrow="About me"
      photo={photos.bgWorldMap}
      intro="Tourism & hospitality professional from Karaikudi, Tamil Nadu — selling holidays, managing group tours and looking after every traveller along the way."
      title={
        <>
          Every great journey starts with <Accent>listening.</Accent>
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <RevealGroup className="order-2 lg:order-1 lg:col-span-7 lg:pt-2">
          <div className="space-y-6 text-lg leading-relaxed text-ink-soft">
            {paragraphs.map((paragraph, i) => (
              <p
                key={paragraph.slice(0, 32)}
                data-reveal-item
                className={i === 0 ? 'font-display text-2xl leading-snug font-semibold tracking-tight text-ink' : ''}
              >
                <Text>{paragraph}</Text>
              </p>
            ))}
          </div>

          <div data-reveal-item className="mt-10">
            <h3 className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
              <Sparkles aria-hidden="true" className="size-4 text-accent" />
              Key strengths
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.strengths.map((strength) => (
                <li key={strength} className="glass-card card-modern rounded-full px-5 py-2.5 text-[15px] font-medium text-ink">
                  {strength}
                </li>
              ))}
            </ul>
          </div>
        </RevealGroup>

        <RevealGroup className="order-1 lg:order-2 lg:col-span-5">
          <div data-reveal-item className="card-modern group relative mx-auto max-w-md overflow-hidden rounded-[36px] border border-white/40 shadow-[0_40px_90px_-40px_rgb(6_18_43/0.7)] lg:max-w-none">
            <Photo
              photo={photos.portrait}
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 448px, 100vw"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06122b]/75 via-transparent to-transparent" />
            <ul
              aria-label="Quick facts"
              className="glass-dark sheen absolute inset-x-4 bottom-4 grid grid-cols-2 overflow-hidden rounded-[26px] text-white sm:inset-x-5 sm:bottom-5"
            >
              {profile.quickFacts.map((fact, i) => {
                const Icon = factIcons[i % factIcons.length] ?? Briefcase
                return (
                  <li key={fact.label} className="flex items-start gap-3 p-4 sm:p-5">
                    <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun" />
                    <p className="flex min-w-0 flex-col">
                      <span className="text-[13px] leading-snug font-semibold sm:text-sm">{fact.value}</span>
                      <span className="mt-0.5 text-[10px] tracking-[0.12em] text-white/65 uppercase sm:text-[11px]">
                        {fact.label}
                      </span>
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </RevealGroup>
      </div>
    </Section>
  )
}
