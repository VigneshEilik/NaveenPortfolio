import { Briefcase, Flag, Globe, Handshake, Languages, Laptop, Megaphone, Route, Users, type LucideIcon } from 'lucide-react'
import { photos, skillGroups, type Photo as PhotoData, type SkillGroup } from '../../content'
import { fillRowSpans } from '../../lib/layout'
import { visible } from '../../lib/placeholder'
import { Photo } from '../ui/Photo'
import { RevealGroup } from '../ui/RevealGroup'
import { Accent, Section } from '../ui/Section'
import { Text } from '../ui/Text'

const icons: Record<SkillGroup['icon'], LucideIcon> = {
  briefcase: Briefcase,
  route: Route,
  globe: Globe,
  users: Users,
  handshake: Handshake,
  flag: Flag,
  laptop: Laptop,
  languages: Languages,
  megaphone: Megaphone,
}

// Static class names so Tailwind can see them.
const smSpan: Record<number, string> = { 1: 'sm:col-span-1', 2: 'sm:col-span-2' }
const lgSpan: Record<number, string> = { 1: 'lg:col-span-1', 2: 'lg:col-span-2', 3: 'lg:col-span-3', 4: 'lg:col-span-4' }

/** The two wide bento cards get a photo background with glass chips. */
const featurePhotos: Record<number, PhotoData> = { 0: photos.skillBeach, 5: photos.skillMountains }

export function Expertise() {
  // Groups whose skills are all unfinished placeholders are hidden on the live site.
  const groups = skillGroups
    .map((group) => ({ ...group, skills: visible(group.skills) }))
    .filter((group) => group.skills.length > 0)
  // Photo cards prefer two columns; spans are adjusted so every row fills the full width.
  const wide = groups.map((_, i) => i in featurePhotos)
  const sm = fillRowSpans(wide, 2)
  const lg = fillRowSpans(wide, 4)

  return (
    <Section
      id="expertise"
      index="02"
      eyebrow="Expertise"
      photo={photos.bgPlanning}
      title={
        <>
          Skills across the full <Accent>travel journey.</Accent>
        </>
      }
      intro="From the first sales call to on-ground group tour management — the skills I use every day."
    >
      <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {groups.map((group, i) => {
          const Icon = icons[group.icon]
          const photo = featurePhotos[i]
          return (
            <li
              key={group.title}
              data-reveal-item
              className={`card-modern sheen group relative isolate flex min-h-80 flex-col overflow-hidden rounded-[32px] p-8 sm:min-h-[22rem] sm:p-9 ${
                smSpan[sm[i] ?? 1]
              } ${lgSpan[lg[i] ?? 1]} ${photo ? 'border border-white/25 text-white shadow-[0_30px_70px_-35px_rgb(6_18_43/0.8)]' : 'spotlight glass-card'}`}
            >
              {photo && (
                <div aria-hidden="true" className="absolute inset-0 -z-10">
                  <Photo
                    photo={photo}
                    sizes="(min-width: 1024px) 640px, 100vw"
                    decorative
                    className="size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06122b]/90 via-[#06122b]/45 to-[#06122b]/15" />
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <span
                  className={`size-14 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${
                    photo ? 'glass inline-flex items-center justify-center rounded-[1.1rem] text-white' : 'icon-tile'
                  }`}
                >
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <span
                  aria-hidden="true"
                  className={`rounded-full px-3 py-1 text-xs font-semibold tabular-nums ${
                    photo ? 'glass text-white' : 'chip-glass text-ink-soft'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3
                className={`mt-auto pt-12 font-display font-bold tracking-tight ${photo ? 'text-3xl text-white sm:text-[2.1rem]' : 'text-[1.6rem] leading-tight text-ink'}`}
              >
                {group.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} skills`}>
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className={`rounded-full px-3.5 py-1.5 text-sm ${photo ? 'glass text-white' : 'chip-glass text-ink-soft'}`}
                  >
                    <Text>{skill}</Text>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
