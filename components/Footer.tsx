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
              {site.tagline}. Free calculators, tools and guides — no sign-up.
            </p>
            <p className="mt-3 text-xs text-text-muted/70">Educational only — not financial advice.</p>
          </div>
          {footerNav.map((col, i) => (
            <div key={col.title}>
              <button
                onClick={() => setOpenCol(openCol === i ? null : i)}
                className="lg:cursor-default w-full text-left lg:text-left flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-text-muted lg:pointer-events-none"
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
        <div className="mt-12 lg:mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <p>&copy; 2026 {site.name}. All rights reserved.</p>
          <Link href="/sitemap" className="hover:text-brand transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
