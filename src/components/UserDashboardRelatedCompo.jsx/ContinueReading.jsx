// components/dashboard/reader/continue-reading.jsx
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function ContinueReading({ books }) {
  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
        Continue Reading
      </h2>

      {!books?.length ? (
        <p className="mt-4 text-sm text-[var(--text-secondary)]">
          Nothing to continue yet — your purchased ebooks will show up here.
        </p>
      ) : (
        <div className="mt-4 space-y-3">
          {books.map((book) => (
            <div
              key={book._id}
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
                  by {book.writerName}
                </p>
              </div>

              <Link
                href={`/read/${book._id}`}
                className="flex shrink-0 items-center gap-1.5 rounded-btn bg-[var(--button-primary-bg)] px-3 py-1.5 text-xs font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
              >
                <BookOpen size={13} />
                Continue Reading
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
