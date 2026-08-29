// components/dashboard/writer/sales/sales-table.jsx

import SalesStatusBadge from "./SalesStatusBadge";
import TransactionId from "./TransactionId";


export default function SalesTable({ sales }) {
  return (
    <div className="hidden overflow-x-auto rounded-card border border-[var(--border)] bg-[var(--surface)] md:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--text-secondary)]">
            <th className="px-5 py-3 font-medium">Ebook</th>
            <th className="px-3 py-3 font-medium">Buyer</th>
            <th className="px-3 py-3 font-medium">Amount</th>
            <th className="px-3 py-3 font-medium">Purchase Date</th>
            <th className="px-3 py-3 font-medium">Transaction ID</th>
            <th className="px-5 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id} className="border-b border-[var(--border)] last:border-0">
              <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{sale.ebookTitle}</td>
              <td className="px-3 py-3 text-[var(--text-secondary)]">{sale.buyerName}</td>
              <td className="px-3 py-3 font-semibold text-[var(--text-primary)]">${sale.amount.toFixed(2)}</td>
              <td className="px-3 py-3 text-[var(--text-secondary)]">
                {new Date(sale.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </td>
              <td className="px-3 py-3"><TransactionId id={sale.id} /></td>
              <td className="px-5 py-3"><SalesStatusBadge status={sale.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}