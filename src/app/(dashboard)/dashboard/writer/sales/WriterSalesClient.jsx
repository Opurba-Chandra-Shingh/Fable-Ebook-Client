// components/dashboard/writer/sales/writer-sales-client.jsx
'use client';

import RevenueChart from '@/components/WriterDashboardRelatedCompo/SalesPageRelatedCompo/RevenueChart';
import SalesCards from '@/components/WriterDashboardRelatedCompo/SalesPageRelatedCompo/SalesCards';
import { SalesEmptyState, SalesErrorState, SalesSkeleton } from '@/components/WriterDashboardRelatedCompo/SalesPageRelatedCompo/SalesEmptyState';
import SalesStatCards from '@/components/WriterDashboardRelatedCompo/SalesPageRelatedCompo/SalesStatCards';
import SalesTable from '@/components/WriterDashboardRelatedCompo/SalesPageRelatedCompo/SalesTable';
import SalesToolbar from '@/components/WriterDashboardRelatedCompo/SalesPageRelatedCompo/SalesToolbar';
import { useCallback, useEffect, useMemo, useState } from 'react';



// lib/dummy-writer-sales.js
// Dummy sales data for /dashboard/writer/sales — swap for a real API call later.

const dummySales = [
  { id: 'txn_a1b2c3d4', ebookId: 'ebook_1', ebookTitle: 'Glasshouse Kingdom', buyerName: 'Hannah Beaumont', buyerEmail: 'hannah.b@example.com', amount: 8.75, date: '2026-08-27', status: 'completed' },
  { id: 'txn_e5f6g7h8', ebookId: 'ebook_2', ebookTitle: 'The Weight of Almost', buyerName: 'Theodore Vance', buyerEmail: 'theo.vance@example.com', amount: 6.5, date: '2026-08-26', status: 'completed' },
  { id: 'txn_i9j0k1l2', ebookId: 'ebook_3', ebookTitle: 'Slow Craft', buyerName: 'Elias Crowe', buyerEmail: 'elias.crowe@example.com', amount: 6.99, date: '2026-08-25', status: 'completed' },
  { id: 'txn_m3n4o5p6', ebookId: 'ebook_1', ebookTitle: 'Glasshouse Kingdom', buyerName: 'Nadia Rahman', buyerEmail: 'nadia.r@example.com', amount: 8.75, date: '2026-08-24', status: 'completed' },
  { id: 'txn_q7r8s9t0', ebookId: 'ebook_2', ebookTitle: 'The Weight of Almost', buyerName: 'Amara Osei', buyerEmail: 'amara.osei@example.com', amount: 6.5, date: '2026-08-22', status: 'refunded' },
  { id: 'txn_u1v2w3x4', ebookId: 'ebook_4', ebookTitle: 'Nine Minutes Past', buyerName: 'Rafael Duarte', buyerEmail: 'rafael.d@example.com', amount: 10.25, date: '2026-08-19', status: 'completed' },
  { id: 'txn_y5z6a7b8', ebookId: 'ebook_1', ebookTitle: 'Glasshouse Kingdom', buyerName: 'Ingrid Solheim', buyerEmail: 'ingrid.s@example.com', amount: 8.75, date: '2026-08-15', status: 'completed' },
  { id: 'txn_c9d0e1f2', ebookId: 'ebook_5', ebookTitle: 'Cartographers of the Long Road', buyerName: 'Hannah Beaumont', buyerEmail: 'hannah.b@example.com', amount: 12.0, date: '2026-08-10', status: 'completed' },
  { id: 'txn_g3h4i5j6', ebookId: 'ebook_3', ebookTitle: 'Slow Craft', buyerName: 'Theodore Vance', buyerEmail: 'theo.vance@example.com', amount: 6.99, date: '2026-08-03', status: 'pending' },
  { id: 'txn_k7l8m9n0', ebookId: 'ebook_2', ebookTitle: 'The Weight of Almost', buyerName: 'Elias Crowe', buyerEmail: 'elias.crowe@example.com', amount: 6.5, date: '2026-07-28', status: 'completed' },
  { id: 'txn_o1p2q3r4', ebookId: 'ebook_1', ebookTitle: 'Glasshouse Kingdom', buyerName: 'Nadia Rahman', buyerEmail: 'nadia.r@example.com', amount: 8.75, date: '2026-07-20', status: 'completed' },
  { id: 'txn_s5t6u7v8', ebookId: 'ebook_6', ebookTitle: 'The House Listens Back', buyerName: 'Amara Osei', buyerEmail: 'amara.osei@example.com', amount: 10.99, date: '2026-07-14', status: 'completed' },
  { id: 'txn_w9x0y1z2', ebookId: 'ebook_3', ebookTitle: 'Slow Craft', buyerName: 'Rafael Duarte', buyerEmail: 'rafael.d@example.com', amount: 6.99, date: '2026-06-30', status: 'completed' },
  { id: 'txn_a3b4c5d6', ebookId: 'ebook_2', ebookTitle: 'The Weight of Almost', buyerName: 'Ingrid Solheim', buyerEmail: 'ingrid.s@example.com', amount: 6.5, date: '2026-06-18', status: 'completed' },
  { id: 'txn_e7f8g9h0', ebookId: 'ebook_1', ebookTitle: 'Glasshouse Kingdom', buyerName: 'Hannah Beaumont', buyerEmail: 'hannah.b@example.com', amount: 8.75, date: '2026-05-22', status: 'completed' },
  { id: 'txn_i1j2k3l4', ebookId: 'ebook_4', ebookTitle: 'Nine Minutes Past', buyerName: 'Theodore Vance', buyerEmail: 'theo.vance@example.com', amount: 10.25, date: '2026-04-11', status: 'completed' },
  { id: 'txn_m5n6o7p8', ebookId: 'ebook_3', ebookTitle: 'Slow Craft', buyerName: 'Elias Crowe', buyerEmail: 'elias.crowe@example.com', amount: 6.99, date: '2026-03-30', status: 'completed' },
];

export const dummyWriterEbookOptions = [
  { id: 'ebook_1', title: 'Glasshouse Kingdom' },
  { id: 'ebook_2', title: 'The Weight of Almost' },
  { id: 'ebook_3', title: 'Slow Craft' },
  { id: 'ebook_4', title: 'Nine Minutes Past' },
  { id: 'ebook_5', title: 'Cartographers of the Long Road' },
  { id: 'ebook_6', title: 'The House Listens Back' },
];

export const dummySalesEmpty = [];

const DEFAULT_FILTERS = { search: '', ebook: '', status: '', startDate: '', endDate: '', sort: 'newest' };

export default function WriterSalesClient() {
  const [status, setStatus] = useState('ready');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

//   // Simulates fetching — swap for a real API call later.
//   const load = useCallback(() => {
//     setStatus('loading');
//     const timeout = setTimeout(() => setStatus('ready'), 500);
//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     const cleanup = load();
//     return cleanup;
//   }, [load]);

  function handleFilterChange(next) {
    setFilters((prev) => ({ ...prev, ...next }));
  }

  const filteredSales = useMemo(() => {
    let result = [...dummySales];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.ebookTitle.toLowerCase().includes(q) ||
          s.buyerName.toLowerCase().includes(q) ||
          s.buyerEmail.toLowerCase().includes(q)
      );
    }
    if (filters.ebook) result = result.filter((s) => s.ebookId === filters.ebook);
    if (filters.status) result = result.filter((s) => s.status === filters.status);
    if (filters.startDate) result = result.filter((s) => s.date >= filters.startDate);
    if (filters.endDate) result = result.filter((s) => s.date <= filters.endDate);

    switch (filters.sort) {
      case 'oldest':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'amount_desc':
        result.sort((a, b) => b.amount - a.amount);
        break;
      case 'amount_asc':
        result.sort((a, b) => a.amount - b.amount);
        break;
      default:
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [filters]);

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
        Sales
      </h1>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Track how your stories are performing.
      </p>

      <div className="mt-6">
        {status === 'loading' && <SalesSkeleton />}

        {status === 'error' && <SalesErrorState onRetry={load} />}

        {status === 'ready' && dummySales.length === 0 && <SalesEmptyState />}

        {status === 'ready' && dummySales.length > 0 && (
          <div className="space-y-6">
            <SalesStatCards sales={dummySales} />
            <RevenueChart sales={dummySales} />

            <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-4">
              <SalesToolbar filters={filters} onChange={handleFilterChange} ebookOptions={dummyWriterEbookOptions} />
            </div>

            {filteredSales.length === 0 ? (
              <p className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--text-secondary)]">
                No sales match your filters.
              </p>
            ) : (
              <>
                <SalesTable sales={filteredSales} />
                <SalesCards sales={filteredSales} />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}