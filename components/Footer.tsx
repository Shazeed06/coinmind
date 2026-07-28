import Link from "next/link";
import { site } from "@/lib/site";
import { calculators, posts } from "@/lib/data";
import Logo from "./Logo";

const liveCalcs = calculators.filter((c) => c.live);

const CALC_CATEGORIES = [
  {
    label: "Investment",
    slugs: ["sip", "lumpsum", "step-up-sip", "goal-sip", "mutual-fund-returns", "swp", "cagr", "nps", "retirement"],
  },
  {
    label: "Loans",
    slugs: ["emi", "home-loan-eligibility", "mortgage", "car-loan-emi", "personal-loan-emi", "education-loan-emi", "rent-vs-buy"],
  },
  {
    label: "Tax",
    slugs: ["income-tax", "take-home-salary", "hra", "tds", "capital-gains", "gst"],
  },
  {
    label: "Savings",
    slugs: ["fd", "rd", "ppf", "epf", "nsc", "scss", "post-office-mis", "sukanya-samriddhi", "compound-interest", "simple-interest", "inflation"],
  },
  {
    label: "Utility",
    slugs: ["currency-converter", "percentage-calculator", "discount", "sales-tax", "tip-calculator", "age-calculator", "date-difference-calculator", "hourly-to-salary"],
  },
  {
    label: "Health",
    slugs: ["bmi", "ideal-weight", "calorie", "pregnancy-due-date"],
  },
];

const TOPIC_LINKS = [
  { label: "SIP Investing", href: "/calculators/sip" },
  { label: "EMI Calculator", href: "/calculators/emi" },
  { label: "Income Tax 2026-27", href: "/calculators/income-tax" },
  { label: "FD Calculator", href: "/calculators/fd" },
  { label: "PPF Calculator", href: "/calculators/ppf" },
  { label: "NPS Calculator", href: "/calculators/nps" },
  { label: "Retirement Planning", href: "/calculators/retirement" },
  { label: "Goal SIP Crorepati", href: "/calculators/goal-sip" },
  { label: "Step-Up SIP", href: "/calculators/step-up-sip" },
  { label: "SWP Calculator", href: "/calculators/swp" },
  { label: "CAGR Calculator", href: "/calculators/cagr" },
  { label: "HRA Calculator", href: "/calculators/hra" },
  { label: "Gratuity Calculator", href: "/calculators/gratuity" },
  { label: "Take-Home Salary", href: "/calculators/take-home-salary" },
  { label: "EPF Calculator", href: "/calculators/epf" },
  { label: "RD Calculator", href: "/calculators/rd" },
  { label: "Mutual Fund Returns", href: "/calculators/mutual-fund-returns" },
  { label: "Capital Gains Tax", href: "/calculators/capital-gains" },
  { label: "TDS Calculator", href: "/calculators/tds" },
  { label: "Sukanya Samriddhi", href: "/calculators/sukanya-samriddhi" },
  { label: "NSC Calculator", href: "/calculators/nsc" },
  { label: "SCSS Calculator", href: "/calculators/scss" },
  { label: "Post Office MIS", href: "/calculators/post-office-mis" },
  { label: "Home Loan Eligibility", href: "/calculators/home-loan-eligibility" },
  { label: "Rent vs Buy", href: "/calculators/rent-vs-buy" },
  { label: "Mortgage Calculator", href: "/calculators/mortgage" },
  { label: "Car Loan EMI", href: "/calculators/car-loan-emi" },
  { label: "Personal Loan EMI", href: "/calculators/personal-loan-emi" },
  { label: "Education Loan EMI", href: "/calculators/education-loan-emi" },
  { label: "Old vs New Tax Regime", href: "/tax-regime-break-even" },
  { label: "FD Interest Calculator", href: "/calculators/fd" },
  { label: "Simple Interest", href: "/calculators/simple-interest" },
  { label: "Compound Interest", href: "/calculators/compound-interest" },
  { label: "Inflation Calculator", href: "/calculators/inflation" },
  { label: "Currency Converter", href: "/calculators/currency-converter" },
  { label: "Percentage Calculator", href: "/calculators/percentage-calculator" },
  { label: "Discount Calculator", href: "/calculators/discount" },
  { label: "BMI Calculator", href: "/calculators/bmi" },
  { label: "Calorie / TDEE", href: "/calculators/calorie" },
  { label: "GST Calculator", href: "/calculators/gst" },
];

const POST_LINKS = [
  { label: "How to Start Investing in India", href: "/blog/how-to-start-investing-in-india" },
  { label: "Mutual Funds for Beginners", href: "/blog/mutual-funds-beginners-india" },
  { label: "SIP to Become a Crorepati", href: "/blog/sip-to-become-crorepati" },
  { label: "SIP vs Lumpsum", href: "/blog/sip-vs-lumpsum" },
  { label: "Gold Investment Guide India", href: "/blog/gold-investment-guide-india" },
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
  { label: "Make Money with AI", href: "/blog/how-to-make-money-with-ai" },
  { label: "Work Faster with AI", href: "/blog/work-faster-with-ai" },
  { label: "How FD Interest is Calculated", href: "/calculators/fd" },
  { label: "Which ITR Form to File", href: "/blog/itr-season-2026" },
];

const COMPANY_LINKS = [
  { label: "About CoinMind", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Editorial Standards", href: "/editorial-standards" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
  { label: "Finance Glossary", href: "/glossary" },
  { label: "All Calculators", href: "/calculators" },
  { label: "All Guides", href: "/blog" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-2">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2 max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              {site.tagline}. {liveCalcs.length} free calculators, {posts.length} expert guides, and 44 free tools — no sign-up needed.
            </p>
            <p className="mt-3 text-xs text-ink-faint">Educational information only — not financial advice.</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Calculators</h3>
            <ul className="mt-4 space-y-1.5">
              {TOPIC_LINKS.slice(0, 15).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
            </ul>
            <Link href="/calculators" className="mt-3 inline-block text-sm font-medium text-forest hover:underline">All calculators &rarr;</Link>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">More Tools</h3>
            <ul className="mt-4 space-y-1.5">
              {TOPIC_LINKS.slice(15, 30).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
            </ul>
            <Link href="/calculators" className="mt-3 inline-block text-sm font-medium text-forest hover:underline">All tools &rarr;</Link>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Guides</h3>
            <ul className="mt-4 space-y-1.5">
              {POST_LINKS.slice(0, 12).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
            </ul>
            <Link href="/blog" className="mt-3 inline-block text-sm font-medium text-forest hover:underline">All guides &rarr;</Link>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">More Guides</h3>
            <ul className="mt-4 space-y-1.5">
              {POST_LINKS.slice(12).map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
            </ul>
            <Link href="/glossary" className="mt-3 inline-block text-sm font-medium text-forest hover:underline">Finance glossary &rarr;</Link>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Company</h3>
            <ul className="mt-4 space-y-1.5">
              {COMPANY_LINKS.map((l) => (
                <li key={l.href}><Link href={l.href} className="text-sm text-ink-soft hover:text-forest transition-colors">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-ink-faint">
          <p>&copy; 2026 {site.name}. All rights reserved.</p>
          <p>All calculators and content are for educational purposes. Consult a qualified advisor before investing.</p>
        </div>
      </div>
    </footer>
  );
}
