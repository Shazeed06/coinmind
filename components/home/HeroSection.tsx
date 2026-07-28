import Link from "next/link";
import { Calculator, ArrowRight, Search, TrendingUp } from "lucide-react";

const CALC_COUNT = 46;
const GUIDE_COUNT = 37;
const TOOL_COUNT = 44;

export default function HeroSection() {
  return (
    <section className="min-h-[88vh] flex items-center">
      <div className="container-main w-full py-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-pill border border-border bg-bg-alt px-4 py-1.5 text-sm text-text-muted">
              <span>100% Free · No Signup Required</span>
            </div>

            <h1 className="display text-text">
              India&apos;s Smartest{" "}
              <span className="underline-stroke">Personal Finance</span> Platform
            </h1>

            <p className="text-lg text-text-muted max-w-[480px] leading-relaxed mx-auto lg:mx-0">
              Free financial calculators, tools and guides to plan investments, manage loans and save taxes — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center gap-2 h-[52px] w-full sm:w-auto rounded-pill bg-brand px-6 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              >
                Explore Calculators <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 h-[52px] w-full sm:w-auto rounded-pill border border-border px-6 text-sm font-medium text-text hover:border-brand hover:text-brand transition-colors"
              >
                Learn Finance
              </Link>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search calculators, guides, comparisons..."
                className="w-full h-12 pl-12 pr-4 rounded-input border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
              />
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {["SIP", "EMI", "Income Tax", "FD"].map((item) => (
                <Link
                  key={item}
                  href={`/calculators/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-pill border border-border px-3 py-1.5 text-sm text-text-muted hover:text-brand hover:border-brand transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="border-t border-border pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { n: `${CALC_COUNT}+`, l: "Calculators" },
                { n: `${GUIDE_COUNT}+`, l: "Expert Guides" },
                { n: `${TOOL_COUNT}+`, l: "Free Tools" },
                { n: "99.9%", l: "Uptime" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <p className="text-2xl sm:text-[28px] font-bold text-text leading-none">{n}</p>
                  <p className="text-xs sm:text-sm text-text-muted mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center mt-8 lg:mt-0">
            <div className="relative w-full max-w-[380px]">
              <div className="absolute inset-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] mx-auto bg-brand/10 rounded-full blur-3xl" />
              <div className="relative animate-float bg-white border border-border rounded-2xl shadow-card p-6 sm:p-8">
                <p className="eyebrow text-brand">SIP Calculator</p>
                <h3 className="h3 mt-2 text-text">Monthly Investment</h3>
                <div className="mt-6 space-y-5">
                  <div>
                    <p className="small text-text-muted mb-1.5">Monthly SIP Amount</p>
                    <div className="h-11 rounded-input border border-border flex items-center px-3 text-sm text-text">₹10,000</div>
                  </div>
                  <div>
                    <p className="small text-text-muted mb-1.5">Expected Return (p.a.)</p>
                    <div className="h-11 rounded-input border border-border flex items-center px-3 text-sm text-text">12%</div>
                  </div>
                  <div>
                    <p className="small text-text-muted mb-1.5">Investment Period</p>
                    <div className="h-11 rounded-input border border-border flex items-center px-3 text-sm text-text">15 years</div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="small text-text-muted">Projected Corpus</p>
                  <p className="text-[28px] sm:text-[32px] font-bold text-accent leading-tight mt-1">₹50.4 Lakh</p>
                  <div className="flex justify-between text-xs sm:text-sm text-text-muted mt-2">
                    <span>Invested: ₹18 Lakh</span>
                    <span>Returns: ₹32.4 Lakh</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-sm text-text-muted">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <span>12% CAGR · 15 years</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
