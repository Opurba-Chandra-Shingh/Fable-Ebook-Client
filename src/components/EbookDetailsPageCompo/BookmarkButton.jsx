// components/bookmark-button.jsx
'use client';

import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { addToBookmark } from '@/action/bookmarks';
import { showToast } from '@/lib/toast';

export default function BookmarkButton({
  ebook,
  currentUser,
  bookmarkedBooks = [],
}) {
  const router = useRouter();

  const [bookmarked, setBookmarked] = useState(() =>
    currentUser
      ? bookmarkedBooks.some(
          (book) =>
            book._id === ebook._id &&
            book.bookmarkedBy === currentUser.id
        )
      : false
  );

  const [isPending, setIsPending] = useState(false);

  async function handleClick() {
    if (!currentUser) {
      showToast.error('Please log in to save books.');
      router.push(`/login?redirect=/browse/${ebook._id}`);
      return;
    }

    if (isPending) return;

    setIsPending(true);

    try {
      if (!bookmarked) {
        const bookmarkBook = {
          ...ebook,
          bookmarkedBy: currentUser.id,
          bookmarkedAt: new Date(),
        };

        const response = await addToBookmark(bookmarkBook);

        if (response.insertedId) {
          setBookmarked(true);
          alert('Added to Bookmarked');
        }
      }
    } catch (error) {
      console.error('Bookmark error:', error);
      showToast.error('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={bookmarked}
      className={`flex items-center justify-center gap-2 rounded-btn border px-4 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
        bookmarked
          ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--background-secondary)]'
      }`}
    >
      <motion.span
        key={bookmarked ? 'saved' : 'unsaved'}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex"
      >
        {bookmarked ? (
          <BookmarkCheck size={17} />
        ) : (
          <Bookmark size={17} />
        )}
      </motion.span>

      {bookmarked ? 'Saved' : 'Add to Bookmarks'}
    </button>
  );
}