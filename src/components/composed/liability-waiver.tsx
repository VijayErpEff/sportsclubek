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
            <p className="font-semibold text-neutral-900">Liability Waiver &amp; Photo/Video Consent</p>
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
                  Please Read Carefully
                </p>
                <p>
                  By registering for, checking into, or participating in any activities, programs,
                  or events operated by LevelUp Sports &amp; Athletics Club (Elite Power Sports LLC),
                  the participant (or parent/legal guardian for minors) acknowledges, understands, and
                  agrees to the following:
                </p>

                <div>
                  <p className="font-semibold text-neutral-900">1. Assumption of Risk &amp; Release of Liability</p>
                  <p className="mt-1">
                    Participation in sports and athletic activities involves inherent risks, including
                    but not limited to serious injury, illness, permanent disability, or death.
                  </p>
                  <p className="mt-2">
                    By choosing to participate, I knowingly and voluntarily assume all such risks,
                    including those arising from negligence to the fullest extent permitted by law.
                    I agree to follow all facility rules, instructions, and safety guidelines.
                  </p>
                  <p className="mt-2">
                    I release, waive, and hold harmless LevelUp Sports &amp; Athletics Club, its
                    owners, employees, coaches, volunteers, affiliates, and representatives from any
                    and all claims, liabilities, damages, or causes of action arising from
                    participation in activities or use of the facility.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">2. Photo &amp; Video Consent</p>
                  <p className="mt-1">
                    Participation in LevelUp Sports programs and activities constitutes permission for
                    LevelUp Sports &amp; Athletics Club to capture and use photographs, videos, and
                    audio recordings in which participants may appear.
                  </p>
                  <p className="mt-2">
                    These materials may be used for marketing, promotional, educational, informational,
                    or social media purposes without compensation or further notice.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">3. Parent / Legal Guardian Consent (Minors)</p>
                  <p className="mt-1">
                    If the participant is under 18 years of age, the parent or legal guardian creating
                    or managing the member profile acknowledges and agrees to all terms in this waiver
                    on behalf of the minor participant.
                  </p>
                  <p className="mt-2">
                    The parent or legal guardian confirms they have legal authority to consent and accept
                    responsibility for the minor&rsquo;s participation.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">4. Acknowledgment</p>
                  <p className="mt-1">
                    By creating a member profile, registering for programs, checking in, or participating
                    in any activity at LevelUp Sports &amp; Athletics Club, the participant (or
                    parent/legal guardian for minors) confirms that they have read, understood, and agreed
                    to the terms of this waiver and consent.
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
                      ? "As the parent/legal guardian, I have read and agree to the Liability Waiver & Photo/Video Consent on behalf of the minor participant."
                      : "I have read, understood, and agree to the Liability Waiver & Photo/Video Consent above."}
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
