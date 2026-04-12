export interface AthleteSpotlight {
  name: string;
  age: number;
  sport: string;
  achievement: string;
  quote: string;
  story: string;
  memberSince: string;
  image?: string;
}

export const ATHLETE_SPOTLIGHTS: AthleteSpotlight[] = [
  {
    name: "Marcus Rivera",
    age: 14,
    sport: "Baseball",
    achievement: "Batting average improved from .220 to .380 in 6 months",
    quote: "Coach Rivera spotted something in my swing that nobody else saw. Two sessions later, I was hitting line drives. Six months later, I was starting cleanup. This place changed my baseball career.",
    story: "Marcus came to LevelUP after being cut from his school's starting lineup. His confidence was shattered. Coach Rivera identified a timing issue in his load within the first session and built a 12-week plan around fixing it. Today, Marcus is an all-conference selection.",
    memberSince: "2026",
    image: "/images/athletes/marcus.jpg",
  },
  {
    name: "Ananya Sharma",
    age: 16,
    sport: "Cricket",
    achievement: "Selected for Maryland State U-17 cricket team",
    quote: "Before LevelUP, I was practicing with tennis balls in my backyard. Now I'm training on proper nets with coaches who played IPL and international cricket. I made the state team 8 months after joining. That doesn't happen by accident.",
    story: "Ananya's family moved from New Jersey and couldn't find a proper cricket facility. She joined LevelUP's BRSS-powered academy, trained 3x per week with the coaching staff, and was selected for the Maryland State U-17 squad — the first player from Cecil County to make the team.",
    memberSince: "2026",
    image: "/images/athletes/ananya.jpg",
  },
  {
    name: "Emily Chen",
    age: 12,
    sport: "Badminton",
    achievement: "Won Cecil County Junior Championship",
    quote: "Coach Lee's footwork program changed everything. I used to get to shuttles late. Now I'm there first. I won the county championship and I'm training for states.",
    story: "Emily was a recreational player with raw talent but inconsistent movement. Coach Lee put her through an 8-week footwork intensive. She went from losing in the first round of local tournaments to winning the Cecil County Junior Championship outright.",
    memberSince: "2026",
    image: "/images/athletes/emily.jpg",
  },
  {
    name: "Robert & Linda James",
    age: 62,
    sport: "Pickleball",
    achievement: "From complete beginners to league competitors in 4 months",
    quote: "We retired and needed something to do together. Pickleball gave us exercise, competition, and a whole new group of friends. We're 62 and in better shape than we were at 50. Tuesday open play is the best night of our week.",
    story: "The James couple picked up paddles for the first time at a LevelUP beginner clinic. Four months later, they entered their first league tournament. They now play 4 days a week and have recruited six other couples from their neighborhood.",
    memberSince: "2026",
    image: "/images/athletes/james-family.jpg",
  },
  {
    name: "Arjun & Priya Reddy",
    age: 42,
    sport: "Cricket & Badminton",
    achievement: "Father-daughter training duo — Arjun plays cricket, Priya (age 11) does badminton",
    quote: "We drive from Newark every Saturday. Priya goes to badminton, I hit the cricket nets. We both look forward to it all week. One facility, two sports, quality time together — even though we're on different courts.",
    story: "Arjun missed playing cricket after moving from India. His daughter Priya had no interest in cricket but was curious about badminton. They discovered LevelUP could serve both of them simultaneously. Now it's their Saturday father-daughter tradition.",
    memberSince: "2026",
    image: "/images/athletes/reddy-family.jpg",
  },
  {
    name: "Diane Crawford",
    age: 56,
    sport: "Pickleball",
    achievement: "Returned to competitive sport after knee surgery ended her tennis career",
    quote: "I played tennis for 30 years until my knee gave out. My surgeon said pickleball might work because the court is smaller and the impact is lower. He was right. I'm competing again, pain-free, and having more fun than I ever did on a tennis court.",
    story: "After knee replacement surgery, Diane thought her competitive sports days were over. A friend dragged her to a pickleball session at LevelUP. The smaller court and lower impact were perfect for her recovery. She now plays competitive doubles and hasn't looked back.",
    memberSince: "2026",
    image: "/images/athletes/diane.jpg",
  },
];
