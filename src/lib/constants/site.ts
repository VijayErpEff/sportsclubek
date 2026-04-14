export const SITE_CONFIG = {
  name: "LevelUP Sports & Athletics Club",
  shortName: "LevelUP Sports",
  tagline: "Elevate Your Game",
  description:
    "Premier multi-sport facility in Elkton, MD offering expert coaching, modern courts, and programs in baseball, cricket, badminton, pickleball, volleyball, and soccer for all ages and skill levels.",
  url: "https://levelupsports.us",
  phone: "(443) 406-6494",
  email: "info@levelupsports.us",
  address: {
    street: "701 E Pulaski Hwy",
    city: "Elkton",
    state: "MD",
    zip: "21921",
    country: "US",
    full: "701 E Pulaski Hwy, Elkton, MD 21921",
  },
  geo: {
    latitude: 39.6068,
    longitude: -75.8130,
  },
  /** Google Maps Place ID for structured data and direct links */
  googlePlaceId: "ChIJ7fTmJYapx4kRnh1EB51-01U",
  /** Google Maps listing URL using Place ID */
  googleMapsUrl:
    "https://www.google.com/maps/place/?q=place_id:ChIJ7fTmJYapx4kRnh1EB51-01U",
  /** Direct Google review URL — takes users straight to the review form */
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJ7fTmJYapx4kRnh1EB51-01U",
  social: {
    facebook: "https://www.facebook.com/people/LevelUP-Sports-Athletics-Club/61579103465434/",
    instagram: "https://www.instagram.com/levelupsportsandathleticsclub/",
    twitter: "https://twitter.com/levelupsports",
    youtube: "https://youtube.com/@levelupsports",
  },
  hours: {
    weekday: "6:00 AM - 11:00 PM",
    saturday: "6:00 AM - 11:00 PM",
    sunday: "6:00 AM - 9:00 PM",
  },
  /** Nearby cities and areas served — used for local SEO */
  serviceAreas: [
    "Elkton, MD",
    "Middletown, DE",
    "Newark, DE",
    "Wilmington, DE",
    "Bear, DE",
    "Glasgow, DE",
    "New Castle, DE",
    "Christiana, DE",
    "Hockessin, DE",
    "North East, MD",
    "Rising Sun, MD",
    "Perryville, MD",
    "Chesapeake City, MD",
    "Havre de Grace, MD",
    "Cecil County, MD",
    "New Castle County, DE",
    "Chester County, PA",
    "Kennett Square, PA",
    "Oxford, PA",
  ],
} as const;

export const SPORTS = [
  {
    name: "Badminton",
    slug: "badminton",
    icon: "badminton",
    color: "#2A5A8C",
    image: "/images/sports/LevelUp/Badminton Area Single Court.jpg",
    description:
      "Competition-grade courts with coaching from certified professionals.",
    hasAcademy: true,
  },
  {
    name: "Cricket",
    slug: "cricket",
    icon: "cricket",
    color: "#1B7D3A",
    image: "/images/sports/LevelUp/Cricket-Team.jpg",
    description:
      "Professional cricket facility with nets, coaching, and structured programs.",
    hasAcademy: true,
  },
  {
    name: "Volleyball",
    slug: "volleyball",
    icon: "volleyball",
    color: "#D97706",
    image: "/images/sports/LevelUp/02-Main-Area-2.jpg",
    description:
      "Indoor volleyball courts with coaching, leagues, and open play for all levels.",
    hasAcademy: true,
  },
  {
    name: "Pickleball",
    slug: "pickleball",
    icon: "pickleball",
    color: "#2BA84A",
    image: "/images/sports/LevelUp/Pickleball-2.jpg",
    description:
      "Indoor pickleball courts for open play, lessons, and court rentals.",
    hasAcademy: false,
  },
  {
    name: "Baseball",
    slug: "baseball",
    icon: "baseball",
    color: "#1B3A5C",
    image: "/images/sports/LevelUp/Baseball.jpg",
    description:
      "Indoor batting cages and expert coaching for players of all levels.",
    hasAcademy: true,
  },
  {
    name: "Soccer",
    slug: "soccer",
    icon: "soccer",
    color: "#B83A2F",
    image: "/images/sports/LevelUp/04-Training-Area.jpg",
    description:
      "Year-round indoor soccer and futsal on professional turf. Youth academies through adult leagues.",
    hasAcademy: true,
  },
] as const;

export const SPORT_NAV_ITEMS = [
  { name: "Badminton",  href: "/badminton",  academy: "/badminton-academy" as string | null,  emoji: "\ud83c\udff8", desc: "Competition-grade courts" },
  { name: "Cricket",    href: "/cricket",    academy: "/cricket-academy" as string | null,    emoji: "\ud83c\udfcf", desc: "Nets & bowling machines" },
  { name: "Volleyball", href: "/volleyball", academy: "/volleyball-academy" as string | null, emoji: "\ud83c\udfd0", desc: "Leagues, coaching & open play" },
  { name: "Pickleball", href: "/pickleball", academy: null as string | null,                  emoji: "\ud83c\udfd3", desc: "Open play & rentals" },
  { name: "Soccer",     href: "/soccer",     academy: "/soccer-academy" as string | null,     emoji: "\u26bd",       desc: "Indoor futsal & training" },
  { name: "Baseball",   href: "/baseball",   academy: "/baseball-academy" as string | null,   emoji: "\u26be",       desc: "Batting cages & coaching" },
];

export const NAV_LINKS = [
  {
    label: "Sports",
    href: "#",
    children: [
      { label: "Badminton", href: "/badminton" },
      { label: "Badminton Academy", href: "/badminton-academy" },
      { label: "Cricket", href: "/cricket" },
      { label: "Cricket Academy", href: "/cricket-academy" },
      { label: "Volleyball", href: "/volleyball" },
      { label: "Volleyball Academy", href: "/volleyball-academy" },
      { label: "Pickleball", href: "/pickleball" },
      { label: "Baseball", href: "/baseball" },
      { label: "Baseball Academy", href: "/baseball-academy" },
      { label: "Soccer", href: "/soccer" },
      { label: "Soccer Academy", href: "/soccer-academy" },
      { label: "Kids Agility", href: "/kids-agility" },
    ],
  },
  { label: "Facilities", href: "/facilities" },
  { label: "Memberships", href: "/memberships" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
] as const;
