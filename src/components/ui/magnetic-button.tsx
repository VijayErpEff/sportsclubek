"use client";

import { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useMagnetic } from "@/lib/hooks/use-magnetic";
import { cn } from "@/lib/utils/cn";

interface MagneticButtonProps extends ButtonProps {
  /** How strongly the button follows the cursor (0-1). Default 0.3 */
  magneticStrength?: number;
}

/**
 * A wrapper around Button that adds a magnetic hover effect.
 * When the mouse enters the button area, the button subtly follows
 * the cursor. On click, a brief scale-down (0.95) occurs.
 * On mouse leave, springs back to center with a smooth transition.
 * Respects prefers-reduced-motion.
 */
export function MagneticButton({
  magneticStrength = 0.3,
  className,
  children,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  disabled,
  ...props
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { style: magneticStyle } = useMagnetic(wrapperRef, {
    strength: magneticStrength,
  });
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(true);
      onMouseDown?.(e);
    },
    [onMouseDown]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseUp?.(e);
    },
    [onMouseUp]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsPressed(false);
      onMouseLeave?.(e);
    },
    [onMouseLeave]
  );

  const scaleStyle = prefersReduced
    ? {}
    : {
        transform: isPressed ? "scale(0.95)" : "scale(1)",
        transition: "transform 0.15s cubic-bezier(0.22, 1, 0.36, 1)",
      };

  return (
    <div
      ref={wrapperRef}
      className="inline-block"
      style={disabled ? undefined : magneticStyle}
    >
      <Button
        className={cn(className)}
        disabled={disabled}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        style={disabled ? undefined : scaleStyle}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
}
