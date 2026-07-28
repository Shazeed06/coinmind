import Link from "next/link";
import { news } from "@/lib/data";
import { Newspaper } from "lucide-react";
import { Pill, Breadcrumb } from "@/components/ui";
import { NEWS } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = NEWS;

export default function Page() {
  return (
    <div>
      <section className="section-pad bg-white">
        <div className="container-main">
          <Breadcrumb items={[{ label: "News" }]} />
          <Pill>News</Pill>
          <h1 className="h1 text-text mt-3">Finance & AI News</h1>
          <p className="body text-text-muted mt-3 max-w-[640px]">
            Original, plain-English explainers of the finance and AI news that matters.
          </p>
        </div>
      </section>

      <section className="section-pad pt-0 bg-white">
        <div className="container-main space-y-4">
          {news.map((item, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`eyebrow ${item.category === "Finance" ? "text-brand" : "text-accent"}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-text-muted">{item.tag}</span>
                  </div>
                  <h3 className="text-base font-semibold text-text mt-1">{item.title}</h3>
                  <p className="text-sm text-text-muted mt-1 line-clamp-2">{item.summary}</p>
                  <p className="text-xs text-text-muted mt-2">
                    {item.source} · {item.minutesAgo}m ago
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
