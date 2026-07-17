"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Stopwatch & Timer — 100% client-side, no libraries.               */
/*  • Stopwatch: performance.now() driven, requestAnimationFrame loop  */
/*    for smooth centisecond ticking + lap splits.                     */
/*  • Countdown timer: end-timestamp based (drift-free), with a Web    */
/*    Audio beep and a visual "Time's up!" flash at zero.              */
/*  All timers are torn down on unmount to avoid leaks.                */
/* ------------------------------------------------------------------ */

type Mode = "stopwatch" | "timer";

const pad = (n: number) => String(n).padStart(2, "0");

/* Stopwatch display parts: main mm:ss (or hh:mm:ss) + centiseconds. */
function fmtStopwatch(ms: number): { main: string; cs: string } {
  const totalCs = Math.floor(ms / 10);
  const cs = totalCs % 100;
  const totalSec = Math.floor(totalCs / 100);
  const s = totalSec % 60;
  const totalMin = Math.floor(totalSec / 60);
  const m = totalMin % 60;
  const h = Math.floor(totalMin / 60);
  const main = h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  return { main, cs: pad(cs) };
}

/* Countdown display: hh:mm:ss, rounding up so the last second is shown. */
function fmtClock(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const s = totalSec % 60;
  const totalMin = Math.floor(totalSec / 60);
  const m = totalMin % 60;
  const h = Math.floor(totalMin / 60);
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

const clampInt = (v: number, max: number) =>
  Number.isFinite(v) ? Math.min(max, Math.max(0, Math.floor(v))) : 0;

export default function StopwatchTimer() {
  const [mode, setMode] = useState<Mode>("stopwatch");

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div
        role="tablist"
        aria-label="Choose a tool"
        className="inline-flex rounded-xl border border-line-strong bg-card p-1"
      >
        <TabButton
          active={mode === "stopwatch"}
          onClick={() => setMode("stopwatch")}
          controls="panel-stopwatch"
        >
          Stopwatch
        </TabButton>
        <TabButton
          active={mode === "timer"}
          onClick={() => setMode("timer")}
          controls="panel-timer"
        >
          Countdown Timer
        </TabButton>
      </div>

      {mode === "stopwatch" ? <Stopwatch /> : <CountdownTimer />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  controls,
  children,
}: {
  active: boolean;
  onClick: () => void;
  controls: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      aria-controls={controls}
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-forest text-white"
          : "text-ink-soft hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

/* ============================= Stopwatch ============================ */

function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // milliseconds
  const [laps, setLaps] = useState<number[]>([]);
  const originRef = useRef(0); // performance.now() minus already-elapsed
  const rafRef = useRef<number | null>(null);

  // The animation loop only runs while `running` is true.
  useEffect(() => {
    if (!running) return;
    let active = true;
    const tick = () => {
      if (!active) return;
      setElapsed(performance.now() - originRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  const start = useCallback(() => {
    originRef.current = performance.now() - elapsed;
    setRunning(true);
  }, [elapsed]);

  const stop = useCallback(() => {
    // Freeze on the exact current value before pausing the loop.
    setElapsed(performance.now() - originRef.current);
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setElapsed(0);
    setLaps([]);
  }, []);

  const addLap = useCallback(() => {
    setLaps((prev) => [...prev, performance.now() - originRef.current]);
  }, []);

  const { main, cs } = fmtStopwatch(elapsed);

  // Split times (per-lap deltas) for the lap table.
  const splits = laps.map((total, i) => total - (laps[i - 1] ?? 0));
  const fastest =
    splits.length > 1 ? Math.min(...splits) : Number.NEGATIVE_INFINITY;
  const slowest =
    splits.length > 1 ? Math.max(...splits) : Number.POSITIVE_INFINITY;

  return (
    <div
      id="panel-stopwatch"
      role="tabpanel"
      className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-8"
    >
      {/* Big display */}
      <div className="text-center">
        <p className="font-display text-6xl font-600 text-ink tabular-nums sm:text-7xl">
          {main}
          <span className="text-3xl text-ink-faint sm:text-4xl">.{cs}</span>
        </p>
      </div>

      {/* Controls */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {!running ? (
          <button
            type="button"
            onClick={start}
            className="rounded-lg bg-forest px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {elapsed > 0 ? "Resume" : "Start"}
          </button>
        ) : (
          <button
            type="button"
            onClick={stop}
            className="rounded-lg bg-berry px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Stop
          </button>
        )}

        <button
          type="button"
          onClick={addLap}
          disabled={!running}
          className="rounded-lg border border-line-strong bg-card px-6 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Lap
        </button>

        <button
          type="button"
          onClick={reset}
          disabled={running || (elapsed === 0 && laps.length === 0)}
          className="rounded-lg border border-line-strong bg-card px-6 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div className="mt-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Laps
          </p>
          <div className="overflow-hidden rounded-xl border border-line bg-card">
            <div className="grid grid-cols-[auto_1fr_1fr] gap-3 border-b border-line px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-faint">
              <span>#</span>
              <span className="text-right">Lap</span>
              <span className="text-right">Total</span>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {laps
                .map((total, i) => ({ total, split: splits[i], i }))
                .reverse()
                .map(({ total, split, i }) => {
                  const isFastest = split === fastest;
                  const isSlowest = split === slowest;
                  const splitParts = fmtStopwatch(split);
                  const totalParts = fmtStopwatch(total);
                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[auto_1fr_1fr] gap-3 border-b border-line px-4 py-2.5 text-sm last:border-0"
                    >
                      <span className="font-semibold text-ink-soft">
                        {i + 1}
                      </span>
                      <span
                        className={`text-right font-semibold tabular-nums ${
                          isFastest
                            ? "text-brass"
                            : isSlowest
                              ? "text-berry"
                              : "text-ink"
                        }`}
                      >
                        {splitParts.main}.{splitParts.cs}
                        {isFastest && (
                          <span className="ml-1.5 text-[10px] font-semibold uppercase text-brass">
                            best
                          </span>
                        )}
                      </span>
                      <span className="text-right tabular-nums text-ink-soft">
                        {totalParts.main}.{totalParts.cs}
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================== Countdown Timer ======================== */

function CountdownTimer() {
  const [h, setH] = useState(0);
  const [m, setM] = useState(5);
  const [s, setS] = useState(0);
  const [remaining, setRemaining] = useState<number | null>(null); // null = idle
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  const endRef = useRef(0); // performance.now() timestamp of zero
  const rafRef = useRef<number | null>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const configuredMs = (h * 3600 + m * 60 + s) * 1000;

  // A short triple beep using the Web Audio API — created lazily so it only
  // spins up after a user gesture (Start), satisfying autoplay policies.
  const playBeep = useCallback(() => {
    try {
      type WithWebkit = typeof globalThis & {
        webkitAudioContext?: typeof AudioContext;
      };
      const Ctx =
        window.AudioContext ?? (window as WithWebkit).webkitAudioContext;
      if (!Ctx) return;
      if (!audioRef.current) audioRef.current = new Ctx();
      const ctx = audioRef.current;
      if (ctx.state === "suspended") void ctx.resume();
      const t0 = ctx.currentTime;
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 880;
        const at = t0 + i * 0.35;
        gain.gain.setValueAtTime(0.0001, at);
        gain.gain.exponentialRampToValueAtTime(0.3, at + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.28);
        osc.connect(gain).connect(ctx.destination);
        osc.start(at);
        osc.stop(at + 0.3);
      }
    } catch {
      // Audio unavailable — the visual flash still fires.
    }
  }, []);

  // Countdown loop — runs only while `running` is true.
  useEffect(() => {
    if (!running) return;
    let active = true;
    const tick = () => {
      if (!active) return;
      const left = endRef.current - performance.now();
      if (left <= 0) {
        setRemaining(0);
        setRunning(false);
        setFinished(true);
        playBeep();
        return;
      }
      setRemaining(left);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [running, playBeep]);

  // Release the audio context on unmount.
  useEffect(() => {
    return () => {
      void audioRef.current?.close();
      audioRef.current = null;
    };
  }, []);

  const start = useCallback(() => {
    // Resume a paused countdown, otherwise start a fresh one.
    const startMs =
      remaining !== null && !finished ? remaining : configuredMs;
    if (startMs <= 0) return;
    endRef.current = performance.now() + startMs;
    setRemaining(startMs);
    setFinished(false);
    setRunning(true);
  }, [remaining, finished, configuredMs]);

  const pause = useCallback(() => {
    setRemaining(Math.max(0, endRef.current - performance.now()));
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setRemaining(null);
    setFinished(false);
  }, []);

  const presets: { label: string; secs: number }[] = [
    { label: "1:00", secs: 60 },
    { label: "3:00", secs: 180 },
    { label: "5:00", secs: 300 },
    { label: "10:00", secs: 600 },
  ];

  const applyPreset = useCallback((secs: number) => {
    setRunning(false);
    setFinished(false);
    setRemaining(null);
    setH(Math.floor(secs / 3600));
    setM(Math.floor((secs % 3600) / 60));
    setS(secs % 60);
  }, []);

  const display = fmtClock(remaining ?? configuredMs);
  const idle = remaining === null;

  return (
    <div
      id="panel-timer"
      role="tabpanel"
      className={`rounded-2xl border p-6 transition-colors sm:p-8 ${
        finished
          ? "border-brass bg-brass-soft animate-pulse"
          : "border-line bg-paper-2"
      }`}
    >
      {/* Big display */}
      <div className="text-center">
        <p
          className={`font-display text-6xl font-600 tabular-nums sm:text-7xl ${
            finished ? "text-brass" : "text-ink"
          }`}
        >
          {display}
        </p>
        {finished && (
          <p className="mt-3 font-display text-2xl font-600 text-brass">
            Time&rsquo;s up! 🔔
          </p>
        )}
      </div>

      {/* H / M / S inputs (editable only when idle) */}
      <div className="mx-auto mt-8 flex max-w-md items-end gap-3">
        <TimeField
          label="Hours"
          value={h}
          max={99}
          disabled={running || !idle}
          onChange={(v) => setH(clampInt(v, 99))}
        />
        <span className="pb-2.5 font-display text-2xl text-ink-faint">:</span>
        <TimeField
          label="Minutes"
          value={m}
          max={59}
          disabled={running || !idle}
          onChange={(v) => setM(clampInt(v, 59))}
        />
        <span className="pb-2.5 font-display text-2xl text-ink-faint">:</span>
        <TimeField
          label="Seconds"
          value={s}
          max={59}
          disabled={running || !idle}
          onChange={(v) => setS(clampInt(v, 59))}
        />
      </div>

      {/* Presets */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => applyPreset(p.secs)}
            className="rounded-full border border-line-strong bg-card px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {!running ? (
          <button
            type="button"
            onClick={start}
            disabled={configuredMs <= 0 && idle}
            className="rounded-lg bg-forest px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {remaining !== null && !finished ? "Resume" : "Start"}
          </button>
        ) : (
          <button
            type="button"
            onClick={pause}
            className="rounded-lg bg-berry px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Pause
          </button>
        )}

        <button
          type="button"
          onClick={reset}
          disabled={idle && !finished}
          className="rounded-lg border border-line-strong bg-card px-6 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function TimeField({
  label,
  value,
  max,
  disabled,
  onChange,
}: {
  label: string;
  value: number;
  max: number;
  disabled: boolean;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex-1">
      <label className="block text-center text-xs font-medium uppercase tracking-wider text-ink-faint">
        {label}
      </label>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-2 w-full rounded-lg border border-line-strong bg-card px-2 py-2.5 text-center font-display text-2xl font-600 text-ink outline-none focus:border-forest disabled:opacity-60"
      />
    </div>
  );
}
