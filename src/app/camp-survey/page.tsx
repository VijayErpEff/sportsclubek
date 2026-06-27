import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { CampSurveyForm } from "@/components/composed/camp-survey-form";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Summer Camp Feedback — LevelUP Sports",
  description:
    "How did we do? Take our 2-minute LevelUP Summer Camp feedback survey and help us shape future camps in Elkton, MD.",
  path: "/camp-survey",
});

export default function CampSurveyPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Summer Camp Feedback", url: "/camp-survey" },
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
              <li className="text-neutral-600 font-medium">Summer Camp Feedback</li>
            </ol>
          </nav>
          <div className="text-center max-w-md mx-auto mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
              How Was Summer Camp?
            </h1>
            <p className="mt-2 text-neutral-500 text-sm">
              Two minutes, mostly taps. Your feedback shapes our next camp.
            </p>
          </div>
        </Container>
      </section>

      <div className="pb-20 md:pb-28">
        <Container>
          <CampSurveyForm />
        </Container>
      </div>
    </>
  );
}
