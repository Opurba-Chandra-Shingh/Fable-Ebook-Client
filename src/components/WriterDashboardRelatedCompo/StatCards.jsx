// components/dashboard/writer/stat-cards.jsx
import { Library, BookCheck, ShoppingBag, Wallet } from 'lucide-react';

export default function StatCards({ stats }) {
  const cards = [
    { label: 'Total Ebooks', value: stats.totalEbooks, icon: Library },
    { label: 'Published Ebooks', value: stats.publishedEbooks, icon: BookCheck },
    { label: 'Total Sales', value: stats.totalSales, icon: ShoppingBag },
    {
      label: 'Total Revenue',
      value: `$${stats.totalRevenue.toFixed(2)}`,
      icon: Wallet,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5"
        >
          <Icon size={20} className="text-[var(--accent)]" strokeWidth={1.75} />
          <p className="mt-4 font-serif text-2xl font-semibold text-[var(--text-primary)]">
            {value}
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{label}</p>
        </div>
      ))}
    </div>
  );
}