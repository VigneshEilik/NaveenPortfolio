/**
 * Shared content types. You normally don't need to edit this file —
 * edit the content files next to it instead.
 *
 * PLACEHOLDER CONVENTION
 * Any text wrapped in square brackets, e.g. "[Agency Name]", is a placeholder.
 * It is highlighted on the page so you can spot what still needs real details.
 * Replace the whole bracketed text (including the brackets) with your information.
 */

export interface SocialLink {
  label: string
  /** Must be an https:// URL. */
  href: string
  icon: 'linkedin' | 'instagram' | 'globe'
}

export interface Profile {
  name: string
  initials: string
  role: string
  /** Compact role used on the boarding-pass card. */
  shortRole: string
  /** Short line shown above the name in the hero. */
  eyebrow: string
  headline: string
  rotatingWords: string[]
  stats: { value: number | string; suffix?: string; label: string }[]
  statement: string
  intro: string
  location: string
  /** Path to a photo in /public (e.g. "/images/profile.webp"), or null to show initials. */
  photo: string | null
  about: string[]
  strengths: string[]
  quickFacts: { label: string; value: string }[]
  /** Path to the resume PDF inside /public. */
  resumePath: string
  resumeFileName: string
  /** true while public/resume contains the placeholder PDF — shows a notice. */
  resumeIsPlaceholder: boolean
}

export interface Contact {
  email: string
  /** Optional. Use international format, e.g. "+91 98765 43210", or null to hide. */
  phone: string | null
  availability: string
  socials: SocialLink[]
}

export interface SkillGroup {
  title: string
  icon: 'briefcase' | 'route' | 'globe' | 'users' | 'handshake' | 'flag' | 'laptop' | 'languages' | 'megaphone'
  skills: string[]
}

export interface Experience {
  role: string
  company: string
  location: string
  /** e.g. "[Mon YYYY] – Present" */
  period: string
  /** e.g. "6 months" */
  duration: string
  /** Shown next to the duration; null hides it. */
  type: 'Full-time' | 'Internship' | 'Part-time' | 'Contract' | null
  summary: string
  responsibilities: string[]
  achievements: string[]
  focusAreas: string[]
}

export interface CaseStudy {
  /** Set to true for sample/template entries; they get a visible "Sample" badge. */
  isSample: boolean
  title: string
  category: 'Domestic' | 'International' | 'Group Tour' | 'Corporate'
  duration: string
  summary: string
  brief: string
  approach: string
  services: string[]
  highlights: string[]
  /** Day-by-day outline of the trip structure. */
  outline: string[]
  /** Photo from src/content/photos.ts, or null to show an illustration. */
  photo: Photo | null
  /** Optional https link (e.g. a LinkedIn post or shared itinerary PDF). Never invent one. */
  link: { label: string; href: string } | null
}

export interface Education {
  degree: string
  specialisation: string
  institution: string
  location: string
  period: string
  details: string[]
}

export interface Certification {
  name: string
  issuer: string
  year: string
  /** Optional https verification link, or null. */
  credentialUrl: string | null
}

/** A responsive, self-hosted photo: files are `${src}-${width}.webp` for each width. */
export interface Photo {
  src: string
  widths: number[]
  /** width ÷ height */
  aspect: number
  alt: string
}

export interface Destination {
  title: string
  place: string | null
  region: 'Domestic' | 'International'
  photo: Photo
}
