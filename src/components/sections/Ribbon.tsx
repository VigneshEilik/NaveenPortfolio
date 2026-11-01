import { Plane } from 'lucide-react'
import { serviceRibbon } from '../../content'

/** Scrolling services ribbon below the hero. Decorative (content repeats Expertise). */
export function Ribbon() {
  const items = [...serviceRibbon, ...serviceRibbon]
  return (
    <div aria-hidden="true" className="overflow-hidden py-8 sm:py-10">
      <div className="fade-x flex">
        <ul className="flex w-max shrink-0 items-center gap-10 pr-10 motion-safe:animate-marquee hover:[animation-play-state:paused]">
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-10 font-display text-2xl font-semibold tracking-tight whitespace-nowrap text-ink/80 sm:text-3xl"
            >
              {item}
              <Plane className="size-5 rotate-45 text-accent" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
