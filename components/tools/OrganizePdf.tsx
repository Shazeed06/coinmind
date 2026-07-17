"use client";

import { useCallback, useRef, useState } from "react";

type Loaded = {
  file: File;
  name: string;
};

type PageItem = {
  id: string;
  original: number; // zero-based index in the source PDF
  removed: boolean;
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

export default function OrganizePdf() {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
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
      const count = doc.getPageCount();
      setLoaded({ file, name: file.name });
      setPages(
        Array.from({ length: count }, (_, i) => ({
          id: `p-${i}`,
          original: i,
          removed: false,
        })),
      );
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
    setPages([]);
    setError(null);
  }

  function move(index: number, dir: -1 | 1) {
    setPages((prev) => {
      const next = [...prev];
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function toggleRemoved(id: string) {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, removed: !p.removed } : p)),
    );
  }

  const kept = pages.filter((p) => !p.removed);

  async function rebuild() {
    if (!loaded || working) return;
    if (!kept.length) {
      setError("Keep at least one page — every page is currently removed.");
      return;
    }
    setWorking(true);
    setError(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const bytes = new Uint8Array(await loaded.file.arrayBuffer());
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const out = await PDFDocument.create();
      const indices = kept.map((p) => p.original);
      const copied = await out.copyPages(src, indices);
      copied.forEach((page) => out.addPage(page));
      const saved = await out.save();
      downloadBytes(saved, `${baseNameOf(loaded.name)}-organized.pdf`);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while rebuilding the PDF. The file may be encrypted or corrupted — try a different one.",
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
          or click to browse. Reorder pages and remove the ones you don&apos;t
          need.
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

      {loaded && pages.length > 0 && (
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-lg font-600 text-ink">
              <span className="truncate" title={loaded.name}>
                {loaded.name}
              </span>
              <span className="ml-2 text-sm font-normal text-ink-faint">
                {kept.length} of {pages.length} page
                {pages.length > 1 ? "s" : ""} kept
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

          <ul className="mt-5 space-y-3">
            {pages.map((p, i) => (
              <li
                key={p.id}
                className={`flex items-center gap-3 rounded-xl border p-3 transition-colors ${
                  p.removed
                    ? "border-line bg-paper-2 opacity-60"
                    : "border-line bg-paper-2"
                }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-forest-soft text-xs font-semibold text-forest">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm text-ink ${
                      p.removed ? "line-through" : ""
                    }`}
                  >
                    Original page {p.original + 1}
                  </p>
                  {p.removed && (
                    <p className="text-xs font-semibold text-berry">
                      Will be removed
                    </p>
                  )}
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
                    disabled={i === pages.length - 1}
                    aria-label="Move down"
                    className="rounded-md border border-line-strong bg-card px-2 py-1 text-xs font-semibold text-ink-soft hover:border-forest disabled:opacity-40"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleRemoved(p.id)}
                    aria-label={p.removed ? "Restore page" : "Remove page"}
                    className={`rounded-md border px-2 py-1 text-xs font-semibold transition-colors ${
                      p.removed
                        ? "border-line-strong bg-card text-forest hover:border-forest"
                        : "border-line-strong bg-card text-berry hover:border-berry"
                    }`}
                  >
                    {p.removed ? "Undo" : "✕"}
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={rebuild}
              disabled={working || kept.length === 0}
              className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {working ? "Building…" : "Build new PDF"}
            </button>
            <span className="text-xs text-ink-faint">
              Saved as {baseNameOf(loaded.name)}-organized.pdf
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
