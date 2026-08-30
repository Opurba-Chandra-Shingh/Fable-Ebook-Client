import { RefreshCw } from 'lucide-react';

export default function DashboardError({ onRetry }) {
  return (
    <div className="flex flex-col items-center rounded-card border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
      <h2 className="font-serif text-xl font-medium text-[var(--text-primary)]">
        Unable to load your dashboard.
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