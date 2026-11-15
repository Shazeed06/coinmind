"use client";

import { useState, useMemo, useCallback } from "react";
import { Currency, currencyMeta, formatCurrency, formatCompact } from "@/lib/format";
import { CurrencyToggle, Field, Stat } from "./shared";
import Link from "next/link";

interface NicheConfig {
  name: string;
  longRpm: number; // in INR per 1000 views
  shortsRpm: number; // in INR per 1000 views
  sponsorRatio: number; // estimated sponsorship as ratio of adsense
  description: string;
}

const NICHES: Record<string, NicheConfig> = {
  finance: {
    name: "Finance, Stocks & Crypto",
    longRpm: 280,
    shortsRpm: 3.5,
    sponsorRatio: 1.8,
    description: "Highest ad demand (demat apps, credit cards, insurance).",
  },
  tech: {
    name: "Tech, Gadgets & Coding",
    longRpm: 185,
    shortsRpm: 2.8,
    sponsorRatio: 1.4,
    description: "Strong smartphone & SaaS brand sponsorships.",
  },
  education: {
    name: "Education, UPSC & Career",
    longRpm: 120,
    shortsRpm: 2.2,
    sponsorRatio: 1.0,
    description: "EdTech platforms and book publisher sponsorships.",
  },
  health: {
    name: "Health, Fitness & Yoga",
    longRpm: 95,
    shortsRpm: 2.0,
    sponsorRatio: 0.9,
    description: "Supplements, fitness apps, and sportswear deals.",
  },
  entertainment: {
    name: "Entertainment, Comedy & Movies",
    longRpm: 55,
    shortsRpm: 1.6,
    sponsorRatio: 0.5,
    description: "High volume of views, moderate RPM.",
  },
  vlogs: {
    name: "Lifestyle & Daily Vlogs",
    longRpm: 45,
    shortsRpm: 1.5,
    sponsorRatio: 0.6,
    description: "Broad mass audience; brand integrations common.",
  },
  gaming: {
    name: "Gaming & Live Streams",
    longRpm: 38,
    shortsRpm: 1.4,
    sponsorRatio: 0.4,
    description: "Heavily boosted by SuperChats and gaming peripherals.",
  },
  custom: {
    name: "Custom RPM (Manual)",
    longRpm: 100,
    shortsRpm: 2.0,
    sponsorRatio: 0.8,
    description: "Specify your exact channel RPM from YouTube Studio.",
  },
};

const GEO_MULTIPLIERS = {
  in: { label: "100% India Audience", mult: 1.0 },
  mixed: { label: "Mixed (70% India, 30% US/UK)", mult: 1.7 },
  tier1: { label: "100% Tier-1 (USA, UK, Canada)", mult: 4.8 },
};

const VIEW_PRESETS = [
  { label: "10K", views: 10000 },
  { label: "50K", views: 50000 },
  { label: "100K", views: 100000 },
  { label: "500K", views: 500000 },
  { label: "1 Million", views: 1000000 },
  { label: "5 Million", views: 5000000 },
];

export default function YouTubeEarningsCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [monthlyViews, setMonthlyViews] = useState(300000);
  const [format, setFormat] = useState<"long" | "shorts">("long");
  const [nicheKey, setNicheKey] = useState<string>("finance");
  const [customRpm, setCustomRpm] = useState(100);
  const [geoKey, setGeoKey] = useState<keyof typeof GEO_MULTIPLIERS>("in");
  const [includeSponsorship, setIncludeSponsorship] = useState(true);

  const selectedNiche = NICHES[nicheKey] || NICHES.finance;
  const geo = GEO_MULTIPLIERS[geoKey];

  // Base RPM in INR per 1,000 views
  const baseRpmInr = useMemo(() => {
    if (nicheKey === "custom") {
      return format === "long" ? customRpm : Math.max(1, customRpm / 35);
    }
    return format === "long" ? selectedNiche.longRpm : selectedNiche.shortsRpm;
  }, [nicheKey, format, customRpm, selectedNiche]);

  const effectiveRpmInr = baseRpmInr * geo.mult;

  // Calculation in INR
  const {
    monthlyAdSenseInr,
    monthlySponsorshipInr,
    totalMonthlyInr,
    totalDailyInr,
    totalYearlyInr,
    effectiveRpmDisplay,
  } = useMemo(() => {
    const thousandUnits = monthlyViews / 1000;
    const adsense = thousandUnits * effectiveRpmInr;

    // Sponsorships: meaningful above 25k monthly views
    let sponsor = 0;
    if (includeSponsorship && monthlyViews >= 25000) {
      const ratio = format === "long" ? selectedNiche.sponsorRatio : selectedNiche.sponsorRatio * 0.3;
      sponsor = adsense * ratio;
    }

    const monthlyTotal = adsense + sponsor;
    const dailyTotal = monthlyTotal / 30;
    const yearlyTotal = monthlyTotal * 12;

    return {
      monthlyAdSenseInr: adsense,
      monthlySponsorshipInr: sponsor,
      totalMonthlyInr: monthlyTotal,
      totalDailyInr: dailyTotal,
      totalYearlyInr: yearlyTotal,
      effectiveRpmDisplay: effectiveRpmInr,
    };
  }, [monthlyViews, effectiveRpmInr, includeSponsorship, selectedNiche, format]);

  // Convert for selected currency display
  // Approximate USD rate ~85 INR / USD, GBP ~108 INR / GBP
  const fxMultiplier = currency === "USD" ? 1 / 85.5 : currency === "GBP" ? 1 / 108.5 : 1;

  const displayMonthlyTotal = totalMonthlyInr * fxMultiplier;
  const displayDailyTotal = totalDailyInr * fxMultiplier;
  const displayYearlyTotal = totalYearlyInr * fxMultiplier;
  const displayAdSense = monthlyAdSenseInr * fxMultiplier;
  const displaySponsorship = monthlySponsorshipInr * fxMultiplier;
  const displayRpm = effectiveRpmDisplay * fxMultiplier;

  const handleCopy = useCallback(() => {
    const text = `YouTube Earnings Estimate (CoinMind):
Monthly Views: ${monthlyViews.toLocaleString("en-IN")} (${format === "long" ? "Long-form" : "Shorts"})
Niche: ${selectedNiche.name} | Geography: ${geo.label}
Effective RPM: ${formatCurrency(displayRpm, currency)} / 1K views
Monthly AdSense: ${formatCurrency(displayAdSense, currency)}
Monthly Sponsorships: ${formatCurrency(displaySponsorship, currency)}
Total Monthly Earnings: ${formatCurrency(displayMonthlyTotal, currency)}
Total Annual Projection: ${formatCurrency(displayYearlyTotal, currency)}
Calculate your earnings at https://coinmind.in/calculators/youtube-earnings`;
    navigator.clipboard.writeText(text);
  }, [
    monthlyViews,
    format,
    selectedNiche,
    geo,
    displayRpm,
    displayAdSense,
    displaySponsorship,
    displayMonthlyTotal,
    displayYearlyTotal,
    currency,
  ]);

  return (
    <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
      {/* Input Form */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="font-display text-xl text-ink">Channel metrics</h2>
          <CurrencyToggle value={currency} onChange={setCurrency} />
        </div>

        {/* Video Format Tabs */}
        <div className="mt-5">
          <label className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Content Format
          </label>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormat("long")}
              className={`rounded-xl border py-2.5 px-3 text-sm font-semibold transition-all ${
                format === "long"
                  ? "border-forest bg-forest/10 text-forest shadow-xs"
                  : "border-line bg-paper text-ink-soft hover:border-line-strong hover:text-ink"
              }`}
            >
              🎥 Long-form Videos
              <span className="block text-xs font-normal text-ink-faint mt-0.5">
                Avg. ₹40 - ₹400+ RPM
              </span>
            </button>
            <button
              type="button"
              onClick={() => setFormat("shorts")}
              className={`rounded-xl border py-2.5 px-3 text-sm font-semibold transition-all ${
                format === "shorts"
                  ? "border-forest bg-forest/10 text-forest shadow-xs"
                  : "border-line bg-paper text-ink-soft hover:border-line-strong hover:text-ink"
              }`}
            >
              ⚡ YouTube Shorts
              <span className="block text-xs font-normal text-ink-faint mt-0.5">
                Avg. ₹1.5 - ₹4 RPM
              </span>
            </button>
          </div>
        </div>

        {/* Monthly Views Slider & Presets */}
        <div className="mt-6 space-y-3">
          <Field
            label="Monthly channel views"
            value={monthlyViews}
            onChange={setMonthlyViews}
            min={1000}
            max={10000000}
            step={10000}
            suffix="views"
            hint="Total views across all public uploads in 30 days."
          />
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-ink-faint mr-1">Quick:</span>
            {VIEW_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setMonthlyViews(p.views)}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                  monthlyViews === p.views
                    ? "bg-forest text-white"
                    : "bg-paper-2 text-ink-soft hover:bg-paper-3 hover:text-ink"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Niche Selector */}
        <div className="mt-6">
          <label className="text-sm font-medium text-ink-soft">
            Channel Category & Niche
          </label>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.entries(NICHES).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => setNicheKey(key)}
                className={`rounded-xl border p-2.5 text-left text-xs transition-all ${
                  nicheKey === key
                    ? "border-forest bg-forest/5 text-forest font-semibold"
                    : "border-line bg-card text-ink-soft hover:border-line-strong hover:text-ink"
                }`}
              >
                <div className="font-medium text-ink">{config.name}</div>
                <div className="text-[11px] text-ink-faint mt-0.5 line-clamp-1">
                  {config.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom RPM Input if chosen */}
        {nicheKey === "custom" && (
          <div className="mt-5">
            <Field
              label="Your Exact Channel RPM (INR per 1,000 views)"
              value={customRpm}
              onChange={setCustomRpm}
              min={5}
              max={1500}
              step={5}
              prefix="₹"
              hint="Check your YouTube Studio > Analytics > Revenue > RPM."
            />
          </div>
        )}

        {/* Audience Geography */}
        <div className="mt-6">
          <label className="text-sm font-medium text-ink-soft">
            Viewer Geography (Audience Location)
          </label>
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(GEO_MULTIPLIERS).map(([key, config]) => (
              <button
                key={key}
                type="button"
                onClick={() => setGeoKey(key as keyof typeof GEO_MULTIPLIERS)}
                className={`rounded-lg border px-3 py-2 text-left text-xs transition-all ${
                  geoKey === key
                    ? "border-forest bg-forest/10 text-forest font-semibold"
                    : "border-line bg-paper text-ink-soft hover:text-ink"
                }`}
              >
                <div className="font-medium text-ink">{config.label.split(" (")[0]}</div>
                <div className="text-[10px] text-ink-faint">
                  {key === "in" ? "Standard Indian CPM" : key === "mixed" ? "+70% higher CPM" : "4.8x higher CPM"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Sponsorship Toggle */}
        <div className="mt-6 flex items-center justify-between rounded-xl border border-line bg-paper p-3.5">
          <div>
            <p className="text-sm font-medium text-ink">Include Brand Deals & Sponsorships</p>
            <p className="text-xs text-ink-faint mt-0.5">
              Top Indian creators earn 50% to 200% more from sponsorships than AdSense alone.
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={includeSponsorship}
            onClick={() => setIncludeSponsorship(!includeSponsorship)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              includeSponsorship ? "bg-forest" : "bg-line-strong"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                includeSponsorship ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Results Card */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">
              Estimated Monthly Earnings
            </p>
            <span className="rounded-md bg-forest/10 px-2 py-0.5 text-xs font-semibold text-forest">
              RPM: {formatCurrency(displayRpm, currency)} / 1K
            </span>
          </div>

          <p className="mt-2 font-display text-3xl sm:text-4xl font-600 text-forest break-words">
            {formatCompact(displayMonthlyTotal, currency)}
          </p>
          <p className="text-sm text-ink-faint">
            {formatCurrency(displayMonthlyTotal, currency)} / month
          </p>

          {/* Quick Snapshot */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-card p-3">
              <span className="text-[11px] font-medium text-ink-faint block">Daily Income</span>
              <span className="text-base font-bold text-ink">
                {formatCurrency(displayDailyTotal, currency)}
              </span>
            </div>
            <div className="rounded-xl border border-line bg-card p-3">
              <span className="text-[11px] font-medium text-ink-faint block">Annual Potential</span>
              <span className="text-base font-bold text-forest">
                {formatCompact(displayYearlyTotal, currency)}
              </span>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="mt-5 space-y-1">
            <Stat
              label="YouTube AdSense (Estimated)"
              value={formatCurrency(displayAdSense, currency)}
              accent="ink"
            />
            {includeSponsorship && (
              <Stat
                label="Brand Sponsorships (Estimated)"
                value={formatCurrency(displaySponsorship, currency)}
                accent="brass"
              />
            )}
            <Stat
              label="Net Monthly Total"
              value={formatCurrency(displayMonthlyTotal, currency)}
              accent="forest"
            />
          </div>

          {/* Reality Check Callout for 1 Million Views */}
          <div className="mt-5 rounded-xl border border-line bg-card p-4 text-xs leading-relaxed text-ink-soft">
            <strong className="text-ink font-semibold block mb-1">
              💡 1 Million Views Reality Check:
            </strong>
            For 1 Million views in {selectedNiche.name.split(",")[0]}, YouTube AdSense in India
            typically pays{" "}
            <span className="font-semibold text-forest">
              {formatCurrency((1000000 / 1000) * effectiveRpmInr * fxMultiplier, currency)}
            </span>
            . Channels producing 8+ minute videos with 2-3 mid-rolls can earn up to 40% higher.
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-line flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-card px-3 py-2 text-xs font-medium text-ink-soft hover:text-forest hover:border-forest transition-colors"
          >
            📋 Copy earnings report
          </button>
          <Link
            href="/blog/youtube-earnings-per-million-views-india"
            className="inline-flex items-center gap-1.5 rounded-lg bg-forest/10 px-3 py-2 text-xs font-semibold text-forest hover:bg-forest/20 transition-colors ml-auto"
          >
            Read RPM & AdSense Guide →
          </Link>
        </div>
      </div>
    </div>
  );
}
