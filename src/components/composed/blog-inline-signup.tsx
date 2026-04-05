"use client";

import { useState, useEffect, type FormEvent } from "react";
import { CheckCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { captureLead } from "@/lib/leads";

const STORAGE_KEY = "lus_blog_subscribed";

export function BlogInlineSignup({ postSlug }: { postSlug?: string }) {
  const [hidden, setHidden] = useState(true);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setHidden(false);
    } catch {
      setHidden(false);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    await captureLead({
      email: email.trim(),
      source: "blog",
      context: postSlug ? `Read: ${postSlug}` : "Blog subscriber",
    });
    try { localStorage.setItem(STORAGE_KEY, "true"); } catch {}
    setStatus("success");
  };

  if (hidden) return null;

  return (
    <div className="my-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
      {status === "success" ? (
        <div className="flex items-center gap-3 justify-center py-2">
          <CheckCircle className="h-5 w-5 text-accent shrink-0" />
          <p className="text-sm font-semibold text-neutral-900">
            You&apos;re in! We&apos;ll send you the best training tips.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
              <Mail className="h-4 w-4 text-accent" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900">
                Get training tips like this in your inbox
              </h3>
              <p className="text-sm text-neutral-500 mt-0.5">
                Free weekly advice from our coaches — no spam, unsubscribe anytime.
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 h-11 px-4 rounded-lg border border-neutral-200 bg-white text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
            />
            <Button type="submit" size="md" className="h-11" disabled={status === "loading"}>
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
