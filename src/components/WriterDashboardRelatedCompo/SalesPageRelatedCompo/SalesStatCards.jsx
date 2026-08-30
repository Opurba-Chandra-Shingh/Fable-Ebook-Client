import { ShoppingBag, Wallet, TrendingUp, Trophy } from 'lucide-react';

export default function SalesStatCards({ sales }) {
  const completed = sales.filter((s) => s.status === 'completed');
  const totalSales = completed.length;
  const totalRevenue = completed.reduce((sum, s) => sum + s.amount, 0);
  const averageSale = totalSales ? totalRevenue / totalSales : 0;

  const revenueByEbook = completed.reduce((acc, s) => {
    acc[s.ebookTitle] = (acc[s.ebookTitle] || 0) + s.amount;
    return acc;
  }, {});
  const bestSelling = Object.entries(revenueByEbook).sort((a, b) => b[1] - a[1])[0];

  const cards = [
    { label: 'Total Sales', value: totalSales, icon: ShoppingBag },
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: Wallet },
    { label: 'Average Sale', value: totalSales ? `$${averageSale.toFixed(2)}` : '$0.00', icon: TrendingUp },
    { label: 'Best Selling Ebook', value: bestSelling ? bestSelling[0] : '—', icon: Trophy, isText: true },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ label, value, icon: Icon, isText }) => (
        <div key={label} className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
          <Icon size={20} className="text-[var(--accent)]" strokeWidth={1.75} />
          <p
            className={`mt-4 font-serif font-semibold text-[var(--text-primary)] ${
              isText ? 'truncate text-lg' : 'text-2xl'
            }`}
            title={isText ? value : undefined}
          >
            {value}
          </p>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{label}</p>
        </div>
      ))}
    </div>
  );
}