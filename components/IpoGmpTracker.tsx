"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, TrendingUp, Sparkles, ShieldCheck, ExternalLink, ArrowUpRight, Flame } from "lucide-react";

import { ALL_IPOS, type IpoItem } from "@/lib/ipo-data";

export type { IpoItem };
export const LIVE_IPOS: IpoItem[] = ALL_IPOS;

export default function IpoGmpTracker() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "MAINBOARD" | "HIGH_GAIN">("ALL");

  const filteredIpos = useMemo(() => {
    return LIVE_IPOS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;

      if (filterType === "MAINBOARD") return item.type === "Mainboard";
      if (filterType === "HIGH_GAIN") {
        const gainPct = (item.gmp / item.upperPrice) * 100;
        return gainPct >= 15;
      }
      return true;
    });
  }, [search, filterType]);

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center bg-white p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search IPO by company name (e.g. Jio, Zepto, NTPC)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-border bg-bg-alt/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30 transition-all text-text placeholder:text-text-muted"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterType("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === "ALL"
                ? "bg-brand text-white shadow-sm"
                : "bg-bg-alt text-text-muted hover:text-text"
            }`}
          >
            All IPOs ({LIVE_IPOS.length})
          </button>
          <button
            onClick={() => setFilterType("HIGH_GAIN")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
              filterType === "HIGH_GAIN"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            <Flame className="h-3.5 w-3.5" /> High Gain (&gt;15%)
          </button>
          <button
            onClick={() => setFilterType("MAINBOARD")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              filterType === "MAINBOARD"
                ? "bg-brand text-white shadow-sm"
                : "bg-bg-alt text-text-muted hover:text-text"
            }`}
          >
            Mainboard
          </button>
        </div>
      </div>

      {/* Main IPO Table */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/80 border-b border-border text-xs text-text-muted uppercase tracking-wider font-semibold">
              <th className="px-4 py-3.5">Company Name</th>
              <th className="px-4 py-3.5">Price Band</th>
              <th className="px-4 py-3.5">GMP (₹ / %)</th>
              <th className="px-4 py-3.5">Est. Listing Price</th>
              <th className="px-4 py-3.5">Est. Profit / Lot</th>
              <th className="px-4 py-3.5">Dates / Status</th>
              <th className="px-4 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredIpos.map((ipo, idx) => {
              const impliedListing = ipo.upperPrice + ipo.gmp;
              const gainPct = ((ipo.gmp / ipo.upperPrice) * 100).toFixed(1);
              const estProfit = ipo.lotSize * ipo.gmp;
              const isPositive = ipo.gmp > 0;

              return (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-bold text-text flex items-center gap-2">
                      {ipo.slug ? (
                        <Link href={`/ipos/${ipo.slug}`} className="hover:text-brand hover:underline underline-offset-2">
                          {ipo.name}
                        </Link>
                      ) : (
                        <span>{ipo.name}</span>
                      )}
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {ipo.type}
                      </span>
                    </div>
                    {ipo.registrar && (
                      <p className="text-xs text-text-muted mt-0.5">Registrar: {ipo.registrar}</p>
                    )}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap font-medium text-text">
                    {ipo.priceBand}
                    <span className="block text-xs text-text-muted">Lot: {ipo.lotSize} shares</span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs">
                      <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                      +{ipo.gmp} ({gainPct}%)
                    </div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className="font-extrabold text-text">₹{impliedListing}</span>
                    <span className="block text-xs text-emerald-600 font-semibold">+{gainPct}% gain</span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap font-bold text-emerald-700">
                    ₹{estProfit.toLocaleString("en-IN")}
                    <span className="block text-[11px] font-normal text-text-muted">per 1 lot</span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        ipo.status === "Open"
                          ? "bg-green-100 text-green-800 animate-pulse"
                          : ipo.status === "Allotment Out"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {ipo.status}
                    </span>
                    <span className="block text-xs text-text-muted mt-0.5">
                      {ipo.openDate} - {ipo.closeDate}
                    </span>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <Link
                      href={ipo.slug ? `/ipos/${ipo.slug}` : "/ipos/ipo-allotment-status"}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                    >
                      Check Allotment <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 1-Click Allotment Portals Hub */}
      <div className="bg-gradient-to-br from-[#0c1628] to-[#122340] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Direct Official IPO Allotment Check Links</h3>
        </div>
        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          Avoid fake ad websites. Check your official IPO allotment status directly on BSE, NSE or registrar portals using your PAN:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <a
            href="https://linkintime.co.in/initial_offer/public-issues.html"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-xs font-semibold text-white group"
          >
            <span>Link Intime Portal</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-white" />
          </a>
          <a
            href="https://ris.kfintech.com/ipostatus/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-xs font-semibold text-white group"
          >
            <span>KFintech Portal</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-white" />
          </a>
          <a
            href="https://www.bseindia.com/investors/appli_check.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-xs font-semibold text-white group"
          >
            <span>BSE India Allotment</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-white" />
          </a>
          <a
            href="https://www.nseindia.com/products/content/equities/ipos/ipo_bid_details.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all text-xs font-semibold text-white group"
          >
            <span>NSE Bid Status</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
