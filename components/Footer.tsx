import Link from "next/link";
import { site, footerNav } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import Logo from "./Logo";

const liveCalcs = calculators.filter((c) => c.live);
const CALC_CATEGORIES = ["Investing", "Loans", "Tax", "Savings"] as const;
const CATEGORY_LABELS: Record<string, string> = {
  Investing: "Investment",
  Loans: "Loans",
  Tax: "Tax",
  Savings: "Savings",
};

const GUIDE_LINKS = [
  { label: "How to Start Investing in India", href: "/blog/how-to-start-investing-in-india" },
  { label: "Mutual Funds for Beginners", href: "/blog/mutual-funds-beginners-india" },
  { label: "SIP to Become a Crorepati", href: "/blog/sip-to-become-crorepati" },
  { label: "SIP vs Lumpsum", href: "/blog/sip-vs-lumpsum" },
  { label: "Gold Investment Guide", href: "/blog/gold-investment-guide-india" },
  { label: "Emergency Fund Guide", href: "/blog/emergency-fund-guide" },
  { label: "FIRE Retire Early India", href: "/blog/fire-retire-early-india" },
  { label: "CTC vs In-Hand Salary", href: "/blog/ctc-vs-in-hand-salary" },
  { label: "50-30-20 Budget Rule", href: "/blog/50-30-20-budget-rule" },
  { label: "How to Save Income Tax", href: "/blog/how-to-save-income-tax" },
  { label: "New Tax Regime FY 2026-27", href: "/blog/new-tax-regime-fy-2026-27" },
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
  { label: "Gold ETFs vs SGB vs Digital Gold", href: "/blog/gold-investment-guide-india" },
  { label: "How FD Interest is Calculated", href: "/blog" },
  { label: "How EMI is Calculated", href: "/blog" },
  { label: "Which ITR Form to File", href: "/blog" },
  { label: "Old vs New Tax Regime", href: "/tax-regime-break-even" },
];

const RETIREMENT_LINKS = [
  { label: "Retirement Calculator", href: "/calculators/retirement" },
  { label: "FIRE Corpus Calculator", href: "/blog/fire-retire-early-india" },
  { label: "NPS Calculator", href: "/calculators/nps" },
  { label: "PPF Calculator", href: "/calculators/ppf" },
  { label: "SWP Calculator", href: "/calculators/swp" },
  { label: "Pension Planning Guide", href: "/blog/ups-vs-nps" },
  { label: "Retirement Corpus India", href: "/blog/fire-retire-early-india" },
  { label: "NPS vs PPF vs EPF", href: "/blog/ppf-vs-fd-vs-nps" },
  { label: "Step-Up SIP for Retirement", href: "/calculators/step-up-sip" },
  { label: "Inflation Calculator", href: "/calculators/inflation" },
  { label: "Gratuity Calculator", href: "/calculators/gratuity" },
  { label: "4% Rule India", href: "/blog/fire-retire-early-india" },
  { label: "Early Retirement Guide", href: "/blog/fire-retire-early-india" },
  { label: "Senior Citizen FD Rates", href: "/calculators/fd" },
  { label: "SCSS Calculator", href: "/calculators/scss" },
];

const COMPANY_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Editorial Standards", href: "/editorial-standards" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Cookie Policy", href: "/privacy" },
  { label: "AI Policy", href: "/editorial-standards" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export default function Footer() {
  const year = 2026;
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {site.tagline}. {liveCalcs.length} free calculators, {posts.length} expert guides, and {44} free tools — for smarter money decisions in India, the US, the UK and beyond.
            </p>
            <p className="mt-3 text-xs text-ink-faint">
              Educational information only — not financial advice.
            </p>
          </div>

          {CALC_CATEGORIES.map((cat) => {
            const items = liveCalcs.filter((c) => c.category === cat);
            return (
              <div key={cat}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">{CATEGORY_LABELS[cat]} Calculators</h3>
                <ul className="mt-4 space-y-2">
                  {items.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/calculators/${c.slug}`} className="text-sm text-ink-soft hover:text-forest transition-colors">{c.title}</Link>
                    </li>
                  ))}
                  <li><Link href={`/calculators?cat=${cat.toLowerCase()}`} className="text-sm font-medium text-forest hover:underline">All {CATEGORY_LABELS[cat]} &rarr;</Link></li>
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Finance Guides</h3>
            <ul className="mt-4 space-y-2">
              {GUIDE_LINKS.slice(0, 12).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
              <li><Link href="/blog" className="text-sm font-medium text-forest hover:underline">All guides &rarr;</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">More Guides</h3>
            <ul className="mt-4 space-y-2">
              {GUIDE_LINKS.slice(12).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
              <li><Link href="/glossary" className="text-sm font-medium text-forest hover:underline">Finance glossary &rarr;</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Retirement Planning</h3>
            <ul className="mt-4 space-y-2">
              {RETIREMENT_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Company</h3>
            <ul className="mt-4 space-y-2">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-ink-faint">&copy; {year} {site.name}. All rights reserved.</p>
          <p className="text-xs text-ink-faint max-w-xl sm:text-right">
            Disclaimer: All calculators, tools, and content are for educational purposes only. Please consult a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
