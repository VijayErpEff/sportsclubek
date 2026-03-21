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
          "bg-white border-t border-neutral-100": variant === "alternate",
          "bg-primary-dark text-white": variant === "dark",
          "bg-primary text-white": variant === "primary",
        },
        {
          "py-10 md:py-14": size === "sm",
          "py-14 md:py-20": size === "md",
          "py-16 md:py-24": size === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
