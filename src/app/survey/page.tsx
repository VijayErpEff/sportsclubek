import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SurveyForm } from "@/components/composed/survey-form";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Share Your Feedback — LevelUP Sports",
  description:
    "Help us improve! Take our 30-second survey and tell us what you love and what we can do better at LevelUP Sports in Elkton, MD.",
  path: "/survey",
});

export default function SurveyPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Survey", url: "/survey" },
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
              <li className="text-neutral-600 font-medium">Survey</li>
            </ol>
          </nav>
          <div className="text-center max-w-md mx-auto mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
              We&rsquo;d Love Your Feedback
            </h1>
            <p className="mt-2 text-neutral-500 text-sm">
              Takes less than a minute. Mostly taps, we promise.
            </p>
          </div>
        </Container>
      </section>

      <div className="pb-20 md:pb-28">
        <Container>
          <SurveyForm />
        </Container>
      </div>
    </>
  );
}
