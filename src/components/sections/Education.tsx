import { ArrowUpRight, Award, Download, FileText, GraduationCap } from 'lucide-react'
import { certifications, education, photos, profile } from '../../content'
import { field, hasPlaceholder, SHOW_PLACEHOLDERS, visible } from '../../lib/placeholder'
import { RevealGroup } from '../ui/RevealGroup'
import { Photo } from '../ui/Photo'
import { Accent, Section } from '../ui/Section'
import { SmartLink } from '../ui/SmartLink'
import { Text } from '../ui/Text'

export function Education() {
  // Certifications with an unfinished name are hidden on the live site.
  const certs = certifications.filter((c) => SHOW_PLACEHOLDERS || !hasPlaceholder(c.name))

  return (
    <Section id="education" index="07" eyebrow="Education" photo={photos.bgJetty} intro="An MBA in Tourism Management from Alagappa University, built on an engineering degree in Biotechnology." title={<>Education &amp; <Accent>credentials.</Accent></>}>
      <RevealGroup className="grid gap-6 lg:grid-cols-12 lg:gap-7">
        <div data-reveal-item className="grid gap-6 lg:col-span-12 lg:grid-cols-2 lg:gap-7">
          {education.map((item) => {
            const meta = [field(item.institution), field(item.location), field(item.period)].filter(
              (v): v is string => !!v,
            )
            const details = visible(item.details)
            return (
              <article
                key={`${item.degree}-${item.institution}`}
                className="spotlight glass-card card-modern sheen relative overflow-hidden rounded-[32px] p-8 sm:p-11"
              >
                <GraduationCap
                  aria-hidden="true"
                  className="absolute -right-6 -bottom-8 size-48 text-ink opacity-[0.04] sm:size-56"
                />
                <span className="icon-tile size-14">
                  <GraduationCap aria-hidden="true" className="size-6" />
                </span>
                <p className="mt-8 text-sm font-medium text-ink-muted">{item.degree}</p>
                <h3 className="mt-2 font-display text-4xl leading-tight font-bold tracking-tight text-ink sm:text-[3.2rem]">
                  {item.specialisation}
                </h3>
                {meta.length > 0 && (
                  <p className="mt-4 text-lg text-ink-soft">
                    {meta.map((m, i) => (
                      <span key={m}>
                        {i > 0 && (
                          <span aria-hidden="true" className="mx-2 text-ink-muted">
                            ·
                          </span>
                        )}
                        <Text>{m}</Text>
                      </span>
                    ))}
                  </p>
                )}
                {details.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {details.map((d) => (
                      <li key={d} className="chip-glass rounded-full px-4 py-2 text-sm font-medium text-ink-soft">
                        <Text>{d}</Text>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            )
          })}

          {certs.length > 0 && (
            <div className="glass-card rounded-[28px] p-7 sm:p-8 lg:col-span-2">
              <h3 className="flex items-center gap-3 text-lg font-semibold text-ink">
                <Award aria-hidden="true" className="size-5 text-accent" />
                Certifications
              </h3>
              <ul className="mt-4 divide-y divide-line">
                {certs.map((cert) => (
                  <li key={`${cert.name}-${cert.issuer}`} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                    <span className="font-medium text-ink">
                      <Text>{cert.name}</Text>
                    </span>
                    <span className="text-sm text-ink-muted">
                      <Text>{`${cert.issuer} · ${cert.year}`}</Text>
                    </span>
                    {cert.credentialUrl && (
                      <SmartLink href={cert.credentialUrl} className="inline-flex items-center gap-1 text-sm font-medium text-accent">
                        View credential
                        <ArrowUpRight aria-hidden="true" className="size-3.5" />
                      </SmartLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div
          id="resume"
          data-reveal-item
          className="card-modern group relative isolate flex flex-col overflow-hidden rounded-[32px] border border-white/25 bg-navy-deep p-3.5 text-white shadow-[0_40px_80px_-40px_rgb(6_18_43/0.75)] lg:col-span-12 lg:flex-row"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 -z-10 size-72 rounded-full bg-sun/20 blur-[90px]" />

          {/* Naveenkumar's tourism banner, shown in full (16:9) */}
          <div className="relative shrink-0 overflow-hidden rounded-[24px] ring-1 ring-white/20 lg:w-[60%]">
            <Photo
              photo={photos.resumeBanner}
              sizes="(min-width: 1024px) 820px, 100vw"
              className="aspect-video w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
            />
          </div>

          <div className="glass-dark sheen relative z-10 mt-3.5 flex flex-1 flex-col justify-center overflow-hidden rounded-[26px] p-7 sm:p-8 lg:mt-0 lg:ml-3.5 lg:p-10">
          <span className="icon-tile relative size-14">
            <FileText aria-hidden="true" className="size-6" />
          </span>
          <h3 className="relative mt-6 font-display text-[2.1rem] font-bold tracking-tight">My resume</h3>
          <p className="relative mt-3 leading-relaxed text-white/80">
            A one-page summary of my experience, education and skills — ready to share with your hiring team.
          </p>
          {profile.resumeIsPlaceholder && (
            <p className="relative mt-2 text-sm text-white/60">Updated version coming soon.</p>
          )}
          <div className="relative pt-6">
            <a
              href={profile.resumePath}
              download={profile.resumeFileName}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sun px-6 text-sm font-semibold text-navy-deep transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              <Download aria-hidden="true" className="size-4 transition-transform group-hover:translate-y-0.5" />
              Download Resume (PDF)
            </a>
          </div>
          </div>
        </div>
      </RevealGroup>
    </Section>
  )
}
