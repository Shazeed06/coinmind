"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { calculators, type Calculator as CalcType } from "@/lib/data";
import { Calculator, ArrowRight, Search } from "lucide-react";
import { Pill } from "@/components/ui";
import { EmptyState } from "@/components/ui";

const CATEGORIES = ["All", "Investing", "Loans", "Tax", "Savings", "Utility", "Health"] as const;
const REGIONS = ["All", "India", "Global"] as const;

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
    return calculators.filter((c) => {
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
  const healthCalcs = calculators.filter((c) => c.category === "Health");

  return (
    <div>
      <section className="section-pad bg-white">
        <div className="container-main">
          <Pill>Calculators</Pill>
          <h1 className="h1 text-text mt-3">
            {calculators.filter((c) => c.live).length} Free Financial Calculators
          </h1>
          <p className="body text-text-muted mt-3 max-w-[640px]">
            Free, private and instant financial calculators for India: SIP, EMI, income tax, FD, PPF, NPS,
            retirement, GST and more. Every calculator runs entirely in your browser, so the numbers you
            enter are never uploaded or stored. Results support INR, USD and GBP, and each tool shows the
            formula behind the answer. No sign-up required.
          </p>
        </div>
      </section>

      <div className="sticky top-16 sm:top-20 z-40 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="container-main py-3 space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search calculators..."
              className="w-full h-10 pl-10 pr-4 rounded-input border border-border text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCat(cat); setActiveRegion("All"); }}
                className={`whitespace-nowrap rounded-pill px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeCat === cat
                    ? "bg-brand text-white"
                    : "bg-bg-alt text-text-muted hover:text-text border border-border"
                }`}
              >
                {cat === "All" ? "All" : cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-xs opacity-60">({calculators.filter((c) => c.category === cat).length})</span>
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {REGIONS.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`text-xs rounded-pill px-2.5 py-1 font-medium transition-colors ${
                  activeRegion === r ? "bg-brand/10 text-brand" : "text-text-muted hover:text-text"
                }`}
              >
                {r}
              </button>
            ))}
            <span className="text-xs text-text-muted ml-auto">{filtered.length} calculators</span>
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
                    const count = calculators.filter((c) => c.category === cat).length;
                    return (
                      <button
                        key={cat}
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
                        {(items.length > cols ? padRow(items, cols) : items).map((c, i) =>
                          c ? (
                            <Link key={c.slug} href={c.live ? `/calculators/${c.slug}` : "#"} className="card card-h-full p-5 group" {...(c.live ? {} : {})}>
                              <div className="flex items-start justify-between">
                                <Calculator className="h-10 w-10 text-brand" />
                                <Pill>{c.region === "IN" ? "India" : "Global"}</Pill>
                              </div>
                              <div className="card-body mt-3">
                                <h3 className="text-base font-semibold text-text">{c.title}</h3>
                                <p className="text-sm text-text-muted mt-1 line-clamp-2">{c.blurb}</p>
                              </div>
                              <div className="card-footer">
                                {c.live ? (
                                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                                    Open <ArrowRight className="h-4 w-4" />
                                  </span>
                                ) : (
                                  <span className="text-xs text-text-muted">Coming soon</span>
                                )}
                              </div>
                            </Link>
                          ) : (
                            <div key={`spacer-${i}`} className="hidden sm:block" />
                          )
                        )}
                      </div>
                    </section>
                  );
                })}

                {!isHealthOnly && healthCalcs.length > 0 && (
                  <section className="pt-8 border-t border-border">
                    <h2 className="h3 text-text-muted/60 mb-4">Other Free Calculators</h2>
                    <p className="text-sm text-text-muted mb-6">Health and general-purpose calculators, not strictly finance, but useful to have.</p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {healthCalcs.map((c) => (
                        <Link key={c.slug} href={`/calculators/${c.slug}`} className="card card-h-full p-4 opacity-75 hover:opacity-100 transition-opacity">
                          <Calculator className="h-6 w-6 text-text-muted" />
                          <h3 className="text-sm font-semibold text-text mt-2">{c.title}</h3>
                          <p className="text-xs text-text-muted mt-1 line-clamp-2">{c.blurb}</p>
                        </Link>
                      ))}
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
