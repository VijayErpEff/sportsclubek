import { cn } from "@/lib/utils/cn";

interface ShimmerProps {
  className?: string;
  /** Width of the shimmer element. Default "100%" */
  width?: string;
  /** Height of the shimmer element. Default "1rem" */
  height?: string;
  /** Border radius class. Default "rounded-lg" */
  rounded?: string;
}

/**
 * Premium shimmer/skeleton loading effect.
 * Shows an animated gradient shimmer sweep (like iOS loading states)
 * instead of a plain grey pulse. The gradient sweeps left to right
 * on a 1.5s infinite loop.
 *
 * Uses CSS-only animation for optimal performance.
 */
export function Shimmer({
  className,
  width = "100%",
  height = "1rem",
  rounded = "rounded-lg",
}: ShimmerProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn(
        "relative overflow-hidden bg-neutral-200",
        rounded,
        className
      )}
      style={{ width, height }}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_ease-in-out_infinite]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(245,245,250,0.6) 40%, rgba(245,245,250,0.8) 50%, rgba(245,245,250,0.6) 60%, transparent 100%)",
        }}
      />
    </div>
  );
}

/**
 * Preset shimmer compositions for common loading patterns.
 */
export function ShimmerText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)} aria-hidden="true" role="presentation">
      {Array.from({ length: lines }).map((_, i) => (
        <Shimmer
          key={i}
          height="0.875rem"
          width={i === lines - 1 ? "60%" : "100%"}
          rounded="rounded"
        />
      ))}
    </div>
  );
}

export function ShimmerCard({ className }: { className?: string }) {
  return (
    <div
      className={cn("space-y-4 rounded-xl border border-neutral-200 p-4", className)}
      aria-hidden="true"
      role="presentation"
    >
      <Shimmer height="12rem" rounded="rounded-lg" />
      <Shimmer height="1.25rem" width="70%" rounded="rounded" />
      <ShimmerText lines={2} />
      <Shimmer height="2.5rem" width="8rem" rounded="rounded-lg" />
    </div>
  );
}
