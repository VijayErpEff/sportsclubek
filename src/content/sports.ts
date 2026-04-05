// ============================================================
// SPORT PAGE CONFIGURATION
// Edit this file to update all sport and academy page content.
// ============================================================

import { BOOKING_URLS } from "@/lib/constants/booking";

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
  image?: string;
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
      "You've watched your kid struggle at the plate. The frustration after an 0-for-3 game. The slump that drags into a second week. That's exactly why we partnered with Joe Vanaskey — \"Joltin' Joe\" — a former professional baseball player and scout with decades of experience training youth at his Field of Dreams Academy right here in Cecil County. Our cages run from 30 to 90 MPH, and every session starts with a coach who focuses on the fundamentals: batting, fielding, and technique.",
      "Parents: you can watch every session from our viewing area. You'll see the difference in their mechanics within weeks — not months. Academy players get structured instruction focused on measurable improvement. This isn't daycare with batting helmets. It's real development from a coach who played and scouted at the professional level.",
      "Families from across Delaware and Maryland come to our Elkton facility for batting cage sessions and academy training — including Middletown, Newark, Bear, and Wilmington, DE, as well as North East, Rising Sun, and throughout Cecil County. Located right off I-95 exit 109A, we're the closest professional indoor batting cage facility for most of New Castle County, Delaware. Whether your child plays Little League, travel ball, or high school varsity, our cages and coaching are designed to accelerate their development year-round.",
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
        href: BOOKING_URLS.offerings,
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
        href: BOOKING_URLS.offerings,
        tag: "1-on-1",
      },
      {
        title: "Open Practice",
        description: "Drop in during open hours for casual hitting sessions. Stay sharp between games or just have fun.",
        href: BOOKING_URLS.baseballLittleSluggersL,
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
        name: "Joe Vanaskey",
        role: "Head Baseball Coach",
        credentials: "Former professional baseball player & scout, decades of youth training experience, Joltin' Joe's Field of Dreams Academy (Cecil County, MD)",
        initials: "JV",
        image: "/images/Coaches/Joe.jpg",
      },
    ],
    faqs: [
      { question: "How much do batting cages cost at LevelUP?", answer: "Private cage rental is $40/hour. Helmets and bats are provided. Members get Open Play access from just $8/hour (non-members $15/hour). Academy training packages start at $140 for 4 sessions. You can also try a free session first — no charge, no commitment." },
      { question: "What age can my child start using batting cages?", answer: "Ages 6 and up. We start younger kids at 30 MPH and work up from there. A coach helps them find the right speed and stance for their skill level." },
      { question: "Do you provide helmets and bats?", answer: "Yes — helmets are required and always provided. We have bats available for every age and size. You're welcome to bring your own bat too." },
      { question: "Can adults use the batting cages?", answer: "Absolutely. Our cages go up to 90 MPH and are popular with adult softball and baseball players looking to stay sharp. Drop-in cage rental is $40/hour. Many adult players from Wilmington, Newark, and Cecil County use our cages for regular practice." },
      { question: "How far are the batting cages from Middletown, DE?", answer: "Just 15 minutes. We're at 701 E Pulaski Hwy, Elkton, MD — right off I-95 exit 109A. It's also 20 minutes from Newark, 25 from Bear, and 30 from Wilmington. Free parking on-site." },
    ],
    academySlug: "baseball-academy",
    ctaTitle: "See the Difference in One Session",
    ctaPrimary: { label: "Try a Free Session", href: "/free-trial" },
    ctaSecondary: { label: "View Academy", href: "/baseball-academy" },
  },

  cricket: {
    slug: "cricket",
    name: "Cricket",
    tagline: "IPL Coaches. World-Class Facility. Right Here in Elkton.",
    description:
      "Proud partners of BRSS Cricket Academy — North America's largest cricket academy. Train under IPL veterans, international cricketers, and first-class players at the only dedicated indoor cricket center between Philadelphia and Baltimore.",
    image: "/images/sports/cricket.png",
    color: "#1B7D3A",
    metaTitle: "Indoor Cricket Facility & BRSS Academy Partner — Elkton, MD | Serving Newark, Wilmington & Middletown, DE",
    metaDescription:
      "Train with IPL & international cricket coaches at Maryland's premier indoor facility in Elkton, MD. Proud BRSS Cricket Academy partner. Professional nets, bowling machines, youth & adult programs. Book today.",
    overview: [
      "LevelUP Sports is a proud partner of BRSS Cricket Academy (Baltimore Royals Sunny Sohal Cricket) — the largest cricket academy in North America. Formed through the merger of the Baltimore Royals and the Sunny Sohal Cricket Academy (SSCA), BRSS brings international-caliber coaching to Elkton. Our coaching staff includes an IPL veteran, a former Pakistan international fast bowler, and first-class cricketers from India. You won't find this level of coaching anywhere between Philadelphia and Baltimore.",
      "Whether your family has played cricket for generations or you're curious about the sport, our world-class coaching team meets you where you are. Many of our members drove 45+ minutes each way before we opened. Now they're 15 minutes away, training under coaches who've competed at the highest levels of world cricket. We serve families from Newark, Wilmington, Middletown, and across the tri-state area.",
      "For adult league players, our facility offers the most complete indoor cricket training setup between Philadelphia and Baltimore. Book net sessions with professional bowling machines for solo practice or bring your club team for group training. Whether you're preparing for weekend league matches, sharpening your technique during the off-season, or working with our coaches on specific skills, our full-pitch and half-pitch options give you the space and equipment to train at a professional level. Players from Wilmington, Newark, Hockessin, Christiana, and across New Castle County train here regularly.",
    ],
    highlights: [
      { label: "Nets", value: "Full-Length" },
      { label: "Machines", value: "Pro-Grade" },
      { label: "Partner", value: "BRSS Academy" },
      { label: "Coaching", value: "International" },
    ],
    programs: [
      {
        title: "Net Sessions",
        description: "Book indoor net time for batting and bowling practice. Full pitch $180/hr, half pitch $90/hr, or single cage $40/hr. Bowling machines available for solo training.",
        href: BOOKING_URLS.cricketCageRentals,
        tag: "Drop-In",
      },
      {
        title: "Cricket Academy",
        description: "Structured coaching powered by BRSS Cricket Academy — batting technique, bowling action, and fielding skills. Package 1: $119 (4 sessions) | Package 2: $200 (8 sessions). Wed & Fri evenings, youth and adults.",
        href: "/cricket-academy",
        tag: "Academy",
      },
      {
        title: "Match Preparation",
        description: "Intensive sessions focused on match scenarios, game strategy, and competitive readiness — led by coaches with international match experience.",
        href: BOOKING_URLS.offerings,
        tag: "Advanced",
      },
      {
        title: "Junior Development",
        description: "Age-appropriate training introducing cricket fundamentals in a fun, supportive environment with a clear pathway to competitive cricket.",
        href: "/cricket-academy",
        tag: "Youth",
      },
    ],
    features: [
      "Full-length indoor cricket nets",
      "Professional-grade bowling machines",
      "Video analysis technology",
      "IPL & international-level coaching staff",
      "BRSS Cricket Academy partnership — professional pathway for young cricketers",
      "All equipment available for beginners",
      "Year-round climate-controlled facility",
    ],
    coaches: [
      {
        name: "Sarbjeet Ladda",
        role: "Chief Bowling Coach",
        credentials: "17-year pro career — IPL (KKR, Gujarat Lions, Delhi Daredevils), MLC Champion, 100+ Minor League wickets",
        initials: "SL",
        image: "/images/Coaches/Sarabjit.jpeg",
      },
      {
        name: "Muhammad Asif",
        role: "Fast Bowling Coach",
        credentials: "Former Pakistan international — one of the finest fast bowlers in world cricket",
        initials: "MA",
      },
      {
        name: "Ravi Inder Singh Mehra",
        role: "Batting Coach",
        credentials: "First-class cricketer (India), NKP Salve Trophy representative, BRSS Academy batting coach",
        initials: "RM",
        image: "/images/Coaches/Ravi Inder Singh Mehra.jpeg",
      },
      {
        name: "Rajit Passey",
        role: "Academy Director",
        credentials: "Punjab U19 captain, Baltimore Royals owner, BRSS Cricket Academy co-founder",
        initials: "RP",
        image: "/images/Coaches/Rajit.jpeg",
      },
    ],
    faqs: [
      { question: "What is BRSS Cricket Academy?", answer: "BRSS (Baltimore Royals Sunny Sohal Cricket) is the largest cricket academy in North America, formed through the merger of the Baltimore Royals and the Sunny Sohal Cricket Academy (SSCA). LevelUP is a proud partner facility, bringing BRSS's world-class coaching to the Elkton/tri-state area." },
      { question: "Do you offer cricket coaching for complete beginners?", answer: "Absolutely! Our junior development and beginner programs are designed for players with zero experience. Our coaches work with all skill levels — from first-timers to competitive players." },
      { question: "Can I just book a net without coaching?", answer: "Yes, net sessions can be booked independently. Full pitch rental is $180/hour, half pitch $90/hour, or a single cage for $40/hour. Bowling machines are available for self-practice." },
      { question: "What cricket equipment is provided?", answer: "We provide bats, pads, gloves, and helmets for beginners. Regular players are encouraged to bring their own gear." },
      { question: "Is there a pathway to competitive cricket?", answer: "Yes. Through our BRSS partnership, players have access to professional pathways including Major League Cricket (MLC), Minor League Cricket (MiLC), and international tournament exposure." },
      { question: "Do you offer cricket training for adults?", answer: "Yes — we have dedicated adult sessions including weekday evening and weekend programs. Our net sessions are popular with adult league players from Wilmington, Newark, and across the tri-state area. You can book nets independently or join our adult coaching programs for structured skill development with our IPL and international-level coaches." },
      { question: "How far is your cricket facility from Wilmington, DE?", answer: "About 30 minutes via I-95. We're at 701 E Pulaski Hwy, Elkton, MD — the only dedicated indoor cricket facility between Philadelphia and Baltimore. Players drive from Wilmington, Newark (20 min), Middletown (15 min), Hockessin, Christiana, and throughout New Castle County." },
      { question: "Can I book a bowling machine session without a coach?", answer: "Yes. Our net sessions can be booked independently — full pitch at $180/hour, half pitch at $90/hour, or a single cage at $40/hour. Professional bowling machines are available for self-directed practice. Many adult players use these for match preparation and league training." },
    ],
    academySlug: "cricket-academy",
    ctaTitle: "Train Under International Coaches",
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
      "Head Coach Nabeel Adeel is a BWF and USA Badminton Level-1 certified coach with over 25 years of competitive and coaching experience — a multiple-time Pennsylvania State Champion and Head Coach of the Swarthmore College Varsity Badminton Team. He's joined by advisory board member Syam Prasad Anand, a BWF Level-1 certified coach who has helped build world-class training facilities across the U.S., and Nick, a decades-long competitive player and Dilwyne Badminton Club leader in Wilmington, DE. Whether you're picking up a racket for the first time or training for tournament play, the facility and coaching here will push you to the next level.",
      "Our courts draw players from across the tri-state area — including Wilmington, Newark, Middletown, Hockessin, and Bear in Delaware, as well as Kennett Square and Oxford in Pennsylvania. For Wilmington-area players, we're closer than most city venues, with free parking and three competition-grade courts that are rarely fully booked on weekday mornings and afternoons. Whether you're looking for hourly court rentals for casual play, regular weekly slots for your doubles group, or structured coaching to take your game to the next level, our BWF-standard facility is the best option within 30 miles.",
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
        href: BOOKING_URLS.offerings,
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
        href: BOOKING_URLS.offerings,
        tag: "Group",
      },
      {
        title: "Open Play",
        description: "Join our open play sessions to meet other players, get games in, and enjoy the sport in a social setting.",
        href: BOOKING_URLS.badmintonOpenPlay,
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
        name: "Nabeel Adeel",
        role: "Head Badminton Coach",
        credentials: "BWF & USA Badminton Level-1 certified, 25+ years competitive & coaching experience, PA State Champion, Swarthmore College Varsity Head Coach",
        initials: "NA",
      },
      {
        name: "Syam Prasad Anand",
        role: "Advisory Board",
        credentials: "BWF Level-1 certified coach, founding leader of multiple badminton organizations, strategic advisor",
        initials: "SA",
        image: "/images/Coaches/Syam Prasad.jpg",
      },
      {
        name: "Nick",
        role: "Mentor & Technical Advisor",
        credentials: "Dilwyne Badminton Club (Wilmington, DE) management & Treasurer since 1996, decades of competitive playing experience",
        initials: "N",
        image: "/images/Coaches/Nick.jpg",
      },
    ],
    faqs: [
      { question: "Do you provide badminton rackets?", answer: "We have rackets available for rental. Court rental is $40/hour. For regular players, we recommend investing in your own racket for the best experience. Academy packages start at $140 for 4 hours of coaching." },
      { question: "Is badminton suitable for younger children?", answer: "Yes! We offer junior programs for children as young as 7. It's a great sport for developing coordination and reflexes." },
      { question: "Do you host badminton tournaments?", answer: "We host regular in-house tournaments and can help prepare players for external competitions. Our tournament prep program covers match strategy, competitive drilling, and mental preparation." },
      { question: "Do you offer private badminton coaching?", answer: "Yes. Private one-on-one and small-group coaching sessions are available with Coach Nabeel Adeel (BWF & USA Badminton Level-1 certified, PA State Champion). Private lessons are ideal for players who want accelerated improvement on specific aspects of their game — footwork, smash technique, match strategy, or tournament preparation." },
      { question: "Can adults join badminton programs?", answer: "Absolutely. We have adult sessions in both our academy and open play programs. Many of our adult players come from Wilmington, Newark, and the Dilwyne Badminton Club community. Whether you're a beginner or an experienced club player, we have programs at your level." },
      { question: "How far are your badminton courts from Wilmington, DE?", answer: "About 30 minutes via I-95. We're at 701 E Pulaski Hwy, Elkton, MD. Our BWF-standard courts are the closest competition-grade indoor badminton facility for Wilmington, Newark, Middletown, and Hockessin players. Easy access, free parking, and courts available 7 days a week." },
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
      "If you've heard about pickleball from friends, seen it on the news, or you're looking for exercise that's fun and gentle on your joints — this is your place. We run beginner clinics weekly, and our regulars are the friendliest group in the building. Couples, friends, solo players — everyone finds their people here.",
      "Our indoor pickleball courts are the go-to for players across Cecil County, MD and New Castle County, DE. We draw regulars from Middletown, Bear, Newark, Glasgow, Christiana, and even Wilmington — because finding quality indoor pickleball courts in the area isn't easy. Climate-controlled play means no wind, no rain, and no 95-degree heat. Just you, a paddle, and 50+ people who are happy you showed up.",
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
        href: BOOKING_URLS.offerings,
        tag: "Rental",
      },
      {
        title: "Open Play",
        description: "Drop in for round-robin play. All skill levels welcome — we'll match you with players at your level.",
        href: BOOKING_URLS.pickleballOpenPlay,
        tag: "Drop-In",
      },
      {
        title: "Beginner Lessons",
        description: "Learn the basics — rules, grip, serves, dinks, and strategy. Small group format for maximum learning.",
        href: BOOKING_URLS.offerings,
        tag: "Beginner",
      },
      {
        title: "Competitive Play",
        description: "Advanced sessions for experienced players. Focus on strategy, tournament play, and competitive drilling.",
        href: BOOKING_URLS.offerings,
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
    coaches: [],
    faqs: [
      { question: "What's the difference between pickleball and tennis?", answer: "Pickleball uses a smaller court, solid paddles, and a perforated ball. It's easier to learn, gentler on joints, and incredibly social." },
      { question: "Do I need my own paddle?", answer: "Not at all! We provide paddles and balls for all open play and lesson sessions. Bring your own if you prefer." },
      { question: "Is pickleball good exercise?", answer: "Absolutely! It provides great cardio, improves agility and reflexes, and burns 400-600 calories per hour — all while having fun." },
      { question: "Where are the closest indoor pickleball courts to Middletown, DE?", answer: "LevelUP Sports in Elkton, MD — just 15 minutes from Middletown via Route 40. We're also 20 minutes from Newark, 25 from Bear, and 30 from Wilmington. Our dedicated indoor courts mean you can play year-round regardless of weather." },
    ],
    ctaTitle: "Find Your People on the Court",
    ctaPrimary: { label: "Try a Free Session", href: "/free-trial" },
    ctaSecondary: { label: "View Memberships", href: BOOKING_URLS.memberships },
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
      "Whether your kid is learning to pass for the first time or your adult rec team needs a reliable indoor home, LevelUP has you covered. Our regulation-height nets, proper court lines, and professional flooring give you the real volleyball experience — not a makeshift setup in a church gym. Coach Viktor brings 20+ years of competitive playing experience and 6+ years coaching youth, university, and adult teams — he builds players who are fundamentally sound and mentally tough.",
      "Parents: this is the sport that teaches teamwork better than any other. Every point requires communication, trust, and coordination. Our youth programs focus on passing, serving, and court awareness — the skills that separate good players from great ones. And our adult open play nights? They've become the most fun evening of the week for 30+ regulars.",
      "Teams and players from Newark, Middletown, Bear, Wilmington, and across New Castle County, DE choose our courts for regular practice because they're regulation quality, climate-controlled, and easy to get to. Club teams use us for practice space and scrimmages. School teams book courts for off-season training. Adult groups reserve weekly time slots for competitive and recreational play. At $120/hour for a full regulation court with professional flooring and adjustable nets, we're the best value for serious volleyball in the tri-state area.",
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
        href: BOOKING_URLS.offerings,
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
        href: BOOKING_URLS.offerings,
        tag: "Drop-In",
      },
      {
        title: "Adult Leagues",
        description: "Recreational and competitive leagues for adult teams. Season play with playoffs and awards.",
        href: BOOKING_URLS.offerings,
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
        name: "Coach Viktor",
        role: "Head Volleyball Coach",
        credentials: "20+ years competitive playing, 6+ years coaching youth & university teams, Ukrainian league medalist",
        initials: "VK",
      },
    ],
    faqs: [
      { question: "What ages can play volleyball at LevelUP?", answer: "We offer programs for ages 8 and up, plus adult open play and leagues. Net heights are adjusted for younger age groups." },
      { question: "Do I need to bring my own volleyball?", answer: "No — we provide game balls for all sessions, open play, and rentals. You're welcome to bring your own if you prefer." },
      { question: "Can my team rent a court for practice?", answer: "Absolutely. Private court rental is $120/hour for team practices, scrimmages, or private training. Training packages start at $149/month for 4 sessions." },
      { question: "Do you have adult volleyball leagues?", answer: "Yes — we run both recreational and competitive adult leagues with season play, standings, playoffs, and awards. Our adult open play nights also draw 30+ regulars weekly. Many of our adult players come from Newark, Middletown, Wilmington, and across Cecil County." },
      { question: "How far are your volleyball courts from Newark, DE?", answer: "About 20 minutes via Route 40 or I-95. We're at 701 E Pulaski Hwy, Elkton, MD. Club teams, school teams, and adult groups from Newark, Bear, Middletown, Christiana, and Wilmington use our regulation indoor courts for practice and scrimmages year-round." },
      { question: "Can my child prepare for school volleyball tryouts here?", answer: "That's exactly what our Volleyball Academy is designed for. Coach Viktor's 10-week program builds the passing, serving, and court awareness that school and club coaches look for. Players are grouped by age and skill level, with video review every session." },
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
      "When fall leagues end and spring tryouts are months away, your kid's development doesn't have to stop. Our professional indoor turf gives players a year-round training ground — and a futsal-first approach that builds the close-control skills and quick decision-making that make the difference at outdoor tryouts. There's a reason the best soccer nations in the world train on small-sided indoor pitches.",
      "We run youth programs for ages 6 and up, adult open play multiple nights a week, and seasonal leagues for teams looking for competitive indoor games. The turf is professional-quality, the goals are regulation, and the focus is on technical excellence — first touch, passing under pressure, and vision. Parents: you'll see your kid's confidence with the ball transform within weeks.",
      "Our indoor turf draws players and teams from throughout the tri-state area — Middletown, Newark, Bear, Wilmington, and Hockessin in Delaware, as well as Cecil County, MD and Chester County, PA. When outdoor fields are frozen, flooded, or scorching, our year-round indoor turf keeps your training on track. Local clubs from New Castle County and Cecil County book regular training slots, and our adult leagues give recreational and competitive players a place to play 12 months a year.",
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
        href: BOOKING_URLS.offerings,
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
        href: BOOKING_URLS.offerings,
        tag: "Drop-In",
      },
      {
        title: "Indoor Leagues",
        description: "5v5 and futsal leagues for youth and adult teams. Season play with standings, playoffs, and championship night.",
        href: BOOKING_URLS.offerings,
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
    coaches: [],
    faqs: [
      { question: "What's the difference between futsal and indoor soccer?", answer: "Futsal uses a smaller, low-bounce ball and emphasizes close control and quick passing. It's the best way to develop technical skill. We offer both futsal and traditional indoor 5v5." },
      { question: "Do you offer soccer for younger kids?", answer: "Yes! Our academy starts at age 6 with age-appropriate training that focuses on fun, coordination, and basic ball skills." },
      { question: "Can my outdoor team train here in winter?", answer: "Absolutely. Many local outdoor clubs use our turf for winter training. We offer team rates and can coordinate with your coaching staff. Teams from Newark, Middletown, Wilmington, and Cecil County book regular winter training sessions." },
      { question: "Do you have adult soccer leagues?", answer: "Yes — we run 5v5 and futsal leagues for adult teams with season play, standings, playoffs, and championship nights. Adult open play is also available multiple evenings per week. Players come from across the tri-state area." },
    ],
    academySlug: "soccer-academy",
    ctaTitle: "Keep Playing. Keep Improving.",
    ctaPrimary: { label: "Try a Free Session", href: "/free-trial" },
    ctaSecondary: { label: "View Academy", href: "/soccer-academy" },
  },
};
