"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { navMenus, type NavMenu } from "@/lib/site";
import { Search, X, Menu, ChevronDown, ArrowRight, Zap } from "lucide-react";
import { LogoMark } from "./Logo";

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

        <div className="container-main flex items-center gap-4 w-full h-16 sm:h-[68px]">

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
          <nav ref={navRef} className="hidden md:flex items-center gap-0.5 ml-4" aria-label="Main navigation">
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
                    className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
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

                  {open && <MenuPanel menu={m} isActive={isActive} />}
                </div>
              );
            })}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
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

      {/* Mobile drawer — outside header so it overlays content properly */}
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
              Free Calculators — No sign-up
            </Link>
          </nav>
        </div>
      )}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function MenuPanel({ menu, isActive }: { menu: NavMenu; isActive: (h: string) => boolean }) {
  return (
    <div
      className="absolute left-0 top-full pt-2.5 z-50"
      style={{ minWidth: menu.columns.length > 1 ? 600 : 300 }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 top-2 rounded-2xl bg-[#2f5bea]/10 blur-xl pointer-events-none" />

      <div className="relative rounded-2xl border border-[#1e3a5f] bg-[#0c1628]/98 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Panel blurb header */}
        <div className="px-5 pt-4 pb-3 border-b border-[#1e3a5f]/60 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          <p className="text-sm text-slate-400 leading-relaxed">{menu.blurb}</p>
        </div>

        <div className={`p-3 grid gap-1 ${menu.columns.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {menu.columns.map((col, ci) => (
            <div key={col.heading ?? ci}>
              {col.heading && (
                <p className="px-3 pt-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  {col.heading}
                </p>
              )}
              {col.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 ${
                    isActive(item.href)
                      ? "bg-[#2f5bea]/15 text-[#6b9cff]"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className={`mt-1 h-1.5 w-1.5 rounded-full shrink-0 transition-colors ${
                    isActive(item.href) ? "bg-[#6b9cff]" : "bg-slate-600 group-hover:bg-[#4ade80]"
                  }`} />
                  <div>
                    <span className={`block text-sm font-medium leading-snug transition-colors ${
                      isActive(item.href) ? "text-[#6b9cff]" : "text-slate-300 group-hover:text-white"
                    }`}>
                      {item.label}
                    </span>
                    {item.desc && (
                      <span className="block text-xs text-slate-600 mt-0.5 leading-snug group-hover:text-slate-500 transition-colors">
                        {item.desc}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {menu.footer && (
          <Link
            href={menu.footer.href}
            className="group flex items-center justify-between gap-2 border-t border-[#1e3a5f]/60 bg-gradient-to-r from-[#2f5bea]/8 to-transparent px-5 py-3 text-sm font-semibold text-[#6b9cff] hover:from-[#2f5bea]/15 transition-all"
          >
            {menu.footer.label}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
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
