"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { navMenus, type NavMenu } from "@/lib/site";
import { Search, X, Menu, ChevronDown, ArrowRight } from "lucide-react";
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

  // Any navigation closes everything, otherwise a panel would survive the
  // route change and hang over the new page.
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

  // Pointer-driven menus still need a click-away path for touch and for
  // keyboard users who opened a panel with Enter.
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

  // A menu counts as current when any of its destinations is the open page, so
  // a reader on /glossary still sees "Learn" highlighted.
  const menuIsActive = (m: NavMenu) =>
    isActive(m.href) || m.columns.some((c) => c.items.some((i) => isActive(i.href)));

  const openNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  // A short grace period lets the pointer cross the gap between the trigger
  // and its panel without the panel snapping shut.
  const closeSoon = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-200 h-16 sm:h-20 flex items-center bg-white ${
        scrolled ? "border-b border-border shadow-[0_1px_12px_rgba(15,23,42,0.06)]" : "border-b border-transparent"
      }`}
    >
      <div className="container-main flex items-center gap-4 w-full">
        <Link href="/" aria-label="CoinMind home" className="shrink-0">
          <Logo />
        </Link>

        {/* Desktop menus */}
        <div ref={navRef} className="hidden md:flex items-center gap-0.5 ml-2">
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
                  className={`inline-flex items-center gap-1 rounded-pill px-3.5 py-2 text-sm font-medium transition-colors ${
                    active || open ? "text-brand bg-brand/10" : "text-text-muted hover:text-text hover:bg-bg-alt"
                  }`}
                >
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

        <div className="hidden md:flex items-center gap-2 ml-auto">
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-2 rounded-pill border border-border px-3 py-2 text-sm text-text-muted hover:text-text hover:border-line-strong transition-colors"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
            <span className="hidden lg:inline">Search</span>
            <ShortcutHint />
          </button>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 rounded-pill bg-brand px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Start calculating
          </Link>
        </div>

        <div className="flex items-center gap-1 ml-auto md:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-input text-text hover:bg-bg-alt"
            aria-label="Open search"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-input text-text hover:bg-bg-alt"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-16 sm:top-20 z-40 md:hidden bg-white overflow-y-auto">
          <nav className="container-main py-4 flex flex-col gap-2 pb-12">
            {navMenus.map((m) => {
              const expanded = mobileSection === m.label;
              return (
                <div key={m.label} className="rounded-card border border-border overflow-hidden">
                  <button
                    onClick={() => setMobileSection(expanded ? null : m.label)}
                    aria-expanded={expanded}
                    className={`w-full flex items-center justify-between px-4 py-3.5 text-left ${
                      menuIsActive(m) ? "text-brand" : "text-text"
                    }`}
                  >
                    <span className="font-semibold">{m.label}</span>
                    <ChevronDown
                      className={`h-4 w-4 text-text-muted transition-transform ${expanded ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {expanded && (
                    <div className="border-t border-border bg-bg-alt/50 px-2 py-2">
                      {m.columns.flatMap((c) => c.items).map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block rounded-input px-3 py-3 ${
                            isActive(item.href) ? "bg-brand/10 text-brand" : "text-text hover:bg-white"
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
                          className="flex items-center gap-1.5 rounded-input px-3 py-3 text-sm font-semibold text-brand"
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
              className="mt-2 flex items-center justify-center rounded-card bg-brand px-4 py-3.5 font-semibold text-white"
            >
              Start calculating
            </Link>
          </nav>
        </div>
      )}

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </header>
  );
}

/** The dropdown body for one top-level menu. */
function MenuPanel({ menu, isActive }: { menu: NavMenu; isActive: (h: string) => boolean }) {
  return (
    <div
      className="absolute left-0 top-full pt-2 z-50"
      // Panels are sized to their content rather than the trigger, so a
      // two-column section does not stretch a one-column one.
      style={{ minWidth: menu.columns.length > 1 ? 560 : 300 }}
    >
      <div className="rounded-card border border-border bg-white shadow-[0_12px_40px_rgba(15,23,42,0.12)] overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-border/70">
          <p className="text-sm text-text-muted leading-relaxed">{menu.blurb}</p>
        </div>

        <div className={`p-3 grid gap-1 ${menu.columns.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {menu.columns.map((col, ci) => (
            <div key={col.heading ?? ci}>
              {col.heading && (
                <p className="px-3 pt-2 pb-1 text-[11px] font-bold uppercase tracking-wider text-text-muted/70">
                  {col.heading}
                </p>
              )}
              {col.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-input px-3 py-2.5 transition-colors ${
                    isActive(item.href) ? "bg-brand/10" : "hover:bg-bg-alt"
                  }`}
                >
                  <span className={`block text-sm font-medium ${isActive(item.href) ? "text-brand" : "text-text"}`}>
                    {item.label}
                  </span>
                  {item.desc && (
                    <span className="block text-xs text-text-muted mt-0.5">{item.desc}</span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {menu.footer && (
          <Link
            href={menu.footer.href}
            className="flex items-center justify-between gap-2 border-t border-border/70 bg-bg-alt/60 px-5 py-3 text-sm font-semibold text-brand hover:bg-bg-alt"
          >
            {menu.footer.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

/**
 * Windows and Linux visitors were being shown a Mac-only glyph. Resolved after
 * mount so the server and client markup match.
 */
function ShortcutHint() {
  const [isMac, setIsMac] = useState<boolean | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);
  if (isMac === null) return null;
  return (
    <span className="hidden lg:inline text-[11px] border border-border rounded-input px-1.5 py-0.5 text-text-muted">
      {isMac ? "⌘K" : "Ctrl K"}
    </span>
  );
}

/**
 * The old modal told people to press Enter but had no form or handler, so the
 * key did nothing. It now submits to the existing /search page.
 */
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
      className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh] sm:pt-[15vh] bg-black/40"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        className="w-full max-w-[640px] mx-4 sm:mx-6 bg-white rounded-card border border-border shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-border px-4 sm:px-5">
          <Search className="h-4 w-4 text-text-muted shrink-0" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search calculators, guides, tools..."
            aria-label="Search CoinMind"
            className="flex-1 h-12 px-3 text-sm bg-transparent outline-none"
            autoFocus
          />
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-text-muted hover:text-text border border-border rounded-input px-2 py-1"
          >
            Esc
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 p-3 sm:px-5 sm:py-3">
          <p className="text-sm text-text-muted">
            {query ? "Press Enter to see results" : "Calculators, guides, glossary terms and tools"}
          </p>
          <button
            type="submit"
            disabled={!query.trim()}
            className="inline-flex items-center gap-1.5 rounded-pill bg-brand px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Search <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
