export default function RecentSales({ sales }) {
  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
        Recent Sales
      </h2>

      {!sales?.length ? (
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          No transactions yet.
        </p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-4 hidden overflow-x-auto md:block">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--text-secondary)]">
                  <th className="pb-3 font-medium">Ebook</th>
                  <th className="pb-3 font-medium">Buyer</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 pr-1 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="border-b border-[var(--border)] last:border-0">
                    <td className="py-3 pr-4 text-[var(--text-primary)]">{sale.ebookTitle}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">{sale.buyerName}</td>
                    <td className="py-3 pr-4 text-[var(--text-secondary)]">
                      {new Date(sale.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-3 pr-1 text-right font-semibold text-[var(--text-primary)]">
                      ${sale.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-4 space-y-3 md:hidden">
            {sales.map((sale) => (
              <div key={sale.id} className="rounded-btn border border-[var(--border)] p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {sale.ebookTitle}
                  </p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    ${sale.amount.toFixed(2)}
                  </p>
                </div>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  {sale.buyerName} ·{' '}
                  {new Date(sale.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}