"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";

function getTier(score: number): { label: string; color: string; bg: string } {
  if (score >= 780) return { label: "Excellent (Best Loan Rates)", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" };
  if (score >= 750) return { label: "Very Good (Instant Approvals)", color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" };
  if (score >= 700) return { label: "Good (Approval Ready)", color: "text-brand", bg: "bg-brand/10 border-brand/25" };
  if (score >= 650) return { label: "Fair (Higher Interest)", color: "text-amber-700", bg: "bg-amber-50 border-amber-200" };
  return { label: "Needs Rebuild", color: "text-rose-700", bg: "bg-rose-50 border-rose-200" };
}

export default function CreditScoreSimulator() {
  const [currentScore, setCurrentScore] = useState(665);
  const [currentUtil, setCurrentUtil] = useState(62);
  const [targetUtil, setTargetUtil] = useState(18);
  const [onTimeStreak, setOnTimeStreak] = useState(true);
  const [disputeError, setDisputeError] = useState(false);
  const [noNewInquiries, setNoNewInquiries] = useState(true);
  const [keepOldCards, setKeepOldCards] = useState(true);

  const sim = useMemo(() => {
    // Realistic point gain model capped at 850 (standard CIBIL/FICO ceiling for consumer range)
    const utilDrop = Math.max(0, currentUtil - targetUtil);
    let utilGain = 0;
    if (utilDrop > 0) {
      utilGain = Math.round(utilDrop * 0.65);
      if (currentUtil > 50 && targetUtil <= 30) utilGain += 12;
      if (targetUtil <= 10 && currentUtil > 20) utilGain += 8;
      utilGain = Math.min(utilGain, 65);
    }

    const paymentGain = onTimeStreak ? (currentScore < 700 ? 28 : currentScore < 750 ? 18 : 10) : 0;
    const disputeGain = disputeError ? (currentScore < 720 ? 35 : 18) : 0;
    const inquiryGain = noNewInquiries ? 10 : 0;
    const ageGain = keepOldCards ? 8 : 0;

    // Diminishing returns above 770
    const rawGain = utilGain + paymentGain + disputeGain + inquiryGain + ageGain;
    const scale = currentScore >= 780 ? 0.35 : currentScore >= 740 ? 0.65 : 1;
    const totalGain = Math.min(Math.round(rawGain * scale), Math.max(0, 845 - currentScore));
    const projected = Math.min(845, currentScore + totalGain);

    return {
      projected,
      totalGain,
      utilGain: Math.round(utilGain * scale),
      paymentGain: Math.round(paymentGain * scale),
      disputeGain: Math.round(disputeGain * scale),
      otherGain: Math.round((inquiryGain + ageGain) * scale),
      currentTier: getTier(currentScore),
      projectedTier: getTier(projected),
      pctCurrent: Math.min(100, Math.max(0, ((currentScore - 300) / 600) * 100)),
      pctProjected: Math.min(100, Math.max(0, ((projected - 300) / 600) * 100)),
    };
  }, [currentScore, currentUtil, targetUtil, onTimeStreak, disputeError, noNewInquiries, keepOldCards]);

  return (
    <div className="my-8 rounded-2xl border border-brand/25 bg-gradient-to-br from-[#eef6fb] via-white to-white p-5 sm:p-7 shadow-card not-prose">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
          <Sparkles className="h-3.5 w-3.5" /> Interactive 90-Day CIBIL Booster Simulator
        </span>
        <span className="text-xs font-medium text-text-muted">Instant · Private · No PAN needed</span>
      </div>

      <h3 className="mt-3 text-xl sm:text-2xl font-bold text-text">
        See how many points you can add in 3 months
      </h3>
      <p className="mt-1 text-sm text-text-muted">
        Slide your current score and credit card usage to estimate your realistic 90-day CIBIL/credit score boost.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Controls */}
        <div className="space-y-5 lg:col-span-7">
          <div>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="cibil-current" className="font-semibold text-text">
                Current Credit / CIBIL Score
              </label>
              <span className="rounded-md bg-bg-alt px-2.5 py-0.5 font-mono font-bold text-text">
                {currentScore}
              </span>
            </div>
            <input
              id="cibil-current"
              type="range"
              min={500}
              max={820}
              step={5}
              value={currentScore}
              onChange={(e) => setCurrentScore(Number(e.target.value))}
              className="mt-2 w-full accent-brand cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-text-muted">
              <span>500 (Low)</span>
              <span>650 (Fair)</span>
              <span>750 (Target)</span>
              <span>820+</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-text">
                <label htmlFor="cibil-cur-util">Current Card Usage</label>
                <span className="text-rose-600 font-bold">{currentUtil}%</span>
              </div>
              <input
                id="cibil-cur-util"
                type="range"
                min={5}
                max={95}
                step={1}
                value={currentUtil}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setCurrentUtil(v);
                  if (targetUtil > v) setTargetUtil(v);
                }}
                className="mt-2 w-full accent-brand cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-text">
                <label htmlFor="cibil-tgt-util">Target Card Usage</label>
                <span className="text-emerald-600 font-bold">{targetUtil}%</span>
              </div>
              <input
                id="cibil-tgt-util"
                type="range"
                min={5}
                max={Math.max(5, currentUtil)}
                step={1}
                value={targetUtil}
                onChange={(e) => setTargetUtil(Number(e.target.value))}
                className="mt-2 w-full accent-brand cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              { checked: onTimeStreak, set: setOnTimeStreak, label: "3 months 100% on-time EMIs & bills" },
              { checked: disputeError, set: setDisputeError, label: "Fix a wrong late mark / report error" },
              { checked: noNewInquiries, set: setNoNewInquiries, label: "Pause new loan/card applications" },
              { checked: keepOldCards, set: setKeepOldCards, label: "Keep oldest credit card active" },
            ].map((item) => (
              <label
                key={item.label}
                className={`flex items-start gap-2.5 rounded-xl border p-3 text-xs cursor-pointer transition-colors ${
                  item.checked
                    ? "border-brand/40 bg-brand/5 text-text font-medium"
                    : "border-border bg-white text-text-muted"
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => item.set(e.target.checked)}
                  className="mt-0.5 accent-brand"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Live Result Card */}
        <div className="flex flex-col justify-between rounded-2xl border border-border bg-white p-5 lg:col-span-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Projected 90-Day Score
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                <TrendingUp className="h-3.5 w-3.5" /> +{sim.totalGain} pts
              </span>
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-brand">
                {sim.projected}
              </span>
              <span className="text-sm text-text-muted">from {currentScore}</span>
            </div>

            <div className={`mt-3 inline-block rounded-lg border px-2.5 py-1 text-xs font-semibold ${sim.projectedTier.bg} ${sim.projectedTier.color}`}>
              {sim.projectedTier.label}
            </div>

            {/* Visual score bar */}
            <div className="mt-4">
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-bg-alt">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-brand/30 transition-all duration-300"
                  style={{ width: `${sim.pctProjected}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-brand transition-all duration-300"
                  style={{ width: `${sim.pctCurrent}%` }}
                />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-text-muted">
                <span>300</span>
                <span>650</span>
                <span className="font-semibold text-brand">750+ Prime</span>
                <span>900</span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-xs">
              <div className="flex justify-between">
                <span className="text-text-muted">Lowering utilization ({currentUtil}% → {targetUtil}%)</span>
                <span className="font-semibold text-text">+{sim.utilGain} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">90-day on-time payment streak</span>
                <span className="font-semibold text-text">+{sim.paymentGain} pts</span>
              </div>
              {sim.disputeGain > 0 && (
                <div className="flex justify-between">
                  <span className="text-text-muted">Disputing report error</span>
                  <span className="font-semibold text-text">+{sim.disputeGain} pts</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-text-muted">Zero inquiries &amp; card age</span>
                <span className="font-semibold text-text">+{sim.otherGain} pts</span>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 pt-3 border-t border-border">
            <Link
              href="/calculators/home-loan-eligibility"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
            >
              Check Loan Eligibility <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/calculators/emi"
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-border bg-bg-alt px-3 py-2 text-xs font-semibold text-text hover:border-brand hover:text-brand"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-brand" /> EMI Calc
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
