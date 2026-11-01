import type { CSSProperties } from 'react'
import { approachSteps, photos } from '../../content'
import { RevealGroup } from '../ui/RevealGroup'
import { Accent, Section } from '../ui/Section'

export function Approach() {
  return (
    <Section
      id="approach"
      index="03"
      eyebrow="Approach"
      tone="dark"
      title={
        <>
          How I plan a <Accent onDark>journey.</Accent>
        </>
      }
      intro="A simple, dependable process — so travellers always know what happens next."
      photo={photos.approachDusk}
    >
      <RevealGroup as="ol" className="relative grid gap-5 [perspective:1400px] sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
        {approachSteps.map((step, i) => (
          <li
            key={step.title}
            data-jump
            style={{ '--i': i } as CSSProperties}
            className="glass card-modern sheen group relative isolate flex min-h-[19rem] flex-col overflow-hidden rounded-[30px] p-7 text-white sm:last:odd:col-span-2 lg:last:odd:col-span-1"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -bottom-6 -z-10 font-display text-[7.5rem] leading-none font-extrabold text-white/[0.07] transition-colors duration-500 group-hover:text-sun/15"
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="flex items-center justify-between">
              <span className="icon-tile size-14 font-display text-lg font-bold">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[11px] font-semibold tracking-[0.2em] text-white/55 uppercase">Step</span>
            </div>
            <h3 className="mt-8 font-display text-xl leading-snug font-bold tracking-tight">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/80">{step.body}</p>
          </li>
        ))}
      </RevealGroup>
    </Section>
  )
}
