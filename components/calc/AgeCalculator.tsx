"use client";

import { useMemo, useState } from "react";
import { Stat } from "./shared";

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/* Format a Date as a yyyy-mm-dd string for <input type="date"> (local time). */
function toInputValue(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/* Parse a yyyy-mm-dd string into a local-midnight Date (avoids UTC drift). */
function parseInputValue(v: string): Date | null {
  if (!v) return null;
  const [y, m, d] = v.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  // Reject overflow (e.g. 2023-02-30 rolling into March).
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    return null;
  }
  return date;
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export default function AgeCalculator() {
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const [dob, setDob] = useState<string>("");
  const [target, setTarget] = useState<string>(() => toInputValue(today));

  const result = useMemo(() => {
    const birth = parseInputValue(dob);
    const asOf = parseInputValue(target);

    if (!birth) {
      return { state: "empty" as const };
    }
    if (!asOf) {
      return { state: "empty" as const };
    }
    if (birth.getTime() > asOf.getTime()) {
      return {
        state: "error" as const,
        message:
          "The date of birth is after the target date. Check the two dates — a birth date can't be in the future.",
      };
    }

    // --- Exact age with correct day-borrowing ---
    let years = asOf.getFullYear() - birth.getFullYear();
    let months = asOf.getMonth() - birth.getMonth();
    let days = asOf.getDate() - birth.getDate();

    if (days < 0) {
      // Borrow days from the previous month (relative to the target date).
      months -= 1;
      const borrowMonth = asOf.getMonth(); // days in the month before asOf
      const daysInPrevMonth = new Date(
        asOf.getFullYear(),
        borrowMonth,
        0,
      ).getDate();
      days += daysInPrevMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // --- Totals ---
    const totalDays = Math.floor((asOf.getTime() - birth.getTime()) / MS_PER_DAY);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // --- Day of week born ---
    const bornWeekday = WEEKDAYS[birth.getDay()];

    // --- Next birthday (relative to the target date) ---
    let nextBday = new Date(
      asOf.getFullYear(),
      birth.getMonth(),
      birth.getDate(),
    );
    // Handle Feb 29 birthdays in non-leap years by rolling to Mar 1.
    if (nextBday.getMonth() !== birth.getMonth()) {
      nextBday = new Date(asOf.getFullYear(), birth.getMonth() + 1, 1);
    }
    const isBirthdayToday =
      nextBday.getMonth() === asOf.getMonth() &&
      nextBday.getDate() === asOf.getDate();

    if (nextBday.getTime() < asOf.getTime()) {
      nextBday = new Date(
        asOf.getFullYear() + 1,
        birth.getMonth(),
        birth.getDate(),
      );
      if (nextBday.getMonth() !== birth.getMonth()) {
        nextBday = new Date(asOf.getFullYear() + 1, birth.getMonth() + 1, 1);
      }
    }

    // Months + days until the next birthday.
    let bdMonths = nextBday.getMonth() - asOf.getMonth();
    let bdDays = nextBday.getDate() - asOf.getDate();
    let bdYears = nextBday.getFullYear() - asOf.getFullYear();
    if (bdDays < 0) {
      bdMonths -= 1;
      const daysInPrevMonth = new Date(
        nextBday.getFullYear(),
        nextBday.getMonth(),
        0,
      ).getDate();
      bdDays += daysInPrevMonth;
    }
    if (bdMonths < 0) {
      bdYears -= 1;
      bdMonths += 12;
    }
    bdMonths += bdYears * 12;

    return {
      state: "ok" as const,
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      bornWeekday,
      isBirthdayToday,
      bdMonths,
      bdDays,
    };
  }, [dob, target]);

  const nf = useMemo(() => new Intl.NumberFormat("en-US"), []);

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Your dates</h2>
        <div className="mt-6 space-y-6">
          <div>
            <label
              htmlFor="age-dob"
              className="text-sm font-medium text-ink-soft"
            >
              Date of birth
            </label>
            <input
              id="age-dob"
              type="date"
              value={dob}
              max={target || undefined}
              onChange={(e) => setDob(e.target.value)}
              className="mt-2 rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest w-full"
            />
          </div>
          <div>
            <label
              htmlFor="age-target"
              className="text-sm font-medium text-ink-soft"
            >
              Age at the date of
            </label>
            <input
              id="age-target"
              type="date"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="mt-2 rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest w-full"
            />
            <p className="mt-1.5 text-xs text-ink-faint">
              Defaults to today. Change it to find your age on any past or
              future date.
            </p>
          </div>
        </div>

        {result.state === "ok" && (
          <div className="mt-6 rounded-xl bg-paper-2 border border-line p-4 text-sm text-ink-soft leading-relaxed">
            You were born on a{" "}
            <strong className="text-forest">{result.bornWeekday}</strong>.
          </div>
        )}
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Your age
        </p>

        {result.state === "empty" && (
          <p className="mt-3 text-sm text-ink-soft leading-relaxed">
            Pick your date of birth to see your exact age broken down into
            years, months and days.
          </p>
        )}

        {result.state === "error" && (
          <p className="mt-3 rounded-xl border border-line bg-card p-4 text-sm text-ink-soft leading-relaxed">
            {result.message}
          </p>
        )}

        {result.state === "ok" && (
          <>
            <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
              {result.years} {result.years === 1 ? "year" : "years"}
            </p>
            <p className="mt-1 text-sm font-medium text-ink-soft">
              {result.months} {result.months === 1 ? "month" : "months"} and{" "}
              {result.days} {result.days === 1 ? "day" : "days"}
            </p>

            <div className="mt-6">
              <Stat
                label="Total months"
                value={nf.format(result.totalMonths)}
                accent="ink"
              />
              <Stat
                label="Total weeks"
                value={nf.format(result.totalWeeks)}
                accent="ink"
              />
              <Stat
                label="Total days"
                value={nf.format(result.totalDays)}
                accent="forest"
              />
              <Stat
                label="Total hours"
                value={nf.format(result.totalHours)}
                accent="ink"
              />
              <Stat
                label="Total minutes"
                value={nf.format(result.totalMinutes)}
                accent="brass"
              />
            </div>

            <div className="mt-5 rounded-xl bg-card border border-line p-4 text-sm text-ink-soft leading-relaxed">
              <p className="text-xs font-semibold uppercase tracking-wider text-brass">
                Next birthday
              </p>
              {result.isBirthdayToday ? (
                <p className="mt-1 font-display text-lg font-600 text-forest">
                  Today! 🎉
                </p>
              ) : (
                <p className="mt-1 text-ink">
                  In{" "}
                  <strong className="text-forest">
                    {result.bdMonths}{" "}
                    {result.bdMonths === 1 ? "month" : "months"}
                  </strong>{" "}
                  and{" "}
                  <strong className="text-forest">
                    {result.bdDays} {result.bdDays === 1 ? "day" : "days"}
                  </strong>
                  .
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
