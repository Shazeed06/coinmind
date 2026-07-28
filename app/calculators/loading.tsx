export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 animate-pulse">
      <div className="h-6 w-28 rounded-full bg-line mb-6" />
      <div className="h-10 w-96 rounded-lg bg-line mb-4" />
      <div className="h-5 w-80 rounded bg-line mb-10" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-line p-5">
            <div className="h-5 w-5/6 rounded bg-line mb-3" />
            <div className="h-4 w-full rounded bg-line mb-2" />
            <div className="h-4 w-4/6 rounded bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}
