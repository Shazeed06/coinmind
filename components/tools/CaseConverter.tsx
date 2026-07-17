"use client";

import { useCallback, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Case Converter — transforms text between common letter cases.     */
/*  Runs entirely in the browser; nothing is uploaded or stored.      */
/* ------------------------------------------------------------------ */

/** Split any input into clean word tokens, honouring camelCase, snake_case,
 *  kebab-case and normal spacing so the programmer cases re-join correctly. */
function toWords(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2") // camelCase boundary
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // ACRONYMWord boundary
    .replace(/[_\-]+/g, " ") // snake_case / kebab-case
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

/** Capitalise the first letter of a word, lowercasing the rest. */
function capitalise(word: string): string {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

const TRANSFORMS: { label: string; run: (text: string) => string }[] = [
  { label: "UPPERCASE", run: (t) => t.toUpperCase() },
  { label: "lowercase", run: (t) => t.toLowerCase() },
  {
    // Capitalise the first letter of every word.
    label: "Title Case",
    run: (t) =>
      t.replace(/\S+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  },
  {
    // Capitalise the first letter of each sentence; lowercase the rest.
    label: "Sentence case",
    run: (t) =>
      t
        .toLowerCase()
        .replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, (m) => m.toUpperCase()),
  },
  {
    label: "camelCase",
    run: (t) =>
      toWords(t)
        .map((w, i) => (i === 0 ? w.toLowerCase() : capitalise(w)))
        .join(""),
  },
  {
    label: "PascalCase",
    run: (t) => toWords(t).map(capitalise).join(""),
  },
  {
    label: "snake_case",
    run: (t) =>
      toWords(t)
        .map((w) => w.toLowerCase())
        .join("_"),
  },
  {
    label: "kebab-case",
    run: (t) =>
      toWords(t)
        .map((w) => w.toLowerCase())
        .join("-"),
  },
  {
    // aLtErNaTiNg — toggle on each letter, starting lowercase.
    label: "aLtErNaTiNg",
    run: (t) => {
      let i = 0;
      return Array.from(t)
        .map((ch) => {
          if (!/[a-z]/i.test(ch)) return ch;
          const out = i % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase();
          i += 1;
          return out;
        })
        .join("");
    },
  },
  {
    // InVeRsE — swap the case of every letter.
    label: "InVeRsE case",
    run: (t) =>
      Array.from(t)
        .map((ch) => {
          if (/[a-z]/.test(ch)) return ch.toUpperCase();
          if (/[A-Z]/.test(ch)) return ch.toLowerCase();
          return ch;
        })
        .join(""),
  },
];

export default function CaseConverter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const apply = useCallback((run: (t: string) => string) => {
    setText((prev) => run(prev));
    setCopied(false);
  }, []);

  const clear = useCallback(() => {
    setText("");
    setCopied(false);
  }, []);

  const copy = useCallback(async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, [text]);

  const { chars, words } = useMemo(() => {
    const trimmed = text.trim();
    return {
      chars: text.length,
      words: trimmed ? trimmed.split(/\s+/).length : 0,
    };
  }, [text]);

  const empty = text.length === 0;

  return (
    <div className="space-y-5">
      {/* Input card */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="case-input"
            className="text-sm font-medium text-ink-soft"
          >
            Your text
          </label>
          <p className="text-xs text-ink-faint" aria-live="polite">
            {chars.toLocaleString()} character{chars === 1 ? "" : "s"}
            {" · "}
            {words.toLocaleString()} word{words === 1 ? "" : "s"}
          </p>
        </div>
        <textarea
          id="case-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setCopied(false);
          }}
          rows={8}
          spellCheck={false}
          placeholder="Type or paste your text here, then pick a case below…"
          className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
        />

        {/* Transform buttons — preset-style toggles */}
        <div className="mt-4 flex flex-wrap gap-2">
          {TRANSFORMS.map((t) => (
            <button
              key={t.label}
              type="button"
              onClick={() => apply(t.run)}
              className="rounded-lg border border-line-strong bg-card px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Copy / Clear */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5">
          <button
            type="button"
            onClick={copy}
            disabled={empty}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={empty}
            className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
