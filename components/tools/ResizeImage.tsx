"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dropzone,
  InfoRow,
  DownloadButton,
  PrivacyNote,
  formatBytes,
} from "@/components/tools/ToolShell";

type Mime = "image/jpeg" | "image/png" | "image/webp";
type FormatChoice = "original" | Mime;

const LABEL: Record<Mime, string> = {
  "image/jpeg": "JPG",
  "image/png": "PNG",
  "image/webp": "WebP",
};
const EXT: Record<Mime, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const FORMAT_OPTIONS: { choice: FormatChoice; label: string }[] = [
  { choice: "original", label: "Keep original" },
  { choice: "image/jpeg", label: "JPG" },
  { choice: "image/png", label: "PNG" },
  { choice: "image/webp", label: "WebP" },
];

const ACCEPT = "image/jpeg,image/png,image/webp";
const VALID_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_DIMENSION = 12000;

type Src = {
  img: HTMLImageElement;
  name: string;
  type: Mime;
  width: number;
  height: number;
  size: number;
};

type Output = {
  url: string;
  size: number;
  width: number;
  height: number;
  mime: Mime;
};

function baseName(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(0, dot) : name;
}

function resolveMime(choice: FormatChoice, original: Mime): Mime {
  return choice === "original" ? original : choice;
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: Mime,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), type, quality),
  );
}

export default function ResizeImage() {
  const [src, setSrc] = useState<Src | null>(null);
  const [widthStr, setWidthStr] = useState("");
  const [heightStr, setHeightStr] = useState("");
  const [scaleStr, setScaleStr] = useState("100");
  const [lock, setLock] = useState(true);
  const [format, setFormat] = useState<FormatChoice>("original");
  const [output, setOutput] = useState<Output | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Object-URL bookkeeping — one for the decoded source, one for the current
  // re-encoded output. Both are revoked on reset and unmount.
  const srcUrlRef = useRef<string | null>(null);
  const outUrlRef = useRef<string | null>(null);

  const cleanup = useCallback(() => {
    if (srcUrlRef.current) URL.revokeObjectURL(srcUrlRef.current);
    if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
    srcUrlRef.current = null;
    outUrlRef.current = null;
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const onFiles = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;
      if (!VALID_TYPES.includes(file.type)) {
        setError("Please choose a JPG, PNG or WebP image file.");
        return;
      }
      setError(null);
      cleanup();
      const url = URL.createObjectURL(file);
      srcUrlRef.current = url;
      const img = new Image();
      img.onload = () => {
        setSrc({
          img,
          name: file.name,
          type: file.type as Mime,
          width: img.naturalWidth,
          height: img.naturalHeight,
          size: file.size,
        });
        setWidthStr(String(img.naturalWidth));
        setHeightStr(String(img.naturalHeight));
        setScaleStr("100");
        setFormat("original");
      };
      img.onerror = () => {
        cleanup();
        setError("That image could not be decoded. Try another file.");
      };
      img.src = url;
    },
    [cleanup],
  );

  // Re-encode whenever the target size or format changes (debounced so typing
  // stays smooth).
  useEffect(() => {
    if (!src) return;
    const w = Math.round(Number(widthStr));
    const h = Math.round(Number(heightStr));
    if (!Number.isFinite(w) || !Number.isFinite(h) || w < 1 || h < 1) {
      setOutput(null);
      return;
    }
    if (w > MAX_DIMENSION || h > MAX_DIMENSION) {
      setOutput(null);
      setError(`Keep each dimension under ${MAX_DIMENSION.toLocaleString()} px.`);
      return;
    }
    setError(null);

    const timer = window.setTimeout(async () => {
      const mime = resolveMime(format, src.type);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      // JPEG has no alpha — flatten transparency onto white first.
      if (mime === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
      }
      ctx.drawImage(src.img, 0, 0, w, h);
      const blob = await canvasToBlob(
        canvas,
        mime,
        mime === "image/png" ? 1 : 0.92,
      );
      if (!blob) return;
      if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
      const url = URL.createObjectURL(blob);
      outUrlRef.current = url;
      setOutput({ url, size: blob.size, width: w, height: h, mime });
    }, 140);

    return () => window.clearTimeout(timer);
  }, [src, widthStr, heightStr, format]);

  const onWidthChange = useCallback(
    (v: string) => {
      setWidthStr(v);
      const n = Number(v);
      if (src && lock && Number.isFinite(n) && n > 0) {
        setHeightStr(String(Math.round((n * src.height) / src.width)));
      }
      if (src && Number.isFinite(n) && n > 0) {
        setScaleStr(String(Math.round((n / src.width) * 100)));
      }
    },
    [src, lock],
  );

  const onHeightChange = useCallback(
    (v: string) => {
      setHeightStr(v);
      const n = Number(v);
      if (src && lock && Number.isFinite(n) && n > 0) {
        setWidthStr(String(Math.round((n * src.width) / src.height)));
      }
      if (src && Number.isFinite(n) && n > 0) {
        setScaleStr(String(Math.round((n / src.height) * 100)));
      }
    },
    [src, lock],
  );

  const onScaleChange = useCallback(
    (v: string) => {
      setScaleStr(v);
      const n = Number(v);
      if (src && Number.isFinite(n) && n > 0) {
        setWidthStr(String(Math.max(1, Math.round((src.width * n) / 100))));
        setHeightStr(String(Math.max(1, Math.round((src.height * n) / 100))));
      }
    },
    [src],
  );

  const toggleLock = useCallback(() => {
    setLock((prev) => {
      const next = !prev;
      if (next && src) {
        const n = Number(widthStr);
        if (Number.isFinite(n) && n > 0) {
          setHeightStr(String(Math.round((n * src.height) / src.width)));
        }
      }
      return next;
    });
  }, [src, widthStr]);

  const reset = useCallback(() => {
    cleanup();
    setSrc(null);
    setOutput(null);
    setError(null);
    setWidthStr("");
    setHeightStr("");
    setScaleStr("100");
    setFormat("original");
    setLock(true);
  }, [cleanup]);

  const outName = src && output ? `${baseName(src.name)}-resized.${EXT[output.mime]}` : "";

  return (
    <div className="space-y-6">
      <PrivacyNote />

      {!src && <Dropzone accept={ACCEPT} onFiles={onFiles} hint="or click to browse — JPG, PNG or WebP" />}

      {error && (
        <p className="rounded-lg border border-berry/30 bg-berry/5 px-4 py-3 text-sm text-berry">
          {error}
        </p>
      )}

      {src && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="resize-width"
                  className="text-sm font-medium text-ink-soft"
                >
                  Width (px)
                </label>
                <input
                  id="resize-width"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={widthStr}
                  onChange={(e) => onWidthChange(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-forest"
                />
              </div>
              <div>
                <label
                  htmlFor="resize-height"
                  className="text-sm font-medium text-ink-soft"
                >
                  Height (px)
                </label>
                <input
                  id="resize-height"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={heightStr}
                  onChange={(e) => onHeightChange(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-forest"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                type="button"
                onClick={toggleLock}
                aria-pressed={lock}
                className="inline-flex items-center gap-2.5 text-sm font-medium text-ink-soft"
              >
                <span
                  className={`grid h-5 w-5 place-items-center rounded-md border transition-colors ${
                    lock
                      ? "border-forest bg-forest text-white"
                      : "border-line-strong bg-card text-transparent"
                  }`}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m3 8 3.5 3.5L13 4.5" />
                  </svg>
                </span>
                Lock aspect ratio
              </button>

              <div className="flex items-center gap-2">
                <label htmlFor="resize-scale" className="text-sm font-medium text-ink-soft">
                  Scale
                </label>
                <input
                  id="resize-scale"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  value={scaleStr}
                  onChange={(e) => onScaleChange(e.target.value)}
                  className="w-20 rounded-lg border border-line-strong bg-card px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-forest"
                />
                <span className="text-sm text-ink-faint">%</span>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium text-ink-soft mb-2.5">Output format</p>
              <div className="flex flex-wrap gap-2">
                {FORMAT_OPTIONS.map((f) => (
                  <button
                    key={f.choice}
                    type="button"
                    onClick={() => setFormat(f.choice)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                      format === f.choice
                        ? "bg-forest text-white"
                        : "border border-line-strong bg-card text-ink-soft hover:border-forest"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <p className="mt-2.5 text-xs text-ink-faint">
                Original was {src.width} &times; {src.height} px (
                {formatBytes(src.size)}, {LABEL[src.type]}).
              </p>
            </div>
          </div>

          {/* Preview + result */}
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="min-w-0">
                {output ? (
                  <div className="flex justify-center rounded-xl border border-line bg-card p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={output.url}
                      alt="Resized preview"
                      className="max-h-72 w-auto max-w-full rounded-md object-contain"
                    />
                  </div>
                ) : (
                  <div className="grid h-40 place-items-center rounded-xl border border-dashed border-line-strong bg-card text-sm text-ink-faint">
                    Enter a width and height to preview.
                  </div>
                )}
              </div>

              <div className="sm:w-56">
                {output && (
                  <div className="rounded-xl bg-card border border-line px-4 py-3">
                    <InfoRow
                      label="New dimensions"
                      value={`${output.width} × ${output.height}`}
                      accent="forest"
                    />
                    <InfoRow label="New size" value={formatBytes(output.size)} />
                    <InfoRow label="Format" value={LABEL[output.mime]} />
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  {output && (
                    <DownloadButton href={output.url} filename={outName} full>
                      Download {LABEL[output.mime]}
                    </DownloadButton>
                  )}
                  <button
                    type="button"
                    onClick={reset}
                    className="inline-flex w-full items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
                  >
                    Start over
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
