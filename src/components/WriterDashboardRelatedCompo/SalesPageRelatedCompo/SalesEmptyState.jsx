import { ReceiptText, RefreshCw } from 'lucide-react';

export function SalesEmptyState() {
  return (
    <div className="flex flex-col items-center rounded-card border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
      <ReceiptText size={32} className="text-[var(--accent)]" />
      <h2 className="mt-5 font-serif text-xl font-medium text-[var(--text-primary)]">
        No sales yet.
      </h2>
      <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
        Once readers purchase your stories, your sales will appear here.
      </p>
    </div>
  );
}

export function SalesErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center rounded-card border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
      <h2 className="font-serif text-xl font-medium text-[var(--text-primary)]">
        Unable to load your sales.
      </h2>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 flex items-center gap-2 rounded-btn border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
      >
        <RefreshCw size={15} />
        Try Again
      </button>
    </div>
  );
}

export function SalesSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-card border border-[var(--border)] bg-[var(--background-secondary)]" />
        ))}
      </div>
      <div className="h-72 w-full animate-pulse rounded-card border border-[var(--border)] bg-[var(--background-secondary)]" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 animate-pulse rounded-card border border-[var(--border)] bg-[var(--background-secondary)]" />
        ))}
      </div>
    </div>
  );
}