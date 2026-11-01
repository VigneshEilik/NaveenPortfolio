/**
 * ============================================================
 *  CONTENT HUB — everything shown on the website lives here.
 * ============================================================
 *
 *  File                What it controls
 *  ----------------    -----------------------------------------------
 *  site.ts             Page title, SEO description, website URL, menu
 *  profile.ts          Name, headline, stats, About text, resume, contact, LinkedIn
 *  skills.ts           Expertise section
 *  approach.ts         "How I plan a journey" steps + scrolling services ribbon
 *  experience.ts       Experience timeline
 *  work.ts             Featured itinerary case studies
 *  education.ts        Education and certifications
 *  destinations.ts     Destinations photo carousel
 *  photos.ts           Photo library (self-hosted images + alt text)
 *
 *  Text in [square brackets] is a placeholder. In local development (npm run dev)
 *  placeholders are highlighted; on the live site they are hidden automatically.
 */
export { site, navItems } from './site.ts'
export { profile, contact } from './profile.ts'
export { skillGroups } from './skills.ts'
export { approachSteps, serviceRibbon } from './approach.ts'
export { experience } from './experience.ts'
export { caseStudies } from './work.ts'
export { education, certifications } from './education.ts'
export { destinations } from './destinations.ts'
export { photos } from './photos.ts'
export type * from './types.ts'
export type { ApproachStep } from './approach.ts'
