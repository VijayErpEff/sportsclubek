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
    tagline: "Step Into the Cage. Elevate Your Swing.",
    description:
      "Professional indoor batting cages and expert coaching for players of every level — from first swings to competitive training.",
    image: "/images/sports/baseball.jpg",
    color: "#1B3A5C",
    metaTitle: "Indoor Batting Cages & Baseball Training — Elkton, MD | Near Middletown & Newark, DE",
    metaDescription:
      "Indoor batting cages & expert baseball coaching in Elkton, MD — 15 min from Middletown & Newark, DE. Youth academy, private lessons, cage rentals. Pitching machines up to 90 MPH. Book now.",
    overview: [
      "Our indoor baseball facility gives players a place to train year-round, rain or shine. Whether you're a youth player picking up the bat for the first time or a seasoned competitor looking to sharpen your swing, we have the equipment, space, and coaching to help you improve.",
      "With four professional-grade batting cages, adjustable pitching machines, and experienced coaches on staff, LevelUP Sports is Elkton's home for baseball training.",
    ],
    highlights: [
      { label: "Cages", value: "4" },
      { label: "Speed Range", value: "30–80 MPH" },
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
      { question: "Do I need to bring my own bat and helmet?", answer: "Helmets are provided. You're welcome to bring your own bat, or use one of ours." },
      { question: "What age is appropriate for batting cages?", answer: "Our cages are suitable for ages 6 and up. We adjust the machine speed to match the player's skill level." },
      { question: "Can I book a cage for a birthday party or group?", answer: "Yes! We offer group bookings for parties and team events. Contact us for group rates." },
    ],
    academySlug: "baseball-academy",
    ctaTitle: "Ready to Train?",
    ctaPrimary: { label: "Book a Cage", href: "/schedule" },
    ctaSecondary: { label: "View Academy", href: "/baseball-academy" },
  },

  cricket: {
    slug: "cricket",
    name: "Cricket",
    tagline: "Master the Gentleman's Game.",
    description:
      "Maryland's premier indoor cricket facility — professional nets, expert coaching, and structured programs from beginner to competitive.",
    image: "/images/sports/cricket.png",
    color: "#1B7D3A",
    metaTitle: "Indoor Cricket Facility & Academy — Elkton, MD | Serving Newark, Wilmington & Middletown, DE",
    metaDescription:
      "Maryland's premier indoor cricket facility in Elkton, MD — serving Newark, Wilmington & Middletown, DE. Professional nets, bowling machines, youth & adult academy. Book cricket nets today.",
    overview: [
      "LevelUP Sports is home to the region's premier indoor cricket facility. Whether you're perfecting your cover drive or learning to bowl your first delivery, our professional setup and experienced coaches create the ideal training environment.",
      "With full-length indoor nets, professional bowling machines, and coaches with competitive experience, we serve the growing cricket community across Maryland, Delaware, and Pennsylvania.",
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
    ctaTitle: "Ready to Play?",
    ctaPrimary: { label: "Book a Net Session", href: "/schedule" },
    ctaSecondary: { label: "View Academy", href: "/cricket-academy" },
  },

  badminton: {
    slug: "badminton",
    name: "Badminton",
    tagline: "Speed. Precision. Power.",
    description:
      "Competition-grade indoor badminton courts with professional coaching — from casual rallies to tournament preparation.",
    image: "/images/sports/badminton.jpg",
    color: "#2A5A8C",
    metaTitle: "Indoor Badminton Courts & Academy — Elkton, MD | Near Middletown, Newark & Wilmington, DE",
    metaDescription:
      "BWF-approved indoor badminton courts in Elkton, MD — closest to Middletown, Newark & Wilmington, DE. Court rentals, academy, certified coaching. Book your court today.",
    overview: [
      "Our competition-grade badminton courts are built for players who take their game seriously. With professional-quality nets, LED lighting, and cushioned flooring, every session feels like match day.",
      "Whether you're looking for casual rallies, structured coaching, or tournament preparation, our certified coaches and modern facility deliver the training environment you need.",
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
    ctaTitle: "Ready to Play?",
    ctaPrimary: { label: "Book a Court", href: "/schedule" },
    ctaSecondary: { label: "View Academy", href: "/badminton-academy" },
  },

  pickleball: {
    slug: "pickleball",
    name: "Pickleball",
    tagline: "Game On. Cecil County's Best Courts.",
    description:
      "Indoor pickleball courts for open play, lessons, and court rentals — the fastest-growing sport in America, played at the best facility in the region.",
    image: "/images/sports/pickleball.png",
    color: "#2BA84A",
    metaTitle: "Indoor Pickleball Courts — Elkton, MD | Near Middletown, Bear & Newark, DE",
    metaDescription:
      "Indoor pickleball courts in Elkton, MD — 15 min from Middletown & Bear, DE. Open play, beginner lessons, court rentals. Cecil County's best pickleball facility. Book today.",
    overview: [
      "Pickleball is the fastest-growing sport in America, and we have the best indoor courts in Cecil County. Our dedicated pickleball courts feature professional nets, proper court markings, and the welcoming community atmosphere that makes this sport special.",
      "Whether you've never held a paddle or you're a seasoned competitor, LevelUP Sports is your home court. Open play, structured lessons, and court rentals are available seven days a week.",
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
    ctaTitle: "Ready to Play?",
    ctaPrimary: { label: "Book a Court", href: "/schedule" },
    ctaSecondary: { label: "View Memberships", href: "/memberships" },
  },
};
