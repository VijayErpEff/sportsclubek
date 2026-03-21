export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  category: "training-tips" | "news" | "athlete-spotlight" | "events";
  sport?: string;
  image?: string;
  featured?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "5-batting-drills-youth-players",
    title: "5 Batting Drills Every Youth Player Should Practice",
    excerpt:
      "Improve your swing mechanics with these coach-approved drills that you can practice at home or in our batting cages.",
    content: `<p>Whether your young athlete is just starting out or looking to refine their swing, consistent practice with the right drills makes all the difference. Coach Rivera shares his top 5 batting drills that build real game-day confidence.</p>
    <h2>1. Tee Work with Purpose</h2>
    <p>Don&rsquo;t just swing at the tee mindlessly. Place the tee at different heights and positions across the plate. Focus on driving the ball to specific zones &mdash; opposite field, up the middle, and pull side. This builds plate coverage and bat control that translates directly to live at-bats.</p>
    <h2>2. Soft Toss Variations</h2>
    <p>Standard soft toss is great, but add variety: high toss, low toss, inside/outside. This trains the hitter to adjust their swing path in real-time, simulating game-like pitch locations. Aim for 3 sets of 15 swings with each variation.</p>
    <h2>3. One-Hand Drills</h2>
    <p>Top-hand and bottom-hand drills isolate each arm&rsquo;s contribution to the swing. Use a lighter bat and focus on smooth, controlled swings. This builds the strength and coordination that power hitters rely on.</p>
    <h2>4. Front-Toss with Tennis Balls</h2>
    <p>Tennis balls are safer for close-range front toss and help players track smaller objects, improving hand-eye coordination. Mix speeds and locations to keep the hitter engaged and adapting.</p>
    <h2>5. Live Cage Sessions</h2>
    <p>Nothing replaces live machine work. Start at a comfortable speed and gradually increase. Focus on timing and making solid contact rather than power. Our cages at LevelUP go up to 90 MPH for advanced players.</p>
    <p><strong>Ready to put these drills into practice?</strong> Book a batting cage session at LevelUP Sports and work with our pitching machines at your own pace.</p>`,
    author: "Coach Rivera",
    date: "2025-03-15",
    readTime: 4,
    category: "training-tips",
    sport: "Baseball",
    image: "/images/blog/batting-drills.jpg",
    featured: true,
  },
  {
    slug: "summer-cricket-league-registration-open",
    title: "Summer Cricket League Registration Now Open",
    excerpt:
      "Join our first-ever summer cricket league. Teams forming now for youth and adult divisions.",
    content: `<p>We&rsquo;re excited to announce the launch of LevelUP&rsquo;s Summer Cricket League! Registration is now open for both youth (U-15) and adult divisions.</p>
    <h2>League Details</h2>
    <p>The league runs from June through August with matches every Saturday. Each team plays 8 regular season games followed by playoffs. Matches use a T20 format to keep the action fast-paced and exciting for players and spectators alike.</p>
    <h2>Divisions</h2>
    <ul><li><strong>Youth (U-15):</strong> Players ages 10&ndash;15. Modified rules for development and safety.</li><li><strong>Adult Open:</strong> All skill levels welcome. Great for beginners and competitive players alike.</li></ul>
    <h2>Registration</h2>
    <p>Individual registration is $75 per player (includes jersey). Team registration is $500 for a squad of 12. Early bird discount of 15% available through April 30.</p>
    <p>Don&rsquo;t have a team? No problem &mdash; register as an individual and we&rsquo;ll place you on a team. It&rsquo;s a great way to meet fellow cricket enthusiasts in the tri-state area.</p>`,
    author: "LevelUP Sports",
    date: "2025-03-10",
    readTime: 3,
    category: "news",
    sport: "Cricket",
    image: "/images/blog/cricket-league.jpg",
  },
  {
    slug: "improve-badminton-footwork",
    title: "How to Improve Your Badminton Footwork in 30 Days",
    excerpt:
      "Footwork is the foundation of badminton. Here's a structured 30-day plan to transform your court movement.",
    content: `<p>In badminton, your feet are just as important as your racket. Coach Lee, our head badminton instructor, has designed a 30-day footwork program that any player can follow &mdash; from club-level beginners to competitive tournament players.</p>
    <h2>Week 1: Foundation Drills</h2>
    <p>Start with basic shadow footwork &mdash; move to all six corners of the court without a shuttle. Focus on split steps, lunges, and recovery. Aim for 15 minutes daily. This builds muscle memory for the movement patterns you&rsquo;ll use in every rally.</p>
    <h2>Week 2: Speed Ladder Work</h2>
    <p>Introduce agility ladder drills: in-and-outs, lateral shuffles, and cross-overs. These build the quick-twitch muscle fibers essential for explosive court movement. Three sets of each drill, three times per week.</p>
    <h2>Week 3: On-Court Patterns</h2>
    <p>Practice specific rally patterns: net-to-back, cross-court clears, drop-and-drive sequences. A training partner or coach feeding shuttles makes this most effective. Record yourself to identify wasted movement.</p>
    <h2>Week 4: Integration</h2>
    <p>Play practice matches focusing specifically on returning to base position after every shot. Record yourself and compare your movement to week 1 &mdash; you&rsquo;ll be surprised at the improvement.</p>
    <p>Our badminton courts at LevelUP Sports are available for individual practice and coaching sessions. Book your court time today.</p>`,
    author: "Coach Lee",
    date: "2025-03-05",
    readTime: 5,
    category: "training-tips",
    sport: "Badminton",
    image: "/images/blog/badminton-footwork.jpg",
  },
  {
    slug: "athlete-spotlight-marcus-rivera",
    title:
      "Athlete Spotlight: Marcus Rivera's Journey from Bench to Starting Lineup",
    excerpt:
      "How 14-year-old Marcus transformed his baseball game with dedication and the right coaching.",
    content: `<p>When Marcus Rivera first walked into LevelUP Sports eight months ago, he was a nervous 14-year-old who&rsquo;d just been told he wasn&rsquo;t good enough to make his school&rsquo;s starting lineup. Today, he&rsquo;s the team&rsquo;s cleanup hitter with a .380 batting average.</p>
    <h2>The Starting Point</h2>
    <p>&ldquo;I was really discouraged,&rdquo; Marcus recalls. &ldquo;I loved baseball but I was struggling with my swing mechanics. My coach at school didn&rsquo;t have time to work with me one-on-one.&rdquo;</p>
    <h2>The Transformation</h2>
    <p>Marcus enrolled in our Baseball Academy&rsquo;s twice-weekly sessions. Coach Rivera identified issues with his stance and timing almost immediately. &ldquo;Marcus had natural bat speed but his weight transfer was off,&rdquo; explains Coach Rivera. &ldquo;Once we fixed his load and stride, everything clicked.&rdquo;</p>
    <h2>The Results</h2>
    <p>Within three months, Marcus&rsquo;s batting average jumped from .220 to .340. By the end of the season, it was .380. He earned a starting spot and was named to the all-conference team.</p>
    <p>&ldquo;LevelUP didn&rsquo;t just make me a better hitter,&rdquo; Marcus says. &ldquo;The coaches here taught me to believe in myself. That&rsquo;s something I&rsquo;ll carry with me forever.&rdquo;</p>`,
    author: "LevelUP Sports",
    date: "2025-02-28",
    readTime: 4,
    category: "athlete-spotlight",
    sport: "Baseball",
    image: "/images/blog/marcus-spotlight.jpg",
    featured: true,
  },
  {
    slug: "spring-open-house-2025",
    title: "Spring Open House: Free Tours, Demos & Family Fun — April 12",
    excerpt:
      "Join us for our biggest open house yet! Free facility tours, sport demos, giveaways, and special membership offers.",
    content: `<p>Mark your calendars! LevelUP Sports is hosting our Spring Open House on Saturday, April 12 from 10 AM to 4 PM. Bring the whole family for a day of free sports, tours, and fun.</p>
    <h2>What to Expect</h2>
    <ul><li>Free facility tours every 30 minutes</li><li>Try-it-free demos in all four sports</li><li>Meet our coaching staff</li><li>Free batting cage sessions for kids</li><li>Food trucks and refreshments</li><li>Raffle prizes including free memberships</li></ul>
    <h2>Special Offers</h2>
    <p>Sign up for a membership at the Open House and get your first month FREE plus a LevelUP welcome kit. Existing members who bring a friend get a $25 credit.</p>
    <p>No registration required &mdash; just show up and have fun! Parking is free and plentiful.</p>`,
    author: "LevelUP Sports",
    date: "2025-03-18",
    readTime: 2,
    category: "events",
    image: "/images/blog/open-house.jpg",
  },
  {
    slug: "pickleball-beginner-mistakes",
    title:
      "7 Common Pickleball Mistakes Beginners Make (And How to Fix Them)",
    excerpt:
      "New to pickleball? Avoid these common pitfalls and level up your game faster.",
    content: `<p>Pickleball is one of the fastest-growing sports in America, and for good reason &mdash; it&rsquo;s fun, social, and easy to pick up. But easy to learn doesn&rsquo;t mean there aren&rsquo;t common traps beginners fall into.</p>
    <h2>1. Standing Too Far from the Kitchen Line</h2>
    <p>The non-volley zone (kitchen) line is where points are won. Get there quickly and stay there. Most beginners hang back at mid-court, which leaves them vulnerable to drops and dinks.</p>
    <h2>2. Using Too Much Power</h2>
    <p>Pickleball rewards placement over power. Focus on dinking &mdash; soft shots into the kitchen &mdash; rather than trying to smash every ball. Patience wins more points than aggression.</p>
    <h2>3. Ignoring the Third Shot Drop</h2>
    <p>After the serve and return, the serving team&rsquo;s third shot should ideally be a soft drop into the kitchen. This neutralizes the receiving team&rsquo;s advantage at the net.</p>
    <h2>4. Not Moving as a Team</h2>
    <p>In doubles, move together like you&rsquo;re connected by a rope. If your partner moves left, you move left. This eliminates gaps that opponents will exploit.</p>
    <h2>5. Hitting to the Power Player</h2>
    <p>Always target the weaker player in doubles. It&rsquo;s not mean &mdash; it&rsquo;s strategy. The best teams in the world do this consistently.</p>
    <h2>6. Skipping the Warm-Up</h2>
    <p>Pickleball involves quick lateral movements. A proper warm-up prevents injuries, especially for older players. Spend 5&ndash;10 minutes warming up before every session.</p>
    <h2>7. Not Taking Lessons</h2>
    <p>A few hours of professional instruction will advance your game faster than months of self-teaching. Our beginner clinics at LevelUP run weekly and cover all the fundamentals.</p>`,
    author: "LevelUP Sports",
    date: "2025-02-20",
    readTime: 5,
    category: "training-tips",
    sport: "Pickleball",
    image: "/images/blog/pickleball-tips.jpg",
  },
];

export const BLOG_CATEGORIES = [
  { slug: "training-tips", label: "Training Tips", color: "#1B3A5C" },
  { slug: "news", label: "News", color: "#1B7D3A" },
  { slug: "athlete-spotlight", label: "Athlete Spotlight", color: "#2A5A8C" },
  { slug: "events", label: "Events", color: "#2BA84A" },
] as const;
