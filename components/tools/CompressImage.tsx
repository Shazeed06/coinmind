"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dropzone,
  InfoRow,
  DownloadButton,
  PrivacyNote,
  formatBytes,
} from "@/components/tools/ToolShell";

type OutputFormat = "image/jpeg" | "image/webp" | "image/png";

const FORMAT_LABEL: Record<OutputFormat, string> = {
  "image/jpeg": "JPG",
  "image/webp": "WebP",
  "image/png": "PNG",
};

const FORMAT_EXT: Record<OutputFormat, string> = {
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/png": "png",
};

type Item = {
  id: string;
  name: string;
  originalSize: number;
  originalType: string;
  previewUrl: string; // original, for thumbnail
  compressedUrl: string;
  compressedSize: number;
  width: number;
  height: number;
};

const ACCEPT = "image/jpeg,image/png,image/webp";
const VALID_TYPES = ["image/jpeg", "image/png", "image/webp"];

function baseName(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(0, dot) : name;
}

/** Load a File into an HTMLImageElement, resolving once decoded. */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not decode image"));
    };
    img.src = url;
    // Keep the URL alive; caller reuses it as the thumbnail and revokes later.
    (img as HTMLImageElement & { _objectUrl?: string })._objectUrl = url;
  });
}

export default function CompressImage() {
  const [items, setItems] = useState<Item[]>([]);
  const [format, setFormat] = useState<OutputFormat>("image/jpeg");
  const [quality, setQuality] = useState(0.7);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const compressOne = useCallback(
    async (
      file: File,
      fmt: OutputFormat,
      q: number,
    ): Promise<Item | null> => {
      const img = await loadImage(file);
      const objectUrl = (img as HTMLImageElement & { _objectUrl?: string })
        ._objectUrl;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      // JPEG has no alpha channel — flatten transparency onto white.
      if (fmt === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob | null>((resolve) =>
        // PNG ignores the quality arg (lossless); JPEG/WebP honour it.
        canvas.toBlob((b) => resolve(b), fmt, q),
      );
      if (!blob) return null;

      if (objectUrl) trackUrl(objectUrl);
      const compressedUrl = trackUrl(URL.createObjectURL(blob));

      return {
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        originalSize: file.size,
        originalType: file.type,
        previewUrl: objectUrl ?? compressedUrl,
        compressedUrl,
        compressedSize: blob.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
    },
    [trackUrl],
  );

  const process = useCallback(
    async (files: File[], fmt: OutputFormat, q: number) => {
      const valid = files.filter((f) => VALID_TYPES.includes(f.type));
      const rejected = files.length - valid.length;
      if (!valid.length) {
        setError("Please choose JPG, PNG or WebP image files.");
        return;
      }
      setError(
        rejected > 0
          ? `${rejected} file${rejected > 1 ? "s were" : " was"} skipped — only JPG, PNG and WebP are supported.`
          : null,
      );
      setBusy(true);
      try {
        const results: Item[] = [];
        for (const file of valid) {
          try {
            const item = await compressOne(file, fmt, q);
            if (item) results.push(item);
          } catch {
            // Skip individual files that fail to decode.
          }
        }
        setItems(results);
        if (!results.length) {
          setError("None of the selected images could be processed.");
        }
      } finally {
        setBusy(false);
      }
    },
    [compressOne],
  );

  // Keep the raw files so we can re-run when the slider/format changes.
  const filesRef = useRef<File[]>([]);

  const onFiles = useCallback(
    (files: File[]) => {
      filesRef.current = files;
      revokeAll();
      void process(files, format, quality);
    },
    [format, quality, process, revokeAll],
  );

  const reprocess = useCallback(
    (fmt: OutputFormat, q: number) => {
      if (!filesRef.current.length) return;
      revokeAll();
      void process(filesRef.current, fmt, q);
    },
    [process, revokeAll],
  );

  const reset = useCallback(() => {
    revokeAll();
    filesRef.current = [];
    setItems([]);
    setError(null);
  }, [revokeAll]);

  const totalOriginal = items.reduce((s, i) => s + i.originalSize, 0);
  const totalCompressed = items.reduce((s, i) => s + i.compressedSize, 0);
  const totalSaved =
    totalOriginal > 0
      ? Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100)
      : 0;

  const showQuality = format !== "image/png";

  return (
    <div className="space-y-6">
      <PrivacyNote />

      {/* Controls */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-ink-soft mb-2.5">
              Output format
            </p>
            <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
              {(Object.keys(FORMAT_LABEL) as OutputFormat[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setFormat(f);
                    reprocess(f, quality);
                  }}
                  className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                    format === f
                      ? "bg-forest text-white"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {FORMAT_LABEL[f]}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-faint">
              {format === "image/png"
                ? "PNG is lossless — for real savings, convert to JPG or WebP."
                : "WebP usually gives the smallest files at the same quality."}
            </p>
          </div>

          <div className={showQuality ? "" : "opacity-40 pointer-events-none"}>
            <div className="flex items-center justify-between gap-3">
              <label className="text-sm font-medium text-ink-soft">
                Quality
              </label>
              <span className="text-sm font-semibold text-ink">
                {Math.round(quality * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              onMouseUp={() => reprocess(format, quality)}
              onTouchEnd={() => reprocess(format, quality)}
              onKeyUp={() => reprocess(format, quality)}
              className="mt-3"
              aria-label="Compression quality"
              disabled={!showQuality}
            />
            <p className="mt-1.5 text-xs text-ink-faint">
              Lower quality = smaller file. 70% is a good balance for photos.
            </p>
          </div>
        </div>
      </div>

      {/* Dropzone */}
      {items.length === 0 && (
        <Dropzone accept={ACCEPT} multiple onFiles={onFiles} />
      )}

      {error && (
        <p className="rounded-lg border border-berry/30 bg-berry/5 px-4 py-3 text-sm text-berry">
          {error}
        </p>
      )}

      {busy && (
        <p className="text-sm text-ink-faint">Compressing images…</p>
      )}

      {/* Results */}
      {items.length > 0 && (
        <div className="space-y-5">
          {/* Summary panel */}
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-brass">
                  Total saved
                </p>
                <p className="mt-1 font-display text-4xl font-600 text-forest">
                  {totalSaved > 0 ? `${totalSaved}%` : "0%"}
                </p>
                <p className="mt-1 text-sm text-ink-soft">
                  {formatBytes(totalOriginal)} &rarr;{" "}
                  {formatBytes(totalCompressed)} across {items.length} image
                  {items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.length > 1 && (
                  <DownloadAll items={items} format={format} />
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
                >
                  Start over
                </button>
              </div>
            </div>
            {totalSaved <= 0 && (
              <p className="mt-4 rounded-xl bg-card border border-line p-3 text-sm text-ink-soft">
                This output isn&apos;t smaller than the original. Try a lower
                quality, or convert to WebP for better compression.
              </p>
            )}
          </div>

          {/* Per-image cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => {
              const saved =
                item.originalSize > 0
                  ? Math.round(
                      ((item.originalSize - item.compressedSize) /
                        item.originalSize) *
                        100,
                    )
                  : 0;
              const outName = `${baseName(item.name)}.${FORMAT_EXT[format]}`;
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-line bg-card p-4"
                >
                  <div className="flex gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.previewUrl}
                      alt={item.name}
                      className="h-20 w-20 shrink-0 rounded-lg border border-line object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink" title={item.name}>
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs text-ink-faint">
                        {item.width} &times; {item.height} px
                      </p>
                      <span
                        className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                          saved > 0
                            ? "bg-brass-soft text-brass"
                            : "bg-paper-2 text-ink-faint"
                        }`}
                      >
                        {saved > 0 ? `${saved}% smaller` : "No saving"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl bg-paper-2 px-3 py-2">
                    <InfoRow
                      label={`Original (${item.originalType.split("/")[1]?.toUpperCase() || "?"})`}
                      value={formatBytes(item.originalSize)}
                    />
                    <InfoRow
                      label={`Compressed (${FORMAT_LABEL[format]})`}
                      value={formatBytes(item.compressedSize)}
                      accent="forest"
                    />
                  </div>
                  <div className="mt-3">
                    <DownloadButton
                      href={item.compressedUrl}
                      filename={outName}
                      full
                    >
                      Download {FORMAT_LABEL[format]}
                    </DownloadButton>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add more */}
          <Dropzone
            accept={ACCEPT}
            multiple
            onFiles={onFiles}
            label="Compress more images"
            hint="Replaces the current batch — JPG, PNG or WebP"
          />
        </div>
      )}
    </div>
  );
}

/* Sequentially triggers each per-image download. */
function DownloadAll({
  items,
  format,
}: {
  items: Item[];
  format: OutputFormat;
}) {
  const [running, setRunning] = useState(false);

  const downloadAll = useCallback(() => {
    setRunning(true);
    items.forEach((item, idx) => {
      window.setTimeout(() => {
        const a = document.createElement("a");
        a.href = item.compressedUrl;
        a.download = `${baseName(item.name)}.${FORMAT_EXT[format]}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        if (idx === items.length - 1) setRunning(false);
      }, idx * 250);
    });
  }, [items, format]);

  return (
    <button
      type="button"
      onClick={downloadAll}
      disabled={running}
      className="inline-flex items-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {running ? "Downloading…" : `Download all (${items.length})`}
    </button>
  );
}
