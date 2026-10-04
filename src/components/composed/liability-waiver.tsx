"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import {
  ShieldCheck, ChevronDown, Check, Loader2, User, Mail, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "lus_waiver_signed";
const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function LiabilityWaiver() {
  const prefersReduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) return;

    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();
    const guardianName = (data.get("guardianName") as string)?.trim();

    if (!name || !email) {
      setErrorMsg("Name and email are required.");
      setStatus("error");
      return;
    }
    if (isMinor && !guardianName) {
      setErrorMsg("Parent/guardian name is required for minors.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "liability_waiver",
          waiverVersion: "2026-10-03",
          name,
          email,
          phone,
          isMinor,
          guardianName: isMinor ? guardianName : "",
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit");
      }

      localStorage.setItem(CONSENT_KEY, "true");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <Check className="h-6 w-6 text-accent" />
        </div>
        <p className="font-semibold text-neutral-900">Liability Waiver Signed</p>
        <p className="text-sm text-neutral-500 mt-1">
          Your consent has been recorded. You&rsquo;re ready to play.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden">
      {/* Header / Toggle */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 md:p-6 text-left hover:bg-neutral-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 shrink-0">
            <ShieldCheck className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Waiver, Release of Liability, Indemnity &amp; Media Consent</p>
            <p className="text-sm text-neutral-500">
              Required for all participants before first session
            </p>
          </div>
        </div>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-neutral-400 transition-transform duration-300 shrink-0",
            expanded && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: APPLE_EASE }}
            className="overflow-hidden"
          >
            <div className="border-t border-neutral-100 px-5 md:px-6 py-5">
              {/* Waiver Text */}
              <div className="max-h-80 overflow-y-auto rounded-lg bg-neutral-50 border border-neutral-100 p-4 text-sm text-neutral-700 leading-relaxed space-y-4 mb-6">
                <p className="font-semibold text-neutral-900 uppercase text-xs tracking-wide">
                  Please Read Carefully — This Is a Release of Liability and Waiver of Legal Rights
                </p>
                <p>
                  In consideration of being allowed to enter the premises of, and participate in any
                  activity, program, booking, membership, tournament, league, or event operated or hosted
                  by, LevelUP Sports &amp; Athletics Club (Elite Power Sports LLC) and its owners,
                  members, managers, employees, coaches, instructors, officials, volunteers, contractors,
                  agents, sponsors, partner academies, landlords, insurers, successors, and assigns
                  (together, the &ldquo;Released Parties&rdquo;), I, the participant &mdash; or, if the
                  participant is under 18, I, the parent or legal guardian, for myself and on behalf of
                  the minor &mdash; acknowledge and agree to all of the following. This waiver is
                  incorporated into and governed by the LevelUP{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">
                    Terms of Service
                  </a>
                  , which I have read.
                </p>
                <div>
                  <p className="font-semibold text-neutral-900">1. Assumption of Risk</p>
                  <p className="mt-1">
                    Sports and athletic activities are dangerous. They involve inherent and other risks
                    that cannot be eliminated no matter how much care is taken, including sprains,
                    strains, fractures, concussions and other head, neck, and spinal injuries; being
                    struck by a ball, bat, racket, paddle, or another person; collisions with people,
                    walls, nets, cages, poles, machines, and equipment; slips and falls; injuries from
                    pitching and bowling machines; heat illness, cardiac events, and other illness;
                    exposure to communicable disease; injuries caused by the condition of the premises or
                    equipment; injuries caused by the acts, omissions, or negligence of other participants
                    or of the Released Parties; and, in all cases, <strong>permanent disability,
                    paralysis, and death</strong>.
                  </p>
                  <p className="mt-2">
                    I am participating voluntarily, with full knowledge of these risks, and I{" "}
                    <strong>
                      expressly and knowingly assume all risk of injury, illness, death, and property
                      loss or damage, whether known or unknown, foreseeable or not, and whether caused by
                      the negligence of the Released Parties or otherwise.
                    </strong>{" "}
                    I accept the premises and equipment as they are.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">2. Release, Waiver &amp; Covenant Not to Sue</p>
                  <p className="mt-1 uppercase text-[12px] tracking-wide font-semibold text-neutral-900">
                    To the fullest extent permitted by Maryland law, I release, waive, discharge, and
                    covenant not to sue the Released Parties from and for any and all claims, demands,
                    losses, damages, costs, and causes of action of every kind, including claims for
                    personal injury, illness, wrongful death, and loss of or damage to property, arising
                    out of or related to my (or the minor&rsquo;s) presence on the premises or
                    participation in any activity, including claims caused by the ordinary negligence of
                    any Released Party.
                  </p>
                  <p className="mt-2">
                    This release binds my heirs, executors, personal representatives, spouse, and
                    assigns. It covers every visit and activity, now and in the future, without the
                    need to sign again. It does not release claims that cannot lawfully be released,
                    such as gross negligence or intentional misconduct.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">3. Indemnification &amp; Hold Harmless</p>
                  <p className="mt-1">
                    <strong>
                      I agree to defend, indemnify, and hold harmless the Released Parties from any claim,
                      loss, damage, judgment, or expense, including attorney&rsquo;s fees,
                    </strong>{" "}
                    arising from my (or the minor&rsquo;s, or my guests&rsquo;) participation, presence,
                    or conduct; from any injury, loss, or damage I or they suffer or cause; from any
                    breach of the rules or Terms; or from any claim brought by or on behalf of anyone I
                    sign for or bring to the premises &mdash; including any claim a minor brings after
                    turning 18.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">4. Fitness &amp; Medical Authorization</p>
                  <p className="mt-1">
                    I represent that I (or the minor) am in good health, physically able to participate,
                    and have no condition that makes participation unsafe, and that I have consulted or
                    had the opportunity to consult a physician. <strong>I authorize the Released Parties
                    to obtain emergency first aid, ambulance transport, and medical treatment that they
                    judge necessary, and I will pay all costs of that care.</strong> I understand that
                    the Released Parties do not insure participants, give no medical advice, and make no
                    promise that trained staff or medical equipment will be available at any particular
                    time. I will stop and tell staff immediately if I am injured or unwell.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">5. Rules, Conduct &amp; Property</p>
                  <p className="mt-1">
                    I will follow every posted rule and staff instruction. I understand I may be removed
                    without refund for unsafe or unsportsmanlike conduct, and that I am responsible for
                    any damage I, the minor, or my guests cause. The Released Parties are not responsible
                    for lost, stolen, or damaged personal property or vehicles.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">6. Photo, Video &amp; Media Release</p>
                  <p className="mt-1">
                    I grant the Released Parties the irrevocable, perpetual, royalty-free right to
                    photograph, film, record, and live-stream me (or the minor) and to use my (or the
                    minor&rsquo;s) name, image, likeness, voice, and performance in any media for
                    promotional, marketing, scoreboard, broadcast, social-media, and commercial
                    purposes without compensation, notice, or approval, and I release the Released
                    Parties from any claim arising from that use.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">7. Parent / Legal Guardian (Minors)</p>
                  <p className="mt-1">
                    If the participant is under 18, I am their parent or legal guardian with full
                    authority to sign for them. I make every assumption of risk, release, indemnity, and
                    authorization above both personally and on the minor&rsquo;s behalf, to the fullest
                    extent Maryland law allows. I am solely responsible for the minor&rsquo;s supervision
                    outside scheduled instruction and for their conduct.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-neutral-900">8. Disputes, Severability &amp; Acknowledgment</p>
                  <p className="mt-1">
                    Any dispute is subject to the binding individual arbitration, class-action waiver,
                    one-year claim limit, Maryland governing law, and Cecil County venue in the Terms of
                    Service. If any part of this waiver is held unenforceable, the rest remains in full
                    effect and the unenforceable part is enforced to the maximum extent permitted.
                  </p>
                  <p className="mt-2">
                    <strong>
                      I have read this entire document, I understand that I am giving up substantial
                      legal rights, including the right to sue, and I am signing it voluntarily. Ticking
                      the box and submitting this form is my electronic signature and has the same effect
                      as a handwritten signature.
                    </strong>
                  </p>
                </div>
              </div>

              {/* Consent Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Minor toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isMinor}
                    onChange={(e) => setIsMinor(e.target.checked)}
                    className="h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-neutral-700">
                    Participant is under 18 years old
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder={isMinor ? "Participant's Full Name *" : "Full Name *"}
                      className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="Email *"
                      className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone (optional)"
                    className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                {/* Guardian field for minors */}
                <AnimatePresence>
                  {isMinor && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: APPLE_EASE }}
                      className="overflow-hidden"
                    >
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <input
                          name="guardianName"
                          type="text"
                          required={isMinor}
                          placeholder="Parent / Legal Guardian Full Name *"
                          className="w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-3 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-neutral-700">
                    {isMinor
                      ? "As the parent/legal guardian, I have read the entire Waiver, Release, Indemnity & Media Consent above and the Terms of Service, I understand I am giving up legal rights including the right to sue, and I agree to all of it for myself and on behalf of the minor participant."
                      : "I have read the entire Waiver, Release, Indemnity & Media Consent above and the Terms of Service, I understand I am giving up legal rights including the right to sue, and I agree to all of it."}
                  </span>
                </label>

                {status === "error" && errorMsg && (
                  <p className="text-sm text-error">{errorMsg}</p>
                )}

                <Button
                  type="submit"
                  disabled={!agreed || status === "loading"}
                  className="w-full"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Submitting…
                    </>
                  ) : (
                    "Sign Waiver"
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
