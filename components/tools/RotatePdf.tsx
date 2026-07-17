"use client";

import { useCallback, useRef, useState } from "react";

type Loaded = {
  file: File;
  name: string;
  pages: number;
};

type Angle = 90 | 180 | 270;
type Scope = "all" | "one";

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

export default function RotatePdf() {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [angle, setAngle] = useState<Angle>(90);
  const [scope, setScope] = useState<Scope>("all");
  const [pageNumStr, setPageNumStr] = useState("1");
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
      setLoaded({ file, name: file.name, pages: doc.getPageCount() });
      setScope("all");
      setPageNumStr("1");
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
    setAngle(90);
    setScope("all");
    setPageNumStr("1");
  }

  async function rotateAndDownload() {
    if (!loaded || working) return;
    const total = loaded.pages;
    let target = -1;
    if (scope === "one") {
      target = parseInt(pageNumStr, 10);
      if (!Number.isFinite(target) || target < 1 || target > total) {
        setError(`Enter a page number between 1 and ${total}.`);
        return;
      }
    }
    setWorking(true);
    setError(null);
    try {
      const { PDFDocument, degrees } = await import("pdf-lib");
      const bytes = new Uint8Array(await loaded.file.arrayBuffer());
      const src = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const pages = src.getPages();

      const rotatePage = (index: number) => {
        const page = pages[index];
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + angle) % 360));
      };

      if (scope === "all") {
        for (let i = 0; i < pages.length; i++) rotatePage(i);
      } else {
        rotatePage(target - 1);
      }

      const saved = await src.save();
      const base = baseNameOf(loaded.name);
      downloadBytes(saved, `${base}-rotated.pdf`);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while rotating. The PDF may be encrypted or corrupted — try a different file.",
      );
    } finally {
      setWorking(false);
    }
  }

  const scopeLabel =
    scope === "all"
      ? "every page"
      : `page ${parseInt(pageNumStr, 10) || 1}`;

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
          or click to browse. Rotate every page or just one.
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

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {/* Controls */}
            <div className="space-y-5">
              <div>
                <p className="text-sm font-medium text-ink-soft mb-2">
                  Rotation
                </p>
                <div className="flex flex-wrap gap-2">
                  {([90, 180, 270] as Angle[]).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAngle(val)}
                      className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                        angle === val
                          ? "bg-forest text-white"
                          : "border border-line-strong bg-card text-ink-soft hover:border-forest"
                      }`}
                    >
                      {val}°
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-ink-faint">
                  Clockwise. 90° turns portrait to landscape; 180° flips upside
                  down.
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-ink-soft mb-2">
                  Apply to
                </p>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["all", "All pages"],
                      ["one", "One page"],
                    ] as [Scope, string][]
                  ).map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setScope(val)}
                      className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                        scope === val
                          ? "bg-forest text-white"
                          : "border border-line-strong bg-card text-ink-soft hover:border-forest"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {scope === "one" && (
                  <label className="mt-3 flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-ink-soft">
                      Page number (1 – {loaded.pages})
                    </span>
                    <input
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={loaded.pages}
                      value={pageNumStr}
                      onChange={(e) => setPageNumStr(e.target.value)}
                      className="w-28 rounded-lg border border-line-strong bg-card px-3 py-2 text-sm text-ink outline-none focus:border-forest"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Preview */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-line bg-paper-2 p-6">
              <p className="text-xs font-medium text-ink-soft">
                Rotation preview
              </p>
              <div className="mt-4 flex h-40 w-full items-center justify-center">
                <div
                  className="flex h-28 w-20 flex-col items-center justify-center rounded-md border-2 border-line-strong bg-card shadow-sm transition-transform duration-300"
                  style={{ transform: `rotate(${angle}deg)` }}
                  aria-hidden="true"
                >
                  <span className="font-display text-xs font-600 text-ink-faint">
                    PDF
                  </span>
                  <span className="mt-1 text-[10px] text-ink-faint">▲ top</span>
                </div>
              </div>
              <p className="mt-4 text-center text-xs text-ink-faint">
                {angle}° clockwise on {scopeLabel}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={rotateAndDownload}
              disabled={working}
              className="rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {working ? "Rotating…" : "Rotate & download"}
            </button>
            <span className="text-xs text-ink-faint">
              Saved as {baseNameOf(loaded.name)}-rotated.pdf
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
