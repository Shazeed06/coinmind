"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dropzone,
  PrivacyNote,
  IconDownload,
  formatBytes,
} from "@/components/tools/ToolShell";

/* ------------------------------------------------------------------ */
/*  Favicon Generator — 100% client-side.                             */
/*  Decodes the uploaded image once, then redraws it (centred, kept   */
/*  fully in-frame) onto square canvases at every standard favicon    */
/*  size and exports each as a PNG. Nothing is uploaded.              */
/* ------------------------------------------------------------------ */

type SizeSpec = {
  px: number;
  filename: string;
  use: string;
};

const SIZES: SizeSpec[] = [
  { px: 16, filename: "favicon-16x16.png", use: "Classic browser tab" },
  { px: 32, filename: "favicon-32x32.png", use: "Browser tab & taskbar" },
  { px: 48, filename: "favicon-48x48.png", use: "Windows site icon" },
  { px: 64, filename: "favicon-64x64.png", use: "High-DPI browser tab" },
  { px: 180, filename: "apple-touch-icon.png", use: "Apple touch icon (iOS)" },
  { px: 192, filename: "favicon-192x192.png", use: "Android / PWA icon" },
  { px: 512, filename: "favicon-512x512.png", use: "PWA & app store" },
];

const LINK_TAGS = `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png">`;

const ACCEPT = "image/png,image/jpeg,image/webp,image/svg+xml,image/gif";

type FavIcon = SizeSpec & { url: string; bytes: number };

/** Load a File into a decoded HTMLImageElement. */
function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not decode image"));
    img.src = url;
  });
}

export default function FaviconGenerator() {
  const [icons, setIcons] = useState<FavIcon[]>([]);
  const [sourceUrl, setSourceUrl] = useState<string | null>(null);
  const [sourceName, setSourceName] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Track every object URL we create so we can revoke on cleanup.
  const urlsRef = useRef<Set<string>>(new Set());
  const trackUrl = useCallback((url: string) => {
    urlsRef.current.add(url);
    return url;
  }, []);
  const revokeAll = useCallback(() => {
    urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    urlsRef.current.clear();
  }, []);

  useEffect(() => () => revokeAll(), [revokeAll]);

  const generate = useCallback(
    async (file: File) => {
      const srcUrl = trackUrl(URL.createObjectURL(file));
      const img = await loadImage(srcUrl);
      const results: FavIcon[] = [];
      for (const spec of SIZES) {
        const canvas = document.createElement("canvas");
        canvas.width = spec.px;
        canvas.height = spec.px;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        // "Contain" — scale the whole image to fit, centred, so nothing is cropped.
        const scale = Math.min(
          spec.px / img.naturalWidth,
          spec.px / img.naturalHeight,
        );
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        ctx.drawImage(img, (spec.px - w) / 2, (spec.px - h) / 2, w, h);
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/png"),
        );
        if (!blob) continue;
        results.push({
          ...spec,
          url: trackUrl(URL.createObjectURL(blob)),
          bytes: blob.size,
        });
      }
      setSourceUrl(srcUrl);
      return results;
    },
    [trackUrl],
  );

  const onFiles = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("Please choose an image file (PNG, JPG, WebP, SVG or GIF).");
        return;
      }
      revokeAll();
      setError(null);
      setCopied(false);
      setSourceName(file.name);
      setBusy(true);
      void (async () => {
        try {
          const results = await generate(file);
          if (!results.length) {
            setError("That image could not be processed. Try a different file.");
          }
          setIcons(results);
        } catch {
          setError("That image could not be decoded. Try a PNG, JPG or WebP.");
          setIcons([]);
        } finally {
          setBusy(false);
        }
      })();
    },
    [generate, revokeAll],
  );

  const reset = useCallback(() => {
    revokeAll();
    setIcons([]);
    setSourceUrl(null);
    setSourceName("");
    setError(null);
    setCopied(false);
  }, [revokeAll]);

  const copyTags = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(LINK_TAGS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked — the block stays selectable.
    }
  }, []);

  return (
    <div className="space-y-6">
      <PrivacyNote />

      {/* Dropzone */}
      {icons.length === 0 && (
        <Dropzone
          accept={ACCEPT}
          onFiles={onFiles}
          label="Drop your logo or image here"
          hint="or click to browse — a square image works best (PNG, JPG, WebP, SVG)"
        />
      )}

      {error && (
        <p className="rounded-lg border border-berry/30 bg-berry/5 px-4 py-3 text-sm text-berry">
          {error}
        </p>
      )}

      {busy && <p className="text-sm text-ink-faint">Generating favicons…</p>}

      {icons.length > 0 && (
        <div className="space-y-5">
          {/* Source summary */}
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {sourceUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sourceUrl}
                    alt={sourceName}
                    className="h-16 w-16 shrink-0 rounded-lg border border-line bg-card object-contain p-1"
                  />
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink" title={sourceName}>
                    {sourceName}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-faint">
                    {icons.length} favicon sizes ready to download
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <DownloadAll icons={icons} />
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
                >
                  Start over
                </button>
              </div>
            </div>
          </div>

          {/* Size grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {icons.map((icon) => (
              <div
                key={icon.px}
                className="flex flex-col rounded-2xl border border-line bg-card p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-lg border border-line bg-paper-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={icon.url}
                      alt={`${icon.px}×${icon.px} favicon`}
                      width={Math.min(icon.px, 48)}
                      height={Math.min(icon.px, 48)}
                      style={{
                        width: Math.min(icon.px, 48),
                        height: Math.min(icon.px, 48),
                      }}
                      className="rounded"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">
                      {icon.px} &times; {icon.px}
                    </p>
                    <p className="mt-0.5 text-xs text-ink-faint">{icon.use}</p>
                    <p className="mt-0.5 text-xs text-ink-faint">
                      {formatBytes(icon.bytes)}
                    </p>
                  </div>
                </div>
                <a
                  href={icon.url}
                  download={icon.filename}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-line-strong bg-card px-4 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
                >
                  <IconDownload className="h-4 w-4" />
                  PNG
                </a>
              </div>
            ))}
          </div>

          {/* HTML link tags */}
          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-ink">
                  Add these to your &lt;head&gt;
                </p>
                <p className="mt-0.5 text-xs text-ink-faint">
                  Upload the PNGs to your site root, then paste these tags.
                </p>
              </div>
              <button
                type="button"
                onClick={copyTags}
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <IconCopy className="h-4 w-4" />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-paper-2 p-4 text-xs leading-relaxed text-ink-soft">
              <code>{LINK_TAGS}</code>
            </pre>
          </div>

          {/* Add another */}
          <Dropzone
            accept={ACCEPT}
            onFiles={onFiles}
            label="Generate from another image"
            hint="Replaces the current set — PNG, JPG, WebP or SVG"
          />
        </div>
      )}
    </div>
  );
}

/* Sequentially triggers each favicon download. */
function DownloadAll({ icons }: { icons: FavIcon[] }) {
  const [running, setRunning] = useState(false);

  const downloadAll = useCallback(() => {
    setRunning(true);
    icons.forEach((icon, idx) => {
      window.setTimeout(() => {
        const a = document.createElement("a");
        a.href = icon.url;
        a.download = icon.filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        if (idx === icons.length - 1) setRunning(false);
      }, idx * 250);
    });
  }, [icons]);

  return (
    <button
      type="button"
      onClick={downloadAll}
      disabled={running}
      className="inline-flex items-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      <IconDownload className="h-4 w-4" />
      {running ? "Downloading…" : `Download all (${icons.length})`}
    </button>
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
