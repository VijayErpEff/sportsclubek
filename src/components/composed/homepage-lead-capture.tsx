"use client";

import { useState, useEffect, type FormEvent } from "react";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SPORTS } from "@/lib/constants/site";
import { captureLead } from "@/lib/leads";

const STORAGE_KEY = "lus_homepage_subscribed";

export function HomepageLeadCapture() {
  const [subscribed, setSubscribed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (localStorage.getItem(STORAGE_KEY)) setSubscribed(true);
    } catch {}
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    const sport = (data.get("sport") as string) || "";
    const sportName = SPORTS.find((s) => s.slug === sport)?.name || sport;
    await captureLead({
      email: (data.get("email") as string)?.trim() || "",
      name: (data.get("name") as string)?.trim() || "",
      source: "sport_preference",
      context: sportName ? `Interested in: ${sportName}` : "General interest",
    });
    try { localStorage.setItem(STORAGE_KEY, "true"); } catch {}
    setStatus("success");
    setSubscribed(true);
  };

  if (!mounted) return null;

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-neutral-50 to-white">
      <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        {subscribed || status === "success" ? (
          <div className="flex items-center justify-center gap-3 py-4">
            <CheckCircle className="h-5 w-5 text-accent shrink-0" />
            <p className="text-sm font-semibold text-neutral-700">
              You&apos;re in! We&apos;ll keep you posted on sessions and offers.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* Copy */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">
                Don&apos;t Miss Out
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight mb-3">
                Stay in the Game
              </h2>
              <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-md">
                Get session times, open play alerts, and exclusive offers for your sport. No spam — just the stuff that matters.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  autoComplete="name"
                  className="h-12 px-4 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  autoComplete="email"
                  className="h-12 px-4 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
                />
              </div>
              <div className="flex gap-3">
                <select
                  name="sport"
                  className="flex-1 h-12 px-4 rounded-xl border border-neutral-200 bg-white text-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
                  defaultValue=""
                >
                  <option value="" disabled>Pick your sport</option>
                  {SPORTS.map((sport) => (
                    <option key={sport.slug} value={sport.slug}>
                      {sport.name}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={cn(
                    "h-12 px-6 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shrink-0",
                    "bg-accent text-white hover:bg-accent-hover disabled:opacity-60"
                  )}
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Let&apos;s Go
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
