"use client";

import { useCallback, useRef, useState } from "react";

type Loaded = {
  file: File;
  name: string;
  pages: number;
};

function baseNameOf(name: string) {
  return name.replace(/\.pdf$/i, "") || "document";
}

/* Trigger a browser download for a saved pdf-lib byte array. */
function downloadBytes(out: Uint8Array, filename: string) {
  const arrayBuf = out.buffer.slice(
    out.byteOffset,
    out.byteOffset + out.byteLength,
  ) as ArrayBuffer;
  const blob = new Blob([arrayBuf], { type: "application/pdf" });
  const href = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}

export default function SplitPdf() {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [fromStr, setFromStr] = useState("1");
  const [toStr, setToStr] = useState("1");
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFile = useCallback(async (fileList: FileList | null) => {
    if (!fileList || !fileList.length) return;
    setError(null);
    const file = fileList[0];
    const isPdf =
      file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      setError("That doesn't look like a PDF. Please choose a .pdf file.");
      return;
    }
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pages = doc.getPageCount();
      setLoaded({ file, name: file.name, pages });
      setFromStr("1");
      setToStr(String(pages));
    } catch {
      setError(
        "Couldn't read that PDF. It may be encrypted, corrupted, or not a valid PDF. Remove any password protection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  function reset() {
    setLoaded(null);
    setError(null);
    setFromStr("1");
    setToStr("1");
  }

  async function extractRange() {
    if (!loaded || working) return;
    const total = loaded.pages;
    const from = parseInt(fromStr, 10);
    const to = parseInt(toStr, 10);
    if (
      !Number.isFinite(from) ||
      !Number.isFinite(to) ||
      from < 1 ||
      to < 1 ||
      from > total ||
      to > total ||
      from > to
    ) {
      setError(
        `Enter a valid range between 1 and ${total}, with the first page not after the last.`,
      );
      return;
    }
    setWorking(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await loaded.file.arrayBuffer());
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const out = await PDFDocument.create();
      const indices: number[] = [];
      for (let i = from - 1; i <= to - 1; i++) indices.push(i);
      const copied = await out.copyPages(src, indices);
      copied.forEach((page) => out.addPage(page));
      const saved = await out.save();
      const base = baseNameOf(loaded.name);
      const label = from === to ? `page-${from}` : `pages-${from}-${to}`;
      downloadBytes(saved, `${base}-${label}.pdf`);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while extracting those pages. The PDF may be encrypted or corrupted — try a different file.",
      );
    } finally {
      setWorking(false);
    }
  }

  async function splitEachPage() {
    if (!loaded || working) return;
    setWorking(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await loaded.file.arrayBuffer());
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const total = src.getPageCount();
      const base = baseNameOf(loaded.name);
      for (let i = 0; i < total; i++) {
        const out = await PDFDocument.create();
        const [copied] = await out.copyPages(src, [i]);
        out.addPage(copied);
        const saved = await out.save();
        downloadBytes(saved, `${base}-page-${i + 1}.pdf`);
        // Small gap so the browser doesn't drop rapid back-to-back downloads.
        await new Promise((r) => setTimeout(r, 250));
      }
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while splitting the pages. The PDF may be encrypted or corrupted — try a different file.",
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
          addFile(e.dataTransfer.files);
        }}
        className={`cursor-pointer rounded-2xl border-2 border-dashed bg-card p-10 text-center transition-colors ${
          dragOver ? "border-forest" : "border-line-strong hover:border-forest"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            addFile(e.target.files);
            e.target.value = "";
          }}
        />
        <p className="font-display text-lg font-600 text-ink">
          Drop a PDF file here
        </p>
        <p className="mt-1.5 text-sm text-ink-soft">
          or click to browse. Extract a page range or split every page.
        </p>
        <p className="mt-3 text-xs text-ink-faint">
          Files never leave your device — everything runs in your browser.
        </p>
      </div>

      {loading && (
        <div className="rounded-xl border border-line bg-paper-2 p-4 text-sm text-ink-soft">
          Reading PDF…
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-line bg-paper-2 p-4 text-sm text-ink-soft">
          {error}
        </div>
      )}

      {loaded && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-600 text-ink">
              <span className="truncate" title={loaded.name}>
                {loaded.name}
              </span>
              <span className="ml-2 text-sm font-normal text-ink-faint">
                {loaded.pages} page{loaded.pages > 1 ? "s" : ""}
              </span>
            </h2>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-forest"
            >
              Choose another
            </button>
          </div>

          {/* Extract a page range */}
          <div className="mt-6 rounded-xl border border-line bg-paper-2 p-5">
            <p className="text-sm font-medium text-ink-soft">
              Extract a page range
            </p>
            <p className="mt-1 text-xs text-ink-faint">
              Pull a run of pages into a brand-new PDF (for example, pages 2 to
              5).
            </p>
            <div className="mt-4 flex flex-wrap items-end gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-ink-soft">
                  From page
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={loaded.pages}
                  value={fromStr}
                  onChange={(e) => setFromStr(e.target.value)}
                  className="w-24 rounded-lg border border-line-strong bg-card px-3 py-2 text-sm text-ink outline-none focus:border-forest"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-ink-soft">
                  To page
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={loaded.pages}
                  value={toStr}
                  onChange={(e) => setToStr(e.target.value)}
                  className="w-24 rounded-lg border border-line-strong bg-card px-3 py-2 text-sm text-ink outline-none focus:border-forest"
                />
              </label>
              <button
                type="button"
                onClick={extractRange}
                disabled={working}
                className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
              >
                {working ? "Working…" : "Extract range"}
              </button>
            </div>
          </div>

          {/* Split every page */}
          <div className="mt-4 rounded-xl border border-line bg-paper-2 p-5">
            <p className="text-sm font-medium text-ink-soft">
              Split into single pages
            </p>
            <p className="mt-1 text-xs text-ink-faint">
              Save every page as its own one-page PDF. Your browser will download
              {" "}
              {loaded.pages} file{loaded.pages > 1 ? "s" : ""} one after another —
              allow multiple downloads if prompted.
            </p>
            <button
              type="button"
              onClick={splitEachPage}
              disabled={working}
              className="mt-4 rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft hover:border-forest disabled:opacity-50"
            >
              {working
                ? "Splitting…"
                : `Split all ${loaded.pages} page${loaded.pages > 1 ? "s" : ""}`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
