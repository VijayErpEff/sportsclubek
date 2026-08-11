import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { UniformForm } from "@/components/composed/uniform-form";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";

export const metadata: Metadata = generateSEOMetadata({
  title: "Team Uniform Sizing — LevelUP Sports",
  description:
    "Submit your athlete's jersey and track pants sizes for their LevelUP Sports team kit. One quick form per athlete — we handle the rest.",
  path: "/uniforms",
});

export default function UniformsPage() {
  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Uniform Sizing", url: "/uniforms" },
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
              <li className="text-neutral-600 font-medium">Uniform Sizing</li>
            </ol>
          </nav>
          <div className="text-center max-w-md mx-auto mb-8">
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-neutral-900">
              Team Uniform Sizing
            </h1>
            <p className="mt-2 text-neutral-500 text-sm">
              Tell us your athlete&rsquo;s sizes so their jersey and track pants fit
              right on day one. One form per athlete.
            </p>
          </div>
        </Container>
      </section>

      <div className="pb-20 md:pb-28">
        <Container>
          <UniformForm />
        </Container>
      </div>
    </>
  );
}
