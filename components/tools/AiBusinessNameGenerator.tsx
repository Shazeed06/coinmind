"use client";

import { useCallback, useState } from "react";
import { IconSparkle } from "@/components/icons";

/* ------------------------------------------------------------------ */
/*  AI Business Name Generator                                        */
/*  Sends a branding brief to /api/ai-chat and renders the returned   */
/*  names as copyable chips. All generation happens server-side; the  */
/*  browser only posts the description, industry and chosen style.    */
/* ------------------------------------------------------------------ */

const SYSTEM =
  "You are a branding expert. Generate 15 creative, brandable, memorable business names based on the description and style. Return ONLY a plain list, one name per line, no numbering or commentary.";

const STYLES = [
  "Modern",
  "Playful",
  "Premium",
  "Techy",
  "Classic",
  "Short & catchy",
] as const;

type Style = (typeof STYLES)[number];

/** Turn the AI reply into clean name lines: strip list markers, quotes,
 *  markdown bold and any stray commentary the model may add. */
function parseNames(reply: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of reply.split(/\r?\n/)) {
    const cleaned = raw
      .trim()
      // leading "1.", "1)", "-", "*", bullet chars
      .replace(/^\s*(?:\d+[.)]|[-*•·])\s*/, "")
      // surrounding quotes / markdown emphasis
      .replace(/^["'*`_]+|["'*`_]+$/g, "")
      .trim();
    if (!cleaned) continue;
    // Drop obvious commentary / headings, keep plausible brand names only.
    if (cleaned.length > 40 || cleaned.endsWith(":")) continue;
    const key = cleaned.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(cleaned);
    if (out.length >= 20) break;
  }
  return out;
}

export default function AiBusinessNameGenerator() {
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");
  const [style, setStyle] = useState<Style>("Modern");

  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const canGenerate = description.trim().length > 0 && !loading;

  const copy = useCallback(
    async (value: string, idx: number | null) => {
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        if (idx === null) {
          setCopiedAll(true);
          window.setTimeout(() => setCopiedAll(false), 1600);
        } else {
          setCopiedIdx(idx);
          window.setTimeout(() => setCopiedIdx(null), 1600);
        }
      } catch {
        /* Clipboard blocked (insecure context) — names stay selectable. */
      }
    },
    [],
  );

  const generate = useCallback(async () => {
    const brief = description.trim();
    if (!brief || loading) return;

    setLoading(true);
    setError(null);
    setNames([]);
    setCopiedIdx(null);
    setCopiedAll(false);

    const parts = [
      `Business description / keywords: ${brief}`,
      industry.trim() ? `Industry: ${industry.trim()}` : null,
      `Naming style: ${style}`,
      "",
      "Generate 15 names.",
    ].filter(Boolean);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYSTEM,
          messages: [{ role: "user", content: parts.join("\n") }],
        }),
      });
      const data = await res.json();

      // The API returns a friendly `reply` even for handled errors
      // (e.g. AI not configured / upstream busy) — surface that message.
      if (data?.error) {
        setError(
          typeof data.reply === "string" && data.reply.trim()
            ? data.reply
            : "The AI is unavailable right now — please try again in a moment.",
        );
        return;
      }

      const parsed = parseNames(String(data?.reply || ""));
      if (parsed.length === 0) {
        setError("No names came back — try adding more detail and generate again.");
        return;
      }
      setNames(parsed);
    } catch {
      setError("Network issue — please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, [description, industry, style, loading]);

  return (
    <div className="space-y-6">
      {/* Input card */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="space-y-5">
          {/* Description */}
          <div>
            <label
              htmlFor="bng-desc"
              className="text-sm font-medium text-ink-soft"
            >
              Describe your business / keywords
            </label>
            <textarea
              id="bng-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                  e.preventDefault();
                  generate();
                }
              }}
              rows={3}
              placeholder="e.g. an eco-friendly subscription box for indoor plants and gardening tools"
              className="mt-2 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
            />
          </div>

          {/* Industry + Style */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="bng-industry"
                className="text-sm font-medium text-ink-soft"
              >
                Industry{" "}
                <span className="text-ink-faint font-normal">(optional)</span>
              </label>
              <input
                id="bng-industry"
                type="text"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    generate();
                  }
                }}
                placeholder="e.g. SaaS, fashion, food"
                className="mt-2 w-full rounded-xl border border-line-strong bg-paper-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
              />
            </div>
            <div>
              <label
                htmlFor="bng-style"
                className="text-sm font-medium text-ink-soft"
              >
                Style
              </label>
              <select
                id="bng-style"
                value={style}
                onChange={(e) => setStyle(e.target.value as Style)}
                className="mt-2 w-full rounded-xl border border-line-strong bg-paper-2 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest"
              >
                {STYLES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Generate */}
          <button
            type="button"
            onClick={generate}
            disabled={!canGenerate}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
          >
            {loading ? (
              <>
                <span className="inline-flex gap-1" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" />
                </span>
                Generating names…
              </>
            ) : (
              <>
                <IconSparkle className="h-4 w-4" />
                Generate names
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-2xl border border-berry/30 bg-card p-4 text-sm text-ink-soft"
        >
          <strong className="text-ink">Couldn&apos;t generate names.</strong>{" "}
          {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && names.length === 0 && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="h-12 rounded-xl border border-line bg-paper-2 animate-pulse"
              />
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {names.length > 0 && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-600 text-ink">
              {names.length} name{names.length === 1 ? "" : "s"} for you
            </h2>
            <button
              type="button"
              onClick={() => copy(names.join("\n"), null)}
              className="inline-flex items-center gap-2 rounded-lg border border-line-strong bg-card px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
            >
              <IconCopy className="h-4 w-4" />
              {copiedAll ? "Copied all!" : "Copy all"}
            </button>
          </div>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {names.map((name, i) => (
              <li key={`${name}-${i}`}>
                <div className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-paper-2 px-4 py-3 transition-colors hover:border-forest">
                  <span className="min-w-0 break-words text-sm font-medium text-ink">
                    {name}
                  </span>
                  <button
                    type="button"
                    onClick={() => copy(name, i)}
                    aria-label={`Copy ${name}`}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-2.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
                  >
                    {copiedIdx === i ? (
                      <IconCheck className="h-3.5 w-3.5 text-brass" />
                    ) : (
                      <IconCopy className="h-3.5 w-3.5" />
                    )}
                    {copiedIdx === i ? "Copied" : "Copy"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs text-ink-faint">
            Always check name availability (domain, trademark and company
            registration) before you commit.
          </p>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && names.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line-strong bg-card p-10 text-center">
          <span className="grid mx-auto h-12 w-12 place-items-center rounded-2xl bg-forest-soft text-forest">
            <IconSparkle className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm text-ink-soft">
            Describe your business above and hit{" "}
            <span className="font-semibold text-ink">Generate names</span> to get
            15 brandable ideas in seconds.
          </p>
        </div>
      )}
    </div>
  );
}

/* ------------------------------ icons ------------------------------ */

function IconCopy({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
