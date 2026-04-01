"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Clock, User, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { BLOG_CATEGORIES, type BlogPost } from "@/content/blog-posts";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const SPRING = { stiffness: 300, damping: 30, mass: 0.5 };

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getCategoryLabel(categorySlug: string): string {
  const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug);
  return category?.label ?? categorySlug;
}

function getCategoryColor(categorySlug: string): string {
  const category = BLOG_CATEGORIES.find((c) => c.slug === categorySlug);
  return category?.color ?? "#1B3A5C";
}

/* ── 3D Tilt Card Wrapper ─────────────────────────────────────── */
function TiltCard({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [3, -3]), SPRING);
  const rotateY = useSpring(useTransform(x, [0, 1], [-3, 3]), SPRING);
  const brightness = useSpring(useTransform(y, [0, 1], [1.03, 0.97]), SPRING);

  const handleMove = useCallback(
    (e: React.PointerEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width);
      y.set((e.clientY - rect.top) / rect.height);
    },
    [x, y]
  );

  const handleLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        filter: useTransform(brightness, (v) => `brightness(${v})`),
      }}
      className="will-change-transform"
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}

/* ── Blog Card Component ──────────────────────────────────────── */
interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const prefersReduced = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const categoryColor = getCategoryColor(post.category);

  const cardContent = (
    <>
      {/* Image with parallax zoom + gradient overlay */}
      <div
        className={cn(
          "relative overflow-hidden bg-neutral-100",
          featured
            ? "aspect-[16/9] md:aspect-auto md:h-full md:min-h-[280px]"
            : "aspect-[16/9]"
        )}
      >
        {post.image ? (
          <motion.div
            className="absolute inset-0"
            animate={
              !prefersReduced && hovered
                ? { scale: 1.06 }
                : { scale: 1 }
            }
            transition={{ duration: 0.7, ease: APPLE_EASE }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 50vw"
                  : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
            />
          </motion.div>
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `${categoryColor}15` }}
          />
        )}

        {/* Gradient overlay — intensifies on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"
          animate={
            !prefersReduced && hovered
              ? { opacity: 1 }
              : { opacity: 0.6 }
          }
          transition={{ duration: 0.4, ease: APPLE_EASE }}
        />

        {/* Category badge — frosted glass */}
        <div className="absolute top-3 left-3 z-10">
          <motion.span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md border border-white/10"
            style={{ backgroundColor: `${categoryColor}B3` }}
            animate={
              !prefersReduced && hovered
                ? { y: 0, opacity: 1 }
                : { y: 0, opacity: 1 }
            }
          >
            {getCategoryLabel(post.category)}
          </motion.span>
        </div>

        {post.featured && !featured && (
          <div className="absolute top-3 right-3 z-10">
            <Badge variant="accent" className="text-white bg-accent backdrop-blur-md border border-white/10">
              Featured
            </Badge>
          </div>
        )}

        {/* "Read" indicator — slides in on hover */}
        {!featured && (
          <motion.div
            className="absolute bottom-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-neutral-900 shadow-lg"
            initial={false}
            animate={
              !prefersReduced && hovered
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 8, scale: 0.9 }
            }
            transition={{ duration: 0.3, ease: APPLE_EASE }}
          >
            Read
            <ArrowUpRight className="h-3 w-3" />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className={cn("p-5", featured && "md:p-8 md:flex md:flex-col md:justify-center")}>
        <motion.h3
          className={cn(
            "font-display font-bold text-neutral-900 leading-snug transition-colors duration-300",
            hovered && "text-primary",
            featured ? "text-card-title md:text-subsection" : "text-card-title"
          )}
        >
          {post.title}
        </motion.h3>

        <p
          className={cn(
            "text-neutral-500 leading-relaxed mt-2",
            featured ? "text-sm md:text-base" : "text-sm line-clamp-2"
          )}
        >
          {post.excerpt}
        </p>

        {/* Animated separator line */}
        <div className="relative mt-4 mb-3 h-px bg-neutral-100 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/40 via-accent/40 to-transparent"
            animate={
              !prefersReduced && hovered
                ? { width: "100%" }
                : { width: "0%" }
            }
            transition={{ duration: 0.5, ease: APPLE_EASE }}
          />
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400">
          <span className="inline-flex items-center gap-1.5">
            <User className="h-3 w-3" aria-hidden="true" />
            {post.author}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {post.readTime} min read
          </span>
        </div>

        {post.sport && (
          <div className="mt-3">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium border"
              style={{
                backgroundColor: `${categoryColor}08`,
                borderColor: `${categoryColor}20`,
                color: categoryColor,
              }}
            >
              {post.sport}
            </span>
          </div>
        )}
      </div>
    </>
  );

  const linkClasses = cn(
    "group block rounded-2xl bg-white overflow-hidden transition-all duration-500",
    "shadow-card hover:shadow-card-elevated",
    "border border-transparent hover:border-neutral-200/60",
    featured && "md:grid md:grid-cols-2",
    className
  );

  /* ── No animation path ─────────────────────────────── */
  if (!ready || prefersReduced) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className={cn(linkClasses, !prefersReduced && "hover:-translate-y-1")}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {cardContent}
      </Link>
    );
  }

  /* ── Full animation path ───────────────────────────── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: APPLE_EASE }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <TiltCard href={`/blog/${post.slug}`} className={linkClasses}>
        {cardContent}
      </TiltCard>
    </motion.div>
  );
}
