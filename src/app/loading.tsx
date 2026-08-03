export default function Loading() {
  return (
    <div className="bg-surface" aria-busy="true" aria-live="polite">
      <div className="page-shell section-y">
        <div className="mx-auto h-3 w-24 animate-pulse rounded-full bg-gold/25" />
        <div className="mx-auto mt-6 h-10 w-48 max-w-full animate-pulse rounded-md bg-black/10" />
        <div className="mx-auto mt-4 h-4 w-full max-w-md animate-pulse rounded bg-black/5" />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border/60 bg-[var(--surface-elevated)]"
            >
              <div className="aspect-[4/3] animate-pulse bg-black/5" />
              <div className="space-y-3 p-6">
                <div className="h-3 w-24 animate-pulse rounded bg-black/5" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-black/10" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-gold/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="sr-only">جاري التحميل...</span>
    </div>
  );
}
