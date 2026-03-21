import { cn } from "@/lib/utils/cn";

interface SectionDividerProps {
  variant?: "wave" | "curve" | "angle";
  className?: string;
  flip?: boolean;
}

const paths: Record<string, string> = {
  wave: "M0,64 C320,96 640,32 960,64 C1280,96 1440,48 1440,48 L1440,0 L0,0 Z",
  curve: "M0,48 Q720,96 1440,48 L1440,0 L0,0 Z",
  angle: "M0,48 L1440,0 L1440,0 L0,0 Z",
};

export function SectionDivider({
  variant = "curve",
  className,
  flip = false,
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden leading-none -mb-px",
        flip && "rotate-180",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        className="block w-full h-12 md:h-16 lg:h-20"
        fill="currentColor"
      >
        <path d={paths[variant]} />
      </svg>
    </div>
  );
}
