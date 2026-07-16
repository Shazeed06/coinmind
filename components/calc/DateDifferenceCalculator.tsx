"use client";

import { useMemo, useState } from "react";
import { Stat } from "./shared";

type Unit = "days" | "weeks" | "months" | "years";

/* Format a Date (in UTC) as an ISO yyyy-mm-dd string for <input type="date">. */
function toInputValue(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/* Parse a yyyy-mm-dd input string into a UTC Date, avoiding local-timezone
   off-by-one. Returns null for empty/invalid input. */
function parseInput(s: string): Date | null {
  if (!s) return null;
  const parts = s.split("-");
  if (parts.length !== 3) return null;
  const [y, m, d] = parts.map(Number);
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  // Guard against overflow (e.g. 2025-02-31 rolling into March).
  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== m - 1 ||
    date.getUTCDate() !== d
  ) {
    return null;
  }
  return date;
}

const MS_PER_DAY = 86_400_000;
const WEEKDAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/* Whole days between two UTC dates (b - a). Uses UTC so DST never shifts it. */
function daysBetween(a: Date, b: Date): number {
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}

/* Calendar Y/M/D difference with borrowing, from earlier -> later. */
function calendarDiff(start: Date, end: Date) {
  let years = end.getUTCFullYear() - start.getUTCFullYear();
  let months = end.getUTCMonth() - start.getUTCMonth();
  let days = end.getUTCDate() - start.getUTCDate();

  if (days < 0) {
    months -= 1;
    // Days in the month before `end`'s month — the month we borrow from.
    const borrowFrom = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 0));
    days += borrowFrom.getUTCDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months, days };
}

/* Count weekday vs weekend days across the span [start, end] inclusive of the
   start day and exclusive of the end day (i.e. per elapsed day). */
function countDayTypes(start: Date, end: Date) {
  const total = daysBetween(start, end);
  let weekdays = 0;
  let weekends = 0;
  for (let i = 0; i < total; i++) {
    const dow = new Date(start.getTime() + i * MS_PER_DAY).getUTCDay();
    if (dow === 0 || dow === 6) weekends++;
    else weekdays++;
  }
  return { weekdays, weekends };
}

function formatFullDate(d: Date): string {
  const dow = WEEKDAY_NAMES[d.getUTCDay()];
  const day = d.getUTCDate();
  const month = MONTH_NAMES[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  return `${dow}, ${day} ${month} ${year}`;
}

function pluralize(n: number, word: string): string {
  return `${n} ${word}${Math.abs(n) === 1 ? "" : "s"}`;
}

export default function DateDifferenceCalculator() {
  const [mode, setMode] = useState<"between" | "addsub">("between");

  // Today, normalised to a UTC midnight so it lines up with parsed inputs.
  const todayInput = useMemo(() => {
    const now = new Date();
    return toInputValue(
      new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())),
    );
  }, []);

  // Mode 1 state
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>(todayInput);

  // Mode 2 state
  const [baseDate, setBaseDate] = useState<string>(todayInput);
  const [amount, setAmount] = useState<string>("30");
  const [unit, setUnit] = useState<Unit>("days");

  const between = useMemo(() => {
    const a = parseInput(start);
    const b = parseInput(end);
    if (!a || !b) return null;

    const swapped = b.getTime() < a.getTime();
    const lo = swapped ? b : a;
    const hi = swapped ? a : b;

    const totalDays = daysBetween(lo, hi);
    const cal = calendarDiff(lo, hi);
    const { weekdays, weekends } = countDayTypes(lo, hi);

    return {
      swapped,
      totalDays,
      cal,
      weeks: Math.floor(totalDays / 7),
      weekDaysRemainder: totalDays % 7,
      totalWeeks: totalDays / 7,
      totalMonths: cal.years * 12 + cal.months,
      totalHours: totalDays * 24,
      weekdays,
      weekends,
    };
  }, [start, end]);

  const result = useMemo(() => {
    const base = parseInput(baseDate);
    const n = Number(amount);
    if (!base || !Number.isFinite(n)) return null;

    const out = new Date(base.getTime());
    if (unit === "days") out.setUTCDate(out.getUTCDate() + n);
    else if (unit === "weeks") out.setUTCDate(out.getUTCDate() + n * 7);
    else if (unit === "months") out.setUTCMonth(out.getUTCMonth() + n);
    else out.setUTCFullYear(out.getUTCFullYear() + n);

    return {
      date: out,
      dayOfWeek: WEEKDAY_NAMES[out.getUTCDay()],
      elapsedDays: daysBetween(base, out),
    };
  }, [baseDate, amount, unit]);

  const inputClass =
    "rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest w-full";
  const labelClass = "text-sm font-medium text-ink-soft";

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <div>
          <p className="text-sm font-medium text-ink-soft mb-2.5">Mode</p>
          <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
            <button
              type="button"
              onClick={() => setMode("between")}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                mode === "between"
                  ? "bg-forest text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              Difference between dates
            </button>
            <button
              type="button"
              onClick={() => setMode("addsub")}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${
                mode === "addsub"
                  ? "bg-forest text-white"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              Add / subtract from a date
            </button>
          </div>
        </div>

        {mode === "between" ? (
          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <label htmlFor="dd-start" className={labelClass}>
                Start date
              </label>
              <input
                id="dd-start"
                type="date"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dd-end" className={labelClass}>
                End date
              </label>
              <input
                id="dd-end"
                type="date"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                className={inputClass}
              />
            </div>
            {between?.swapped && (
              <p className="rounded-lg bg-forest-soft px-3 py-2 text-xs font-medium text-forest">
                Your end date is before your start date — we&apos;ve swapped them so
                the result stays positive.
              </p>
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <label htmlFor="dd-base" className={labelClass}>
                Start date
              </label>
              <input
                id="dd-base"
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="dd-amount" className={labelClass}>
                Add or subtract (use a minus sign to go back)
              </label>
              <input
                id="dd-amount"
                type="number"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={`${inputClass} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
              />
            </div>
            <div className="space-y-2">
              <p className={labelClass}>Unit</p>
              <div className="flex flex-wrap gap-2">
                {(["days", "weeks", "months", "years"] as Unit[]).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                      unit === u
                        ? "bg-forest text-white"
                        : "border border-line-strong bg-card text-ink-soft hover:border-forest"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        {mode === "between" ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">
              Time between dates
            </p>
            <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
              {between ? pluralize(between.totalDays, "day") : "—"}
            </p>
            {between && (between.cal.years > 0 || between.cal.months > 0) && (
              <p className="mt-1 text-sm text-ink-soft">
                {between.cal.years > 0 && `${pluralize(between.cal.years, "year")}, `}
                {pluralize(between.cal.months, "month")} and{" "}
                {pluralize(between.cal.days, "day")}
              </p>
            )}

            <div className="mt-6">
              <Stat
                label="Total days"
                value={between ? between.totalDays.toLocaleString() : "—"}
                accent="forest"
              />
              <Stat
                label="Full weeks"
                value={
                  between
                    ? `${between.weeks.toLocaleString()} wk${
                        between.weekDaysRemainder
                          ? ` ${between.weekDaysRemainder} d`
                          : ""
                      }`
                    : "—"
                }
                accent="ink"
              />
              <Stat
                label="Total months"
                value={between ? between.totalMonths.toLocaleString() : "—"}
                accent="ink"
              />
              <Stat
                label="Total hours"
                value={between ? between.totalHours.toLocaleString() : "—"}
                accent="brass"
              />
              <Stat
                label="Weekdays (Mon–Fri)"
                value={between ? between.weekdays.toLocaleString() : "—"}
                accent="ink"
              />
              <Stat
                label="Weekend days"
                value={between ? between.weekends.toLocaleString() : "—"}
                accent="ink"
              />
            </div>

            <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
              Counts are the number of days that have{" "}
              <strong className="text-ink">elapsed</strong> between the two dates.
              To include both the first and last day (an{" "}
              <strong className="text-ink">inclusive</strong> count), add one.
            </div>
          </>
        ) : (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-brass">
              Resulting date
            </p>
            <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
              {result ? formatFullDate(result.date) : "—"}
            </p>

            <div className="mt-6">
              <Stat
                label="Lands on"
                value={result ? result.dayOfWeek : "—"}
                accent="forest"
              />
              <Stat
                label="Days from start"
                value={result ? result.elapsedDays.toLocaleString() : "—"}
                accent="brass"
              />
            </div>

            <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
              Adding <strong className="text-ink">months</strong> or{" "}
              <strong className="text-ink">years</strong> keeps the same day
              number where possible; if that day doesn&apos;t exist (e.g. 31
              January + 1 month), the date rolls into the following month.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
