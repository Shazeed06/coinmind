import Link from "next/link";
import { footerNav, site } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  const year = 2026;
  return (
    <footer className="mt-24 border-t border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {site.tagline}. Free calculators, honest tool reviews, and daily
              news for smarter money and AI decisions — for readers in India,
              the US, the UK and beyond.
            </p>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-ink-soft hover:text-forest transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-ink-faint">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-ink-faint max-w-lg sm:text-right">
            Educational information only — not financial advice. Calculator
            results are estimates. Verify figures before making decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
