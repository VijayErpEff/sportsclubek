import { Metadata } from "next";
import { SportPageLayout } from "@/components/composed/sport-page-layout";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { SPORT_PAGES } from "@/content/sports";

const data = SPORT_PAGES.soccer;

export const metadata: Metadata = generateSEOMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: `/${data.slug}`,
});

export default function SoccerPage() {
  return <SportPageLayout data={data} />;
}
