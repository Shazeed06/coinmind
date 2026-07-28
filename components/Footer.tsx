import Link from "next/link";
import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import Logo from "./Logo";

const liveCalcs = calculators.filter((c) => c.live);
const CALC_CATEGORIES = ["Investing", "Loans", "Tax", "Savings"] as const;
const CATEGORY_LABELS: Record<string, string> = { Investing: "Investment", Loans: "Loans", Tax: "Tax", Savings: "Savings" };

const GUIDE_LINKS = [
  { label: "How to Start Investing", href: "/blog/how-to-start-investing-in-india" },
  { label: "Mutual Funds for Beginners", href: "/blog/mutual-funds-beginners-india" },
  { label: "SIP to Become a Crorepati", href: "/blog/sip-to-become-crorepati" },
  { label: "SIP vs Lumpsum", href: "/blog/sip-vs-lumpsum" },
  { label: "Gold Investment Guide", href: "/blog/gold-investment-guide-india" },
  { label: "Emergency Fund Guide", href: "/blog/emergency-fund-guide" },
  { label: "FIRE Retire Early India", href: "/blog/fire-retire-early-india" },
  { label: "CTC vs In-Hand Salary", href: "/blog/ctc-vs-in-hand-salary" },
  { label: "50-30-20 Budget Rule", href: "/blog/50-30-20-budget-rule" },
  { label: "How to Save Income Tax", href: "/blog/how-to-save-income-tax" },
  { label: "New Tax Regime 2026-27", href: "/blog/new-tax-regime-fy-2026-27" },
  { label: "UPS vs NPS", href: "/blog/ups-vs-nps" },
  { label: "PPF vs FD vs NPS", href: "/blog/ppf-vs-fd-vs-nps" },
  { label: "NPS Explained", href: "/blog/nps-explained" },
  { label: "Home Loan vs Rent", href: "/blog/home-loan-vs-rent" },
  { label: "Improve Credit Score", href: "/blog/how-to-improve-credit-score" },
  { label: "Best AI Tools for Finance", href: "/blog/best-ai-tools-for-personal-finance" },
  { label: "ChatGPT vs Claude vs Gemini", href: "/blog/chatgpt-vs-claude-vs-gemini" },
  { label: "Best Free AI Tools", href: "/blog/best-free-ai-tools" },
  { label: "How to Make Money with AI", href: "/blog/how-to-make-money-with-ai" },
  { label: "Work Faster with AI", href: "/blog/work-faster-with-ai" },
  { label: "Old vs New Tax Regime", href: "/tax-regime-break-even" },
  { label: "How FD Interest is Calculated", href: "/blog" },
  { label: "Which ITR Form to File", href: "/blog" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {site.tagline}. {liveCalcs.length} free calculators, {posts.length} expert guides, and 44 free tools.
            </p>
            <p className="mt-3 text-xs text-ink-faint">Educational information only — not financial advice.</p>
          </div>

          {CALC_CATEGORIES.map((cat) => {
            const items = liveCalcs.filter((c) => c.category === cat);
            return (
              <div key={cat}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{CATEGORY_LABELS[cat]}</h3>
                <ul className="mt-4 space-y-1.5">
                  {items.map((c) => (
                    <li key={c.slug}><Link href={`/calculators/${c.slug}`} className="text-sm text-ink-soft hover:text-forest transition-colors">{c.title}</Link></li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 pt-10 border-t border-line grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Guides</h3>
            <ul className="mt-4 space-y-1.5">
              {GUIDE_LINKS.slice(0, 12).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">More Guides</h3>
            <ul className="mt-4 space-y-1.5">
              {GUIDE_LINKS.slice(12).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
            </ul>
            <Link href="/blog" className="mt-3 inline-block text-sm font-medium text-forest hover:underline">All guides &rarr;</Link>
            <Link href="/glossary" className="mt-1 inline-block text-sm font-medium text-forest hover:underline">Finance glossary &rarr;</Link>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Topics</h3>
            <ul className="mt-4 space-y-1.5">
              {["Investment", "Tax Planning", "Loans", "Retirement", "Mutual Funds", "Gold", "Budget Planning", "Credit Score", "Insurance", "Stock Market"].map((t) => (
                <li key={t}><Link href="/blog" className="text-sm text-ink-soft hover:text-forest transition-colors">{t}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Company</h3>
            <ul className="mt-4 space-y-1.5">
              {[
                { label: "About", href: "/about" }, { label: "Contact", href: "/contact" },
                { label: "Editorial Standards", href: "/editorial-standards" }, { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" }, { label: "Disclaimer", href: "/disclaimer" },
                { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
              ].map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ink-faint">
          <p>&copy; 2026 {site.name}. All rights reserved.</p>
          <p>All calculators and content are for educational purposes. Consult a qualified advisor before investing.</p>
        </div>
      </div>
    </footer>
  );
}
