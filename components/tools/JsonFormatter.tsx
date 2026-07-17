"use client";

import { useCallback, useState } from "react";

/* ------------------------------------------------------------------ */
/*  JSON Formatter & Validator — 100% client-side.                    */
/*  Uses the native JSON.parse / JSON.stringify; nothing is uploaded. */
/* ------------------------------------------------------------------ */

type ParseError = {
  message: string;
  line?: number;
  col?: number;
  pos?: number;
};

/** Turn a character offset into a 1-based line / column for friendlier errors. */
function lineColFromPos(text: string, pos: number): { line: number; col: number } {
  let line = 1;
  let col = 1;
  const limit = Math.min(pos, text.length);
  for (let i = 0; i < limit; i += 1) {
    if (text[i] === "\n") {
      line += 1;
      col = 1;
    } else {
      col += 1;
    }
  }
  return { line, col };
}

/** Normalise whatever the engine throws into a message + approximate location. */
function toParseError(err: unknown, source: string): ParseError {
  const raw = err instanceof Error ? err.message : String(err);
  const match = raw.match(/position (\d+)/i);
  if (match) {
    const pos = Number(match[1]);
    if (Number.isFinite(pos)) {
      const { line, col } = lineColFromPos(source, pos);
      return { message: raw, pos, line, col };
    }
  }
  return { message: raw };
}

/** Human-readable byte size of a UTF-8 string. */
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} byte${bytes === 1 ? "" : "s"}`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/** Short description of the parsed value plus its serialized size. */
function summarize(value: unknown, text: string): string {
  const bytes = new TextEncoder().encode(text).length;
  let shape: string;
  if (Array.isArray(value)) {
    shape = `Array · ${value.length} item${value.length === 1 ? "" : "s"}`;
  } else if (value !== null && typeof value === "object") {
    const keys = Object.keys(value as Record<string, unknown>).length;
    shape = `Object · ${keys} key${keys === 1 ? "" : "s"}`;
  } else {
    shape = value === null ? "null" : typeof value;
  }
  return `${shape} · ${formatBytes(bytes)}`;
}

type Status = "idle" | "valid" | "error";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<ParseError | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [stats, setStats] = useState<string | null>(null);
  const [indent, setIndent] = useState<2 | 4>(2);
  const [copied, setCopied] = useState(false);

  const reset = useCallback(() => {
    setError(null);
    setCopied(false);
  }, []);

  /** Parse + re-serialize with the given indent (0 = minify). */
  const process = useCallback(
    (spaces: number) => {
      reset();
      if (!input.trim()) {
        setStatus("idle");
        setOutput("");
        setStats(null);
        return;
      }
      try {
        const parsed: unknown = JSON.parse(input);
        const result = JSON.stringify(parsed, null, spaces);
        setOutput(result);
        setStats(summarize(parsed, result));
        setStatus("valid");
      } catch (err) {
        setError(toParseError(err, input));
        setStatus("error");
        setStats(null);
      }
    },
    [input, reset],
  );

  const beautify = useCallback(() => {
    process(indent);
  }, [process, indent]);

  const minify = useCallback(() => {
    process(0);
  }, [process]);

  /** Validate only — checks the input without replacing the output block. */
  const validate = useCallback(() => {
    reset();
    if (!input.trim()) {
      setStatus("idle");
      setStats(null);
      return;
    }
    try {
      const parsed: unknown = JSON.parse(input);
      setStats(summarize(parsed, JSON.stringify(parsed)));
      setStatus("valid");
    } catch (err) {
      setError(toParseError(err, input));
      setStatus("error");
      setStats(null);
    }
  }, [input, reset]);

  const chooseIndent = useCallback(
    (spaces: 2 | 4) => {
      setIndent(spaces);
      if (status === "valid" && output) {
        // Re-beautify immediately so the choice is visible.
        try {
          const parsed: unknown = JSON.parse(input);
          setOutput(JSON.stringify(parsed, null, spaces));
        } catch {
          /* leave output untouched on failure */
        }
      }
    },
    [status, output, input],
  );

  const clear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
    setStats(null);
    setStatus("idle");
    setCopied(false);
  }, []);

  const copy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, [output]);

  const empty = input.length === 0;

  return (
    <div className="space-y-5">
      {/* Input card */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <label
          htmlFor="json-input"
          className="text-sm font-medium text-ink-soft"
        >
          Paste your JSON
        </label>
        <textarea
          id="json-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            reset();
            if (status === "error") setStatus("idle");
          }}
          rows={10}
          spellCheck={false}
          placeholder='{"name":"CoinMind","tools":["json","base64"],"free":true}'
          className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
        />

        {/* Indent choice */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-faint">Indent</span>
          {([2, 4] as const).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => chooseIndent(n)}
              aria-pressed={indent === n}
              className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
                indent === n
                  ? "border-forest bg-forest-soft text-forest"
                  : "border-line-strong bg-card text-ink-soft hover:border-forest hover:text-forest"
              }`}
            >
              {n} spaces
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={beautify}
            disabled={empty}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            Format / Beautify
          </button>
          <button
            type="button"
            onClick={minify}
            disabled={empty}
            className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest disabled:opacity-50"
          >
            Minify
          </button>
          <button
            type="button"
            onClick={validate}
            disabled={empty}
            className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest disabled:opacity-50"
          >
            Validate
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

      {/* Error (berry tint) */}
      {status === "error" && error && (
        <div
          role="alert"
          className="rounded-2xl border border-berry/40 bg-berry/5 p-5"
        >
          <p className="text-sm font-semibold text-berry">Invalid JSON</p>
          <p className="mt-1 font-mono text-sm text-berry/90 break-words">
            {error.message}
          </p>
          {error.line !== undefined && (
            <p className="mt-1 text-xs text-berry/80">
              Approximate location: line {error.line}, column {error.col}
              {error.pos !== undefined ? ` (character ${error.pos})` : ""}.
            </p>
          )}
        </div>
      )}

      {/* Valid banner */}
      {status === "valid" && stats && (
        <div className="rounded-2xl border border-brass/40 bg-brass-soft p-4">
          <p className="text-sm font-semibold text-brass">
            Valid JSON
            <span className="ml-2 font-normal text-ink-soft">{stats}</span>
          </p>
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-ink-soft">Result</span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="mt-3 max-h-[28rem] overflow-auto rounded-xl border border-line-strong bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
