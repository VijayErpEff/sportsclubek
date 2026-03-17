export const SITE_CONFIG = {
  name: "LevelUP Sports & Athletics Club",
  shortName: "LevelUP Sports",
  tagline: "Elevate Your Game",
  description:
    "Premier multi-sport facility in Elkton, MD offering expert coaching, modern courts, and programs in baseball, cricket, badminton, and pickleball for all ages and skill levels.",
  url: "https://levelupsports.us",
  phone: "(410) 555-0123",
  email: "info@levelupsports.us",
  address: {
    street: "123 Sports Way",
    city: "Elkton",
    state: "MD",
    zip: "21921",
    country: "US",
    full: "123 Sports Way, Elkton, MD 21921",
  },
  geo: {
    latitude: 39.6065,
    longitude: -75.8313,
  },
  social: {
    facebook: "https://www.facebook.com/people/LevelUp-Sports-Athletics-Club/61579103465434/",
    instagram: "https://www.instagram.com/levelupsportsandathleticsclub/",
    twitter: "https://twitter.com/levelupsports",
    youtube: "https://youtube.com/@levelupsports",
  },
  hours: {
    weekday: "6:00 AM - 10:00 PM",
    saturday: "7:00 AM - 9:00 PM",
    sunday: "8:00 AM - 8:00 PM",
  },
} as const;

export const SPORTS = [
  {
    name: "Baseball",
    slug: "baseball",
    icon: "baseball",
    color: "#1A3B8F",
    image: "/images/sports/baseball.jpg",
    description:
      "Indoor batting cages and expert coaching for players of all levels.",
    hasAcademy: true,
  },
  {
    name: "Cricket",
    slug: "cricket",
    icon: "cricket",
    color: "#1B7D3A",
    image: "/images/sports/cricket.png",
    description:
      "Professional cricket facility with nets, coaching, and structured programs.",
    hasAcademy: true,
  },
  {
    name: "Badminton",
    slug: "badminton",
    icon: "badminton",
    color: "#2B52B0",
    image: "/images/sports/badminton.jpg",
    description:
      "Competition-grade courts with coaching from certified professionals.",
    hasAcademy: true,
  },
  {
    name: "Pickleball",
    slug: "pickleball",
    icon: "pickleball",
    color: "#2BA84A",
    image: "/images/sports/pickleball.png",
    description:
      "Indoor pickleball courts for open play, lessons, and court rentals.",
    hasAcademy: false,
  },
] as const;

export const NAV_LINKS = [
  {
    label: "Sports",
    href: "#",
    children: [
      { label: "Baseball", href: "/baseball" },
      { label: "Baseball Academy", href: "/baseball-academy" },
      { label: "Cricket", href: "/cricket" },
      { label: "Cricket Academy", href: "/cricket-academy" },
      { label: "Badminton", href: "/badminton" },
      { label: "Badminton Academy", href: "/badminton-academy" },
      { label: "Pickleball", href: "/pickleball" },
      { label: "Kids Agility", href: "/kids-agility" },
    ],
  },
  { label: "Facilities", href: "/facilities" },
  { label: "Memberships", href: "/memberships" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
] as const;
