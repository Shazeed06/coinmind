"use client";

import { useState } from "react";
import Link from "next/link";
import { IconSparkle, IconCheck } from "@/components/icons";

// ---------------------------------------------------------------------------
// Types & options
// ---------------------------------------------------------------------------
type DocType = "email" | "cover letter";
type Tone =
  | "Professional"
  | "Friendly"
  | "Formal"
  | "Persuasive"
  | "Apologetic";

const TONES: Tone[] = [
  "Professional",
  "Friendly",
  "Formal",
  "Persuasive",
  "Apologetic",
];

// ---------------------------------------------------------------------------
// Shared presentational tokens
// ---------------------------------------------------------------------------
const inputCls =
  "w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm text-ink outline-none focus:border-forest transition-colors";
const labelCls = "text-sm font-medium text-ink-soft";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function AiEmailWriter() {
  const [docType, setDocType] = useState<DocType>("email");
  const [about, setAbout] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [recipient, setRecipient] = useState("");
  const [yourName, setYourName] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function generate() {
    const key = about.trim();
    if (!key) {
      setError("Add a few key points first so the AI knows what to write about.");
      return;
    }
    if (loading) return;

    setLoading(true);
    setError("");
    setResult("");
    setCopied(false);

    const system =
      `You are an expert business writer. Write a complete, ready-to-send ${docType} ` +
      `based on the user's details. Tone: ${tone}. ` +
      (docType === "email" ? "Include a subject line. " : "") +
      `Return ONLY the ${docType}, no preamble.`;

    const details = [
      `Type: ${docType}`,
      `Tone: ${tone}`,
      recipient.trim() &&
        `${docType === "email" ? "Recipient" : "Recipient / role"}: ${recipient.trim()}`,
      yourName.trim() && `Sender / your name: ${yourName.trim()}`,
      `Key points to cover:\n${key}`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system,
          messages: [{ role: "user", content: details }],
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (data.error && !data.reply) {
        setError(
          "AI writing isn't switched on yet — please try again later."
        );
      } else if (data.error && data.reply) {
        // Provider returns a friendly message in `reply` for not_configured/busy.
        setError(data.reply);
      } else if (data.reply) {
        setResult(data.reply.trim());
      } else {
        setError("The AI didn't return anything — please try again.");
      }
    } catch {
      setError("Network issue — please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Couldn't copy automatically — select the text and copy manually.");
    }
  }

  const isEmail = docType === "email";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* ---------------------------------------------------------------- */}
      {/* LEFT — the form                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="rounded-2xl border border-line bg-card p-6">
        {/* Type toggle */}
        <div>
          <span className={labelCls}>What do you want to write?</span>
          <div
            role="group"
            aria-label="Choose what to write"
            className="mt-2 grid grid-cols-2 gap-2"
          >
            {(["email", "cover letter"] as DocType[]).map((t) => {
              const active = docType === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setDocType(t)}
                  aria-pressed={active}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-semibold capitalize transition-colors ${
                    active
                      ? "border-forest bg-forest-soft text-forest"
                      : "border-line-strong bg-card text-ink-soft hover:border-forest hover:text-forest"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* Key points */}
        <label className="mt-6 block">
          <span className={labelCls}>What&apos;s it about? (key points)</span>
          <textarea
            rows={6}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder={
              isEmail
                ? "e.g. Follow up on last week's proposal, ask if they had questions, offer a call this Thursday or Friday."
                : "e.g. Applying for a Marketing Manager role, 5 years' experience, grew organic traffic 60%, keen on their brand-led approach."
            }
            className={`${inputCls} mt-1.5 resize-y leading-relaxed`}
          />
        </label>

        {/* Tone */}
        <label className="mt-5 block">
          <span className={labelCls}>Tone</span>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as Tone)}
            className={`${inputCls} mt-1.5`}
          >
            {TONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        {/* Optional details */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>
              {isEmail ? "Recipient (optional)" : "Recipient / role (optional)"}
            </span>
            <input
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={
                isEmail ? "e.g. Priya, Hiring Team" : "e.g. Hiring Manager"
              }
              className={`${inputCls} mt-1.5`}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Your name (optional)</span>
            <input
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder="e.g. Aarav Sharma"
              className={`${inputCls} mt-1.5`}
            />
          </label>
        </div>

        {/* Generate */}
        <button
          type="button"
          onClick={generate}
          disabled={loading || !about.trim()}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-forest px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-deep disabled:opacity-40"
        >
          <IconSparkle className="h-4 w-4" />
          {loading ? "Writing…" : `Generate ${docType}`}
        </button>

        {error && (
          <p className="mt-3 text-sm text-berry" role="alert">
            {error}
          </p>
        )}

        <p className="mt-4 text-xs text-ink-faint">
          Writing a job application?{" "}
          <Link href="/resume-builder" className="font-semibold text-forest hover:underline">
            Build a matching resume
          </Link>{" "}
          in seconds.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* RIGHT — output                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="lg:sticky lg:top-6 self-start">
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-600 text-ink capitalize">
              Your {docType}
            </h2>
            {result && (
              <button
                type="button"
                onClick={copyResult}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-semibold text-forest transition-colors hover:border-forest"
              >
                {copied ? (
                  <>
                    <IconCheck className="h-3.5 w-3.5" /> Copied
                  </>
                ) : (
                  "Copy"
                )}
              </button>
            )}
          </div>

          <div className="mt-4 rounded-xl bg-paper-2 p-5 min-h-[320px]">
            {loading ? (
              <div className="flex h-full items-center gap-1.5 text-ink-faint">
                <span className="h-2 w-2 rounded-full bg-ink-faint animate-bounce [animation-delay:-0.3s]" />
                <span className="h-2 w-2 rounded-full bg-ink-faint animate-bounce [animation-delay:-0.15s]" />
                <span className="h-2 w-2 rounded-full bg-ink-faint animate-bounce" />
                <span className="ml-2 text-sm">Drafting your {docType}…</span>
              </div>
            ) : result ? (
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-ink">
                {result}
              </p>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-forest-soft text-forest">
                  <IconSparkle className="h-6 w-6" />
                </span>
                <p className="mt-3 text-sm text-ink-soft max-w-xs">
                  Fill in the details and hit{" "}
                  <span className="font-semibold text-ink">Generate</span> — your
                  ready-to-send {docType} appears here.
                </p>
              </div>
            )}
          </div>

          <p className="mt-3 text-[11px] text-ink-faint">
            AI-generated draft — read it through and edit any names, dates or
            details before you send.
          </p>
        </div>
      </section>
    </div>
  );
}
