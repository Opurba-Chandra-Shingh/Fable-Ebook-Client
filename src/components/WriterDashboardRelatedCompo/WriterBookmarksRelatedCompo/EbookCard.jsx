// components/ebook-card.jsx  (small addition — optional onUnbookmark callback)
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Bookmark, BookmarkCheck } from 'lucide-react';

import { showToast } from '@/lib/toast';
import { useSession } from '@/lib/auth-client';

export default function EbookCard({ book, onUnbookmark }) {

    const { data: session } = useSession();
    const user = session?.user;
    
    // console.log("Session from Bookmarks Ebook card : " ,session);
    // console.log("User from Bookmarks Ebook card : " ,user);


  const router = useRouter();
  const {
    id,
    coverImage,
    category,
    title,
    author,
    price,
    status,
    isPurchasedByCurrentUser,
    isBookmarkedByCurrentUser,
  } = book;

  const [bookmarked, setBookmarked] = useState(!!isBookmarkedByCurrentUser);
  const [isPending, setIsPending] = useState(false);
  const isSold = status === 'sold' || status === 'unavailable';

//   async function handleBookmark(e) {
//     e.preventDefault();
//     e.stopPropagation();

//     if (!user) {
//       router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
//       return;
//     }
//     if (isPending) return;

//     setIsPending(true);
//     const next = !bookmarked;
//     setBookmarked(next);
//     try {
//       await toggleBookmark(id);
//       if (!next && onUnbookmark) {
//         onUnbookmark(id);
//       }
//     } catch {
//       setBookmarked(!next);
//       showToast.error('Something went wrong. Please try again.');
//     } finally {
//       setIsPending(false);
//     }
//   }

  return (
    <Link
      href={`/ebooks/${id}`}
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

        <button
          type="button"
        //   onClick={handleBookmark}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add to bookmarks'}
          className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur transition-colors ${
            bookmarked
              ? 'bg-[var(--accent)] text-white'
              : 'bg-[var(--surface)]/85 text-[var(--text-primary)] hover:bg-[var(--surface)]'
          }`}
        >
          {bookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
        </button>

        {isPurchasedByCurrentUser ? (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[var(--accent)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Purchased
          </span>
        ) : isSold ? (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[var(--text-primary)]/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            Sold
          </span>
        ) : null}
      </div>

      <div className="p-4">
        <span className="inline-block rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-2.5 py-1 text-[11px] font-medium text-[var(--badge-text)]">
          {category}
        </span>

        <h3 className="mt-3 font-serif text-base font-semibold leading-snug text-[var(--text-primary)] line-clamp-1">
          {title}
        </h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-1">
          {author}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            ${price.toFixed(2)}
          </p>
          <span className="text-xs font-medium text-[var(--accent)]">
            {isPurchasedByCurrentUser ? 'Read Ebook' : 'View Details'}
          </span>
        </div>
      </div>
    </Link>
  );
}