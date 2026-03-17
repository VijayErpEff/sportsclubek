import { Metadata } from "next";
import { AcademyPageLayout } from "@/components/composed/academy-page-layout";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { ACADEMY_PAGES } from "@/content/academies";

const data = ACADEMY_PAGES["baseball-academy"];

export const metadata: Metadata = generateSEOMetadata({
  title: data.metaTitle,
  description: data.metaDescription,
  path: `/${data.slug}`,
});

export default function BaseballAcademyPage() {
  return <AcademyPageLayout data={data} />;
}
