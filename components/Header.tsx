"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react";
import { navMenus, type NavMenu, type NavItem } from "@/lib/site";
import {
  Search, X, Menu, ChevronDown, ChevronRight, ArrowRight, Zap,
  TrendingUp, Landmark, Receipt, PiggyBank, ShieldCheck, Umbrella, BookOpen,
  Gauge, Activity, Flame, Rocket, BarChart3, Target, Scale, FileText,
  Image as ImageIcon, Wallet, Star, Bot, Sparkles, type LucideIcon,
} from "lucide-react";
import { LogoMark } from "./Logo";

// Icon + accent colour per nav `icon` key (see lib/site.ts).
const ICONS: Record<string, LucideIcon> = {
  invest: TrendingUp, loan: Landmark, tax: Receipt, savings: PiggyBank,
  ppf: ShieldCheck, retire: Umbrella, book: BookOpen, credit: Gauge,
  live: Activity, flame: Flame, rocket: Rocket, chart: BarChart3,
  target: Target, compare: Scale, resume: FileText, fileText: FileText,
  image: ImageIcon, budget: Wallet, star: Star, bot: Bot, sparkles: Sparkles,
};
const COLORS: Record<string, string> = {
  invest: "#18172d", loan: "#d97706", tax: "#16a34a", savings: "#16a34a",
  ppf: "#16a34a", retire: "#7c3aed", book: "#18172d", credit: "#e11d48",
  live: "#16a34a", flame: "#e11d48", rocket: "#18172d", chart: "#18172d",
  target: "#0284c7", compare: "#7c3aed", resume: "#18172d", fileText: "#e11d48",
  image: "#7c3aed", budget: "#16a34a", star: "#d97706", bot: "#7c3aed", sparkles: "#7c3aed",
};
function iconMeta(key?: string): { Icon: LucideIcon; color: string } {
  if (key && ICONS[key]) return { Icon: ICONS[key], color: COLORS[key] ?? "#18172d" };
  return { Icon: BarChart3, color: "#64748b" };
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [openMenu]);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
    if (e.key === "Escape") { setSearchOpen(false); setMenuOpen(false); setOpenMenu(null); }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const menuIsActive = (m: NavMenu) =>
    isActive(m.href) || m.items.some((i) => isActive(i.href));

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
      <header className="sticky top-0 z-50 border-b border-[#e9edf3] bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(15,23,42,0.03),0_8px_24px_-18px_rgba(15,23,42,0.25)]">
        <div className="container-main flex h-[68px] w-full items-center gap-4 sm:h-[74px]">
          {/* Logo */}
          <Link href="/" aria-label="CoinMind home" className="group shrink-0">
            <span className="inline-flex items-center gap-2.5">
              <LogoMark className="h-8 w-8 shrink-0" />
              <span className="text-[1.3rem] font-extrabold lowercase leading-none tracking-tight">
                <span className="text-[#18172d]">coin</span>
                <span className="text-[#6d5ef0]">mind</span>
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav ref={navRef} className="ml-6 hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
            {navMenus.map((m) => {
              const open = openMenu === m.label;
              const active = menuIsActive(m);
              return (
                <div key={m.label} className="relative" onMouseEnter={() => openNow(m.label)} onMouseLeave={closeSoon}>
                  <Link
                    href={m.href}
                    aria-expanded={open}
                    aria-haspopup="true"
                    onFocus={() => openNow(m.label)}
                    data-nav-trigger={m.label}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                      active || open ? "bg-[#f2f0fd] text-[#18172d]" : "text-[#475569] hover:bg-[#f4f7fb] hover:text-[#18172d]"
                    }`}
                  >
                    {m.label}
                    <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
                  </Link>
                  {open && <MenuPanel menu={m} isActive={isActive} onEnter={() => openNow(m.label)} onLeave={closeSoon} />}
                </div>
              );
            })}
          </nav>

          {/* Desktop right */}
          <div className="ml-auto hidden items-center gap-2.5 md:flex">
            <button
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-[#e6eaf2] bg-[#f7f9fc] px-3 py-[7px] text-sm text-[#64748b] transition-colors hover:border-[#cbd5e1] hover:text-[#334155]"
              aria-label="Open search"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Search calculators, guides, tools…</span>
              <ShortcutHint />
            </button>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#18172d] to-[#0f0e20] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(24,23,45,0.6)] transition-all hover:from-[#3d68f5] hover:to-[#2558e8]"
            >
              <Zap className="h-3.5 w-3.5" />
              Free Calculators
            </Link>
          </div>

          {/* Mobile right */}
          <div className="ml-auto flex items-center gap-1 md:hidden">
            <button type="button" onClick={() => setSearchOpen(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#475569] hover:bg-[#f4f7fb] hover:text-[#18172d]" aria-label="Open search">
              <Search className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => setMenuOpen((v) => !v)} className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#334155] hover:bg-[#f4f7fb]" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 top-[66px] sm:top-[72px] z-40 overflow-y-auto bg-white md:hidden">
          <nav className="container-main flex flex-col gap-2 py-5 pb-20">
            {navMenus.map((m) => {
              const expanded = mobileSection === m.label;
              const active = menuIsActive(m);
              return (
                <div key={m.label} className={`overflow-hidden rounded-xl border ${active ? "border-[#18172d]/40 bg-[#f2f0fd]/40" : "border-[#e6eaf2]"}`}>
                  <button onClick={() => setMobileSection(expanded ? null : m.label)} aria-expanded={expanded} className="flex w-full items-center justify-between px-4 py-4 text-left">
                    <span className={`text-[15px] font-semibold ${active ? "text-[#18172d]" : "text-[#334155]"}`}>{m.label}</span>
                    <ChevronDown className={`h-4 w-4 text-[#94a3b8] transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                  </button>
                  {expanded && (
                    <div className="border-t border-[#eef1f6] bg-[#f7f9fc]/60 px-2 py-2">
                      {m.items.map((item, idx) => {
                        const { Icon, color } = iconMeta(item.icon);
                        const showGroup = item.group && item.group !== m.items[idx - 1]?.group;
                        return (
                          <div key={item.href}>
                            {showGroup && (
                              <p className="px-3 pb-0.5 pt-2 text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                                {item.group}
                              </p>
                            )}
                            <Link href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[#334155] hover:bg-white">
                              <Icon className="h-[18px] w-[18px] shrink-0" style={{ color }} />
                              <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                          </div>
                        );
                      })}
                      <Link href={m.href} className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#18172d]">
                        View all <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
            <Link href="/calculators" className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#18172d] to-[#0f0e20] px-4 py-4 font-semibold text-white">
              <Zap className="h-4 w-4" /> Free Calculators
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
  const [pos, setPos] = useState<{ left: number; width: number; caret: number }>({ left: 0, width: 520, caret: 60 });

  useLayoutEffect(() => {
    const trigger = document.querySelector<HTMLElement>(`[data-nav-trigger="${menu.label}"]`);
    if (!trigger) return;
    const place = () => {
      const vw = window.innerWidth;
      const width = Math.min(520, vw - 24);
      const tr = trigger.getBoundingClientRect();
      const center = tr.left + tr.width / 2;
      let left = center - width / 2;
      left = Math.max(12, Math.min(vw - width - 12, left));
      setPos({ left, width, caret: Math.max(24, Math.min(width - 24, center - left)) });
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [menu.label]);

  // Bucket items by their optional `group` label, preserving order. When no
  // item carries a group the whole menu is one unlabelled bucket (flat, as
  // before); when some do, each bucket gets a small subheading so the dropdown
  // reads as clearly separated sections.
  const groups: { name: string | null; items: typeof menu.items }[] = [];
  for (const item of menu.items) {
    const g = item.group ?? null;
    let bucket = groups.find((x) => x.name === g);
    if (!bucket) {
      bucket = { name: g, items: [] };
      groups.push(bucket);
    }
    bucket.items.push(item);
  }
  const hasGroups = groups.some((g) => g.name);

  return (
    <div
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="fixed z-50"
      style={{ top: "74px", left: pos.left, width: pos.width }}
    >
      <div className="absolute inset-x-0 -top-3 h-3" aria-hidden="true" />
      <div className="relative rounded-2xl border border-[#e6eaf2] bg-white shadow-[0_24px_70px_-24px_rgba(15,23,42,0.4)]">
        <span className="absolute -top-2 z-10 h-4 w-4 rotate-45 rounded-[3px] border-l border-t border-[#e6eaf2] bg-white" style={{ left: pos.caret - 8 }} aria-hidden="true" />
        <div className="p-3">
          <div className="mb-1.5 flex items-center justify-between px-2.5 py-1">
            <p className="text-[12px] font-bold uppercase tracking-wider text-[#94a3b8]">{menu.label}</p>
            <Link href={menu.href} className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#18172d] hover:underline">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {groups.map((grp, gi) => (
            <div key={grp.name ?? gi} className={gi > 0 ? "mt-1.5 border-t border-[#f1f5f9] pt-1.5" : ""}>
              {hasGroups && grp.name && (
                <p className="px-2.5 pb-0.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-[#94a3b8]">
                  {grp.name}
                </p>
              )}
              <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                {grp.items.map((item) => {
                  const { Icon, color } = iconMeta(item.icon);
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group flex items-start gap-3 rounded-xl px-2.5 py-2.5 transition-colors ${active ? "bg-[#f2f0fd]" : "hover:bg-[#f4f7fb]"}`}
                    >
                      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${color}14`, color }}>
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="min-w-0">
                        <span className={`block truncate text-[13.5px] font-semibold ${active ? "text-[#18172d]" : "text-[#18172d]"}`}>{item.label}</span>
                        {item.desc && <span className="block truncate text-[12px] text-[#64748b]">{item.desc}</span>}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
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
    <span className="hidden rounded border border-[#e6eaf2] bg-white px-1.5 py-0.5 font-mono text-[11px] text-[#94a3b8] lg:inline">
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

  const navigate = (href: string) => { onClose(); router.push(href); };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    if (e.key === "Enter" && results[active]) { e.preventDefault(); navigate(results[active].href); }
  };

  const catColor = (cat: string) =>
    cat === "Calculator" ? "text-[#18172d]" : cat === "Guide" ? "text-[#16a34a]" : "text-[#64748b]";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-[8vh] backdrop-blur-sm sm:pt-[12vh]" onClick={onClose}>
      <div className="mx-4 w-full max-w-[600px] overflow-hidden rounded-2xl border border-[#e6eaf2] bg-white shadow-[0_24px_80px_rgba(15,23,42,0.3)] sm:mx-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-[#e6eaf2] px-4 sm:px-5">
          <Search className="h-4 w-4 shrink-0 text-[#94a3b8]" aria-hidden="true" />
          <input
            type="search" value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            onKeyDown={onKey}
            placeholder="Search calculators, guides, tools…"
            aria-label="Search CoinMind"
            className="h-14 flex-1 bg-transparent text-sm text-[#18172d] outline-none placeholder:text-[#94a3b8]"
            autoFocus
          />
          <button type="button" onClick={onClose} className="rounded-lg border border-[#e6eaf2] px-2 py-1 text-xs text-[#94a3b8] transition-colors hover:text-[#475569]">Esc</button>
        </div>
        <div className="max-h-[340px] overflow-y-auto py-2">
          {!query && <p className="px-4 pb-2 pt-1 text-[10px] font-bold uppercase tracking-widest text-[#94a3b8]">Popular</p>}
          {results.length === 0 && <p className="px-4 py-6 text-center text-sm text-[#94a3b8]">No results for &ldquo;{query}&rdquo;</p>}
          {results.map((item, i) => (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              onMouseEnter={() => setActive(i)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === active ? "bg-[#f4f7fb]" : "hover:bg-[#f7f9fc]"}`}
            >
              <span className={`w-16 shrink-0 text-[10px] font-bold uppercase tracking-wider ${catColor(item.cat)}`}>{item.cat}</span>
              <span className="flex-1 text-sm text-[#334155]">{item.label}</span>
              <ArrowRight className={`h-3.5 w-3.5 shrink-0 text-[#cbd5e1] transition-opacity ${i === active ? "opacity-100" : "opacity-0"}`} />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 border-t border-[#e6eaf2] bg-[#f7f9fc] px-4 py-2.5">
          <span className="text-[11px] text-[#94a3b8]">↑↓ navigate</span>
          <span className="text-[11px] text-[#94a3b8]">↵ open</span>
          <span className="text-[11px] text-[#94a3b8]">Esc close</span>
        </div>
      </div>
    </div>
  );
}
