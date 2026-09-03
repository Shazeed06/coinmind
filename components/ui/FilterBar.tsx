"use client";

import { Search } from "lucide-react";

type Chip = { label: string; count?: number };

type FilterBarProps = {
  chips: Chip[];
  activeChip: string;
  onChipChange: (label: string) => void;
  searchValue?: string;
  onSearchChange?: (v: string) => void;
  resultCount: number;
};

export function FilterBar({ chips, activeChip, onChipChange, searchValue, onSearchChange, resultCount }: FilterBarProps) {
  return (
    <div className="sticky top-16 sm:top-20 z-40 bg-bg/85 backdrop-blur-md border-b border-line py-4 space-y-3">
      {onSearchChange && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" aria-hidden="true" />
          {/* `focus:outline-none` used to cancel the site focus ring and replace
              it with a 2px brand/20 glow, so this one input had a focus state
              nothing else on the site shared, and at 20% opacity it was barely
              visible. It now takes the same ring as every other control. */}
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full h-11 pl-10 pr-4 rounded-input border border-line bg-bg text-sm text-text placeholder:text-ink-faint transition-colors hover:border-line-strong focus-visible:border-brand"
          />
        </div>
      )}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {chips.map((chip) => (
          // The active chip had no border while the inactive ones did, so every
          // chip grew 2px wider the moment it was deselected and the whole row
          // shifted sideways on each click. All states now carry a 1px border
          // and only its colour changes.
          <button
            key={chip.label}
            type="button"
            onClick={() => onChipChange(chip.label)}
            className={`shrink-0 whitespace-nowrap rounded-pill border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              activeChip === chip.label
                ? "border-brand bg-brand text-white"
                : "border-line bg-bg-alt text-text-muted hover:border-line-strong hover:text-text"
            }`}
            aria-current={activeChip === chip.label ? "true" : undefined}
          >
            {chip.label}
            {chip.count !== undefined && (
              <span className="ml-1.5 text-xs opacity-70">({chip.count})</span>
            )}
          </button>
        ))}
        <span className="ml-auto shrink-0 whitespace-nowrap text-xs text-ink-faint">Showing {resultCount}</span>
      </div>
    </div>
  );
}
