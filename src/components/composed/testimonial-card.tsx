import { cn } from "@/lib/utils/cn";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  rating = 5,
  className,
}: TestimonialCardProps) {
  return (
    <article
      className={cn(
        "p-6 rounded-2xl bg-white border border-neutral-200 shadow-card",
        className
      )}
      aria-label={`Testimonial from ${name}`}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-4" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "h-4 w-4",
              i < rating
                ? "fill-warning text-warning"
                : "fill-neutral-200 text-neutral-200"
            )}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-neutral-700 leading-relaxed mb-4">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="text-sm font-semibold text-neutral-900">{name}</div>
          <div className="text-xs text-neutral-500">{role}</div>
        </div>
      </div>
    </article>
  );
}
