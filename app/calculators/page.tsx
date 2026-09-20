"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { calculators, type Calculator as CalcType } from "@/lib/data";
import { Calculator, ArrowRight, Search, Shield, Zap } from "lucide-react";
import { EmptyState } from "@/components/ui";

// Only calculators that actually have a page. The retired medical ones are
// still in the data with live: false and next.config.ts 308-redirects their
// URLs back here, so listing them handed people links that bounced them
// straight back to this page.
const LIVE = calculators.filter((c) => c.live);

const ALL_CATEGORIES = ["Investing", "Loans", "Tax", "Savings", "Utility", "Health"] as const;
const CATEGORIES = ["All", ...ALL_CATEGORIES.filter((cat) => LIVE.some((c) => c.category === cat))];
// The button labels people read, mapped to the region codes stored on each
// calculator. "India" is shown, "IN" is what the data actually holds.
const REGIONS = [
  { label: "All", value: "All" },
  { label: "India", value: "IN" },
  { label: "Global", value: "Global" },
] as const;

function padRow<T>(items: T[], cols: number): (T | null)[] {
  const remainder = items.length % cols;
  if (remainder === 0) return items;
  return [...items, ...Array(cols - remainder).fill(null)];
}

export default function Page() {
  const [activeCat, setActiveCat] = useState("All");
  const [activeRegion, setActiveRegion] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return LIVE.filter((c) => {
      if (activeCat !== "All" && c.category !== activeCat) return false;
      if (activeRegion !== "All" && c.region !== activeRegion) return false;
      if (search) {
        const q = search.toLowerCase();
        return c.title.toLowerCase().includes(q) || c.blurb.toLowerCase().includes(q) || c.keywords.some((k) => k.includes(q));
      }
      return true;
    });
  }, [activeCat, activeRegion, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, CalcType[]>();
    const cats = activeCat === "All" ? CATEGORIES.slice(1) : [activeCat];
    for (const cat of cats) {
      const items = filtered.filter((c) => c.category === cat);
      if (items.length) map.set(cat, items);
    }
    return map;
  }, [filtered, activeCat]);

  const isHealthOnly = activeCat === "Health";
  // Health calculators live in their own trailing section, but they still have to
  // respect the search box and the category/region filters like everything else.
  const healthCalcs = filtered.filter((c) => c.category === "Health");

  return (
    <div>
      {/* Dark premium hero */}
      <section className="relative bg-[#0c1628] overflow-hidden">
        {/* Top accent bar */}
        <div className="h-[2px] bg-gradient-to-r from-[#2f5bea] via-[#16a34a] to-[#2f5bea]" />

        {/* Background decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#2f5bea]/8 blur-3xl" />
          <div className="absolute top-10 left-1/3 h-[300px] w-[300px] rounded-full bg-[#16a34a]/6 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-[200px] w-[400px] rounded-full bg-[#2f5bea]/5 blur-3xl" />
        </div>

        <div className="relative container-main py-16 sm:py-20">
          {/* Eyebrow chip */}
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#4ade80] bg-[#16a34a]/10 border border-[#16a34a]/30 rounded-full px-3 py-1 mb-5">
            <Zap className="h-3 w-3" />
            Free Calculators
          </span>

          {/* Heading — must use inline color: h1 global CSS overrides text-white utility */}
          <h1
            style={{ color: "#ffffff" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-[760px] leading-[1.1]"
          >
            {LIVE.length}+ Free Financial<br className="hidden sm:block" />
            <span style={{ color: "#4ade80" }}> Calculators</span> for India
          </h1>

          <p className="mt-5 text-slate-400 max-w-[560px] leading-relaxed text-base sm:text-lg">
            SIP, EMI, income tax, FD, PPF, NPS, retirement, GST and more. Every calculator runs entirely in your browser — no sign-up, no data stored.
          </p>

          {/* Trust stat pills */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { icon: <Zap className="h-3.5 w-3.5 text-[#4ade80]" />, value: `${LIVE.length}+`, label: "Calculators" },
              { icon: <Shield className="h-3.5 w-3.5 text-[#4ade80]" />, value: "100%", label: "Free forever" },
              { icon: <Shield className="h-3.5 w-3.5 text-[#4ade80]" />, value: "0", label: "Sign-ups needed" },
              { icon: <Shield className="h-3.5 w-3.5 text-[#4ade80]" />, value: "0", label: "Data uploaded" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                {s.icon}
                <span className="text-base font-bold" style={{ color: "#ffffff" }}>{s.value}</span>
                <span className="text-slate-400 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky top-16 sm:top-[68px] z-40 bg-white/96 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container-main py-3 space-y-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 53+ calculators..."
              className="w-full h-10 pl-10 pr-4 rounded-lg border border-border text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-colors"
            />
          </div>
          {/* Category chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={activeCat === cat}
                onClick={() => { setActiveCat(cat); setActiveRegion("All"); }}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeCat === cat
                    ? "bg-[#0c1628] text-white shadow-sm"
                    : "bg-bg-alt text-text-muted hover:text-text hover:bg-slate-100 border border-border"
                }`}
              >
                {cat === "All" ? "All categories" : cat}
                {cat !== "All" && (
                  <span className={`ml-1 text-[10px] ${activeCat === cat ? "opacity-70" : "opacity-50"}`}>
                    {LIVE.filter((c) => c.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
          {/* Region + count */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-text-muted mr-1">Region:</span>
            {REGIONS.map((r) => (
              <button
                key={r.value}
                type="button"
                aria-pressed={activeRegion === r.value}
                onClick={() => setActiveRegion(r.value)}
                className={`text-xs rounded-full px-2.5 py-0.5 font-medium transition-colors ${
                  activeRegion === r.value ? "bg-brand/10 text-brand font-semibold" : "text-text-muted hover:text-text"
                }`}
              >
                {r.label}
              </button>
            ))}
            <span className="text-xs text-text-muted ml-auto font-medium">{filtered.length} calculators</span>
          </div>
        </div>
      </div>

      <section className="section-pad bg-bg-alt">
        <div className="container-main">
          {filtered.length === 0 ? (
            <EmptyState message="No calculators match your filters." onClear={() => { setSearch(""); setActiveCat("All"); setActiveRegion("All"); }} />
          ) : (
            <div className="grid lg:grid-cols-12 gap-8">
              <aside className="hidden lg:block lg:col-span-3">
                <nav className="sticky top-40 space-y-1">
                  <p className="eyebrow text-text-muted mb-2">Categories</p>
                  {CATEGORIES.slice(1).map((cat) => {
                    const count = LIVE.filter((c) => c.category === cat).length;
                    return (
                      <button
                        key={cat}
                        type="button"
                        aria-pressed={activeCat === cat}
                        onClick={() => setActiveCat(cat)}
                        className={`w-full text-left text-sm py-2 px-3 rounded-input transition-colors ${
                          activeCat === cat ? "bg-brand/10 text-brand font-medium" : "text-text-muted hover:text-text hover:bg-bg"
                        }`}
                      >
                        {cat} <span className="text-xs opacity-60">({count})</span>
                      </button>
                    );
                  })}
                </nav>
              </aside>

              <div className="lg:col-span-9 space-y-16">
                {[...grouped.entries()].map(([cat, items]) => {
                  if (cat === "Health" && !isHealthOnly) return null;
                  const cols = cat === "Health" ? 2 : 3;
                  return (
                    <section key={cat} id={`cat-${cat}`} style={{ scrollMarginTop: "8rem" }}>
                      <h2 className="h3 text-text mb-6 sticky top-[7.5rem] sm:top-[9rem] bg-bg-alt py-2 z-10">{cat}</h2>
                      <div className={`grid sm:grid-cols-2 gap-6 ${cols === 3 ? "lg:grid-cols-3" : ""}`}>
                        {(items.length > cols ? padRow(items, cols) : items).map((c, i) => {
                          if (!c) return <div key={`spacer-${i}`} className="hidden sm:block" />;
                          const catAccent: Record<string, string> = {
                            Investing: "from-[#2f5bea]/15 to-[#2f5bea]/5 border-[#2f5bea]/20",
                            Tax: "from-[#16a34a]/15 to-[#16a34a]/5 border-[#16a34a]/20",
                            Loans: "from-amber-500/15 to-amber-500/5 border-amber-500/20",
                            Savings: "from-violet-500/15 to-violet-500/5 border-violet-500/20",
                            Utility: "from-slate-400/15 to-slate-400/5 border-slate-400/20",
                          };
                          const iconColor: Record<string, string> = {
                            Investing: "text-[#2f5bea]",
                            Tax: "text-[#16a34a]",
                            Loans: "text-amber-500",
                            Savings: "text-violet-500",
                            Utility: "text-slate-500",
                          };
                          const inner = (
                            <>
                              <div className="flex items-start justify-between">
                                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${catAccent[c.category] ?? "from-brand/15 to-brand/5 border-brand/20"} border flex items-center justify-center`}>
                                  <Calculator className={`h-5 w-5 ${iconColor[c.category] ?? "text-brand"}`} />
                                </div>
                                <span className="text-[10px] font-semibold text-text-muted border border-border rounded-full px-2 py-0.5">
                                  {c.region === "IN" ? "India" : "Global"}
                                </span>
                              </div>
                              <div className="card-body mt-3">
                                <h3 className="text-base font-semibold text-text">{c.title}</h3>
                                <p className="text-sm text-text-muted mt-1 line-clamp-2">{c.blurb}</p>
                              </div>
                              <div className="card-footer">
                                {c.live ? (
                                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand group-hover:gap-2 transition-all">
                                    Open <ArrowRight className="h-4 w-4" />
                                  </span>
                                ) : (
                                  <span className="text-xs text-text-muted">Coming soon</span>
                                )}
                              </div>
                            </>
                          );
                          // A calculator that is not built yet has nowhere to go, so it stays a
                          // plain card rather than a link to "#" that silently does nothing.
                          return c.live ? (
                            <Link key={c.slug} href={`/calculators/${c.slug}`} className="card card-h-full p-5 group">
                              {inner}
                            </Link>
                          ) : (
                            <div key={c.slug} aria-disabled="true" className="card card-h-full p-5 opacity-60">
                              {inner}
                            </div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}

                {!isHealthOnly && healthCalcs.length > 0 && (
                  <section className="pt-8 border-t border-border">
                    <h2 className="h3 text-text-muted/60 mb-4">Other Free Calculators</h2>
                    <p className="text-sm text-text-muted mb-6">Health and general-purpose calculators, not strictly finance, but useful to have.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {healthCalcs.map((c) => {
                        const inner = (
                          <>
                            <Calculator className="h-6 w-6 text-text-muted" />
                            <h3 className="text-sm font-semibold text-text mt-2">{c.title}</h3>
                            <p className="text-xs text-text-muted mt-1 line-clamp-2">{c.blurb}</p>
                          </>
                        );
                        // Same rule as the main grid above: the retired health
                        // calculators are live:false and next.config.ts redirects
                        // their URLs back to this page, so linking them would
                        // publish links that bounce the reader straight back here.
                        return c.live ? (
                          <Link key={c.slug} href={`/calculators/${c.slug}`} className="card card-h-full p-4 opacity-75 hover:opacity-100 transition-opacity">
                            {inner}
                          </Link>
                        ) : (
                          <div key={c.slug} aria-disabled="true" className="card card-h-full p-4 opacity-60">
                            {inner}
                            <p className="text-xs text-text-muted mt-2">Coming soon</p>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
