"use client";

import Link from "next/link";
import { useState } from "react";
import { site, footerNav } from "@/lib/site";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const [openCol, setOpenCol] = useState<number | null>(null);

  return (
    <footer className="border-t border-border bg-bg-alt">
      <div className="container-main py-16 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-1 text-center lg:text-left">
            <span className="inline-flex justify-center lg:justify-start"><Logo /></span>
            <p className="mt-4 small text-text-muted leading-relaxed">
              {site.tagline}. Free calculators, tools and guides. No sign-up.
            </p>
            {/* Full-strength muted, not /70: at 12px the faded variant measured
                3.53:1, under the 4.5:1 AA floor for a line of real prose. */}
            <p className="mt-3 text-xs text-text-muted">Educational only, not financial advice.</p>
            <div className="mt-4 flex justify-center lg:justify-start gap-4">
              <a href={site.social.twitter} target="_blank" rel="noopener noreferrer" className="small text-text-muted hover:text-brand transition-colors" aria-label="Follow CoinMind on X">X / Twitter</a>
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="small text-text-muted hover:text-brand transition-colors" aria-label="Follow CoinMind on LinkedIn">LinkedIn</a>
            </div>
          </div>
          {footerNav.map((col, i) => (
            <div key={col.title} className="border-t border-border/60 pt-4 lg:border-0 lg:pt-0">
              <button
                onClick={() => setOpenCol(openCol === i ? null : i)}
                aria-expanded={openCol === i}
                // py-3.5 on mobile gives a ~44px tap target for the accordion
                // header. On lg it is a static label, so the tighter py-1 is fine.
                className="lg:cursor-default w-full text-left lg:text-left flex items-center justify-between py-3.5 lg:py-1 text-xs font-semibold uppercase tracking-wider text-text-muted lg:pointer-events-none"
              >
                {col.title}
                <ChevronDown className={`h-3.5 w-3.5 lg:hidden transition-transform ${openCol === i ? "rotate-180" : ""}`} />
              </button>
              <ul className={`mt-4 space-y-3 text-center lg:text-left ${openCol === i ? "block" : "hidden lg:block"}`}>
                {col.items.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="small text-text-muted hover:text-brand transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 lg:mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted text-center sm:text-left">
          <p>&copy; 2026 {site.name}. All rights reserved.</p>
          <Link href="/sitemap.xml" className="inline-block py-2 hover:text-brand transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
