import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { VolleyballSurveyForm } from "./volleyball-survey-form";

export const metadata: Metadata = generateSEOMetadata({
  title: "Smash Cup — Post-Game Survey",
  description:
    "How was the LevelUP Smash Cup? Take our 60-second post-game survey and help us make the next volleyball tournament even better.",
  path: "/smash-cup/survey",
  noIndex: true,
});

export default function SmashCupSurveyPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Smash Cup Survey", url: "/smash-cup/survey" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <section className="pt-28 pb-6 md:pt-32 md:pb-8">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-neutral-400">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">Home</Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="font-medium text-neutral-600">Smash Cup Survey</li>
            </ol>
          </nav>
          <div className="mx-auto mb-8 max-w-md text-center">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-accent">🏐 LevelUP Smash Cup</p>
            <h1 className="font-display text-2xl font-bold tracking-tight text-neutral-900 md:text-3xl">
              How Was Your Tournament?
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Takes about a minute. Mostly taps — and totally anonymous unless you want updates.
            </p>
          </div>
        </Container>
      </section>

      <div className="pb-20 md:pb-28">
        <Container>
          <VolleyballSurveyForm />
        </Container>
      </div>
    </>
  );
}
