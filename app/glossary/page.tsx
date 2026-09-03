"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { site } from "@/lib/site";
import { GLOSSARY, GLOSSARY_CATEGORIES } from "@/lib/glossary";
import { Search, ArrowRight } from "lucide-react";
import { Pill, Breadcrumb, EmptyState } from "@/components/ui";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Page() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState("");

  const filtered = useMemo(() => {
    let result = GLOSSARY;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.term.toLowerCase().includes(q) || t.short.toLowerCase().includes(q));
    }
    if (activeLetter) {
      result = result.filter((t) => t.term.startsWith(activeLetter));
    }
    return result;
  }, [search, activeLetter]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof GLOSSARY>();
    for (const cat of GLOSSARY_CATEGORIES) {
      const items = filtered.filter((t) => t.category === cat);
      if (items.length) map.set(cat, items);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <section className="section-pad bg-white">
        <div className="container-main">
          <Breadcrumb items={[{ label: "Glossary" }]} />
          <Pill>{GLOSSARY.length} terms explained</Pill>
          <h1 className="h1 text-text mt-3">Finance & AI Glossary</h1>
          <p className="body text-text-muted mt-3 max-w-[640px]">
            Money and AI are full of jargon. This glossary defines every key investing, tax, banking and AI
            term in plain English: SIP, EMI, CAGR, LTCG, NAV, XIRR, LLM and more. Each entry gives a short
            definition, a worked example, and a link to the calculator or guide that puts it to use. Search
            by keyword or browse alphabetically below.
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
              onChange={(e) => { setSearch(e.target.value); setActiveLetter(""); }}
              placeholder="Search glossary..."
              className="w-full h-10 pl-10 pr-4 rounded-input border border-border text-sm bg-bg focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
            />
          </div>
          <div role="group" aria-label="Filter terms by first letter" className="flex items-center gap-1 overflow-x-auto pb-1">
            {ALPHABETS.map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={activeLetter === l}
                onClick={() => { setActiveLetter(activeLetter === l ? "" : l); setSearch(""); }}
                className={`w-8 h-8 shrink-0 rounded-input text-xs font-medium transition-colors ${
                  activeLetter === l ? "bg-brand text-white" : "text-text-muted hover:text-brand hover:bg-brand/10"
                }`}
              >
                {l}
              </button>
            ))}
            {activeLetter && (
              <button type="button" onClick={() => setActiveLetter("")} className="text-xs text-text-muted hover:text-brand ml-2">Clear</button>
            )}
          </div>
        </div>
      </div>

      <section className="section-pad bg-bg-alt">
        <div className="container-main space-y-16">
          {grouped.size === 0 && (
            <EmptyState
              message="No glossary terms match your search."
              onClear={() => { setSearch(""); setActiveLetter(""); }}
            />
          )}
          {[...grouped.entries()].map(([cat, items]) => (
            <section key={cat}>
              <h2 className="h3 text-text mb-6">{cat}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((t) => (
                  <Link key={t.slug} href={`/glossary/${t.slug}`} className="card card-h-full p-4 min-h-[100px]">
                    <p className="text-sm font-semibold text-text">{t.term}</p>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">{t.short}</p>
                    <span className="mt-auto pt-2 inline-flex items-center gap-1 text-xs text-brand font-medium">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
