import type { Photo } from './types.ts'

/**
 * PHOTO LIBRARY
 * ------------------------------------------------------------------
 * All photos are self-hosted in public/images/photos as responsive WebP files
 * (`<name>-<width>.webp`). Source: Unsplash (free to use under the Unsplash License,
 * https://unsplash.com/license) — see public/images/photos/CREDITS.md.
 *
 * To use your OWN photo (e.g. from a trip you managed):
 *   1. Export it as WebP at 640px and 1080px wide (free tool: https://squoosh.app)
 *      and save as public/images/photos/my-trip-640.webp and my-trip-1080.webp.
 *   2. Add an entry below and reference it from work.ts / destinations.ts.
 *
 * `alt` describes the image for screen readers. Keep it accurate.
 */
const base = '/images/photos'
const card = [640, 1080]

export const photos = {
  heroLake: {
    src: `${base}/hero-lake`,
    widths: [960, 1600, 2400],
    aspect: 1.5,
    alt: 'Turquoise mountain lake with a wooden rowing boat, surrounded by forested peaks',
  },
  /** Naveenkumar's own portrait (cropped 4:5 from the supplied photo). */
  portrait: {
    src: `${base}/portrait`,
    widths: [480, 720],
    aspect: 0.8,
    alt: 'Portrait of Naveenkumar M in a navy suit and tie, smiling',
  },
  skillBeach: {
    src: `${base}/skill-beach`,
    widths: card,
    aspect: 1.505,
    alt: 'Tropical beach with turquoise water at sunset',
  },
  skillMountains: {
    src: `${base}/skill-mountains`,
    widths: card,
    aspect: 1.5,
    alt: 'Snow-capped mountains rising above a sea of clouds at sunrise',
  },
  approachDusk: {
    src: `${base}/approach-dusk`,
    widths: [960, 1600],
    aspect: 1.5,
    alt: 'Calm lake with a lone tree at dusk under a purple sky',
  },
  workKerala: {
    src: `${base}/work-kerala`,
    widths: card,
    aspect: 1.498,
    alt: 'Traditional houseboat cruising on palm-lined backwaters',
  },
  workResort: {
    src: `${base}/work-resort`,
    widths: card,
    aspect: 1.5,
    alt: 'Resort infinity pool with thatched villas and tropical mountains',
  },
  workGroup: {
    src: `${base}/work-group`,
    widths: card,
    aspect: 1.5,
    alt: 'Group of friends with backpacks laughing together on a mountain trail',
  },
  workDubai: {
    src: `${base}/work-dubai`,
    widths: card,
    aspect: 1.5,
    alt: 'Dubai skyline with the Burj Khalifa at sunset',
  },
  workThailand: {
    src: `${base}/work-thailand`,
    widths: card,
    aspect: 1.45,
    alt: 'Colourful longtail boats moored by a limestone island in turquoise water',
  },
  // Destination photos — Wikimedia Commons (credited on /credits.html) and Unsplash
  destManali: { src: `${base}/dest-manali`, widths: card, aspect: 1.5, alt: 'Snow-covered Solang Valley near Manali with Himalayan peaks' },
  destKashmir: { src: `${base}/dest-kashmir`, widths: card, aspect: 1.5, alt: 'Colourful shikara boats on Dal Lake, Srinagar, with mountains behind' },
  workKashmir: { src: `${base}/work-kashmir`, widths: card, aspect: 1.5, alt: 'Shikara gliding past houseboats on Dal Lake, Srinagar' },
  destDarjeeling: { src: `${base}/dest-darjeeling`, widths: card, aspect: 1.333, alt: 'Rolling tea gardens on the hills of Darjeeling' },
  destMeghalaya: { src: `${base}/dest-meghalaya`, widths: card, aspect: 1.5, alt: 'Double-decker living root bridge in a Meghalaya rainforest' },
  destHampi: { src: `${base}/dest-hampi`, widths: card, aspect: 1.5, alt: 'Stone chariot at the Vittala Temple, Hampi' },
  destMadurai: { src: `${base}/dest-madurai`, widths: card, aspect: 1.526, alt: 'Ornate, colourful gopuram of the Meenakshi Amman Temple, Madurai' },
  destUdaipur: { src: `${base}/dest-udaipur`, widths: card, aspect: 1.757, alt: 'City Palace of Udaipur rising above Lake Pichola' },
  destKualaLumpur: { src: `${base}/dest-kualalumpur`, widths: card, aspect: 1.509, alt: 'Petronas Twin Towers lit up at night, Kuala Lumpur' },
  destSriLanka: { src: `${base}/dest-srilanka`, widths: card, aspect: 1.333, alt: 'Train crossing the Nine Arch Bridge in the hills of Ella, Sri Lanka' },
  destJapan: { src: `${base}/dest-japan`, widths: card, aspect: 1.5, alt: 'Snow-capped Mount Fuji framed by cherry blossoms' },
  destEurope: { src: `${base}/dest-europe`, widths: card, aspect: 1.504, alt: 'The Eiffel Tower and the Seine at dusk, Paris' },
  destSingapore: { src: `${base}/dest-singapore`, widths: card, aspect: 1.297, alt: 'Marina Bay Sands and Gardens by the Bay, Singapore' },
  destMaldives: { src: `${base}/dest-maldives`, widths: card, aspect: 0.8, alt: 'Overwater villas in a turquoise lagoon, Maldives' },
  /** Promotional banner of Naveenkumar supplied by him (resume card). */
  resumeBanner: {
    src: `${base}/resume-banner`,
    widths: [800, 1280, 1600],
    aspect: 1.778,
    alt: "Naveenkumar M in a navy suit, arms crossed, beside a world map and landmarks with the words 'Tourism — Connecting People, Exploring the World'",
  },
  destTaj: {
    src: `${base}/dest-taj`,
    widths: card,
    aspect: 1.509,
    alt: 'The Taj Mahal framed by a carved archway',
  },
  destBackwaters: {
    src: `${base}/dest-backwaters`,
    widths: card,
    aspect: 1.778,
    alt: 'Houseboat on calm backwaters surrounded by coconut palms',
  },
  destHalong: {
    src: `${base}/dest-halong`,
    widths: card,
    aspect: 1.5,
    alt: 'Limestone islands and boats across Ha Long Bay',
  },
  destBali: {
    src: `${base}/dest-bali`,
    widths: card,
    aspect: 0.7535,
    alt: 'Tiered lakeside temple reflected in still water on a misty morning',
  },
  // Full-width section backgrounds
  bgWorldMap: { src: `${base}/bg-worldmap`, widths: [960, 1600], aspect: 1.505, alt: 'Vintage world map' },
  bgPlanning: {
    src: `${base}/bg-planning`,
    widths: [960, 1600],
    aspect: 1.333,
    alt: 'Travel planning flat-lay with a map, camera, notebook and magnifying glass',
  },
  bgRoad: { src: `${base}/bg-road`, widths: [960, 1600], aspect: 0.667, alt: 'Open road winding through a red-rock canyon' },
  bgWindow: { src: `${base}/bg-window`, widths: [960, 1600], aspect: 1.778, alt: 'Sunset seen through an aircraft window' },
  bgSantorini: {
    src: `${base}/bg-santorini`,
    widths: [960, 1600],
    aspect: 1.44,
    alt: 'White-washed hillside village above the sea at dusk',
  },
  bgJetty: { src: `${base}/bg-jetty`, widths: [960, 1600], aspect: 1.332, alt: 'Wooden jetty on a calm lake under a clear blue sky' },
  contactWing: {
    src: `${base}/contact-wing`,
    widths: [960, 1600],
    aspect: 1.506,
    alt: 'Aircraft wing above the clouds in golden light',
  },
} satisfies Record<string, Photo>
