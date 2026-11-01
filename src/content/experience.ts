import { currentRoleStart, monthsSince } from './profile.ts'
import type { Experience } from './types.ts'

/**
 * PROFESSIONAL EXPERIENCE (most recent first)
 * ------------------------------------------------------------------
 * Achievements: add only results you can verify.
 * If a list is empty, that block is hidden automatically.
 */
const months = monthsSince(currentRoleStart)

export const experience: Experience[] = [
  {
    role: 'Telesales Executive – Package Sales',
    company: 'LEGSGO Holidays',
    location: '',
    period: 'Jun 2026 – Present',
    duration: `${months} month${months === 1 ? '' : 's'}`,
    type: null,
    summary:
      'Selling domestic and international holiday packages over the phone — managing every customer from first enquiry to confirmed booking and post-sale follow-up.',
    responsibilities: [
      'Handle telesales for domestic and international holiday packages through proactive customer outreach.',
      'Manage end-to-end customer coordination — from initial inquiry and package customisation to booking confirmation and post-sale follow-up.',
      'Apply knowledge of domestic and international destinations to recommend suitable packages and close sales.',
      'Maintain customer records, leads and booking status using CRM systems and Google Sheets.',
      'Follow up with prospective and existing customers to maximise conversions and encourage repeat business.',
    ],
    achievements: ['Consistently achieving booking targets through proactive customer outreach.'],
    focusAreas: ['Telesales', 'Package Customisation', 'CRM & Google Sheets', 'Follow-ups & Conversions', 'Domestic & International'],
  },
  {
    role: 'Part-Time Tour Manager',
    company: 'College Group Tours',
    location: '',
    period: '2024 – 2026',
    duration: 'During MBA',
    type: 'Part-time',
    summary:
      'Planned and managed group tours for students and faculty — from logistics and budgets before departure to safety and on-ground coordination during the trip.',
    responsibilities: [
      'Planned and managed end-to-end logistics for student and faculty group tours, including transportation, accommodation and activity scheduling.',
      'Conducted pre-tour briefings, ensured group safety and handled on-ground coordination at tourism destinations.',
      'Resolved real-time issues such as booking changes, delays and guest concerns with professionalism.',
      'Maintained budgets and post-tour documentation for institutional records.',
    ],
    achievements: ['Led diverse groups of 20–50 participants, strengthening leadership and interpersonal skills.'],
    focusAreas: ['Group Tour Management', 'Logistics', 'Pre-tour Briefings', 'Budgeting', 'Guest Safety'],
  },
  {
    role: 'Tourism Intern',
    company: 'Trabliss Holidays',
    location: 'Coimbatore',
    period: '2025 – 2026',
    duration: '90 days',
    type: 'Internship',
    summary:
      'Hands-on internship across itinerary design, vendor coordination, customer service and travel marketing.',
    responsibilities: [
      'Assisted in designing and customising tour itineraries and holiday packages for domestic and international clients.',
      'Coordinated with vendors for hotel bookings, transport arrangements and sightseeing activities.',
      'Supported customer service operations — handling inquiries, follow-ups and client documentation.',
      'Contributed to marketing initiatives including brochure design and promotional content creation.',
      'Gained exposure to CRM systems, booking platforms and travel operations workflows.',
    ],
    achievements: [],
    focusAreas: ['Itinerary Design', 'Vendor Coordination', 'Customer Service', 'Travel Marketing'],
  },
]
