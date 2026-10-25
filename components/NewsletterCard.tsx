"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

// Sidebar newsletter signup. Submits to /api/subscribe, which adds the email to
// the Resend audience (configured via RESEND_API_KEY / RESEND_AUDIENCE_ID env
// vars). Fires a GA4 "newsletter_signup" event on success so demand is
// measurable.
type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("idle");
        setError(data?.error ?? "Could not subscribe. Please try again.");
        return;
      }
      if (typeof window !== "undefined") {
        (window as GtagWindow).gtag?.("event", "newsletter_signup", {
          method: "sidebar",
        });
      }
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Could not subscribe. Please try again.");
    }
  };

  return (
    <div className="rounded-card bg-bg-invert p-5 text-white">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/10">
        <Mail className="h-4.5 w-4.5" />
      </span>
      <p className="mt-3 text-base font-semibold leading-snug">
        Get Personal Finance Tips in Your Inbox
      </p>
      <p className="mt-1 text-xs text-white/70">
        Get the latest guides, calculator updates and investment insights, straight to your inbox.
      </p>

      {status === "done" ? (
        <p className="mt-4 rounded-input bg-white/10 px-3 py-2.5 text-sm text-white">
          You&apos;re subscribed. Check your inbox to confirm.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-4" noValidate>
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              placeholder="Enter your email"
              aria-label="Email address"
              disabled={status === "loading"}
              className="min-w-0 flex-1 rounded-input bg-white px-3 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:ring-2 focus:ring-white/40 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 rounded-input bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-deep transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-berry-soft">{error}</p>}
          <p className="mt-2 text-[11px] text-white/50">No spam. Unsubscribe anytime.</p>
        </form>
      )}
    </div>
  );
}
