// components/dashboard/writer/ebooks/ebooks-skeleton.jsx
export default function EbooksSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-16 animate-pulse rounded-card border border-[var(--border)] bg-[var(--background-secondary)]" />
      ))}
    </div>
  );
}