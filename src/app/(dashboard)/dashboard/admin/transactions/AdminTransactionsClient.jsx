'use client';

import { useMemo, useState } from 'react';
import SalesStatusBadge from '@/components/WriterDashboardRelatedCompo/SalesPageRelatedCompo/SalesStatusBadge';
import TransactionId from '@/components/WriterDashboardRelatedCompo/SalesPageRelatedCompo/TransactionId';

const fieldClass =
  'rounded-input border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40';

export default function AdminTransactionsClient({ transactions }) {
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchesType = !type || t.type === type;
      const matchesStatus = !status || t.status === status;
      return matchesType && matchesStatus;
    });
  }, [transactions, type, status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <select value={type} onChange={(e) => setType(e.target.value)} className={fieldClass}>
          <option value="">All Types</option>
          <option value="purchase">Purchase</option>
          <option value="publishing_fee">Publishing Fee</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className={fieldClass}>
          <option value="">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      <div className="hidden overflow-x-auto rounded-card border border-[var(--border)] bg-[var(--surface)] md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--text-secondary)]">
              <th className="px-5 py-3 font-medium">Transaction ID</th>
              <th className="px-3 py-3 font-medium">Type</th>
              <th className="px-3 py-3 font-medium">User Email</th>
              <th className="px-3 py-3 font-medium">Ebook</th>
              <th className="px-3 py-3 font-medium">Amount</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t._id} className="border-b border-[var(--border)] last:border-0">
                <td className="px-5 py-3"><TransactionId id={t.transactionId || t._id} /></td>
                <td className="px-3 py-3 capitalize text-[var(--text-secondary)]">{t.type?.replace('_', ' ')}</td>
                <td className="px-3 py-3 text-[var(--text-secondary)]">{t.userEmail || t.userId}</td>
                <td className="px-3 py-3 text-[var(--text-primary)]">{t.ebookTitle || '—'}</td>
                <td className="px-3 py-3 font-semibold text-[var(--text-primary)]">${t.amount.toFixed(2)}</td>
                <td className="px-3 py-3 text-[var(--text-secondary)]">
                  {new Date(t.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-5 py-3"><SalesStatusBadge status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <p className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--text-secondary)]">
          No transactions match your filters.
        </p>
      )}
    </div>
  );
}
