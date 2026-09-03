"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { posts } from "@/lib/data";
import { ArrowRight, Search } from "lucide-react";
import CoverArt from "@/components/CoverArt";
import { Pill, EmptyState } from "@/components/ui";
import { site } from "@/lib/site";

const ALL_CATEGORIES = ["All", "Investing", "Tax", "Credit", "Personal Finance", "AI + Money", "AI Tools", "Productivity"] as const;
const PER_PAGE = 12;

export default function Page() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // No newsletter backend yet, so the sign-up hands off to the reader's mail
  // client the same way the contact form does. Swap for a real endpoint later.
  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Newsletter signup");
    const body = encodeURIComponent(`Please add ${email} to the CoinMind newsletter.`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSubscribed(true);
  };

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

  // Count over the same list the grid filters (`rest`), not all posts. The lead
  // post is pulled out above and never appears in the grid, so counting it here
  // made every badge for its category one too high.
  const categoryCount = useMemo(() => {
    const map = new Map<string, number>();
    posts.slice(1).forEach((p) => map.set(p.category, (map.get(p.category) || 0) + 1));
    return map;
  }, []);

  // Crawlable archive of every guide.
  //
  // The grid above is paginated in the browser, so the server-rendered HTML
  // only ever carried the lead post plus the first PER_PAGE cards. The other
  // 146 guides had no href a crawler (or a reader without JavaScript) could
  // follow, and the category filter is button-driven, so they were reachable
  // by sitemap alone.
  //
  // Rather than splitting this page into a server shell plus a client island,
  // the archive is rendered unconditionally inside the same component. It is
  // not tied to any piece of state, so it ships complete in the initial HTML
  // while the grid, search, filters and "load more" keep working exactly as
  // before. Groups come from the post data itself, not ALL_CATEGORIES, so
  // categories missing from the filter row still get their links crawled.
  const archive = useMemo(() => {
    const groups = new Map<string, typeof posts>();
    posts.forEach((p) => {
      const list = groups.get(p.category);
      if (list) list.push(p);
      else groups.set(p.category, [p]);
    });
    return [...groups.entries()];
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
                type="button"
                aria-pressed={activeCat === cat}
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
                    type="button"
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

      <section className="section-pad bg-white border-t border-border" aria-labelledby="all-guides">
        <div className="container-main">
          <h2 id="all-guides" className="text-xl font-bold text-text">All guides</h2>
          <p className="text-sm text-text-muted mt-2 max-w-[640px]">
            The complete index, grouped by topic. Every guide on the site is linked here.
          </p>
          <div className="mt-8 space-y-8">
            {archive.map(([category, items]) => (
              <div key={category}>
                <h3 className="eyebrow text-brand">
                  {category} <span className="text-text-muted">({items.length})</span>
                </h3>
                <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="text-sm text-text-muted hover:text-brand transition-colors"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-gradient-invert text-white text-center">
        <div className="container-main max-w-[640px]">
          <h2 className="text-2xl font-bold">Stay Updated</h2>
          <p className="text-white/60 mt-3 text-sm">Get the latest guides and money tips delivered to your inbox.</p>
          {subscribed ? (
            <p className="mt-6 text-sm text-white" role="status">
              Your email app should have opened with the request. If it did not, write to{" "}
              <span className="font-semibold">{site.email}</span> and we will add you.
            </p>
          ) : (
            <form className="mt-6 flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto" onSubmit={subscribe}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 h-11 rounded-input px-4 text-sm text-text bg-white outline-none"
              />
              <button type="submit" className="h-11 rounded-pill bg-white text-brand px-6 text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">Subscribe</button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
