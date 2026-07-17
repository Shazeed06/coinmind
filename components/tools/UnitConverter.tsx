"use client";

import { useMemo, useState } from "react";

type Unit = { id: string; name: string; short: string; factor: number };
type Category = {
  id: string;
  label: string;
  units: Unit[];
  from: string; // default "from" unit id
  to: string; // default "to" unit id
  note?: string;
};

/* Every non-temperature unit stores its size relative to a per-category base
   unit (factor). Conversion is then: value * fromFactor / toFactor.
   Temperature can't use a single factor (its scales have offsets), so it is
   handled with explicit formulas below. */
const CATEGORIES: Category[] = [
  {
    id: "length",
    label: "Length",
    from: "m",
    to: "ft",
    units: [
      { id: "mm", name: "Millimetre (mm)", short: "mm", factor: 0.001 },
      { id: "cm", name: "Centimetre (cm)", short: "cm", factor: 0.01 },
      { id: "m", name: "Metre (m)", short: "m", factor: 1 },
      { id: "km", name: "Kilometre (km)", short: "km", factor: 1000 },
      { id: "in", name: "Inch (in)", short: "in", factor: 0.0254 },
      { id: "ft", name: "Foot (ft)", short: "ft", factor: 0.3048 },
      { id: "yd", name: "Yard (yd)", short: "yd", factor: 0.9144 },
      { id: "mi", name: "Mile (mi)", short: "mi", factor: 1609.344 },
      { id: "nmi", name: "Nautical mile (nmi)", short: "nmi", factor: 1852 },
    ],
  },
  {
    id: "weight",
    label: "Weight / Mass",
    from: "kg",
    to: "lb",
    units: [
      { id: "mg", name: "Milligram (mg)", short: "mg", factor: 0.001 },
      { id: "g", name: "Gram (g)", short: "g", factor: 1 },
      { id: "kg", name: "Kilogram (kg)", short: "kg", factor: 1000 },
      { id: "t", name: "Tonne (t)", short: "t", factor: 1_000_000 },
      { id: "oz", name: "Ounce (oz)", short: "oz", factor: 28.349523125 },
      { id: "lb", name: "Pound (lb)", short: "lb", factor: 453.59237 },
      { id: "st", name: "Stone (st)", short: "st", factor: 6350.29318 },
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    from: "c",
    to: "f",
    note: "Temperature uses fixed formulas (°C, °F, K), not simple ratios — so 0 in one scale does not map to 0 in another.",
    units: [
      { id: "c", name: "Celsius (°C)", short: "°C", factor: 1 },
      { id: "f", name: "Fahrenheit (°F)", short: "°F", factor: 1 },
      { id: "k", name: "Kelvin (K)", short: "K", factor: 1 },
    ],
  },
  {
    id: "area",
    label: "Area",
    from: "m2",
    to: "ft2",
    units: [
      { id: "mm2", name: "Square millimetre (mm²)", short: "mm²", factor: 0.000001 },
      { id: "cm2", name: "Square centimetre (cm²)", short: "cm²", factor: 0.0001 },
      { id: "m2", name: "Square metre (m²)", short: "m²", factor: 1 },
      { id: "ha", name: "Hectare (ha)", short: "ha", factor: 10000 },
      { id: "km2", name: "Square kilometre (km²)", short: "km²", factor: 1_000_000 },
      { id: "in2", name: "Square inch (in²)", short: "in²", factor: 0.00064516 },
      { id: "ft2", name: "Square foot (ft²)", short: "ft²", factor: 0.09290304 },
      { id: "yd2", name: "Square yard (yd²)", short: "yd²", factor: 0.83612736 },
      { id: "ac", name: "Acre (ac)", short: "ac", factor: 4046.8564224 },
      { id: "mi2", name: "Square mile (mi²)", short: "mi²", factor: 2_589_988.110336 },
    ],
  },
  {
    id: "volume",
    label: "Volume",
    from: "l",
    to: "gal",
    note: "US customary units are shown: a US gallon is about 3.785 L, while a UK (imperial) gallon is 4.546 L.",
    units: [
      { id: "ml", name: "Millilitre (ml)", short: "ml", factor: 0.001 },
      { id: "l", name: "Litre (l)", short: "l", factor: 1 },
      { id: "m3", name: "Cubic metre (m³)", short: "m³", factor: 1000 },
      { id: "tsp", name: "Teaspoon (US tsp)", short: "tsp", factor: 0.00492892159375 },
      { id: "tbsp", name: "Tablespoon (US tbsp)", short: "tbsp", factor: 0.01478676478125 },
      { id: "floz", name: "Fluid ounce (US fl oz)", short: "fl oz", factor: 0.0295735295625 },
      { id: "cup", name: "Cup (US cup)", short: "cup", factor: 0.2365882365 },
      { id: "pt", name: "Pint (US pt)", short: "pt", factor: 0.473176473 },
      { id: "qt", name: "Quart (US qt)", short: "qt", factor: 0.946352946 },
      { id: "gal", name: "Gallon (US gal)", short: "gal", factor: 3.785411784 },
      { id: "galuk", name: "Gallon (UK gal)", short: "UK gal", factor: 4.54609 },
    ],
  },
  {
    id: "speed",
    label: "Speed",
    from: "kmh",
    to: "mph",
    units: [
      { id: "mps", name: "Metre / second (m/s)", short: "m/s", factor: 1 },
      { id: "kmh", name: "Kilometre / hour (km/h)", short: "km/h", factor: 0.2777777777777778 },
      { id: "mph", name: "Mile / hour (mph)", short: "mph", factor: 0.44704 },
      { id: "fps", name: "Foot / second (ft/s)", short: "ft/s", factor: 0.3048 },
      { id: "kn", name: "Knot (kn)", short: "kn", factor: 0.5144444444444445 },
    ],
  },
  {
    id: "time",
    label: "Time",
    from: "h",
    to: "min",
    note: "Month and year use averages: 1 month ≈ 30.44 days and 1 year = 365.25 days.",
    units: [
      { id: "ms", name: "Millisecond (ms)", short: "ms", factor: 0.001 },
      { id: "s", name: "Second (s)", short: "s", factor: 1 },
      { id: "min", name: "Minute (min)", short: "min", factor: 60 },
      { id: "h", name: "Hour (h)", short: "h", factor: 3600 },
      { id: "d", name: "Day (d)", short: "d", factor: 86400 },
      { id: "wk", name: "Week (wk)", short: "wk", factor: 604800 },
      { id: "mo", name: "Month (mo)", short: "mo", factor: 2_629_800 },
      { id: "yr", name: "Year (yr)", short: "yr", factor: 31_557_600 },
    ],
  },
  {
    id: "digital",
    label: "Digital Storage",
    from: "mb",
    to: "gb",
    note: "Binary (1024-based): 1 KB = 1024 bytes, 1 MB = 1024 KB, 1 GB = 1024 MB, and so on.",
    units: [
      { id: "bit", name: "Bit (bit)", short: "bit", factor: 0.125 },
      { id: "byte", name: "Byte (B)", short: "B", factor: 1 },
      { id: "kb", name: "Kilobyte (KB)", short: "KB", factor: 1024 },
      { id: "mb", name: "Megabyte (MB)", short: "MB", factor: 1048576 },
      { id: "gb", name: "Gigabyte (GB)", short: "GB", factor: 1073741824 },
      { id: "tb", name: "Terabyte (TB)", short: "TB", factor: 1099511627776 },
      { id: "pb", name: "Petabyte (PB)", short: "PB", factor: 1125899906842624 },
    ],
  },
];

/* Temperature: convert through Celsius as the pivot. */
function toCelsius(v: number, unit: string): number {
  if (unit === "f") return (v - 32) * (5 / 9);
  if (unit === "k") return v - 273.15;
  return v; // celsius
}
function fromCelsius(c: number, unit: string): number {
  if (unit === "f") return c * (9 / 5) + 32;
  if (unit === "k") return c + 273.15;
  return c; // celsius
}
function convertTemperature(v: number, from: string, to: string): number {
  return fromCelsius(toCelsius(v, from), to);
}

/* Clean, human-friendly number formatting:
   - kills floating-point noise (0.1 * 3 → 0.3)
   - groups large numbers, trims trailing zeros
   - falls back to scientific notation at the extremes
   - never returns "NaN"/"Infinity" — those become an em dash */
function formatNumber(n: number): string {
  if (!Number.isFinite(n)) return "—";
  const clean = parseFloat(n.toPrecision(12));
  if (clean === 0) return "0";
  const abs = Math.abs(clean);
  if (abs >= 1e15 || abs < 1e-9) {
    return clean
      .toExponential(4)
      .replace(/\.?0+e/, "e")
      .replace("e+", "e");
  }
  if (abs >= 1) {
    return clean.toLocaleString("en-US", { maximumFractionDigits: 6 });
  }
  // Sub-one values: keep roughly six significant figures, then trim zeros.
  const decimals = Math.min(20, Math.ceil(-Math.log10(abs)) + 5);
  return clean
    .toFixed(decimals)
    .replace(/(\.\d*?)0+$/, "$1")
    .replace(/\.$/, "");
}

const selectClass =
  "rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest";

export default function UnitConverter() {
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [from, setFrom] = useState(CATEGORIES[0].from);
  const [to, setTo] = useState(CATEGORIES[0].to);
  const [amount, setAmount] = useState("1");

  const category = useMemo(
    () => CATEGORIES.find((c) => c.id === categoryId) ?? CATEGORIES[0],
    [categoryId],
  );

  const unitMap = useMemo(() => {
    const map: Record<string, Unit> = {};
    for (const u of category.units) map[u.id] = u;
    return map;
  }, [category]);

  const selectCategory = (cat: Category) => {
    setCategoryId(cat.id);
    setFrom(cat.from);
    setTo(cat.to);
  };

  const handleAmount = (raw: string) => {
    // Allow digits, one decimal point and a single leading minus sign.
    let cleaned = raw.replace(/[^\d.-]/g, "");
    cleaned = cleaned.replace(/(?!^)-/g, ""); // only a leading minus
    const firstDot = cleaned.indexOf(".");
    if (firstDot !== -1) {
      cleaned =
        cleaned.slice(0, firstDot + 1) +
        cleaned.slice(firstDot + 1).replace(/\./g, "");
    }
    setAmount(cleaned);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  // Parse the typed amount; blank / partial entries yield NaN → em dash.
  const amountNum = useMemo(() => {
    const t = amount.trim();
    if (t === "" || t === "-" || t === "." || t === "-.") return NaN;
    const n = Number(t);
    return Number.isFinite(n) ? n : NaN;
  }, [amount]);

  const result = useMemo(() => {
    if (!Number.isFinite(amountNum)) return NaN;
    if (category.id === "temperature")
      return convertTemperature(amountNum, from, to);
    const f = unitMap[from];
    const t = unitMap[to];
    if (!f || !t) return NaN;
    return (amountNum * f.factor) / t.factor;
  }, [amountNum, category, from, to, unitMap]);

  // "1 X = Y Z" reference — independent of the typed amount.
  const oneConversion = useMemo(() => {
    if (category.id === "temperature") return convertTemperature(1, from, to);
    const f = unitMap[from];
    const t = unitMap[to];
    if (!f || !t) return NaN;
    return f.factor / t.factor;
  }, [category, from, to, unitMap]);

  const fromShort = unitMap[from]?.short ?? "";
  const toShort = unitMap[to]?.short ?? "";
  const hasResult = Number.isFinite(result);
  const resultStr = formatNumber(result);
  const oneStr = formatNumber(oneConversion);
  const amountStr = formatNumber(amountNum);

  return (
    <div className="rounded-2xl border border-line bg-card p-6 sm:p-7">
      {/* Category selector */}
      <p className="text-sm font-medium text-ink-soft mb-2.5">Category</p>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            aria-pressed={cat.id === categoryId}
            onClick={() => selectCategory(cat)}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
              cat.id === categoryId
                ? "bg-forest text-white"
                : "border border-line-strong bg-card text-ink-soft hover:border-forest"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Amount + From / swap / To */}
      <div className="mt-6 grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div>
          <label
            htmlFor="uc-amount"
            className="text-sm font-medium text-ink-soft"
          >
            Amount
          </label>
          <div className="mt-1.5 flex gap-2">
            <input
              id="uc-amount"
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={(e) => handleAmount(e.target.value)}
              placeholder="0"
              aria-label="Amount to convert"
              className="flex-1 min-w-0 rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-forest"
            />
            <select
              aria-label="Convert from unit"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={selectClass}
            >
              {category.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={swap}
          aria-label="Swap from and to units"
          title="Swap units"
          className="mb-0.5 grid h-11 w-11 place-items-center rounded-lg border border-line-strong bg-paper-2 text-ink hover:border-forest hover:text-forest transition-colors mx-auto"
        >
          ⇄
        </button>

        <div>
          <label className="text-sm font-medium text-ink-soft">Converted to</label>
          <div className="mt-1.5 flex gap-2">
            <div className="flex-1 min-w-0 rounded-lg bg-paper-2 px-3 py-2.5 text-sm font-semibold text-forest truncate">
              {resultStr}
            </div>
            <select
              aria-label="Convert to unit"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={selectClass}
            >
              {category.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Big result */}
      <div className="mt-6 rounded-xl bg-paper-2 p-5" aria-live="polite">
        <p className="text-xs font-semibold uppercase tracking-wider text-brass">
          Result
        </p>
        {hasResult ? (
          <>
            <p className="mt-1 font-display text-4xl font-600 text-forest break-words">
              {resultStr}
              <span className="ml-2 text-2xl font-600 text-ink-soft">
                {toShort}
              </span>
            </p>
            <p className="mt-3 text-sm text-ink-soft">
              <strong className="text-ink">
                {amountStr} {fromShort}
              </strong>{" "}
              = {resultStr} {toShort}
            </p>
          </>
        ) : (
          <>
            <p className="mt-1 font-display text-4xl font-600 text-ink-faint">
              —
            </p>
            <p className="mt-3 text-sm text-ink-faint">
              Enter a number to convert.
            </p>
          </>
        )}
        <p className="mt-1 text-sm text-ink-soft">
          1 {fromShort} ={" "}
          <strong className="text-ink">
            {oneStr} {toShort}
          </strong>
        </p>
        {category.note && (
          <p className="mt-3 rounded-lg border border-line bg-card px-3 py-2 text-xs text-ink-faint leading-relaxed">
            {category.note}
          </p>
        )}
      </div>
    </div>
  );
}
