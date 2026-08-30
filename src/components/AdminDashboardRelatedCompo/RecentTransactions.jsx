import SalesStatusBadge from '@/components/WriterDashboardRelatedCompo/SalesPageRelatedCompo/SalesStatusBadge';

export default function RecentTransactions({ transactions }) {
  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">Recent Transactions</h2>

      {!transactions?.length ? (
        <p className="mt-4 text-sm text-[var(--text-secondary)]">No transactions yet.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {transactions.slice(0, 6).map((t) => (
            <div key={t._id} className="flex items-center justify-between rounded-btn border border-[var(--border)] p-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--text-primary)]">{t.userEmail || t.userId}</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[var(--text-primary)]">${t.amount.toFixed(2)}</span>
                <SalesStatusBadge status={t.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
