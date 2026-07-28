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
    <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border-b border-border py-4 space-y-3">
      {onSearchChange && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full h-11 pl-10 pr-4 rounded-input border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
          />
        </div>
      )}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {chips.map((chip) => (
          <button
            key={chip.label}
            onClick={() => onChipChange(chip.label)}
            className={`whitespace-nowrap rounded-pill px-3.5 py-1.5 text-sm font-medium transition-colors ${
              activeChip === chip.label
                ? "bg-brand text-white"
                : "bg-bg-alt text-text-muted hover:text-text border border-border"
            }`}
            aria-current={activeChip === chip.label ? "true" : undefined}
          >
            {chip.label}
            {chip.count !== undefined && (
              <span className="ml-1.5 text-xs opacity-60">({chip.count})</span>
            )}
          </button>
        ))}
        <span className="text-xs text-text-muted ml-auto whitespace-nowrap">Showing {resultCount}</span>
      </div>
    </div>
  );
}
