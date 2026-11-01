import { ArrowUpRight, Clock, Info, Plus, X } from 'lucide-react'
import { useId, useRef, useState, type PointerEvent } from 'react'
import { caseStudies, photos, type CaseStudy } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/useMotion'
import { field } from '../../lib/placeholder'
import { Scene } from '../Scenes'
import { Photo } from '../ui/Photo'
import { HorizontalScroller } from '../ui/HorizontalScroller'
import { Accent, Section } from '../ui/Section'
import { SmartLink } from '../ui/SmartLink'
import { Tabs } from '../ui/Tabs'
import { Text } from '../ui/Text'

export function Work() {
  const hasSamples = caseStudies.some((study) => study.isSample)
  return (
    <Section
      id="work"
      index="05"
      eyebrow="Featured work"
      tone="dark"
      photo={photos.bgWindow}
      title={
        <>
          Itinerary <Accent onDark>case studies.</Accent>
        </>
      }
      intro="How I approach different kinds of trips — the traveller's brief, the plan, and everything coordinated to deliver it."
    >
      {hasSamples && (
        <p role="note" className="glass mb-8 flex items-start gap-3 rounded-2xl p-4 text-sm leading-relaxed text-white/85">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-sun" />
          <span>
            Photos are illustrative stock images. Entries marked{' '}
            <strong className="font-semibold text-white">Sample</strong> show the format I use to plan a trip and will be
            replaced with real itineraries from my work.
          </span>
        </p>
      )}
      <HorizontalScroller
        label="Itinerary case studies (auto-scrolling)"
        itemClassName="h-[36rem] w-[84vw] sm:h-[38rem] sm:w-[25rem] lg:h-[40rem] lg:w-[27rem]"
        items={caseStudies.map((study) => ({
          key: study.title,
          node: (
            // .hop = springy "pick up" on hover; the card inside rolls toward the pointer.
            <div className="hop flex w-full">
              <CaseStudyCard study={study} />
            </div>
          ),
        }))}
      />
    </Section>
  )
}

/** Photo card with a frosted-glass panel that expands to reveal trip details. */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const [open, setOpen] = useState(false)
  const detailsId = useId()
  const slug = study.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const duration = field(study.duration)
  const cardRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  // "Roll": tilt the card in 3D toward the pointer, with a glare that follows it.
  const onMove = (event: PointerEvent<HTMLElement>) => {
    const card = cardRef.current
    if (reduced || event.pointerType !== 'mouse' || !card) return
    const rect = card.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    card.style.setProperty(
      'transform',
      `perspective(1100px) rotateX(${(0.5 - y) * 10}deg) rotateY(${(x - 0.5) * 12}deg) scale(1.015)`,
    )
    card.style.setProperty('--gx', `${x * 100}%`)
    card.style.setProperty('--gy', `${y * 100}%`)
  }
  const onLeave = () => cardRef.current?.style.removeProperty('transform')

  return (
    <article
      ref={cardRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      aria-labelledby={`work-${slug}`}
      className="group relative isolate flex h-full w-full flex-col justify-end overflow-hidden rounded-[34px] border border-white/25 p-3.5 text-white shadow-[0_40px_80px_-40px_rgb(0_0_0/0.75)] transition-[transform,box-shadow] duration-300 ease-out [transform-style:preserve-3d] hover:shadow-[0_60px_110px_-45px_rgb(0_0_0/0.85)]"
    >
      {/* Glare that follows the pointer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-[radial-gradient(500px_circle_at_var(--gx,50%)_var(--gy,0%),rgb(255_255_255/0.22),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="absolute inset-0 -z-10">
        {study.photo ? (
          <Photo
            photo={study.photo}
            sizes="(min-width: 640px) 440px, 84vw"
            className="hs-parallax size-full object-cover"
          />
        ) : (
          <div aria-hidden="true" className="size-full">
            <Scene category={study.category} />
          </div>
        )}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06122b]/85 via-[#06122b]/10 to-[#06122b]/30" />
      </div>

      <div className="absolute inset-x-3.5 top-3.5 flex flex-wrap items-center gap-2 text-xs font-semibold">
        <span className="glass rounded-full px-3 py-1.5">{study.category}</span>
        {duration && (
          <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1.5">
            <Clock aria-hidden="true" className="size-3.5" />
            <Text>{duration}</Text>
          </span>
        )}
        {study.isSample && <span className="ml-auto rounded-full bg-white px-3 py-1.5 text-navy-deep">Sample</span>}
      </div>

      <div
        className={`glass-dark sheen flex flex-col overflow-hidden rounded-[26px] p-6 transition-[max-height] duration-700 ease-out sm:p-7 ${
          open ? 'max-h-[calc(100%-3.25rem)]' : 'max-h-[16rem]'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 id={`work-${slug}`} className="font-display text-[1.7rem] leading-tight font-bold tracking-tight">
            {study.title}
          </h3>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={detailsId}
            aria-label={open ? `Hide ${study.title} details` : `View ${study.title} details`}
            onClick={() => setOpen((v) => !v)}
            className="icon-tile size-11 shrink-0 rounded-full transition-transform duration-300 hover:scale-110"
          >
            {open ? <X aria-hidden="true" className="size-4" /> : <Plus aria-hidden="true" className="size-4" />}
          </button>
        </div>
        <p className="mt-2.5 text-[15px] leading-relaxed text-white/85">
          <Text>{study.summary}</Text>
        </p>

        <div id={detailsId} hidden={!open} className="mt-5 min-h-0 overflow-y-auto pr-1">
          <Tabs
            tone="glass"
            label={`${study.title} details`}
            tabs={[
              {
                label: 'Brief',
                content: (
                  <dl className="space-y-4 text-sm leading-relaxed">
                    <div>
                      <dt className="text-[11px] font-semibold tracking-[0.16em] text-white/60 uppercase">Traveller brief</dt>
                      <dd className="mt-1.5 text-white/85">
                        <Text>{study.brief}</Text>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-[11px] font-semibold tracking-[0.16em] text-white/60 uppercase">My approach</dt>
                      <dd className="mt-1.5 text-white/85">
                        <Text>{study.approach}</Text>
                      </dd>
                    </div>
                  </dl>
                ),
              },
              {
                label: 'Itinerary',
                content: (
                  <ol className="relative space-y-3 text-sm before:absolute before:top-2 before:bottom-2 before:left-[5px] before:w-px before:bg-white/25">
                    {study.outline.map((step) => (
                      <li key={step} className="relative pl-6 text-white/85">
                        <span aria-hidden="true" className="absolute top-1.5 left-0 size-[11px] rounded-full border-2 border-sun bg-navy-deep" />
                        <Text>{step}</Text>
                      </li>
                    ))}
                  </ol>
                ),
              },
              {
                label: 'Services',
                content: (
                  <div className="space-y-4">
                    <ul className="flex flex-wrap gap-2" aria-label="Services coordinated">
                      {study.services.map((service) => (
                        <li key={service} className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                          {service}
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 text-sm text-white/85" aria-label="Highlights">
                      {study.highlights.map((item) => (
                        <li key={item} className="flex gap-2.5">
                          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-sun" />
                          <Text>{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              },
            ]}
          />
          {study.link && (
            <SmartLink href={study.link.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sun">
              <span className="link-underline">{study.link.label}</span>
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </SmartLink>
          )}
        </div>
      </div>
    </article>
  )
}
