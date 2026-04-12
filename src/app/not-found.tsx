import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Home, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist. Browse our sports programs, schedule, or contact us.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-[72px]">
      <Container>
        <div className="text-center max-w-lg mx-auto">
          <div className="text-8xl font-display font-bold text-neutral-200 mb-4">
            404
          </div>
          <h1 className="font-display text-page-title text-neutral-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-neutral-600 mb-8">
            Looks like this page took a wrong turn. Let&apos;s get you back in
            the game.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/schedule">
                <Search className="h-4 w-4 mr-2" />
                View Schedule
              </Link>
            </Button>
          </div>
          <div className="mt-12 text-sm text-neutral-500">
            <p className="mb-2">Looking for something specific?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/baseball" className="text-accent hover:text-accent-hover transition-colors">Baseball</Link>
              <Link href="/cricket" className="text-accent hover:text-accent-hover transition-colors">Cricket</Link>
              <Link href="/badminton" className="text-accent hover:text-accent-hover transition-colors">Badminton</Link>
              <Link href="/pickleball" className="text-accent hover:text-accent-hover transition-colors">Pickleball</Link>
              <Link href="/memberships" className="text-accent hover:text-accent-hover transition-colors">Memberships</Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
