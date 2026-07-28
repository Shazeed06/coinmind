import { FileX2 } from "lucide-react";

type EmptyStateProps = {
  message?: string;
  onClear?: () => void;
};

export function EmptyState({ message = "Nothing here yet.", onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <FileX2 className="h-12 w-12 text-text-muted/40 mb-4" />
      <p className="body text-text-muted">{message}</p>
      {onClear && (
        <button onClick={onClear} className="mt-4 text-sm text-brand hover:underline">
          Clear filters
        </button>
      )}
    </div>
  );
}
