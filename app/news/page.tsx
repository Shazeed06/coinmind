import Link from "next/link";
import { newsArticles } from "@/lib/newsArticles";
import { ArrowRight } from "lucide-react";
import { Pill, Breadcrumb } from "@/components/ui";
import { NEWS } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = NEWS;

export default function Page() {
  const itemListJson = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Finance & AI News",
    itemListElement: newsArticles.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: a.title,
      url: `${site.url}/news/${a.slug}`,
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJson) }}
      />

      <section className="section-pad bg-white">
        <div className="container-main">
          <Breadcrumb items={[{ label: "News" }]} />
          <Pill>News</Pill>
          <h1 className="h1 text-text mt-3">Finance &amp; AI News</h1>
          <p className="body text-text-muted mt-3 max-w-[640px]">
            Original, plain-English explainers of the finance and AI news that matters.
            Every story is a full article: what changed, why it matters, and what to do
            about it.
          </p>
        </div>
      </section>

      <section className="section-pad pt-0 bg-white">
        <div className="container-main space-y-4">
          {newsArticles.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="card p-5 block group transition-colors hover:border-brand/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`eyebrow ${
                        item.category === "Finance" ? "text-brand" : "text-accent"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-text-muted">{item.tag}</span>
                  </div>
                  <h2 className="text-base font-semibold text-text mt-1 group-hover:text-brand transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-sm text-text-muted mt-1 line-clamp-2">
                    {item.summary}
                  </p>
                  <p className="text-xs text-text-muted mt-2">
                    {item.source} · {item.date} · {item.readMinutes} min read
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 mt-1 text-text-muted group-hover:text-brand transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
