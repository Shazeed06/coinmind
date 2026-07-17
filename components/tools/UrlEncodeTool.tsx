"use client";

import { useCallback, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  URL Encode / Decode — 100% client-side.                           */
/*  encodeURIComponent escapes everything a query value needs;        */
/*  encodeURI leaves reserved URL characters (: / ? # &) intact for   */
/*  whole-URL escaping. Both decodes are wrapped so malformed input   */
/*  (a lone %, a bad %-sequence) reports an error instead of crashing.*/
/* ------------------------------------------------------------------ */

type Mode = "encode" | "decode";
type Scope = "component" | "uri";

function run(text: string, mode: Mode, scope: Scope): string {
  if (mode === "encode") {
    return scope === "component"
      ? encodeURIComponent(text)
      : encodeURI(text);
  }
  return scope === "component" ? decodeURIComponent(text) : decodeURI(text);
}

type Result = { text: string; error: null } | { text: ""; error: string };

export default function UrlEncodeTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [scope, setScope] = useState<Scope>("component");
  const [copied, setCopied] = useState(false);

  const result: Result = useMemo(() => {
    if (!input) return { text: "", error: null };
    try {
      return { text: run(input, mode, scope), error: null };
    } catch {
      return {
        text: "",
        error:
          "Malformed input. A percent sign must be followed by two hex digits (e.g. %20). Check for stray % characters.",
      };
    }
  }, [input, mode, scope]);

  const switchMode = useCallback((next: Mode) => {
    setMode(next);
    setCopied(false);
  }, []);

  const swap = useCallback(() => {
    if (result.error || !result.text) return;
    setInput(result.text);
    setMode((m) => (m === "encode" ? "decode" : "encode"));
    setCopied(false);
  }, [result]);

  const clear = useCallback(() => {
    setInput("");
    setCopied(false);
  }, []);

  const copy = useCallback(async () => {
    if (!result.text) return;
    try {
      await navigator.clipboard.writeText(result.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, [result.text]);

  const empty = input.length === 0;

  return (
    <div className="space-y-5">
      {/* Mode toggle */}
      <div className="inline-flex rounded-xl border border-line-strong bg-paper-2 p-1">
        {(["encode", "decode"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            aria-pressed={mode === m}
            className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-colors ${
              mode === m
                ? "bg-forest text-white"
                : "text-ink-soft hover:text-forest"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Input card */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <label
          htmlFor="url-input"
          className="text-sm font-medium text-ink-soft"
        >
          {mode === "encode" ? "Text to encode" : "Encoded text to decode"}
        </label>
        <textarea
          id="url-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setCopied(false);
          }}
          rows={7}
          spellCheck={false}
          placeholder={
            mode === "encode"
              ? "https://example.com/search?q=hello world&tag=café"
              : "https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world"
          }
          className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
        />

        {/* Scope choice */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-faint">Method</span>
          {(["component", "uri"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setScope(s);
                setCopied(false);
              }}
              aria-pressed={scope === s}
              className={`rounded-lg border px-3 py-1.5 text-sm font-semibold transition-colors ${
                scope === s
                  ? "border-forest bg-forest-soft text-forest"
                  : "border-line-strong bg-card text-ink-soft hover:border-forest hover:text-forest"
              }`}
            >
              {s === "component"
                ? mode === "encode"
                  ? "encodeURIComponent"
                  : "decodeURIComponent"
                : mode === "encode"
                  ? "encodeURI"
                  : "decodeURI"}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-faint">
          {scope === "component"
            ? "Component — escapes every reserved character. Use for a single query value or path segment."
            : "Whole URI — leaves : / ? # & = intact. Use for an entire URL."}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={swap}
            disabled={empty || !!result.error || !result.text}
            className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest disabled:opacity-50"
          >
            Use result as input
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
      {result.error && (
        <div
          role="alert"
          className="rounded-2xl border border-berry/40 bg-berry/5 p-5"
        >
          <p className="text-sm font-semibold text-berry">Could not decode</p>
          <p className="mt-1 text-sm text-berry/90">{result.error}</p>
        </div>
      )}

      {/* Output */}
      {result.text && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-ink-soft">
              {mode === "encode" ? "Encoded output" : "Decoded output"}
            </span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="mt-3 max-h-[28rem] overflow-auto rounded-xl border border-line-strong bg-paper-2 px-4 py-3 font-mono text-sm text-ink whitespace-pre-wrap break-words">
            {result.text}
          </pre>
        </div>
      )}
    </div>
  );
}
