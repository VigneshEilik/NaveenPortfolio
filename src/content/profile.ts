import type { Contact, Profile } from './types.ts'

/**
 * PERSONAL PROFILE
 * ------------------------------------------------------------------
 * Edit the text below to update the hero and "About" sections.
 * Never list qualifications or achievements you can't back up in an interview.
 */

/** Start date of your current role — used to calculate "months of experience" automatically. */
export const currentRoleStart = new Date(2026, 5, 1) // 1 June 2026 (months are 0-based: 5 = June)

/** Whole months between `start` and today (minimum 1). */
export function monthsSince(start: Date, today: Date = new Date()): number {
  let months = (today.getFullYear() - start.getFullYear()) * 12 + (today.getMonth() - start.getMonth())
  if (today.getDate() < start.getDate()) months -= 1
  return Math.max(months, 1)
}

const monthsInRole = monthsSince(currentRoleStart)

export const profile: Profile = {
  name: 'Naveenkumar M',
  initials: 'NM',
  role: 'Telesales Executive – Package Sales',
  shortRole: 'Telesales Executive',
  eyebrow: 'Tourism & Hospitality Management Professional',
  headline: 'Turning travel ideas into well-planned journeys.',
  // Rotating words in the hero: "I plan ___ — from first call to final transfer."
  rotatingWords: ['domestic holidays', 'international packages', 'group tours', 'custom itineraries'],
  // Animated counters in the hero "booking bar". Only use true numbers.
  stats: [
    { value: monthsInRole, suffix: ' mo', label: 'Package sales, LEGSGO Holidays' },
    { value: '20–50', label: 'Travellers per group tour' },
    { value: 90, suffix: ' days', label: 'Internship, Trabliss Holidays' },
    { value: 'MBA', label: 'Tourism Management' },
  ],
  statement: 'Every great journey starts with listening.',
  intro:
    'MBA graduate in Tourism Management with hands-on experience in holiday package sales, group tour management and hospitality operations — turning traveller enquiries into organised, guest-focused journeys.',
  location: 'Karaikudi, Tamil Nadu',

  // Square headshot used on the boarding-pass card (public/images/photos/headshot-256.webp).
  photo: '/images/photos/headshot-256.webp',

  about: [
    'I am an MBA graduate in Tourism Management from Alagappa University, currently working as a Telesales Executive for holiday packages at LEGSGO Holidays.',
    'Every day I help travellers choose domestic and international holidays — from the first enquiry and package customisation to booking confirmation and post-sale follow-up, with leads and bookings kept up to date in CRM systems and Google Sheets.',
    'During my MBA I worked as a part-time tour manager for college group tours of 20–50 participants, and completed a 90-day internship at Trabliss Holidays, Coimbatore — designing itineraries, coordinating with vendors and creating promotional content.',
  ],

  strengths: [
    'Strong organisation & planning',
    'Quick learner & adaptable',
    'Leadership under pressure',
    'Detail-oriented',
    'Team collaboration',
    'Effective communicator',
  ],

  quickFacts: [
    { label: 'Current role', value: 'Telesales Executive, LEGSGO Holidays' },
    { label: 'Education', value: 'MBA, Alagappa University' },
    { label: 'Based in', value: 'Karaikudi, Tamil Nadu' },
    { label: 'Languages', value: 'English & Tamil' },
  ],

  // To update: replace public/resume/Naveenkumar-M-Resume.pdf (keep the same file name).
  resumePath: '/resume/Naveenkumar-M-Resume.pdf',
  resumeFileName: 'Naveenkumar-M-Resume.pdf',
  resumeIsPlaceholder: false,
}

/**
 * CONTACT DETAILS & SOCIAL LINKS
 * ------------------------------------------------------------------
 * `phone` is shown publicly with a tap-to-call link. Set it to null to hide it.
 */
export const contact: Contact = {
  email: 'naveenmrns001@gmail.com',
  phone: '+91 97904 14275',
  availability: 'Open to opportunities in travel sales, tour operations and hospitality.',
  socials: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/naveenkumartravelorganiser',
      icon: 'linkedin',
    },
  ],
}
