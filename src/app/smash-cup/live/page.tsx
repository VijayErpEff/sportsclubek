import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { LiveBoard } from "./live-board";

export const metadata: Metadata = generateSEOMetadata({
  title: "Smash Cup Fall 2026 — Live Standings",
  description:
    "Live pool standings, scores, and playoff bracket for the LevelUP Smash Cup indoor volleyball tournament on October 24, 2026.",
  path: "/smash-cup/live",
  noIndex: true,
});

export default function SmashCupLivePage() {
  return <LiveBoard />;
}
