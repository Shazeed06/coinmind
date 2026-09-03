"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState, useCallback } from "react";
import { primaryNav } from "@/lib/site";
import { Search, X, Menu } from "lucide-react";
import Logo from "./Logo";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

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

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen(true);
    }
    if (e.key === "Escape") { setSearchOpen(false); setMenuOpen(false); }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 h-16 sm:h-20 flex items-center ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-border" : "bg-white border-b border-transparent"
      }`}
    >
      <div className="container-main flex items-center justify-between w-full">
        <Link href="/" aria-label="CoinMind home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {primaryNav.map((item, i) => {
            const prev = i > 0 ? primaryNav[i - 1] : null;
            const groupChanged = item.group && item.group !== prev?.group;
            return (
              // Keyed Fragment, not `<>`: the shorthand cannot take a key, so
              // React saw an unkeyed list here even though the inner Link had one.
              <Fragment key={item.href}>
                {groupChanged && (
                  <>
                    <span className="w-px h-5 bg-border/60 mx-1.5" aria-hidden="true" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted/60 px-1 select-none">
                      {item.group}
                    </span>
                  </>
                )}
                <Link
                  href={item.href}
                  className={`rounded-pill px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-brand bg-brand/10"
                      : "text-text-muted hover:text-text hover:bg-bg-alt"
                  }`}
                >
                  {item.label}
                </Link>
              </Fragment>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-2 rounded-pill px-3 py-2 text-sm text-text-muted hover:text-text hover:bg-bg-alt transition-colors"
            aria-label="Open search"
          >
            <Search className="h-4 w-4" />
            <span className="text-xs border border-border rounded-input px-1.5 py-0.5">⌘K</span>
          </button>
          <Link
            href="/calculators"
            className="inline-flex items-center gap-1.5 rounded-pill bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:opacity-90"
          >
            Start calculating
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-input text-text hover:bg-bg-alt"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-16 sm:top-20 z-40 md:hidden bg-white overflow-y-auto">
          <nav className="container-main py-4 sm:py-6 flex flex-col gap-1 pb-10">
            {primaryNav.map((item, i) => {
              const prev = i > 0 ? primaryNav[i - 1] : null;
              const groupChanged = item.group && item.group !== prev?.group;
              return (
                <div key={item.href}>
                  {groupChanged && (
                    <div className="mt-3 mb-1 px-4 text-[10px] font-bold uppercase tracking-widest text-text-muted/50">
                      {item.group}
                    </div>
                  )}
                  <Link
                    href={item.href}
                    className={`flex items-center justify-between rounded-card px-4 py-3 ${
                      isActive(item.href) ? "bg-brand/10 text-brand" : "hover:bg-bg-alt text-text"
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    {item.desc && <span className="text-xs text-text-muted">{item.desc}</span>}
                  </Link>
                </div>
              );
            })}
            <button
              onClick={() => { setSearchOpen(true); setMenuOpen(false); }}
              className="mt-2 flex items-center justify-center rounded-card bg-bg-alt px-4 py-3 font-medium text-text gap-2"
            >
              <Search className="h-4 w-4" /> Search
            </button>
            <Link
              href="/calculators"
              className="flex items-center justify-center rounded-card bg-brand px-4 py-3 font-semibold text-white"
            >
              Start calculating
            </Link>
          </nav>
        </div>
      )}

      {searchOpen && (
        <SearchModal query={searchQuery} onQueryChange={setSearchQuery} onClose={() => { setSearchOpen(false); setSearchQuery(""); }} />
      )}
    </header>
  );
}

function SearchModal({ query, onQueryChange, onClose }: { query: string; onQueryChange: (v: string) => void; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[8vh] sm:pt-[15vh] bg-black/40" onClick={onClose}>
      <div className="w-full max-w-[640px] mx-4 sm:mx-6 bg-white rounded-card border border-border shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center border-b border-border px-4 sm:px-5">
          <Search className="h-4 w-4 text-text-muted shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search calculators, guides, tools..."
            className="flex-1 h-12 px-3 text-sm bg-transparent outline-none"
            autoFocus
          />
          <button onClick={onClose} className="text-xs text-text-muted hover:text-text border border-border rounded-input px-2 py-1">
            Esc
          </button>
        </div>
        <div className="p-4 sm:p-5 text-sm text-text-muted text-center">
          {query ? "Press Enter to search" : "Type to search calculators, guides, glossary terms and tools"}
        </div>
      </div>
    </div>
  );
}
