"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Text Compare / Diff — line-by-line comparison of two blocks of    */
/*  text using a classic LCS (longest common subsequence) diff.       */
/*  Added lines are tinted forest, removed lines berry. Everything    */
/*  runs in the browser — nothing is uploaded.                        */
/* ------------------------------------------------------------------ */

type RowType = "same" | "add" | "del";
type Row = { type: RowType; text: string };
type DiffResult = { rows: Row[]; added: number; removed: number };

function computeDiff(originalText: string, changedText: string): DiffResult {
  const a = originalText === "" ? [] : originalText.split("\n");
  const b = changedText === "" ? [] : changedText.split("\n");
  const n = a.length;
  const m = b.length;

  // LCS length table, filled from the bottom-right corner.
  const dp: number[][] = Array.from({ length: n + 1 }, () =>
    new Array<number>(m + 1).fill(0),
  );
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] =
        a[i] === b[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  // Walk the table to emit an ordered list of rows.
  const rows: Row[] = [];
  let added = 0;
  let removed = 0;
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      rows.push({ type: "same", text: a[i] });
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      rows.push({ type: "del", text: a[i] });
      removed++;
      i++;
    } else {
      rows.push({ type: "add", text: b[j] });
      added++;
      j++;
    }
  }
  while (i < n) {
    rows.push({ type: "del", text: a[i] });
    removed++;
    i++;
  }
  while (j < m) {
    rows.push({ type: "add", text: b[j] });
    added++;
    j++;
  }

  return { rows, added, removed };
}

const ROW_STYLES: Record<RowType, string> = {
  same: "text-ink-soft",
  add: "border-l-2 border-forest bg-forest-soft text-forest-deep",
  del: "border-l-2 border-berry bg-berry/10 text-berry",
};

const ROW_PREFIX: Record<RowType, string> = {
  same: " ",
  add: "+",
  del: "-",
};

export default function TextCompare() {
  const [original, setOriginal] = useState("");
  const [changed, setChanged] = useState("");

  const diff = useMemo(
    () => computeDiff(original, changed),
    [original, changed],
  );

  const hasInput = original !== "" || changed !== "";
  const unchanged = diff.rows.length - diff.added - diff.removed;

  return (
    <div className="space-y-5">
      {/* Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line bg-card p-5">
          <label
            htmlFor="tc-original"
            className="text-sm font-medium text-ink-soft"
          >
            Original text
          </label>
          <textarea
            id="tc-original"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
            rows={10}
            spellCheck={false}
            placeholder="Paste the original version here…"
            className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
          />
        </div>
        <div className="rounded-2xl border border-line bg-card p-5">
          <label
            htmlFor="tc-changed"
            className="text-sm font-medium text-ink-soft"
          >
            Changed text
          </label>
          <textarea
            id="tc-changed"
            value={changed}
            onChange={(e) => setChanged(e.target.value)}
            rows={10}
            spellCheck={false}
            placeholder="Paste the changed version here…"
            className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-forest bg-forest-soft px-3 py-1.5 text-sm font-semibold text-forest-deep">
          {diff.added} added
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-berry bg-berry/10 px-3 py-1.5 text-sm font-semibold text-berry">
          {diff.removed} removed
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper-2 px-3 py-1.5 text-sm font-semibold text-ink-soft">
          {unchanged} unchanged
        </span>
      </div>

      {/* Diff output */}
      <div className="rounded-2xl border border-line bg-card p-5">
        <p className="text-sm font-medium text-ink-soft">Line-by-line diff</p>
        {hasInput && diff.rows.length > 0 ? (
          <div className="mt-3 overflow-x-auto rounded-xl border border-line bg-paper-2">
            <div className="min-w-full font-mono text-sm">
              {diff.rows.map((row, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 px-4 py-1 ${ROW_STYLES[row.type]}`}
                >
                  <span className="select-none opacity-60">
                    {ROW_PREFIX[row.type]}
                  </span>
                  <span className="whitespace-pre-wrap break-words">
                    {row.text === "" ? " " : row.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-3 rounded-xl border border-line bg-paper-2 px-4 py-8 text-center text-sm text-ink-faint">
            Paste text into both boxes to see the differences highlighted here.
          </p>
        )}
      </div>
    </div>
  );
}
