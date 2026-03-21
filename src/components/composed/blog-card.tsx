"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { Clock, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/badge";
import { BLOG_CATEGORIES, type BlogPost } from "@/content/blog-posts";

const APPLE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

export function BlogCard({ post, featured = false, className }: BlogCardProps) {
  const prefersReduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const categoryColor = getCategoryColor(post.category);

  const cardContent = (
    <>
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-neutral-100",
          featured
            ? "aspect-[16/9] md:aspect-auto md:h-full md:min-h-[280px]"
            : "aspect-[16/9]"
        )}
      >
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className={cn(
              "object-cover transition-transform duration-700",
              !prefersReduced && "group-hover:scale-105"
            )}
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `${categoryColor}15` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
            style={{ backgroundColor: `${categoryColor}CC` }}
          >
            {getCategoryLabel(post.category)}
          </span>
        </div>

        {post.featured && !featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="accent" className="text-white bg-accent">
              Featured
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn("p-5", featured && "md:p-8 md:flex md:flex-col md:justify-center")}>
        <h3
          className={cn(
            "font-display font-bold text-neutral-900 leading-snug group-hover:text-primary transition-colors",
            featured ? "text-card-title md:text-subsection" : "text-card-title"
          )}
        >
          {post.title}
        </h3>

        <p
          className={cn(
            "text-neutral-600 leading-relaxed mt-2",
            featured ? "text-sm md:text-base" : "text-sm line-clamp-2"
          )}
        >
          {post.excerpt}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 text-xs text-neutral-500">
          <span className="inline-flex items-center gap-1">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            {post.author}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readTime} min read
          </span>
        </div>

        {post.sport && (
          <div className="mt-3">
            <span className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700">
              {post.sport}
            </span>
          </div>
        )}
      </div>
    </>
  );

  const linkClasses = cn(
    "group block rounded-2xl bg-white overflow-hidden shadow-card transition-all duration-500",
    !prefersReduced && "hover:shadow-card-elevated hover:-translate-y-1",
    prefersReduced && "hover:shadow-card-elevated",
    featured && "md:grid md:grid-cols-2",
    className
  );

  if (!ready || prefersReduced) {
    return (
      <Link href={`/blog/${post.slug}`} className={linkClasses}>
        {cardContent}
      </Link>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: APPLE_EASE }}
    >
      <Link href={`/blog/${post.slug}`} className={linkClasses}>
        {cardContent}
      </Link>
    </motion.div>
  );
}
