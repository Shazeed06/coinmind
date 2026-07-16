"use client";

import { useCallback, useRef, useState } from "react";

type PdfItem = {
  id: string;
  file: File;
  name: string;
  pages: number;
};

function makeId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export default function MergePdf() {
  const [items, setItems] = useState<PdfItem[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return;
    setError(null);
    const incoming = Array.from(fileList);
    setLoading(true);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const accepted: PdfItem[] = [];
      const rejected: string[] = [];

      for (const file of incoming) {
        const isPdf =
          file.type === "application/pdf" || /\.pdf$/i.test(file.name);
        if (!isPdf) {
          rejected.push(file.name);
          continue;
        }
        try {
          const bytes = new Uint8Array(await file.arrayBuffer());
          const doc = await PDFDocument.load(bytes, {
            ignoreEncryption: true,
          });
          accepted.push({
            id: makeId(),
            file,
            name: file.name,
            pages: doc.getPageCount(),
          });
        } catch {
          rejected.push(file.name);
        }
      }

      if (accepted.length) {
        setItems((prev) => [...prev, ...accepted]);
      }
      if (rejected.length) {
        setError(
          `Couldn't read ${rejected.length} file${
            rejected.length > 1 ? "s" : ""
          }: ${rejected.join(", ")}. They may be encrypted, corrupted, or not valid PDFs.`,
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  function removeItem(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
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
    setItems([]);
    setError(null);
  }

  async function merge() {
    if (items.length < 2 || working) return;
    setWorking(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();

      for (const item of items) {
        const bytes = new Uint8Array(await item.file.arrayBuffer());
        const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
        const copied = await merged.copyPages(src, src.getPageIndices());
        copied.forEach((page) => merged.addPage(page));
      }

      const out = await merged.save();
      const arrayBuf = out.buffer.slice(
        out.byteOffset,
        out.byteOffset + out.byteLength,
      ) as ArrayBuffer;
      const blob = new Blob([arrayBuf], { type: "application/pdf" });
      const href = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = href;
      a.download = "coinmind-merged.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(href);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while merging. One of the PDFs may be encrypted or corrupted. Remove it and try again.",
      );
    } finally {
      setWorking(false);
    }
  }

  const totalPages = items.reduce((sum, it) => sum + it.pages, 0);

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
          accept="application/pdf,.pdf"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <p className="font-display text-lg font-600 text-ink">
          Drop PDF files here
        </p>
        <p className="mt-1.5 text-sm text-ink-soft">
          or click to browse. Add two or more to combine them.
        </p>
        <p className="mt-3 text-xs text-ink-faint">
          Files never leave your device — everything runs in your browser.
        </p>
      </div>

      {loading && (
        <div className="rounded-xl border border-line bg-paper-2 p-4 text-sm text-ink-soft">
          Reading PDFs…
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-line bg-paper-2 p-4 text-sm text-ink-soft">
          {error}
        </div>
      )}

      {items.length > 0 && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-600 text-ink">
              {items.length} PDF{items.length > 1 ? "s" : ""}
              <span className="ml-2 text-sm font-normal text-ink-faint">
                {totalPages} page{totalPages > 1 ? "s" : ""} total
              </span>
            </h2>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-semibold text-ink-soft hover:border-forest"
            >
              Clear all
            </button>
          </div>

          <ul className="mt-5 space-y-3">
            {items.map((it, i) => (
              <li
                key={it.id}
                className="flex items-center gap-3 rounded-xl border border-line bg-paper-2 p-3"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-forest-soft text-xs font-semibold text-forest">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-ink" title={it.name}>
                    {it.name}
                  </p>
                  <p className="text-xs text-ink-faint">
                    {it.pages} page{it.pages > 1 ? "s" : ""}
                  </p>
                </div>
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

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={merge}
              disabled={working || items.length < 2}
              className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {working ? "Merging…" : "Merge PDFs"}
            </button>
            {items.length < 2 ? (
              <span className="text-xs text-ink-faint">
                Add at least 2 PDFs to merge
              </span>
            ) : (
              <span className="text-xs text-ink-faint">
                Saved as coinmind-merged.pdf
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
