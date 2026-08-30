import { getUserSession } from "@/session/session";
import { getAllBooks } from "@/api/books";
import { getWriterSales } from "@/api/purchases";
import WriterDashboardClient from "./WriterDashboardClient";



export const metadata = {
  title: 'Writer Dashboard — Fable',
};

function buildMonthlyRevenue(sales, months = 6) {
  const now = new Date();
  const buckets = [];

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    buckets.push({ key: `${d.getFullYear()}-${d.getMonth()}`, month: d.toLocaleDateString('en-US', { month: 'short' }), revenue: 0 });
  }

  const map = new Map(buckets.map((b) => [b.key, b]));

  sales.forEach((s) => {
    const d = new Date(s.purchasedAt);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    if (map.has(key)) map.get(key).revenue += s.amount;
  });

  return buckets.map(({ month, revenue }) => ({ month, revenue: Number(revenue.toFixed(2)) }));
}

export default async function WriterDashboardPage() {
  const user = await getUserSession();

  const [allBooks, sales] = await Promise.all([getAllBooks(), getWriterSales()]);
  const books = allBooks.filter((book) => book.writerId === user.id);

  const stats = {
    totalEbooks: books.length,
    publishedEbooks: books.filter((b) => b.publishingStatus === 'published').length,
    totalSales: sales.length,
    totalRevenue: sales.reduce((sum, s) => sum + s.amount, 0),
  };

  const monthlyRevenue = buildMonthlyRevenue(sales);

  const salesByBook = new Map();
  sales.forEach((s) => {
    const entry = salesByBook.get(s.ebookId) || { sales: 0, revenue: 0 };
    entry.sales += 1;
    entry.revenue += s.amount;
    salesByBook.set(s.ebookId, entry);
  });

  const topEbooks = books
    .map((book) => ({
      id: book._id,
      title: book.title,
      coverImage: book.coverImage,
      status: book.publishingStatus === 'published' ? 'Published' : 'Draft',
      sales: salesByBook.get(book._id)?.sales || 0,
      revenue: salesByBook.get(book._id)?.revenue || 0,
    }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const recentSales = sales.slice(0, 5).map((s) => ({
    id: s._id,
    ebookTitle: s.ebookTitle,
    buyerName: s.buyerName,
    date: s.purchasedAt,
    amount: s.amount,
  }));

  return (
    <WriterDashboardClient
      stats={stats}
      monthlyRevenue={monthlyRevenue}
      topEbooks={topEbooks}
      recentSales={recentSales}
    />
  );
}
