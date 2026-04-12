"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import {
  FileText, ChevronDown, Check, Loader2, User, Mail, Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "lus_membership_agreed";
const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function MembershipAgreement() {
  const prefersReduced = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) return;

    const data = new FormData(e.currentTarget);
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const phone = (data.get("phone") as string)?.trim();

    if (!name || !email) {
      setErrorMsg("Name and email are required.");
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
          type: "membership_agreement",
          name,
          email,
          phone,
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
        <p className="font-semibold text-neutral-900">Membership Agreement Signed</p>
        <p className="text-sm text-neutral-500 mt-1">
          A copy has been recorded. You&rsquo;re all set.
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-neutral-900">Membership Agreement</p>
            <p className="text-sm text-neutral-500">
              Read and sign before starting your membership
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
              {/* Agreement Text */}
              <div className="max-h-80 overflow-y-auto rounded-lg bg-neutral-50 border border-neutral-100 p-4 text-sm text-neutral-700 leading-relaxed space-y-4 mb-6">
                <p className="font-semibold text-neutral-900">
                  This Membership Agreement (&ldquo;Agreement&rdquo;) is entered into between
                  LevelUP Sports &amp; Athletics Club (&ldquo;Club,&rdquo; &ldquo;we,&rdquo; or
                  &ldquo;our&rdquo;) and the undersigned member (&ldquo;Member&rdquo; or
                  &ldquo;you&rdquo;). By signing below, you agree to the terms and conditions of
                  membership.
                </p>

                <div>
                  <p className="font-semibold text-neutral-900">1. Membership Options &amp; Fees</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Core Membership &ndash; $59.99/month:</strong> Access to one (1) sport of your choice (Cricket, Badminton, Volleyball, or Pickleball). 8 OpenPlay sessions per month.</li>
                    <li><strong>Momentum Membership &ndash; $89.99/month:</strong> Access all sports of your choice. 16 OpenPlay sessions per month.</li>
                    <li><strong>Elite Membership &ndash; $129.99/month:</strong> Unlimited access to all available sports. 24 OpenPlay sessions per month.</li>
                  </ul>
                  <p className="mt-1">Membership fees are billed monthly (or annually if selected). All fees are subject to applicable taxes.</p>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">2. Term &amp; Renewal</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Memberships are month-to-month unless an annual plan is selected.</li>
                    <li>Memberships renew automatically unless canceled in accordance with Section 5.</li>
                    <li>Annual memberships are prepaid and may be subject to early termination fees.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">3. Member Responsibilities</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Members must comply with all posted Club rules and staff instructions.</li>
                    <li>Proper sports attire and non-marking shoes are required on all courts.</li>
                    <li>Members are responsible for their own health and fitness and should consult a physician before engaging in physical activity.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">4. Guest Privileges</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Guest passes may be offered at the Club&rsquo;s discretion.</li>
                    <li>Members are responsible for the conduct of their guests.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">5. Cancellations &amp; Refunds</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li><strong>Monthly Memberships:</strong> Can be canceled anytime with written notice at least 7 days prior to the next billing date.</li>
                    <li><strong>Annual Memberships:</strong> Early termination may result in a cancellation fee equal to one (1) month of dues.</li>
                    <li>Fees already paid are non-refundable, except where required by law.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">6. Assumption of Risk &amp; Waiver</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Participation in sports and fitness activities involves inherent risks, including injury.</li>
                    <li>By signing this Agreement, Member voluntarily assumes all risks and agrees that LevelUP Sports &amp; Athletics Club, its owners, staff, and affiliates are not liable for personal injury, accidents, or loss of property.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">7. Code of Conduct</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Respectful behavior toward staff and other members is required.</li>
                    <li>Harassment, unsportsmanlike conduct, or misuse of equipment may result in suspension or termination of membership without refund.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">8. Club Rights</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>The Club reserves the right to adjust hours, programs, and fees with reasonable notice.</li>
                    <li>The Club may temporarily close for maintenance, events, or unforeseen circumstances.</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">9. Governing Law</p>
                  <p className="mt-1">This Agreement shall be governed by and construed under the laws of the State of Maryland.</p>
                </div>

                <div>
                  <p className="font-semibold text-neutral-900">10. Acknowledgment &amp; Agreement</p>
                  <p className="mt-1">By signing below, Member acknowledges that they have read, understood, and agree to all terms of this Membership Agreement.</p>
                </div>
              </div>

              {/* Consent Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Full Name *"
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

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-neutral-700">
                    I have read, understood, and agree to all terms of the Membership Agreement above.
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
                    "Sign Membership Agreement"
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
