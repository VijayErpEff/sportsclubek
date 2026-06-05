import { Metadata } from "next";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { LiveBoard } from "./live-board";

export const metadata: Metadata = generateSEOMetadata({
  title: "Smash Cup — Live Standings",
  description:
    "Live pool standings and playoff bracket for the LevelUP Smash Cup indoor volleyball tournament.",
  path: "/smash-cup/live",
  noIndex: true,
});

export default function SmashCupLivePage() {
  return <LiveBoard />;
}
