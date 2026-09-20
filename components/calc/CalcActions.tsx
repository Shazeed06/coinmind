"use client";

import { useState } from "react";

export default function CalcActions({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // User cancelled share or clipboard failed
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  return (
    <div className="flex items-center gap-2 print:hidden">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-forest hover:text-forest transition-colors"
        aria-label="Share this calculator"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M15 8a3 3 0 1 0-2.977-2.63l-4.94 2.47a3 3 0 1 0 0 4.319l4.94 2.47a3 3 0 1 0 .895-1.789l-4.94-2.47a3.027 3.027 0 0 0 0-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
        {copied ? "Copied!" : "Share"}
      </button>
      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-forest hover:text-forest transition-colors"
        aria-label="Save as PDF"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414A2 2 0 0 0 15.414 6L12 2.586A2 2 0 0 0 10.586 2H6zm5 6a1 1 0 1 0-2 0v3.586l-1.293-1.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
        </svg>
        Save PDF
      </button>
    </div>
  );
}
