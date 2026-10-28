"use client";

import { useState } from "react";

// Calculators that have a live embeddable widget at /widgets/<slug>, with the
// iframe height that fits each one. Only these show the "Embed" button, which
// hands a publisher the copy-paste snippet (iframe + a real credit link) — the
// snippet is what earns CoinMind a backlink when they paste it on their site.
const WIDGET_HEIGHTS: Record<string, number> = {
  sip: 500,
  emi: 500,
  fd: 460,
  "income-tax": 560,
  ppf: 500,
  nps: 520,
  lumpsum: 480,
  retirement: 540,
};

export default function CalcActions({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  // The live window URL carries the calculator's current state in its query
  // params, so sharing sends the exact result the user is looking at.
  const liveUrl = () => (typeof window !== "undefined" ? window.location.href : url);

  // Derive the slug + origin from the canonical calculator URL (e.g.
  // https://coinmind.in/calculators/sip), so the embed snippet always points at
  // the production domain rather than localhost.
  const base = url.split("/calculators/")[0];
  const slug = url.split("/calculators/")[1]?.split(/[?#]/)[0] ?? "";
  const height = WIDGET_HEIGHTS[slug];
  const embedCode =
    `<iframe src="${base}/widgets/${slug}" width="100%" height="${height}" frameborder="0" loading="lazy" style="border:0;border-radius:12px;max-width:680px;"></iframe>\n` +
    `<p style="font:13px/1.5 system-ui,sans-serif;text-align:center;margin:6px 0;">Free <a href="${base}/calculators/${slug}" target="_blank" rel="noopener">${title}</a> by CoinMind</p>`;

  const handleWhatsApp = () => {
    const shareUrl = liveUrl();
    const text = `${title}\n${shareUrl}`;
    const wa = `https://wa.me/?text=${encodeURIComponent(text)}`;
    if (typeof window !== "undefined") window.open(wa, "_blank", "noopener,noreferrer");
  };

  const handleShare = async () => {
    const shareUrl = liveUrl();
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
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

  const handleCopyEmbed = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 2000);
    } catch {
      // clipboard blocked; the code is still selectable in the box
    }
  };

  const btn =
    "inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-forest hover:text-forest transition-colors";

  return (
    <div className="print:hidden">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-1.5 text-xs font-medium text-[#128C7E] hover:border-[#25D366] hover:bg-[#25D366]/15 transition-colors"
          aria-label="Share this calculator on WhatsApp"
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
          </svg>
          WhatsApp
        </button>
        <button type="button" onClick={handleShare} className={btn} aria-label="Share this calculator">
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 1 0-2.977-2.63l-4.94 2.47a3 3 0 1 0 0 4.319l4.94 2.47a3 3 0 1 0 .895-1.789l-4.94-2.47a3.027 3.027 0 0 0 0-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          {copied ? "Copied!" : "Share"}
        </button>
        <button type="button" onClick={handlePrint} className={btn} aria-label="Save as PDF">
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414A2 2 0 0 0 15.414 6L12 2.586A2 2 0 0 0 10.586 2H6zm5 6a1 1 0 1 0-2 0v3.586l-1.293-1.293a1 1 0 1 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 0 0-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
          </svg>
          Save PDF
        </button>
        {height && (
          <button
            type="button"
            onClick={() => setShowEmbed((v) => !v)}
            className={btn}
            aria-expanded={showEmbed}
            aria-label="Embed this calculator on your website"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 0 1 .633 1.265l-4 12a1 1 0 1 1-1.898-.632l4-12a1 1 0 0 1 1.265-.633zM5.707 6.293a1 1 0 0 1 0 1.414L3.414 10l2.293 2.293a1 1 0 1 1-1.414 1.414l-3-3a1 1 0 0 1 0-1.414l3-3a1 1 0 0 1 1.414 0zm8.586 0a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
            </svg>
            Embed
          </button>
        )}
      </div>

      {height && showEmbed && (
        <div className="mt-3 rounded-xl border border-line bg-paper-2 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Embed this calculator — free
            </p>
            <button
              type="button"
              onClick={handleCopyEmbed}
              className="rounded-full bg-forest px-3 py-1 text-xs font-semibold text-white hover:bg-forest-deep transition-colors"
            >
              {embedCopied ? "Copied!" : "Copy code"}
            </button>
          </div>
          <pre className="mt-3 overflow-x-auto whitespace-pre-wrap break-all rounded-lg bg-bg p-3 text-[11px] leading-relaxed text-ink">
            {embedCode}
          </pre>
          <p className="mt-2 text-xs text-ink-faint">
            Paste the whole snippet on your site. Free to use — the small credit line keeps the widget free.
          </p>
        </div>
      )}
    </div>
  );
}
