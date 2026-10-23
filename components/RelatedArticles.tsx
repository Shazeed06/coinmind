import Link from "next/link";
import type { Post } from "@/lib/data";
import { resolveCoverImageUrl } from "@/components/CoverArt";

// Sidebar "Related Articles" list with a small cover thumbnail per post.
// Posts are chosen by the page (topic-scored), so this is purely presentational.
export default function RelatedArticles({
  posts,
  heading = "Related Articles",
  viewAllHref = "/blog",
}: {
  posts: Post[];
  heading?: string;
  viewAllHref?: string;
}) {
  if (!posts.length) return null;
  return (
    <div className="rounded-card border border-border bg-bg p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold text-text">{heading}</p>
        <Link href={viewAllHref} className="text-xs font-medium text-brand hover:underline">
          View All &rarr;
        </Link>
      </div>
      <div className="space-y-4">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex gap-3">
            <img
              src={resolveCoverImageUrl(p.slug, undefined, p.art.variant)}
              alt=""
              width={96}
              height={64}
              loading="lazy"
              decoding="async"
              className="h-16 w-24 shrink-0 rounded-lg border border-border bg-bg-alt object-cover"
            />
            <span className="min-w-0">
              <span className="block text-[13px] font-semibold leading-snug text-text line-clamp-2 group-hover:text-brand transition-colors">
                {p.title}
              </span>
              <span className="mt-1 block text-[11px] uppercase tracking-wide text-text-muted">
                {p.category} · {p.readMinutes} min read
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
