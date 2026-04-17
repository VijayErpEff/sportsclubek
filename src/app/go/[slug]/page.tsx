import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getRedirect, REDIRECTS } from "@/lib/constants/redirects";
import { SITE_CONFIG } from "@/lib/constants/site";
import { RedirectClient } from "./redirect-client";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return REDIRECTS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getRedirect(slug);
  if (!entry) return {};

  return {
    title: `${entry.title} — ${SITE_CONFIG.shortName}`,
    robots: { index: false, follow: false },
  };
}

export default async function GoRedirectPage({ params }: Props) {
  const { slug } = await params;
  const entry = getRedirect(slug);

  if (!entry) notFound();

  return <RedirectClient title={entry.title} destination={entry.destination} />;
}
