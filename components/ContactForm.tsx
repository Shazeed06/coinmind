"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [k]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // No backend yet: open the user's mail client pre-filled.
    // Swap this for a real endpoint (Formspree, Resend, an API route) later.
    const subject = encodeURIComponent(`Message from ${form.name || "a reader"}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const field =
    "w-full rounded-xl border border-line-strong bg-card px-4 py-3 text-sm text-ink outline-none focus:border-forest transition-colors placeholder:text-ink-faint";

  if (sent) {
    return (
      <div className="rounded-2xl border border-forest bg-forest-soft p-8 text-center">
        <p className="font-display text-xl font-600 text-forest-deep">
          Thanks for reaching out!
        </p>
        <p className="mt-2 text-sm text-forest-deep/80">
          Your email app should have opened. If it didn&apos;t, write to us at{" "}
          <span className="font-semibold">{site.email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink-soft">Your name</label>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className={`mt-1.5 ${field}`}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink-soft">Email</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            className={`mt-1.5 ${field}`}
            placeholder="jane@example.com"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-ink-soft">Message</label>
        <textarea
          required
          value={form.message}
          onChange={update("message")}
          rows={5}
          className={`mt-1.5 ${field} resize-y`}
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-forest-deep"
      >
        Send message
      </button>
    </form>
  );
}
