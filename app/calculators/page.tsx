"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { calculators, type Calculator as CalcType } from "@/lib/data";
import { resolveCoverImageUrl } from "@/components/CoverArt";
import {
  Search, ArrowRight, Zap, ShieldCheck, Flag, BadgeCheck, Sparkles,
  TrendingUp, Home, Receipt, PiggyBank, LayoutGrid, type LucideIcon,
} from "lucide-react";

const LIVE = calculators.filter((c) => c.live);

// Category order + visual identity, matching the section headers.
const CAT_META: { key: string; label: string; Icon: LucideIcon; color: string; sub: string }[] = [
  { key: "Investing", label: "Investing", Icon: TrendingUp, color: "#2f5bea", sub: "Grow your wealth with smart investment planning tools." },
  { key: "Loans", label: "Loans", Icon: Home, color: "#ea580c", sub: "Plan your loans and EMIs before you commit." },
  { key: "Tax", label: "Tax", Icon: Receipt, color: "#16a34a", sub: "Simplify your tax planning and stay compliant." },
  { key: "Savings", label: "Savings", Icon: PiggyBank, color: "#db2777", sub: "Build a secure future with better savings planning." },
  { key: "Utility", label: "Utility", Icon: LayoutGrid, color: "#7c3aed", sub: "Helpful financial tools for everyday needs." },
];
const CATS = CAT_META.filter((c) => LIVE.some((x) => x.category === c.key));
const colorOf = (cat: string) => CAT_META.find((c) => c.key === cat)?.color ?? "#2f5bea";

// Hand-picked, topic-relevant cover photo per calculator so each card shows an
// image that actually matches the tool. Unmapped calculators fall back to the
// category-based picker.
const PHOTO: Record<string, string> = {
  sip: "1579621970563-ebec7560ff3e", lumpsum: "1611974789855-9c2a0a7236a3",
  "mutual-fund-returns": "1611974789855-9c2a0a7236a3", "goal-sip": "1579621970563-ebec7560ff3e",
  "step-up-sip": "1590283603385-17ffb3a7f29f", swp: "1526304640581-d334cdbbf45e",
  cagr: "1642543492481-44e81e3914a7", "what-if-simulator": "1590283603385-17ffb3a7f29f",
  goal: "1579546929518-9e396f3cc809", "goal-child-education": "1507679799987-c73779587ccf",
  "goal-marriage": "1519741497674-611481863552",
  retirement: "1516726817505-f5ed825624d8", fire: "1476703993599-0035a21b17a9",
  nps: "1534528741775-53994a69daeb", epf: "1534528741775-53994a69daeb",
  emi: "1560518883-ce09059eeffa", "home-loan-eligibility": "1570129477492-45c003edd2be",
  mortgage: "1560518883-ce09059eeffa", "rent-vs-buy": "1564013799919-ab600027ffc6",
  "goal-house-down-payment": "1570129477492-45c003edd2be",
  "car-loan-emi": "1503376780353-7e6692767b70", "goal-car": "1503376780353-7e6692767b70",
  "personal-loan-emi": "1526304640581-d334cdbbf45e", "education-loan-emi": "1434030216411-0b793f4b4173",
  "income-tax": "1554224155-8d04cb21cd6c", gst: "1554224154-26032ffc0d07",
  tds: "1554224155-6726b3ff858f", "capital-gains": "1611974789855-9c2a0a7236a3",
  hra: "1560518883-ce09059eeffa", "take-home-salary": "1434030216411-0b793f4b4173",
  "8th-pay-commission": "1554224155-8d04cb21cd6c",
  "crypto-tax": "1518770660439-4636190af475", "sales-tax": "1556742049-0a67c5574f73",
  fd: "1567427017947-545c5f8d16ad", rd: "1567427017947-545c5f8d16ad",
  ppf: "1579621970795-87facc2f976d", nsc: "1526304640581-d334cdbbf45e",
  scss: "1516726817505-f5ed825624d8", "post-office-mis": "1526304640581-d334cdbbf45e",
  "compound-interest": "1579621970563-ebec7560ff3e", "simple-interest": "1554224155-8d04cb21cd6c",
  inflation: "1554224154-26032ffc0d07", gratuity: "1497215728101-856f4ea42174",
  sukanya: "1519741497674-611481863552", "goal-emergency-fund": "1434030216411-0b793f4b4173",
  "currency-converter": "1526304640581-d334cdbbf45e", "age-calculator": "1454165804606-c3d57bc86b40",
  "date-difference-calculator": "1454165804606-c3d57bc86b40", "percentage-calculator": "1556742049-0a67c5574f73",
  "tip-calculator": "1554224155-6726b3ff858f", discount: "1556742049-0a67c5574f73",
  "hourly-to-salary": "1497215728101-856f4ea42174", "net-worth": "1590283603385-17ffb3a7f29f",
  "financial-health": "1590283603385-17ffb3a7f29f",
};
function imgFor(c: CalcType) {
  const id = PHOTO[c.slug];
  return id
    ? `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&h=500&q=80`
    : resolveCoverImageUrl(c.slug, c.category);
}

function CalcCard({ c }: { c: CalcType }) {
  const color = colorOf(c.category);
  return (
    <Link
      href={`/calculators/${c.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-lift"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ backgroundColor: `${color}12` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgFor(c)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-text shadow-sm backdrop-blur">
          {c.region === "IN" ? "India" : "Global"}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-[14.5px] font-bold leading-snug text-text">{c.title}</h3>
        <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-text-muted">{c.blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-brand transition-all group-hover:gap-2">
          Open Calculator <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function Page() {
  const [activeCat, setActiveCat] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return LIVE.filter((c) => {
      if (activeCat !== "All" && c.category !== activeCat) return false;
      if (q) {
        return (
          c.title.toLowerCase().includes(q) ||
          c.blurb.toLowerCase().includes(q) ||
          c.keywords.some((k) => k.includes(q))
        );
      }
      return true;
    });
  }, [activeCat, search]);

  const sections = useMemo(() => {
    const cats = activeCat === "All" ? CATS.map((c) => c.key) : [activeCat];
    return cats
      .map((cat) => ({ cat, items: filtered.filter((c) => c.category === cat) }))
      .filter((s) => s.items.length > 0);
  }, [filtered, activeCat]);

  const PER_SECTION = 6;

  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-[#eef4ff] via-[#f3f8ff] to-bg">
        <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#2f5bea]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-[#16a34a]/8 blur-3xl" />
        <div className="relative container-main grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#16a34a]/25 bg-[#16a34a]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#15803d]">
              <Zap className="h-3 w-3" /> India&apos;s Free Financial Calculators
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-text sm:text-4xl lg:text-5xl">
              Plan Smarter.<br />
              Build a <span className="text-[#16a34a]">Brighter Future.</span>
            </h1>
            <p className="mt-4 max-w-[520px] text-[15px] leading-relaxed text-text-muted">
              Explore {LIVE.length}+ free calculators to plan your investments, loans, taxes, savings and more. Make informed financial decisions with easy-to-use tools.
            </p>

            <div className="relative mt-6 max-w-[520px]">
              <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search calculators… (e.g. SIP, home loan, tax, FD)"
                aria-label="Search calculators"
                className="h-13 w-full rounded-xl border border-border bg-white py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/15"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-wrap">
              {[
                { Icon: ShieldCheck, title: `${LIVE.length}+ Calculators`, sub: "100% Free", color: "#2f5bea" },
                { Icon: Flag, title: "Made for India", sub: "Indian context", color: "#d97706" },
                { Icon: BadgeCheck, title: "No Signup", sub: "Use instantly", color: "#16a34a" },
                { Icon: Sparkles, title: "Trusted & Accurate", sub: "Updated regularly", color: "#7c3aed" },
              ].map(({ Icon, title, sub, color }) => (
                <div key={title} className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${color}18`, color }}>
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold text-text">{title}</p>
                    <p className="text-[11px] text-text-muted">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div className="hidden lg:block">
            <div className="relative rounded-3xl border border-border bg-gradient-to-br from-[#0c1628] to-[#13203c] p-6 text-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.6)]">
              <p className="text-sm font-semibold text-slate-300">Smarter Financial Decisions</p>
              <div className="mt-4 rounded-2xl bg-white/95 p-4 text-text shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-text-muted">Portfolio Growth</span>
                  <span className="rounded-full bg-[#dcfce7] px-2 py-0.5 text-[10px] font-bold text-[#15803d]">+12.4%</span>
                </div>
                <p className="mt-0.5 text-2xl font-extrabold tracking-tight" style={{ fontVariantNumeric: "tabular-nums" }}>₹24,50,000</p>
                <svg viewBox="0 0 240 70" className="mt-2 h-16 w-full" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="calcfill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#16a34a" stopOpacity="0.28" />
                      <stop offset="1" stopColor="#16a34a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M2 56 L40 48 L78 52 L116 32 L154 38 L192 18 L238 8 L238 70 L2 70 Z" fill="url(#calcfill)" />
                  <path d="M2 56 L40 48 L78 52 L116 32 L154 38 L192 18 L238 8" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {[
                  { Icon: TrendingUp, label: "Invest Smarter" },
                  { Icon: PiggyBank, label: "Save More" },
                  { Icon: Receipt, label: "Plan Better" },
                  { Icon: ShieldCheck, label: "Live Securely" },
                ].map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-[12.5px] font-medium">
                    <Icon className="h-4 w-4 text-[#4ade80]" /> {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Sticky category tabs ---------- */}
      <div className="sticky top-[66px] z-40 border-b border-border bg-white/95 backdrop-blur-md sm:top-[72px]">
        <div className="container-main flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
          <button
            type="button"
            onClick={() => setActiveCat("All")}
            aria-pressed={activeCat === "All"}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
              activeCat === "All" ? "bg-[#0c1628] text-white" : "border border-border bg-bg-alt text-text-muted hover:text-text"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" /> All
          </button>
          {CATS.map(({ key, label, Icon, color }) => {
            const on = activeCat === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCat(key)}
                aria-pressed={on}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                  on ? "text-white" : "border border-border bg-bg-alt text-text-muted hover:text-text"
                }`}
                style={on ? { backgroundColor: color } : undefined}
              >
                <Icon className="h-3.5 w-3.5" style={on ? undefined : { color }} /> {label}
              </button>
            );
          })}
          <Link href="/calculators" className="ml-auto hidden shrink-0 items-center gap-1 text-[12.5px] font-semibold text-brand hover:underline sm:inline-flex">
            {LIVE.length}+ calculators <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ---------- Sections ---------- */}
      <section className="section-pad bg-bg-alt">
        <div className="container-main space-y-14">
          {sections.length === 0 && (
            <div className="rounded-2xl border border-border bg-bg p-10 text-center">
              <p className="text-text-muted">No calculators match your search.</p>
              <button onClick={() => { setSearch(""); setActiveCat("All"); }} className="mt-3 text-sm font-semibold text-brand hover:underline">
                Clear filters
              </button>
            </div>
          )}

          {sections.map(({ cat, items }) => {
            const meta = CAT_META.find((c) => c.key === cat)!;
            const showViewAll = activeCat === "All" && items.length > PER_SECTION;
            const shown = activeCat === "All" ? items.slice(0, PER_SECTION) : items;
            return (
              <section key={cat} id={`cat-${cat}`} style={{ scrollMarginTop: "7rem" }}>
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl" style={{ backgroundColor: `${meta.color}16`, color: meta.color }}>
                      <meta.Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-xl font-extrabold tracking-tight text-text">{meta.label}</h2>
                      <p className="text-[13px] text-text-muted">{meta.sub}</p>
                    </div>
                  </div>
                  {showViewAll && (
                    <button
                      type="button"
                      onClick={() => setActiveCat(cat)}
                      className="shrink-0 whitespace-nowrap text-[13px] font-semibold text-brand hover:underline"
                    >
                      View all {meta.label.toLowerCase()} calculators →
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                  {shown.map((c) => (
                    <CalcCard key={c.slug} c={c} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* ---------- CTA band ---------- */}
      <section className="bg-[#0a1220]">
        <div className="container-main flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">Not sure which calculator to use?</h2>
            <p className="mt-1.5 text-sm text-slate-400">Browse all calculators or explore our guides to find the right tool for your needs.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => { setActiveCat("All"); setSearch(""); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="inline-flex items-center gap-1.5 rounded-xl bg-[#16a34a] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#15803d]">
              Explore All Calculators <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="/blog" className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5">
              Read Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
