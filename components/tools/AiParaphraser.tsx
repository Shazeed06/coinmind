"use client";

import { useCallback, useMemo, useState } from "react";
import { IconSparkle } from "@/components/icons";

/* ------------------------------------------------------------------ */
/*  AI Paraphraser — rewrites text in a chosen tone via /api/ai-chat. */
/*  The rewriting happens server-side; this component only handles    */
/*  input, mode selection, loading/error states and copying output.   */
/* ------------------------------------------------------------------ */

type Mode = {
  id: string;
  label: string;
  /** Style phrase spliced into the system prompt. */
  style: string;
};

const MODES: Mode[] = [
  { id: "standard", label: "Standard", style: "a clear, natural standard" },
  { id: "fluent", label: "Fluent", style: "a smooth, fluent and polished" },
  { id: "formal", label: "Formal", style: "a formal, professional" },
  { id: "casual", label: "Casual", style: "a relaxed, casual and conversational" },
  { id: "simple", label: "Simple", style: "a simple, plain-English (easy to read)" },
  { id: "shorten", label: "Shorten", style: "a more concise, shortened" },
  { id: "expand", label: "Expand", style: "a longer, more detailed and expanded" },
];

const MAX_CHARS = 8000;

export default function AiParaphraser() {
  const [text, setText] = useState("");
  const [modeId, setModeId] = useState<string>(MODES[0].id);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const chars = text.length;
  const empty = text.trim().length === 0;

  const activeMode = useMemo(
    () => MODES.find((m) => m.id === modeId) ?? MODES[0],
    [modeId],
  );

  const paraphrase = useCallback(async () => {
    const content = text.trim();
    if (!content || loading) return;

    setLoading(true);
    setError("");
    setOutput("");
    setCopied(false);

    const system =
      `You are an expert paraphraser. Rewrite the user's text in ${activeMode.style} ` +
      "style while preserving the original meaning. Return ONLY the rewritten text, " +
      "no preamble or quotes.";

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system,
          messages: [{ role: "user", content }],
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setOutput(String(data.reply).trim());
        if (data.error) {
          setError("The rewriter had an issue — this result may be incomplete.");
        }
      } else {
        setError(
          data.error ||
            "Sorry, the rewriter could not respond. Please try again.",
        );
      }
    } catch {
      setError("Network issue — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [text, loading, activeMode]);

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

  const clear = useCallback(() => {
    setText("");
    setOutput("");
    setError("");
    setCopied(false);
  }, []);

  return (
    <div className="space-y-5">
      {/* Input card */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="paraphrase-input"
            className="text-sm font-medium text-ink-soft"
          >
            Your text
          </label>
          <p className="text-xs text-ink-faint" aria-live="polite">
            {chars.toLocaleString()} / {MAX_CHARS.toLocaleString()} characters
          </p>
        </div>
        <textarea
          id="paraphrase-input"
          value={text}
          maxLength={MAX_CHARS}
          onChange={(e) => {
            setText(e.target.value);
            setCopied(false);
          }}
          rows={8}
          placeholder="Paste or type the text you want to reword, then choose a style and paraphrase…"
          className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
        />

        {/* Mode / tone selector */}
        <fieldset className="mt-4">
          <legend className="text-sm font-medium text-ink-soft">
            Rewrite style
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {MODES.map((m) => {
              const selected = m.id === modeId;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setModeId(m.id);
                    setCopied(false);
                  }}
                  aria-pressed={selected}
                  className={`rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors ${
                    selected
                      ? "border-forest bg-forest-soft text-forest"
                      : "border-line-strong bg-card text-ink-soft hover:border-forest hover:text-forest"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Action row */}
        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-line pt-5">
          <button
            type="button"
            onClick={paraphrase}
            disabled={empty || loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="inline-flex gap-1" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" />
                </span>
                Paraphrasing…
              </>
            ) : (
              <>
                <IconSparkle className="h-4 w-4" />
                Paraphrase
              </>
            )}
          </button>
          <button
            type="button"
            onClick={clear}
            disabled={empty && !output}
            className="inline-flex items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:opacity-50"
          >
            Clear
          </button>
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

      {/* Output card */}
      {output && (
        <div className="rounded-2xl border border-line bg-paper-2 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-600 text-ink">
              Paraphrased text
            </h2>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <p className="mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-ink">
            {output}
          </p>
        </div>
      )}
    </div>
  );
}
