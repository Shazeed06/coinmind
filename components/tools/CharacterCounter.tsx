"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Character Counter — 100% client-side, live counts.                */
/*  No uploads, no libraries: characters, words, sentences and lines   */
/*  are computed in the browser as you type, plus live "used /         */
/*  remaining" meters for common platform limits.                      */
/* ------------------------------------------------------------------ */

type Counts = {
  charsWithSpaces: number;
  charsNoSpaces: number;
  words: number;
  sentences: number;
  lines: number;
};

function computeCounts(text: string): Counts {
  const trimmed = text.trim();
  return {
    charsWithSpaces: text.length,
    charsNoSpaces: text.replace(/\s/g, "").length,
    words: trimmed ? trimmed.split(/\s+/).length : 0,
    sentences: trimmed
      ? trimmed.split(/[.!?…]+/).filter((s) => s.trim().length > 0).length
      : 0,
    lines: text.length ? text.split(/\n/).length : 0,
  };
}

/* Common character limits. Twitter/X and SMS count every character,
   so the "used" figure below is characters-with-spaces. */
const LIMITS: { name: string; limit: number; note: string }[] = [
  { name: "Meta title", limit: 60, note: "Search-result page title" },
  { name: "SMS", limit: 160, note: "Single text message segment" },
  { name: "Meta description", limit: 160, note: "Search-result snippet" },
  { name: "Twitter / X", limit: 280, note: "Standard post length" },
  { name: "Instagram caption", limit: 2200, note: "Full caption limit" },
];

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper-2 p-4 text-center">
      <p className="font-display text-3xl font-600 text-forest tabular-nums leading-none">
        {value}
      </p>
      <p className="mt-2 text-xs font-medium text-ink-soft">{label}</p>
    </div>
  );
}

function LimitRow({
  name,
  note,
  used,
  limit,
  nf,
}: {
  name: string;
  note: string;
  used: number;
  limit: number;
  nf: Intl.NumberFormat;
}) {
  const remaining = limit - used;
  const over = remaining < 0;
  const pct = Math.min(100, (used / limit) * 100);

  return (
    <div className="rounded-xl border border-line bg-paper-2 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink">{name}</p>
          <p className="text-xs text-ink-faint">{note}</p>
        </div>
        <p
          className={`text-sm font-semibold tabular-nums ${over ? "text-berry" : "text-ink-soft"}`}
        >
          {nf.format(used)}
          <span className="text-ink-faint"> / {nf.format(limit)}</span>
        </p>
      </div>
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-line">
        <div
          className={`h-full rounded-full transition-all ${over ? "bg-berry" : "bg-forest"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p
        className={`mt-1.5 text-xs font-medium ${over ? "text-berry" : "text-ink-faint"}`}
        aria-live="polite"
      >
        {over
          ? `${nf.format(Math.abs(remaining))} over the limit`
          : `${nf.format(remaining)} remaining`}
      </p>
    </div>
  );
}

export default function CharacterCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const counts = useMemo(() => computeCounts(text), [text]);
  const nf = useMemo(() => new Intl.NumberFormat("en-US"), []);

  const copyText = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const clearText = () => {
    setText("");
    setCopied(false);
  };

  const cards: { value: string; label: string }[] = [
    { value: nf.format(counts.charsWithSpaces), label: "Characters" },
    { value: nf.format(counts.charsNoSpaces), label: "Characters (no spaces)" },
    { value: nf.format(counts.words), label: "Words" },
    { value: nf.format(counts.sentences), label: "Sentences" },
    { value: nf.format(counts.lines), label: "Lines" },
  ];

  return (
    <div className="space-y-6">
      {/* Editor card */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label htmlFor="cc-input" className="text-sm font-medium text-ink-soft">
            Your text
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyText}
              disabled={!text}
              className="inline-flex items-center rounded-lg border border-line-strong bg-card px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copied ? "Copied!" : "Copy text"}
            </button>
            <button
              type="button"
              onClick={clearText}
              disabled={!text}
              className="inline-flex items-center rounded-lg border border-line-strong bg-card px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              Clear
            </button>
          </div>
        </div>
        <textarea
          id="cc-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here to count characters…"
          spellCheck={false}
          className="mt-4 min-h-[240px] w-full resize-y rounded-xl border border-line bg-paper-2 p-4 text-base leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-forest"
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <StatCard key={c.label} value={c.value} label={c.label} />
        ))}
      </div>

      {/* Limit meters */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <h2 className="font-display text-lg font-600 text-ink">Platform limits</h2>
        <p className="mt-1 text-sm text-ink-faint">
          Live used / remaining counts against common character limits.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {LIMITS.map((l) => (
            <LimitRow
              key={l.name}
              name={l.name}
              note={l.note}
              used={counts.charsWithSpaces}
              limit={l.limit}
              nf={nf}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
