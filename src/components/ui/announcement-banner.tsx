import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { SiteContent } from "@/lib/content";
import { Container } from "./container";

type AnnouncementBannerProps = {
  announcement: NonNullable<SiteContent["settings"]>["announcement"];
};

/** Optional site-wide message, managed in Site settings → Announcement. */
export function AnnouncementBanner({ announcement }: AnnouncementBannerProps) {
  if (!announcement?.enabled || !announcement.text) return null;
  const { text, linkLabel, linkUrl } = announcement;
  const isInternal = linkUrl?.startsWith("/");

  return (
    <div className="surface-plum text-sm" role="region" aria-label="Announcement">
      <Container className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2 text-center">
        <p className="font-semibold">{text}</p>
        {linkUrl ? (
          isInternal ? (
            <Link href={linkUrl} className="inline-flex items-center gap-1 font-bold text-accent underline-offset-4 hover:underline">
              {linkLabel || "Learn more"}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-accent underline-offset-4 hover:underline"
            >
              {linkLabel || "Learn more"}
              <ArrowRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )
        ) : null}
      </Container>
    </div>
  );
}
