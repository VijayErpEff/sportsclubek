import { Metadata } from "next";
import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { AcademyPageLayout } from "@/components/composed/academy-page-layout";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { ACADEMY_PAGES } from "@/content/academies";

const data = ACADEMY_PAGES["volleyball-academy"];

export const metadata: Metadata = generateSEOMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: `/${data.slug}`,
  ogImage: data.image,
});

export default function VolleyballAcademyPage() {
  return (
    <>
      <AcademyPageLayout data={data} />

      {/* Smash Cup tournament callout — train year-round, then test your squad */}
      <Section variant="alternate" size="sm">
        <Container>
          <Reveal>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-dark to-primary text-white rounded-3xl p-8 md:p-10 shadow-lg relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute top-6 right-8 w-3 h-3 bg-secondary rounded-sm"
              />
              <div
                aria-hidden="true"
                className="absolute top-12 right-16 w-2 h-2 bg-secondary rounded-sm"
              />
              <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center relative">
                <div>
                  <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-secondary mb-3">
                    <Trophy className="h-3.5 w-3.5" /> Tournament · Jun 6–7, 2026
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-balance">
                    Train year-round, then test your squad at the LevelUP Smash Cup
                  </h2>
                  <p className="text-white/80 text-sm md:text-base max-w-2xl">
                    Indoor 6v6 — co-ed Youth (12–17) and Adult (18+) divisions. $200 per team,
                    6–10 player rosters, cash prizes &amp; trophies.
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Button
                    asChild
                    className="bg-secondary text-primary-dark hover:bg-secondary-light"
                  >
                    <Link href="/events/volleyball-tournament">
                      Tournament details <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-primary"
                  >
                    <Link href="/register/volleyball-tournament">Register your team</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
