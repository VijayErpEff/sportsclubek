"use client";

import { useState } from "react";
import { ArrowRight, MapPin, Wallet, Eye } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CareerApplyButton } from "@/components/composed/career-form";

export type PositionDetails = {
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  compensation?: string;
  location?: string;
};

export function PositionDetailsDialog({
  title,
  details,
}: {
  title: string;
  details: PositionDetails;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-primary transition-colors"
        aria-label={`View details for ${title}`}
      >
        <Eye className="h-3.5 w-3.5" /> View Details
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title={title} className="max-w-2xl">
          <div className="space-y-5">
            <p className="text-sm text-neutral-700 leading-relaxed">
              {details.summary}
            </p>

            {(details.location || details.compensation) && (
              <div className="flex flex-wrap gap-3 text-xs">
                {details.location && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-primary">
                    <MapPin className="h-3 w-3" /> {details.location}
                  </span>
                )}
                {details.compensation && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-accent">
                    <Wallet className="h-3 w-3" /> {details.compensation}
                  </span>
                )}
              </div>
            )}

            <section>
              <h3 className="font-semibold text-neutral-900 text-sm mb-2">
                What you&apos;ll do
              </h3>
              <ul className="space-y-1.5 text-sm text-neutral-700">
                {details.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-neutral-900 text-sm mb-2">
                What we&apos;re looking for
              </h3>
              <ul className="space-y-1.5 text-sm text-neutral-700">
                {details.requirements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-primary shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {details.niceToHave && details.niceToHave.length > 0 && (
              <section>
                <h3 className="font-semibold text-neutral-900 text-sm mb-2">
                  Nice to have
                </h3>
                <ul className="space-y-1.5 text-sm text-neutral-700">
                  {details.niceToHave.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-neutral-400 mt-1.5 h-1 w-1 rounded-full bg-neutral-400 shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="pt-2 border-t border-neutral-100 flex justify-end">
              <CareerApplyButton
                position={title}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-lg bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-colors"
              >
                Apply Now <ArrowRight className="h-3.5 w-3.5" />
              </CareerApplyButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
