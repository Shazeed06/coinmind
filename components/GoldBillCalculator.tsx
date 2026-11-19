"use client";

import { useState, useMemo } from "react";
import { Calculator, ShieldCheck, HelpCircle, ArrowRight, Sparkles } from "lucide-react";

type Props = {
  initialGoldRate24K?: number;
  initialSilverRateKg?: number;
  cityName?: string;
};

export default function GoldBillCalculator({
  initialGoldRate24K = 116000,
  initialSilverRateKg = 141000,
  cityName = "India",
}: Props) {
  const [metal, setMetal] = useState<"GOLD" | "SILVER">("GOLD");
  const [karat, setKarat] = useState<"24K" | "22K" | "18K">("22K");
  const [silverType, setSilverType] = useState<"999" | "925">("999");
  const [weight, setWeight] = useState<number>(10);
  const [makingType, setMakingType] = useState<"PERCENT" | "FIXED">("PERCENT");
  const [makingPct, setMakingPct] = useState<number>(12);
  const [makingFixed, setMakingFixed] = useState<number>(450);

  // Derive per-gram base rate
  const ratePerGram = useMemo(() => {
    if (metal === "GOLD") {
      const p24kPerGram = initialGoldRate24K / 10;
      if (karat === "24K") return p24kPerGram;
      if (karat === "22K") return Math.round(p24kPerGram * (22 / 24));
      return Math.round(p24kPerGram * (18 / 24));
    } else {
      const pSilverPerGram = initialSilverRateKg / 1000;
      if (silverType === "999") return pSilverPerGram;
      return Math.round(pSilverPerGram * 0.925);
    }
  }, [metal, karat, silverType, initialGoldRate24K, initialSilverRateKg]);

  // Calculations
  const baseMetalCost = Math.round(ratePerGram * (weight || 0));

  const makingCost = useMemo(() => {
    if (metal === "GOLD" && karat === "24K") return 0; // Pure bullion has no jewellery making
    if (makingType === "PERCENT") {
      return Math.round(baseMetalCost * (makingPct / 100));
    }
    return Math.round((weight || 0) * makingFixed);
  }, [metal, karat, makingType, makingPct, makingFixed, baseMetalCost, weight]);

  const gstMetal = Math.round(baseMetalCost * 0.03); // 3% on raw metal
  const gstMaking = Math.round(makingCost * 0.05);   // 5% on making job work
  const totalGst = gstMetal + gstMaking;
  const grandTotal = baseMetalCost + makingCost + totalGst;

  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h3 className="text-xl font-bold text-text flex items-center gap-2">
            <Calculator className="h-5 w-5 text-amber-500" />
            Jewellery Bill & Making Charges Calculator ({cityName})
          </h3>
          <p className="text-xs sm:text-sm text-text-muted mt-0.5">
            Cross-verify your jeweller&apos;s invoice: Pure metal value + Making charges + 3% GST.
          </p>
        </div>
        <div className="inline-flex rounded-xl bg-bg-alt p-1 border border-border">
          <button
            onClick={() => setMetal("GOLD")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              metal === "GOLD" ? "bg-amber-500 text-white shadow-sm" : "text-text-muted hover:text-text"
            }`}
          >
            Gold (24K/22K)
          </button>
          <button
            onClick={() => setMetal("SILVER")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              metal === "SILVER" ? "bg-slate-700 text-white shadow-sm" : "text-text-muted hover:text-text"
            }`}
          >
            Silver (999/925)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-4">
          {metal === "GOLD" ? (
            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider">Select Purity</label>
              <div className="grid grid-cols-3 gap-2 mt-1.5">
                {[
                  { k: "22K", l: "22K (916)", d: "Jewellery standard" },
                  { k: "24K", l: "24K (999)", d: "Pure coin/bar" },
                  { k: "18K", l: "18K (750)", d: "Diamond jewellery" },
                ].map((item) => (
                  <button
                    key={item.k}
                    onClick={() => setKarat(item.k as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      karat === item.k
                        ? "border-amber-500 bg-amber-50/50 text-text ring-1 ring-amber-500"
                        : "border-border hover:bg-bg-alt/50 text-text-muted"
                    }`}
                  >
                    <p className="font-bold text-sm text-text">{item.l}</p>
                    <p className="text-[11px] text-text-muted">{item.d}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-text uppercase tracking-wider">Select Silver Grade</label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {[
                  { k: "999", l: "999 Fine Silver", d: "Pure bullion / coins" },
                  { k: "925", l: "925 Sterling Silver", d: "Silver jewellery / utensils" },
                ].map((item) => (
                  <button
                    key={item.k}
                    onClick={() => setSilverType(item.k as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      silverType === item.k
                        ? "border-slate-700 bg-slate-50 text-text ring-1 ring-slate-700"
                        : "border-border hover:bg-bg-alt/50 text-text-muted"
                    }`}
                  >
                    <p className="font-bold text-sm text-text">{item.l}</p>
                    <p className="text-[11px] text-text-muted">{item.d}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Weight Input */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-text uppercase tracking-wider">Weight (Grams)</label>
              <span className="text-xs font-semibold text-brand">₹{ratePerGram.toLocaleString("en-IN")}/g</span>
            </div>
            <div className="relative mt-1.5">
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={weight || ""}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-bg-alt/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-text font-semibold text-base"
                placeholder="Enter weight in grams..."
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-text-muted">
                grams
              </span>
            </div>
            <div className="flex gap-1.5 mt-2">
              {[1, 5, 8, 10, 50, 100].map((g) => (
                <button
                  key={g}
                  onClick={() => setWeight(g)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-border bg-white text-text-muted hover:border-amber-500 hover:text-text transition-colors font-medium"
                >
                  {g === 8 ? "8g (1 Pavan)" : `${g}g`}
                </button>
              ))}
            </div>
          </div>

          {/* Making Charges */}
          {karat !== "24K" && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-text uppercase tracking-wider">
                  Making Charges (Jeweller Workmanship)
                </label>
                <div className="flex gap-1">
                  <button
                    onClick={() => setMakingType("PERCENT")}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                      makingType === "PERCENT" ? "bg-amber-100 text-amber-800" : "text-text-muted"
                    }`}
                  >
                    Percentage %
                  </button>
                  <button
                    onClick={() => setMakingType("FIXED")}
                    className={`px-2 py-0.5 text-[11px] font-semibold rounded ${
                      makingType === "FIXED" ? "bg-amber-100 text-amber-800" : "text-text-muted"
                    }`}
                  >
                    ₹ per gram
                  </button>
                </div>
              </div>

              {makingType === "PERCENT" ? (
                <div>
                  <div className="flex justify-between text-xs font-medium text-text mb-1">
                    <span>Rate: {makingPct}%</span>
                    <span className="text-text-muted">Standard branded: 12% - 16%</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="25"
                    step="1"
                    value={makingPct}
                    onChange={(e) => setMakingPct(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-text-muted">₹</span>
                  <input
                    type="number"
                    value={makingFixed || ""}
                    onChange={(e) => setMakingFixed(parseInt(e.target.value) || 0)}
                    className="w-full pl-8 pr-12 py-2 rounded-xl border border-border bg-bg-alt/40 focus:bg-white text-sm font-semibold"
                    placeholder="Making charge per gram..."
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-text-muted">/gram</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Invoice Summary Card */}
        <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-amber-50/60 via-amber-50/20 to-white border border-amber-200/80 p-5 flex flex-col justify-between shadow-sm">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Estimated Invoice</span>
              <span className="text-[11px] font-medium text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full">
                BIS Hallmarked
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>Pure Metal ({weight}g @ ₹{ratePerGram.toLocaleString("en-IN")})</span>
                <span className="font-semibold text-text">₹{baseMetalCost.toLocaleString("en-IN")}</span>
              </div>

              {karat !== "24K" && (
                <div className="flex justify-between text-text-muted">
                  <span>Making Charges ({makingType === "PERCENT" ? `${makingPct}%` : `₹${makingFixed}/g`})</span>
                  <span className="font-semibold text-text">₹{makingCost.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div className="flex justify-between text-text-muted">
                <span>3% GST on Metal</span>
                <span className="font-semibold text-text">₹{gstMetal.toLocaleString("en-IN")}</span>
              </div>

              {makingCost > 0 && (
                <div className="flex justify-between text-text-muted">
                  <span>5% GST on Making Charges</span>
                  <span className="font-semibold text-text">₹{gstMaking.toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-amber-200/60 mt-4 space-y-3">
            <div className="flex justify-between items-baseline">
              <div>
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider">Total Payable</p>
                <p className="text-[11px] text-emerald-600 font-medium">All taxes & billing included</p>
              </div>
              <p className="text-2xl font-black text-text">₹{grandTotal.toLocaleString("en-IN")}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-[11px] text-amber-950 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Buyer Alert:</strong> Mandatory 6-digit alphanumeric <strong>HUID laser code</strong> must match on your physical jewellery and GST bill. Verify it on the free <strong>BIS CARE</strong> app.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
