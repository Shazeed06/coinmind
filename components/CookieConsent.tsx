"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Lightweight cookie/consent notice. Stores the choice in localStorage.
// For full EEA/UK compliance with personalised ads you'll later plug in a
// certified CMP (Google offers one in AdSense). This covers the visible notice
// and a stored consent signal in the meantime.
const KEY = "coinmind-consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only read from localStorage is a standard React pattern
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      // localStorage unavailable, fail silently
    }
  }, []);

  const choose = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-2 sm:p-4 print:hidden">
      <div className="panel mx-auto max-w-2xl px-3 py-2 sm:px-4 sm:py-2.5 shadow-overlay border border-border/80 bg-white/95 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <p className="text-xs text-ink-soft text-center sm:text-left leading-tight sm:leading-normal">
            We use cookies to analyze traffic and support free calculators. See our{" "}
            <Link href="/privacy" className="font-semibold text-forest underline underline-offset-2 decoration-forest/40 hover:decoration-forest">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-end">
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="btn btn-outline py-1 px-3 text-xs min-h-[32px] sm:min-h-[34px] flex-1 sm:flex-none"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="btn btn-accent py-1 px-3 text-xs min-h-[32px] sm:min-h-[34px] flex-1 sm:flex-none"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
