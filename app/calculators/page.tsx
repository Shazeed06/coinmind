"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { calculators, type Calculator as CalcType } from "@/lib/data";
import {
  Search, ArrowRight, Zap, ShieldCheck, Flag, BadgeCheck, Sparkles,
  TrendingUp, Home, Receipt, PiggyBank, LayoutGrid,
  Coins, Umbrella, Target, HandCoins, Landmark, BarChart3, LineChart,
  GraduationCap, Gift, Repeat, Flame, Car, Wallet, Banknote, Clock,
  Percent, Briefcase, Baby, CalendarDays, Scale, HeartPulse, Calculator,
  type LucideIcon,
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

// Each calculator gets a topic-matched icon. Hand-mapping the icon (rather than
// a stock photo keyed by slug) guarantees the visual always fits the tool — the
// old photo map produced mismatches like a portrait on the retirement card.
// Anything unmapped falls back to its category icon, so a new calculator still
// shows a sensible glyph.
const ICON: Record<string, LucideIcon> = {
  // Investing
  sip: LineChart, lumpsum: Coins, "mutual-fund-returns": BarChart3, "goal-sip": Target,
  "step-up-sip": TrendingUp, swp: HandCoins, cagr: TrendingUp, "what-if-simulator": Repeat,
  goal: Target, "goal-child-education": GraduationCap, "goal-marriage": Gift,
  retirement: Umbrella, fire: Flame, nps: Landmark,
  // Loans
  emi: Home, "home-loan-eligibility": Home, mortgage: Home, "rent-vs-buy": Home,
  "goal-house-down-payment": Home, "car-loan-emi": Car, "goal-car": Car,
  "personal-loan-emi": Wallet, "education-loan-emi": GraduationCap,
  // Tax
  "income-tax": Receipt, gst: Receipt, tds: Receipt, "sales-tax": Receipt, "tip-calculator": Receipt,
  "capital-gains": TrendingUp, hra: Home, "take-home-salary": Wallet, "8th-pay-commission": Banknote,
  "hourly-to-salary": Clock, "crypto-tax": Coins,
  // Savings
  fd: Landmark, rd: PiggyBank, ppf: PiggyBank, "sukanya-samriddhi": Baby, nsc: Landmark,
  scss: Umbrella, "post-office-mis": Landmark, "compound-interest": TrendingUp,
  "simple-interest": Percent, inflation: TrendingUp, gratuity: Briefcase, epf: Landmark,
  "goal-emergency-fund": ShieldCheck,
  // Utility
  "currency-converter": Repeat, "age-calculator": CalendarDays, "percentage-calculator": Percent,
  "date-difference-calculator": CalendarDays, discount: Percent, "net-worth": Scale,
  "financial-health": HeartPulse,
};
const CAT_ICON: Record<string, LucideIcon> = {
  Investing: TrendingUp, Loans: Home, Tax: Receipt, Savings: PiggyBank, Utility: Calculator,
};
function iconFor(c: CalcType): LucideIcon {
  return ICON[c.slug] ?? CAT_ICON[c.category] ?? Calculator;
}

function CalcCard({ c }: { c: CalcType }) {
  const color = colorOf(c.category);
  const Icon = iconFor(c);
  return (
    <Link
      href={`/calculators/${c.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-card transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-card-lift"
    >
      <div
        className="relative grid aspect-[16/10] w-full place-items-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}1f 0%, ${color}0a 55%, transparent 100%)` }}
      >
        {/* soft glow behind the icon */}
        <span
          className="pointer-events-none absolute h-24 w-24 rounded-full blur-2xl opacity-40 transition-opacity group-hover:opacity-60"
          style={{ backgroundColor: color }}
        />
        <span
          className="relative grid h-14 w-14 place-items-center rounded-2xl shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: "#ffffff", color }}
        >
          <Icon className="h-7 w-7" strokeWidth={1.75} />
        </span>
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
      {/* ---------- Hero: photo background with a dark overlay and text on top ---------- */}
      <section className="relative overflow-hidden border-b border-border">
        {/* Background image + overlay. A dark base colour sits under the photo so
            the hero still looks intentional if the image is slow or blocked. */}
        <div className="absolute inset-0 bg-[#0a1324]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=70"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover opacity-60"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#070e1c]/95 via-[#0a1324]/88 to-[#0a1324]/70" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#16a34a]/20 blur-3xl" />
        </div>

        <div className="relative container-main py-16 sm:py-20 lg:py-24">
          <div className="max-w-[640px]">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-300 backdrop-blur">
              <Zap className="h-3 w-3" /> India&apos;s Free Financial Calculators
            </span>
            {/* Inline colour: a global `h1 { color: var(--color-text) }` rule
                beats the text-white utility, so on this dark hero the heading
                would render near-invisible without forcing white here. */}
            <h1 style={{ color: "#ffffff" }} className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Plan Smarter.<br />
              Build a <span style={{ color: "#34d399" }}>Brighter Future.</span>
            </h1>
            <p className="mt-5 max-w-[540px] text-[15px] leading-relaxed text-slate-300">
              Explore {LIVE.length}+ free calculators to plan your investments, loans, taxes and savings. Accurate, private, and made for India — no sign-up.
            </p>

            <div className="relative mt-7 max-w-[540px]">
              <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search calculators… (e.g. SIP, home loan, tax, FD)"
                aria-label="Search calculators"
                className="h-13 w-full rounded-xl border border-white/10 bg-white py-3.5 pl-11 pr-4 text-sm text-text shadow-lg outline-none transition-colors focus:ring-2 focus:ring-emerald-400/40"
              />
            </div>

            <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3.5 sm:flex sm:flex-wrap sm:gap-x-7">
              {[
                { Icon: ShieldCheck, title: `${LIVE.length}+ Calculators`, sub: "100% Free", color: "#34d399" },
                { Icon: Flag, title: "Made for India", sub: "Indian context", color: "#fbbf24" },
                { Icon: BadgeCheck, title: "No Signup", sub: "Use instantly", color: "#60a5fa" },
                { Icon: Sparkles, title: "Trusted & Accurate", sub: "Updated regularly", color: "#c084fc" },
              ].map(({ Icon, title, sub, color }) => (
                <div key={title} className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg ring-1 ring-white/10" style={{ backgroundColor: `${color}22`, color }}>
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-semibold text-white">{title}</p>
                    <p className="text-[11px] text-slate-400">{sub}</p>
                  </div>
                </div>
              ))}
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
