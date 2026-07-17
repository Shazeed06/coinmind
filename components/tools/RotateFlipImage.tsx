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

type Src = {
  img: HTMLImageElement;
  name: string;
  type: Mime;
  width: number;
  height: number;
  size: number;
};

type Output = { url: string; size: number; width: number; height: number; mime: Mime };

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
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), type, quality));
}

export default function RotateFlipImage() {
  const [src, setSrc] = useState<Src | null>(null);
  const [rotation, setRotation] = useState(0); // 0 | 90 | 180 | 270, clockwise
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [format, setFormat] = useState<FormatChoice>("original");
  const [output, setOutput] = useState<Output | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setRotation(0);
        setFlipH(false);
        setFlipV(false);
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

  // Live preview — re-render on every transform or format change.
  useEffect(() => {
    if (!src) return;
    const timer = window.setTimeout(async () => {
      const swap = rotation === 90 || rotation === 270;
      const cw = swap ? src.height : src.width;
      const ch = swap ? src.width : src.height;
      const canvas = document.createElement("canvas");
      canvas.width = cw;
      canvas.height = ch;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const mime = resolveMime(format, src.type);
      // JPEG has no alpha — flatten transparency onto white first.
      if (mime === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, cw, ch);
      }
      ctx.translate(cw / 2, ch / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      ctx.drawImage(src.img, -src.width / 2, -src.height / 2, src.width, src.height);

      const blob = await canvasToBlob(
        canvas,
        mime,
        mime === "image/png" ? 1 : 0.92,
      );
      if (!blob) return;
      if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
      const url = URL.createObjectURL(blob);
      outUrlRef.current = url;
      setOutput({ url, size: blob.size, width: cw, height: ch, mime });
    }, 60);

    return () => window.clearTimeout(timer);
  }, [src, rotation, flipH, flipV, format]);

  const rotateLeft = useCallback(() => setRotation((r) => (r + 270) % 360), []);
  const rotateRight = useCallback(() => setRotation((r) => (r + 90) % 360), []);

  const reset = useCallback(() => {
    cleanup();
    setSrc(null);
    setOutput(null);
    setError(null);
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
    setFormat("original");
  }, [cleanup]);

  const outName = src && output ? `${baseName(src.name)}-rotated.${EXT[output.mime]}` : "";
  const unchanged = rotation === 0 && !flipH && !flipV;

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
          {/* Transform controls */}
          <div className="rounded-2xl border border-line bg-card p-6">
            <p className="text-sm font-medium text-ink-soft mb-2.5">Transform</p>
            <div className="flex flex-wrap gap-2">
              <TransformButton onClick={rotateLeft} label="Rotate left">
                <IconRotateLeft className="h-4 w-4" />
                Rotate left
              </TransformButton>
              <TransformButton onClick={rotateRight} label="Rotate right">
                <IconRotateRight className="h-4 w-4" />
                Rotate right
              </TransformButton>
              <TransformButton
                onClick={() => setFlipH((v) => !v)}
                label="Flip horizontal"
                active={flipH}
              >
                <IconFlipH className="h-4 w-4" />
                Flip horizontal
              </TransformButton>
              <TransformButton
                onClick={() => setFlipV((v) => !v)}
                label="Flip vertical"
                active={flipV}
              >
                <IconFlipV className="h-4 w-4" />
                Flip vertical
              </TransformButton>
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              Rotation: {rotation}&deg;
              {flipH ? " · flipped horizontally" : ""}
              {flipV ? " · flipped vertically" : ""}
              {unchanged ? " · no changes yet" : ""}
            </p>

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
            </div>
          </div>

          {/* Preview + result */}
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex justify-center rounded-xl border border-line bg-card p-3">
                {output && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={output.url}
                    alt="Transformed preview"
                    className="max-h-72 w-auto max-w-full rounded-md object-contain"
                  />
                )}
              </div>

              <div className="sm:w-56">
                {output && (
                  <div className="rounded-xl bg-card border border-line px-4 py-3">
                    <InfoRow
                      label="Dimensions"
                      value={`${output.width} × ${output.height}`}
                      accent="forest"
                    />
                    <InfoRow label="Size" value={formatBytes(output.size)} />
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

function TransformButton({
  onClick,
  label,
  active = false,
  children,
}: {
  onClick: () => void;
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
        active
          ? "bg-forest text-white"
          : "border border-line-strong bg-card text-ink-soft hover:border-forest hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------ icons ------------------------------ */

function IconRotateLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 5v6h6" />
      <path d="M3.5 11a9 9 0 1 1 .5 4" />
    </svg>
  );
}

function IconRotateRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 5v6h-6" />
      <path d="M20.5 11a9 9 0 1 0-.5 4" />
    </svg>
  );
}

function IconFlipH({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v18" strokeDasharray="3 3" />
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
    </svg>
  );
}

function IconFlipV({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h18" strokeDasharray="3 3" />
      <path d="m8 8 4-4 4 4" />
      <path d="m8 16 4 4 4-4" />
    </svg>
  );
}
