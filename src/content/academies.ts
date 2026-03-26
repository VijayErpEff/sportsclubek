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
    tagline: "Where Struggling Hitters Become Confident Ones",
    description: "Academy players improve their batting average by .095 points on average. Written progress reports every 4 weeks. 6:1 player-to-coach ratio.",
    image: "/images/sports/baseball.jpg",
    color: "#1B3A5C",
    metaTitle: "Youth Baseball Academy — Elkton, MD | Serving Middletown, Newark & Cecil County",
    metaDescription: "Youth baseball academy in Elkton, MD — near Middletown & Newark, DE. Expert coaches, batting cages, skill development for ages 8-18. Enroll today.",
    overview: [
      "In the last year, academy players improved their batting averages by an average of .095 points. Marcus Rivera went from .220 to .380 in six months. That's not a fluke — it's Coach Rivera's development system working the way it's designed to. The 12-week program covers hitting mechanics, pitching fundamentals, fielding, base running, and game IQ — with a focus on measurable improvement, not just reps.",
      "Parents: you'll receive a written progress report every four weeks. Our max class size is 12, with a 6:1 player-to-coach ratio so your kid gets real attention. You can watch every session from our parent viewing area. If they're not improving, you'll know — and so will we.",
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
        color: "#1B7D3A",
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
        color: "#1B3A5C",
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
        color: "#0F2440",
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
      { name: "Coach Rivera", role: "Academy Director", bio: "Played college baseball at Salisbury University. 15+ years coaching, 200+ youth players developed, 14 academy graduates playing varsity. His swing mechanics system is the backbone of our program.", initials: "CR" },
      { name: "Coach Davis", role: "Pitching & Arm Care Specialist", bio: "Certified pitching development specialist. Focuses on sustainable velocity gains and healthy mechanics — because arm health matters more than a radar gun number.", initials: "CD" },
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
    ctaTitle: "See the Improvement in One Session",
    ctaDescription: "Book a free trial session — no commitment. Watch your kid swing, talk to Coach Rivera, and decide if it's right for them.",
  },

  "cricket-academy": {
    slug: "cricket-academy",
    name: "Cricket Academy",
    sport: "Cricket",
    sportSlug: "cricket",
    tagline: "The Coaching You've Been Driving 45 Minutes For",
    description: "Coach Sharma played first-class cricket. Now he coaches here — 15 minutes from Middletown, not 45 minutes to Philly.",
    image: "/images/sports/cricket.png",
    color: "#1B7D3A",
    metaTitle: "Cricket Academy Maryland — Elkton, MD | Near Newark, Wilmington & Middletown, DE",
    metaDescription: "Maryland's premier cricket academy in Elkton — serving Newark, Wilmington & Middletown, DE. Professional nets, certified coaching, youth & adult programs. Enroll today.",
    overview: [
      "Before LevelUP, families in this area had two options for proper cricket coaching: drive 45+ minutes to Philadelphia or make do with informal setups. Ananya Sharma trained here for 8 months and was selected for the Maryland State U-17 team. That's what happens when you combine first-class coaching with proper infrastructure.",
      "Coach Sharma played first-class cricket before spending 12+ years developing players of all levels. Whether your family has played cricket for generations or your kid is picking up a bat for the first time, the academy covers batting, bowling, and fielding with structured progression and real accountability.",
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
        color: "#1B7D3A",
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
        color: "#15662F",
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
    ctaTitle: "Proper Coaching. 15 Minutes Away.",
    ctaDescription: "Book a free trial session. Meet Coach Sharma, hit the nets, and see why families drive here from three states.",
  },

  "badminton-academy": {
    slug: "badminton-academy",
    name: "Badminton Academy",
    sport: "Badminton",
    sportSlug: "badminton",
    tagline: "From Casual Rallies to County Championships",
    description: "Emily Chen won the Cecil County Junior Championship after training here. BWF-certified coaching on proper synthetic courts.",
    image: "/images/sports/badminton.jpg",
    color: "#2A5A8C",
    metaTitle: "Badminton Academy — Elkton, MD | Near Middletown, Newark & Wilmington, DE",
    metaDescription: "Professional badminton academy in Elkton, MD — serving Middletown, Newark & Wilmington, DE. Certified coaches, BWF courts, tournament prep. All levels welcome.",
    overview: [
      "Emily Chen walked into this academy as a casual player. Eight months later, she won the Cecil County Junior Championship. That's what BWF-certified coaching on proper courts does — it turns potential into results. Coach Lee's program focuses on three pillars: footwork speed, stroke technique, and match IQ.",
      "Whether your kid is picking up a racket for the first time or preparing for tournament competition, the academy has a structured pathway. Class sizes max out at 8 players, so every athlete gets direct coaching attention. Parents see measurable progress in footwork, reaction time, and match confidence within the first month.",
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
        color: "#2A5A8C",
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
        color: "#1B3A5C",
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
        color: "#0F2440",
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
    ctaTitle: "See What Proper Coaching Looks Like",
    ctaDescription: "Book a free trial session on our BWF-standard courts. Watch your kid move, meet Coach Lee, and decide.",
  },

  "kids-agility": {
    slug: "kids-agility",
    name: "Kids Agility",
    sport: "Multi-Sport",
    sportSlug: "",
    tagline: "The Confidence They'll Carry Into Every Sport",
    description: "The shy kid who sat out at recess? Two months later, he asked to join the school baseball team. That's what this program does.",
    image: "/images/sports/kids-agility.jpg",
    color: "#2BA84A",
    metaTitle: "Kids Agility Training — Elkton, MD | Ages 5-12 | Near Middletown & Newark, DE",
    metaDescription: "Kids agility & fitness program in Elkton, MD for ages 5-12 — near Middletown & Newark, DE. Build speed, coordination & confidence. Fun, structured sessions.",
    overview: [
      "One parent told us her son was the kid who sat out at recess. Uncoordinated, self-conscious, didn't want to try anything. After two months of Kids Agility, he asked to sign up for the school baseball team. That's not unusual — it's what happens when kids discover what their bodies can actually do, in an environment where trying is celebrated and nobody gets picked last.",
      "This isn't gym class. It's structured athletic development led by a certified youth fitness specialist. Every session is age-appropriate, progression-based, and designed to build coordination, speed, balance, and — most importantly — confidence. The skills transfer to any sport they choose to play. Or just to being a more active, capable kid.",
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
        color: "#2BA84A",
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
        color: "#1B7D3A",
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
        color: "#15662F",
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
    ctaTitle: "Watch Their Confidence Grow",
    ctaDescription: "Book a free trial session. Your kid will run, jump, laugh, and leave wanting to come back. That's how we know it's working.",
  },

  "volleyball-academy": {
    slug: "volleyball-academy",
    name: "Volleyball Academy",
    sport: "Volleyball",
    sportSlug: "volleyball",
    tagline: "Build the Skills That Win Points — and Scholarships",
    description: "USAV-certified coaching, video analysis, and a development pathway from first-time passer to club-level competitor.",
    image: "/images/sports/volleyball.jpg",
    color: "#D97706",
    metaTitle: "Youth Volleyball Academy — Elkton, MD | Near Middletown, Newark & Wilmington, DE",
    metaDescription: "Youth volleyball academy in Elkton, MD — near Middletown & Newark, DE. USAV-certified coaches, skill development for ages 8-18. Passing, setting, hitting. Enroll today.",
    overview: [
      "Club volleyball tryouts are brutally competitive. The kids who make the team aren't necessarily the tallest or most athletic — they're the ones with clean passing technique, consistent serving, and court awareness that comes from structured training. That's exactly what Coach Torres builds in this academy. Last year, 8 of our academy players made club teams on their first tryout.",
      "The program runs in 10-week sessions, meeting twice a week. Class sizes max at 12 with a 6:1 player-to-coach ratio. Every session includes video review so players can see their progress. Parents: you'll watch from the viewing area and notice the difference in their movement and confidence within the first month.",
    ],
    stats: [
      { label: "Program Length", value: "10 Weeks" },
      { label: "Sessions/Week", value: "2x" },
      { label: "Age Range", value: "8–18" },
      { label: "Max Class Size", value: "12" },
    ],
    curriculum: [
      {
        label: "Passing & Serve Receive",
        title: "Platform & Control",
        description: "The foundation of every rally. Develop consistent passing that your setter can count on.",
        color: "#D97706",
        skills: [
          "Forearm pass technique and platform angles",
          "Serve receive footwork and positioning",
          "Overhead passing and setting basics",
          "Reading the server and anticipation",
          "Communication and calling the ball",
        ],
      },
      {
        label: "Attacking & Serving",
        title: "Offensive Weapons",
        description: "Learn to put the ball away with power and placement — from the service line and the net.",
        color: "#B45309",
        skills: [
          "Approach footwork and timing",
          "Arm swing mechanics and contact point",
          "Shot selection — line, cross, and tip",
          "Float serve and topspin serve technique",
          "Transition offense and tempo hitting",
        ],
      },
      {
        label: "Defense & Game Play",
        title: "Court Awareness",
        description: "Read the game, dig the ball, and make the plays that shift momentum.",
        color: "#92400E",
        skills: [
          "Defensive positioning and base defense",
          "Digging technique — platform and sprawl",
          "Blocking fundamentals and timing",
          "Rotation and positional responsibilities",
          "Game strategy and competitive match play",
        ],
      },
    ],
    coaches: [
      { name: "Coach Torres", role: "Academy Director", bio: "USAV-certified with 12+ years of club and high school coaching experience. Her development pipeline has produced dozens of club-level players and multiple college prospects.", initials: "CT" },
      { name: "Coach Nguyen", role: "Youth Development Coach", bio: "Former Division II college player who specializes in building fundamentals from scratch. Known for making beginners feel confident from day one.", initials: "CN" },
    ],
    whatYouGet: [
      "10-week structured curriculum with measurable skill progression",
      "Low coach-to-player ratio (max 6:1) for real attention",
      "Video analysis and performance feedback every session",
      "Indoor facility for year-round training",
      "Club tryout preparation and competitive match play",
      "Access to open play sessions during enrollment",
    ],
    faqs: [
      { question: "Does my child need volleyball experience?", answer: "No! We have beginner groups that start from scratch. Players are grouped by age and ability so everyone gets the right challenge." },
      { question: "Will this prepare my child for club tryouts?", answer: "Yes — our program is specifically designed to develop the skills club coaches look for: clean passing, consistent serving, and court awareness." },
      { question: "What should my child bring?", answer: "Athletic wear, clean court shoes (no marking soles), knee pads (optional but recommended), and a water bottle. We provide all balls and equipment." },
    ],
    ctaTitle: "See the Improvement in One Session",
    ctaDescription: "Book a free trial session. Watch your kid pass, serve, and hit — then talk to Coach Torres about the right program for them.",
  },

  "soccer-academy": {
    slug: "soccer-academy",
    name: "Soccer Academy",
    sport: "Soccer",
    sportSlug: "soccer",
    tagline: "The Technical Edge That Shows Up at Tryouts",
    description: "Futsal-first training that builds the close control, quick feet, and game intelligence that outdoor coaches notice immediately.",
    image: "/images/sports/soccer.jpg",
    color: "#B83A2F",
    metaTitle: "Youth Soccer & Futsal Academy — Elkton, MD | Near Middletown, Newark & Wilmington, DE",
    metaDescription: "Indoor soccer & futsal academy in Elkton, MD — near Middletown & Newark, DE. USSF-licensed coaches, technical development for ages 6-18. Enroll today.",
    overview: [
      "The best soccer players in the world — Messi, Neymar, Ronaldinho — all grew up playing futsal. The smaller court, heavier ball, and constant pressure force players to develop close control, quick decision-making, and creativity that you simply can't build on a full-size outdoor pitch. Coach Martinez brings that methodology here, and the results show up at spring tryouts when our academy kids consistently outperform in technical assessments.",
      "The academy runs year-round in 10-week sessions. We train on professional indoor turf with futsal balls and regulation goals. Sessions are high-touch — every player gets hundreds of ball contacts per training. Parents: the difference in your kid's first touch and confidence on the ball will be obvious within weeks.",
    ],
    stats: [
      { label: "Program Length", value: "10 Weeks" },
      { label: "Sessions/Week", value: "2–3x" },
      { label: "Age Range", value: "6–18" },
      { label: "Max Class Size", value: "14" },
    ],
    curriculum: [
      {
        label: "Technical",
        title: "Ball Mastery",
        description: "Develop a first touch that sticks and feet that can do anything under pressure.",
        color: "#B83A2F",
        skills: [
          "First touch and receiving under pressure",
          "Dribbling — close control and changes of direction",
          "Passing — short, long, and through balls",
          "Shooting technique — placement and power",
          "1v1 moves and ball protection",
        ],
      },
      {
        label: "Tactical",
        title: "Game Intelligence",
        description: "Learn to read the game, find space, and make decisions faster than your opponent.",
        color: "#991B1B",
        skills: [
          "Positional awareness and spacing",
          "Movement off the ball and creating angles",
          "Small-sided game tactics (3v3, 4v4, 5v5)",
          "Defensive shape and pressing triggers",
          "Transition play — attack to defense and back",
        ],
      },
      {
        label: "Physical",
        title: "Athletic Development",
        description: "Build the speed, agility, and endurance that support technical excellence on the pitch.",
        color: "#7F1D1D",
        skills: [
          "Speed and acceleration training",
          "Agility and change-of-direction drills",
          "Coordination and balance exercises",
          "Soccer-specific conditioning",
          "Injury prevention and movement quality",
        ],
      },
    ],
    coaches: [
      { name: "Coach Martinez", role: "Academy Director", bio: "USSF B-licensed coach and former semi-professional player. 10+ years developing youth players through futsal-first methodology. His graduates consistently excel at club and high school tryouts.", initials: "CM" },
      { name: "Coach Okafor", role: "Technical & Futsal Coach", bio: "US Futsal certified coach who specializes in close control, creativity, and developing players who are comfortable under pressure. Known for making training sessions intense and fun.", initials: "CO" },
    ],
    whatYouGet: [
      "Year-round training on professional indoor turf",
      "Futsal-first methodology for accelerated technical development",
      "Small groups for maximum ball contacts per session",
      "Video analysis and performance tracking",
      "Preparation for outdoor club and high school tryouts",
      "Access to open play sessions during enrollment",
    ],
    faqs: [
      { question: "Will indoor training help my child's outdoor game?", answer: "Absolutely. Futsal develops close control, quick thinking, and comfort under pressure — skills that directly transfer to the outdoor game. The best players in the world trained this way." },
      { question: "What age should my child start?", answer: "We accept players from age 6. Our youngest groups focus on fun, coordination, and falling in love with the ball. Structured tactical training begins around age 9-10." },
      { question: "Do you work with outdoor club coaches?", answer: "Yes — many local clubs send players to us for supplemental technical training, especially in the off-season. We can coordinate with your child's outdoor coach." },
    ],
    ctaTitle: "Better Touch. Better Player.",
    ctaDescription: "Book a free trial session on the turf. Watch your kid's feet move, meet Coach Martinez, and see the futsal difference.",
  },
};
