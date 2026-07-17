"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { IconDownload, IconShield } from "@/components/tools/ToolShell";

/* ------------------------------------------------------------------ */
/*  QR Code Generator — 100% client-side.                             */
/*  Renders live to a <canvas> via QRCode.toCanvas and exports        */
/*  PNG (from the canvas) and SVG (via QRCode.toString).              */
/* ------------------------------------------------------------------ */

type Ecc = "L" | "M" | "Q" | "H";

const ECC_LEVELS: { value: Ecc; label: string; blurb: string }[] = [
  { value: "L", label: "L", blurb: "Low — recovers ~7% damage. Smallest, densest code." },
  { value: "M", label: "M", blurb: "Medium — recovers ~15% damage. The standard default." },
  { value: "Q", label: "Q", blurb: "Quartile — recovers ~25% damage. Good for print." },
  { value: "H", label: "H", blurb: "High — recovers ~30% damage. Best for logos or wear." },
];

const DEFAULT_TEXT = "https://www.coinmind.in";

export default function QrCodeGenerator() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [size, setSize] = useState(300);
  const [level, setLevel] = useState<Ecc>("M");
  const [fg, setFg] = useState("#0f1424");
  const [bg, setBg] = useState("#ffffff");

  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const trimmed = text.trim();
  const sameColor = fg.toLowerCase() === bg.toLowerCase();

  // Live render — debounced so fast typing / dragging stays smooth.
  useEffect(() => {
    let cancelled = false;
    const timer = window.setTimeout(async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (!trimmed) {
        const ctx = canvas.getContext("2d");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
        setReady(false);
        setError(null);
        return;
      }

      try {
        await QRCode.toCanvas(canvas, trimmed, {
          errorCorrectionLevel: level,
          width: size,
          margin: 2,
          color: { dark: fg, light: bg },
        });
        if (!cancelled) {
          setReady(true);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setReady(false);
          setError(
            "This text is too long to fit in a single QR code. Shorten it, or lower the error-correction level.",
          );
        }
      }
    }, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [trimmed, size, level, fg, bg]);

  const downloadPng = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [ready]);

  const downloadSvg = useCallback(async () => {
    if (!ready || !trimmed) return;
    try {
      const svg = await QRCode.toString(trimmed, {
        type: "svg",
        errorCorrectionLevel: level,
        width: size,
        margin: 2,
        color: { dark: fg, light: bg },
      });
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "qr-code.svg";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not export SVG — try a shorter input or a lower error-correction level.");
    }
  }, [ready, trimmed, level, size, fg, bg]);

  return (
    <div className="space-y-6">
      {/* Privacy note */}
      <div className="flex items-start gap-3 rounded-2xl border border-brass-soft bg-brass-soft/50 p-4">
        <IconShield className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
        <p className="text-sm text-ink-soft">
          <strong className="text-ink">100% private.</strong> Your QR codes are
          generated entirely in your browser. Nothing you type is uploaded or
          stored &mdash; the data never leaves your device.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Options */}
        <div className="rounded-2xl border border-line bg-card p-6">
          {/* Content */}
          <label
            htmlFor="qr-text"
            className="block text-sm font-medium text-ink-soft"
          >
            Text or URL
          </label>
          <textarea
            id="qr-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="https://example.com — or any text, Wi-Fi details, a phone number…"
            className="mt-2 w-full resize-y rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
          />
          <p className="mt-1.5 text-xs text-ink-faint">
            {trimmed
              ? `${text.length} character${text.length === 1 ? "" : "s"}`
              : "Enter something to generate a QR code."}
          </p>

          {/* Size */}
          <div className="mt-6">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="qr-size" className="text-sm font-medium text-ink-soft">
                Size
              </label>
              <span className="text-sm font-semibold text-ink">{size} px</span>
            </div>
            <input
              id="qr-size"
              type="range"
              min={128}
              max={1024}
              step={4}
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="mt-3"
              aria-label="QR code size in pixels"
            />
            <p className="mt-1.5 text-xs text-ink-faint">
              Bigger codes stay sharp when printed large. Downloads use the full
              resolution.
            </p>
          </div>

          {/* Error correction */}
          <div className="mt-6">
            <p className="text-sm font-medium text-ink-soft mb-2.5">
              Error correction
            </p>
            <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
              {ECC_LEVELS.map((lvl) => (
                <button
                  key={lvl.value}
                  type="button"
                  onClick={() => setLevel(lvl.value)}
                  aria-pressed={level === lvl.value}
                  className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                    level === lvl.value
                      ? "bg-forest text-white"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {lvl.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-faint">
              {ECC_LEVELS.find((l) => l.value === level)?.blurb}
            </p>
          </div>

          {/* Colours */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="qr-fg"
                className="block text-sm font-medium text-ink-soft"
              >
                Foreground
              </label>
              <div className="mt-2 flex items-center gap-2.5">
                <input
                  id="qr-fg"
                  type="color"
                  value={fg}
                  onChange={(e) => setFg(e.target.value)}
                  className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-line-strong bg-card p-1"
                  aria-label="Foreground colour"
                />
                <span className="text-sm font-medium uppercase text-ink-soft">
                  {fg}
                </span>
              </div>
            </div>
            <div>
              <label
                htmlFor="qr-bg"
                className="block text-sm font-medium text-ink-soft"
              >
                Background
              </label>
              <div className="mt-2 flex items-center gap-2.5">
                <input
                  id="qr-bg"
                  type="color"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-line-strong bg-card p-1"
                  aria-label="Background colour"
                />
                <span className="text-sm font-medium uppercase text-ink-soft">
                  {bg}
                </span>
              </div>
            </div>
          </div>
          {sameColor && (
            <p className="mt-3 text-xs text-berry">
              Foreground and background are the same colour &mdash; the code
              won&apos;t be scannable. Pick a high-contrast pair.
            </p>
          )}
        </div>

        {/* Preview */}
        <div className="flex flex-col rounded-2xl border border-line bg-paper-2 p-6">
          <div className="flex flex-1 items-center justify-center py-4">
            <canvas
              ref={canvasRef}
              className={`h-auto w-full max-w-[320px] rounded-lg ${
                ready ? "" : "hidden"
              }`}
              aria-label="Generated QR code preview"
            />
            {!ready && (
              <div className="flex w-full max-w-[320px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-line-strong bg-card px-6 py-16 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest-soft text-forest">
                  <IconQr className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-medium text-ink">
                  {error ? "Couldn't build the code" : "Your QR code appears here"}
                </p>
                <p className="mt-1 text-xs text-ink-faint">
                  {error ?? "Type a link or some text to get started."}
                </p>
              </div>
            )}
          </div>

          {/* Downloads */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={downloadPng}
              disabled={!ready}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <IconDownload className="h-4 w-4" />
              PNG
            </button>
            <button
              type="button"
              onClick={downloadSvg}
              disabled={!ready}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:opacity-40 disabled:hover:border-line-strong disabled:hover:text-ink-soft"
            >
              <IconDownload className="h-4 w-4" />
              SVG
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-ink-faint">
            PNG is best for the web &amp; messaging. SVG scales to any size for
            print.
          </p>
        </div>
      </div>
    </div>
  );
}

function IconQr({ className }: { className?: string }) {
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
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3M21 14v.01M14 21h3M21 17v4" />
    </svg>
  );
}
