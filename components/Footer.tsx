"use client";

import Link from "next/link";
import { useState } from "react";
import { site, footerNav } from "@/lib/site";
import {
  ChevronRight,
  ArrowUp,
  Mail,
  ShieldCheck,
  Lock,
  Zap,
  Coins,
  Calculator,
  Wrench,
  Compass,
  Building2,
} from "lucide-react";
import { LogoMark } from "./Logo";

// Icon + accent per footer section, keyed by the section title in lib/site.ts.
const SECTION_META: Record<string, { Icon: typeof Coins; color: string }> = {
  "Finance Hubs": { Icon: Coins, color: "#4ade80" },
  Calculators: { Icon: Calculator, color: "#6b9cff" },
  "Free Tools": { Icon: Wrench, color: "#a78bfa" },
  Explore: { Icon: Compass, color: "#fbbf24" },
  "Trust & Transparency": { Icon: ShieldCheck, color: "#f472b6" },
  Company: { Icon: Building2, color: "#2dd4bf" },
};

const TRUST = [
  { Icon: ShieldCheck, color: "#4ade80", label: "No sign-up required" },
  { Icon: Lock, color: "#6b9cff", label: "No data stored" },
  { Icon: Zap, color: "#fbbf24", label: "Always free" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    setSubscribed(true);
  };

  return (
    <footer className="relative overflow-hidden bg-[#0a1324] text-white">
      {/* Top gradient border */}
      <div className="h-[3px] bg-gradient-to-r from-[#2f5bea] via-[#16a34a] to-[#2f5bea]" />

      {/* Ambient glow + decorative chart, bottom-right */}
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#2f5bea]/10 blur-3xl" aria-hidden="true" />
      <svg
        className="pointer-events-none absolute bottom-6 right-6 hidden h-44 w-56 opacity-[0.22] lg:block"
        viewBox="0 0 220 160"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fbar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#1d4ed8" />
            <stop offset="1" stopColor="#4ade80" />
          </linearGradient>
        </defs>
        {[
          [30, 80], [66, 60], [102, 96], [138, 40], [174, 70],
        ].map(([x, h], i) => (
          <rect key={i} x={x} y={150 - h} width="26" height={h} rx="5" fill="url(#fbar)" />
        ))}
        <path d="M20 112 L70 78 L110 104 L150 52 L204 24" stroke="#60a5fa" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M188 24 h18 v18" stroke="#60a5fa" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="196" cy="128" r="18" fill="#f59e0b" />
        <circle cx="196" cy="128" r="18" fill="none" stroke="#b45309" strokeWidth="2" />
        <text x="196" y="134" textAnchor="middle" fontSize="18" fontWeight="700" fill="#7c2d12">₹</text>
      </svg>

      <div className="container-main relative py-9 lg:py-11">
        <div className="grid gap-x-8 gap-y-8 lg:grid-cols-12">
          {/* Brand column */}
          <div className="flex flex-col gap-4 lg:col-span-3">
            <span className="inline-flex items-center gap-2.5">
              <LogoMark className="h-9 w-9 shrink-0" />
              <span className="text-[1.4rem] font-700 lowercase leading-none tracking-tight">
                <span className="text-[#6b9cff]">coin</span>
                <span className="text-[#4ade80]">mind</span>
              </span>
            </span>
            <p className="max-w-[300px] text-sm leading-relaxed text-slate-400">
              {site.tagline}. Free calculators, guides and tools for every Indian financial decision.
            </p>

            <div className="flex flex-col gap-2">
              {TRUST.map(({ Icon, color, label }) => (
                <div
                  key={label}
                  className="inline-flex w-fit items-center gap-2.5 rounded-xl border border-[#1e3a5f] bg-[#0f2040] px-3 py-1.5"
                >
                  <span
                    className="grid h-7 w-7 place-items-center rounded-lg"
                    style={{ backgroundColor: `${color}1f`, color }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-medium text-slate-200">{label}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-600">Educational only — not financial advice.</p>
          </div>

          {/* Link sections — masonry-style columns */}
          <div className="lg:col-span-6">
            <div className="gap-x-8 [column-gap:2rem] sm:columns-2 lg:columns-3">
              {footerNav.map((col) => {
                const meta = SECTION_META[col.title];
                const Icon = meta?.Icon;
                const color = meta?.color ?? "#6b9cff";
                return (
                  <div key={col.title} className="mb-6 break-inside-avoid">
                    <div className="mb-3 flex items-center gap-2.5">
                      {Icon && (
                        <span
                          className="grid h-8 w-8 place-items-center rounded-lg"
                          style={{ backgroundColor: `${color}1f`, color }}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                      )}
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-300">
                        {col.title}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {col.items.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={l.href}
                            className="group flex items-center justify-between gap-2 rounded-lg py-1 pr-1 text-sm text-slate-400 transition-colors hover:text-white"
                          >
                            <span>{l.label}</span>
                            <ChevronRight className="h-4 w-4 shrink-0 text-slate-700 transition-all group-hover:translate-x-0.5 group-hover:text-slate-400" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Newsletter card */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[#1e3a5f] bg-gradient-to-br from-[#10264f] to-[#0c1a38] p-5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#2f5bea] text-white shadow-[0_8px_24px_rgba(47,91,234,0.4)]">
                <Mail className="h-5 w-5" />
              </span>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Stay updated
              </p>
              <p className="mt-1 text-xl font-700 leading-snug text-white">
                Get the latest finance insights &amp; tools
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                New calculators, guides and finance updates, delivered to your inbox.
              </p>

              {subscribed ? (
                <p className="mt-4 rounded-xl border border-[#1e3a5f] bg-[#0f2040] px-3 py-3 text-sm text-slate-200">
                  You&apos;re subscribed. Check your inbox to confirm.
                </p>
              ) : (
                <form onSubmit={subscribe} className="mt-4" noValidate>
                  <div className="flex items-center gap-2 rounded-xl border border-[#1e3a5f] bg-[#0a1324] p-1.5 focus-within:border-[#2f5bea] transition-colors">
                    <Mail className="ml-2 h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter your email"
                      aria-label="Email address"
                      className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-lg bg-[#2f5bea] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2558e8]"
                    >
                      Subscribe
                    </button>
                  </div>
                  {error ? (
                    <p className="mt-2 text-xs text-[#f87171]">{error}</p>
                  ) : (
                    <p className="mt-2 text-xs text-slate-600">No spam. Unsubscribe anytime.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[#1a2e4a] pt-5 sm:flex-row">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>&copy; 2026 {site.name}. All rights reserved.</span>
            <span className="hidden text-slate-700 sm:inline">·</span>
            <span className="hidden sm:inline">Built for India 🇮🇳</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Sitemap", href: "/sitemap.xml" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-xs text-slate-500 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-[#1e3a5f] bg-[#0f2040] px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
