"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <div className="text-6xl mb-4">!</div>
      <h1 className="font-display text-2xl text-ink mb-2">
        Something went wrong
      </h1>
      <p className="text-ink-soft mb-6">
        The calculators page encountered an error. Please try again.
      </p>
      <button
        onClick={reset}
        className="rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink/90 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
