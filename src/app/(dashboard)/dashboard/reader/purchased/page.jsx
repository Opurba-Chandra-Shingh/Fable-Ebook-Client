import Link from "next/link";
import { BookOpen, Library } from "lucide-react";
import { getMyPurchases } from "@/api/purchases";
import { getAllBooks } from "@/api/books";

export const metadata = {
  title: 'Purchased Ebooks — Fable',
};

export default async function PurchasedEbooksPage() {
  const [purchases, allBooks] = await Promise.all([getMyPurchases(), getAllBooks()]);

  const books = purchases
    .filter((p) => p.status === 'completed')
    .map((p) => allBooks.find((b) => b._id === p.ebookId))
    .filter(Boolean);

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
        Purchased Ebooks
      </h1>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Every story you own, ready to read anytime.
      </p>

      <div className="mt-8">
        {books.length === 0 ? (
          <div className="flex flex-col items-center rounded-card border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
            <Library size={32} className="text-[var(--accent)]" />
            <h2 className="mt-5 font-serif text-xl font-medium text-[var(--text-primary)]">
              You haven&apos;t purchased an ebook yet.
            </h2>
            <Link
              href="/browse"
              className="mt-6 rounded-btn bg-[var(--button-primary-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
            >
              Explore Ebooks
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {books.map((book) => (
              <div
                key={book._id}
                className="overflow-hidden rounded-card border border-[var(--border)] bg-[var(--surface)]"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-[var(--background-secondary)]">
                  {book.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={book.coverImage} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold leading-snug text-[var(--text-primary)] line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-1">
                    by {book.writerName}
                  </p>
                  <Link
                    href={`/read/${book._id}`}
                    className="mt-3 flex items-center justify-center gap-1.5 rounded-btn bg-[var(--button-primary-bg)] px-3 py-2 text-xs font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
                  >
                    <BookOpen size={13} />
                    Read Ebook
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
