import { Metadata } from "next";
import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo/metadata";
import { generateBreadcrumbLD } from "@/lib/seo/json-ld";
import { Hero } from "@/components/composed/hero";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { BlogCard } from "@/components/composed/blog-card";
import { BLOG_POSTS, BLOG_CATEGORIES } from "@/content/blog-posts";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = generateSEOMetadata({
  title: "Blog",
  description:
    "Training tips, athlete spotlights, event news, and stories from LevelUP Sports & Athletics Club in Elkton, MD. Expert advice for baseball, cricket, badminton, and pickleball players.",
  path: "/blog",
});

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const activeCategory = params.category ?? null;

  const breadcrumbLD = generateBreadcrumbLD([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  const filteredPosts = activeCategory
    ? BLOG_POSTS.filter((post) => post.category === activeCategory)
    : BLOG_POSTS;

  const featuredPost = filteredPosts.find((post) => post.featured);
  const remainingPosts = filteredPosts.filter(
    (post) => post !== featuredPost
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }}
      />

      <Hero
        title="Training Tips, News & Stories"
        subtitle="Expert advice, athlete spotlights, and the latest from LevelUP Sports. Fuel your game on and off the court."
      />

      <Section size="sm">
        <Container>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-neutral-400 mb-8">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="text-neutral-300">/</li>
              <li className="text-neutral-600 font-medium">Blog</li>
            </ol>
          </nav>

          {/* Category filter pills */}
          <nav aria-label="Filter by category" className="mb-12">
            <ul className="flex flex-wrap gap-2">
              <li>
                <Link
                  href="/blog"
                  className={cn(
                    "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[44px]",
                    !activeCategory
                      ? "bg-primary text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  )}
                  aria-current={!activeCategory ? "page" : undefined}
                >
                  All
                </Link>
              </li>
              {BLOG_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/blog?category=${category.slug}`}
                    className={cn(
                      "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[44px]",
                      activeCategory === category.slug
                        ? "bg-primary text-white"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                    )}
                    aria-current={
                      activeCategory === category.slug ? "page" : undefined
                    }
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* No results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-neutral-500 text-lg">
                No posts found in this category yet.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center text-primary font-semibold mt-4 hover:underline"
              >
                View all posts
              </Link>
            </div>
          )}

          {/* Featured post */}
          {featuredPost && (
            <div className="mb-12">
              <BlogCard post={featuredPost} featured />
            </div>
          )}

          {/* Post grid */}
          {remainingPosts.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
