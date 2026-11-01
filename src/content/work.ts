import { photos } from './photos.ts'
import type { CaseStudy } from './types.ts'

/**
 * FEATURED WORK — ITINERARY CASE STUDIES
 * ------------------------------------------------------------------
 * isSample: false → real work (from your resume).
 * isSample: true  → illustrative itinerary format for one of your destinations;
 *                   shown with a visible "Sample" badge.
 *
 * Replace the samples with real trips you sold or planned at LEGSGO / Trabliss
 * (keep customer names private), then set isSample: false.
 * Photos are stock/location images — swap in your own trip photos when you have them.
 * Text in [square brackets] is hidden on the live site until you fill it in.
 */
export const caseStudies: CaseStudy[] = [
  {
    isSample: false,
    title: 'College Group Tours',
    category: 'Group Tour',
    duration: '[e.g. 3 nights / 4 days]',
    summary: 'Student and faculty group tours I planned and managed as part-time tour manager during my MBA.',
    brief:
      'Groups of 20–50 students and faculty needed safe, well-organised tours — with transport, stays and activities planned within an institutional budget.',
    approach:
      'Planned end-to-end logistics, ran pre-tour briefings, handled on-ground coordination and resolved booking changes, delays and guest concerns in real time.',
    services: ['Transportation', 'Accommodation', 'Activity scheduling', 'Budget tracking', 'Documentation'],
    highlights: [
      'Groups of 20–50 participants',
      'Pre-tour briefings and group safety',
      'Budgets and post-tour records kept for the institution',
    ],
    outline: [
      'Before the tour — logistics, bookings and pre-tour briefing',
      'On tour — on-ground coordination and activity schedule',
      'Live issues — booking changes, delays and guest concerns',
      'After the tour — budget reconciliation and documentation',
    ],
    photo: photos.workGroup,
    link: null,
  },

  // ── Domestic samples ──────────────────────────────────────
  {
    isSample: true,
    title: 'Golden Triangle Heritage Tour',
    category: 'Domestic',
    duration: '[5 nights / 6 days]',
    summary: "India's classic first-timer circuit — Delhi, Agra and Jaipur by private car.",
    brief:
      'A couple visiting North India for the first time wanted the iconic monuments without rushing, and a comfortable private car throughout.',
    approach:
      'Planned a Delhi–Agra–Jaipur loop with sunrise at the Taj Mahal, a guided Amber Fort visit and a relaxed shopping evening in Jaipur.',
    services: ['Hotels', 'Private car & driver', 'Monument guides', 'Entry tickets'],
    highlights: ['Taj Mahal at sunrise', 'Amber Fort and Hawa Mahal', 'Single driver for the full circuit'],
    outline: [
      'Days 1–2 — Delhi: Old & New Delhi sightseeing',
      'Day 3 — Drive to Agra, Agra Fort',
      'Day 4 — Taj Mahal sunrise, drive to Jaipur',
      'Day 5 — Amber Fort, City Palace, Hawa Mahal',
      'Day 6 — Return to Delhi for departure',
    ],
    photo: photos.destTaj,
    link: null,
  },
  {
    isSample: true,
    title: 'Kashmir Honeymoon',
    category: 'Domestic',
    duration: '[5 nights / 6 days]',
    summary: 'Houseboat nights on Dal Lake with Gulmarg and Pahalgam day escapes.',
    brief:
      'A newly married couple wanted a romantic, scenic honeymoon in India with snow, gardens and a memorable houseboat stay.',
    approach:
      'Combined a Dal Lake houseboat with hotels in Gulmarg and Pahalgam, added a sunset shikara ride and kept travel days short.',
    services: ['Houseboat & hotels', 'Private transfers', 'Shikara ride', 'Gondola tickets'],
    highlights: ['Dal Lake houseboat stay', 'Gulmarg gondola', 'Honeymoon inclusions on request'],
    outline: [
      'Day 1 — Arrive Srinagar, houseboat check-in, sunset shikara',
      'Day 2 — Mughal Gardens and local markets',
      'Day 3 — Gulmarg and gondola ride',
      'Days 4–5 — Pahalgam valleys',
      'Day 6 — Departure from Srinagar',
    ],
    photo: photos.workKashmir,
    link: null,
  },
  {
    isSample: true,
    title: 'Kerala Family Holiday',
    category: 'Domestic',
    duration: '[5 nights / 6 days]',
    summary: 'Munnar tea hills, Alleppey backwaters and Kochi — paced for kids and grandparents.',
    brief:
      'A family travelling with young children and elderly parents wanted a comfortable holiday without long, tiring travel days.',
    approach:
      'Grouped sightseeing by area to minimise road time, chose family-friendly stays and added a private houseboat night on the backwaters.',
    services: ['Hotels', 'Private transfers', 'Houseboat stay', 'Sightseeing'],
    highlights: ['Short daily travel distances', 'Private houseboat night', 'Single point of contact throughout'],
    outline: [
      'Day 1 — Arrive Kochi, Fort Kochi walk',
      'Days 2–3 — Munnar tea gardens and viewpoints',
      'Day 4 — Thekkady spice plantation',
      'Day 5 — Alleppey houseboat on the backwaters',
      'Day 6 — Departure from Kochi',
    ],
    photo: photos.workKerala,
    link: null,
  },

  // ── International samples ─────────────────────────────────
  {
    isSample: true,
    title: 'Dubai City & Desert Escape',
    category: 'International',
    duration: '[4 nights / 5 days]',
    summary: 'A first-time Dubai package mixing iconic city sights with a desert safari evening.',
    brief:
      'A family of four on their first trip to Dubai wanted the must-see landmarks, one big adventure activity and easy visa support.',
    approach:
      'Paced city sightseeing across two days, added a desert safari with dinner, and shared a visa and documentation checklist well before departure.',
    services: ['Flights', 'Hotel', 'Visa assistance', 'Airport transfers', 'Desert safari', 'City tour'],
    highlights: ['Visa checklist shared early', 'Kid-friendly activity choices', 'Free evening for shopping'],
    outline: [
      'Day 1 — Arrival, hotel check-in and Dubai Marina dhow cruise',
      'Day 2 — City tour and Burj Khalifa observation deck',
      'Day 3 — Desert safari with BBQ dinner',
      'Day 4 — Leisure day and shopping',
      'Day 5 — Departure transfer',
    ],
    photo: photos.workDubai,
    link: null,
  },
  {
    isSample: true,
    title: 'Thailand Island Hopping',
    category: 'International',
    duration: '[5 nights / 6 days]',
    summary: 'A beach-focused Thailand holiday across Phuket and Krabi with island tours.',
    brief:
      'A group of friends wanted a fun, budget-conscious beach holiday with island hopping and some nightlife.',
    approach:
      'Split the stay between Phuket and Krabi, booked a shared island-hopping tour, and kept transfers simple with one inter-city ferry.',
    services: ['Flights', 'Hotels', 'Ferry transfer', 'Island tours', 'Airport transfers'],
    highlights: ['Two beach bases, one easy ferry', 'Phi Phi island-hopping day', 'Budget-friendly group pricing'],
    outline: [
      'Day 1 — Arrival in Phuket and beach evening',
      'Day 2 — Phi Phi islands speedboat tour',
      'Day 3 — Ferry to Krabi, Ao Nang beach',
      'Day 4 — Krabi four-island tour',
      'Day 5 — Leisure and local markets',
      'Day 6 — Departure transfer',
    ],
    photo: photos.workThailand,
    link: null,
  },
  {
    isSample: true,
    title: 'Singapore & Malaysia Combo',
    category: 'International',
    duration: '[6 nights / 7 days]',
    summary: 'Two countries in one trip — Singapore attractions and Kuala Lumpur city life.',
    brief:
      'A family wanted theme parks and city sights across two countries on one budget-friendly trip.',
    approach:
      'Paired Singapore (Sentosa, Gardens by the Bay) with Kuala Lumpur, linked by a comfortable coach, with attraction tickets pre-booked.',
    services: ['Flights', 'Hotels', 'Inter-city coach', 'Attraction tickets', 'Visa guidance'],
    highlights: ['Two countries, one itinerary', 'Pre-booked attraction passes', 'Kid-friendly pacing'],
    outline: [
      'Days 1–3 — Singapore: Sentosa, Gardens by the Bay, night safari',
      'Day 4 — Coach to Kuala Lumpur',
      'Days 5–6 — Petronas Towers, Batu Caves, Genting',
      'Day 7 — Departure from Kuala Lumpur',
    ],
    photo: photos.destSingapore,
    link: null,
  },
  {
    isSample: true,
    title: 'Bali Honeymoon',
    category: 'International',
    duration: '[6 nights / 7 days]',
    summary: 'Ubud jungle villas and Seminyak beaches for a relaxed, romantic first trip abroad.',
    brief:
      'A newly married couple wanted a memorable first international trip with a mix of exploring and relaxing, within a fixed budget.',
    approach:
      'Split the trip between Ubud and the beach, prioritised a few signature experiences, and guided the couple through visa-on-arrival steps.',
    services: ['Flights', 'Pool villa & hotel', 'Airport transfers', 'Private tours', 'Candle-light dinner'],
    highlights: ['Private pool villa in Ubud', 'Nusa Penida day trip', 'Documentation checklist shared early'],
    outline: [
      'Days 1–3 — Ubud: rice terraces, temples, swing',
      'Day 4 — Nusa Penida island day trip',
      'Days 5–6 — Seminyak beach stay and sunset dinner',
      'Day 7 — Departure',
    ],
    photo: photos.workResort,
    link: null,
  },
]
