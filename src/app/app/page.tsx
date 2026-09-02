import { Metadata } from "next";
import { Suspense } from "react";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { APP } from "@/lib/constants/app";
import { AppLauncher } from "./app-launcher";

export const metadata: Metadata = generateSEOMetadata({
  title: `Get the ${APP.name} App`,
  description:
    "Book courts, cages, and sessions, manage your membership, and check schedules in the LevelUP Sports & Athletics app for iPhone and Android.",
  path: "/app",
  // Interstitial: it exists to hand visitors off, so keep it out of the index.
  noIndex: true,
});

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-primary-dark">
          <p className="font-display font-semibold text-neutral-200">Loading&hellip;</p>
        </div>
      }
    >
      <AppLauncher />
    </Suspense>
  );
}
