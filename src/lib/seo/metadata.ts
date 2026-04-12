import { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants/site";

interface SEOMetadataProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noIndex?: boolean;
}

export function generateSEOMetadata({
  title,
  description,
  path = "",
  ogImage = "/images/sports/facility.jpg",
  ogType = "website",
  noIndex = false,
}: SEOMetadataProps): Metadata {
  const fullTitle = `${title} | ${SITE_CONFIG.shortName}`;
  const url = `${SITE_CONFIG.url}${path}`;
  const absoluteOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${SITE_CONFIG.url}${ogImage}`;

  return {
    title,
    description,
    ...(noIndex && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: absoluteOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteOgImage],
    },
  };
}
