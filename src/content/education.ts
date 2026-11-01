import type { Certification, Education } from './types.ts'

/**
 * EDUCATION (most recent first)
 */
export const education: Education[] = [
  {
    degree: 'Master of Business Administration (MBA)',
    specialisation: 'Tourism Management',
    institution: 'Alagappa University',
    location: 'Karaikudi',
    period: '2024 – 2026',
    details: ['Tourism Marketing', 'Hospitality Management', 'Sustainable Tourism', 'Event Management', 'Tour Operations'],
  },
  {
    degree: 'Bachelor of Technology (B.Tech)',
    specialisation: 'Biotechnology',
    institution: 'St. Michael College of Engineering & Technology',
    location: 'Kalayarkoil',
    period: '2017 – 2021',
    details: [],
  },
]

/**
 * CERTIFICATIONS
 * ------------------------------------------------------------------
 * Add only certifications you have actually earned, e.g.
 *   { name: 'IATA Foundation in Travel & Tourism', issuer: 'IATA', year: '2027', credentialUrl: null }
 * While the list is empty, the certifications block is hidden.
 */
export const certifications: Certification[] = []
