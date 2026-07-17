"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Coin Flip & Dice — 100% client-side.                              */
/*  All randomness (Math.random) runs inside event handlers / timers, */
/*  never during render, so server and client markup match on load.   */
/* ------------------------------------------------------------------ */

type Tab = "coin" | "dice";
type Face = "heads" | "tails";

const SIDES = [4, 6, 8, 10, 12, 20] as const;
type Sides = (typeof SIDES)[number];

export default function CoinDice() {
  const [tab, setTab] = useState<Tab>("coin");

  return (
    <div className="space-y-6">
      {/* Privacy note */}
      <div className="flex items-start gap-3 rounded-2xl border border-brass-soft bg-brass-soft/50 p-4">
        <IconShield className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
        <p className="text-sm text-ink-soft">
          <strong className="text-ink">Rolled in your browser.</strong> Every
          flip and roll happens on your device &mdash; nothing is uploaded,
          logged or sent anywhere, and it works offline.
        </p>
      </div>

      {/* Tabs */}
      <div
        className="inline-flex rounded-lg border border-line-strong bg-card p-0.5"
        role="tablist"
        aria-label="Choose a tool"
      >
        {(["coin", "dice"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition-colors ${
              tab === t
                ? "bg-forest text-white"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {t === "coin" ? "Coin flip" : "Dice roller"}
          </button>
        ))}
      </div>

      {tab === "coin" ? <CoinFlip /> : <DiceRoller />}
    </div>
  );
}

/* ------------------------------ coin ------------------------------- */

function CoinFlip() {
  const [rotation, setRotation] = useState(0); // rotateY degrees
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<Face | null>(null);
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const flip = useCallback(() => {
    if (flipping) return;
    const face: Face = Math.random() < 0.5 ? "heads" : "tails";
    // Land with the chosen face forward: heads at a multiple of 360, tails at
    // 180 offset. Always spin several extra turns for the animation.
    const faceMod = face === "heads" ? 0 : 180;
    const currentMod = ((rotation % 360) + 360) % 360;
    let delta = faceMod - currentMod;
    if (delta < 0) delta += 360;
    const next = rotation + 360 * 4 + delta;
    setRotation(next);

    const commit = () => {
      setResult(face);
      if (face === "heads") setHeads((h) => h + 1);
      else setTails((t) => t + 1);
      setFlipping(false);
    };

    if (reduceMotion) {
      commit();
      return;
    }
    setFlipping(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(commit, 1050);
  }, [flipping, rotation, reduceMotion]);

  const reset = useCallback(() => {
    setHeads(0);
    setTails(0);
    setResult(null);
  }, []);

  const total = heads + tails;
  const pct = (v: number) => (total > 0 ? Math.round((v / total) * 100) : 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
      {/* Coin */}
      <div className="rounded-2xl border border-line bg-card p-8">
        <div
          className="mx-auto"
          style={{ perspective: "900px", width: 160, height: 160 }}
        >
          <div
            style={{
              position: "relative",
              width: 160,
              height: 160,
              transformStyle: "preserve-3d",
              transform: `rotateY(${rotation}deg)`,
              transition:
                flipping && !reduceMotion
                  ? "transform 1s cubic-bezier(0.33, 0.9, 0.28, 1)"
                  : "none",
            }}
          >
            <CoinFace label="Heads" back={false} />
            <CoinFace label="Tails" back />
          </div>
        </div>

        <div className="mt-6 min-h-[2rem] text-center" aria-live="polite">
          {result ? (
            <p className="font-display text-2xl font-600 text-ink">
              {result === "heads" ? "Heads" : "Tails"}
            </p>
          ) : (
            <p className="text-sm text-ink-faint">Flip the coin to start.</p>
          )}
        </div>

        <button
          type="button"
          onClick={flip}
          disabled={flipping}
          className="mt-4 w-full rounded-lg bg-forest px-4 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {flipping ? "Flipping…" : "Flip coin"}
        </button>
      </div>

      {/* Running tally */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Running total
          </p>
          <button
            type="button"
            onClick={reset}
            disabled={total === 0}
            className="text-xs font-semibold text-ink-faint transition-colors hover:text-forest disabled:opacity-40"
          >
            Reset
          </button>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          {total} flip{total === 1 ? "" : "s"} so far
        </p>
        <div className="mt-4 space-y-4">
          <TallyBar label="Heads" value={heads} pct={pct(heads)} accent="#2563eb" />
          <TallyBar label="Tails" value={tails} pct={pct(tails)} accent="#16a34a" />
        </div>
      </div>
    </div>
  );
}

function CoinFace({ label, back }: { label: string; back: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: back ? "rotateY(180deg)" : "none",
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: back
          ? "linear-gradient(145deg, #16a34a, #0d8a3f)"
          : "linear-gradient(145deg, #3b82f6, #1e40af)",
        border: "6px solid rgba(255,255,255,0.35)",
        boxShadow: "0 10px 24px -12px rgba(15,20,36,0.55)",
        color: "#ffffff",
      }}
    >
      <span className="font-display text-xl font-600" style={{ letterSpacing: "0.02em" }}>
        {label}
      </span>
    </div>
  );
}

function TallyBar({
  label,
  value,
  pct,
  accent,
}: {
  label: string;
  value: number;
  pct: number;
  accent: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-ink-soft">
          {value} <span className="text-ink-faint">({pct}%)</span>
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line-strong">
        <div
          className="h-full rounded-full transition-[width] duration-300"
          style={{ width: `${pct}%`, background: accent }}
        />
      </div>
    </div>
  );
}

/* ------------------------------ dice ------------------------------- */

function DiceRoller() {
  const [count, setCount] = useState(2);
  const [sides, setSides] = useState<Sides>(6);
  const [values, setValues] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(
    () => () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    },
    [],
  );

  const rollOnce = useCallback(
    (c: number, s: number) =>
      Array.from({ length: c }, () => 1 + Math.floor(Math.random() * s)),
    [],
  );

  const roll = useCallback(() => {
    if (rolling) return;
    if (reduceMotion) {
      setValues(rollOnce(count, sides));
      return;
    }
    setRolling(true);
    let ticks = 0;
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setValues(rollOnce(count, sides));
      ticks += 1;
      if (ticks >= 11) {
        if (intervalRef.current) window.clearInterval(intervalRef.current);
        setValues(rollOnce(count, sides));
        setRolling(false);
      }
    }, 55);
  }, [rolling, reduceMotion, count, sides, rollOnce]);

  const total = values.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Number of dice */}
          <div>
            <p className="mb-2.5 text-sm font-medium text-ink-soft">
              Number of dice
            </p>
            <div className="inline-flex flex-wrap gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCount(c)}
                  className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${
                    count === c
                      ? "bg-forest text-white"
                      : "border border-line-strong bg-card text-ink-soft hover:border-forest hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Sides */}
          <div>
            <p className="mb-2.5 text-sm font-medium text-ink-soft">
              Sides per die
            </p>
            <div className="inline-flex flex-wrap gap-1.5">
              {SIDES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSides(s)}
                  className={`h-9 rounded-lg px-3 text-sm font-semibold transition-colors ${
                    sides === s
                      ? "bg-forest text-white"
                      : "border border-line-strong bg-card text-ink-soft hover:border-forest hover:text-ink"
                  }`}
                >
                  d{s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={roll}
          disabled={rolling}
          className="mt-6 w-full rounded-lg bg-forest px-4 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {rolling
            ? "Rolling…"
            : `Roll ${count} × d${sides}`}
        </button>
      </div>

      {/* Result */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6">
        {values.length === 0 ? (
          <p className="py-6 text-center text-sm text-ink-faint">
            Choose your dice and press Roll.
          </p>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-3">
              {values.map((v, i) => (
                <Die key={i} value={v} sides={sides} rolling={rolling} />
              ))}
            </div>
            <div className="mt-6 text-center" aria-live="polite">
              <p className="text-xs font-semibold uppercase tracking-wider text-brass">
                Total
              </p>
              <p className="mt-1 font-display text-4xl font-600 text-forest">
                {total}
              </p>
              {count > 1 && (
                <p className="mt-1 text-sm text-ink-soft">
                  {values.join(" + ")} = {total}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* A single die: pip layout for d6, a numbered tile for every other type. */
function Die({
  value,
  sides,
  rolling,
}: {
  value: number;
  sides: Sides;
  rolling: boolean;
}) {
  const shell = `grid h-16 w-16 place-items-center rounded-2xl bg-card shadow-[0_6px_16px_-10px_rgba(15,20,36,0.5)] ${
    rolling ? "opacity-80" : ""
  }`;

  if (sides === 6) {
    return (
      <div
        className={`${shell} border border-line-strong`}
        role="img"
        aria-label={`Die showing ${value}`}
      >
        <PipFace value={value} />
      </div>
    );
  }
  return (
    <div
      className={`${shell} border-2 border-forest`}
      role="img"
      aria-label={`d${sides} showing ${value}`}
    >
      <div className="text-center leading-none">
        <span className="font-display text-2xl font-600 text-ink">{value}</span>
        <span className="mt-0.5 block text-[10px] font-semibold text-ink-faint">
          d{sides}
        </span>
      </div>
    </div>
  );
}

/* Classic pip arrangement for a six-sided die. */
function PipFace({ value }: { value: number }) {
  // 3x3 grid slots; true = filled pip.
  const layouts: Record<number, boolean[]> = {
    1: [false, false, false, false, true, false, false, false, false],
    2: [true, false, false, false, false, false, false, false, true],
    3: [true, false, false, false, true, false, false, false, true],
    4: [true, false, true, false, false, false, true, false, true],
    5: [true, false, true, false, true, false, true, false, true],
    6: [true, false, true, true, false, true, true, false, true],
  };
  const slots = layouts[value] ?? layouts[1];
  return (
    <div className="grid h-11 w-11 grid-cols-3 grid-rows-3 gap-0.5">
      {slots.map((filled, i) => (
        <span
          key={i}
          className="grid place-items-center"
          aria-hidden="true"
        >
          {filled && <span className="h-2.5 w-2.5 rounded-full bg-forest" />}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------ icon ------------------------------- */

function IconShield({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
