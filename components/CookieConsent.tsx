"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Lightweight cookie/consent notice. Stores the choice in localStorage.
// For full EEA/UK compliance with personalised ads you'll later plug in a
// certified CMP (Google offers one in AdSense) — this covers the visible notice
// and a stored consent signal in the meantime.
const KEY = "coinmind-consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      // localStorage unavailable — fail silently
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
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-card shadow-[0_16px_40px_-16px_rgba(30,64,175,0.35)] p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-sm text-ink-soft leading-relaxed flex-1">
            We use cookies to run the site, measure traffic and show ads. See our{" "}
            <Link href="/privacy" className="font-semibold text-forest underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="rounded-full border border-line-strong bg-card px-4 py-2 text-sm font-semibold text-ink hover:border-forest transition-colors"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-white hover:bg-forest-deep transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
