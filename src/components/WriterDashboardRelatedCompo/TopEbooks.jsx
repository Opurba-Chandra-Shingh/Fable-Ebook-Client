import Link from 'next/link';

export default function TopEbooks({ books }) {
  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
        Top Performing Ebooks
      </h2>

      {!books?.length ? (
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          No sales yet — your best sellers will show up here.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex items-center gap-4 rounded-btn border border-[var(--border)] p-3"
            >
              <div className="h-16 w-12 shrink-0 overflow-hidden rounded-md bg-[var(--background-secondary)]">
                {book.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.coverImage} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-sm font-semibold text-[var(--text-primary)]">
                  {book.title}
                </p>
                <p className="mt-0.5 text-xs text-[var(--text-secondary)]">
                  {book.sales} sales · ${book.revenue.toFixed(2)} revenue
                </p>
                <span className="mt-1 inline-block rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--badge-text)]">
                  {book.status}
                </span>
              </div>

              <Link
                href={`/browse/${book.id}`}
                className="shrink-0 rounded-btn border border-[var(--border)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}