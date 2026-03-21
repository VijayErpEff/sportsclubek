"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Link2, Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

interface SharePlatform {
  name: string;
  icon: typeof Facebook;
  getUrl: (url: string, title: string, description?: string) => string;
  color: string;
  hoverColor: string;
}

const PLATFORMS: SharePlatform[] = [
  {
    name: "Facebook",
    icon: Facebook,
    getUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: "text-[#1877F2]",
    hoverColor: "hover:bg-[#1877F2]/10",
  },
  {
    name: "X (Twitter)",
    icon: Twitter,
    getUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    color: "text-neutral-900",
    hoverColor: "hover:bg-neutral-100",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    getUrl: (url, title) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    color: "text-[#0A66C2]",
    hoverColor: "hover:bg-[#0A66C2]/10",
  },
  {
    name: "WhatsApp",
    icon: Share2,
    getUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
    color: "text-[#25D366]",
    hoverColor: "hover:bg-[#25D366]/10",
  },
];

export function SocialShare({ url, title, description, className }: SocialShareProps) {
  const prefersReduced = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleNativeShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
        return true;
      } catch {
        // User cancelled or unsupported
      }
    }
    return false;
  }, [url, title, description]);

  const handlePlatformShare = useCallback(
    (platform: SharePlatform) => {
      const shareUrl = platform.getUrl(url, title, description);
      window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
    },
    [url, title, description]
  );

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      aria-label="Share this page"
    >
      {PLATFORMS.map((platform) => {
        const Icon = platform.icon;
        return (
          <button
            key={platform.name}
            onClick={async () => {
              // On mobile, try native share first for WhatsApp
              if (platform.name === "WhatsApp") {
                const shared = await handleNativeShare();
                if (shared) return;
              }
              handlePlatformShare(platform);
            }}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200",
              platform.color,
              platform.hoverColor
            )}
            aria-label={`Share on ${platform.name}`}
          >
            <Icon className="h-4.5 w-4.5" />
          </button>
        );
      })}

      {/* Copy link button */}
      <div className="relative">
        <button
          onClick={handleCopyLink}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200",
            copied
              ? "bg-accent/10 text-accent"
              : "text-neutral-500 hover:bg-neutral-100"
          )}
          aria-label={copied ? "Link copied" : "Copy link"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={prefersReduced ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                exit={prefersReduced ? {} : { scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check className="h-4.5 w-4.5" />
              </motion.span>
            ) : (
              <motion.span
                key="link"
                initial={prefersReduced ? {} : { scale: 0 }}
                animate={{ scale: 1 }}
                exit={prefersReduced ? {} : { scale: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Link2 className="h-4.5 w-4.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Copied tooltip */}
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={prefersReduced ? {} : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? {} : { opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2 py-1 text-[11px] text-white"
              role="status"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
