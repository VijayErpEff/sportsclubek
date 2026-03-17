import { SITE_CONFIG } from "@/lib/constants/site";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address.full)}`;

export function MapEmbed() {
  return (
    <section aria-label="Location map">
      <div className="rounded-xl overflow-hidden border border-neutral-200">
        <div className="flex items-center justify-center bg-neutral-200 h-64 text-neutral-500 text-sm">
          Map loading...
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <MapPin className="h-5 w-5 text-accent shrink-0" aria-hidden="true" />
        <p className="text-sm text-neutral-600">{SITE_CONFIG.address.full}</p>
      </div>
      <div className="mt-3">
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
