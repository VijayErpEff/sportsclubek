// ============================================================
// SPORT PAGE CONFIGURATION
// Edit this file to update all sport and academy page content.
// ============================================================

export interface Program {
  title: string;
  description: string;
  href: string;
  tag?: string;
}

export interface Coach {
  name: string;
  role: string;
  credentials: string;
  initials: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SportPageData {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  color: string;
  metaTitle: string;
  metaDescription: string;
  overview: string[];
  highlights: { label: string; value: string }[];
  programs: Program[];
  features: string[];
  coaches: Coach[];
  faqs: FAQ[];
  academySlug?: string;
  ctaTitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
}

export const SPORT_PAGES: Record<string, SportPageData> = {
  baseball: {
    slug: "baseball",
    name: "Baseball",
    tagline: "They Don't Need More Reps. They Need the Right Ones.",
    description:
      "Indoor batting cages with machines up to 90 MPH and coaches who track your kid's progress. From first swings to varsity prep.",
    image: "/images/sports/baseball.jpg",
    color: "#1B3A5C",
    metaTitle: "Indoor Batting Cages & Baseball Training — Elkton, MD | Near Middletown & Newark, DE",
    metaDescription:
      "Indoor batting cages & expert baseball coaching in Elkton, MD — 15 min from Middletown & Newark, DE. Youth academy, private lessons, cage rentals. Pitching machines up to 90 MPH. Book now.",
    overview: [
      "You've watched your kid struggle at the plate. The frustration after an 0-for-3 game. The slump that drags into a second week. That's exactly why we built this — and why Coach Rivera has spent 15 years perfecting a development system that turns struggling hitters into confident ones. Our cages run from 30 to 90 MPH, and every session starts with a coach who knows your kid's name, their swing, and what they need to work on next.",
      "Parents: you can watch every session from our viewing area. You'll see the difference in their mechanics within weeks — not months. Academy players get a written progress report every four weeks. This isn't daycare with batting helmets. It's real development.",
    ],
    highlights: [
      { label: "Cages", value: "4" },
      { label: "Speed Range", value: "30–90 MPH" },
      { label: "Age Groups", value: "6–Adult" },
      { label: "Open", value: "7 Days" },
    ],
    programs: [
      {
        title: "Batting Cage Rentals",
        description: "Reserve a professional batting cage for individual or group sessions. Adjustable pitching machines for every skill level.",
        href: "/schedule",
        tag: "Drop-In",
      },
      {
        title: "Baseball Academy",
        description: "Structured 12-week programs for youth players. Develop hitting, fielding, and game IQ with expert coaches.",
        href: "/baseball-academy",
        tag: "Academy",
      },
      {
        title: "Private Lessons",
        description: "One-on-one coaching tailored to your goals. Refine mechanics, build confidence, and see real improvement.",
        href: "/schedule",
        tag: "1-on-1",
      },
      {
        title: "Open Practice",
        description: "Drop in during open hours for casual hitting sessions. Stay sharp between games or just have fun.",
        href: "/schedule",
        tag: "Open Play",
      },
    ],
    features: [
      "4 professional-grade indoor batting cages",
      "Adjustable pitching machines (30–80 MPH)",
      "Expert coaching staff with competitive experience",
      "Year-round climate-controlled training",
      "Helmets and equipment provided",
      "Video analysis available for academy members",
    ],
    coaches: [
      {
        name: "Coach Rivera",
        role: "Head Baseball Coach",
        credentials: "15+ years coaching experience, former college player",
        initials: "CR",
      },
      {
        name: "Coach Davis",
        role: "Pitching Coach",
        credentials: "10+ years specializing in youth pitching development",
        initials: "CD",
      },
    ],
    faqs: [
      { question: "How much do batting cages cost at LevelUP?", answer: "Cages are $35-45/hour depending on the cage. Our pro cage with video analysis is $45/hour. Helmets and bats are provided. You can also try a free session first — no charge, no commitment." },
      { question: "What age can my child start using batting cages?", answer: "Ages 6 and up. We start younger kids at 30 MPH and work up from there. A coach helps them find the right speed and stance for their skill level." },
      { question: "Do you provide helmets and bats?", answer: "Yes — helmets are required and always provided. We have bats available for every age and size. You're welcome to bring your own bat too." },
    ],
    academySlug: "baseball-academy",
    ctaTitle: "See the Difference in One Session",
    ctaPrimary: { label: "Try a Free Session", href: "/free-trial" },
    ctaSecondary: { label: "View Academy", href: "/baseball-academy" },
  },

  cricket: {
    slug: "cricket",
    name: "Cricket",
    tagline: "A Proper Facility. Finally.",
    description:
      "The only dedicated indoor cricket center between Philadelphia and Baltimore. Full-length nets, pro bowling machines, and a coach who played first-class cricket.",
    image: "/images/sports/cricket.png",
    color: "#1B7D3A",
    metaTitle: "Indoor Cricket Facility & Academy — Elkton, MD | Serving Newark, Wilmington & Middletown, DE",
    metaDescription:
      "Maryland's premier indoor cricket facility in Elkton, MD — serving Newark, Wilmington & Middletown, DE. Professional nets, bowling machines, youth & adult academy. Book cricket nets today.",
    overview: [
      "You've been searching for proper cricket infrastructure in the tri-state area. Not a converted warehouse with a bowling machine in the corner — an actual facility with full-length nets, professional-grade bowling machines, and a coach who played first-class cricket. LevelUP is the only dedicated indoor cricket center between Philadelphia and Baltimore, and it was built for this community.",
      "Whether your family has played cricket for generations or you're curious about the sport your neighbors love, Coach Sharma meets you where you are. Many of our members drove 45+ minutes each way before we opened. Now they're 15 minutes away. We serve families from Newark, Wilmington, Middletown, and across the tri-state area.",
    ],
    highlights: [
      { label: "Nets", value: "Full-Length" },
      { label: "Machines", value: "Pro-Grade" },
      { label: "Levels", value: "All" },
      { label: "Coaching", value: "Expert" },
    ],
    programs: [
      {
        title: "Net Sessions",
        description: "Book indoor net time for batting and bowling practice. Bowling machines available for solo training.",
        href: "/schedule",
        tag: "Drop-In",
      },
      {
        title: "Cricket Academy",
        description: "Structured coaching programs covering batting technique, bowling action, and fielding skills for youth and adults.",
        href: "/cricket-academy",
        tag: "Academy",
      },
      {
        title: "Match Preparation",
        description: "Intensive sessions focused on match scenarios, game strategy, and competitive readiness.",
        href: "/schedule",
        tag: "Advanced",
      },
      {
        title: "Junior Development",
        description: "Age-appropriate training introducing cricket fundamentals in a fun, supportive environment.",
        href: "/cricket-academy",
        tag: "Youth",
      },
    ],
    features: [
      "Full-length indoor cricket nets",
      "Professional-grade bowling machines",
      "Video analysis technology",
      "Coaches with competitive playing experience",
      "All equipment available for beginners",
      "Year-round climate-controlled facility",
    ],
    coaches: [
      {
        name: "Coach Sharma",
        role: "Head Cricket Coach",
        credentials: "Former first-class cricketer, 12+ years coaching",
        initials: "CS",
      },
      {
        name: "Coach Ahmed",
        role: "Bowling Coach",
        credentials: "Specialist in pace and spin bowling development",
        initials: "CA",
      },
    ],
    faqs: [
      { question: "Do you offer cricket coaching for complete beginners?", answer: "Absolutely! Our junior development and beginner programs are designed for players with zero experience." },
      { question: "Can I just book a net without coaching?", answer: "Yes, net sessions can be booked independently. Bowling machines are available for self-practice." },
      { question: "What cricket equipment is provided?", answer: "We provide bats, pads, gloves, and helmets for beginners. Regular players are encouraged to bring their own gear." },
    ],
    academySlug: "cricket-academy",
    ctaTitle: "Finally, a Proper Facility",
    ctaPrimary: { label: "Try a Free Session", href: "/free-trial" },
    ctaSecondary: { label: "View Academy", href: "/cricket-academy" },
  },

  badminton: {
    slug: "badminton",
    name: "Badminton",
    tagline: "Courts That Match Your Ambition.",
    description:
      "3 BWF-standard courts with synthetic sprung flooring, tournament LED lighting, and a BWF-certified coach. Not a gym with lines on the floor.",
    image: "/images/sports/badminton.jpg",
    color: "#2A5A8C",
    metaTitle: "Indoor Badminton Courts & Academy — Elkton, MD | Near Middletown, Newark & Wilmington, DE",
    metaDescription:
      "BWF-approved indoor badminton courts in Elkton, MD — closest to Middletown, Newark & Wilmington, DE. Court rentals, academy, certified coaching. Book your court today.",
    overview: [
      "Your kid doesn't just want to rally — they want to compete. And they need courts and coaching that match their ambition. Our three BWF-standard courts feature synthetic sprung flooring (the same synthetic surface used in national competitions), tournament-calibrated LED lighting, and professional nets. This isn't a gym with lines painted on the floor.",
      "Coach Lee is BWF-certified with over a decade of competitive coaching, and he's guided players from casual rallies to county championships. Whether you're picking up a racket for the first time or training for tournament play, the facility and coaching here will push you to the next level. Parents — you'll see measurable progress in footwork, reaction time, and match confidence within weeks.",
    ],
    highlights: [
      { label: "Courts", value: "Pro-Grade" },
      { label: "Lighting", value: "LED" },
      { label: "Coaching", value: "Certified" },
      { label: "Levels", value: "All" },
    ],
    programs: [
      {
        title: "Court Rentals",
        description: "Book a court for singles or doubles play. Perfect for practice sessions or friendly matches.",
        href: "/schedule",
        tag: "Drop-In",
      },
      {
        title: "Badminton Academy",
        description: "Structured training programs developing footwork, technique, and match strategy with certified coaches.",
        href: "/badminton-academy",
        tag: "Academy",
      },
      {
        title: "Group Lessons",
        description: "Small-group coaching sessions for beginners and intermediate players. Learn proper technique from day one.",
        href: "/schedule",
        tag: "Group",
      },
      {
        title: "Open Play",
        description: "Join our open play sessions to meet other players, get games in, and enjoy the sport in a social setting.",
        href: "/schedule",
        tag: "Open Play",
      },
    ],
    features: [
      "Competition-grade indoor courts",
      "Professional LED court lighting",
      "Certified coaching staff",
      "Shock-absorbing court flooring",
      "Equipment rental available",
      "Tournament preparation programs",
    ],
    coaches: [
      {
        name: "Coach Lee",
        role: "Head Badminton Coach",
        credentials: "BWF-certified, 10+ years competitive coaching",
        initials: "CL",
      },
      {
        name: "Coach Park",
        role: "Assistant Coach",
        credentials: "Former national-level player, specializes in doubles",
        initials: "CP",
      },
    ],
    faqs: [
      { question: "Do you provide badminton rackets?", answer: "We have rackets available for rental. For regular players, we recommend investing in your own racket for the best experience." },
      { question: "Is badminton suitable for younger children?", answer: "Yes! We offer junior programs for children as young as 7. It's a great sport for developing coordination and reflexes." },
      { question: "Do you host badminton tournaments?", answer: "We host regular in-house tournaments and can help prepare players for external competitions." },
    ],
    academySlug: "badminton-academy",
    ctaTitle: "Step On Court and Feel the Difference",
    ctaPrimary: { label: "Try a Free Session", href: "/free-trial" },
    ctaSecondary: { label: "View Academy", href: "/badminton-academy" },
  },

  pickleball: {
    slug: "pickleball",
    name: "Pickleball",
    tagline: "Come for the Game. Stay for the People.",
    description:
      "Indoor pickleball with 50+ regular players, beginner clinics, and the most welcoming community in the building. You'll make friends here.",
    image: "/images/sports/pickleball.png",
    color: "#2BA84A",
    metaTitle: "Indoor Pickleball Courts — Elkton, MD | Near Middletown, Bear & Newark, DE",
    metaDescription:
      "Indoor pickleball courts in Elkton, MD — 15 min from Middletown & Bear, DE. Open play, beginner lessons, court rentals. Cecil County's best pickleball facility. Book today.",
    overview: [
      "You'll come for the exercise. You'll stay for the people. Our Tuesday and Thursday open play sessions have become the highlight of the week for 50+ regulars — and most of them started as complete beginners. Pickleball is the most social sport we offer, and our community proves it every session.",
      "If you've heard about pickleball from friends, seen it on the news, or you're looking for exercise that's fun and gentle on your joints — this is your place. Our PPR-certified instructor runs beginner clinics weekly, and our regulars are the friendliest group in the building. Couples, friends, solo players — everyone finds their people here.",
    ],
    highlights: [
      { label: "Courts", value: "Dedicated" },
      { label: "Play Style", value: "All Levels" },
      { label: "Community", value: "Social Events" },
      { label: "Open", value: "7 Days" },
    ],
    programs: [
      {
        title: "Court Rentals",
        description: "Reserve a court for private play. Great for regular groups, practice sessions, or friendly tournaments.",
        href: "/schedule",
        tag: "Rental",
      },
      {
        title: "Open Play",
        description: "Drop in for round-robin play. All skill levels welcome — we'll match you with players at your level.",
        href: "/schedule",
        tag: "Drop-In",
      },
      {
        title: "Beginner Lessons",
        description: "Learn the basics — rules, grip, serves, dinks, and strategy. Small group format for maximum learning.",
        href: "/schedule",
        tag: "Beginner",
      },
      {
        title: "Competitive Play",
        description: "Advanced sessions for experienced players. Focus on strategy, tournament play, and competitive drilling.",
        href: "/schedule",
        tag: "Advanced",
      },
    ],
    features: [
      "Dedicated indoor pickleball courts",
      "Professional nets and equipment",
      "Beginner-friendly lessons and clinics",
      "Regular social events and mixers",
      "All equipment provided for beginners",
      "Climate-controlled year-round play",
    ],
    coaches: [
      {
        name: "Coach Williams",
        role: "Pickleball Director",
        credentials: "PPR-certified instructor, tournament player",
        initials: "CW",
      },
    ],
    faqs: [
      { question: "What's the difference between pickleball and tennis?", answer: "Pickleball uses a smaller court, solid paddles, and a perforated ball. It's easier to learn, gentler on joints, and incredibly social." },
      { question: "Do I need my own paddle?", answer: "Not at all! We provide paddles and balls for all open play and lesson sessions. Bring your own if you prefer." },
      { question: "Is pickleball good exercise?", answer: "Absolutely! It provides great cardio, improves agility and reflexes, and burns 400-600 calories per hour — all while having fun." },
    ],
    ctaTitle: "Find Your People on the Court",
    ctaPrimary: { label: "Try a Free Session", href: "/free-trial" },
    ctaSecondary: { label: "View Memberships", href: "/memberships" },
  },
};
