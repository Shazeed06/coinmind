"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dropzone, PrivacyNote, InfoRow, formatBytes } from "@/components/tools/ToolShell";

/* ------------------------------------------------------------------ */
/*  Image to Base64 — 100% client-side.                               */
/*  Reads the uploaded file with FileReader.readAsDataURL (preserving */
/*  the original bytes and format), then surfaces the data URI plus   */
/*  ready-to-paste <img> and CSS snippets. Nothing is uploaded.       */
/* ------------------------------------------------------------------ */

const ACCEPT =
  "image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/bmp,image/x-icon,image/avif";

// Files above this size make a very long Base64 string — warn the user.
const LARGE_FILE = 1024 * 1024; // 1 MB

type Result = {
  dataUri: string;
  previewUrl: string;
  name: string;
  type: string;
  originalSize: number;
  encodedBytes: number;
};

type CopyTarget = "uri" | "img" | "css";

/** Truncate a long data URI for display while keeping the full copy intact. */
function shorten(uri: string, keep = 48): string {
  return uri.length > keep * 2
    ? `${uri.slice(0, keep)}…${uri.slice(-8)}`
    : uri;
}

export default function ImageToBase64() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<CopyTarget | null>(null);

  const previewRef = useRef<string | null>(null);

  const revokePreview = useCallback(() => {
    if (previewRef.current) {
      URL.revokeObjectURL(previewRef.current);
      previewRef.current = null;
    }
  }, []);

  useEffect(() => () => revokePreview(), [revokePreview]);

  const onFiles = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("Please choose an image file (PNG, JPG, WebP, SVG, GIF…).");
        return;
      }
      revokePreview();
      setError(null);
      setCopied(null);
      setResult(null);
      setBusy(true);

      const previewUrl = URL.createObjectURL(file);
      previewRef.current = previewUrl;

      const reader = new FileReader();
      reader.onload = () => {
        const dataUri = typeof reader.result === "string" ? reader.result : "";
        if (!dataUri) {
          setError("That file could not be read. Try a different image.");
          setBusy(false);
          return;
        }
        setResult({
          dataUri,
          previewUrl,
          name: file.name,
          type: file.type,
          originalSize: file.size,
          encodedBytes: dataUri.length,
        });
        setBusy(false);
      };
      reader.onerror = () => {
        setError("That file could not be read. Try a different image.");
        revokePreview();
        setBusy(false);
      };
      reader.readAsDataURL(file);
    },
    [revokePreview],
  );

  const reset = useCallback(() => {
    revokePreview();
    setResult(null);
    setError(null);
    setCopied(null);
  }, [revokePreview]);

  const copy = useCallback(async (value: string, target: CopyTarget) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(target);
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      // Clipboard blocked — the field stays selectable for manual copy.
    }
  }, []);

  const imgSnippet = result ? `<img src="${result.dataUri}" alt="" />` : "";
  const cssSnippet = result
    ? `background-image: url("${result.dataUri}");`
    : "";
  const increase =
    result && result.originalSize > 0
      ? Math.round(
          ((result.encodedBytes - result.originalSize) / result.originalSize) *
            100,
        )
      : 0;

  return (
    <div className="space-y-6">
      <PrivacyNote />

      {!result && (
        <Dropzone
          accept={ACCEPT}
          onFiles={onFiles}
          label="Drop an image to encode"
          hint="or click to browse — PNG, JPG, WebP, SVG, GIF"
        />
      )}

      {error && (
        <p className="rounded-lg border border-berry/30 bg-berry/5 px-4 py-3 text-sm text-berry">
          {error}
        </p>
      )}

      {busy && <p className="text-sm text-ink-faint">Encoding image…</p>}

      {result && (
        <div className="space-y-5">
          {/* Summary */}
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.previewUrl}
                  alt={result.name}
                  className="h-20 w-20 shrink-0 rounded-lg border border-line bg-card object-contain p-1"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink" title={result.name}>
                    {result.name}
                  </p>
                  <div className="mt-2 w-64 max-w-full rounded-xl bg-card px-3 py-2">
                    <InfoRow
                      label="Original file"
                      value={formatBytes(result.originalSize)}
                    />
                    <InfoRow
                      label="Base64 size"
                      value={formatBytes(result.encodedBytes)}
                      accent="brass"
                    />
                    <InfoRow
                      label="Size increase"
                      value={`+${increase}%`}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
              >
                Start over
              </button>
            </div>

            {result.originalSize > LARGE_FILE && (
              <p className="mt-4 rounded-xl border border-line bg-card p-3 text-sm text-ink-soft">
                <strong className="text-ink">Heads up:</strong> Base64 encoding
                makes files about 33% larger. This one is sizeable, so embedding
                it inline will bloat your HTML or CSS &mdash; for big images a
                normal file URL is usually better.
              </p>
            )}
          </div>

          {/* Data URI */}
          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="b64-uri"
                className="text-sm font-semibold text-ink"
              >
                Base64 data URI
              </label>
              <button
                type="button"
                onClick={() => copy(result.dataUri, "uri")}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <IconCopy className="h-4 w-4" />
                {copied === "uri" ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              id="b64-uri"
              readOnly
              value={result.dataUri}
              rows={6}
              onFocus={(e) => e.currentTarget.select()}
              className="mt-3 w-full resize-y rounded-lg border border-line-strong bg-paper-2 px-3 py-2.5 font-mono text-xs leading-relaxed text-ink-soft outline-none focus:border-forest"
            />
          </div>

          {/* Snippets */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Snippet
              title="HTML <img> tag"
              preview={`<img src="${shorten(result.dataUri)}" alt="" />`}
              copied={copied === "img"}
              onCopy={() => copy(imgSnippet, "img")}
            />
            <Snippet
              title="CSS background"
              preview={`background-image: url("${shorten(result.dataUri)}");`}
              copied={copied === "css"}
              onCopy={() => copy(cssSnippet, "css")}
            />
          </div>

          {/* Reverse note */}
          <p className="text-xs text-ink-faint">
            Need to go the other way? Paste any{" "}
            <span className="font-mono text-ink-soft">data:image</span> URI into
            your browser&apos;s address bar to view it, then right-click to save
            it back to a file.
          </p>

          {/* Encode another */}
          <Dropzone
            accept={ACCEPT}
            onFiles={onFiles}
            label="Encode another image"
            hint="Replaces the current result — PNG, JPG, WebP, SVG, GIF"
          />
        </div>
      )}
    </div>
  );
}

function Snippet({
  title,
  preview,
  copied,
  onCopy,
}: {
  title: string;
  preview: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <button
          type="button"
          onClick={onCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
        >
          <IconCopy className="h-3.5 w-3.5" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="mt-3 overflow-x-auto rounded-xl bg-paper-2 p-3 text-xs leading-relaxed text-ink-soft">
        <code>{preview}</code>
      </pre>
    </div>
  );
}

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
