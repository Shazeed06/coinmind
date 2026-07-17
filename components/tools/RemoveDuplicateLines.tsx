"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Remove Duplicate Lines — dedupe a list while keeping the first     */
/*  occurrence. Options for case-insensitivity, trimming, sorting and  */
/*  dropping blank lines. Entirely client-side; nothing is uploaded.   */
/* ------------------------------------------------------------------ */

type Options = {
  caseInsensitive: boolean;
  trim: boolean;
  sortOutput: boolean;
  removeEmpty: boolean;
};

type Result = { text: string; removed: number };

function dedupe(input: string, opts: Options): Result {
  if (input === "") return { text: "", removed: 0 };

  let lines = input.split("\n");
  if (opts.trim) lines = lines.map((l) => l.trim());
  if (opts.removeEmpty) lines = lines.filter((l) => l.trim().length > 0);

  const seen = new Set<string>();
  const out: string[] = [];
  let removed = 0;
  for (const line of lines) {
    const key = opts.caseInsensitive ? line.toLowerCase() : line;
    if (seen.has(key)) {
      removed++;
      continue;
    }
    seen.add(key);
    out.push(line);
  }

  if (opts.sortOutput) {
    out.sort((a, b) => a.localeCompare(b));
  }

  return { text: out.join("\n"), removed };
}

const OPTION_META: { id: keyof Options; label: string }[] = [
  { id: "caseInsensitive", label: "Case-insensitive" },
  { id: "trim", label: "Trim whitespace" },
  { id: "sortOutput", label: "Sort output (A–Z)" },
  { id: "removeEmpty", label: "Remove empty lines" },
];

export default function RemoveDuplicateLines() {
  const [input, setInput] = useState("");
  const [opts, setOpts] = useState<Options>({
    caseInsensitive: false,
    trim: false,
    sortOutput: false,
    removeEmpty: false,
  });
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => dedupe(input, opts), [input, opts]);

  const toggle = (id: keyof Options) => {
    setOpts((prev) => ({ ...prev, [id]: !prev[id] }));
    setCopied(false);
  };

  const copy = async () => {
    if (!result.text) return;
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const clear = () => {
    setInput("");
    setCopied(false);
  };

  const inputLines = input === "" ? 0 : input.split("\n").length;
  const outputLines = result.text === "" ? 0 : result.text.split("\n").length;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-line bg-card p-6">
        {/* Input */}
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="rdl-input"
            className="text-sm font-medium text-ink-soft"
          >
            Your list
          </label>
          <p className="text-xs text-ink-faint">
            {inputLines.toLocaleString()} line{inputLines === 1 ? "" : "s"}
          </p>
        </div>
        <textarea
          id="rdl-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setCopied(false);
          }}
          rows={8}
          spellCheck={false}
          placeholder="Paste your lines here, one per line…"
          className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
        />

        {/* Options */}
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          {OPTION_META.map((o) => (
            <label
              key={o.id}
              className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft"
            >
              <input
                type="checkbox"
                checked={opts[o.id]}
                onChange={() => toggle(o.id)}
                className="h-4 w-4 accent-forest"
              />
              {o.label}
            </label>
          ))}
        </div>

        {/* Removed count */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-forest bg-forest-soft px-3 py-1.5 text-sm font-semibold text-forest-deep">
            Removed {result.removed.toLocaleString()} duplicate
            {result.removed === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Output */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="rdl-output"
            className="text-sm font-medium text-ink-soft"
          >
            Cleaned output
          </label>
          <p className="text-xs text-ink-faint">
            {outputLines.toLocaleString()} line{outputLines === 1 ? "" : "s"}
          </p>
        </div>
        <textarea
          id="rdl-output"
          readOnly
          value={result.text}
          rows={8}
          spellCheck={false}
          placeholder="The deduplicated result will appear here…"
          className="mt-3 w-full resize-y rounded-xl border border-line bg-paper-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none"
        />
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copy}
            disabled={!result.text}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={!input}
            className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:opacity-50"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
