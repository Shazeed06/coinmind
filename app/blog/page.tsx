"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { posts } from "@/lib/data";
import { ArrowRight, Search } from "lucide-react";
import CoverArt from "@/components/CoverArt";
import { Pill, EmptyState } from "@/components/ui";

const ALL_CATEGORIES = ["All", "Investing", "Tax", "Credit", "Personal Finance", "AI + Money", "AI Tools", "Productivity"] as const;
const PER_PAGE = 12;

export default function Page() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [lead, ...rest] = posts;

  const filtered = useMemo(() => {
    return rest.filter((p) => {
      if (activeCat !== "All" && p.category !== activeCat) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
      }
      return true;
    });
  }, [activeCat, search, rest]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const categoryCount = useMemo(() => {
    const map = new Map<string, number>();
    posts.forEach((p) => map.set(p.category, (map.get(p.category) || 0) + 1));
    return map;
  }, []);

  return (
    <div>
      <section className="section-pad bg-white">
        <div className="container-main">
          <Pill>Guides</Pill>
          <h1 className="h1 text-text mt-3">Personal Finance & AI Guides</h1>
          <p className="body text-text-muted mt-3 max-w-[640px]">
            Practical, jargon-free guides on personal finance, investing, mutual funds, income tax, credit
            scores, and working smarter with AI. Every guide is written for Indian readers, with real
            numbers, worked examples, and links to the calculator that does the maths for you. Use the
            search and category filters below to jump straight to the topic you need.
          </p>
        </div>
      </section>

      {lead && (
        <section className="pb-12 bg-white">
          <div className="container-main">
            <Link href={`/blog/${lead.slug}`} className="card overflow-hidden block hover:border-brand">
              <div className="grid md:grid-cols-12">
                <div className="md:col-span-7 h-[180px] sm:h-[280px] overflow-hidden">
                  <CoverArt seed={lead.slug} variant={lead.art.variant} palette={lead.art.palette} label={lead.category} className="h-full w-full" />
                </div>
                <div className="md:col-span-5 p-5 sm:p-8 flex flex-col justify-center">
                  <p className="eyebrow text-brand">{lead.category} · {lead.readMinutes} min read</p>
                  <h2 className="text-2xl font-bold text-text mt-2 leading-tight">{lead.title}</h2>
                  <p className="text-sm text-text-muted mt-3 line-clamp-3">{lead.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Read guide <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <div className="sticky top-16 sm:top-20 z-40 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container-main py-3 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search guides..."
              className="w-full h-10 pl-10 pr-4 rounded-input border border-border text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCat(cat); setPage(1); }}
                className={`whitespace-nowrap rounded-pill px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeCat === cat
                    ? "bg-brand text-white"
                    : "bg-bg-alt text-text-muted hover:text-text border border-border"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-xs opacity-60">({categoryCount.get(cat) || 0})</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="section-pad bg-bg-alt">
        <div className="container-main">
          {paginated.length === 0 ? (
            <EmptyState message="No guides match your filters." onClear={() => { setSearch(""); setActiveCat("All"); }} />
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-h-full overflow-hidden">
                    <div className="aspect-[16/10] overflow-hidden">
                      <CoverArt seed={p.slug} variant={p.art.variant} palette={p.art.palette} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]" />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="eyebrow text-brand">{p.category} · {p.readMinutes} min</p>
                      <h3 className="text-base font-semibold text-text mt-2 line-clamp-2">{p.title}</h3>
                      <p className="text-sm text-text-muted mt-1 line-clamp-2 flex-1">{p.excerpt}</p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand">
                        Read <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="inline-flex items-center gap-2 rounded-pill border border-border px-6 py-3 text-sm font-medium text-text hover:border-brand hover:text-brand transition-colors"
                  >
                    Load more guides ({filtered.length - paginated.length} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="section-pad bg-gradient-invert text-white text-center">
        <div className="container-main max-w-[640px]">
          <h2 className="text-2xl font-bold">Stay Updated</h2>
          <p className="text-white/60 mt-3 text-sm">Get the latest guides and money tips delivered to your inbox.</p>
          <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" className="flex-1 h-11 rounded-input px-4 text-sm text-text bg-white outline-none" />
            <button type="submit" className="h-11 rounded-pill bg-white text-brand px-6 text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
