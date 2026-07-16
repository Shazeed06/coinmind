"use client";

import { useCallback, useRef, useState, DragEvent } from "react";

/* ------------------------------------------------------------------ */
/*  Shared UI primitives for the client-side image tools.             */
/*  Everything here is presentational + generic so both the Compress  */
/*  and Convert tools stay visually consistent.                       */
/* ------------------------------------------------------------------ */

/** Human-readable file size (1024-based). */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024)),
  );
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(value >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}

/* Drag-and-drop / click-to-browse dropzone. */
export function Dropzone({
  accept,
  multiple = false,
  onFiles,
  label = "Drop images here",
  hint = "or click to browse — JPG, PNG or WebP",
}: {
  accept: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  label?: string;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      const files = Array.from(list);
      if (files.length) onFiles(multiple ? files : files.slice(0, 1));
    },
    [multiple, onFiles],
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  return (
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
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`cursor-pointer rounded-2xl border-2 border-dashed bg-card p-10 text-center transition-colors ${
        dragging ? "border-forest bg-forest-soft" : "border-line-strong hover:border-forest"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest-soft text-forest">
        <IconUpload className="h-6 w-6" />
      </div>
      <p className="mt-4 font-display text-lg font-600 text-ink">{label}</p>
      <p className="mt-1 text-sm text-ink-faint">{hint}</p>
    </div>
  );
}

/* A single labelled stat used inside result panels. */
export function InfoRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "forest" | "brass" | "ink";
}) {
  const color =
    accent === "forest"
      ? "text-forest"
      : accent === "brass"
        ? "text-brass"
        : "text-ink";
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <span className="text-sm text-ink-soft">{label}</span>
      <span className={`text-sm font-semibold ${color}`}>{value}</span>
    </div>
  );
}

/* Primary download button. */
export function DownloadButton({
  href,
  filename,
  children,
  full = false,
}: {
  href: string;
  filename: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <a
      href={href}
      download={filename}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 ${
        full ? "w-full" : ""
      }`}
    >
      <IconDownload className="h-4 w-4" />
      {children}
    </a>
  );
}

/* Small privacy reassurance banner shown on every tool. */
export function PrivacyNote() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-brass-soft bg-brass-soft/50 p-4">
      <IconShield className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
      <p className="text-sm text-ink-soft">
        <strong className="text-ink">100% private.</strong> Your images are
        processed entirely in your browser using the Canvas API. Nothing is
        uploaded to a server &mdash; the files never leave your device.
      </p>
    </div>
  );
}

/* ------------------------------ icons ------------------------------ */

export function IconUpload({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

export function IconDownload({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
