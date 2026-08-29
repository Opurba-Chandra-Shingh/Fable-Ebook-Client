// components/dashboard/writer/skeletons.jsx
export function StatCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-card border border-[var(--border)] bg-[var(--background-secondary)]" />
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="h-72 w-full animate-pulse rounded-card border border-[var(--border)] bg-[var(--background-secondary)]" />
  );
}

export function ListSkeleton({ rows = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-card border border-[var(--border)] bg-[var(--background-secondary)]" />
      ))}
    </div>
  );
}