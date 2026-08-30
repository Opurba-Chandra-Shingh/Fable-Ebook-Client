// components/shared/bookmark-ebook-card.jsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookmarkCheck, Loader2 } from 'lucide-react';

export default function BookmarkEbookCard({ book, onUnbookmark }) {
  const {
    bookId,
    coverImage,
    genre,
    title,
    writerName,
    price,
    status,
  } = book;

  const [isRemoving, setIsRemoving] = useState(false);
  const isSold = status === 'Sold' || status === 'unavailable';

  const handleUnbookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isRemoving) return;

    setIsRemoving(true);
    try {
      await onUnbookmark(bookId);
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Link
      href={`/browse/${bookId}`}
      className="group relative block overflow-hidden rounded-card border border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-1 hover:shadow-subtle"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--background-secondary)]">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt={`Cover of ${title}`}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-[var(--text-secondary)]">
            Cover of {title}
          </div>
        )}

        {isSold && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[var(--surface)]/90 px-2.5 py-1 text-[11px] font-medium text-[var(--text-secondary)]">
            Sold
          </span>
        )}

        <button
          type="button"
          onClick={handleUnbookmark}
          disabled={isRemoving}
          aria-label="Remove bookmark"
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)] text-white backdrop-blur transition-colors disabled:opacity-60"
        >
          {isRemoving ? <Loader2 size={14} className="animate-spin" /> : <BookmarkCheck size={14} />}
        </button>
      </div>
      <div className="p-4">
        <span className="inline-block rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-2.5 py-1 text-[11px] font-medium text-[var(--badge-text)]">
          {genre}
        </span>

        <h3 className="mt-3 font-serif text-base font-semibold leading-snug text-[var(--text-primary)] line-clamp-1">
          {title}
        </h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-1">
          {writerName}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            ${Number(price).toFixed(2)}
          </p>
          <span className="text-xs font-medium text-[var(--accent)]">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
