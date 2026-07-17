"use client";

import { useCallback, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Base64 Encode / Decode — 100% client-side.                        */
/*  UTF-8 safe: text is run through TextEncoder/TextDecoder so emoji   */
/*  and non-Latin characters survive the btoa / atob round-trip.      */
/* ------------------------------------------------------------------ */

type Mode = "encode" | "decode";

/** Encode any Unicode string to Base64 without mangling multi-byte chars. */
function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  // Chunk to stay well under the argument-count limit of fromCharCode.
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(binary);
}

/** Decode Base64 back to a Unicode string; throws on malformed input. */
function decodeBase64(b64: string): string {
  // Tolerate whitespace/newlines that often creep into pasted Base64.
  const cleaned = b64.replace(/\s+/g, "");
  const binary = atob(cleaned);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
}

type Result = { text: string; error: null } | { text: ""; error: string };

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<Mode>("encode");
  const [copied, setCopied] = useState(false);

  const result: Result = useMemo(() => {
    if (!input) return { text: "", error: null };
    try {
      const text = mode === "encode" ? encodeBase64(input) : decodeBase64(input);
      return { text, error: null };
    } catch {
      return {
        text: "",
        error:
          mode === "decode"
            ? "This doesn't look like valid Base64. Check for stray characters or missing padding."
            : "Could not encode this input.",
      };
    }
  }, [input, mode]);

  const switchMode = useCallback((next: Mode) => {
    setMode(next);
    setCopied(false);
  }, []);

  const swap = useCallback(() => {
    // Send the current output back to the input under the opposite mode.
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
          htmlFor="b64-input"
          className="text-sm font-medium text-ink-soft"
        >
          {mode === "encode" ? "Text to encode" : "Base64 to decode"}
        </label>
        <textarea
          id="b64-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setCopied(false);
          }}
          rows={7}
          spellCheck={false}
          placeholder={
            mode === "encode"
              ? "Type or paste text — Unicode and emoji are supported…"
              : "Paste Base64 here to decode it back to text…"
          }
          className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
        />

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
          <p className="text-sm font-semibold text-berry">
            Could not decode
          </p>
          <p className="mt-1 text-sm text-berry/90">{result.error}</p>
        </div>
      )}

      {/* Output */}
      {result.text && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-ink-soft">
              {mode === "encode" ? "Base64 output" : "Decoded text"}
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
