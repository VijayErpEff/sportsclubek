"use client";

import { useEffect } from "react";

interface Props {
  title: string;
  destination: string;
}

export function RedirectClient({ title, destination }: Props) {
  useEffect(() => {
    // Small delay lets GA4 pageview fire before redirect
    const timer = setTimeout(() => {
      window.location.href = destination;
    }, 300);
    return () => clearTimeout(timer);
  }, [destination]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
          <svg className="w-6 h-6 text-accent animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
        <h1 className="font-display text-xl font-bold text-neutral-900 mb-2">
          {title}
        </h1>
        <p className="text-sm text-neutral-500 mb-6">
          Redirecting you to registration...
        </p>
        <a
          href={destination}
          className="text-sm font-semibold text-accent hover:text-accent-hover underline underline-offset-2"
        >
          Click here if you&apos;re not redirected
        </a>
      </div>
    </main>
  );
}
