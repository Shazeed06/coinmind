"use client";

import Link from "next/link";
import { useState } from "react";
import { site, footerNav } from "@/lib/site";
import { ChevronDown, Shield, ExternalLink } from "lucide-react";
import Logo, { LogoMark } from "./Logo";

export default function Footer() {
  const [openCol, setOpenCol] = useState<number | null>(null);

  return (
    <footer className="bg-[#0c1628] text-white">
      {/* Top gradient border */}
      <div className="h-[3px] bg-gradient-to-r from-brand via-accent to-brand" />

      {/* Main content */}
      <div className="container-main py-14 lg:py-20">

        {/* Brand + links grid */}
        <div className="grid gap-10 lg:grid-cols-6">

          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div>
              {/* White-friendly logo version */}
              <span className="inline-flex items-center gap-2.5">
                <LogoMark className="h-9 w-9 shrink-0" />
                <span className="text-[1.4rem] font-700 tracking-tight lowercase leading-none">
                  <span className="text-[#6b9cff]">coin</span>
                  <span className="text-[#4ade80]">mind</span>
                </span>
              </span>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-[280px]">
                {site.tagline}. Free calculators, guides and tools for every Indian financial decision.
              </p>
            </div>

            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#1e3a5f] bg-[#0f2040] px-3 py-1.5">
              <Shield className="h-3.5 w-3.5 text-[#4ade80] shrink-0" />
              <span className="text-xs text-slate-400">No sign-up &nbsp;·&nbsp; No data stored &nbsp;·&nbsp; Always free</span>
            </div>

            {/* Social links */}
            <div className="flex gap-2">
              <a
                href={site.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CoinMind on X"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e3a5f] bg-[#0f2040] px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:border-slate-500 transition-all duration-150"
              >
                𝕏 &nbsp;Twitter
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CoinMind on LinkedIn"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#1e3a5f] bg-[#0f2040] px-3 py-2 text-xs font-medium text-slate-400 hover:text-white hover:border-slate-500 transition-all duration-150"
              >
                <ExternalLink className="h-3 w-3" />
                LinkedIn
              </a>
            </div>

            <p className="text-xs text-slate-600">Educational only — not financial advice.</p>
          </div>

          {/* Nav link columns */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {footerNav.map((col, i) => (
              <div key={col.title}>
                {/* Mobile accordion toggle */}
                <button
                  onClick={() => setOpenCol(openCol === i ? null : i)}
                  aria-expanded={openCol === i}
                  className="lg:cursor-default w-full text-left flex items-center justify-between mb-3 lg:pointer-events-none"
                >
                  <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                    {col.title}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-slate-600 lg:hidden transition-transform duration-200 ${openCol === i ? "rotate-180" : ""}`}
                  />
                </button>
                <ul className={`space-y-2.5 ${openCol === i ? "block" : "hidden lg:block"}`}>
                  {col.items.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-slate-400 hover:text-white transition-colors duration-150"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[#1a2e4a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span>&copy; 2026 {site.name}. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">·</span>
            <span className="hidden sm:inline">Built for India 🇮🇳</span>
          </div>
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
                className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
