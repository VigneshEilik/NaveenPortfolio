import { photos } from './photos.ts'
import type { Destination } from './types.ts'

/**
 * DESTINATIONS — the places I plan and sell holidays for.
 * ------------------------------------------------------------------
 * Split into Domestic (India) and International. Each becomes a photo card in the
 * Destinations section; the two groups scroll in separate rows.
 * `place` is the short line of highlights shown under the name.
 */
export const destinations: Destination[] = [
  // ── Domestic ─────────────────────────────────────────────
  { title: 'Golden Triangle', place: 'Delhi · Agra · Jaipur', region: 'Domestic', photo: photos.destTaj },
  { title: 'Shimla & Manali', place: 'Himachal Pradesh', region: 'Domestic', photo: photos.destManali },
  { title: 'Kashmir', place: 'Srinagar · Gulmarg · Pahalgam', region: 'Domestic', photo: photos.destKashmir },
  { title: 'Gangtok & Darjeeling', place: 'Sikkim · West Bengal', region: 'Domestic', photo: photos.destDarjeeling },
  { title: 'Meghalaya', place: 'Shillong · Cherrapunji', region: 'Domestic', photo: photos.destMeghalaya },
  { title: 'Karnataka', place: 'Hampi · Coorg · Mysuru', region: 'Domestic', photo: photos.destHampi },
  { title: 'Tamil Nadu', place: 'Madurai · Ooty · Rameswaram', region: 'Domestic', photo: photos.destMadurai },
  { title: 'Kerala', place: 'Munnar · Alleppey · Kochi', region: 'Domestic', photo: photos.destBackwaters },
  { title: 'Rajasthan', place: 'Udaipur · Jodhpur · Jaisalmer', region: 'Domestic', photo: photos.destUdaipur },

  // ── International ────────────────────────────────────────
  { title: 'Thailand', place: 'Phuket · Krabi · Bangkok', region: 'International', photo: photos.workThailand },
  { title: 'Malaysia', place: 'Kuala Lumpur · Langkawi', region: 'International', photo: photos.destKualaLumpur },
  { title: 'Singapore', place: 'Marina Bay · Sentosa', region: 'International', photo: photos.destSingapore },
  { title: 'Bali', place: 'Ubud · Seminyak · Nusa Penida', region: 'International', photo: photos.destBali },
  { title: 'Vietnam', place: 'Ha Long Bay · Hanoi · Da Nang', region: 'International', photo: photos.destHalong },
  { title: 'Sri Lanka', place: 'Kandy · Ella · Bentota', region: 'International', photo: photos.destSriLanka },
  { title: 'Japan', place: 'Tokyo · Kyoto · Mt Fuji', region: 'International', photo: photos.destJapan },
  { title: 'Dubai', place: 'Burj Khalifa · Desert safari', region: 'International', photo: photos.workDubai },
  { title: 'Europe', place: 'Paris · Switzerland · Italy', region: 'International', photo: photos.destEurope },
  { title: 'Maldives', place: 'Water villas · Island resorts', region: 'International', photo: photos.destMaldives },
]
