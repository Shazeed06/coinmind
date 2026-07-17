"use client";

import { useCallback, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  AI Text Summarizer — condenses long text into a short, medium or  */
/*  detailed summary via the /api/ai-chat endpoint. Plain or bullets. */
/* ------------------------------------------------------------------ */

type Length = "short" | "medium" | "detailed";

const LENGTHS: { value: Length; label: string; hint: string }[] = [
  { value: "short", label: "Short", hint: "2–3 sentences" },
  { value: "medium", label: "Medium", hint: "One tight paragraph" },
  { value: "detailed", label: "Detailed", hint: "Multi-paragraph" },
];

// How each length maps into the system instruction sent to the model.
const LENGTH_PHRASE: Record<Length, string> = {
  short: "short (2–3 sentence)",
  medium: "medium-length (single paragraph)",
  detailed: "detailed, multi-paragraph",
};

export default function AiSummarizer() {
  const [text, setText] = useState("");
  const [length, setLength] = useState<Length>("medium");
  const [bullets, setBullets] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);
  const [copied, setCopied] = useState(false);

  const { chars, words } = useMemo(() => {
    const trimmed = text.trim();
    return {
      chars: text.length,
      words: trimmed ? trimmed.split(/\s+/).length : 0,
    };
  }, [text]);

  const empty = text.trim().length === 0;

  const summarize = useCallback(async () => {
    const theText = text.trim();
    if (!theText || loading) return;

    setLoading(true);
    setResult("");
    setIsError(false);
    setCopied(false);

    const system =
      `You are an expert summarizer. Produce a ${LENGTH_PHRASE[length]} summary ` +
      `of the user's text${
        bullets ? ", formatted as clear bullet points" : ""
      }. Preserve the key facts, names and numbers. Return ONLY the summary, ` +
      `with no preamble or commentary.`;

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system,
          messages: [{ role: "user", content: theText }],
        }),
      });
      const data = await res.json();
      setIsError(Boolean(data.error));
      setResult(data.reply || "Sorry, something went wrong. Please try again.");
    } catch {
      setIsError(true);
      setResult("Network issue — please try again.");
    } finally {
      setLoading(false);
    }
  }, [text, length, bullets, loading]);

  const copy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, [result]);

  return (
    <div className="space-y-5">
      {/* Input card */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="summary-input" className="text-sm font-600 text-ink-soft">
            Text to summarize
          </label>
          <p className="text-xs text-ink-faint" aria-live="polite">
            {chars.toLocaleString()} character{chars === 1 ? "" : "s"}
            {" · "}
            {words.toLocaleString()} word{words === 1 ? "" : "s"}
          </p>
        </div>

        <textarea
          id="summary-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={9}
          placeholder="Paste an article, essay, report or any long text here, then choose a length and summarize…"
          className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
        />

        {/* Controls */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Length selector */}
          <div>
            <span className="block text-xs font-600 text-ink-faint">
              Summary length
            </span>
            <div className="mt-2 inline-flex rounded-xl border border-line-strong bg-paper-2 p-1">
              {LENGTHS.map((l) => {
                const active = length === l.value;
                return (
                  <button
                    key={l.value}
                    type="button"
                    onClick={() => setLength(l.value)}
                    aria-pressed={active}
                    title={l.hint}
                    className={`rounded-lg px-3.5 py-2 text-sm font-600 transition-colors ${
                      active
                        ? "bg-forest text-white"
                        : "text-ink-soft hover:text-forest"
                    }`}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bullet points toggle */}
          <label className="inline-flex cursor-pointer items-center gap-2.5 text-sm font-600 text-ink-soft">
            <input
              type="checkbox"
              checked={bullets}
              onChange={(e) => setBullets(e.target.checked)}
              className="h-4 w-4 rounded border-line-strong text-forest accent-forest"
            />
            Bullet points
          </label>
        </div>

        {/* Action */}
        <div className="mt-5 border-t border-line pt-5">
          <button
            type="button"
            onClick={summarize}
            disabled={empty || loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-5 py-2.5 text-sm font-600 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="inline-flex gap-1" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" />
                </span>
                Summarizing…
              </>
            ) : (
              "Summarize"
            )}
          </button>
        </div>
      </div>

      {/* Result card */}
      {(loading || result) && (
        <div className="rounded-2xl border border-line bg-paper-2 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-600 text-ink">Summary</h2>
            {result && !loading && (
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-card px-3.5 py-2 text-sm font-600 text-ink-soft transition-colors hover:border-forest hover:text-forest"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>

          {loading ? (
            <div className="mt-4 flex items-center gap-2 text-sm text-ink-faint">
              <span className="inline-flex gap-1" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-ink-faint animate-bounce [animation-delay:-0.3s]" />
                <span className="h-2 w-2 rounded-full bg-ink-faint animate-bounce [animation-delay:-0.15s]" />
                <span className="h-2 w-2 rounded-full bg-ink-faint animate-bounce" />
              </span>
              Reading your text and writing a summary…
            </div>
          ) : (
            <p
              className={`mt-4 whitespace-pre-wrap text-sm leading-relaxed ${
                isError ? "text-berry" : "text-ink"
              }`}
            >
              {result}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
