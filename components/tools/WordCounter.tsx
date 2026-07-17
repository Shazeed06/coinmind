"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Word / Character Counter — 100% client-side, live stats.          */
/*  No uploads, no libraries: everything is computed in the browser   */
/*  as you type.                                                      */
/* ------------------------------------------------------------------ */

const WORDS_PER_MINUTE_READING = 200;
const WORDS_PER_MINUTE_SPEAKING = 130;

/* Common English stop-words excluded from the "top keywords" list. */
const STOP_WORDS = new Set([
  "the", "a", "an", "and", "or", "but", "if", "then", "so", "of", "at", "by",
  "for", "with", "about", "as", "into", "to", "from", "in", "on", "off", "out",
  "over", "under", "is", "am", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "shall", "should",
  "can", "could", "may", "might", "must", "this", "that", "these", "those",
  "i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them",
  "my", "your", "his", "its", "our", "their", "mine", "yours", "not", "no",
  "yes", "up", "down", "just", "than", "too", "very", "s", "t", "can't", "don't",
]);

type Stats = {
  words: number;
  charsWithSpaces: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingMinutes: number;
  speakingMinutes: number;
  keywords: { word: string; count: number }[];
};

/** Turn a fractional-minute duration into a compact "1m 20s" style label. */
function formatDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return "0s";
  const totalSeconds = Math.max(1, Math.round(minutes * 60));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

function computeStats(text: string): Stats {
  const trimmed = text.trim();

  const wordTokens = trimmed.length ? trimmed.split(/\s+/) : [];
  const words = wordTokens.length;

  const charsWithSpaces = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;

  const sentences = trimmed
    ? trimmed.split(/[.!?…]+/).filter((s) => s.trim().length > 0).length
    : 0;

  const paragraphs = trimmed
    ? text.split(/\n+/).filter((p) => p.trim().length > 0).length
    : 0;

  const readingMinutes = words / WORDS_PER_MINUTE_READING;
  const speakingMinutes = words / WORDS_PER_MINUTE_SPEAKING;

  // Word-frequency for the "top keywords" list.
  const freq = new Map<string, number>();
  for (const raw of wordTokens) {
    const word = raw.toLowerCase().replace(/[^a-z0-9'-]/g, "");
    if (word.length < 3 || STOP_WORDS.has(word)) continue;
    freq.set(word, (freq.get(word) ?? 0) + 1);
  }
  const keywords = [...freq.entries()]
    .filter(([, count]) => count > 1)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([word, count]) => ({ word, count }));

  return {
    words,
    charsWithSpaces,
    charsNoSpaces,
    sentences,
    paragraphs,
    readingMinutes,
    speakingMinutes,
    keywords,
  };
}

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

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => computeStats(text), [text]);
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
    { value: nf.format(stats.words), label: "Words" },
    { value: nf.format(stats.charsWithSpaces), label: "Characters" },
    { value: nf.format(stats.charsNoSpaces), label: "Characters (no spaces)" },
    { value: nf.format(stats.sentences), label: "Sentences" },
    { value: nf.format(stats.paragraphs), label: "Paragraphs" },
    { value: formatDuration(stats.readingMinutes), label: "Reading time" },
    { value: formatDuration(stats.speakingMinutes), label: "Speaking time" },
  ];

  return (
    <div className="space-y-6">
      {/* Editor card */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label
            htmlFor="wc-input"
            className="text-sm font-medium text-ink-soft"
          >
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
          id="wc-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here to count words and characters…"
          spellCheck={false}
          className="mt-4 min-h-[280px] w-full resize-y rounded-xl border border-line bg-paper-2 p-4 text-base leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-forest"
        />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => (
          <StatCard key={c.label} value={c.value} label={c.label} />
        ))}
      </div>

      {/* Top keywords */}
      {stats.keywords.length > 0 && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-display text-lg font-600 text-ink">
            Top keywords
          </h2>
          <p className="mt-1 text-sm text-ink-faint">
            Most frequent words &mdash; handy for checking keyword density.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {stats.keywords.map((k) => (
              <span
                key={k.word}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-2 px-3 py-1.5 text-sm text-ink-soft"
              >
                <span className="font-medium text-ink">{k.word}</span>
                <span className="rounded-full bg-forest-soft px-1.5 text-xs font-semibold text-forest">
                  {k.count}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
