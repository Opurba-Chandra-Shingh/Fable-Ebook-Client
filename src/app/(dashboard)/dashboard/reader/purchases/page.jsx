import { getMyPurchases } from "@/api/purchases";
import { getAllBooks } from "@/api/books";
import PurchaseHistoryClient from "@/components/UserDashboardRelatedCompo.jsx/PurchaseHistoryClient";

export const metadata = {
  title: 'Purchase History — Fable',
};

export default async function PurchaseHistoryPage() {
  const [purchases, allBooks] = await Promise.all([getMyPurchases(), getAllBooks()]);

  const rows = purchases.map((p) => {
    const book = allBooks.find((b) => b._id === p.ebookId);
    return {
      ...p,
      ebookTitle: book?.title || 'Ebook removed',
      writerName: book?.writerName || '—',
    };
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
        Purchase History
      </h1>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Every transaction you've made on Fable.
      </p>

      <div className="mt-6">
        <PurchaseHistoryClient purchases={rows} />
      </div>
    </div>
  );
}
