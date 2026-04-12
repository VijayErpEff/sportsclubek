"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [transform, setTransform] = useState("");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02, 1.02, 1.02)`);
  }, [prefersReduced]);

  const handleMouseLeave = useCallback(() => {
    setTransform("");
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: transform
          ? "transform 0.1s ease"
          : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={cn("rounded-2xl", className)}
    >
      <Link
        href={`/${slug}`}
        className="group relative block rounded-2xl bg-white overflow-hidden shadow-card hover:shadow-card-elevated transition-shadow duration-500"
      >
        {/* Sport Image */}
        <div className="relative h-52 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={`${name} at LevelUP Sports`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-103"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `${color}20` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
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
    </div>
  );
}
