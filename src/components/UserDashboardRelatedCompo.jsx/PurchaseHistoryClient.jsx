'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, ReceiptText } from 'lucide-react';
import SalesStatusBadge from '@/components/WriterDashboardRelatedCompo/SalesPageRelatedCompo/SalesStatusBadge';

const STATUS_TABS = [
  { value: '', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
];

export default function PurchaseHistoryClient({ purchases }) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const totalSpent = purchases
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const latestPurchase = purchases[0];

  const filtered = useMemo(() => {
    return purchases.filter((p) => {
      const matchesSearch = !search || p.ebookTitle.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !status || p.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [purchases, search, status]);

  if (purchases.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-card border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
        <ReceiptText size={32} className="text-[var(--accent)]" />
        <h2 className="mt-5 font-serif text-xl font-medium text-[var(--text-primary)]">
          You haven&apos;t purchased an ebook yet.
        </h2>
        <Link
          href="/browse"
          className="mt-6 rounded-btn bg-[var(--button-primary-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
        >
          Explore Ebooks
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="font-serif text-2xl font-semibold text-[var(--text-primary)]">{purchases.length}</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Total Purchases</p>
        </div>
        <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="font-serif text-2xl font-semibold text-[var(--text-primary)]">${totalSpent.toFixed(2)}</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Total Spent</p>
        </div>
        <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
          <p className="truncate font-serif text-lg font-semibold text-[var(--text-primary)]">
            {latestPurchase?.ebookTitle || '—'}
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">Latest Purchase</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-card border border-[var(--border)] bg-[var(--surface)] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-full border border-[var(--border)] bg-[var(--background-secondary)] p-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setStatus(tab.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                status === tab.value
                  ? 'bg-[var(--surface)] text-[var(--accent)] shadow-subtle'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-xs">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ebook title..."
            className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] py-2 pl-9 pr-3 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          />
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-card border border-[var(--border)] bg-[var(--surface)] md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--text-secondary)]">
              <th className="px-5 py-3 font-medium">Ebook</th>
              <th className="px-3 py-3 font-medium">Writer</th>
              <th className="px-3 py-3 font-medium">Amount</th>
              <th className="px-3 py-3 font-medium">Purchase Date</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p._id} className="border-b border-[var(--border)] last:border-0">
                <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{p.ebookTitle}</td>
                <td className="px-3 py-3 text-[var(--text-secondary)]">{p.writerName}</td>
                <td className="px-3 py-3 font-semibold text-[var(--text-primary)]">${p.amount.toFixed(2)}</td>
                <td className="px-3 py-3 text-[var(--text-secondary)]">
                  {new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-3 py-3"><SalesStatusBadge status={p.status === 'completed' ? 'completed' : p.status} /></td>
                <td className="px-5 py-3 text-right">
                  {p.status === 'completed' ? (
                    <Link href={`/read/${p.ebookId}`} className="text-xs font-medium text-[var(--accent)] hover:underline">
                      Read Ebook
                    </Link>
                  ) : (
                    <span className="text-xs text-[var(--text-secondary)]">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((p) => (
          <div key={p._id} className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="font-serif text-sm font-semibold text-[var(--text-primary)]">{p.ebookTitle}</p>
              <p className="text-sm font-semibold text-[var(--text-primary)]">${p.amount.toFixed(2)}</p>
            </div>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              {p.writerName} ·{' '}
              {new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <div className="mt-3 flex items-center justify-between">
              <SalesStatusBadge status={p.status} />
              {p.status === 'completed' && (
                <Link href={`/read/${p.ebookId}`} className="text-xs font-medium text-[var(--accent)] hover:underline">
                  Read Ebook
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
