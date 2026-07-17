"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
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

const ASPECTS: { label: string; value: number | null }[] = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
];

const ACCEPT = "image/jpeg,image/png,image/webp";
const VALID_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MIN = 10; // minimum crop side, natural px

type Handle = "nw" | "ne" | "sw" | "se";

type Src = {
  img: HTMLImageElement;
  name: string;
  type: Mime;
  width: number;
  height: number;
  size: number;
};

type Rect = { x: number; y: number; w: number; h: number };
type Output = { url: string; size: number; width: number; height: number; mime: Mime };

type Drag =
  | { mode: "move"; startClientX: number; startClientY: number; start: Rect }
  | {
      mode: "resize";
      handle: Handle;
      startClientX: number;
      startClientY: number;
      anchorX: number;
      anchorY: number;
      startMovingX: number;
      startMovingY: number;
    };

function baseName(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(0, dot) : name;
}

function resolveMime(choice: FormatChoice, original: Mime): Mime {
  return choice === "original" ? original : choice;
}

function clampInt(v: string | number, lo: number, hi: number): number {
  const n = Math.round(Number(v));
  if (!Number.isFinite(n)) return lo;
  return Math.max(lo, Math.min(hi, n));
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: Mime,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b), type, quality));
}

export default function CropImage() {
  const [src, setSrc] = useState<Src | null>(null);
  const [crop, setCrop] = useState<Rect>({ x: 0, y: 0, w: 0, h: 0 });
  const [aspect, setAspect] = useState<number | null>(null);
  const [format, setFormat] = useState<FormatChoice>("original");
  const [output, setOutput] = useState<Output | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dispW, setDispW] = useState(0);
  const [dragging, setDragging] = useState(false);

  const srcUrlRef = useRef<string | null>(null);
  const outUrlRef = useRef<string | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<Drag | null>(null);
  const cropRef = useRef<Rect>(crop);
  cropRef.current = crop;

  const dispScale = src && dispW ? dispW / src.width : 1;
  const dispScaleRef = useRef(1);
  dispScaleRef.current = dispScale;

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
        const w = img.naturalWidth;
        const h = img.naturalHeight;
        setSrc({
          img,
          name: file.name,
          type: file.type as Mime,
          width: w,
          height: h,
          size: file.size,
        });
        // Start with a centred 80% crop.
        setCrop({
          x: Math.round(w * 0.1),
          y: Math.round(h * 0.1),
          w: Math.round(w * 0.8),
          h: Math.round(h * 0.8),
        });
        setAspect(null);
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

  // Measure the rendered image width so overlay coords map to natural pixels.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !src) return;
    const update = () => setDispW(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [src]);

  // Re-encode the cropped region (debounced) for the result preview + download.
  useEffect(() => {
    if (!src || crop.w < 1 || crop.h < 1) {
      setOutput(null);
      return;
    }
    const timer = window.setTimeout(async () => {
      const mime = resolveMime(format, src.type);
      const canvas = document.createElement("canvas");
      canvas.width = crop.w;
      canvas.height = crop.h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      if (mime === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, crop.w, crop.h);
      }
      ctx.drawImage(
        src.img,
        crop.x,
        crop.y,
        crop.w,
        crop.h,
        0,
        0,
        crop.w,
        crop.h,
      );
      const blob = await canvasToBlob(
        canvas,
        mime,
        mime === "image/png" ? 1 : 0.92,
      );
      if (!blob) return;
      if (outUrlRef.current) URL.revokeObjectURL(outUrlRef.current);
      const url = URL.createObjectURL(blob);
      outUrlRef.current = url;
      setOutput({ url, size: blob.size, width: crop.w, height: crop.h, mime });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [src, crop, format]);

  /* --------------------------- pointer dragging --------------------------- */

  const startMove = useCallback(
    (e: ReactPointerEvent) => {
      e.preventDefault();
      dragRef.current = {
        mode: "move",
        startClientX: e.clientX,
        startClientY: e.clientY,
        start: cropRef.current,
      };
      setDragging(true);
    },
    [],
  );

  const startResize = useCallback(
    (e: ReactPointerEvent, handle: Handle) => {
      e.preventDefault();
      e.stopPropagation();
      const c = cropRef.current;
      // Anchor = the corner that stays fixed (opposite the dragged one).
      const anchorX = handle === "nw" || handle === "sw" ? c.x + c.w : c.x;
      const anchorY = handle === "nw" || handle === "ne" ? c.y + c.h : c.y;
      const startMovingX = handle === "ne" || handle === "se" ? c.x + c.w : c.x;
      const startMovingY = handle === "sw" || handle === "se" ? c.y + c.h : c.y;
      dragRef.current = {
        mode: "resize",
        handle,
        startClientX: e.clientX,
        startClientY: e.clientY,
        anchorX,
        anchorY,
        startMovingX,
        startMovingY,
      };
      setDragging(true);
    },
    [],
  );

  useEffect(() => {
    if (!dragging || !src) return;
    const natW = src.width;
    const natH = src.height;

    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      const scale = dispScaleRef.current || 1;
      if (!d) return;
      const natDx = (e.clientX - d.startClientX) / scale;
      const natDy = (e.clientY - d.startClientY) / scale;

      if (d.mode === "move") {
        const x = clampInt(d.start.x + natDx, 0, natW - d.start.w);
        const y = clampInt(d.start.y + natDy, 0, natH - d.start.h);
        setCrop({ x, y, w: d.start.w, h: d.start.h });
        return;
      }

      const { handle, anchorX, anchorY, startMovingX, startMovingY } = d;
      const mx = Math.max(0, Math.min(natW, startMovingX + natDx));
      const my = Math.max(0, Math.min(natH, startMovingY + natDy));
      const movingRight = handle === "ne" || handle === "se";
      const movingBelow = handle === "sw" || handle === "se";
      const availW = movingRight ? natW - anchorX : anchorX;
      const availH = movingBelow ? natH - anchorY : anchorY;
      const dx = movingRight ? mx - anchorX : anchorX - mx;
      const dy = movingBelow ? my - anchorY : anchorY - my;

      let w: number;
      let h: number;
      if (aspect) {
        w = Math.max(MIN, Math.min(dx, availW));
        h = w / aspect;
        if (h > availH) {
          h = availH;
          w = h * aspect;
        }
        if (w < MIN) {
          w = MIN;
          h = w / aspect;
        }
      } else {
        w = Math.max(MIN, Math.min(dx, availW));
        h = Math.max(MIN, Math.min(dy, availH));
      }
      const x = movingRight ? anchorX : anchorX - w;
      const y = movingBelow ? anchorY : anchorY - h;
      setCrop({
        x: Math.round(x),
        y: Math.round(y),
        w: Math.round(w),
        h: Math.round(h),
      });
    };

    const onUp = () => {
      dragRef.current = null;
      setDragging(false);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, src, aspect]);

  /* ----------------------------- input handlers --------------------------- */

  const setX = useCallback(
    (v: string) => setCrop((c) => ({ ...c, x: clampInt(v, 0, (src?.width ?? c.w) - c.w) })),
    [src],
  );
  const setY = useCallback(
    (v: string) => setCrop((c) => ({ ...c, y: clampInt(v, 0, (src?.height ?? c.h) - c.h) })),
    [src],
  );
  const setW = useCallback(
    (v: string) => {
      if (!src) return;
      setCrop((c) => {
        let w = clampInt(v, MIN, src.width - c.x);
        let h = c.h;
        if (aspect) {
          h = Math.round(w / aspect);
          if (c.y + h > src.height) {
            h = src.height - c.y;
            w = Math.round(h * aspect);
          }
        }
        return { ...c, w, h };
      });
    },
    [src, aspect],
  );
  const setH = useCallback(
    (v: string) => {
      if (!src) return;
      setCrop((c) => {
        let h = clampInt(v, MIN, src.height - c.y);
        let w = c.w;
        if (aspect) {
          w = Math.round(h * aspect);
          if (c.x + w > src.width) {
            w = src.width - c.x;
            h = Math.round(w / aspect);
          }
        }
        return { ...c, w, h };
      });
    },
    [src, aspect],
  );

  const chooseAspect = useCallback(
    (value: number | null) => {
      setAspect(value);
      if (value === null || !src) return;
      setCrop((c) => {
        let w = c.w;
        let h = Math.round(w / value);
        if (c.y + h > src.height) {
          h = src.height - c.y;
          w = Math.round(h * value);
        }
        if (c.x + w > src.width) {
          w = src.width - c.x;
          h = Math.round(w / value);
        }
        return { ...c, w, h };
      });
    },
    [src],
  );

  const reset = useCallback(() => {
    cleanup();
    setSrc(null);
    setOutput(null);
    setError(null);
    setCrop({ x: 0, y: 0, w: 0, h: 0 });
    setAspect(null);
    setFormat("original");
  }, [cleanup]);

  const outName = src && output ? `${baseName(src.name)}-cropped.${EXT[output.mime]}` : "";

  const box = {
    left: crop.x * dispScale,
    top: crop.y * dispScale,
    width: crop.w * dispScale,
    height: crop.h * dispScale,
  };

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
          {/* Crop stage */}
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <div className="flex justify-center">
              <div
                ref={wrapRef}
                className="relative inline-block max-w-full select-none leading-none"
                style={{ touchAction: "none" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={srcUrlRef.current ?? ""}
                  alt="Crop source"
                  draggable={false}
                  className="block h-auto max-w-full rounded-lg"
                />
                {dispW > 0 && (
                  <div
                    onPointerDown={startMove}
                    className="absolute cursor-move"
                    style={{
                      left: box.left,
                      top: box.top,
                      width: box.width,
                      height: box.height,
                      boxShadow: "0 0 0 9999px rgba(15,20,36,0.45)",
                      outline: "2px solid #ffffff",
                      touchAction: "none",
                    }}
                  >
                    {/* thirds guides */}
                    <div className="pointer-events-none absolute inset-0">
                      <div className="absolute inset-y-0 left-1/3 w-px bg-white/40" />
                      <div className="absolute inset-y-0 left-2/3 w-px bg-white/40" />
                      <div className="absolute inset-x-0 top-1/3 h-px bg-white/40" />
                      <div className="absolute inset-x-0 top-2/3 h-px bg-white/40" />
                    </div>
                    {(["nw", "ne", "sw", "se"] as Handle[]).map((h) => (
                      <span
                        key={h}
                        onPointerDown={(e) => startResize(e, h)}
                        className="absolute h-4 w-4 rounded-sm border-2 border-forest bg-white"
                        style={{
                          left: h === "nw" || h === "sw" ? -8 : undefined,
                          right: h === "ne" || h === "se" ? -8 : undefined,
                          top: h === "nw" || h === "ne" ? -8 : undefined,
                          bottom: h === "sw" || h === "se" ? -8 : undefined,
                          cursor:
                            h === "nw" || h === "se" ? "nwse-resize" : "nesw-resize",
                          touchAction: "none",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-ink-faint">
              Drag the box to move it, or drag a corner to resize. Source is{" "}
              {src.width} &times; {src.height} px.
            </p>
          </div>

          {/* Controls */}
          <div className="rounded-2xl border border-line bg-card p-6">
            <p className="text-sm font-medium text-ink-soft mb-2.5">Aspect ratio</p>
            <div className="flex flex-wrap gap-2">
              {ASPECTS.map((a) => (
                <button
                  key={a.label}
                  type="button"
                  onClick={() => chooseAspect(a.value)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                    aspect === a.value
                      ? "bg-forest text-white"
                      : "border border-line-strong bg-card text-ink-soft hover:border-forest"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <NumField label="X (px)" id="crop-x" value={crop.x} onChange={setX} />
              <NumField label="Y (px)" id="crop-y" value={crop.y} onChange={setY} />
              <NumField label="Width (px)" id="crop-w" value={crop.w} onChange={setW} />
              <NumField label="Height (px)" id="crop-h" value={crop.h} onChange={setH} />
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
            </div>
          </div>

          {/* Result */}
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex justify-center rounded-xl border border-line bg-card p-3">
                {output && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={output.url}
                    alt="Cropped preview"
                    className="max-h-64 w-auto max-w-full rounded-md object-contain"
                  />
                )}
              </div>
              <div className="sm:w-56">
                {output && (
                  <div className="rounded-xl bg-card border border-line px-4 py-3">
                    <InfoRow
                      label="Cropped size"
                      value={`${output.width} × ${output.height}`}
                      accent="forest"
                    />
                    <InfoRow label="File size" value={formatBytes(output.size)} />
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

function NumField({
  label,
  id,
  value,
  onChange,
}: {
  label: string;
  id: string;
  value: number;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-medium text-ink-soft">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1.5 w-full rounded-lg border border-line-strong bg-card px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-forest"
      />
    </div>
  );
}
