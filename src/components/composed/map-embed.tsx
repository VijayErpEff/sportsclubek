import { SITE_CONFIG } from "@/lib/constants/site";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const mapQuery = encodeURIComponent(
  `${SITE_CONFIG.name}, ${SITE_CONFIG.address.full}`
);
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address.full)}`;
const embedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

export function MapEmbed() {
  return (
    <section aria-label="Location map">
      <div className="rounded-xl overflow-hidden border border-neutral-200">
        <iframe
          src={embedUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing location of ${SITE_CONFIG.name} at ${SITE_CONFIG.address.full}`}
        />
      </div>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
          <p className="text-sm text-neutral-600">{SITE_CONFIG.address.full}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </a>
        </Button>
      </div>
    </section>
  );
}
