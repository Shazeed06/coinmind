"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Random Wheel / Picker — 100% client-side.                         */
/*  The spin uses Math.random inside an event handler only, so the    */
/*  server-rendered markup is always deterministic (no hydration      */
/*  mismatch). A colourful SVG wheel animates via a CSS transform      */
/*  transition and lands on a randomly chosen segment.                */
/* ------------------------------------------------------------------ */

/* Brand palette + variations — kept vivid so adjacent slices contrast. */
const PALETTE = [
  "#2563eb", // forest (royal blue)
  "#16a34a", // brass (green)
  "#db2777", // berry (pink)
  "#d97706", // amber
  "#7c3aed", // violet
  "#0891b2", // cyan
  "#1e40af", // forest-deep
  "#65a30d", // lime
  "#0d9488", // teal
  "#e11d48", // rose
];

const DEFAULT_OPTIONS = ["Pizza", "Sushi", "Burgers", "Tacos", "Salad", "Pasta"];

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 192;
const LABEL_RADIUS = RADIUS * 0.62;
const SPIN_MS = 4200;
const MAX_LABEL = 16;

type Point = { x: number; y: number };

/** Convert an angle (degrees, clockwise from top) to an SVG point. */
function polar(cx: number, cy: number, r: number, angleDeg: number): Point {
  const a = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.sin(a), y: cy - r * Math.cos(a) };
}

/** Build a pie-slice path from `start` to `end` degrees (clockwise from top). */
function slicePath(start: number, end: number): string {
  const s = polar(CENTER, CENTER, RADIUS, start);
  const e = polar(CENTER, CENTER, RADIUS, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${CENTER} ${CENTER} L ${s.x.toFixed(2)} ${s.y.toFixed(
    2,
  )} A ${RADIUS} ${RADIUS} 0 ${large} 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)} Z`;
}

function truncate(label: string): string {
  return label.length > MAX_LABEL ? `${label.slice(0, MAX_LABEL - 1)}…` : label;
}

export default function RandomWheel() {
  const [text, setText] = useState(DEFAULT_OPTIONS.join("\n"));
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [autoRemove, setAutoRemove] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Options: derived from the textarea, trimmed and de-blanked.
  const options = useMemo(
    () =>
      text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0),
    [text],
  );
  const n = options.length;
  const seg = n > 0 ? 360 / n : 0;

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

  const finish = useCallback(
    (chosen: string) => {
      setWinner(chosen);
      setSpinning(false);
      if (autoRemove) {
        setText((prev) => {
          const lines = prev.split("\n");
          const idx = lines.findIndex((l) => l.trim() === chosen);
          if (idx >= 0) lines.splice(idx, 1);
          return lines.join("\n");
        });
      }
    },
    [autoRemove],
  );

  const spin = useCallback(() => {
    if (spinning || n < 2) return;
    setWinner(null);

    // Randomness lives here, in the click handler — never at render time.
    const idx = Math.floor(Math.random() * n);
    const centerAngle = idx * seg + seg / 2;
    const jitter = (Math.random() - 0.5) * seg * 0.6;
    // Rotation R (clockwise) that brings the slice centre to the top pointer.
    const targetMod = (((360 - centerAngle - jitter) % 360) + 360) % 360;
    const currentMod = ((rotation % 360) + 360) % 360;
    let delta = targetMod - currentMod;
    if (delta < 0) delta += 360;
    const next = rotation + 360 * 5 + delta;

    setRotation(next);

    if (reduceMotion) {
      finish(options[idx]);
      return;
    }
    setSpinning(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => finish(options[idx]), SPIN_MS);
  }, [spinning, n, seg, rotation, reduceMotion, options, finish]);

  // Pick instantly with no animation — the simple fallback picker.
  const pickInstant = useCallback(() => {
    if (n < 1) return;
    const idx = Math.floor(Math.random() * n);
    finish(options[idx]);
  }, [n, options, finish]);

  const removeWinner = useCallback(() => {
    if (!winner) return;
    setText((prev) => {
      const lines = prev.split("\n");
      const idx = lines.findIndex((l) => l.trim() === winner);
      if (idx >= 0) lines.splice(idx, 1);
      return lines.join("\n");
    });
    setWinner(null);
  }, [winner]);

  const canSpin = n >= 2 && !spinning;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
        {/* Wheel */}
        <div className="rounded-2xl border border-line bg-card p-6">
          <div className="relative mx-auto w-full max-w-[420px]">
            <svg
              viewBox={`0 0 ${SIZE} ${SIZE}`}
              className="w-full"
              role="img"
              aria-label={
                n >= 2
                  ? `Spinning wheel with ${n} options`
                  : "Spinning wheel — add at least two options"
              }
            >
              {/* Rotating group: slices + labels only. */}
              <g
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transform: `rotate(${rotation}deg)`,
                  transition:
                    spinning && !reduceMotion
                      ? `transform ${SPIN_MS}ms cubic-bezier(0.16, 0.84, 0.24, 1)`
                      : "none",
                }}
              >
                {n === 0 ? (
                  <circle
                    cx={CENTER}
                    cy={CENTER}
                    r={RADIUS}
                    fill="var(--color-paper-2)"
                  />
                ) : n === 1 ? (
                  <>
                    <circle
                      cx={CENTER}
                      cy={CENTER}
                      r={RADIUS}
                      fill={PALETTE[0]}
                    />
                    <text
                      x={CENTER}
                      y={CENTER - LABEL_RADIUS}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="#ffffff"
                      fontSize="18"
                      fontWeight={600}
                    >
                      {truncate(options[0])}
                    </text>
                  </>
                ) : (
                  options.map((opt, i) => {
                    const start = i * seg;
                    const end = start + seg;
                    const mid = start + seg / 2;
                    const flip = mid > 90 && mid < 270;
                    const ly = CENTER - LABEL_RADIUS;
                    return (
                      <g key={`${opt}-${i}`}>
                        <path
                          d={slicePath(start, end)}
                          fill={PALETTE[i % PALETTE.length]}
                          stroke="#ffffff"
                          strokeWidth={2}
                        />
                        <g transform={`rotate(${mid} ${CENTER} ${CENTER})`}>
                          <text
                            x={CENTER}
                            y={ly}
                            transform={
                              flip ? `rotate(180 ${CENTER} ${ly})` : undefined
                            }
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="#ffffff"
                            fontSize={n > 12 ? 12 : 15}
                            fontWeight={600}
                          >
                            {truncate(opt)}
                          </text>
                        </g>
                      </g>
                    );
                  })
                )}
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={RADIUS}
                  fill="none"
                  stroke="rgba(15,20,36,0.08)"
                  strokeWidth={2}
                />
              </g>

              {/* Fixed hub — click to spin. */}
              <g
                onClick={spin}
                style={{ cursor: canSpin ? "pointer" : "default" }}
              >
                <circle
                  cx={CENTER}
                  cy={CENTER}
                  r={40}
                  fill="#ffffff"
                  stroke="var(--color-line-strong)"
                  strokeWidth={2}
                />
                <text
                  x={CENTER}
                  y={CENTER}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="var(--color-forest)"
                  fontSize="14"
                  fontWeight={700}
                  style={{ letterSpacing: "0.06em" }}
                >
                  SPIN
                </text>
              </g>

              {/* Fixed pointer at the top, pointing into the wheel. */}
              <polygon
                points={`${CENTER - 16},2 ${CENTER + 16},2 ${CENTER},34`}
                fill="var(--color-ink)"
              />
            </svg>
          </div>

          {/* Winner banner */}
          <div className="mt-5 min-h-[3.5rem]" aria-live="polite">
            {winner ? (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-brass-soft bg-brass-soft/60 px-5 py-4">
                <p className="text-lg text-ink">
                  <span aria-hidden="true">🎉</span>{" "}
                  <span className="text-sm font-semibold uppercase tracking-wider text-brass">
                    Winner
                  </span>
                  <br />
                  <span className="font-display text-2xl font-600 text-ink">
                    {winner}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={removeWinner}
                  className="inline-flex items-center rounded-lg border border-line-strong bg-card px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink"
                >
                  Remove &amp; respin
                </button>
              </div>
            ) : (
              <p className="text-center text-sm text-ink-faint">
                {n < 2
                  ? "Add at least two options below to spin."
                  : spinning
                    ? "Spinning…"
                    : "Press Spin — or tap the wheel."}
              </p>
            )}
          </div>

          {/* Spin control */}
          <button
            type="button"
            onClick={spin}
            disabled={!canSpin}
            className="mt-4 w-full rounded-lg bg-forest px-4 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {spinning ? "Spinning…" : "Spin the wheel"}
          </button>
        </div>

        {/* Options + fallback */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="flex items-center justify-between gap-3">
              <label
                htmlFor="wheel-options"
                className="text-sm font-medium text-ink-soft"
              >
                Options{" "}
                <span className="text-ink-faint">(one per line)</span>
              </label>
              <span className="text-xs font-semibold text-ink-faint">
                {n} item{n === 1 ? "" : "s"}
              </span>
            </div>
            <textarea
              id="wheel-options"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setWinner(null);
              }}
              rows={9}
              spellCheck={false}
              placeholder={"Option 1\nOption 2\nOption 3"}
              className="mt-3 w-full resize-y rounded-xl border border-line-strong bg-card px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-forest"
            />
            <label className="mt-4 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={autoRemove}
                onChange={() => setAutoRemove((v) => !v)}
                className="h-4 w-4"
                style={{ accentColor: "var(--color-forest)" }}
              />
              <span className="text-sm text-ink">
                Remove the winner after each spin
              </span>
            </label>
          </div>

          {/* Simple fallback picker */}
          <div className="rounded-2xl border border-line bg-paper-2 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              No animation? Pick one instantly
            </p>
            <button
              type="button"
              onClick={pickInstant}
              disabled={n < 1}
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-line-strong bg-card px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              Pick a random option
            </button>
            {n > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {options.map((opt, i) => (
                  <li
                    key={`${opt}-${i}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1 text-xs font-medium text-ink-soft"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: PALETTE[i % PALETTE.length] }}
                      aria-hidden="true"
                    />
                    {truncate(opt)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
