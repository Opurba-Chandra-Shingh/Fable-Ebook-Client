import { getMyPurchases } from "@/api/purchases";
import { getAllBookmarkedBooks } from "@/api/bookmaks";
import { getAllBooks } from "@/api/books";
import ReaderStatCards from "@/components/UserDashboardRelatedCompo.jsx/ReaderStatCards";
import ContinueReading from "@/components/UserDashboardRelatedCompo.jsx/ContinueReading";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: 'My Dashboard — Fable',
};

export default async function ReaderDashboardPage() {
  const [purchases, bookmarks, allBooks] = await Promise.all([
    getMyPurchases(),
    getAllBookmarkedBooks(),
    getAllBooks(),
  ]);

  const completedPurchases = purchases.filter((p) => p.status === 'completed');
  const purchasedBooks = completedPurchases
    .map((p) => allBooks.find((b) => b._id === p.ebookId))
    .filter(Boolean);

  const stats = {
    purchasedEbooks: completedPurchases.length,
    bookmarks: bookmarks.length,
    totalSpent: completedPurchases.reduce((sum, p) => sum + p.amount, 0),
    booksRead: completedPurchases.length,
  };

  if (stats.purchasedEbooks === 0 && stats.bookmarks === 0) {
    return (
      <div className="flex flex-col items-center rounded-card border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
        <BookOpen size={36} className="text-[var(--accent)]" />
        <h2 className="mt-5 font-serif text-2xl font-medium text-[var(--text-primary)]">
          Your library is waiting.
        </h2>
        <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
          Discover your first story and start building your personal shelf.
        </p>
        <Link
          href="/browse"
          className="mt-6 rounded-btn bg-[var(--button-primary-bg)] px-5 py-3 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
        >
          Explore Ebooks
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ReaderStatCards stats={stats} />
      <ContinueReading books={purchasedBooks.slice(0, 5)} />
    </div>
  );
}
