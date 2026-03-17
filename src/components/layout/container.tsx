import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  wide?: boolean;
}

export function Container({
  wide = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        wide ? "max-w-wide" : "max-w-container",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
