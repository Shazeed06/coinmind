"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { navMenus, type NavMenu, type NavColumn, type NavItem } from "@/lib/site";
import {
  Search, X, Menu, ChevronDown, ChevronRight, ArrowRight, Zap,
  Calculator, LineChart, PiggyBank, BookOpen, BarChart3, Lightbulb, Flame,
  Building2, FileText, Wrench, Bot, Sparkles, GraduationCap, Star,
  TrendingUp, Coins, Landmark, Receipt, Gauge, Umbrella, Wallet, Newspaper,
  Scale, Microscope, Activity, Target, HeartPulse, Percent, ShieldCheck,
  Rocket, Image as ImageIcon, type LucideIcon,
} from "lucide-react";
import { LogoMark } from "./Logo";
import { resolveCoverImageUrl } from "./CoverArt";

// Icon registry for nav column headings (keyed by `icon` in lib/site.ts).
const ICONS: Record<string, LucideIcon> = {
  calculator: Calculator, lineChart: LineChart, piggy: PiggyBank,
  book: BookOpen, barChart: BarChart3, bulb: Lightbulb, flame: Flame,
  search: Search, building: Building2, fileText: FileText, wrench: Wrench,
  bot: Bot, sparkles: Sparkles,
};

// Keyword → icon + colour for individual nav links, so each item gets a
// topical, coloured icon without hand-annotating every entry.
const ITEM_ICONS: [RegExp, LucideIcon, string][] = [
  [/lump\s*sum|lumpsum/, Coins, "#0284c7"],
  [/\bsip\b|systematic/, TrendingUp, "#2f5bea"],
  [/mutual fund|\bfund\b/, BarChart3, "#2f5bea"],
  [/emi|loan|mortgage/, Landmark, "#d97706"],
  [/income tax|\btax\b/, Receipt, "#16a34a"],
  [/credit|cibil/, Gauge, "#e11d48"],
  [/retire|pension|\bnps\b|\bepf\b|fire/, Umbrella, "#7c3aed"],
  [/\bppf\b/, ShieldCheck, "#16a34a"],
  [/\bfd\b|fixed deposit|savings|\brd\b/, PiggyBank, "#16a34a"],
  [/gold|metal/, Coins, "#d97706"],
  [/net worth/, Scale, "#0284c7"],
  [/\bgoal\b/, Target, "#2f5bea"],
  [/health|score/, HeartPulse, "#e11d48"],
  [/cagr|compound|return|interest/, Percent, "#7c3aed"],
  [/investing|invest|stock|market|equity/, LineChart, "#2f5bea"],
  [/glossary/, BookOpen, "#0284c7"],
  [/news/, Newspaper, "#d97706"],
  [/guide|blog|article|how-to/, BookOpen, "#2f5bea"],
  [/compar/, Scale, "#7c3aed"],
  [/research/, Microscope, "#0284c7"],
  [/finance today|live|rbi/, Activity, "#16a34a"],
  [/ipo|gmp|allot|\bnse\b|zepto|oyo|phonepe|fincorp|jio/, Rocket, "#2f5bea"],
  [/upcoming/, TrendingUp, "#16a34a"],
  [/merge pdf|image to pdf|\bpdf\b|document/, FileText, "#e11d48"],
  [/invoice/, Receipt, "#d97706"],
  [/resume/, FileText, "#2f5bea"],
  [/compress|image/, ImageIcon, "#7c3aed"],
  [/chatgpt|gemini|deepseek|ask ai|ai tool|assistant|\bai\b/, Sparkles, "#7c3aed"],
  [/budget/, Wallet, "#16a34a"],
];
function iconFor(label: string, href: string): { Icon: LucideIcon; color: string } {
  const t = `${label} ${href}`.toLowerCase();
  for (const [re, Icon, color] of ITEM_ICONS) if (re.test(t)) return { Icon, color };
  return { Icon: BarChart3, color: "#64748b" };
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setOpenMenu(null);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openMenu]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen(true);
    }
    if (e.key === "Escape") {
      setSearchOpen(false);
      setMenuOpen(false);
      setOpenMenu(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const menuIsActive = (m: NavMenu) =>
    isActive(m.href) || m.columns.some((c) => c.items.some((i) => isActive(i.href)));

  const openNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex flex-col transition-all duration-300 ${
          scrolled
            ? "bg-[#0c1628]/95 backdrop-blur-xl border-b border-[#1e3a5f]/80 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-[#0c1628] border-b border-[#1e3a5f]/40"
        }`}
      >
        {/* Top gradient accent strip */}
        <div className="h-[2px] w-full bg-gradient-to-r from-[#2f5bea] via-[#16a34a] to-[#2f5bea] shrink-0" />

        <div className="container-main flex items-center gap-4 w-full h-[68px] sm:h-[76px]">

          {/* Logo */}
          <Link href="/" aria-label="CoinMind home" className="shrink-0 group">
            <span className="inline-flex items-center gap-2.5">
              <LogoMark className="h-8 w-8 shrink-0" />
              <span className="text-[1.3rem] font-700 tracking-tight lowercase leading-none">
                <span className="text-[#6b9cff] group-hover:text-[#93b4ff] transition-colors">coin</span>
                <span className="text-[#4ade80] group-hover:text-[#86efac] transition-colors">mind</span>
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} className="hidden md:flex items-center gap-1 ml-6" aria-label="Main navigation">
            {navMenus.map((m) => {
              const open = openMenu === m.label;
              const active = menuIsActive(m);
              return (
                <div
                  key={m.label}
                  className="relative"
                  onMouseEnter={() => openNow(m.label)}
                  onMouseLeave={closeSoon}
                >
                  <Link
                    href={m.href}
                    aria-expanded={open}
                    aria-haspopup="true"
                    onFocus={() => openNow(m.label)}
                    data-nav-trigger={m.label}
                    className={`relative inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                      active || open
                        ? "text-white bg-white/10"
                        : "text-slate-400 hover:text-white hover:bg-white/8"
                    }`}
                  >
                    {m.label}
                    <ChevronDown
                      className={`h-3 w-3 opacity-60 transition-transform duration-200 ${open ? "rotate-180 opacity-100" : ""}`}
                      aria-hidden="true"
                    />
                    {/* Active dot */}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-[#4ade80]" />
                    )}
                  </Link>

                  {open && (
                    <MenuPanel
                      menu={m}
                      isActive={isActive}
                      onEnter={() => openNow(m.label)}
                      onLeave={closeSoon}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-[#1e3a5f] bg-[#0f2040] px-3 py-[7px] text-sm text-slate-400 hover:text-white hover:border-slate-500 transition-all duration-150"
              aria-label="Open search"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Search</span>
              <ShortcutHint />
            </button>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#2f5bea] to-[#1d4ed8] px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(47,91,234,0.35)] hover:shadow-[0_0_28px_rgba(47,91,234,0.55)] hover:from-[#3d68f5] hover:to-[#2558e8] transition-all duration-200"
            >
              <Zap className="h-3.5 w-3.5" />
              Free Calculators
            </Link>
          </div>

          {/* Mobile right */}
          <div className="flex items-center gap-1 ml-auto md:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
              aria-label="Open search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 hover:text-white hover:bg-white/8 transition-colors"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer - outside header so it overlays content properly */}
      {menuOpen && (
        <div className="fixed inset-0 top-[66px] sm:top-[70px] z-40 md:hidden bg-[#080f1e] overflow-y-auto">
          <div className="h-[2px] bg-gradient-to-r from-[#2f5bea] via-[#16a34a] to-[#2f5bea]" />
          <nav className="container-main py-5 flex flex-col gap-2 pb-20">
            {navMenus.map((m) => {
              const expanded = mobileSection === m.label;
              const active = menuIsActive(m);
              return (
                <div
                  key={m.label}
                  className={`rounded-xl overflow-hidden border transition-colors ${
                    active ? "border-[#2f5bea]/40 bg-[#2f5bea]/8" : "border-[#1e3a5f]"
                  }`}
                >
                  <button
                    onClick={() => setMobileSection(expanded ? null : m.label)}
                    aria-expanded={expanded}
                    className="w-full flex items-center justify-between px-4 py-4 text-left"
                  >
                    <span className={`font-semibold text-[15px] ${active ? "text-white" : "text-slate-300"}`}>
                      {m.label}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {expanded && (
                    <div className="border-t border-[#1e3a5f]/60 bg-[#0a1628]/60 px-2 py-2">
                      {m.columns.flatMap((c) => c.items).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block rounded-lg px-3 py-3 transition-colors ${
                            isActive(item.href)
                              ? "bg-[#2f5bea]/20 text-[#6b9cff]"
                              : "text-slate-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className="block text-sm font-medium">{item.label}</span>
                          {item.desc && (
                            <span className="block text-xs text-slate-500 mt-0.5">{item.desc}</span>
                          )}
                        </Link>
                      ))}
                      {m.footer && (
                        <Link
                          href={m.footer.href}
                          className="flex items-center gap-1.5 rounded-lg px-3 py-3 text-sm font-semibold text-[#6b9cff]"
                        >
                          {m.footer.label} <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/calculators"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2f5bea] to-[#1d4ed8] px-4 py-4 font-semibold text-white shadow-[0_0_24px_rgba(47,91,234,0.4)]"
            >
              <Zap className="h-4 w-4" />
              Free Calculators - No sign-up
            </Link>
          </nav>
        </div>
      )}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function MenuPanel({
  menu, isActive, onEnter, onLeave,
}: {
  menu: NavMenu;
  isActive: (h: string) => boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [caretX, setCaretX] = useState(80);

  // Point the caret at the active trigger even though the panel is centered.
  useLayoutEffect(() => {
    const trigger = document.querySelector<HTMLElement>(`[data-nav-trigger="${menu.label}"]`);
    const card = wrapRef.current?.querySelector<HTMLElement>("[data-panel-card]");
    if (!trigger || !card) return;
    const place = () => {
      const tr = trigger.getBoundingClientRect();
      const cr = card.getBoundingClientRect();
      const x = tr.left + tr.width / 2 - cr.left;
      setCaretX(Math.max(28, Math.min(cr.width - 28, x)));
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [menu.label]);

  const colColors = ["#2f5bea", "#16a34a", "#d97706", "#7c3aed"];

  return (
    <div
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="fixed left-1/2 z-50 -translate-x-1/2 px-2"
      style={{ top: "78px", width: "min(1140px, calc(100vw - 16px))" }}
    >
      {/* hover bridge above the card */}
      <div className="absolute inset-x-0 -top-3 h-3" aria-hidden="true" />
      <div
        data-panel-card
        className="relative rounded-2xl border border-[#e6eaf2] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.28)]"
      >
        <span
          className="absolute -top-2 z-10 h-4 w-4 rotate-45 rounded-[3px] border-l border-t border-[#e6eaf2] bg-white"
          style={{ left: caretX - 8 }}
          aria-hidden="true"
        />
        <div className="relative flex overflow-hidden rounded-2xl">
          {menu.promo && <PromoCard promo={menu.promo} />}
          <div
            className="grid flex-1 gap-1 p-5"
            style={{ gridTemplateColumns: `repeat(${menu.columns.length}, minmax(0, 1fr))` }}
          >
            {menu.columns.map((col, ci) => (
              <div key={col.heading ?? ci} className="min-w-0 px-2">
                <ColHeading col={col} color={colColors[ci % colColors.length]} />
                <div className="mt-2 space-y-0.5">
                  {col.items.map((item) => (
                    <ItemLink
                      key={item.href}
                      item={item}
                      isActive={isActive}
                      fallback={colColors[ci % colColors.length]}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          {menu.popular && <PopularList popular={menu.popular} />}
        </div>
      </div>
    </div>
  );
}

function PromoCard({ promo }: { promo: NonNullable<NavMenu["promo"]> }) {
  return (
    <div className="hidden w-[248px] shrink-0 flex-col border-r border-[#eef1f6] bg-gradient-to-b from-[#eef4ff] to-[#f7f9fc] p-6 lg:flex">
      <span className="w-fit rounded-full bg-[#dcfce7] px-3 py-1 text-[11px] font-semibold text-[#15803d]">
        {promo.pill}
      </span>
      <div className="my-6 grid place-items-center">
        <GraduationCap className="h-16 w-16 text-[#2f5bea]" strokeWidth={1.4} />
      </div>
      <h3 className="text-[1.3rem] font-extrabold leading-[1.15] tracking-tight text-[#0f172a]">
        {promo.title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-[#64748b]">{promo.desc}</p>
      <Link
        href={promo.cta.href}
        className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#2f5bea] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(47,91,234,0.35)] transition-colors hover:bg-[#2558e8]"
      >
        {promo.cta.label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function ColHeading({ col, color }: { col: NavColumn; color: string }) {
  const Icon = col.icon ? ICONS[col.icon] : undefined;
  return (
    <div className="flex items-center gap-2.5 px-2.5">
      {Icon && (
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          <Icon className="h-[18px] w-[18px]" />
        </span>
      )}
      <div className="min-w-0">
        <p className="text-[13.5px] font-bold leading-tight text-[#0f172a]">{col.heading}</p>
        {col.sub && <p className="mt-0.5 text-[11px] leading-tight text-[#94a3b8]">{col.sub}</p>}
      </div>
    </div>
  );
}

function ItemLink({
  item, isActive, fallback,
}: {
  item: NavItem;
  isActive: (h: string) => boolean;
  fallback: string;
}) {
  const resolved =
    item.icon && ICONS[item.icon]
      ? { Icon: ICONS[item.icon], color: fallback }
      : iconFor(item.label, item.href);
  const Icon = resolved.Icon;
  const active = isActive(item.href);
  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-colors ${
        active ? "bg-[#eff4ff]" : "hover:bg-[#f4f7fb]"
      }`}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" style={{ color: resolved.color }} />
      <span
        className={`flex-1 truncate text-[13.5px] font-medium leading-tight ${
          active ? "text-[#2f5bea]" : "text-[#334155] group-hover:text-[#0f172a]"
        }`}
      >
        {item.label}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#cbd5e1] transition-all group-hover:translate-x-0.5 group-hover:text-[#94a3b8]" />
    </Link>
  );
}

function PopularList({ popular }: { popular: NonNullable<NavMenu["popular"]> }) {
  return (
    <div className="hidden w-[290px] shrink-0 flex-col border-l border-[#eef1f6] bg-[#f6faf7] p-5 xl:flex">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#dcfce7] text-[#15803d]">
            <Star className="h-[18px] w-[18px]" />
          </span>
          <div>
            <p className="text-[13.5px] font-bold leading-tight text-[#0f172a]">{popular.heading}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-[#94a3b8]">{popular.sub}</p>
          </div>
        </div>
        <Link
          href={popular.viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-[12px] font-semibold text-[#2f5bea] hover:underline"
        >
          View All <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <div className="mt-3 space-y-0.5">
        {popular.items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolveCoverImageUrl(it.seed)}
              alt=""
              width={52}
              height={40}
              loading="lazy"
              className="h-10 w-[52px] shrink-0 rounded-lg border border-[#e6eaf2] bg-[#e6eaf2] object-cover"
            />
            <span className="flex-1 text-[13px] font-semibold leading-snug text-[#334155] line-clamp-2 group-hover:text-[#2f5bea]">
              {it.label}
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-[#cbd5e1]" />
          </Link>
        ))}
      </div>
    </div>
  );
}

function ShortcutHint() {
  const [isMac, setIsMac] = useState<boolean | null>(null);
  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);
  if (isMac === null) return null;
  return (
    <span className="hidden lg:inline text-[11px] border border-[#1e3a5f] rounded px-1.5 py-0.5 text-slate-600 font-mono">
      {isMac ? "⌘K" : "Ctrl K"}
    </span>
  );
}

const SEARCH_INDEX = [
  { label: "SIP Calculator", href: "/calculators/sip", cat: "Calculator", keywords: "sip mutual fund investment" },
  { label: "Income Tax Calculator", href: "/calculators/income-tax", cat: "Calculator", keywords: "income tax salary itr" },
  { label: "EMI Calculator", href: "/calculators/emi", cat: "Calculator", keywords: "emi loan home car" },
  { label: "FD Calculator", href: "/calculators/fd", cat: "Calculator", keywords: "fd fixed deposit interest" },
  { label: "PPF Calculator", href: "/calculators/ppf", cat: "Calculator", keywords: "ppf public provident fund" },
  { label: "Step-Up SIP Calculator", href: "/calculators/step-up-sip", cat: "Calculator", keywords: "step up sip topup" },
  { label: "Lumpsum Calculator", href: "/calculators/lumpsum", cat: "Calculator", keywords: "lumpsum mutual fund one time" },
  { label: "HRA Exemption Calculator", href: "/calculators/hra", cat: "Calculator", keywords: "hra house rent allowance" },
  { label: "NPS Calculator", href: "/calculators/nps", cat: "Calculator", keywords: "nps national pension system retirement" },
  { label: "Retirement Calculator", href: "/calculators/retirement", cat: "Calculator", keywords: "retirement corpus pension" },
  { label: "CAGR Calculator", href: "/calculators/cagr", cat: "Calculator", keywords: "cagr growth rate" },
  { label: "Capital Gains Tax Calculator", href: "/calculators/capital-gains", cat: "Calculator", keywords: "capital gains ltcg stcg equity" },
  { label: "Goal SIP Calculator", href: "/calculators/goal-sip", cat: "Calculator", keywords: "goal sip target crore" },
  { label: "Take-Home Salary Calculator", href: "/calculators/take-home-salary", cat: "Calculator", keywords: "salary ctc in hand take home" },
  { label: "Compound Interest Calculator", href: "/calculators/compound-interest", cat: "Calculator", keywords: "compound interest compounding" },
  { label: "SIP Investment Guide", href: "/sip", cat: "Guide", keywords: "sip guide mutual fund" },
  { label: "Income Tax Guide", href: "/income-tax", cat: "Guide", keywords: "income tax guide india" },
  { label: "Finance & AI Glossary", href: "/glossary", cat: "Tool", keywords: "glossary terms definitions" },
  { label: "AI Tools Directory", href: "/ai-tools", cat: "Tool", keywords: "ai tools finance" },
];

const POPULAR = SEARCH_INDEX.slice(0, 6);

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();

  const results = query.trim()
    ? SEARCH_INDEX.filter((item) =>
        `${item.label} ${item.keywords}`.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 7)
    : POPULAR;

  const navigate = (href: string) => {
    onClose();
    router.push(href);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === "Enter" && results[active]) { e.preventDefault(); navigate(results[active].href); }
  };

  const catColor = (cat: string) =>
    cat === "Calculator" ? "text-[#6b9cff]" : cat === "Guide" ? "text-[#4ade80]" : "text-slate-400";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh] sm:pt-[12vh] bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] mx-4 sm:mx-6 bg-[#0c1628] rounded-2xl border border-[#1e3a5f] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 sm:px-5 border-b border-[#1e3a5f]">
          <Search className="h-4 w-4 text-slate-500 shrink-0" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onKey}
            placeholder="Search calculators, guides, tools..."
            aria-label="Search CoinMind"
            className="flex-1 h-14 text-sm bg-transparent outline-none text-white placeholder:text-slate-600"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-600 hover:text-slate-400 border border-[#1e3a5f] rounded-lg px-2 py-1 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div className="py-2 max-h-[340px] overflow-y-auto">
          {!query && (
            <p className="px-4 pt-1 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
              Popular
            </p>
          )}
          {results.length === 0 && (
            <p className="px-4 py-6 text-sm text-slate-500 text-center">No results for "{query}"</p>
          )}
          {results.map((item, i) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              onMouseEnter={() => setActive(i)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                i === active ? "bg-white/8" : "hover:bg-white/5"
              }`}
            >
              <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 w-16 ${catColor(item.cat)}`}>
                {item.cat}
              </span>
              <span className="text-sm text-slate-200 flex-1">{item.label}</span>
              <ArrowRight className={`h-3.5 w-3.5 text-slate-600 shrink-0 transition-opacity ${i === active ? "opacity-100" : "opacity-0"}`} />
            </button>
          ))}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2.5 border-t border-[#1e3a5f] bg-[#080f1e]/60 flex items-center gap-4">
          <span className="text-[11px] text-slate-700">↑↓ navigate</span>
          <span className="text-[11px] text-slate-700">↵ open</span>
          <span className="text-[11px] text-slate-700">Esc close</span>
        </div>
      </div>
    </div>
  );
}
