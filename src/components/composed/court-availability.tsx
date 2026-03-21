"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { COURTS, type Court } from "@/content/courts";

type CourtStatus = "available" | "in-use" | "reserved";

interface CourtStatusInfo {
  court: Court;
  status: CourtStatus;
}

const STATUS_CONFIG: Record<
  CourtStatus,
  { label: string; dotColor: string; badgeBg: string; badgeText: string }
> = {
  available: {
    label: "Available",
    dotColor: "bg-accent",
    badgeBg: "bg-accent/10",
    badgeText: "text-accent",
  },
  "in-use": {
    label: "In Use",
    dotColor: "bg-error",
    badgeBg: "bg-error/10",
    badgeText: "text-error",
  },
  reserved: {
    label: "Reserved",
    dotColor: "bg-warning",
    badgeBg: "bg-warning/10",
    badgeText: "text-warning",
  },
};

const SPORT_LABELS: Record<string, { letter: string; bg: string }> = {
  baseball: { letter: "B", bg: "bg-primary/10 text-primary" },
  cricket: { letter: "C", bg: "bg-accent/10 text-accent" },
  badminton: { letter: "Bd", bg: "bg-info/10 text-info" },
  pickleball: { letter: "P", bg: "bg-secondary/10 text-secondary" },
};

function getCourtStatus(courtId: string, hour: number): CourtStatus {
  // Deterministic status based on court ID + current hour
  const seed = courtId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const val = (seed * (hour + 1) * 13) % 10;
  if (val < 5) return "available";
  if (val < 8) return "in-use";
  return "reserved";
}

export function CourtAvailability({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours());
  const [lastUpdated, setLastUpdated] = useState("just now");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(new Date().getHours());
      setLastUpdated("just now");
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  const courtStatuses: CourtStatusInfo[] = useMemo(
    () =>
      COURTS.map((court) => ({
        court,
        status: getCourtStatus(court.id, currentHour),
      })),
    [currentHour]
  );

  const availableCount = courtStatuses.filter(
    (c) => c.status === "available"
  ).length;

  return (
    <div className={cn(className)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h3 className="font-display text-subsection text-neutral-900">
            Court Availability &mdash; Right Now
          </h3>
          <p className="text-sm text-neutral-500 mt-1">
            {availableCount} of {COURTS.length} courts available
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-neutral-500">
          <RefreshCw className="h-3 w-3" />
          <span>Updated {lastUpdated}</span>
        </div>
      </div>

      {/* Court grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
        {courtStatuses.map(({ court, status }) => {
          const config = STATUS_CONFIG[status];
          const sportInfo = SPORT_LABELS[court.sport];
          const isAvailable = status === "available";

          const card = (
            <div
              className={cn(
                "relative rounded-xl border p-4 transition-all duration-200",
                isAvailable
                  ? "border-accent/20 bg-white hover:shadow-card-hover hover:border-accent/40 cursor-pointer"
                  : "border-neutral-200 bg-neutral-50/50"
              )}
            >
              {/* Sport icon */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold",
                    sportInfo?.bg ?? "bg-neutral-100 text-neutral-600"
                  )}
                >
                  {sportInfo?.letter ?? "?"}
                </div>

                {/* Status dot */}
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    {isAvailable && !prefersReduced && (
                      <motion.span
                        className={cn(
                          "absolute inline-flex h-full w-full rounded-full opacity-60",
                          config.dotColor
                        )}
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={cn(
                        "relative inline-flex h-2.5 w-2.5 rounded-full",
                        config.dotColor
                      )}
                    />
                  </span>
                </div>
              </div>

              {/* Court name */}
              <h4 className="font-semibold text-sm text-neutral-900 mb-1 leading-tight">
                {court.name}
              </h4>

              {/* Status badge */}
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                  config.badgeBg,
                  config.badgeText
                )}
              >
                {config.label}
              </span>

              {/* Price for available courts */}
              {isAvailable && (
                <p className="text-[11px] text-neutral-500 mt-2 font-mono">
                  ${court.pricePerHour}/hr
                </p>
              )}
            </div>
          );

          if (isAvailable) {
            return (
              <Link
                key={court.id}
                href="/schedule"
                aria-label={`Book ${court.name} - $${court.pricePerHour} per hour`}
              >
                {card}
              </Link>
            );
          }

          return (
            <div key={court.id} aria-label={`${court.name} - ${config.label}`}>
              {card}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-neutral-100">
        {(Object.entries(STATUS_CONFIG) as [CourtStatus, typeof STATUS_CONFIG[CourtStatus]][]).map(
          ([key, config]) => (
            <div key={key} className="flex items-center gap-1.5 text-xs text-neutral-600">
              <span
                className={cn("h-2 w-2 rounded-full", config.dotColor)}
                aria-hidden="true"
              />
              {config.label}
            </div>
          )
        )}
      </div>
    </div>
  );
}
