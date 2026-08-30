const STATUS_STYLES = {
  completed: 'bg-[var(--accent)]/10 text-[var(--accent)]',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  refunded: 'bg-[var(--badge-bg)] text-[var(--badge-text)]',
};

const STATUS_LABELS = {
  completed: 'Completed',
  pending: 'Pending',
  refunded: 'Refunded',
};

export default function SalesStatusBadge({ status }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-medium ${STATUS_STYLES[status] || STATUS_STYLES.refunded}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}