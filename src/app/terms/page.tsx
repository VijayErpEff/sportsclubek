import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";

export const metadata: Metadata = generateSEOMetadata({
  title: "Terms of Service, Waiver & Release",
  description:
    "Terms of Service for LevelUP Sports & Athletics Club in Elkton, MD: assumption of risk, release of liability, indemnification, facility rules, bookings, memberships, tournaments, and dispute resolution.",
  path: "/terms",
});

const LAST_UPDATED = "October 3, 2026";
const ENTITY = "Elite Power Sports LLC";

/** Section ids double as deep links from forms (e.g. /terms#tournaments). */
const TOC = [
  ["agreement", "1. Agreement to These Terms"],
  ["eligibility", "2. Eligibility & Accounts"],
  ["rules", "3. Facility Rules & Code of Conduct"],
  ["risk", "4. Assumption of Risk"],
  ["release", "5. Release, Waiver & Covenant Not to Sue"],
  ["indemnity", "6. Indemnification & Hold Harmless"],
  ["medical", "7. Fitness to Participate & Medical Authorization"],
  ["minors", "8. Minors"],
  ["property", "9. Personal Property, Vehicles & Premises"],
  ["bookings", "10. Bookings, Payments & Cancellations"],
  ["memberships", "11. Memberships"],
  ["programs", "12. Academies, Camps & Programs"],
  ["tournaments", "13. Tournaments, Leagues & Events"],
  ["media", "14. Photo, Video & Media Release"],
  ["thirdparty", "15. The LevelUP App & Third-Party Services"],
  ["website", "16. Website Use & Intellectual Property"],
  ["warranties", "17. Disclaimer of Warranties"],
  ["liability", "18. Limitation of Liability"],
  ["disputes", "19. Dispute Resolution, Arbitration & Class Action Waiver"],
  ["general", "20. General Provisions"],
  ["contact", "21. Contact"],
] as const;

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display text-lg font-bold text-neutral-900 mb-3 scroll-mt-28">
      {children}
    </h2>
  );
}

export default function TermsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <section className="pt-28 md:pt-32 pb-6">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-4">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Terms of Service</li>
            </ol>
          </nav>
          <h1 className="font-display text-page-title text-neutral-900 mb-2">
            Terms of Service, Waiver &amp; Release
          </h1>
          <p className="text-neutral-500 text-sm">Last updated: {LAST_UPDATED}</p>
        </Container>
      </section>

      <Section size="sm">
        <Container className="max-w-3xl">
          <div className="rounded-xl border-2 border-warning/50 bg-warning/5 p-5 mb-10 text-sm text-neutral-800 leading-relaxed">
            <p className="font-bold uppercase tracking-wide text-xs text-neutral-900 mb-2">
              Please read carefully — this document affects your legal rights
            </p>
            <p>
              These Terms contain an <strong>assumption of risk</strong>, a{" "}
              <strong>release of liability that covers our own negligence</strong>, an{" "}
              <strong>indemnification obligation</strong>, a <strong>limitation of liability</strong>,
              and a <strong>mandatory arbitration clause with a class action waiver</strong>. By
              using our facility, website, or app, or by registering for, paying for, or attending any
              program, booking, membership, tournament, league, or event, you accept all of them. If
              you do not agree, do not use our facility or services.
            </p>
          </div>

          <nav aria-label="Contents" className="mb-10 rounded-xl bg-neutral-50 border border-neutral-100 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">Contents</p>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
              {TOC.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-accent hover:text-accent-hover">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose prose-neutral max-w-none space-y-10 text-neutral-700 leading-relaxed text-[15px]">
            <section>
              <H2 id="agreement">1. Agreement to These Terms</H2>
              <p>
                These Terms of Service (&ldquo;Terms&rdquo;) are a binding agreement between you and{" "}
                {ENTITY}, doing business as LevelUP Sports &amp; Athletics Club (&ldquo;LevelUP,&rdquo;
                &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), located at{" "}
                {SITE_CONFIG.address.full}. They govern (a) the website at levelupsports.us and every
                page, form, and link on it; (b) the LevelUP member app, including app.levelupsports.us;
                (c) our facility and parking areas (the &ldquo;Premises&rdquo;); and (d) every
                activity we offer or host, including open play, rentals, lessons, academies, camps,
                clinics, memberships, open houses, tournaments, leagues, and special events
                (together, the &ldquo;Activities&rdquo;).
              </p>
              <p className="mt-3">
                You accept these Terms by doing any of the following: entering the Premises; creating
                an account; making a booking or payment; registering yourself, a team, or a minor for
                any Activity; signing a waiver, membership agreement, or registration form that
                references these Terms; or using the website or app. Where you register a team, you
                accept these Terms for yourself and represent that every person on your roster has
                accepted them or will do so at check-in.
              </p>
              <p className="mt-3">
                &ldquo;<strong>Released Parties</strong>&rdquo; means {ENTITY}, LevelUP Sports &amp;
                Athletics Club, and each of their owners, members, managers, officers, directors,
                employees, coaches, instructors, trainers, officials, umpires, referees, volunteers,
                contractors, agents, sponsors, partner academies (including BRSS Cricket Academy and
                Code Ninjas), landlords, insurers, successors, and assigns.
              </p>
            </section>

            <section>
              <H2 id="eligibility">2. Eligibility &amp; Accounts</H2>
              <ul className="list-disc pl-5 space-y-1">
                <li>You must be at least 18 to create an account, make a booking or payment, register a team, or sign on behalf of a minor. A person under 18 may participate only as provided in Section 8.</li>
                <li>You are responsible for everything done under your account and for keeping your login private. Tell us immediately if you suspect misuse.</li>
                <li>Everything you submit to us must be accurate and complete, including names, ages, contact details, rosters, and medical and emergency information. We may rely on it without verifying it, and you bear the consequences of any inaccuracy.</li>
                <li>We may refuse, suspend, or close any account, booking, membership, or registration, and refuse entry to or remove anyone from the Premises, at any time and for any lawful reason, with or without notice.</li>
              </ul>
            </section>

            <section>
              <H2 id="rules">3. Facility Rules &amp; Code of Conduct</H2>
              <p>You agree to follow every rule posted at the Premises, printed in a program, or given by staff, including:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Check in at the front desk before using any court, cage, pitch, or training area. Use only the area and time you booked.</li>
                <li>Clean, non-marking indoor athletic shoes are required on every playing surface.</li>
                <li>Helmets must be worn in batting cages and cricket nets whenever a ball is being delivered. Protective equipment is your responsibility to wear correctly, whether it is yours or ours.</li>
                <li>Children under 12 must have a parent or guardian on the Premises at all times. We do not provide supervision or child care outside of a program&rsquo;s scheduled instruction time.</li>
                <li>No alcohol, drugs, tobacco, vaping, weapons, glass, or outside food in playing areas. Anyone who appears impaired will be removed.</li>
                <li>Equipment we lend must be used as intended and returned. You are responsible for loss of or damage to it, and for any damage you, your guests, or your roster cause to the Premises.</li>
                <li>No abusive, threatening, discriminatory, or unsportsmanlike conduct toward anyone. Officials&rsquo; and staff decisions are final.</li>
                <li>No commercial coaching, instruction, or filming on the Premises without our written permission.</li>
              </ul>
              <p className="mt-3">
                A violation may result in immediate removal, forfeiture of any booking, fee, deposit,
                prize, or remaining membership or program time <strong>without refund</strong>, and a
                permanent ban. You are responsible for the conduct of your guests, your roster, and
                anyone you bring to the Premises.
              </p>
            </section>

            <section>
              <H2 id="risk">4. Assumption of Risk</H2>
              <p>
                <strong>Sports are dangerous.</strong> You understand that the Activities involve
                inherent and other risks that cannot be eliminated regardless of the care taken,
                including but not limited to: sprains, strains, fractures, dislocations, concussions
                and other head, neck, and spinal injuries; cuts, contusions, and dental injuries;
                being struck by a ball, bat, racket, paddle, net post, or another person; collisions
                with other participants, walls, netting, cages, poles, machines, or equipment; falls
                and slips on any surface; injuries from pitching and bowling machines, batting cages,
                and cricket nets; heat illness, dehydration, exhaustion, cardiac events, and other
                illness; exposure to communicable disease, including COVID-19 and influenza; injuries
                caused by the condition of the Premises, equipment, or playing surfaces; injuries
                caused by the acts, omissions, or negligence of other participants, spectators, or the
                Released Parties; injuries in parking areas and while traveling to or from the
                Premises; and in all cases, <strong>paralysis, permanent disability, and death</strong>.
              </p>
              <p className="mt-3">
                You have inspected, or had the opportunity to inspect, the Premises and equipment and
                accept them as they are. You are participating voluntarily, with full knowledge of
                these risks, and{" "}
                <strong>
                  you expressly and knowingly assume all risk of injury, illness, death, and property
                  loss or damage arising from the Activities or your presence on the Premises, whether
                  known or unknown, foreseeable or unforeseeable, and whether caused by the negligence
                  of the Released Parties or otherwise.
                </strong>
              </p>
            </section>

            <section>
              <H2 id="release">5. Release, Waiver &amp; Covenant Not to Sue</H2>
              <p className="uppercase text-[13px] tracking-wide font-semibold text-neutral-900">
                To the fullest extent permitted by the laws of the State of Maryland, you, for
                yourself and for your heirs, executors, administrators, personal representatives,
                spouse, children, and assigns, hereby release, waive, discharge, and covenant not to
                sue the Released Parties from and for any and all claims, demands, losses, damages,
                costs, expenses, causes of action, and liabilities of every kind, whether in contract,
                tort, or otherwise, including claims for personal injury, illness, wrongful death,
                emotional distress, and loss of or damage to property, that arise out of or relate in
                any way to the Activities, the Premises, the website, the app, or these Terms,
                <strong> including claims caused by the ordinary negligence of any Released Party</strong>,
                the condition of the Premises or equipment, or the acts or omissions of other
                participants or third parties.
              </p>
              <p className="mt-3">
                This release does not apply to the extent a claim cannot lawfully be released, such as
                a claim for gross negligence or intentional misconduct. It applies to every visit and
                every Activity, now and in the future, without the need to sign again. If you bring a
                claim released here, you will pay the Released Parties&rsquo; attorney&rsquo;s fees and
                costs of defending it.
              </p>
            </section>

            <section>
              <H2 id="indemnity">6. Indemnification &amp; Hold Harmless</H2>
              <p>
                <strong>
                  You agree to defend, indemnify, and hold harmless the Released Parties from and
                  against any and all claims, suits, demands, losses, damages, judgments, settlements,
                  fines, costs, and expenses (including reasonable attorney&rsquo;s fees and expert
                  fees)
                </strong>{" "}
                that arise out of or relate to: (a) your participation in or attendance at any
                Activity or presence on the Premises; (b) any injury, illness, death, or property
                loss or damage suffered by you, a minor you are responsible for, your guest, or any
                member of a team you registered; (c) injury, loss, or damage you, your minor, your
                guest, or your roster cause to any other person or to the Premises or equipment; (d)
                your breach of these Terms or of any rule; (e) any inaccurate information you give
                us; and (f) any claim brought by or on behalf of a person you signed for, registered,
                or brought to the Premises. This obligation applies whether or not the claim alleges
                negligence by a Released Party, to the fullest extent permitted by law, and survives
                the end of your membership, program, or event.
              </p>
            </section>

            <section>
              <H2 id="medical">7. Fitness to Participate &amp; Medical Authorization</H2>
              <ul className="list-disc pl-5 space-y-1">
                <li>You represent that you (or the minor you sign for) are in good health, physically fit, and have no condition, injury, or medication that makes participation unsafe. Consult a physician before starting any athletic activity. We do not screen participants and give no medical advice.</li>
                <li>You will stop participating and tell staff immediately if you feel unwell or are injured. We may stop you from participating if we believe it is unsafe, without refund.</li>
                <li><strong>You authorize the Released Parties to obtain emergency first aid, ambulance transport, and medical or surgical treatment for you or your minor if, in their judgment, it is needed, and you agree to pay every cost of such care.</strong> We are not responsible for the quality, timing, or outcome of any care, and we make no promise that first-aid-trained staff, an AED, or any medical equipment will be available at any particular time.</li>
                <li>You are responsible for carrying your own health, accident, and disability insurance. The Released Parties do not insure participants.</li>
                <li>Concussion notice: a participant showing signs of a concussion will be removed from play and may not return the same day. Return to play after a suspected concussion requires written medical clearance.</li>
              </ul>
            </section>

            <section>
              <H2 id="minors">8. Minors</H2>
              <ul className="list-disc pl-5 space-y-1">
                <li>A participant under 18 may use the Premises or join an Activity only if a parent or legal guardian has accepted these Terms and signed the waiver on the minor&rsquo;s behalf. By doing so, the parent or guardian represents that they have legal authority to do so.</li>
                <li>The parent or guardian makes every assumption of risk, release, waiver, indemnity, and medical authorization in these Terms both personally and on behalf of the minor, to the fullest extent permitted by Maryland law, and agrees to indemnify the Released Parties against any claim brought by or for the minor, including any claim the minor brings after reaching 18.</li>
                <li>Parents and guardians are solely responsible for a minor&rsquo;s supervision outside scheduled instruction, for drop-off and pick-up on time, and for the minor&rsquo;s conduct and any damage they cause.</li>
                <li>Where an Activity has a minimum age (for example, 16+ for an adult tournament), the parent or guardian and the team captain each represent that the minor meets it. We may require photo ID and may disqualify a team or participant without refund if it does not.</li>
              </ul>
            </section>

            <section>
              <H2 id="property">9. Personal Property, Vehicles &amp; Premises</H2>
              <p>
                <strong>We are not responsible for lost, stolen, or damaged personal property</strong>,
                including bags, equipment, phones, wallets, jewelry, and anything left in cubbies,
                lockers, bleachers, courts, or vehicles. Parking is at your own risk; we are not
                responsible for damage to or theft of or from any vehicle. Unclaimed items are
                discarded or donated after 14 days. You use the Premises, playing surfaces, nets,
                cages, machines, and equipment &ldquo;as is&rdquo; and at your own risk.
              </p>
            </section>

            <section>
              <H2 id="bookings">10. Bookings, Payments &amp; Cancellations</H2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All bookings, memberships, registrations, and payments are made in the LevelUP app (iOS, Android, and app.levelupsports.us) or at the front desk. Prices are in U.S. dollars and may change at any time; the price shown at checkout is the price you pay. Applicable taxes and fees are added at checkout.</li>
                <li>A booking is confirmed only when payment clears. Unpaid holds may be released without notice.</li>
                <li>Court, cage, net, and pitch rentals may be cancelled in the app up to 24 hours before the start time for a credit to your account. Cancellations inside 24 hours and no-shows forfeit the full fee. Arriving late does not extend your slot.</li>
                <li>Open play, drop-in, and promotional sessions (for example, $5 Pickleball Tuesdays) are non-refundable and non-transferable and may be capped, changed, or withdrawn at any time.</li>
                <li>Except where these Terms or applicable law say otherwise, <strong>all payments are final and non-refundable</strong>. Any refund or credit we choose to give is at our sole discretion and is not a waiver of this rule.</li>
                <li>If you dispute a charge with your bank or card issuer that you agreed to under these Terms, we may suspend your account, cancel your bookings, registrations, and membership, and recover the amount plus any chargeback fees and collection costs.</li>
                <li>We may close all or part of the Premises or cancel any session for maintenance, weather, utility failure, safety, staffing, low enrollment, private events, or any reason beyond our control. Our only obligation in that case is a credit or reschedule for the affected paid session; we are not liable for travel, lodging, or any other cost.</li>
              </ul>
            </section>

            <section>
              <H2 id="memberships">11. Memberships</H2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Memberships renew automatically each billing period until cancelled. Fees are charged to the payment method on file on the billing date. A failed payment suspends access until it is paid and may incur a late fee.</li>
                <li>Monthly memberships may be cancelled with written notice at least 7 days before the next billing date; the cancellation takes effect at the end of the paid period. Annual memberships are prepaid and non-refundable; early termination may incur a fee equal to one month of dues.</li>
                <li>Memberships may be frozen for up to 2 months per calendar year with 7 days&rsquo; written notice. Frozen time is not refunded.</li>
                <li>Membership benefits are personal to the named member and cannot be shared, transferred, or resold. Unused sessions do not roll over and have no cash value.</li>
                <li>We may change membership pricing, benefits, hours, and included sports with 30 days&rsquo; notice. Your continued membership after the change is acceptance of it.</li>
                <li>The Membership Agreement you sign in the app or at the front desk is incorporated into these Terms. If it conflicts with these Terms, these Terms control.</li>
              </ul>
            </section>

            <section>
              <H2 id="programs">12. Academies, Camps &amp; Programs</H2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Academy, camp, clinic, and program fees are due in full at registration unless a payment plan is offered in writing. Fees are non-refundable once the program begins. A cancellation received in writing at least 14 days before the first session receives a credit, less a $25 administrative fee.</li>
                <li>Missed sessions are not refunded, credited, or made up unless we cancelled the session.</li>
                <li>We may change coaches, groupings, curriculum, times, and locations, merge or cancel a group for low enrollment, and remove a participant for conduct or safety reasons without refund.</li>
                <li>We make no promise about any participant&rsquo;s improvement, playing time, team selection, scholarships, or competitive results.</li>
                <li>Camp participants must be signed in and out by an authorized adult. We may release a child only to the adults you list. Late pick-up is charged at $1 per minute.</li>
              </ul>
            </section>

            <section>
              <H2 id="tournaments">13. Tournaments, Leagues &amp; Events</H2>
              <p>These rules apply to every tournament, league, league night, kick-off, open house, and special event we host, including the LevelUP Smash Cup and the LevelUP Premier Cricket League (LPCL), in addition to any event-specific rules we publish.</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li><strong>Captains.</strong> The person who registers a team is its captain and is responsible for the team: for the accuracy of the roster, for every player&rsquo;s eligibility and age, for ensuring every player accepts these Terms and signs the waiver before playing, for the team&rsquo;s conduct and that of its supporters, and for any damage or claim arising from the team. The captain personally indemnifies the Released Parties for all of these.</li>
                <li><strong>Entry fees.</strong> The entry fee is per team and is due by the published deadline. A team is not entered until its fee is paid. <strong>Entry fees are non-refundable</strong> after the registration deadline, and non-refundable at any time once a schedule or bracket has been published. Before the deadline, a written withdrawal receives a credit less a $25 administrative fee. If we cancel an event, your sole remedy is a refund of the entry fee.</li>
                <li><strong>Eligibility.</strong> A player may be on one roster per event. Players must meet the published age minimum on event day and may be required to show photo ID. A team that plays an ineligible, unlisted, or unsigned player forfeits every match that player appeared in and may be removed without refund.</li>
                <li><strong>Format &amp; schedule.</strong> We decide the format, pools, seeding, bracket, match times, courts, officials, rules, and tiebreakers, and may change any of them before or during the event, including for the number of teams entered, weather, injuries, or time. A team that is not ready to play at its scheduled time forfeits that match. Published times are estimates.</li>
                <li><strong>Officials&rsquo; decisions are final.</strong> Scores, rulings, standings, and bracket results as recorded by our officials or tournament director are final and not subject to appeal, review, or legal challenge. Live scoreboards and standings on our website are provided for convenience only and may contain errors; the official record kept by the tournament director controls.</li>
                <li><strong>Prizes.</strong> Advertised cash prizes and trophies are awarded only if the event is completed and the minimum number of teams required for the published prize structure enters; otherwise we may reduce prizes proportionally or convert them to facility credit. Prizes are paid to the registered captain for the team, who is responsible for sharing them; we take no part in any dispute among teammates. Winners may be required to complete tax forms (such as IRS Form W-9) before a prize is paid, and are responsible for all taxes. Prizes are forfeited by any team disqualified for a rule or conduct violation.</li>
                <li><strong>Conduct.</strong> Abuse of officials, staff, opponents, or spectators; fighting; equipment abuse; or intoxication results in immediate ejection of the player, and at our discretion the team, without refund and with forfeiture of any prize.</li>
                <li><strong>Spectators</strong> enter the Premises subject to these Terms, including Sections 4, 5, 6, and 9. Captains and players are responsible for the spectators they bring.</li>
                <li><strong>Payment processing.</strong> Card payments are processed by Stripe through the LevelUP app. We never see or store full card numbers. Stripe&rsquo;s terms and privacy policy apply to the payment itself.</li>
              </ul>
            </section>

            <section>
              <H2 id="media">14. Photo, Video &amp; Media Release</H2>
              <p>
                You grant the Released Parties the irrevocable, perpetual, worldwide, royalty-free
                right to photograph, film, record, and live-stream you (and any minor you sign for)
                at the Premises and Activities, and to use, edit, reproduce, publish, and distribute
                your name, image, likeness, voice, team name, and performance in any media now known
                or later developed, for promotional, marketing, educational, scoreboard, broadcast,
                social media, and commercial purposes, without compensation, notice, or approval. You
                waive any right to inspect or approve the finished material and release the Released
                Parties from any claim arising from its use, including claims of defamation, invasion
                of privacy, or right of publicity. To opt out of future marketing use, write to{" "}
                {SITE_CONFIG.email}; we will make reasonable efforts going forward but cannot recall
                material already published.
              </p>
            </section>

            <section>
              <H2 id="thirdparty">15. The LevelUP App &amp; Third-Party Services</H2>
              <ul className="list-disc pl-5 space-y-1">
                <li>The LevelUP app and its web version are provided &ldquo;as is.&rdquo; We do not guarantee they will be available, error-free, or uninterrupted. We are not liable for any missed booking, registration, payment, or deadline caused by an outage, bug, device, browser, network, store, or email delivery problem, or by your failure to check your account or email.</li>
                <li>Payments are processed by Stripe and the Apple App Store or Google Play where applicable. App distribution is subject to each store&rsquo;s terms. We are not responsible for the acts, omissions, or policies of any third-party service, including Stripe, Google, Apple, Vercel, Netlify, Azure, or any mapping, analytics, or email provider.</li>
                <li>Links to other websites are provided for convenience only. We do not endorse and are not responsible for their content, products, services, or privacy practices.</li>
              </ul>
            </section>

            <section>
              <H2 id="website">16. Website Use &amp; Intellectual Property</H2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All content on the website and app — text, photographs, video, logos, the LevelUP name and marks, program names (including &ldquo;Smash Cup&rdquo; and &ldquo;LPCL&rdquo;), designs, and code — belongs to {ENTITY} or its licensors and may not be copied, scraped, framed, or used without our written permission.</li>
                <li>You may not use the website or app to send spam or malware, probe or interfere with its security, submit false registrations, impersonate anyone, harvest data, or do anything unlawful. We may block any user and refer violations to law enforcement.</li>
                <li>Anything you submit (reviews, survey answers, photos, messages) may be used by us for any purpose without compensation. You represent that you have the right to submit it and that it is accurate and lawful.</li>
                <li>Schedules, prices, hours, coach assignments, prize structures, and program details on the website are subject to change without notice and may contain errors. The information in the app at the time of your booking, and the printed rules at an event, control over the website.</li>
              </ul>
            </section>

            <section>
              <H2 id="warranties">17. Disclaimer of Warranties</H2>
              <p className="uppercase text-[13px] tracking-wide font-semibold text-neutral-900">
                The Premises, equipment, Activities, website, app, and all services are provided
                &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without any warranty of any kind,
                express or implied, including any warranty of merchantability, fitness for a
                particular purpose, safety, non-infringement, accuracy, or that any Activity will be
                supervised, officiated, staffed, or equipped in any particular way. No oral or written
                statement by any staff member creates a warranty. Some jurisdictions do not allow the
                exclusion of implied warranties; in that case the exclusion applies to the fullest
                extent permitted.
              </p>
            </section>

            <section>
              <H2 id="liability">18. Limitation of Liability</H2>
              <p className="uppercase text-[13px] tracking-wide font-semibold text-neutral-900">
                To the fullest extent permitted by law, in no event will the Released Parties be
                liable to you or anyone claiming through you for any indirect, incidental, special,
                consequential, exemplary, or punitive damages, or for lost profits, lost wages, lost
                data, loss of use, or the cost of substitute services, arising out of or relating to
                the Activities, the Premises, the website, the app, or these Terms, however caused and
                under any theory of liability, even if advised of the possibility of such damages.
              </p>
              <p className="uppercase text-[13px] tracking-wide font-semibold text-neutral-900 mt-3">
                To the fullest extent permitted by law, the total aggregate liability of the Released
                Parties for all claims arising out of or relating to the Activities, the Premises, the
                website, the app, or these Terms will not exceed the greater of (a) the amount you
                paid us for the specific booking, registration, program, or membership period that
                gave rise to the claim, or (b) one hundred U.S. dollars ($100).
              </p>
              <p className="mt-3">
                These limits apply together with, and do not narrow, the release in Section 5. They
                do not apply to liability that cannot be limited under applicable law. You agree
                that the pricing of our services reflects this allocation of risk and that the
                Released Parties would not offer the Activities without it.
              </p>
            </section>

            <section>
              <H2 id="disputes">19. Dispute Resolution, Arbitration &amp; Class Action Waiver</H2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Talk to us first.</strong> Before starting any proceeding, you must send a written description of your claim to {SITE_CONFIG.email} or by mail to {SITE_CONFIG.address.full}, and give us 60 days to resolve it informally.</li>
                <li><strong>Binding arbitration.</strong> <span className="uppercase text-[13px] tracking-wide font-semibold text-neutral-900">Any dispute, claim, or controversy arising out of or relating to these Terms, the Activities, the Premises, the website, or the app, including any question about the scope or enforceability of this clause, that is not resolved informally will be settled by binding individual arbitration administered by the American Arbitration Association under its Consumer Arbitration Rules, before a single arbitrator, in Cecil County, Maryland, or by video, under the Federal Arbitration Act.</span> The arbitrator may award the same relief a court could award to the individual claimant, and judgment on the award may be entered in any court with jurisdiction. Either party may instead bring an individual claim in small-claims court if it qualifies.</li>
                <li><strong>Class action and jury waiver.</strong> <span className="uppercase text-[13px] tracking-wide font-semibold text-neutral-900">You and we each waive the right to a jury trial and the right to bring or participate in any class, collective, consolidated, or representative action. Claims may be brought only in an individual capacity.</span> If this class waiver is found unenforceable for a particular claim, that claim must proceed in court, not arbitration, and only after all arbitrable claims are decided.</li>
                <li><strong>Opt-out.</strong> You may opt out of arbitration by emailing {SITE_CONFIG.email} with your name and the words &ldquo;arbitration opt-out&rdquo; within 30 days of first accepting these Terms. Opting out does not affect any other part of these Terms.</li>
                <li><strong>Time limit.</strong> Any claim must be filed within one (1) year after it arises, or it is permanently barred, to the fullest extent permitted by law.</li>
                <li><strong>Governing law and venue.</strong> These Terms are governed by the laws of the State of Maryland and applicable federal law, without regard to conflict-of-law rules. For any matter not subject to arbitration, you consent to the exclusive jurisdiction and venue of the state and federal courts located in or serving Cecil County, Maryland.</li>
                <li><strong>Attorney&rsquo;s fees.</strong> In any proceeding to enforce these Terms, the release, or the indemnity, the prevailing party is entitled to recover its reasonable attorney&rsquo;s fees and costs.</li>
              </ul>
            </section>

            <section>
              <H2 id="general">20. General Provisions</H2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Entire agreement.</strong> These Terms, together with the waiver, membership agreement, registration forms, event rules, and Privacy Policy, are the entire agreement between you and us about their subject and replace any earlier understanding. Nothing said by any staff member changes them.</li>
                <li><strong>Severability.</strong> If any provision is held invalid or unenforceable, it will be enforced to the maximum extent permitted and the rest of these Terms remain in full effect. The release, indemnity, and limitation of liability are each intended to be as broad as Maryland law allows.</li>
                <li><strong>No waiver.</strong> Our failure to enforce any provision is not a waiver of it or of our right to enforce it later.</li>
                <li><strong>Assignment.</strong> You may not assign these Terms. We may assign them to any successor or affiliate.</li>
                <li><strong>Force majeure.</strong> We are not liable for any failure or delay caused by events beyond our reasonable control, including weather, fire, flood, utility or internet failure, epidemic, government order, labor shortage, or supplier failure.</li>
                <li><strong>Electronic acceptance.</strong> Clicking &ldquo;I agree,&rdquo; ticking a box, typing your name, signing on a screen, paying, or entering the Premises has the same legal effect as a handwritten signature. We may keep electronic records of your acceptance and rely on them.</li>
                <li><strong>Survival.</strong> Sections 4 through 9 and 13 through 20 survive the end of any membership, program, event, or account.</li>
                <li><strong>Changes.</strong> We may change these Terms at any time by posting the new version with a new &ldquo;Last updated&rdquo; date. Changes apply to all use after posting. Material changes to an active membership or paid program will be noticed by email or in the app at least 30 days in advance.</li>
                <li><strong>Headings and plain-language summaries</strong> are for convenience only and do not limit the text.</li>
              </ul>
            </section>

            <section>
              <H2 id="contact">21. Contact</H2>
              <ul className="list-none pl-0 space-y-1 mt-2">
                <li><strong>{ENTITY} d/b/a {SITE_CONFIG.name}</strong></li>
                <li>{SITE_CONFIG.address.full}</li>
                <li>Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-accent hover:text-accent-hover">{SITE_CONFIG.email}</a></li>
                <li>Phone: <a href={`tel:${SITE_CONFIG.phone.replace(/[^+\d]/g, "")}`} className="text-accent hover:text-accent-hover">{SITE_CONFIG.phone}</a></li>
              </ul>
              <p className="mt-4 text-sm text-neutral-500">
                See also our{" "}
                <Link href="/privacy" className="text-accent hover:text-accent-hover">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
