import Link from "next/link";
import { Section, SectionHeader } from "@/components/ui";
import { posts } from "@/lib/data";
import { BookOpen, ChevronRight } from "lucide-react";

const CATEGORIES = ["Investing", "Tax", "Personal Finance", "Credit", "AI + Money", "AI Tools"];

export default function LearningHub() {
  const guides = posts.slice(0, 3);
  return (
    <Section variant="white">
      <SectionHeader
        eyebrow="Guides"
        title="Guides That Build Financial Confidence"
        subline="Practical, jargon-free guides written for India."
      />
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          {guides.map((g) => (
            <Link key={g.slug} href={`/blog/${g.slug}`} className="card card-h-full block">
              <div className="h-[160px] sm:h-[200px] bg-bg-alt flex items-center justify-center rounded-t-card border-b border-border">
                <BookOpen className="h-12 w-12 text-text-muted/30" />
              </div>
              <div className="p-5">
                <p className="eyebrow text-brand">{g.category} · {g.readMinutes} min</p>
                <h3 className="text-base font-semibold text-text mt-2 line-clamp-2">{g.title}</h3>
                <p className="text-sm text-text-muted mt-1 line-clamp-2">{g.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="lg:col-span-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted text-center lg:text-left">Topics</h3>
          <div className="mt-4 space-y-1">
            {CATEGORIES.map((cat) => {
              const count = posts.filter((p) => p.category === cat).length;
              return (
                <Link
                  key={cat}
                  href={`/blog?category=${cat.toLowerCase()}`}
                  className="flex items-center justify-between rounded-card px-4 py-3 text-sm text-text hover:bg-bg-alt transition-colors"
                >
                  <span>{cat}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-text-muted">{count}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-text-muted" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
