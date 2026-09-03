import { FileX2 } from "lucide-react";

type EmptyStateProps = {
  message?: string;
  onClear?: () => void;
};

export function EmptyState({ message = "Nothing here yet.", onClear }: EmptyStateProps) {
  return (
    // py-24 (96px top and bottom) on a phone left an empty result state taller
    // than the viewport. It now steps 64 -> 96px with the rest of the vertical
    // rhythm. The icon was text-text-muted/40, which is under 2:1 against white
    // and effectively disappeared; at /50 of the faint token it stays quiet but
    // visible, and it is decorative so it is hidden from assistive tech.
    <div className="flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center">
      <FileX2 className="mb-4 h-12 w-12 text-ink-faint/50" aria-hidden="true" />
      <p className="body text-text-muted">{message}</p>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 rounded-input px-2 py-1 text-sm font-medium text-brand underline-offset-4 transition-colors hover:underline active:opacity-70"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
