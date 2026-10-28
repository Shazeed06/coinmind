"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/lib/site";
import { ArrowRight } from "lucide-react";

// Footer modelled on the Bleep Sleep footer: one solid sky-blue band, white
// text, a brand column on the left, two link columns, and a newsletter column
// with a white pill input, then a legal strip across the bottom.

const QUICK_LINKS = [
  { label: "Calculators", href: "/calculators" },
  { label: "Guides & Articles", href: "/blog" },
  { label: "Free Tools", href: "/tools" },
  { label: "AI Tools", href: "/ai-tools" },
  { label: "IPOs", href: "/ipos" },
  { label: "Finance Today", href: "/finance-today" },
  { label: "Glossary", href: "/glossary" },
];

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "About the Author", href: "/authors/sahil" },
  { label: "Methodology", href: "/methodology" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Corrections", href: "/corrections" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Official Sources", href: "/sources" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

// A white version of the brand mark, since the real one is sky-blue and would
// disappear on the blue footer.
function FooterLogoMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden="true" fill="none">
      <circle cx="20" cy="20" r="15" fill="none" stroke="#ffffff" strokeWidth="4.4" strokeLinecap="round" strokeDasharray="72 22.2" transform="rotate(-4 20 20)" />
      <rect x="12.5" y="22" width="3.6" height="8.5" rx="1.6" fill="#ffffff" />
      <rect x="18.2" y="18" width="3.6" height="12.5" rx="1.6" fill="#ffffff" />
      <rect x="23.9" y="13.5" width="3.6" height="17" rx="1.6" fill="#ffffff" />
      <circle cx="25.7" cy="8.6" r="2.7" fill="#bfe6f5" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-[#2aa7de] text-white">
      <div className="container-main py-14 lg:py-16">
        <div className="grid gap-x-10 gap-y-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <FooterLogoMark />
              <span className="text-[1.5rem] font-700 lowercase leading-none tracking-tight text-white">
                coinmind
              </span>
            </Link>
            <p className="mt-5 max-w-[300px] text-sm leading-relaxed text-white/80">
              Smarter money decisions, made simple. Free calculators, guides and tools for every Indian financial decision — accurate, private and no sign-up.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-sm text-white/90 underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            <p className="mt-3 text-sm text-white/80">Made in India 🇮🇳</p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <p className="text-lg font-700 text-white">Quick Links</p>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/85 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <p className="text-lg font-700 text-white">Company</p>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/85 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <p className="text-2xl font-700 leading-tight text-white">Subscribe to our newsletter</p>
            <p className="mt-2 text-sm text-white/80">
              New calculators, finance insights and guides — straight to your inbox.
            </p>

            {status === "done" ? (
              <p className="mt-5 rounded-full bg-white/15 px-5 py-3.5 text-sm text-white">
                You&apos;re subscribed — thanks for joining.
              </p>
            ) : (
              <form onSubmit={subscribe} className="mt-5" noValidate>
                <div className="relative">
                  <label htmlFor="footer-email" className="sr-only">Email address</label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                    placeholder="Email"
                    aria-label="Email address"
                    className="h-14 w-full rounded-full border border-white/40 bg-white px-6 pr-16 text-sm text-text outline-none transition-shadow placeholder:text-text-muted focus:ring-2 focus:ring-white/60"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    aria-label="Subscribe"
                    className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#16517d] text-white transition-colors hover:bg-[#0f3a5a] disabled:opacity-60"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
                {status === "error" && (
                  <p className="mt-2.5 text-xs text-white/90">Please enter a valid email address.</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Legal strip */}
        <div className="mt-14 border-t border-white/20 pt-7">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-sm text-white/85 transition-colors hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-2 text-sm text-white/80 sm:flex-row sm:items-center sm:justify-between">
            <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
            <span>
              Not investment advice · Educational use only.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
