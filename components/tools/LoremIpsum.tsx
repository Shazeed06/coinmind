"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Lorem Ipsum Generator — classic placeholder text, made to order.  */
/*  Choose paragraphs, sentences or words; optionally begin with the  */
/*  traditional "Lorem ipsum dolor sit amet…" opening. 100% in-browser*/
/* ------------------------------------------------------------------ */

const WORD_BANK = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing",
  "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore",
  "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis",
  "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex",
  "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit",
  "voluptate", "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur",
  "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt",
  "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est",
  "laborum", "at", "vero", "eos", "accusamus", "iusto", "odio", "dignissimos",
  "ducimus", "blanditiis", "praesentium", "voluptatum", "deleniti", "atque",
  "corrupti", "quos", "dolores", "quas", "molestias", "excepturi", "sint",
  "occaecati", "cupiditate", "similique", "mollitia", "animi", "dolorem",
  "quibusdam", "harum", "quidem", "rerum", "facilis", "expedita", "distinctio",
];

const LOREM_START = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

type Unit = "paragraphs" | "sentences" | "words";

function randInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function pickWord(): string {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}

function capitalise(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/** Build one sentence of 6-14 words with the odd comma, capitalised and
 *  full-stopped. */
function makeSentence(): string {
  const length = randInt(6, 14);
  const words: string[] = [];
  for (let i = 0; i < length; i++) words.push(pickWord());
  // Sprinkle a comma somewhere in the middle for a natural rhythm.
  if (length > 6 && Math.random() < 0.5) {
    const at = randInt(2, length - 3);
    words[at] += ",";
  }
  return `${capitalise(words[0])} ${words.slice(1).join(" ")}.`;
}

function makeParagraph(): string {
  const count = randInt(3, 6);
  const sentences: string[] = [];
  for (let i = 0; i < count; i++) sentences.push(makeSentence());
  return sentences.join(" ");
}

function generate(unit: Unit, count: number, startWithLorem: boolean): string {
  const n = Math.max(1, Math.min(count, 200));

  if (unit === "words") {
    const words: string[] = [];
    if (startWithLorem) {
      words.push(...LOREM_START.replace(/,/g, "").split(" "));
    }
    while (words.length < n) words.push(pickWord());
    words.length = n;
    return `${capitalise(words[0])} ${words.slice(1).join(" ")}.`;
  }

  if (unit === "sentences") {
    const sentences: string[] = [];
    for (let i = 0; i < n; i++) sentences.push(makeSentence());
    if (startWithLorem) sentences[0] = `${LOREM_START}.`;
    return sentences.join(" ");
  }

  // Paragraphs
  const paragraphs: string[] = [];
  for (let i = 0; i < n; i++) paragraphs.push(makeParagraph());
  if (startWithLorem) {
    paragraphs[0] = `${LOREM_START}, ${paragraphs[0].charAt(0).toLowerCase()}${paragraphs[0].slice(1)}`;
  }
  return paragraphs.join("\n\n");
}

const UNITS: { id: Unit; label: string }[] = [
  { id: "paragraphs", label: "Paragraphs" },
  { id: "sentences", label: "Sentences" },
  { id: "words", label: "Words" },
];

export default function LoremIpsum() {
  const [unit, setUnit] = useState<Unit>("paragraphs");
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [nonce, setNonce] = useState(0);
  const [copied, setCopied] = useState(false);

  // Re-generates whenever an option changes or the nonce is bumped.
  const output = useMemo(
    () => generate(unit, count, startWithLorem),
    [unit, count, startWithLorem, nonce],
  );

  const copy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line bg-card p-6">
        {/* Unit toggle */}
        <p className="text-sm font-medium text-ink-soft">Generate</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {UNITS.map((u) => {
            const active = unit === u.id;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => setUnit(u.id)}
                aria-pressed={active}
                className={
                  active
                    ? "rounded-lg border border-forest bg-forest px-3.5 py-2 text-sm font-semibold text-white transition-colors"
                    : "rounded-lg border border-line-strong bg-card px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
                }
              >
                {u.label}
              </button>
            );
          })}
        </div>

        {/* Count + Lorem toggle */}
        <div className="mt-5 flex flex-wrap items-end gap-5">
          <div>
            <label
              htmlFor="li-count"
              className="text-sm font-medium text-ink-soft"
            >
              How many ({unit})
            </label>
            <input
              id="li-count"
              type="number"
              min={1}
              max={200}
              value={count}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                setCount(Number.isFinite(v) ? Math.max(1, Math.min(v, 200)) : 1);
              }}
              className="mt-2 w-28 rounded-xl border border-line-strong bg-paper-2 px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-forest tabular-nums"
            />
          </div>

          <label className="inline-flex cursor-pointer items-center gap-2.5 pb-2.5 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={startWithLorem}
              onChange={(e) => setStartWithLorem(e.target.checked)}
              className="h-4 w-4 accent-forest"
            />
            Start with &ldquo;Lorem ipsum&hellip;&rdquo;
          </label>
        </div>

        {/* Output */}
        <div className="mt-6">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-ink-soft">Result</p>
            <p className="text-xs text-ink-faint">
              {output.length.toLocaleString()} characters
            </p>
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            spellCheck={false}
            className="mt-2 w-full resize-y whitespace-pre-wrap rounded-xl border border-line bg-paper-2 px-4 py-3 text-sm leading-relaxed text-ink outline-none"
          />
        </div>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5">
          <button
            type="button"
            onClick={() => {
              setNonce((n) => n + 1);
              setCopied(false);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Regenerate
          </button>
          <button
            type="button"
            onClick={copy}
            className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
