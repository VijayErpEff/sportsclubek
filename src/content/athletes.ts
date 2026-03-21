export interface AthleteSpotlight {
  name: string;
  age: number;
  sport: string;
  achievement: string;
  quote: string;
  memberSince: string;
  image?: string;
}

export const ATHLETE_SPOTLIGHTS: AthleteSpotlight[] = [
  { name: "Marcus Rivera", age: 14, sport: "Baseball", achievement: "Batting average improved from .220 to .380 in 6 months", quote: "The coaches here pushed me to be my best. I went from bench to starting lineup.", memberSince: "2024", image: "/images/athletes/marcus.jpg" },
  { name: "Ananya Sharma", age: 16, sport: "Cricket", achievement: "Selected for Maryland State U-17 cricket team", quote: "LevelUP gave me access to proper nets and coaching I couldn't find anywhere else.", memberSince: "2023", image: "/images/athletes/ananya.jpg" },
  { name: "Emily Chen", age: 12, sport: "Badminton", achievement: "Won Cecil County Junior Championship", quote: "Coach Lee's footwork drills made all the difference in my game.", memberSince: "2024", image: "/images/athletes/emily.jpg" },
  { name: "Robert & Linda James", age: 62, sport: "Pickleball", achievement: "From complete beginners to league competitors in 4 months", quote: "We found our new favorite hobby and a whole community of friends.", memberSince: "2025", image: "/images/athletes/james-family.jpg" },
];
