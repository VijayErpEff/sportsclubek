/**
 * Local SEO landing pages — one per service-area city.
 *
 * These pages exist to capture "indoor sports near <city>" / "pickleball <city>" searches.
 * Real city of operation is Elkton, MD; these pages disclose drive time + service-area
 * positioning. All schema points back to the Elkton facility (no fake addresses).
 *
 * Add a city: append an entry here. The `/locations/[slug]` route picks it up.
 */

export type SportSlug =
  | "pickleball"
  | "cricket"
  | "badminton"
  | "volleyball"
  | "baseball"
  | "soccer";

export interface LocationData {
  /** URL slug — `/locations/<slug>` */
  slug: string;
  /** City name, e.g. "Newark" */
  city: string;
  /** Region postal code, e.g. "DE" */
  state: string;
  /** Display label, e.g. "Newark, DE" */
  display: string;
  /** Drive time copy, e.g. "12 minutes" */
  driveTime: string;
  /** Drive distance copy, e.g. "9 miles" */
  driveDistance: string;
  /** ZIP codes this page targets (used in copy + schema) */
  zips: ReadonlyArray<string>;
  /** Nearby landmarks/neighborhoods to seed local relevance */
  nearby: ReadonlyArray<string>;
  /** Sports highlighted for this market, ordered by local demand */
  sports: ReadonlyArray<SportSlug>;
  /** SEO meta */
  meta: {
    title: string;
    description: string;
  };
  /** Hero copy */
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  /** "Why locals choose us" bullets */
  whyHere: ReadonlyArray<{ title: string; body: string }>;
  /** Location-specific FAQs (different from sport FAQs) */
  faqs: ReadonlyArray<{ q: string; a: string }>;
}

export const LOCATIONS: ReadonlyArray<LocationData> = [
  {
    slug: "newark-de",
    city: "Newark",
    state: "DE",
    display: "Newark, DE",
    driveTime: "15 minutes",
    driveDistance: "11 miles",
    zips: ["19702", "19711", "19713", "19716", "19717"],
    nearby: ["University of Delaware", "Christiana", "Bear", "Glasgow"],
    sports: ["pickleball", "cricket", "badminton", "volleyball", "baseball"],
    meta: {
      title: "Indoor Sports Facility Near Newark, DE — 15 Min from UD",
      description:
        "LevelUP Sports is the closest premium indoor sports facility to Newark, DE — 15 minutes from UD and Christiana Mall. Pickleball, cricket, badminton, volleyball & batting cages. Open 7 days.",
    },
    hero: {
      eyebrow: "Serving Newark, DE",
      headline: "Indoor courts & cages, 15 minutes from Newark",
      subhead:
        "Skip the wait for over-booked Newark courts. LevelUP Sports in Elkton, MD is just a 15-minute drive up I-95 — climate-controlled courts, batting cages, and youth academies seven days a week.",
    },
    whyHere: [
      {
        title: "Closer than you think",
        body: "11 miles up I-95 from Newark — faster than driving across town to Bear or New Castle. Free on-site parking, no toll.",
      },
      {
        title: "Indoor year-round",
        body: "Climate-controlled courts mean no rainouts, no humidity, no closed sessions in February. Book in advance or drop in for open play.",
      },
      {
        title: "Built for Newark families",
        body: "Youth academies for ages 6–18 in baseball, cricket, badminton, and volleyball. Most Newark students play in our weekend leagues.",
      },
      {
        title: "Pricing that makes sense",
        body: "Memberships start at $49/month. Court rentals from $35/hour. Compare that to private clubs in Wilmington and you'll see why Newark families drive up.",
      },
    ],
    faqs: [
      {
        q: "How far is LevelUP Sports from Newark, DE?",
        a: "We're 11 miles / about 15 minutes from downtown Newark via I-95 North to Elkton, MD. From the UD campus, it's roughly 20 minutes door-to-door at typical times.",
      },
      {
        q: "Do you have indoor pickleball courts near Newark?",
        a: "Yes — we run dedicated indoor pickleball courts open 7 days a week, with reservations, open play, and ladder leagues. We're the closest dedicated indoor pickleball facility to Newark.",
      },
      {
        q: "Can University of Delaware students get a discount?",
        a: "Yes. Students with a valid UD ID get a discounted hourly rate on court and cage rentals, plus reduced pricing on monthly memberships. Show your ID at check-in.",
      },
      {
        q: "Do you offer cricket nets near Newark?",
        a: "We're the only facility within 20 minutes of Newark offering indoor cricket nets with bowling machines. The BRSS Cricket Academy partnership runs structured coaching for youth and adult players.",
      },
      {
        q: "Is parking free?",
        a: "Yes — free on-site parking with 60+ spaces. No street parking hassle like you get near downtown Newark.",
      },
    ],
  },
  {
    slug: "middletown-de",
    city: "Middletown",
    state: "DE",
    display: "Middletown, DE",
    driveTime: "25 minutes",
    driveDistance: "20 miles",
    zips: ["19709"],
    nearby: ["Odessa", "Townsend", "Appoquinimink", "Bear"],
    sports: ["baseball", "cricket", "pickleball", "badminton", "soccer"],
    meta: {
      title: "Indoor Sports Facility Near Middletown, DE — Batting Cages & Courts",
      description:
        "LevelUP Sports serves Middletown, DE families with indoor batting cages, cricket nets, pickleball, and youth academies — 25 minutes via Route 896 / I-95. Open 7 days.",
    },
    hero: {
      eyebrow: "Serving Middletown, DE",
      headline: "Year-round training for Middletown athletes",
      subhead:
        "No indoor sports facility in Middletown, no batting cages in Odessa, no cricket nets in Townsend. LevelUP Sports in Elkton, MD is the closest full-service indoor club — 25 minutes via 896 / I-95.",
    },
    whyHere: [
      {
        title: "The closest full-service indoor club",
        body: "Middletown has rec leagues but no climate-controlled multi-sport facility. We're the next-closest option going north — 25 minutes via Route 896.",
      },
      {
        title: "Batting cages that actually fit travel-ball schedules",
        body: "8 indoor cages, bowling machines for cricket and baseball, weekend availability through 11 PM. Built for Appoquinimink and MOT travel teams.",
      },
      {
        title: "Youth academies that match Middletown's growth",
        body: "Middletown is one of Delaware's fastest-growing communities. Our academies in baseball, cricket, badminton, and soccer scale for first-timers through tournament-level kids.",
      },
      {
        title: "Worth the drive",
        body: "Membership at $49/month + free parking + climate-controlled courts year-round. Families from Townsend and Odessa already make the trip weekly.",
      },
    ],
    faqs: [
      {
        q: "Is there an indoor sports facility in Middletown, DE?",
        a: "Not currently. The closest full-service indoor multi-sport facility is LevelUP Sports in Elkton, MD — about 25 minutes via Route 896 north to I-95, then east.",
      },
      {
        q: "Where can I find batting cages near Middletown?",
        a: "LevelUP Sports has 8 indoor batting cages with pitching machines, open 7 days a week. We're 20 miles / ~25 minutes from Middletown, with weekend availability through late evening for travel-ball families.",
      },
      {
        q: "Do you have weekend availability for Appoquinimink travel teams?",
        a: "Yes — we host travel teams from Appoquinimink, MOT, and surrounding leagues on weekends. Block-book cages or full courts by emailing info@levelupsports.us.",
      },
      {
        q: "How do I get to LevelUP from Middletown?",
        a: "Take Route 896 north to I-95 north, then east at Exit 109A toward Elkton. We're at 701 E Pulaski Hwy. Typical drive time is 25 minutes; allow 30 during weekday rush.",
      },
      {
        q: "Do you offer cricket academy programs for Middletown kids?",
        a: "Yes — our cricket academy in partnership with BRSS Cricket runs year-round coaching for ages 6+. We have many families from MOT and Bear who drive up for weekly sessions.",
      },
    ],
  },
  {
    slug: "glasgow-de",
    city: "Glasgow",
    state: "DE",
    display: "Glasgow, DE",
    driveTime: "12 minutes",
    driveDistance: "9 miles",
    zips: ["19702"],
    nearby: ["Bear", "Newark", "Christiana"],
    sports: ["pickleball", "badminton", "cricket", "volleyball", "baseball"],
    meta: {
      title: "Indoor Sports Near Glasgow, DE — 12 Min to Courts & Cages",
      description:
        "LevelUP Sports is just 12 minutes from Glasgow, DE — closest premium indoor pickleball, cricket, badminton, and batting cages. Open 7 days. Free parking.",
    },
    hero: {
      eyebrow: "Serving Glasgow, DE",
      headline: "Premium indoor courts, 12 minutes from Glasgow",
      subhead:
        "Glasgow's closest indoor sports facility. Pickleball, cricket nets, batting cages, youth academies — 9 miles up I-95 in Elkton, MD.",
    },
    whyHere: [
      {
        title: "Your closest indoor multi-sport club",
        body: "9 miles up I-95 — closer than driving to Wilmington or Christiana for indoor courts.",
      },
      {
        title: "Open play that fits real schedules",
        body: "Evening and weekend open-play sessions for pickleball, badminton, and volleyball. Book online or drop in.",
      },
      {
        title: "Programs for every age",
        body: "Kids' agility, youth academies, adult leagues — all under one roof.",
      },
      {
        title: "No-hassle pricing",
        body: "$49/month memberships or pay-per-session court rentals. Free parking.",
      },
    ],
    faqs: [
      {
        q: "How long is the drive from Glasgow, DE to LevelUP Sports?",
        a: "About 12 minutes / 9 miles via I-95 north to Exit 109A in Elkton.",
      },
      {
        q: "Do you have indoor pickleball near Glasgow?",
        a: "Yes — dedicated indoor pickleball courts with reservations, open play, and league nights.",
      },
      {
        q: "Are there youth sports programs that Glasgow / Bear families use?",
        a: "Yes — we have a strong base of families from Glasgow, Bear, and the Christiana area in our youth academies (baseball, cricket, badminton, volleyball).",
      },
    ],
  },
  {
    slug: "north-east-md",
    city: "North East",
    state: "MD",
    display: "North East, MD",
    driveTime: "12 minutes",
    driveDistance: "8 miles",
    zips: ["21901"],
    nearby: ["Charlestown", "Rising Sun", "Perryville"],
    sports: ["baseball", "pickleball", "cricket", "badminton", "volleyball"],
    meta: {
      title: "Indoor Sports Facility Near North East, MD — 12 Min Drive",
      description:
        "LevelUP Sports — indoor batting cages, pickleball, cricket nets, and badminton courts 12 minutes from North East, MD. Cecil County's premier multi-sport club.",
    },
    hero: {
      eyebrow: "Serving North East, MD",
      headline: "Cecil County's indoor sports home",
      subhead:
        "North East families have a year-round indoor club 12 minutes away. Batting cages, pickleball, cricket nets, badminton, youth academies — all under one roof.",
    },
    whyHere: [
      {
        title: "The closest indoor club in Cecil County",
        body: "Most of Cecil County is outdoor-only. We're the indoor option — open 7 days, climate-controlled, weather-proof.",
      },
      {
        title: "Built for North East youth sports",
        body: "Our baseball and cricket academies pull heavily from North East, Rising Sun, and Perryville. Travel teams use our cages year-round.",
      },
      {
        title: "Adult leagues and open play",
        body: "Pickleball, badminton, and volleyball leagues run weeknights. No need to drive to Newark or Wilmington for league play.",
      },
      {
        title: "Local pricing",
        body: "$49/month memberships, court rentals from $35/hour. Free parking. Pay-per-session welcome.",
      },
    ],
    faqs: [
      {
        q: "How far is LevelUP from North East, MD?",
        a: "8 miles / about 12 minutes via Route 40 or I-95 west to Elkton.",
      },
      {
        q: "Do you have batting cages serving North East baseball teams?",
        a: "Yes — 8 indoor cages with pitching machines. North East Little League and travel-ball families book regularly.",
      },
      {
        q: "Is there indoor pickleball near North East, MD?",
        a: "Yes — we're the closest dedicated indoor pickleball facility to North East and Charlestown.",
      },
    ],
  },
] as const;

export function getLocation(slug: string): LocationData | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}
