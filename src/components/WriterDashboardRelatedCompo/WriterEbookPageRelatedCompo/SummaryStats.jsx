export default function SummaryStats({ summary }) {
  const items = [
    { label: 'Total Ebooks', value: summary.total },
    { label: 'Published', value: summary.published },
    { label: 'Unpublished', value: summary.unpublished },
    { label: 'Total Sales', value: summary.totalSales },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map(({ label, value }) => (
        <div
          key={label}
          className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-4"
        >
          <p className="font-serif text-xl font-semibold text-[var(--text-primary)]">
            {value}
          </p>
          <p className="mt-0.5 text-xs text-[var(--text-secondary)]">{label}</p>
        </div>
      ))}
    </div>
  );
}