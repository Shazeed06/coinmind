"use client";

import { useCallback, useState } from "react";

/* ------------------------------------------------------------------ */
/*  AI Caption & Hashtag Generator — writes 5 platform-tuned captions  */
/*  plus a matching hashtag set via the /api/ai-chat endpoint.         */
/* ------------------------------------------------------------------ */

const PLATFORMS = [
  "Instagram",
  "TikTok",
  "LinkedIn",
  "X",
  "Facebook",
  "YouTube",
] as const;
type Platform = (typeof PLATFORMS)[number];

const TONES = [
  "Fun",
  "Professional",
  "Inspirational",
  "Witty",
  "Bold",
] as const;
type Tone = (typeof TONES)[number];

export default function AiCaptionGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [tone, setTone] = useState<Tone>("Fun");
  const [emojis, setEmojis] = useState(true);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);
  const [copied, setCopied] = useState(false);

  const empty = topic.trim().length === 0;

  const generate = useCallback(async () => {
    const brief = topic.trim();
    if (!brief || loading) return;

    setLoading(true);
    setResult("");
    setIsError(false);
    setCopied(false);

    const system =
      `You are a social media expert. Generate 5 engaging ${platform} captions ` +
      `for the described post in a ${tone.toLowerCase()} tone` +
      `${emojis ? " with relevant emojis" : " without any emojis"}, ` +
      `and a set of 10-15 relevant hashtags. Format clearly: numbered captions ` +
      `(1-5), then a "Hashtags" section. Return only that, with no preamble or ` +
      `commentary.`;

    const content =
      `Platform: ${platform}\nTone: ${tone}\nInclude emojis: ${
        emojis ? "yes" : "no"
      }\nWhat the post is about: ${brief}`;

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
      setIsError(Boolean(data.error));
      setResult(data.reply || "Sorry, something went wrong. Please try again.");
    } catch {
      setIsError(true);
      setResult("Network issue — please try again.");
    } finally {
      setLoading(false);
    }
  }, [topic, platform, tone, emojis, loading]);

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
        <label
          htmlFor="caption-topic"
          className="block text-sm font-600 text-ink-soft"
        >
          What&apos;s your post about?
        </label>
        <textarea
          id="caption-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          rows={5}
          placeholder="e.g. Launching our new oat-milk cold brew — small-batch, low sugar, ready to sip on the go."
          className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-paper-2 px-4 py-3 text-sm leading-relaxed text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
        />

        {/* Controls */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Platform */}
          <div>
            <label
              htmlFor="caption-platform"
              className="block text-xs font-600 text-ink-faint"
            >
              Platform
            </label>
            <select
              id="caption-platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as Platform)}
              className="mt-2 w-full rounded-xl border border-line-strong bg-paper-2 px-3.5 py-2.5 text-sm font-600 text-ink outline-none transition-colors focus:border-forest"
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Tone */}
          <div>
            <label
              htmlFor="caption-tone"
              className="block text-xs font-600 text-ink-faint"
            >
              Tone
            </label>
            <select
              id="caption-tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="mt-2 w-full rounded-xl border border-line-strong bg-paper-2 px-3.5 py-2.5 text-sm font-600 text-ink outline-none transition-colors focus:border-forest"
            >
              {TONES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Emoji toggle */}
        <label className="mt-4 inline-flex cursor-pointer items-center gap-2.5 text-sm font-600 text-ink-soft">
          <input
            type="checkbox"
            checked={emojis}
            onChange={(e) => setEmojis(e.target.checked)}
            className="h-4 w-4 rounded border-line-strong text-forest accent-forest"
          />
          Include emojis
        </label>

        {/* Action */}
        <div className="mt-5 border-t border-line pt-5">
          <button
            type="button"
            onClick={generate}
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
                Generating…
              </>
            ) : (
              "Generate captions"
            )}
          </button>
        </div>
      </div>

      {/* Result card */}
      {(loading || result) && (
        <div className="rounded-2xl border border-line bg-paper-2 p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-600 text-ink">
              Captions &amp; hashtags
            </h2>
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
              Writing {platform} captions and picking hashtags…
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
