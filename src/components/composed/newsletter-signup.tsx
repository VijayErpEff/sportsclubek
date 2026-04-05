"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { trackNewsletterSignup } from "@/lib/analytics";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        trackNewsletterSignup();
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div aria-live="polite" className="text-center flex items-center justify-center gap-2">
        <CheckCircle className="h-5 w-5 text-secondary" aria-hidden="true" />
        <p className="text-secondary font-semibold">
          Thanks for signing up! We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 h-11 min-h-[44px] px-4 rounded-lg border border-neutral-300 bg-white text-neutral-900 text-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
      />
      <Button type="submit" size="md" className="h-11 min-h-[44px]" disabled={status === "loading"}>
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </Button>
      <div aria-live="polite" className="sr-only">
        {status === "error" && errorMessage}
      </div>
      {status === "error" && (
        <p className="text-error text-sm sm:absolute sm:bottom-0 sm:translate-y-full">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
