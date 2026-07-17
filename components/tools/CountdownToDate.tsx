"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Countdown to Date — 100% client-side, no libraries.               */
/*  Pick any date + time and watch a live D / H / M / S countdown.    */
/*  SSR-safe: no Date at module scope or during the first render — the */
/*  clock is seeded inside an effect, so the server and client markup  */
/*  match and there is no hydration mismatch. The 1s interval is torn  */
/*  down on unmount.                                                   */
/* ------------------------------------------------------------------ */

const pad = (n: number) => String(n).padStart(2, "0");

/* Format a Date as the value a <input type="datetime-local"> expects. */
function toLocalInput(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate(),
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

type Preset = { label: string; build: () => Date };

/* Presets are computed lazily (inside a click handler) so `new Date()`
   never runs during render — keeping the first paint deterministic. */
const PRESETS: Preset[] = [
  {
    label: "New Year",
    build: () => {
      const now = new Date();
      return new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);
    },
  },
  {
    label: "Christmas",
    build: () => {
      const now = new Date();
      let d = new Date(now.getFullYear(), 11, 25, 0, 0, 0);
      if (d.getTime() <= now.getTime()) d = new Date(now.getFullYear() + 1, 11, 25);
      return d;
    },
  },
  {
    label: "Next weekend",
    build: () => {
      const now = new Date();
      const d = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
      );
      // Days until the coming Saturday (0 = Sun … 6 = Sat).
      const delta = (6 - d.getDay() + 7) % 7 || 7;
      d.setDate(d.getDate() + delta);
      return d;
    },
  },
  {
    label: "This time tomorrow",
    build: () => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d;
    },
  },
  {
    label: "In one week",
    build: () => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      return d;
    },
  },
];

export default function CountdownToDate() {
  const [target, setTarget] = useState<string>("");
  const [now, setNow] = useState<number | null>(null); // epoch ms, set on mount

  // Seed the clock and tick once per second.
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const targetMs = useMemo(() => {
    if (!target) return null;
    const t = new Date(target).getTime();
    return Number.isFinite(t) ? t : null;
  }, [target]);

  const applyPreset = useCallback((p: Preset) => {
    setTarget(toLocalInput(p.build()));
  }, []);

  // Derive the countdown breakdown.
  const view = useMemo(() => {
    if (now === null) return { state: "loading" as const };
    if (targetMs === null) return { state: "empty" as const };

    const diff = targetMs - now;
    if (diff <= 0) return { state: "passed" as const };

    const totalSec = Math.floor(diff / 1000);
    return {
      state: "counting" as const,
      days: Math.floor(totalSec / 86400),
      hours: Math.floor((totalSec % 86400) / 3600),
      minutes: Math.floor((totalSec % 3600) / 60),
      seconds: totalSec % 60,
    };
  }, [now, targetMs]);

  const prettyTarget = useMemo(() => {
    if (targetMs === null) return "";
    return new Date(targetMs).toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }, [targetMs]);

  return (
    <div className="space-y-6">
      {/* Picker */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <label
          htmlFor="ctd-target"
          className="text-sm font-medium text-ink-soft"
        >
          Count down to
        </label>
        <input
          id="ctd-target"
          type="datetime-local"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="mt-2 w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest sm:max-w-xs"
        />

        {/* Presets */}
        <div className="mt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Quick presets
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p)}
                className="rounded-full border border-line-strong bg-card px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Countdown display */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-8">
        {view.state === "loading" && (
          <p className="text-center text-sm text-ink-faint">
            Starting the clock&hellip;
          </p>
        )}

        {view.state === "empty" && (
          <p className="text-center text-sm text-ink-soft leading-relaxed">
            Pick a date and time above &mdash; or tap a preset &mdash; to start
            the live countdown.
          </p>
        )}

        {view.state === "passed" && (
          <div className="text-center">
            <p className="font-display text-3xl font-600 text-berry">
              This date has passed
            </p>
            {prettyTarget && (
              <p className="mt-2 text-sm text-ink-soft">{prettyTarget}</p>
            )}
            <p className="mt-3 text-sm text-ink-faint">
              Choose a future date to count down again.
            </p>
          </div>
        )}

        {view.state === "counting" && (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              <UnitCard label="Days" value={view.days} accent />
              <UnitCard label="Hours" value={view.hours} />
              <UnitCard label="Minutes" value={view.minutes} />
              <UnitCard label="Seconds" value={view.seconds} />
            </div>
            {prettyTarget && (
              <p className="mt-6 text-center text-sm text-ink-soft">
                Until <strong className="text-ink">{prettyTarget}</strong>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function UnitCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card p-4 text-center sm:p-6">
      <p
        className={`font-display text-4xl font-600 tabular-nums sm:text-6xl ${
          accent ? "text-forest" : "text-ink"
        }`}
      >
        {label === "Days" ? value : pad(value)}
      </p>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-ink-faint">
        {label}
      </p>
    </div>
  );
}
