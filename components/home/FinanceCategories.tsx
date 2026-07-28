import Link from "next/link";
import { IconArrow } from "@/components/icons";

const CATEGORIES = [
  { label: "Investment", href: "/blog/how-to-start-investing-in-india", desc: "SIP, mutual funds, PPF, NPS, stocks, bonds", color: "from-blue-500/10 to-blue-600/5", icon: "📈" },
  { label: "Tax Planning", href: "/calculators?cat=tax", desc: "Income tax, HRA, 80C, capital gains, TDS, GST", color: "from-emerald-500/10 to-emerald-600/5", icon: "🧾" },
  { label: "Loans", href: "/calculators?cat=loans", desc: "Home, personal, car, education, mortgage EMI", color: "from-violet-500/10 to-violet-600/5", icon: "🏦" },
  { label: "Retirement", href: "/blog/fire-retire-early-india", desc: "FIRE, NPS, PPF, pension, retirement corpus", color: "from-amber-500/10 to-amber-600/5", icon: "🌅" },
  { label: "Mutual Funds", href: "/blog/mutual-funds-beginners-india", desc: "Large, mid, small cap, ELSS, index funds", color: "from-rose-500/10 to-rose-600/5", icon: "📊" },
  { label: "Savings", href: "/calculators?cat=savings", desc: "FD, RD, PPF, SSY, NSC, post office schemes", color: "from-cyan-500/10 to-cyan-600/5", icon: "💰" },
  { label: "Gold", href: "/blog/gold-investment-guide-india", desc: "SGB, gold ETFs, digital gold, physical gold", color: "from-yellow-500/10 to-yellow-600/5", icon: "🥇" },
  { label: "Credit Score", href: "/blog/how-to-improve-credit-score", desc: "CIBIL, credit cards, debt management", color: "from-orange-500/10 to-orange-600/5", icon: "💳" },
  { label: "Stock Market", href: "/blog", desc: "Nifty, Sensex, IPOs, trading, market analysis", color: "from-indigo-500/10 to-indigo-600/5", icon: "📉" },
  { label: "Budget Planning", href: "/blog/50-30-20-budget-rule", desc: "Budgeting, expense tracking, saving strategies", color: "from-teal-500/10 to-teal-600/5", icon: "📋" },
];

export default function FinanceCategories() {
  return (
    <section className="bg-paper-2 border-y border-line">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-wider text-brass">Topics</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-600 text-ink leading-tight">
            Explore Every Aspect of Personal Finance
          </h2>
          <p className="mt-3 text-ink-soft">From investing and taxes to retirement and gold — find everything you need.</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.label} href={cat.href} className="group relative rounded-2xl border border-line bg-card p-6 overflow-hidden transition-all hover:border-forest hover:shadow-lg hover:-translate-y-0.5">
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <div className="relative">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="mt-3 font-display text-lg font-600 text-ink group-hover:text-forest transition-colors">{cat.label}</h3>
                <p className="mt-1 text-sm text-ink-faint">{cat.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-forest opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <IconArrow className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
