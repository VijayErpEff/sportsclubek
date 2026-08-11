import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { TrainingSurveyForm } from "@/components/composed/training-survey-form";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Training Feedback — LevelUP Sports",
  description:
    "Parents, tell us how training is going. Take our 1-minute feedback survey and help us improve coaching, sessions, and the facility at LevelUP Sports in Elkton, MD.",
  path: "/training-survey",
});

export default function TrainingSurveyPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Training Feedback", url: "/training-survey" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <section className="pt-28 pb-6 md:pt-32 md:pb-8">
        <Container>
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-4">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Training Feedback</li>
            </ol>
          </nav>
          <div className="text-center max-w-md mx-auto mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
              How&rsquo;s Training Going?
            </h1>
            <p className="mt-2 text-neutral-500 text-sm">
              You see what we can&rsquo;t — tell us how your athlete&rsquo;s training is going.
              Takes about a minute, mostly taps.
            </p>
          </div>
        </Container>
      </section>

      <div className="pb-20 md:pb-28">
        <Container>
          <TrainingSurveyForm />
        </Container>
      </div>
    </>
  );
}
