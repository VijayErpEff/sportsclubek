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
        description: "Reserve a professional batting cage for individual or group sessions at $40/hour. Adjustable pitching machines for every skill level.",
        href: "/schedule",
        tag: "Drop-In",
      },
      {
        title: "Baseball Academy",
        description: "Structured coaching for youth players. Package 1: $140 (4 sessions) | Package 2: $250 (8 sessions). Develop hitting, fielding, and game IQ with expert coaches. Saturdays for kids/teens; Monday evenings available.",
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
      { question: "How much do batting cages cost at LevelUP?", answer: "Private cage rental is $40/hour. Helmets and bats are provided. Members get Open Play access from just $8/hour (non-members $15/hour). Academy training packages start at $140 for 4 sessions. You can also try a free session first — no charge, no commitment." },
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
        description: "Book indoor net time for batting and bowling practice. Full pitch $180/hr, half pitch $90/hr, or single cage $40/hr. Bowling machines available for solo training.",
        href: "/schedule",
        tag: "Drop-In",
      },
      {
        title: "Cricket Academy",
        description: "Structured coaching programs covering batting technique, bowling action, and fielding skills. Package 1: $119 (4 sessions) | Package 2: $200 (8 sessions). Wed & Fri evenings, youth and adults.",
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
      { question: "Can I just book a net without coaching?", answer: "Yes, net sessions can be booked independently. Full pitch rental is $180/hour, half pitch $90/hour, or a single cage for $40/hour. Bowling machines are available for self-practice." },
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
        description: "Book a court for singles or doubles play at $40/hour. Perfect for practice sessions or friendly matches.",
        href: "/schedule",
        tag: "Drop-In",
      },
      {
        title: "Badminton Academy",
        description: "Structured training programs developing footwork, technique, and match strategy with certified coaches. Package 1: $140 (4 hrs coaching) | Package 2: $250 (8 hrs coaching + 4 hrs practice). Saturdays & Tuesday evenings.",
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
      { question: "Do you provide badminton rackets?", answer: "We have rackets available for rental. Court rental is $40/hour. For regular players, we recommend investing in your own racket for the best experience. Academy packages start at $140 for 4 hours of coaching." },
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

  volleyball: {
    slug: "volleyball",
    name: "Volleyball",
    tagline: "Set. Spike. Repeat.",
    description:
      "Indoor volleyball with regulation courts, expert coaching, and a community that cheers as loud as you play. Open play, clinics, and youth development.",
    image: "/images/sports/volleyball.jpg",
    color: "#D97706",
    metaTitle: "Indoor Volleyball Courts & Training — Elkton, MD | Near Middletown & Newark, DE",
    metaDescription:
      "Indoor volleyball courts in Elkton, MD — 15 min from Middletown & Newark, DE. Youth academy, adult leagues, open play, and expert coaching. Book today.",
    overview: [
      "Whether your kid is learning to pass for the first time or your adult rec team needs a reliable indoor home, LevelUP has you covered. Our regulation-height nets, proper court lines, and professional flooring give you the real volleyball experience — not a makeshift setup in a church gym. Coach Torres has coached club and high school volleyball for over a decade, and she builds players who are fundamentally sound and mentally tough.",
      "Parents: this is the sport that teaches teamwork better than any other. Every point requires communication, trust, and coordination. Our youth programs focus on passing, serving, and court awareness — the skills that separate good players from great ones. And our adult open play nights? They've become the most fun evening of the week for 30+ regulars.",
    ],
    highlights: [
      { label: "Courts", value: "Regulation" },
      { label: "Nets", value: "Adjustable" },
      { label: "Levels", value: "All" },
      { label: "Open", value: "7 Days" },
    ],
    programs: [
      {
        title: "Court Rentals",
        description: "Reserve a full volleyball court for team practice, scrimmages, or private training sessions at $120/hour.",
        href: "/schedule",
        tag: "Rental",
      },
      {
        title: "Volleyball Academy",
        description: "Structured youth development programs building passing, setting, hitting, and game IQ with expert coaches. Package 1: $149 (4 sessions/month, 90 min each) | Package 2: $249 (8 sessions/month, 90 min each). Sundays & Wednesday evenings.",
        href: "/volleyball-academy",
        tag: "Academy",
      },
      {
        title: "Open Play",
        description: "Drop in for pickup games. All skill levels welcome — we rotate teams so everyone plays.",
        href: "/schedule",
        tag: "Drop-In",
      },
      {
        title: "Adult Leagues",
        description: "Recreational and competitive leagues for adult teams. Season play with playoffs and awards.",
        href: "/schedule",
        tag: "League",
      },
    ],
    features: [
      "Regulation indoor volleyball courts",
      "Adjustable net heights for all age groups",
      "Professional court flooring for safe play",
      "Expert coaching staff with club experience",
      "All equipment provided for open play",
      "Year-round climate-controlled facility",
    ],
    coaches: [
      {
        name: "Coach Torres",
        role: "Head Volleyball Coach",
        credentials: "12+ years club & high school coaching, USAV certified",
        initials: "CT",
      },
      {
        name: "Coach Nguyen",
        role: "Youth Development Coach",
        credentials: "Former D2 college player, specializes in fundamentals",
        initials: "CN",
      },
    ],
    faqs: [
      { question: "What ages can play volleyball at LevelUP?", answer: "We offer programs for ages 8 and up, plus adult open play and leagues. Net heights are adjusted for younger age groups." },
      { question: "Do I need to bring my own volleyball?", answer: "No — we provide game balls for all sessions, open play, and rentals. You're welcome to bring your own if you prefer." },
      { question: "Can my team rent a court for practice?", answer: "Absolutely. Private court rental is $120/hour for team practices, scrimmages, or private training. Training packages start at $149/month for 4 sessions." },
    ],
    academySlug: "volleyball-academy",
    ctaTitle: "Get on the Court",
    ctaPrimary: { label: "Try a Free Session", href: "/free-trial" },
    ctaSecondary: { label: "View Academy", href: "/volleyball-academy" },
  },

  soccer: {
    slug: "soccer",
    name: "Soccer",
    tagline: "Year-Round Soccer. Rain or Shine.",
    description:
      "Professional indoor turf, futsal programs, and coaching that develops technical skill — not just fitness. Youth academies through adult open play.",
    image: "/images/sports/soccer.jpg",
    color: "#B83A2F",
    metaTitle: "Indoor Soccer & Futsal — Elkton, MD | Near Middletown, Newark & Wilmington, DE",
    metaDescription:
      "Indoor soccer & futsal in Elkton, MD — 15 min from Middletown & Newark, DE. Professional turf, youth academy, adult leagues, open play. Year-round. Book today.",
    overview: [
      "When fall leagues end and spring tryouts are months away, your kid's development doesn't have to stop. Our professional indoor turf gives players a year-round training ground — and Coach Martinez's futsal-first approach builds the close-control skills and quick decision-making that make the difference at outdoor tryouts. There's a reason the best soccer nations in the world train on small-sided indoor pitches.",
      "We run youth academies for ages 6 and up, adult open play multiple nights a week, and seasonal leagues for teams looking for competitive indoor games. The turf is FIFA-quality, the goals are regulation, and the coaching focuses on technical excellence — first touch, passing under pressure, and vision. Parents: you'll see your kid's confidence with the ball transform within weeks.",
    ],
    highlights: [
      { label: "Surface", value: "Pro Turf" },
      { label: "Format", value: "Futsal & 5v5" },
      { label: "Ages", value: "6–Adult" },
      { label: "Open", value: "7 Days" },
    ],
    programs: [
      {
        title: "Field Rentals",
        description: "Reserve the turf field for team training, scrimmages, or private sessions. Full field or half-field available.",
        href: "/schedule",
        tag: "Rental",
      },
      {
        title: "Soccer Academy",
        description: "Structured youth development with a futsal-first methodology. Build technical skill, game IQ, and love for the game.",
        href: "/soccer-academy",
        tag: "Academy",
      },
      {
        title: "Open Play",
        description: "Drop-in pickup games on the turf. All levels welcome — teams are balanced so everyone gets a competitive game.",
        href: "/schedule",
        tag: "Drop-In",
      },
      {
        title: "Indoor Leagues",
        description: "5v5 and futsal leagues for youth and adult teams. Season play with standings, playoffs, and championship night.",
        href: "/schedule",
        tag: "League",
      },
    ],
    features: [
      "Professional-grade indoor turf field",
      "Regulation futsal and small-sided goals",
      "Year-round climate-controlled training",
      "Licensed coaching staff with club experience",
      "All equipment provided for open play",
      "Video analysis available for academy members",
    ],
    coaches: [
      {
        name: "Coach Martinez",
        role: "Head Soccer Coach",
        credentials: "USSF B-licensed, 10+ years youth development, former semi-pro",
        initials: "CM",
      },
      {
        name: "Coach Okafor",
        role: "Futsal & Technical Coach",
        credentials: "US Futsal certified, specializes in close control and creativity",
        initials: "CO",
      },
    ],
    faqs: [
      { question: "What's the difference between futsal and indoor soccer?", answer: "Futsal uses a smaller, low-bounce ball and emphasizes close control and quick passing. It's the best way to develop technical skill. We offer both futsal and traditional indoor 5v5." },
      { question: "Do you offer soccer for younger kids?", answer: "Yes! Our academy starts at age 6 with age-appropriate training that focuses on fun, coordination, and basic ball skills." },
      { question: "Can my outdoor team train here in winter?", answer: "Absolutely. Many local outdoor clubs use our turf for winter training. We offer team rates and can coordinate with your coaching staff." },
    ],
    academySlug: "soccer-academy",
    ctaTitle: "Keep Playing. Keep Improving.",
    ctaPrimary: { label: "Try a Free Session", href: "/free-trial" },
    ctaSecondary: { label: "View Academy", href: "/soccer-academy" },
  },
};
