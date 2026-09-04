import Link from "next/link";
import { Section } from "@/components/ui";
import SectionIntro from "./SectionIntro";
import { posts } from "@/lib/data";
import { BookOpen, ArrowRight } from "lucide-react";

const CATEGORIES = ["Investing", "Tax", "Personal Finance", "Credit", "AI + Money", "AI Tools"];

export default function LearningHub() {
  const guides = posts.slice(0, 3);

  return (
    <Section variant="white">
      <SectionIntro
        eyebrow="Guides"
        title="Guides That Build Financial Confidence"
        subline="Practical, jargon-free guides written for India."
      />
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/blog/${g.slug}`}
              className="card flex flex-col h-full overflow-hidden group"
            >
              <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-brand/10 to-bg-alt flex items-center justify-center overflow-hidden">
                <BookOpen className="h-10 w-10 text-brand/30" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <p className="eyebrow text-brand">{g.category} · {g.readMinutes} min</p>
                <h3 className="text-lg font-semibold text-text mt-2 leading-snug line-clamp-2">{g.title}</h3>
                <p className="text-sm text-text-muted mt-1 line-clamp-2 flex-1">{g.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="card p-6">
            <p className="eyebrow text-text-muted mb-4">Topics</p>
            <div className="divide-y divide-border">
              {CATEGORIES.map((cat) => {
                const count = posts.filter((p) => p.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat.toLowerCase())}`}
                  className="flex items-center justify-between h-11 text-sm text-text hover:bg-bg-alt transition-colors px-1 -mx-1 rounded-input"
                  >
                    <span>{cat}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-text-muted tabular-nums">{count}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-text-muted" />
                    </span>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/blog"
              className="mt-5 pt-4 border-t border-border flex items-center justify-center gap-1.5 text-sm font-medium text-brand hover:underline"
            >
              View all guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-pill border border-border px-6 py-3 text-sm font-medium text-text hover:border-brand hover:text-brand transition-colors"
        >
          Browse All {posts.length} Guides <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
