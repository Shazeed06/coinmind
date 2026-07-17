"use client";

import { useMemo, useState } from "react";
import { Field, Stat } from "./shared";

type Method = "lmp" | "conception";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/* Parse a yyyy-mm-dd string into a UTC-midnight timestamp (avoids DST / off-by-one). */
function parseInputUTC(v: string): number | null {
  if (!v) return null;
  const [y, m, d] = v.split("-").map(Number);
  if (!y || !m || !d) return null;
  const t = Date.UTC(y, m - 1, d);
  const dt = new Date(t);
  // Reject overflow (e.g. 2023-02-30 rolling into March).
  if (
    dt.getUTCFullYear() !== y ||
    dt.getUTCMonth() !== m - 1 ||
    dt.getUTCDate() !== d
  ) {
    return null;
  }
  return t;
}

/* Today's calendar date as a UTC-midnight timestamp. */
function todayUTC(): number {
  const n = new Date();
  return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
}

function toInputValueUTC(t: number): string {
  const d = new Date(t);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(t: number): string {
  return dateFmt.format(new Date(t));
}

export default function PregnancyDueDateCalculator() {
  const [method, setMethod] = useState<Method>("lmp");
  const [date, setDate] = useState<string>("");
  const [cycle, setCycle] = useState(28);

  const todayStr = useMemo(() => toInputValueUTC(todayUTC()), []);

  const result = useMemo(() => {
    const inputT = parseInputUTC(date);
    if (inputT === null) return { state: "empty" as const };

    const today = todayUTC();
    if (inputT > today) {
      return {
        state: "error" as const,
        message:
          method === "lmp"
            ? "Your last period can't be in the future. Please pick a past date."
            : "The conception date can't be in the future. Please pick a past date.",
      };
    }

    const cycleAdj = Number.isFinite(cycle) ? cycle - 28 : 0;

    // Derive LMP, conception and due date from whichever date was entered.
    // Naegele's rule: due date = LMP + 280 days, shifted by cycle length.
    let lmpT: number;
    let conceptionT: number;
    let dueT: number;

    if (method === "lmp") {
      lmpT = inputT;
      conceptionT = inputT + (14 + cycleAdj) * MS_PER_DAY;
      dueT = inputT + (280 + cycleAdj) * MS_PER_DAY;
    } else {
      conceptionT = inputT;
      lmpT = inputT - 14 * MS_PER_DAY;
      dueT = inputT + 266 * MS_PER_DAY;
    }

    const gestationDays = Math.floor((today - lmpT) / MS_PER_DAY);

    // Guard clearly-implausible inputs (a human pregnancy doesn't run this long).
    if (gestationDays > 315) {
      return {
        state: "error" as const,
        message:
          "That date is too far in the past for a current pregnancy — please double-check it.",
      };
    }

    const gestWeeks = Math.max(0, Math.floor(gestationDays / 7));
    const gestRemDays = Math.max(0, gestationDays % 7);
    const daysToGo = Math.floor((dueT - today) / MS_PER_DAY);

    let trimester: string;
    if (gestWeeks < 14) trimester = "First trimester";
    else if (gestWeeks < 28) trimester = "Second trimester";
    else trimester = "Third trimester";

    const weekLabel =
      gestationDays <= 0
        ? "Just starting"
        : `${gestWeeks} ${gestWeeks === 1 ? "week" : "weeks"} ${gestRemDays} ${gestRemDays === 1 ? "day" : "days"}`;

    const toGoLabel =
      daysToGo > 0
        ? `${daysToGo} ${daysToGo === 1 ? "day" : "days"}`
        : daysToGo === 0
          ? "Due today"
          : "Past due date";

    return {
      state: "ok" as const,
      dueT,
      conceptionT,
      weekLabel,
      trimester,
      toGoLabel,
      overdue: daysToGo < 0,
    };
  }, [method, date, cycle]);

  return (
    <div className="grid lg:grid-cols-[1fr_0.85fr] gap-6">
      {/* Inputs */}
      <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
        <h2 className="font-display text-xl font-600 text-ink">Your dates</h2>

        <div className="mt-5">
          <p className="text-sm font-medium text-ink-soft mb-2.5">
            Calculate from
          </p>
          <div className="inline-flex rounded-lg border border-line-strong bg-card p-0.5">
            <button
              type="button"
              aria-pressed={method === "lmp"}
              onClick={() => setMethod("lmp")}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${method === "lmp" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"}`}
            >
              Last period date
            </button>
            <button
              type="button"
              aria-pressed={method === "conception"}
              onClick={() => setMethod("conception")}
              className={`rounded-md px-4 py-1.5 text-xs font-semibold transition-colors ${method === "conception" ? "bg-forest text-white" : "text-ink-soft hover:text-ink"}`}
            >
              Conception date
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-7">
          <div>
            <label
              htmlFor="preg-date"
              className="text-sm font-medium text-ink-soft"
            >
              {method === "lmp"
                ? "First day of your last period"
                : "Date of conception"}
            </label>
            <input
              id="preg-date"
              type="date"
              value={date}
              max={todayStr}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest"
            />
            <p className="mt-1.5 text-xs text-ink-faint">
              {method === "lmp"
                ? "Use the first day your last period began."
                : "If you know your ovulation or conception date, use that."}
            </p>
          </div>

          {method === "lmp" && (
            <Field
              label="Average cycle length"
              value={cycle}
              onChange={setCycle}
              min={20}
              max={45}
              step={1}
              suffix="days"
              hint="The standard is 28 days. A longer or shorter cycle shifts your due date."
            />
          )}
        </div>
      </div>

      {/* Results */}
      <div className="rounded-2xl border border-line bg-paper-2 p-6 sm:p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Estimated due date
        </p>

        {result.state === "empty" && (
          <p className="mt-3 text-sm text-ink-soft leading-relaxed">
            Pick a date to estimate your due date, how many weeks along you are,
            and your current trimester.
          </p>
        )}

        {result.state === "error" && (
          <p className="mt-3 rounded-xl border border-line bg-card p-4 text-sm text-ink-soft leading-relaxed">
            {result.message}
          </p>
        )}

        {result.state === "ok" && (
          <>
            <p className="mt-1 font-display text-3xl sm:text-4xl font-600 text-forest break-words">
              {formatDate(result.dueT)}
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              {result.overdue
                ? "This due date has already passed."
                : "About 40 weeks from your last period."}
            </p>

            <div className="mt-6">
              <Stat
                label="Estimated conception"
                value={formatDate(result.conceptionT)}
                accent="ink"
              />
              <Stat label="How far along" value={result.weekLabel} accent="forest" />
              <Stat label="Trimester" value={result.trimester} accent="brass" />
              <Stat label="Time to go" value={result.toGoLabel} accent="ink" />
            </div>

            <p className="mt-5 text-xs text-ink-faint leading-relaxed">
              This is only an estimate. Every pregnancy is different, and only
              about 1 in 20 babies arrive on their exact due date. Your doctor or
              midwife may adjust it after an ultrasound — always follow their
              guidance.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
