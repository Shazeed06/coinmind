"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { calculators, posts } from "@/lib/data";
import { GLOSSARY } from "@/lib/glossary";
import { aiToolDetails } from "@/lib/aiToolDetails";
import { IconSearch, IconX, IconArrow } from "@/components/icons";

type Result = {
  title: string;
  href: string;
  desc: string;
  type: "Calculator" | "Guide" | "Glossary" | "AI Tool" | "Tool";
};

// `href` is only set for the handful of tools that live outside /tools/<slug>.
const toolNames: { slug: string; title: string; desc: string; href?: string }[] = [
  { slug: "compress-image", title: "Compress Image", desc: "Shrink JPG, PNG and WebP file sizes" },
  { slug: "image-converter", title: "Image Converter", desc: "Convert between JPG, PNG, WebP formats" },
  { slug: "image-to-pdf", title: "Image to PDF", desc: "Convert images to PDF documents" },
  { slug: "merge-pdf", title: "Merge PDF", desc: "Combine multiple PDFs into one file" },
  { slug: "split-pdf", title: "Split PDF", desc: "Extract pages from a PDF" },
  { slug: "resume-builder", title: "Resume Builder", desc: "Create ATS-friendly resume", href: "/resume-builder" },
  { slug: "password-generator", title: "Password Generator", desc: "Create secure passwords" },
  { slug: "qr-code-generator", title: "QR Code Generator", desc: "Custom QR codes with logo" },
  { slug: "invoice-generator", title: "Invoice Generator", desc: "Professional invoices as PDF" },
  { slug: "budget-planner", title: "Budget Planner", desc: "Track monthly income and expenses" },
  { slug: "ai-summarizer", title: "AI Text Summarizer", desc: "Summarize articles with AI" },
  { slug: "ai-paraphraser", title: "AI Paraphrasing Tool", desc: "Rewrite text with different tones" },
  { slug: "ai-grammar-checker", title: "AI Grammar Checker", desc: "Fix grammar and spelling" },
  { slug: "ai-email-writer", title: "AI Email Writer", desc: "Generate professional emails" },
  { slug: "word-counter", title: "Word Counter", desc: "Count words and characters" },
  { slug: "unit-converter", title: "Unit Converter", desc: "Convert length, weight, temperature" },
  { slug: "color-picker", title: "Color Picker", desc: "HEX, RGB and HSL color values" },
];

const allResults: Result[] = [
  ...calculators.filter((c) => c.live).map((c) => ({
    title: c.title, href: `/calculators/${c.slug}`, desc: c.blurb, type: "Calculator" as const,
  })),
  ...posts.map((p) => ({
    title: p.title, href: `/blog/${p.slug}`, desc: p.excerpt, type: "Guide" as const,
  })),
  ...toolNames.map((t) => ({
    title: t.title, href: t.href ?? `/tools/${t.slug}`, desc: t.desc, type: "Tool" as const,
  })),
  ...GLOSSARY.map((g) => ({
    title: g.term, href: `/glossary/${g.slug}`, desc: g.short, type: "Glossary" as const,
  })),
  ...aiToolDetails.map((d) => ({
    title: d.name, href: `/ai-tools/${d.slug}`,     desc: d.overview.slice(0, 120), type: "AI Tool" as const,
  })),
];

const typeColors: Record<string, string> = {
  Calculator: "bg-blue-soft text-blue",
  Guide: "bg-forest-soft text-forest",
  Glossary: "bg-amber-soft text-amber",
  "AI Tool": "bg-purple-soft text-purple",
  Tool: "bg-sky-soft text-sky",
};

export default function SearchClient() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seed from ?q= so the header's search box can hand off to this page. Read
  // from the URL after mount rather than via useSearchParams, which would put
  // this whole client tree behind a Suspense boundary for one optional value.
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, []);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    let items = allResults;
    if (typeFilter) items = items.filter((r) => r.type === typeFilter);
    if (!q) return items.slice(0, 50);
    const terms = q.split(/\s+/).filter(Boolean);
    return items
      .map((r) => {
        const haystack = `${r.title} ${r.desc}`.toLowerCase();
        const score = terms.filter((t) => haystack.includes(t)).length;
        return { ...r, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);
  }, [query, typeFilter]);

  const types = useMemo(() => {
    const set = new Set(allResults.map((r) => r.type));
    return Array.from(set);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-14">
      <h1 className="font-display text-3xl sm:text-4xl text-ink leading-tight mb-6">
        Search CoinMind
      </h1>

      <div className="relative mb-6">
        <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-muted" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search calculators, tools, guides, glossary..."
          className="w-full rounded-xl border border-line bg-white pl-12 pr-10 py-3.5 text-ink placeholder:text-ink-muted outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 text-base"
        />
        {query && (
          <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink">
            <IconX className="h-5 w-5" />
          </button>
        )}
      </div>

      <div role="group" aria-label="Filter results by type" className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          aria-pressed={typeFilter === null}
          onClick={() => setTypeFilter(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            typeFilter === null ? "bg-ink text-white" : "bg-line text-ink-soft hover:bg-line/80"
          }`}
        >
          All
        </button>
        {types.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={typeFilter === t}
            onClick={() => setTypeFilter(typeFilter === t ? null : t)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              typeFilter === t ? "bg-ink text-white" : "bg-line text-ink-soft hover:bg-line/80"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <p className="text-ink-soft text-center py-10">No results found for &ldquo;{query}&rdquo;.</p>
      ) : (
        <ul className="space-y-3">
          {results.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="block rounded-xl border border-line p-4 hover:border-forest/40 hover:bg-forest-soft/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <span className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${typeColors[r.type]}`}>
                      {r.type}
                    </span>
                    <h3 className="mt-1 font-semibold text-ink leading-snug">{r.title}</h3>
                    <p className="mt-0.5 text-sm text-ink-soft line-clamp-2">{r.desc}</p>
                  </div>
                  <IconArrow className="mt-2 h-4 w-4 flex-shrink-0 text-ink-muted" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
