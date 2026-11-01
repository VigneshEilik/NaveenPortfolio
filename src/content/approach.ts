/**
 * "HOW I PLAN A JOURNEY" — process steps and the scrolling services ribbon.
 * ------------------------------------------------------------------
 * These describe how you work. Edit the wording so it matches your real process.
 */
export interface ApproachStep {
  title: string
  body: string
}

export const approachSteps: ApproachStep[] = [
  {
    title: 'Listen to the traveller',
    body: 'Understand the purpose of the trip, travel dates, budget, group and the experiences they are hoping for.',
  },
  {
    title: 'Recommend destinations',
    body: 'Suggest domestic or international options that suit the season, the budget and the brief.',
  },
  {
    title: 'Prepare the itinerary',
    body: 'Build a clear, day-wise itinerary and package that is realistic to follow and easy to read.',
  },
  {
    title: 'Confirm & coordinate',
    body: 'Confirm hotels, transport and sightseeing with vendors, close the booking and keep every detail updated in the CRM.',
  },
  {
    title: 'Support & follow up',
    body: 'Stay reachable during the trip, manage groups on the ground as tour manager, and follow up afterwards for feedback and repeat business.',
  },
]

/** Words shown in the scrolling ribbon under the hero. */
export const serviceRibbon: string[] = [
  'Domestic Holidays',
  'International Packages',
  'Itinerary Preparation',
  'Destination Knowledge',
  'Customer Handling',
  'Vendor Coordination',
  'Group Tour Management',
  'CRM & Follow-ups',
]
