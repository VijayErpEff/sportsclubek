// ============================================================
// ACADEMY & PROGRAM PAGE CONFIGURATION
// Edit this file to update all academy/program page content.
// ============================================================

export interface CurriculumTier {
  label: string;
  title: string;
  description: string;
  skills: string[];
  color: string;
}

export interface AcademyCoach {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface AcademyPageData {
  slug: string;
  name: string;
  sport: string;
  sportSlug: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  metaTitle: string;
  metaDescription: string;
  overview: string[];
  stats: { label: string; value: string }[];
  curriculum: CurriculumTier[];
  coaches: AcademyCoach[];
  whatYouGet: string[];
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaDescription: string;
}

export const ACADEMY_PAGES: Record<string, AcademyPageData> = {
  "baseball-academy": {
    slug: "baseball-academy",
    name: "Baseball Academy",
    sport: "Baseball",
    sportSlug: "baseball",
    tagline: "Where Ballplayers Are Built",
    description: "Our 12-week academy develops mechanics, game IQ, and the competitive edge that separates good players from great ones.",
    image: "/images/sports/baseball.jpg",
    color: "#1A3B8F",
    metaTitle: "Youth Baseball Academy",
    metaDescription: "Intensive youth baseball academy in Elkton, MD. Expert coaches, skill development, game IQ training. Ages 8-18, all skill levels. Enroll today.",
    overview: [
      "The LevelUP Baseball Academy is a comprehensive 12-week training program designed to develop well-rounded ballplayers. Our curriculum covers every aspect of the game — from hitting mechanics and pitching fundamentals to base running, defensive positioning, and game IQ.",
      "Every session is structured to maximize development with a balance of individual skill work, live reps, and competitive scenarios. Players leave the program with measurable improvement and the confidence to compete at the next level.",
    ],
    stats: [
      { label: "Program Length", value: "12 Weeks" },
      { label: "Sessions/Week", value: "2x" },
      { label: "Age Range", value: "8–18" },
      { label: "Max Class Size", value: "12" },
    ],
    curriculum: [
      {
        label: "Ages 8–12",
        title: "Foundations",
        description: "Build a love for the game while developing core fundamentals that last a lifetime.",
        color: "#2BA84A",
        skills: [
          "Throwing mechanics and accuracy",
          "Hitting fundamentals and tee work",
          "Fielding ground balls and fly balls",
          "Base running basics",
          "Game awareness and sportsmanship",
        ],
      },
      {
        label: "Ages 13–15",
        title: "Development",
        description: "Refine mechanics, build strength, and master the mental side of the game.",
        color: "#1A3B8F",
        skills: [
          "Advanced hitting — approach and pitch recognition",
          "Pitching development and arm care",
          "Position-specific defensive training",
          "Situational base running and reads",
          "Video analysis and performance feedback",
        ],
      },
      {
        label: "Ages 16–18",
        title: "Advanced / Pre-Collegiate",
        description: "High-level training for varsity and travel players preparing for the next stage.",
        color: "#0E2260",
        skills: [
          "Elite hitting — live at-bats and advanced approach",
          "Pitching velocity and movement development",
          "Strength and conditioning integration",
          "Mental performance and game management",
          "Showcase and recruiting preparation",
        ],
      },
    ],
    coaches: [
      { name: "Coach Rivera", role: "Academy Director", bio: "15+ years coaching experience with a background in collegiate baseball. Proven development system that has helped hundreds of players reach their potential.", initials: "CR" },
      { name: "Coach Davis", role: "Pitching & Arm Care Specialist", bio: "Certified pitching development specialist focused on sustainable velocity gains, healthy mechanics, and long-term arm health.", initials: "CD" },
    ],
    whatYouGet: [
      "12-week structured curriculum with progressive skill building",
      "Low coach-to-player ratio (max 6:1) for personalized instruction",
      "Video analysis and performance tracking",
      "Indoor facility for year-round training",
      "End-of-program assessment and development report",
      "Access to open cage hours during enrollment",
    ],
    faqs: [
      { question: "What skill level is required to join?", answer: "We accept all skill levels. Players are grouped by age and ability so everyone gets the right level of challenge." },
      { question: "What does the 12-week session cost?", answer: "Contact us for current pricing. We offer sibling discounts and payment plans. Elite members get academy access included in their membership." },
      { question: "What should my child bring?", answer: "Athletic wear, cleats or turf shoes, a glove, and a water bottle. We provide bats, helmets, and other equipment." },
    ],
    ctaTitle: "Ready to Step Up to the Plate?",
    ctaDescription: "Enrollment is open for our next 12-week session. Spots are limited — reserve yours today.",
  },

  "cricket-academy": {
    slug: "cricket-academy",
    name: "Cricket Academy",
    sport: "Cricket",
    sportSlug: "cricket",
    tagline: "From Forward Defense to Cover Drive",
    description: "Master every aspect of the game with coaches who've played at the highest level. Structured programs for all skill levels.",
    image: "/images/sports/cricket.png",
    color: "#1B7D3A",
    metaTitle: "Cricket Coaching Academy",
    metaDescription: "Structured cricket academy in Maryland. Professional coaching, technique development, and match preparation for youth and adult players.",
    overview: [
      "The LevelUP Cricket Academy offers professional coaching in all aspects of the game. Whether you're learning your first forward defense or perfecting your cover drive, our coaches bring competitive experience and a structured approach to player development.",
      "With programs for youth and adults, beginners and advanced players, we're building the strongest cricket community in the Mid-Atlantic region.",
    ],
    stats: [
      { label: "Disciplines", value: "Bat/Bowl/Field" },
      { label: "Sessions/Week", value: "2–3x" },
      { label: "Age Range", value: "8–Adult" },
      { label: "Max Class Size", value: "10" },
    ],
    curriculum: [
      {
        label: "Batting",
        title: "Batting Technique",
        description: "Develop a complete batting game — from defensive technique to aggressive shot-making.",
        color: "#1B7D3A",
        skills: [
          "Stance, grip, and backlift fundamentals",
          "Front foot and back foot stroke play",
          "Running between wickets",
          "Playing pace and spin bowling",
          "Match-situation batting scenarios",
        ],
      },
      {
        label: "Bowling",
        title: "Bowling Development",
        description: "Build a repeatable action, develop control, and add variations to your arsenal.",
        color: "#15662F",
        skills: [
          "Bowling action mechanics and consistency",
          "Line and length control",
          "Pace bowling — seam and swing",
          "Spin bowling — leg spin and off spin",
          "Field setting and match strategy",
        ],
      },
      {
        label: "Fielding",
        title: "Fielding & Wicket-Keeping",
        description: "Sharpen reflexes, improve ground fielding, and develop safe catching technique.",
        color: "#0D4A23",
        skills: [
          "Ground fielding — pick up and throw",
          "Catching — high, low, and slip catching",
          "Wicket-keeping stance and glovework",
          "Throwing accuracy and arm strength",
          "Team fielding drills and positioning",
        ],
      },
    ],
    coaches: [
      { name: "Coach Sharma", role: "Head Cricket Coach", bio: "Former first-class cricketer with 12+ years of coaching experience. Specializes in batting development and match strategy.", initials: "CS" },
      { name: "Coach Ahmed", role: "Bowling Coach", bio: "Specialist in pace and spin bowling development with a focus on sustainable action mechanics and match performance.", initials: "CA" },
    ],
    whatYouGet: [
      "Structured curriculum covering batting, bowling, and fielding",
      "Professional bowling machine sessions included",
      "Video analysis of technique",
      "Small group sizes for personalized attention",
      "Match-simulation sessions",
      "Access to open net sessions during enrollment",
    ],
    faqs: [
      { question: "Do I need prior cricket experience?", answer: "Not at all. We have beginner groups that start from scratch. Our coaches are experienced at introducing the sport to new players." },
      { question: "What equipment do I need?", answer: "Beginners can use our equipment (bats, pads, gloves, helmets). Regular players should invest in their own gear — we can recommend options." },
      { question: "Are there adult programs?", answer: "Yes! We have separate sessions for adults, including weekday evening and weekend programs." },
    ],
    ctaTitle: "Ready to Master the Game?",
    ctaDescription: "Enrollment is open for our next academy intake. Places are limited — secure your spot today.",
  },

  "badminton-academy": {
    slug: "badminton-academy",
    name: "Badminton Academy",
    sport: "Badminton",
    sportSlug: "badminton",
    tagline: "Train Your Reflexes. Sharpen Your Game.",
    description: "Certified coaches develop speed, technique, and tactical awareness through structured training at every level.",
    image: "/images/sports/badminton.jpg",
    color: "#2B52B0",
    metaTitle: "Badminton Training Academy",
    metaDescription: "Professional badminton academy in Elkton, MD. Certified coaches, structured training, and tournament preparation for all levels.",
    overview: [
      "The LevelUP Badminton Academy develops complete players through a focus on three pillars: footwork, stroke technique, and match strategy. Our BWF-certified coaching staff brings competitive experience and a proven training methodology.",
      "Whether you're just picking up a racket or preparing for tournament competition, our structured programs will elevate your game in a supportive, challenging environment.",
    ],
    stats: [
      { label: "Coaching", value: "BWF-Certified" },
      { label: "Sessions/Week", value: "2–3x" },
      { label: "Age Range", value: "7–Adult" },
      { label: "Max Class Size", value: "8" },
    ],
    curriculum: [
      {
        label: "Footwork",
        title: "Court Movement",
        description: "Speed and agility are everything in badminton. Master the movement patterns that create winning positions.",
        color: "#2B52B0",
        skills: [
          "Six-corner footwork patterns",
          "Split step and recovery timing",
          "Explosive lunging technique",
          "Court positioning and anticipation",
          "Endurance and agility conditioning",
        ],
      },
      {
        label: "Strokes",
        title: "Stroke Technique",
        description: "Develop a complete shot repertoire — from powerful smashes to deceptive drop shots.",
        color: "#1A3B8F",
        skills: [
          "Overhead clear, drop, and smash",
          "Net shots — kill, tumble, and lift",
          "Drive shots and defensive blocks",
          "Serve technique — short and long",
          "Deception and shot disguise",
        ],
      },
      {
        label: "Match Play",
        title: "Tactics & Strategy",
        description: "Learn to think like a competitor — reading opponents, controlling rallies, and winning points.",
        color: "#0E2260",
        skills: [
          "Singles and doubles strategy",
          "Rally patterns and point construction",
          "Opponent analysis and adaptation",
          "Pressure situations and mental toughness",
          "Tournament preparation and match management",
        ],
      },
    ],
    coaches: [
      { name: "Coach Lee", role: "Head Badminton Coach", bio: "BWF-certified with 10+ years of competitive coaching. Specializes in developing junior players for national-level competition.", initials: "CL" },
      { name: "Coach Park", role: "Doubles & Strategy Coach", bio: "Former national-level doubles player. Expert in doubles formations, rotations, and competitive match strategy.", initials: "CP" },
    ],
    whatYouGet: [
      "Structured program with progressive skill development",
      "BWF-certified coaching methodology",
      "Small class sizes (max 8 players)",
      "Competition preparation and in-house tournaments",
      "Video analysis of technique and match play",
      "Access to open court hours during enrollment",
    ],
    faqs: [
      { question: "What age can children start?", answer: "We accept players from age 7. Our junior beginner program is designed to introduce the sport through fun, age-appropriate exercises." },
      { question: "Do you prepare players for tournaments?", answer: "Yes! Our advanced program includes tournament preparation, match simulation, and we regularly host in-house competitions." },
      { question: "Can adults join the academy?", answer: "Absolutely. We have dedicated adult sessions for beginners, intermediate, and advanced players." },
    ],
    ctaTitle: "Ready to Step on Court?",
    ctaDescription: "Enrollment is open for all skill levels. Join our next academy session today.",
  },

  "kids-agility": {
    slug: "kids-agility",
    name: "Kids Agility",
    sport: "Multi-Sport",
    sportSlug: "",
    tagline: "Watch Them Discover What They Can Do",
    description: "Fun, engaging agility training that builds coordination, speed, confidence, and a lifelong love of movement. Ages 5–12.",
    image: "/images/sports/kids-agility.jpg",
    color: "#E67E22",
    metaTitle: "Kids Agility & Fitness Training",
    metaDescription: "Fun, engaging agility training for kids ages 5-12 in Elkton, MD. Build coordination, speed, and confidence through age-appropriate athletic development.",
    overview: [
      "Our Kids Agility program is designed to build the athletic foundation every young person needs — regardless of what sport they play. Through fun, structured exercises, kids develop coordination, balance, speed, and the confidence that comes from discovering what their bodies can do.",
      "This isn't gym class. It's purposeful movement training led by certified coaches who know how to keep kids engaged, challenged, and excited to come back. Every session is age-appropriate, safe, and designed to build a love for active living.",
    ],
    stats: [
      { label: "Ages", value: "5–12" },
      { label: "Sessions/Week", value: "1–2x" },
      { label: "Session Length", value: "60 min" },
      { label: "Max Class Size", value: "15" },
    ],
    curriculum: [
      {
        label: "Ages 5–7",
        title: "Explorers",
        description: "Playful introduction to movement through games, obstacle courses, and fundamental motor skills.",
        color: "#E67E22",
        skills: [
          "Running, jumping, and landing technique",
          "Balance and coordination games",
          "Throwing and catching basics",
          "Obstacle course challenges",
          "Teamwork and social skills",
        ],
      },
      {
        label: "Ages 8–10",
        title: "Builders",
        description: "Developing agility, speed, and body awareness through structured drills and fun competitions.",
        color: "#D35400",
        skills: [
          "Ladder and cone agility drills",
          "Sprint mechanics and acceleration",
          "Reaction time games",
          "Bodyweight strength exercises",
          "Sport-specific movement patterns",
        ],
      },
      {
        label: "Ages 11–12",
        title: "Competitors",
        description: "Building athletic confidence with performance training that bridges to competitive sport.",
        color: "#A04000",
        skills: [
          "Advanced agility and change of direction",
          "Speed and power development",
          "Competitive relay and team challenges",
          "Sport-readiness conditioning",
          "Goal setting and self-assessment",
        ],
      },
    ],
    coaches: [
      { name: "Coach Williams", role: "Youth Fitness Director", bio: "Certified youth fitness specialist with a passion for helping kids discover their athletic potential through fun, structured training.", initials: "CW" },
    ],
    whatYouGet: [
      "Age-appropriate programming designed by certified youth fitness specialists",
      "Fun, high-energy sessions that kids actually look forward to",
      "Progress tracking and end-of-term movement assessments",
      "All equipment provided — just bring athletic wear and water",
      "Safe, climate-controlled indoor environment",
      "Skills that transfer to any sport they choose to play",
    ],
    faqs: [
      { question: "Is this program for kids who already play sports?", answer: "It's for everyone! Both athletes and non-athletes benefit. The program builds foundational movement skills that help in any sport — or just in being an active, confident kid." },
      { question: "What should my child wear?", answer: "Athletic clothing and clean indoor shoes. No cleats needed. We provide all equipment." },
      { question: "Can my child try a session before enrolling?", answer: "Yes! We offer a free trial session so your child can experience the program before you commit." },
    ],
    ctaTitle: "Give Your Child the Athletic Edge",
    ctaDescription: "Enrollment is open for all age groups. Help your child build the foundation they'll carry for life.",
  },
};
