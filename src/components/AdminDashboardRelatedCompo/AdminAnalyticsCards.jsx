import { Users, PenLine, ShoppingBag, Wallet } from 'lucide-react';

export default function AdminAnalyticsCards({ analytics }) {
  const cards = [
    { label: 'Total Users', value: analytics.totalUsers, icon: Users },
    { label: 'Total Writers', value: analytics.totalWriters, icon: PenLine },
    { label: 'Total Ebooks Sold', value: analytics.totalEbooksSold, icon: ShoppingBag },
    { label: 'Total Revenue', value: `$${analytics.totalRevenue.toFixed(2)}`, icon: Wallet },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon }) => (
        <div key={label} className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
          <Icon size={20} className="text-[var(--accent)]" strokeWidth={1.75} />
          <p className="mt-4 font-serif text-2xl font-semibold text-[var(--text-primary)]">{value}</p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{label}</p>
        </div>
      ))}
    </div>
  );
}
