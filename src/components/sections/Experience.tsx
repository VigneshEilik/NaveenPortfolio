import { Award, Briefcase, Check, GraduationCap, MapPin, Users } from 'lucide-react'
import { experience, photos } from '../../content'
import { field, visible } from '../../lib/placeholder'
import { RevealGroup } from '../ui/RevealGroup'
import { Accent, Section } from '../ui/Section'
import { Text } from '../ui/Text'

export function Experience() {
  return (
    <Section
      id="experience"
      index="04"
      eyebrow="Experience"
      title={
        <>
          Where I&apos;ve <Accent>worked.</Accent>
        </>
      }
      intro="Hands-on experience in travel sales and operations, built on a foundation in tourism management."
      photo={photos.bgRoad}
    >
      <RevealGroup as="ol" className="relative space-y-10 before:absolute before:top-3 before:bottom-3 before:left-[11px] before:w-px before:bg-gradient-to-b before:from-accent before:via-line before:to-transparent sm:space-y-10">
        {experience.map((job) => {
          const isCurrent = /present/i.test(job.period)
          const role = field(job.role, job.type ?? 'Role')
          const company = field(job.company)
          const location = field(job.location)
          const period = field(job.period)
          const responsibilities = visible(job.responsibilities)
          const achievements = visible(job.achievements)

          return (
            <li key={`${job.role}-${job.company}`} data-reveal-item className="relative pl-8 sm:pl-12">
              <span
                aria-hidden="true"
                className={`absolute top-2 left-0 inline-flex size-[23px] items-center justify-center rounded-full border-2 ${
                  isCurrent ? 'border-accent bg-surface' : 'border-line bg-surface'
                }`}
              >
                <span className={`size-2 rounded-full ${isCurrent ? 'bg-accent' : 'bg-ink-muted'}`} />
                {isCurrent && <span className="absolute inset-0 rounded-full border-2 border-accent motion-safe:animate-ping-soft" />}
              </span>

              <article className="spotlight glass-card card-modern sheen relative overflow-hidden rounded-[28px] p-5 sm:rounded-[32px] sm:p-10 lg:p-12">
                <span aria-hidden="true" className="icon-tile absolute top-7 right-7 hidden size-14 sm:inline-flex lg:top-10 lg:right-10">
                  {job.type === 'Internship' ? (
                    <GraduationCap className="size-6" />
                  ) : job.type === 'Part-time' ? (
                    <Users className="size-6" />
                  ) : (
                    <Briefcase className="size-6" />
                  )}
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                  {isCurrent && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-paper dark:text-navy-deep">
                      Current
                    </span>
                  )}
                  <span className="font-medium text-ink">{job.duration}</span>
                  {job.type && (
                    <>
                      <span aria-hidden="true" className="text-ink-muted">
                        ·
                      </span>
                      <span className="text-ink-muted">{job.type}</span>
                    </>
                  )}
                  {period && (
                    <>
                      <span aria-hidden="true" className="text-ink-muted">
                        ·
                      </span>
                      <span className="text-ink-muted">
                        <Text>{period}</Text>
                      </span>
                    </>
                  )}
                </div>

                <h3 className="mt-5 pr-0 font-display text-[1.7rem] leading-tight font-bold tracking-tight text-ink sm:pr-20 sm:text-[2.5rem]">
                  <Text>{role ?? job.role}</Text>
                </h3>
                {(company || location) && (
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 text-lg text-ink-soft">
                    {company && (
                      <span className="font-medium">
                        <Text>{company}</Text>
                      </span>
                    )}
                    {location && (
                      <span className="inline-flex items-center gap-1.5 text-sm text-ink-muted">
                        <MapPin aria-hidden="true" className="size-3.5" />
                        <Text>{location}</Text>
                      </span>
                    )}
                  </p>
                )}

                <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-soft sm:text-xl">
                  <Text>{job.summary}</Text>
                </p>

                {responsibilities.length > 0 && (
                  <>
                    <h4 className="mt-8 text-xs font-semibold tracking-[0.18em] text-ink-muted uppercase">What I do</h4>
                    <ul className="mt-5 grid gap-x-10 gap-y-4 md:grid-cols-2">
                      {responsibilities.map((item) => (
                        <li key={item} className="flex gap-3.5 text-base leading-relaxed text-ink-soft">
                          <span aria-hidden="true" className="icon-tile mt-0.5 size-6 shrink-0 rounded-full">
                            <Check className="size-3.5" strokeWidth={3} />
                          </span>
                          <span>
                            <Text>{item}</Text>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {achievements.length > 0 && (
                  <>
                    <h4 className="mt-8 text-xs font-semibold tracking-[0.18em] text-ink-muted uppercase">Achievements</h4>
                    <ul className="mt-4 space-y-3">
                      {achievements.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 rounded-2xl border border-sun/40 bg-gradient-to-r from-sun/20 via-sun/10 to-transparent px-5 py-4 text-base font-medium text-ink"
                        >
                          <Award aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent" />
                          <Text>{item}</Text>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <ul className="mt-9 flex flex-wrap gap-2 border-t border-white/50 pt-7 dark:border-white/10" aria-label="Focus areas">
                  {job.focusAreas.map((area) => (
                    <li key={area} className="chip-glass rounded-full px-3.5 py-1.5 text-sm font-medium text-ink-soft">
                      {area}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          )
        })}
      </RevealGroup>
    </Section>
  )
}
