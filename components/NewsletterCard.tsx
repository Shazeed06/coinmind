"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

// Sidebar newsletter signup. There is no mailing-list backend wired yet, so the
// form validates and shows a confirmation state client-side; swap the submit
// handler for a real endpoint when one exists.
export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setDone(true);
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
        Join 50,000+ readers and get the latest guides, calculator updates and investment insights.
      </p>

      {done ? (
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
              className="min-w-0 flex-1 rounded-input bg-white px-3 py-2.5 text-sm text-text placeholder:text-text-muted outline-none focus:ring-2 focus:ring-white/40"
            />
            <button
              type="submit"
              className="shrink-0 rounded-input bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-forest-deep transition-colors"
            >
              Subscribe
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-berry-soft">{error}</p>}
          <p className="mt-2 text-[11px] text-white/50">No spam. Unsubscribe anytime.</p>
        </form>
      )}
    </div>
  );
}
