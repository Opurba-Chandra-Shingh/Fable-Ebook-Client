// components/dashboard/writer/sales/sales-cards.jsx

import SalesStatusBadge from "./SalesStatusBadge";
import TransactionId from "./TransactionId";


export default function SalesCards({ sales }) {
  return (
    <div className="space-y-3 md:hidden">
      {sales.map((sale) => (
        <div key={sale.id} className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="font-serif text-sm font-semibold text-[var(--text-primary)]">{sale.ebookTitle}</p>
            <p className="text-sm font-semibold text-[var(--text-primary)]">${sale.amount.toFixed(2)}</p>
          </div>
          <p className="mt-1 text-xs text-[var(--text-secondary)]">
            {sale.buyerName} ·{' '}
            {new Date(sale.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <TransactionId id={sale.id} />
            <SalesStatusBadge status={sale.status} />
          </div>
        </div>
      ))}
    </div>
  );
}