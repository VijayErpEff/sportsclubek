import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  variant?: "default" | "alternate" | "dark" | "primary";
  size?: "sm" | "md" | "lg";
}

export function Section({
  as: Tag = "section",
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "w-full",
        {
          "bg-white": variant === "default",
          "bg-neutral-50": variant === "alternate",
          "bg-primary-dark text-white": variant === "dark",
          "bg-primary text-white": variant === "primary",
        },
        {
          "py-12 md:py-16": size === "sm",
          "py-16 md:py-24": size === "md",
          "py-20 md:py-32": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
