import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Facebook, Twitter, Linkedin } from "lucide-react";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/site";
import { BOOKING_URLS } from "@/lib/constants/booking";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/composed/blog-card";
import { BlogInlineSignup } from "@/components/composed/blog-inline-signup";
import {
  BLOG_POSTS,
  BLOG_CATEGORIES,
  type BlogPost,
} from "@/content/blog-posts";

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

function getRelatedPosts(currentPost: BlogPost, count: number = 3): BlogPost[] {
  return BLOG_POSTS.filter(
    (post) =>
      post.slug !== currentPost.slug &&
      post.category === currentPost.category
  ).slice(0, count);
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return generateSEOMetadata({
      title: "Post Not Found",
      description: "The blog post you're looking for could not be found.",
      path: `/blog/${slug}`,
    });
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage: post.image,
    ogType: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  const articleLD = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image
      ? `${SITE_CONFIG.url}${post.image}`
      : undefined,
    author: {
      "@type": post.author === "LevelUp Sports" ? "Organization" : "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    datePublished: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  };

  const relatedPosts = getRelatedPosts(post);
  const categoryColor = getCategoryColor(post.category);
  const shareUrl = `${SITE_CONFIG.url}/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLD) }}
      />

      <article>
        {/* Hero area */}
        <div className="pt-28 pb-8 md:pt-36 md:pb-12 bg-neutral-50">
          <Container>
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="text-xs text-neutral-400 mb-8"
            >
              <ol className="flex items-center gap-1.5 flex-wrap">
                <li>
                  <Link
                    href="/"
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li className="text-neutral-300">/</li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li className="text-neutral-300">/</li>
                <li className="text-neutral-600 font-medium truncate max-w-[200px] sm:max-w-none">
                  {post.title}
                </li>
              </ol>
            </nav>

            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                style={{ backgroundColor: categoryColor }}
              >
                {getCategoryLabel(post.category)}
              </span>
              <time
                dateTime={post.date}
                className="text-sm text-neutral-500"
              >
                {formatDate(post.date)}
              </time>
              <span className="inline-flex items-center gap-1 text-sm text-neutral-500">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-page-title md:text-hero text-neutral-900 max-w-3xl text-balance">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center gap-2 mt-6">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium text-neutral-700">
                {post.author}
              </span>
            </div>
          </Container>
        </div>

        {/* Post image */}
        {post.image && (
          <Container className="mt-8">
            <div className="relative aspect-[2/1] rounded-2xl overflow-hidden shadow-card max-w-3xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          </Container>
        )}

        {/* Article content */}
        <Section size="sm">
          <Container>
            <div
              className="prose prose-neutral prose-lg max-w-3xl prose-headings:font-display prose-headings:text-neutral-900 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Inline signup */}
            <div className="max-w-3xl">
              <BlogInlineSignup postSlug={post.slug} />
            </div>

            {/* Share bar */}
            <div className="max-w-3xl mt-12 pt-8 border-t border-neutral-200">
              <p className="text-sm font-semibold text-neutral-700 mb-3">
                Share this article
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white transition-colors min-w-[44px] min-h-[44px]"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white transition-colors min-w-[44px] min-h-[44px]"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 text-neutral-600 hover:bg-primary hover:text-white transition-colors min-w-[44px] min-h-[44px]"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Container>
        </Section>

        {/* CTA */}
        <Section variant="primary" size="sm">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-display text-section text-white mb-4">
                Ready to train?
              </h2>
              <p className="text-white/80 mb-8">
                Put what you&apos;ve learned into practice. Book a session at
                LevelUp Sports and work with our expert coaches.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  asChild
                  className="bg-white text-primary hover:bg-neutral-100"
                >
                  <Link href={BOOKING_URLS.offerings}>Book a Session</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-white/40 text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/memberships">View Memberships</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <Section>
          <Container>
            <h2 className="font-display text-section text-neutral-900 mb-8">
              More {getCategoryLabel(post.category)}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} />
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
