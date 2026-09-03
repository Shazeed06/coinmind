"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { Section } from "@/components/ui";
import SectionIntro from "./SectionIntro";
import { GLOSSARY } from "@/lib/glossary";
import { ArrowRight } from "lucide-react";

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const TERMS = GLOSSARY.slice(0, 12);

const letterCounts: Record<string, number> = {};
ALPHABETS.forEach((l) => {
  letterCounts[l] = GLOSSARY.filter((t) => t.term.toUpperCase().startsWith(l)).length;
});

export default function FinanceGlossary() {
  const [activeLetter, setActiveLetter] = useState("");

  const filtered = useMemo(() => {
    if (!activeLetter) return TERMS;
    return TERMS.filter((t) => t.term.toUpperCase().startsWith(activeLetter));
  }, [activeLetter]);

  return (
    <Section variant="white">
      <SectionIntro
        eyebrow="Glossary"
        title="A-Z Finance Terms"
        subline="Plain-English definitions of key finance and AI terms."
      />

      <div className="flex flex-wrap gap-1 justify-center mb-10" role="group" aria-label="Filter by letter">
        {ALPHABETS.map((l) => {
          const hasTerms = letterCounts[l] > 0;
          const isActive = activeLetter === l;
          return (
            <button
              key={l}
              onClick={() => setActiveLetter(isActive ? "" : l)}
              className={`w-8 h-8 rounded-input text-xs font-medium transition-colors ${
                isActive
                  ? "bg-brand text-white"
                  : hasTerms
                    ? "text-text-muted hover:text-brand hover:bg-brand/10"
                    : "text-text-muted/40 pointer-events-none"
              }`}
              aria-disabled={!hasTerms || undefined}
              aria-pressed={isActive || undefined}
            >
              {l}
            </button>
          );
        })}
      </div>

      {/* Most letters match none of the twelve featured terms, so the empty
          state is the common case, not a rare one. A bare centred sentence
          collapsed the section to a sliver and the page jumped every time a
          letter was pressed. The dashed panel holds roughly one card row of
          height so the layout stays put. */}
      {filtered.length === 0 ? (
        <div className="flex min-h-[112px] items-center justify-center rounded-card border border-dashed border-border bg-bg-alt/60 px-6 py-10 text-center">
          <p className="text-sm text-text-muted">No terms found for this letter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {filtered.map((t) => (
            <Link
              key={t.slug}
              href={`/glossary/${t.slug}`}
              className="card flex flex-col h-full p-4 min-h-[112px]"
            >
              <p className="text-[15px] font-semibold text-text">{t.term}</p>
              <p className="text-[13px] leading-relaxed text-text-muted mt-1.5 line-clamp-2 flex-1">{t.short}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/glossary"
          className="inline-flex items-center gap-2 rounded-pill border border-border px-6 py-3 text-sm font-medium text-text hover:border-brand hover:text-brand transition-colors"
        >
          Browse full glossary <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
