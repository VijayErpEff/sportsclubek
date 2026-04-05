"use client";

import { useState, useEffect, type FormEvent } from "react";
import { CheckCircle, Loader2, MapPin } from "lucide-react";
import { captureLead } from "@/lib/leads";

const STORAGE_KEY = "lus_tour_requested";

export function TourRequestForm() {
  const [hidden, setHidden] = useState(true);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setHidden(false);
    } catch {
      setHidden(false);
    }
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const data = new FormData(e.currentTarget);
    await captureLead({
      email: (data.get("email") as string)?.trim() || "",
      name: (data.get("name") as string)?.trim() || "",
      source: "tour_request",
      context: `Preferred time: ${(data.get("time") as string) || "Not specified"}`,
    });
    try { localStorage.setItem(STORAGE_KEY, "true"); } catch {}
    setStatus("success");
  };

  if (hidden) return null;

  const inputCn =
    "w-full h-11 px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50";

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
      {status === "success" ? (
        <div className="text-center py-4">
          <CheckCircle className="h-10 w-10 text-accent mx-auto mb-3" />
          <h3 className="text-lg font-bold text-neutral-900 mb-1">Tour Requested!</h3>
          <p className="text-sm text-neutral-500">
            We&apos;ll reach out to confirm your visit. See you soon!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Schedule a Tour</h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              See the facility, meet the coaches, and try a session — all free. Most tours take about 20 minutes.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              name="name"
              type="text"
              required
              placeholder="Your name"
              autoComplete="name"
              className={inputCn}
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Your email"
              autoComplete="email"
              className={inputCn}
            />
            <select
              name="time"
              className={inputCn}
              defaultValue=""
            >
              <option value="" disabled>Preferred visit time</option>
              <option value="Weekday morning">Weekday morning</option>
              <option value="Weekday afternoon">Weekday afternoon</option>
              <option value="Weekday evening">Weekday evening</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full h-11 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Requesting...</>
              ) : (
                "Request a Tour"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
