"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";

type PageSize = "fit" | "a4" | "letter";
type Orientation = "auto" | "portrait" | "landscape";

type ImgItem = {
  id: string;
  file: File;
  name: string;
  url: string;
  type: "image/jpeg" | "image/png";
};

// Point dimensions (72pt = 1 inch)
const SIZES: Record<Exclude<PageSize, "fit">, { w: number; h: number }> = {
  a4: { w: 595.28, h: 841.89 },
  letter: { w: 612, h: 792 },
};

const ACCEPTED = ["image/jpeg", "image/png"];

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function ImageToPdf() {
  const [items, setItems] = useState<ImgItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("fit");
  const [orientation, setOrientation] = useState<Orientation>("auto");
  const [margin, setMargin] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return;
    setError(null);
    const incoming = Array.from(fileList);
    const rejected: string[] = [];
    const accepted: ImgItem[] = [];

    for (const file of incoming) {
      const isWebp =
        file.type === "image/webp" || /\.webp$/i.test(file.name);
      if (isWebp) {
        rejected.push(file.name);
        continue;
      }
      if (!ACCEPTED.includes(file.type)) {
        rejected.push(file.name);
        continue;
      }
      accepted.push({
        id: makeId(),
        file,
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type as "image/jpeg" | "image/png",
      });
    }

    if (accepted.length) {
      setItems((prev) => [...prev, ...accepted]);
    }
    if (rejected.length) {
      setError(
        `Skipped ${rejected.length} file${rejected.length > 1 ? "s" : ""}: only JPG and PNG are supported. WebP isn't supported here — convert it first.`,
      );
    }
  }, []);

  function removeItem(id: string) {
    setItems((prev) => {
      const found = prev.find((p) => p.id === id);
      if (found) URL.revokeObjectURL(found.url);
      return prev.filter((p) => p.id !== id);
    });
  }

  function move(index: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function clearAll() {
    items.forEach((it) => URL.revokeObjectURL(it.url));
    setItems([]);
    setError(null);
  }

  async function createPdf() {
    if (!items.length || working) return;
    setWorking(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      const marginPt = margin ? 36 : 0; // 0.5 inch when enabled

      for (const item of items) {
        const bytes = new Uint8Array(await item.file.arrayBuffer());
        const image =
          item.type === "image/jpeg"
            ? await pdfDoc.embedJpg(bytes)
            : await pdfDoc.embedPng(bytes);

        const iw = image.width;
        const ih = image.height;

        if (pageSize === "fit") {
          // Page exactly the image size (respecting orientation swap).
          let pw = iw;
          let ph = ih;
          if (orientation === "portrait" && pw > ph) {
            [pw, ph] = [ph, pw];
          } else if (orientation === "landscape" && ph > pw) {
            [pw, ph] = [ph, pw];
          }
          const page = pdfDoc.addPage([pw, ph]);
          const scale = Math.min(pw / iw, ph / ih);
          const dw = iw * scale;
          const dh = ih * scale;
          page.drawImage(image, {
            x: (pw - dw) / 2,
            y: (ph - dh) / 2,
            width: dw,
            height: dh,
          });
        } else {
          const base = SIZES[pageSize];
          let pw = base.w;
          let ph = base.h;
          const wantLandscape =
            orientation === "landscape" ||
            (orientation === "auto" && iw > ih);
          if (wantLandscape) {
            [pw, ph] = [ph, pw];
          }
          const page = pdfDoc.addPage([pw, ph]);
          const availW = pw - marginPt * 2;
          const availH = ph - marginPt * 2;
          const scale = Math.min(availW / iw, availH / ih);
          const dw = iw * scale;
          const dh = ih * scale;
          page.drawImage(image, {
            x: (pw - dw) / 2,
            y: (ph - dh) / 2,
            width: dw,
            height: dh,
          });
        }
      }

      const out = await pdfDoc.save();
      const arrayBuf = out.buffer.slice(
        out.byteOffset,
        out.byteOffset + out.byteLength,
      ) as ArrayBuffer;
      const blob = new Blob([arrayBuf], { type: "application/pdf" });
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = "coinmind-images.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(href);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while building the PDF. Make sure your images are valid JPG or PNG files and try again.",
      );
    } finally {
      setWorking(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-2xl border-2 border-dashed bg-card p-10 text-center transition-colors ${
          dragOver ? "border-forest" : "border-line-strong hover:border-forest"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <p className="font-display text-lg font-600 text-ink">
          Drop JPG or PNG images here
        </p>
        <p className="mt-1.5 text-sm text-ink-soft">
          or click to browse. You can add several at once.
        </p>
        <p className="mt-3 text-xs text-ink-faint">
          Files never leave your device — everything runs in your browser.
        </p>
      </div>

      {error && (
        <div className="rounded-xl border border-line bg-paper-2 p-4 text-sm text-ink-soft">
          {error}{" "}
          <Link
            href="/tools/image-converter"
            className="font-semibold text-forest hover:opacity-80"
          >
            Open the image converter
          </Link>
          .
        </div>
      )}

      {items.length > 0 && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-600 text-ink">
              {items.length} image{items.length > 1 ? "s" : ""}
            </h2>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-forest"
            >
              Clear all
            </button>
          </div>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {items.map((it, i) => (
              <li
                key={it.id}
                className="flex items-center gap-3 rounded-xl border border-line bg-paper-2 p-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-forest-soft text-xs font-semibold text-forest">
                  {i + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.url}
                  alt={it.name}
                  className="h-12 w-12 shrink-0 rounded-md border border-line object-cover"
                />
                <span
                  className="min-w-0 flex-1 truncate text-sm text-ink"
                  title={it.name}
                >
                  {it.name}
                </span>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Move up"
                    className="rounded-md border border-line-strong bg-card px-2 py-1 text-xs font-semibold text-ink-soft hover:border-forest disabled:opacity-40"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === items.length - 1}
                    aria-label="Move down"
                    className="rounded-md border border-line-strong bg-card px-2 py-1 text-xs font-semibold text-ink-soft hover:border-forest disabled:opacity-40"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(it.id)}
                    aria-label="Remove"
                    className="rounded-md border border-line-strong bg-card px-2 py-1 text-xs font-semibold text-berry hover:border-berry"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Options */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-ink-soft mb-2">
                Page size
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["fit", "Fit to image"],
                    ["a4", "A4"],
                    ["letter", "Letter"],
                  ] as [PageSize, string][]
                ).map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setPageSize(val)}
                    className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                      pageSize === val
                        ? "bg-forest text-white"
                        : "border border-line-strong bg-card text-ink-soft hover:border-forest"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-ink-soft mb-2">
                Orientation
              </p>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["auto", "Auto"],
                    ["portrait", "Portrait"],
                    ["landscape", "Landscape"],
                  ] as [Orientation, string][]
                ).map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setOrientation(val)}
                    className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                      orientation === val
                        ? "bg-forest text-white"
                        : "border border-line-strong bg-card text-ink-soft hover:border-forest"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <label className="mt-5 flex cursor-pointer items-center gap-2.5 text-sm text-ink-soft">
            <input
              type="checkbox"
              checked={margin}
              onChange={(e) => setMargin(e.target.checked)}
              className="h-4 w-4 accent-forest"
              disabled={pageSize === "fit"}
            />
            Add a page margin{" "}
            {pageSize === "fit" && (
              <span className="text-ink-faint">(A4 / Letter only)</span>
            )}
          </label>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={createPdf}
              disabled={working}
              className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {working ? "Building PDF…" : "Create PDF"}
            </button>
            <span className="text-xs text-ink-faint">
              Saved as coinmind-images.pdf
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
