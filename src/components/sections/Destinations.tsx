import { ArrowUpRight, Globe2, MapPin, Mountain } from 'lucide-react'
import { destinations, photos, type Destination } from '../../content'
import { HorizontalScroller } from '../ui/HorizontalScroller'
import { Photo } from '../ui/Photo'
import { Accent, Section } from '../ui/Section'

const groups: { region: Destination['region']; heading: string; icon: typeof Globe2 }[] = [
  { region: 'Domestic', heading: 'Domestic · India', icon: Mountain },
  { region: 'International', heading: 'International', icon: Globe2 },
]

/** Destinations in two auto-scrolling rows — Domestic and International — with real location photos. */
export function Destinations() {
  return (
    <Section
      id="destinations"
      index="06"
      eyebrow="Destinations"
      photo={photos.bgSantorini}
      title={
        <>
          Domestic charm to <Accent>international escapes.</Accent>
        </>
      }
      intro="The destinations I plan and sell holidays for — from the Golden Triangle and Kashmir to Bali, Japan and Europe."
    >
      <div className="space-y-10">
        {groups.map(({ region, heading, icon: Icon }) => {
          const list = destinations.filter((d) => d.region === region)
          return (
            <div key={region}>
              <h3 className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-ink">
                <span className="icon-tile size-11">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                {heading}
                <span className="chip-glass rounded-full px-3 py-1 text-xs font-semibold text-ink-soft">
                  {list.length} destinations
                </span>
              </h3>
              <HorizontalScroller
                label={`${heading} destinations (auto-scrolling)`}
                itemClassName="aspect-[3/4] w-[70vw] sm:w-[17rem] lg:w-[19rem]"
                items={list.map((dest) => ({ key: dest.title, node: <DestinationCard dest={dest} /> }))}
              />
            </div>
          )
        })}
      </div>
    </Section>
  )
}

function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <div className="hop flex w-full">
      <figure className="card-modern group relative w-full overflow-hidden rounded-[30px] border border-white/30 shadow-[0_30px_70px_-35px_rgb(6_18_43/0.7)]">
        <Photo photo={dest.photo} sizes="(min-width: 640px) 320px, 70vw" className="hs-parallax size-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-black/15" />
        <span className="glass absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-xs font-semibold text-white">
          {dest.region}
        </span>
        <figcaption className="glass sheen absolute inset-x-3.5 bottom-3.5 flex items-end justify-between gap-3 overflow-hidden rounded-[22px] p-4 text-white">
          <div className="min-w-0">
            <p className="font-display text-xl leading-tight font-bold tracking-tight">{dest.title}</p>
            {dest.place && (
              <p className="mt-1 flex items-center gap-1.5 text-[13px] text-white/85">
                <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
                <span className="truncate">{dest.place}</span>
              </p>
            )}
          </div>
          <span
            aria-hidden="true"
            className="icon-tile size-9 shrink-0 rounded-full transition-transform duration-500 group-hover:rotate-45"
          >
            <ArrowUpRight className="size-4" />
          </span>
        </figcaption>
      </figure>
    </div>
  )
}
