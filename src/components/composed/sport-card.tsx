import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { ArrowRight } from "lucide-react";

interface SportCardProps {
  name: string;
  slug: string;
  description: string;
  color: string;
  image?: string;
  hasAcademy: boolean;
  className?: string;
}

export function SportCard({
  name,
  slug,
  description,
  color,
  image,
  hasAcademy,
  className,
}: SportCardProps) {
  return (
    <Link
      href={`/${slug}`}
      className={cn(
        "group relative block rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {/* Sport Image */}
      <div className="relative h-44 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={`${name} at LevelUP Sports`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `${color}20` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <h3 className="font-display text-lg font-bold text-white drop-shadow-md">
            {name}
          </h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex items-center gap-4">
          <span
            className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
            style={{ color }}
          >
            Explore
            <ArrowRight className="h-4 w-4" />
          </span>
          {hasAcademy && (
            <span className="text-xs font-medium text-primary/70 bg-primary/5 px-2.5 py-0.5 rounded-full">
              Academy
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
