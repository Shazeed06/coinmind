"use client";

import { useCallback, useMemo, useState } from "react";
import { IconSparkle, IconCheck } from "@/components/icons";

/* ------------------------------------------------------------------ */
/*  AI Grammar Checker — a free Grammarly alternative.                 */
/*  Sends the user's text to /api/ai-chat with a proofreader system    */
/*  prompt and shows the corrected version with a one-click copy.      */
/* ------------------------------------------------------------------ */

const SYSTEM =
  "You are a professional proofreader. Correct ALL grammar, spelling, and " +
  "punctuation errors in the user's text. Keep the original meaning and tone. " +
  "Return ONLY the corrected text, no explanations or preamble.";

const MAX_CHARS = 8000;

export default function AiGrammarChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const chars = text.length;
  const empty = text.trim().length === 0;
  const overLimit = chars > MAX_CHARS;

  const check = useCallback(async () => {
    const q = text.trim();
    if (!q || loading) return;
    setLoading(true);
    setError("");
    setResult("");
    setCopied(false);
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM,
          messages: [{ role: "user", content: q }],
        }),
      });
      const data = await res.json();
      if (data?.reply && !data?.error) {
        setResult(String(data.reply).trim());
      } else {
        setError(
          data?.reply ||
            "The AI could not check your text right now. Please try again."
        );
      }
    } catch {
      setError("Network issue — please try again.");
    } finally {
      setLoading(false);
    }
  }, [text, loading]);

  const clear = useCallback(() => {
    setText("");
    setResult("");
    setError("");
    setCopied(false);
  }, []);

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

  const unchanged = useMemo(
    () => result.length > 0 && result.trim() === text.trim(),
    [result, text]
  );

  return (
    <div className="space-y-5">
      {/* Input card */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="grammar-input"
            className="text-sm font-medium text-ink-soft"
          >
            Your text
          </label>
          <p
            className={`text-xs ${overLimit ? "text-berry" : "text-ink-faint"}`}
            aria-live="polite"
          >
            {chars.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
          </p>
        </div>
        <textarea
          id="grammar-input"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setCopied(false);
          }}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              check();
            }
          }}
          rows={9}
          spellCheck={false}
          placeholder="Type or paste your text here, then press Check grammar…"
          className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
        />

        {overLimit && (
          <p className="mt-2 text-xs text-berry">
            Please shorten your text to {MAX_CHARS.toLocaleString()} characters
            or fewer.
          </p>
        )}

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5">
          <button
            type="button"
            onClick={check}
            disabled={empty || loading || overLimit}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/90 animate-bounce" />
                </span>
                Checking…
              </>
            ) : (
              <>
                <IconSparkle className="h-4 w-4" />
                Check grammar
              </>
            )}
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={loading || (empty && !result && !error)}
            className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:opacity-50"
          >
            Clear
          </button>
          <span className="ml-auto hidden text-xs text-ink-faint sm:inline">
            Tip: press Ctrl/Cmd + Enter to check
          </span>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-berry/40 bg-berry/5 px-4 py-3 text-sm text-berry"
        >
          {error}
        </div>
      )}

      {/* Result card */}
      {result && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-600 text-ink">
              Corrected text
            </h2>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-forest px-3.5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {copied ? (
                <>
                  <IconCheck className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                "Copy"
              )}
            </button>
          </div>

          {unchanged && (
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brass-soft px-3 py-1 text-xs font-semibold text-brass">
              <IconCheck className="h-3.5 w-3.5" />
              No errors found — your text already looks clean.
            </p>
          )}

          <div className="mt-3 whitespace-pre-wrap rounded-xl bg-paper-2 px-4 py-3 text-sm leading-relaxed text-ink">
            {result}
          </div>
          <p className="mt-3 text-xs text-ink-faint">
            AI suggestions can occasionally miss context &mdash; give the result
            a quick read before you use it.
          </p>
        </div>
      )}
    </div>
  );
}
