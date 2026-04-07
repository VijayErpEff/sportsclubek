import { SITE_CONFIG, SPORTS } from "@/lib/constants/site";
import { AGGREGATE_RATING } from "@/content/reviews";

/**
 * Enhanced Organization/LocalBusiness JSON-LD with full local SEO signals.
 * Includes areaServed, hasOfferCatalog, aggregateRating, and service details.
 */
export function generateOrganizationLD() {
  return {
    "@context": "https://schema.org",
    "@type": ["SportsActivityLocation", "LocalBusiness"],
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    image: `${SITE_CONFIG.url}/images/og/default.jpg`,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/place/?q=place_id:${SITE_CONFIG.googlePlaceId}`,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card, Apple Pay, Google Pay",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "06:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "06:00",
        closes: "21:00",
      },
    ],
    // Service area — critical for showing up in nearby city searches
    areaServed: [
      {
        "@type": "City",
        name: "Elkton",
        "@id": "https://www.wikidata.org/wiki/Q754951",
      },
      {
        "@type": "City",
        name: "Middletown",
        containedInPlace: { "@type": "State", name: "Delaware" },
      },
      {
        "@type": "City",
        name: "Newark",
        containedInPlace: { "@type": "State", name: "Delaware" },
      },
      {
        "@type": "City",
        name: "Wilmington",
        containedInPlace: { "@type": "State", name: "Delaware" },
      },
      {
        "@type": "City",
        name: "Bear",
        containedInPlace: { "@type": "State", name: "Delaware" },
      },
      {
        "@type": "City",
        name: "New Castle",
        containedInPlace: { "@type": "State", name: "Delaware" },
      },
      {
        "@type": "City",
        name: "Glasgow",
        containedInPlace: { "@type": "State", name: "Delaware" },
      },
      {
        "@type": "City",
        name: "North East",
        containedInPlace: { "@type": "State", name: "Maryland" },
      },
      {
        "@type": "City",
        name: "Rising Sun",
        containedInPlace: { "@type": "State", name: "Maryland" },
      },
      {
        "@type": "City",
        name: "Perryville",
        containedInPlace: { "@type": "State", name: "Maryland" },
      },
      {
        "@type": "City",
        name: "Kennett Square",
        containedInPlace: { "@type": "State", name: "Pennsylvania" },
      },
      {
        "@type": "City",
        name: "Oxford",
        containedInPlace: { "@type": "State", name: "Pennsylvania" },
      },
      {
        "@type": "City",
        name: "Christiana",
        containedInPlace: { "@type": "State", name: "Delaware" },
      },
      {
        "@type": "City",
        name: "Hockessin",
        containedInPlace: { "@type": "State", name: "Delaware" },
      },
      {
        "@type": "City",
        name: "Chesapeake City",
        containedInPlace: { "@type": "State", name: "Maryland" },
      },
      {
        "@type": "City",
        name: "Havre de Grace",
        containedInPlace: { "@type": "State", name: "Maryland" },
      },
      {
        "@type": "AdministrativeArea",
        name: "Cecil County, Maryland",
      },
      {
        "@type": "AdministrativeArea",
        name: "New Castle County, Delaware",
      },
      {
        "@type": "AdministrativeArea",
        name: "Chester County, Pennsylvania",
      },
      // GeoCircle for ~25 mile service radius
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: SITE_CONFIG.geo.latitude,
          longitude: SITE_CONFIG.geo.longitude,
        },
        geoRadius: "40000", // 40 km ≈ 25 miles
      },
    ],
    // Aggregate rating — sourced from reviews.ts to stay in sync with visible UI
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(AGGREGATE_RATING.ratingValue),
      reviewCount: String(AGGREGATE_RATING.reviewCount),
      bestRating: String(AGGREGATE_RATING.bestRating),
      worstRating: "1",
    },
    // Services offered
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sports Programs & Court Rentals",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Indoor Batting Cages",
            description:
              "Indoor batting cages with pitching machines up to 90 MPH. Available for hourly rental or academy sessions in Elkton, MD. Serving Middletown, Newark, and Wilmington, DE.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cricket Nets & Coaching",
            description:
              "Professional cricket facility with full-length nets, bowling machines, and certified coaching. Maryland's premier cricket academy near Newark and Wilmington, DE.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Badminton Courts & Academy",
            description:
              "BWF-approved competition-grade badminton courts with professional coaching. Best badminton facility near Middletown, DE and Cecil County, MD.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Pickleball Courts",
            description:
              "USAPA-standard indoor pickleball courts for open play, lessons, and rentals. Closest indoor pickleball courts to Middletown and Newark, DE.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Youth Sports Academies",
            description:
              "Expert-led baseball, cricket, and badminton academies for ages 6-18. Youth sports training serving the MD/DE/PA tri-state area.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Volleyball Courts & Academy",
            description:
              "Indoor volleyball courts with regulation nets and expert coaching. Youth academy, adult leagues, open play, and court rentals serving Newark, Middletown, and Wilmington, DE.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Indoor Soccer & Futsal",
            description:
              "Year-round indoor soccer and futsal on professional turf. Youth academy, adult leagues, and field rentals near Middletown, Newark, and Wilmington, DE.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Kids Agility Training",
            description:
              "Fun, structured agility and athleticism program for kids ages 5-12. Building coordination, speed, and confidence near Elkton and Middletown.",
          },
        },
      ],
    },
    // Known for keywords
    knowsAbout: [
      "baseball training",
      "batting cages",
      "cricket coaching",
      "indoor cricket nets",
      "badminton lessons",
      "badminton court rental",
      "pickleball courts",
      "volleyball courts",
      "volleyball academy",
      "indoor soccer",
      "futsal training",
      "youth sports",
      "adult sports leagues",
      "indoor sports facility",
      "sports academy",
      "kids agility training",
      "court rentals Elkton MD",
    ],
    sameAs: Object.values(SITE_CONFIG.social),
  };
}

/**
 * Generate SportsEvent JSON-LD for specific sport pages.
 * Helps with "near me" and location-specific sport searches.
 */
export function generateSportOfferLD(sport: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: `${sport.name} at ${SITE_CONFIG.name}`,
    description: sport.description,
    url: `${SITE_CONFIG.url}/${sport.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressRegion: SITE_CONFIG.address.state,
      postalCode: SITE_CONFIG.address.zip,
      addressCountry: SITE_CONFIG.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    telephone: SITE_CONFIG.phone,
    parentOrganization: {
      "@type": "SportsActivityLocation",
      name: SITE_CONFIG.name,
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    areaServed: [
      ...SITE_CONFIG.serviceAreas.map((area) => ({
        "@type": "City" as const,
        name: area,
      })),
      { "@type": "AdministrativeArea" as const, name: "Cecil County, Maryland" },
      { "@type": "AdministrativeArea" as const, name: "New Castle County, Delaware" },
      { "@type": "AdministrativeArea" as const, name: "Chester County, Pennsylvania" },
      {
        "@type": "GeoCircle" as const,
        geoMidpoint: {
          "@type": "GeoCoordinates" as const,
          latitude: SITE_CONFIG.geo.latitude,
          longitude: SITE_CONFIG.geo.longitude,
        },
        geoRadius: "40000",
      },
    ],
  };
}

export function generateBreadcrumbLD(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export function generateFAQLD(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateCourseLD(course: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.name,
    description: course.description,
    url: `${SITE_CONFIG.url}${course.url}`,
    provider: {
      "@type": "SportsActivityLocation",
      name: SITE_CONFIG.name,
      sameAs: SITE_CONFIG.url,
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    locationCreated: {
      "@type": "Place",
      name: SITE_CONFIG.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONFIG.address.street,
        addressLocality: SITE_CONFIG.address.city,
        addressRegion: SITE_CONFIG.address.state,
        postalCode: SITE_CONFIG.address.zip,
      },
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceLocation: {
        "@type": "Place",
        name: SITE_CONFIG.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE_CONFIG.address.street,
          addressLocality: SITE_CONFIG.address.city,
          addressRegion: SITE_CONFIG.address.state,
          postalCode: SITE_CONFIG.address.zip,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE_CONFIG.geo.latitude,
          longitude: SITE_CONFIG.geo.longitude,
        },
      },
      serviceArea: [
        ...SITE_CONFIG.serviceAreas.map((area) => ({
          "@type": "City" as const,
          name: area,
        })),
        { "@type": "AdministrativeArea" as const, name: "Cecil County, Maryland" },
        { "@type": "AdministrativeArea" as const, name: "New Castle County, Delaware" },
        { "@type": "AdministrativeArea" as const, name: "Chester County, Pennsylvania" },
      ],
    },
  };
}
