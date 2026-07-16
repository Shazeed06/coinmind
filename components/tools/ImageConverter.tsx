"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dropzone,
  InfoRow,
  DownloadButton,
  PrivacyNote,
  formatBytes,
} from "@/components/tools/ToolShell";

type Format = "image/png" | "image/jpeg" | "image/webp";

const FORMATS: { mime: Format; label: string; ext: string }[] = [
  { mime: "image/png", label: "PNG", ext: "png" },
  { mime: "image/jpeg", label: "JPG", ext: "jpg" },
  { mime: "image/webp", label: "WebP", ext: "webp" },
];

const LABEL: Record<Format, string> = {
  "image/png": "PNG",
  "image/jpeg": "JPG",
  "image/webp": "WebP",
};
const EXT: Record<Format, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

type Item = {
  id: string;
  name: string;
  originalSize: number;
  originalType: string;
  previewUrl: string;
  convertedUrl: string;
  convertedSize: number;
  width: number;
  height: number;
};

const ACCEPT = "image/jpeg,image/png,image/webp";
const VALID_TYPES = ["image/jpeg", "image/png", "image/webp"];

function baseName(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(0, dot) : name;
}

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
    (img as HTMLImageElement & { _objectUrl?: string })._objectUrl = url;
  });
}

export default function ImageConverter() {
  const [items, setItems] = useState<Item[]>([]);
  const [format, setFormat] = useState<Format>("image/png");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const urlsRef = useRef<Set<string>>(new Set());
  const filesRef = useRef<File[]>([]);

  const trackUrl = useCallback((url: string) => {
    urlsRef.current.add(url);
    return url;
  }, []);

  const revokeAll = useCallback(() => {
    urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    urlsRef.current.clear();
  }, []);

  useEffect(() => () => revokeAll(), [revokeAll]);

  const convertOne = useCallback(
    async (file: File, fmt: Format): Promise<Item | null> => {
      const img = await loadImage(file);
      const objectUrl = (img as HTMLImageElement & { _objectUrl?: string })
        ._objectUrl;
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      // JPEG has no alpha — paint a white background before drawing.
      if (fmt === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      // For JPEG/WebP use a sensible quality; PNG ignores it.
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), fmt, fmt === "image/png" ? undefined : 0.92),
      );
      if (!blob) return null;

      if (objectUrl) trackUrl(objectUrl);
      const convertedUrl = trackUrl(URL.createObjectURL(blob));

      return {
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: file.name,
        originalSize: file.size,
        originalType: file.type,
        previewUrl: objectUrl ?? convertedUrl,
        convertedUrl,
        convertedSize: blob.size,
        width: img.naturalWidth,
        height: img.naturalHeight,
      };
    },
    [trackUrl],
  );

  const process = useCallback(
    async (files: File[], fmt: Format) => {
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
            const item = await convertOne(file, fmt);
            if (item) results.push(item);
          } catch {
            // Skip files that fail to decode.
          }
        }
        setItems(results);
        if (!results.length) {
          setError("None of the selected images could be converted.");
        }
      } finally {
        setBusy(false);
      }
    },
    [convertOne],
  );

  const onFiles = useCallback(
    (files: File[]) => {
      filesRef.current = files;
      revokeAll();
      void process(files, format);
    },
    [format, process, revokeAll],
  );

  const changeFormat = useCallback(
    (fmt: Format) => {
      setFormat(fmt);
      if (filesRef.current.length) {
        revokeAll();
        void process(filesRef.current, fmt);
      }
    },
    [process, revokeAll],
  );

  const reset = useCallback(() => {
    revokeAll();
    filesRef.current = [];
    setItems([]);
    setError(null);
  }, [revokeAll]);

  return (
    <div className="space-y-6">
      <PrivacyNote />

      {/* Format picker */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <p className="text-sm font-medium text-ink-soft mb-2.5">
          Convert to
        </p>
        <div className="flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.mime}
              type="button"
              onClick={() => changeFormat(f.mime)}
              className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
                format === f.mime
                  ? "bg-forest text-white"
                  : "border border-line-strong bg-card text-ink-soft hover:border-forest"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-faint">
          {format === "image/jpeg"
            ? "JPG has no transparency — transparent areas become white."
            : format === "image/png"
              ? "PNG keeps transparency and is lossless (larger files)."
              : "WebP keeps transparency and gives small, high-quality files."}
        </p>
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

      {busy && <p className="text-sm text-ink-faint">Converting images…</p>}

      {/* Results */}
      {items.length > 0 && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-ink-soft">
                Converted{" "}
                <strong className="text-ink">{items.length}</strong> image
                {items.length > 1 ? "s" : ""} to{" "}
                <strong className="text-forest">{LABEL[format]}</strong>.
              </p>
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => {
              const outName = `${baseName(item.name)}.${EXT[format]}`;
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
                      <span className="mt-2 inline-block rounded-full bg-forest-soft px-2 py-0.5 text-xs font-semibold text-forest">
                        {LABEL[format]}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 rounded-xl bg-paper-2 px-3 py-2">
                    <InfoRow
                      label={`Original (${item.originalType.split("/")[1]?.toUpperCase() || "?"})`}
                      value={formatBytes(item.originalSize)}
                    />
                    <InfoRow
                      label={`Converted (${LABEL[format]})`}
                      value={formatBytes(item.convertedSize)}
                      accent="forest"
                    />
                  </div>
                  <div className="mt-3">
                    <DownloadButton
                      href={item.convertedUrl}
                      filename={outName}
                      full
                    >
                      Download {LABEL[format]}
                    </DownloadButton>
                  </div>
                </div>
              );
            })}
          </div>

          <Dropzone
            accept={ACCEPT}
            multiple
            onFiles={onFiles}
            label="Convert more images"
            hint="Replaces the current batch — JPG, PNG or WebP"
          />
        </div>
      )}
    </div>
  );
}

function DownloadAll({ items, format }: { items: Item[]; format: Format }) {
  const [running, setRunning] = useState(false);

  const downloadAll = useCallback(() => {
    setRunning(true);
    items.forEach((item, idx) => {
      window.setTimeout(() => {
        const a = document.createElement("a");
        a.href = item.convertedUrl;
        a.download = `${baseName(item.name)}.${EXT[format]}`;
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
