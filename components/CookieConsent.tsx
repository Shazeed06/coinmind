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
    <div className="fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4">
      {/* Was rounded-2xl with a one-off blue-tinted shadow written inline, so
          the only floating surface on the site cast a different colour of
          shadow to everything else. It now uses .panel plus the shared
          --shadow-overlay step, and both buttons use .btn, which previously
          differed from each other by 4px of horizontal padding for no reason.
          The buttons also stay side by side on a narrow phone rather than
          being allowed to wrap under each other. */}
      <div className="panel mx-auto max-w-3xl p-4 shadow-overlay sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <p className="flex-1 text-sm leading-relaxed text-ink-soft">
            We use cookies to run the site, measure traffic and show ads. See our{" "}
            <Link href="/privacy" className="font-semibold text-forest underline underline-offset-2 decoration-forest/40 transition-colors hover:decoration-forest">
              Privacy Policy
            </Link>
            .
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="btn btn-outline flex-1 sm:flex-none"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="btn btn-accent flex-1 sm:flex-none"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
