import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circle" | "card";
}

export function Skeleton({ className, variant = "text" }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-neutral-200",
        {
          "h-4 w-full rounded": variant === "text",
          "h-10 w-10 rounded-full": variant === "circle",
          "h-48 w-full rounded-xl": variant === "card",
        },
        className
      )}
    />
  );
}
