import { Library, Bookmark, Wallet, BookCheck } from 'lucide-react';

export default function ReaderStatCards({ stats }) {
  const cards = [
    { label: 'Purchased Ebooks', value: stats.purchasedEbooks, icon: Library },
    { label: 'Bookmarks', value: stats.bookmarks, icon: Bookmark },
    { label: 'Total Spent', value: `$${stats.totalSpent.toFixed(2)}`, icon: Wallet },
    { label: 'Books Read', value: stats.booksRead, icon: BookCheck },
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
