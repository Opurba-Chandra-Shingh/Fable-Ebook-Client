// components/ebook-skeleton.jsx
export default function EbookSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-card border border-[var(--border)]">
          <div className="aspect-[3/4] w-full animate-pulse bg-[var(--background-secondary)]" />
          <div className="space-y-2 p-4">
            <div className="h-4 w-16 animate-pulse rounded-full bg-[var(--background-secondary)]" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--background-secondary)]" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--background-secondary)]" />
          </div>
        </div>
      ))}
    </div>
  );
}