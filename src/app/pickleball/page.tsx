import { Metadata } from "next";
import { SportPageLayout } from "@/components/composed/sport-page-layout";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { SPORT_PAGES } from "@/content/sports";

const data = SPORT_PAGES.pickleball;

export const metadata: Metadata = generateSEOMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: `/${data.slug}`,
  ogImage: data.image,
});

export default function PickleballPage() {
  return <SportPageLayout data={data} />;
}
