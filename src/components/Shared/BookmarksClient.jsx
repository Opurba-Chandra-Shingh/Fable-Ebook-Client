'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { showToast } from '@/lib/toast';
import BookmarksEmpty from '@/components/WriterDashboardRelatedCompo/WriterBookmarksRelatedCompo/BookmarksEmpty';
import BookmarkEbookCard from '@/components/Shared/BookmarkEbookCard';
import { deleteBookmark } from '@/action/bookmarks';

export default function BookmarksClient({
  bookmarks: initialBookmarks,
  heading = 'Saved Stories',
  description = "Keep track of stories that inspire, interest, or simply deserve a place on your reading list.",
}) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);

  async function handleUnbookmark(bookId) {
    const previous = bookmarks;
    setBookmarks((prev) => prev.filter((book) => book.bookId !== bookId));

    try {
      const response = await deleteBookmark(bookId);
      if (!response.deletedCount) {
        throw new Error('Unable to remove bookmark.');
      }
      showToast.success('Removed from bookmarks.');
    } catch (error) {
      setBookmarks(previous);
      showToast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
        {heading}
      </h1>
      <p className="mt-1 max-w-xl text-sm text-[var(--text-secondary)]">
        {description}
      </p>

      <div className="mt-8">
        {bookmarks.length === 0 ? (
          <BookmarksEmpty />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence>
              {bookmarks.map((book) => (
                <motion.div
                  key={book._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25 }}
                >
                  <BookmarkEbookCard book={book} onUnbookmark={handleUnbookmark} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
