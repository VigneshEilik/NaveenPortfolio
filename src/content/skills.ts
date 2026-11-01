import type { SkillGroup } from './types.ts'

/**
 * EXPERTISE / SKILLS
 * ------------------------------------------------------------------
 * Each group becomes a card in the "Expertise" section. The layout adjusts
 * automatically so every row fills the full width, whatever the number of groups.
 *
 * Available icons: briefcase, route, globe, users, handshake, flag, laptop, languages, megaphone
 */
export const skillGroups: SkillGroup[] = [
  {
    title: 'Travel Sales & Telesales',
    icon: 'briefcase',
    skills: [
      'Domestic & international package sales',
      'Telesales & proactive outreach',
      'Package customisation',
      'Lead follow-up & conversion',
      'Repeat-business follow-ups',
    ],
  },
  {
    title: 'Tour Operations',
    icon: 'route',
    skills: [
      'Itinerary planning & package design',
      'Vendor & supplier coordination',
      'Hotel, transport & sightseeing bookings',
      'Travel documentation & compliance',
    ],
  },
  {
    title: 'Destination Knowledge',
    icon: 'globe',
    skills: ['Domestic destinations', 'International destinations', 'Matching destinations to traveller needs'],
  },
  {
    title: 'Customer & Guest Relations',
    icon: 'users',
    skills: [
      'Client handling & CRM',
      'Query resolution & service recovery',
      'Guest communication & follow-up',
      'Hospitality & event support',
    ],
  },
  {
    title: 'Marketing & Management',
    icon: 'megaphone',
    skills: ['Tourism promotion & branding', 'Brochure & content creation', 'Budget planning & tracking'],
  },
  {
    title: 'Group Tour Management',
    icon: 'flag',
    skills: [
      'Groups of 20–50 travellers',
      'Pre-tour briefings & group safety',
      'On-ground coordination',
      'Budgets & post-tour documentation',
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: 'laptop',
    skills: ['CRM systems', 'Google Sheets', 'MS Office', 'Booking platforms'],
  },
  {
    title: 'Languages',
    icon: 'languages',
    skills: ['English', 'Tamil'],
  },
]
