"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Dropzone, PrivacyNote, IconDownload } from "@/components/tools/ToolShell";

/* ------------------------------------------------------------------ */
/*  Meme Generator — 100% client-side.                                */
/*  Draws the uploaded image plus classic Impact-style top/bottom     */
/*  text (bold, uppercase, white fill, black outline) onto a canvas,  */
/*  live, then exports the result as a PNG. Nothing is uploaded.      */
/* ------------------------------------------------------------------ */

const ACCEPT = "image/png,image/jpeg,image/webp,image/gif";

type Loaded = {
  img: HTMLImageElement;
  url: string;
  name: string;
};

/** Split a string into lines that fit within maxWidth for the current font. */
function wrapLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export default function MemeGenerator() {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontPct, setFontPct] = useState(10);
  const [fill, setFill] = useState("#ffffff");
  const [outline, setOutline] = useState("#000000");
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const urlRef = useRef<string | null>(null);

  const revokeSource = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
  }, []);

  useEffect(() => () => revokeSource(), [revokeSource]);

  const onFiles = useCallback(
    (files: File[]) => {
      const file = files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("Please choose an image file (PNG, JPG, WebP or GIF).");
        return;
      }
      revokeSource();
      const url = URL.createObjectURL(file);
      urlRef.current = url;
      const img = new Image();
      img.onload = () => {
        setError(null);
        setLoaded({ img, url, name: file.name });
      };
      img.onerror = () => {
        setError("That image could not be decoded. Try a PNG, JPG or WebP.");
        revokeSource();
      };
      img.src = url;
    },
    [revokeSource],
  );

  // Live redraw whenever the image or any text/style control changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;
    const { img } = loaded;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(img, 0, 0);

    const fontPx = Math.max(12, Math.round((img.naturalWidth * fontPct) / 100));
    ctx.font = `bold ${fontPx}px Impact, "Arial Narrow Bold", "Arial Black", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.lineJoin = "round";
    ctx.lineWidth = Math.max(2, fontPx / 12);
    ctx.fillStyle = fill;
    ctx.strokeStyle = outline;

    const maxWidth = canvas.width * 0.92;
    const lineHeight = fontPx * 1.12;
    const margin = fontPx * 0.25;
    const centerX = canvas.width / 2;

    const drawLine = (line: string, y: number) => {
      ctx.strokeText(line, centerX, y);
      ctx.fillText(line, centerX, y);
    };

    // Top block — grows downward from the top margin.
    const topLines = wrapLines(ctx, topText.toUpperCase(), maxWidth);
    topLines.forEach((line, i) => drawLine(line, margin + i * lineHeight));

    // Bottom block — anchored to the bottom margin, grows upward.
    const bottomLines = wrapLines(ctx, bottomText.toUpperCase(), maxWidth);
    const bottomStart =
      canvas.height - margin - bottomLines.length * lineHeight;
    bottomLines.forEach((line, i) => drawLine(line, bottomStart + i * lineHeight));
  }, [loaded, topText, bottomText, fontPct, fill, outline]);

  const download = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "meme.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }, "image/png");
  }, [loaded]);

  const reset = useCallback(() => {
    revokeSource();
    setLoaded(null);
    setTopText("");
    setBottomText("");
    setError(null);
  }, [revokeSource]);

  return (
    <div className="space-y-6">
      <PrivacyNote />

      {!loaded && (
        <Dropzone
          accept={ACCEPT}
          onFiles={onFiles}
          label="Drop an image to meme"
          hint="or click to browse — PNG, JPG, WebP or GIF"
        />
      )}

      {error && (
        <p className="rounded-lg border border-berry/30 bg-berry/5 px-4 py-3 text-sm text-berry">
          {error}
        </p>
      )}

      {loaded && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Controls */}
          <div className="rounded-2xl border border-line bg-card p-6">
            <label
              htmlFor="meme-top"
              className="block text-sm font-medium text-ink-soft"
            >
              Top text
            </label>
            <input
              id="meme-top"
              type="text"
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              placeholder="When the code finally compiles"
              className="mt-2 w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
            />

            <label
              htmlFor="meme-bottom"
              className="mt-5 block text-sm font-medium text-ink-soft"
            >
              Bottom text
            </label>
            <input
              id="meme-bottom"
              type="text"
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              placeholder="On the first try"
              className="mt-2 w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-forest"
            />

            {/* Font size */}
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <label
                  htmlFor="meme-size"
                  className="text-sm font-medium text-ink-soft"
                >
                  Font size
                </label>
                <span className="text-sm font-semibold text-ink">{fontPct}%</span>
              </div>
              <input
                id="meme-size"
                type="range"
                min={4}
                max={20}
                step={1}
                value={fontPct}
                onChange={(e) => setFontPct(Number(e.target.value))}
                className="mt-3"
                aria-label="Font size as a percentage of image width"
              />
              <p className="mt-1.5 text-xs text-ink-faint">
                Scales with the image, so text stays sharp at full resolution.
              </p>
            </div>

            {/* Colours */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="meme-fill"
                  className="block text-sm font-medium text-ink-soft"
                >
                  Text colour
                </label>
                <div className="mt-2 flex items-center gap-2.5">
                  <input
                    id="meme-fill"
                    type="color"
                    value={fill}
                    onChange={(e) => setFill(e.target.value)}
                    className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-line-strong bg-card p-1"
                    aria-label="Text fill colour"
                  />
                  <span className="text-sm font-medium uppercase text-ink-soft">
                    {fill}
                  </span>
                </div>
              </div>
              <div>
                <label
                  htmlFor="meme-outline"
                  className="block text-sm font-medium text-ink-soft"
                >
                  Outline colour
                </label>
                <div className="mt-2 flex items-center gap-2.5">
                  <input
                    id="meme-outline"
                    type="color"
                    value={outline}
                    onChange={(e) => setOutline(e.target.value)}
                    className="h-10 w-12 shrink-0 cursor-pointer rounded-lg border border-line-strong bg-card p-1"
                    aria-label="Text outline colour"
                  />
                  <span className="text-sm font-medium uppercase text-ink-soft">
                    {outline}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={download}
                className="inline-flex items-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <IconDownload className="h-4 w-4" />
                Download meme
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
              >
                Start over
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="flex flex-col rounded-2xl border border-line bg-paper-2 p-6">
            <div className="flex flex-1 items-center justify-center">
              <canvas
                ref={canvasRef}
                className="h-auto w-full rounded-lg border border-line bg-card"
                aria-label="Meme preview"
              />
            </div>
            <p className="mt-3 text-center text-xs text-ink-faint">
              Live preview at full resolution &mdash; exactly what downloads.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
