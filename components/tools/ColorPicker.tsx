"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  Color Picker — HEX / RGB / HSL, all in sync, 100% client-side.    */
/*  Pick from the native swatch or type into any field; the others    */
/*  update instantly. Nothing is uploaded.                            */
/* ------------------------------------------------------------------ */

type RGB = [number, number, number];
type HSL = [number, number, number];

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/* ---- conversions -------------------------------------------------- */

function parseHex(input: string): RGB | null {
  let h = input.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(h)) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex([r, g, b]: RGB): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => clamp(Math.round(v), 0, 255).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function parseRgb(input: string): RGB | null {
  const nums = input.match(/-?\d+(\.\d+)?/g);
  if (!nums || nums.length < 3) return null;
  const [r, g, b] = nums.slice(0, 3).map(Number);
  if ([r, g, b].some((v) => !Number.isFinite(v) || v < 0 || v > 255))
    return null;
  return [Math.round(r), Math.round(g), Math.round(b)];
}

function rgbToStr([r, g, b]: RGB): string {
  return `${r}, ${g}, ${b}`;
}

function rgbToHsl([r, g, b]: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb([h, s, l]: HSL): RGB {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const hp = (((h % 360) + 360) % 360) / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (hp >= 0 && hp < 1) [r1, g1, b1] = [c, x, 0];
  else if (hp < 2) [r1, g1, b1] = [x, c, 0];
  else if (hp < 3) [r1, g1, b1] = [0, c, x];
  else if (hp < 4) [r1, g1, b1] = [0, x, c];
  else if (hp < 5) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];
  const m = ln - c / 2;
  return [
    Math.round((r1 + m) * 255),
    Math.round((g1 + m) * 255),
    Math.round((b1 + m) * 255),
  ];
}

function parseHsl(input: string): HSL | null {
  const nums = input.match(/-?\d+(\.\d+)?/g);
  if (!nums || nums.length < 3) return null;
  const [h, s, l] = nums.slice(0, 3).map(Number);
  if ([h, s, l].some((v) => !Number.isFinite(v))) return null;
  return [Math.round(h) % 360, clamp(Math.round(s), 0, 100), clamp(Math.round(l), 0, 100)];
}

function hslToStr([h, s, l]: HSL): string {
  return `${h}, ${s}%, ${l}%`;
}

/** Pick black or white text for readable contrast on a background colour. */
function readableText([r, g, b]: RGB): string {
  // Relative luminance (sRGB) — light backgrounds get dark text.
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? "#1a1a1a" : "#ffffff";
}

/** Mix a colour toward white (amount > 0 = tint) or black (amount < 0 = shade). */
function mix([r, g, b]: RGB, amount: number): RGB {
  const target = amount > 0 ? 255 : 0;
  const f = Math.abs(amount);
  return [
    Math.round(r + (target - r) * f),
    Math.round(g + (target - g) * f),
    Math.round(b + (target - b) * f),
  ];
}

const TINT_STEPS = [0.75, 0.5, 0.25];
const SHADE_STEPS = [-0.25, -0.5, -0.75];

const fieldClass =
  "w-full min-w-0 rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink outline-none transition-colors focus:border-forest";

function CopyButton({
  value,
  onCopy,
  copied,
}: {
  value: string;
  onCopy: (v: string) => void;
  copied: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onCopy(value)}
      className="shrink-0 rounded-lg border border-line-strong bg-card px-3 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:border-forest hover:text-forest"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function ColorPicker() {
  const [rgb, setRgb] = useState<RGB>([37, 99, 235]); // pleasant default blue
  const [hexField, setHexField] = useState(() => rgbToHex([37, 99, 235]));
  const [rgbField, setRgbField] = useState(() => rgbToStr([37, 99, 235]));
  const [hslField, setHslField] = useState(() => hslToStr(rgbToHsl([37, 99, 235])));
  const [copied, setCopied] = useState<string | null>(null);

  /** Update the canonical colour and resync every field except the source. */
  const applyRgb = (next: RGB, source?: "hex" | "rgb" | "hsl") => {
    setRgb(next);
    if (source !== "hex") setHexField(rgbToHex(next));
    if (source !== "rgb") setRgbField(rgbToStr(next));
    if (source !== "hsl") setHslField(hslToStr(rgbToHsl(next)));
  };

  const onHex = (v: string) => {
    setHexField(v);
    const parsed = parseHex(v);
    if (parsed) applyRgb(parsed, "hex");
  };
  const onRgb = (v: string) => {
    setRgbField(v);
    const parsed = parseRgb(v);
    if (parsed) applyRgb(parsed, "rgb");
  };
  const onHsl = (v: string) => {
    setHslField(v);
    const parsed = parseHsl(v);
    if (parsed) applyRgb(hslToRgb(parsed), "hsl");
  };

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied((c) => (c === label ? null : c)), 1500);
    } catch {
      setCopied(null);
    }
  };

  const hex = rgbToHex(rgb);
  const rgbCss = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  const hsl = rgbToHsl(rgb);
  const hslCss = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  const textColor = readableText(rgb);

  const rows: { label: string; field: string; onChange: (v: string) => void; copyValue: string }[] = [
    { label: "HEX", field: hexField, onChange: onHex, copyValue: hex },
    { label: "RGB", field: rgbField, onChange: onRgb, copyValue: rgbCss },
    { label: "HSL", field: hslField, onChange: onHsl, copyValue: hslCss },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Preview + native picker */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div
          className="flex min-h-[220px] items-end justify-between rounded-xl p-5"
          style={{ backgroundColor: hex }}
        >
          <span
            className="font-display text-2xl font-600 tabular-nums"
            style={{ color: textColor }}
          >
            {hex}
          </span>
          <span
            className="text-sm font-semibold"
            style={{ color: textColor }}
          >
            {rgbCss}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <input
            type="color"
            value={hex}
            onChange={(e) => {
              const parsed = parseHex(e.target.value);
              if (parsed) applyRgb(parsed);
            }}
            aria-label="Pick a colour"
            className="h-12 w-16 cursor-pointer rounded-lg border border-line-strong bg-card p-1"
          />
          <p className="text-sm text-ink-soft">
            Click the swatch to open your device&apos;s colour picker, or type an
            exact value on the right.
          </p>
        </div>
      </div>

      {/* Editable fields */}
      <div className="rounded-2xl border border-line bg-card p-6">
        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.label}>
              <label
                htmlFor={`color-${row.label}`}
                className="text-xs font-semibold uppercase tracking-wider text-ink-faint"
              >
                {row.label}
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  id={`color-${row.label}`}
                  type="text"
                  value={row.field}
                  onChange={(e) => row.onChange(e.target.value)}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoCorrect="off"
                  className={fieldClass}
                />
                <CopyButton
                  value={row.copyValue}
                  onCopy={(v) => copy(row.label, v)}
                  copied={copied === row.label}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tints & shades */}
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
            Tints &amp; shades
          </p>
          <p className="mt-1 text-sm text-ink-faint">
            Lighter and darker variations &mdash; click any swatch to select it.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[...TINT_STEPS, 0, ...SHADE_STEPS].map((amount, i) => {
              const variant = amount === 0 ? rgb : mix(rgb, amount);
              const vHex = rgbToHex(variant);
              const isBase = amount === 0;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => applyRgb(variant)}
                  title={vHex}
                  aria-label={`Use ${vHex}`}
                  className={`h-11 flex-1 min-w-[2.5rem] rounded-lg border transition-transform hover:scale-105 ${
                    isBase ? "border-forest ring-2 ring-forest/40" : "border-line"
                  }`}
                  style={{ backgroundColor: vHex }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
