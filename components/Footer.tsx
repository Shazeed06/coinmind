"use client";

import Link from "next/link";
import { useState } from "react";
import { site, footerNav } from "@/lib/site";
import { ArrowUp, Send, ShieldCheck, Lock, Users } from "lucide-react";
import { LogoMark } from "./Logo";

const TRUST = [
  { Icon: ShieldCheck, color: "#5bbce8", title: "100% Free", sub: "Always free for everyone" },
  { Icon: Lock, color: "#6b9cff", title: "No Sign-Up", sub: "Start using instantly" },
  { Icon: Users, color: "#2dd4bf", title: "Trusted by Thousands", sub: "Used across India" },
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
    <footer className="bg-[#0a1220] text-white">
      <div className="h-[3px] bg-gradient-to-r from-[#2f5bea] via-[#2aa7de] to-[#2f5bea]" />

      <div className="container-main py-11 lg:py-14">
        <div className="grid gap-x-8 gap-y-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="flex flex-col gap-5 lg:col-span-3">
            <span className="inline-flex items-center gap-2.5">
              <LogoMark className="h-9 w-9 shrink-0" />
              <span className="text-[1.4rem] font-700 lowercase leading-none tracking-tight">
                <span className="text-[#6b9cff]">coin</span>
                <span className="text-[#5bbce8]">mind</span>
              </span>
            </span>
            <p className="max-w-[320px] text-sm leading-relaxed text-slate-400">
              Smarter money decisions for a brighter tomorrow. Free calculators, expert guides and
              easy-to-use tools for every Indian financial decision.
            </p>

            <div className="mt-1 flex flex-wrap gap-x-6 gap-y-4">
              {TRUST.map(({ Icon, color, title, sub }) => (
                <div key={title} className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${color}1f`, color }}>
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold leading-tight text-slate-200">{title}</p>
                    <p className="text-[11px] leading-tight text-slate-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-3">
              {footerNav.map((col) => (
                <div key={col.title}>
                  <p className="mb-3.5 text-[13px] font-bold text-white">{col.title}</p>
                  <ul className="space-y-2.5">
                    {col.items.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-[13.5px] text-slate-400 transition-colors hover:text-white">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-[#1e2a44] bg-[#0e1830] p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#2aa7de] text-white shadow-[0_8px_24px_-6px_rgba(22,163,74,0.7)]">
                <Send className="h-5 w-5" />
              </span>
              <p className="mt-4 text-[1.15rem] font-700 leading-snug text-white">
                Stay Ahead with CoinMind
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Get the latest finance insights, new calculators and helpful guides delivered to your inbox.
              </p>

              {subscribed ? (
                <p className="mt-4 rounded-xl border border-[#1e2a44] bg-[#0a1220] px-3 py-3 text-sm text-slate-200">
                  You&apos;re subscribed. Check your inbox to confirm.
                </p>
              ) : (
                <form onSubmit={subscribe} className="mt-4" noValidate>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                    placeholder="Enter your email address"
                    aria-label="Email address"
                    className="w-full rounded-xl border border-[#1e2a44] bg-[#0a1220] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-[#2aa7de]"
                  />
                  <button
                    type="submit"
                    className="mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#2aa7de] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1f87b5]"
                  >
                    Subscribe Now <ArrowUp className="h-4 w-4 rotate-45" />
                  </button>
                  {error ? (
                    <p className="mt-2 text-xs text-[#f87171]">{error}</p>
                  ) : (
                    <p className="mt-2.5 text-[11px] text-slate-500">No spam. Unsubscribe anytime.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-11 flex flex-col items-center justify-between gap-4 border-t border-[#17233c] pt-6 lg:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-500">
            <span>&copy; 2026 {site.name}. All rights reserved.</span>
            <span className="hidden text-slate-700 sm:inline">·</span>
            <span className="hidden sm:inline">Built for India 🇮🇳</span>
            <span className="hidden text-slate-700 lg:inline">·</span>
            <span className="hidden lg:inline">Helping Indians make smarter financial decisions.</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {[
                { label: "Sitemap", href: "/sitemap.xml" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-xs text-slate-500 transition-colors hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full border border-[#1e2a44] bg-[#0e1830] px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              <ArrowUp className="h-3.5 w-3.5" /> Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
