"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { navMenus, type NavMenu } from "@/lib/site";
import { Search, X, Menu, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import Logo from "./Logo";

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
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <header
      className={`sticky top-0 z-50 h-16 sm:h-[72px] flex flex-col transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border/80 shadow-[0_4px_24px_rgba(15,23,42,0.08)]"
          : "bg-white border-b border-transparent"
      }`}
    >
      {/* Top gradient accent strip */}
      <div className="h-[3px] w-full bg-gradient-to-r from-brand via-accent to-brand shrink-0" />

      <div className="container-main flex items-center gap-4 w-full flex-1">
        <Link href="/" aria-label="CoinMind home" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <div ref={navRef} className="hidden md:flex items-center gap-0.5 ml-3">
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
                  className={`relative inline-flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                    active || open
                      ? "text-brand"
                      : "text-text-muted hover:text-text hover:bg-bg-alt"
                  }`}
                >
                  {/* Active underline indicator */}
                  {(active || open) && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] rounded-full bg-brand" />
                  )}
                  {m.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </Link>

                {open && <MenuPanel menu={m} isActive={isActive} />}
              </div>
            );
          })}
        </div>

        {/* Desktop right side */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-bg-alt/60 px-3 py-2 text-sm text-text-muted hover:text-text hover:border-brand/40 hover:bg-brand/5 transition-all duration-150"
            aria-label="Open search"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">Search</span>
            <ShortcutHint />
          </button>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand to-[#1d4ed8] px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_10px_rgba(47,91,234,0.30)] hover:shadow-[0_4px_16px_rgba(47,91,234,0.45)] hover:translate-y-[-1px] transition-all duration-150"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Start calculating
          </Link>
        </div>

        {/* Mobile right side */}
        <div className="flex items-center gap-1 ml-auto md:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-text-muted hover:text-text hover:bg-bg-alt transition-colors"
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-text hover:bg-bg-alt transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 top-[67px] sm:top-[75px] z-40 md:hidden bg-white overflow-y-auto">
          {/* Brand header strip */}
          <div className="h-[3px] bg-gradient-to-r from-brand via-accent to-brand" />
          <nav className="container-main py-4 flex flex-col gap-2 pb-16">
            {navMenus.map((m) => {
              const expanded = mobileSection === m.label;
              return (
                <div
                  key={m.label}
                  className={`rounded-xl overflow-hidden border transition-colors ${
                    menuIsActive(m) ? "border-brand/30 bg-brand/3" : "border-border"
                  }`}
                >
                  <button
                    onClick={() => setMobileSection(expanded ? null : m.label)}
                    aria-expanded={expanded}
                    className={`w-full flex items-center justify-between px-4 py-3.5 text-left ${
                      menuIsActive(m) ? "text-brand" : "text-text"
                    }`}
                  >
                    <span className="font-semibold text-[15px]">{m.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-text-muted transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {expanded && (
                    <div className="border-t border-border/60 bg-bg-alt/40 px-2 py-2">
                      {m.columns.flatMap((c) => c.items).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block rounded-lg px-3 py-3 transition-colors ${
                            isActive(item.href)
                              ? "bg-brand/10 text-brand"
                              : "text-text hover:bg-white"
                          }`}
                        >
                          <span className="block text-sm font-medium">{item.label}</span>
                          {item.desc && (
                            <span className="block text-xs text-text-muted mt-0.5">{item.desc}</span>
                          )}
                        </Link>
                      ))}
                      {m.footer && (
                        <Link
                          href={m.footer.href}
                          className="flex items-center gap-1.5 rounded-lg px-3 py-3 text-sm font-semibold text-brand"
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
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-[#1d4ed8] px-4 py-4 font-semibold text-white shadow-[0_4px_16px_rgba(47,91,234,0.30)]"
            >
              <Sparkles className="h-4 w-4" />
              Start calculating — it&apos;s free
            </Link>
          </nav>
        </div>
      )}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </header>
  );
}

function MenuPanel({ menu, isActive }: { menu: NavMenu; isActive: (h: string) => boolean }) {
  return (
    <div
      className="absolute left-0 top-full pt-2 z-50"
      style={{ minWidth: menu.columns.length > 1 ? 580 : 300 }}
    >
      <div className="rounded-2xl border border-border/80 bg-white shadow-[0_16px_48px_rgba(15,23,42,0.14)] overflow-hidden">
        {/* Panel header */}
        <div className="px-5 pt-4 pb-3 border-b border-border/60 bg-gradient-to-r from-bg-alt/80 to-white">
          <p className="text-sm text-text-muted leading-relaxed">{menu.blurb}</p>
        </div>

        <div className={`p-3 grid gap-1 ${menu.columns.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {menu.columns.map((col, ci) => (
            <div key={col.heading ?? ci}>
              {col.heading && (
                <p className="px-3 pt-2 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted/60">
                  {col.heading}
                </p>
              )}
              {col.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 ${
                    isActive(item.href)
                      ? "bg-brand/8 text-brand"
                      : "hover:bg-brand/5 hover:text-brand"
                  }`}
                >
                  <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-current opacity-40 shrink-0" />
                  <div>
                    <span className={`block text-sm font-medium leading-snug ${isActive(item.href) ? "text-brand" : "text-text group-hover:text-brand"}`}>
                      {item.label}
                    </span>
                    {item.desc && (
                      <span className="block text-xs text-text-muted mt-0.5 leading-snug">{item.desc}</span>
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
            className="flex items-center justify-between gap-2 border-t border-border/60 bg-gradient-to-r from-bg-alt/60 to-brand/5 px-5 py-3 text-sm font-semibold text-brand hover:from-brand/8 hover:to-brand/10 transition-all"
          >
            {menu.footer.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

function ShortcutHint() {
  const [isMac, setIsMac] = useState<boolean | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);
  if (isMac === null) return null;
  return (
    <span className="hidden lg:inline text-[11px] border border-border rounded px-1.5 py-0.5 text-text-muted font-mono">
      {isMac ? "⌘K" : "Ctrl K"}
    </span>
  );
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh] sm:pt-[12vh] bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-[640px] mx-4 sm:mx-6 bg-white rounded-2xl border border-border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border px-4 sm:px-5 gap-3">
          <Search className="h-4 w-4 text-text-muted shrink-0" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators, guides, tools..."
            aria-label="Search CoinMind"
            className="flex-1 h-13 py-4 text-sm bg-transparent outline-none placeholder:text-text-muted/60"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-text-muted hover:text-text border border-border rounded-lg px-2 py-1 transition-colors"
          >
            Esc
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-bg-alt/40">
          <p className="text-sm text-text-muted">
            {query ? "Press Enter to see all results" : "Try: SIP calculator, income tax, EMI..."}
          </p>
          <button
            type="submit"
            disabled={!query.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-brand to-[#1d4ed8] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            Search <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
