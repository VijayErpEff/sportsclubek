// ============================================================
// UPPER HAND BOOKING URLS
// Centralized booking links for the Upper Hand platform.
// Update URLs here when programs change — all pages reference this file.
// ============================================================

const UH_BASE = "https://app.upperhand.io/customers/2578-levelup-sports-and-athletics-club";

export const BOOKING_URLS = {
  /** All offerings — default landing for general booking */
  offerings: `${UH_BASE}/offerings`,

  /** Events / sessions schedule on Upper Hand */
  schedule: `${UH_BASE}/events`,

  /** Credit passes on Upper Hand */
  creditPasses: `${UH_BASE}/credit_passes`,

  /** All memberships overview */
  memberships: `${UH_BASE}/memberships`,

  /** Spring Offer - Game Pass ($10/month, 3-month commitment, OpenPlay access) */
  springOffer: `${UH_BASE}/client-memberships/11431`,

  /** Pickleball Golden Hour package */
  pickleballGoldenHour: `${UH_BASE}/client-memberships/11264`,

  // ── Academy Enrollments ──────────────────────────────────
  kidsAgilityAcademy: `${UH_BASE}/client-memberships/11414`,
  volleyballAcademy: `${UH_BASE}/client-memberships/11415`,
  cricketAcademy: `${UH_BASE}/client-memberships/11416`,
  badmintonAcademy: `${UH_BASE}/client-memberships/11417`,

  // ── Events / Drop-In / Rentals ───────────────────────────
  cricketCageRentals: `${UH_BASE}/events/186578-cricket-cage-rentals`,
  pickleballOpenPlay: `${UH_BASE}/events/174223-pickle_ball-open_play-weekdays-9am-4pm`,
  badmintonOpenPlay: `${UH_BASE}/events/174234-badminton-member-open_play-every_day`,
  baseballLittleSluggersL: `${UH_BASE}/events/181868-little-sluggers`,
  kidsAgility: `${UH_BASE}/events/187194-kids-agility-and-athleticism-program`,
} as const;

/** Map sport type → booking URL. Falls back to general offerings. */
export function getBookingUrl(sport: string): string {
  const map: Record<string, string> = {
    cricket: BOOKING_URLS.cricketCageRentals,
    pickleball: BOOKING_URLS.pickleballOpenPlay,
    badminton: BOOKING_URLS.badmintonOpenPlay,
    agility: BOOKING_URLS.kidsAgility,
  };
  return map[sport] ?? BOOKING_URLS.offerings;
}
