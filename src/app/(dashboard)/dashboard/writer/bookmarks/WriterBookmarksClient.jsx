// components/dashboard/writer/bookmarks/writer-bookmarks-client.jsx
'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { showToast } from '@/lib/toast';
import EbookSkeleton from '@/components/WriterDashboardRelatedCompo/WriterBookmarksRelatedCompo/EbookSkeleton';
import BookmarksEmpty from '@/components/WriterDashboardRelatedCompo/WriterBookmarksRelatedCompo/BookmarksEmpty';
import EbookCard from '@/components/WriterDashboardRelatedCompo/WriterBookmarksRelatedCompo/EbookCard';


// Dummy bookmarked ebooks — shape matches what EbookCard expects.
// Swap for a real getBookmarkedEbooks() API call later.
const DUMMY_BOOKMARKS = [
  {
    id: 'ebook_2',
    coverImage: '/images/books/weight-of-almost.jpg',
    category: 'Poetry',
    title: 'The Weight of Almost',
    author: 'Rafael Duarte',
    price: 6.5,
    status: 'available',
    isPurchasedByCurrentUser: false,
    isBookmarkedByCurrentUser: true,
  },
  {
    id: 'ebook_5',
    coverImage: '/images/books/cartographers.jpg',
    category: 'History',
    title: 'Cartographers of the Long Road',
    author: 'Hannah Beaumont',
    price: 12.0,
    status: 'available',
    isPurchasedByCurrentUser: false,
    isBookmarkedByCurrentUser: true,
  },
  {
    id: 'ebook_6',
    coverImage: null,
    category: 'Horror',
    title: 'The House Listens Back',
    author: 'Elias Crowe',
    price: 10.99,
    status: 'sold',
    isPurchasedByCurrentUser: false,
    isBookmarkedByCurrentUser: true,
  },
  {
    id: 'ebook_7',
    coverImage: '/images/books/monsoon-interrupted.jpg',
    category: 'Romance',
    title: 'Monsoon, Interrupted',
    author: 'Nadia Rahman',
    price: 7.99,
    status: 'available',
    isPurchasedByCurrentUser: true,
    isBookmarkedByCurrentUser: true,
  },
  {
    id: 'ebook_9',
    coverImage: '/images/books/last-winter-protocol.jpg',
    category: 'Science Fiction',
    title: 'The Last Winter Protocol',
    author: 'Ingrid Solheim',
    price: 13.5,
    status: 'available',
    isPurchasedByCurrentUser: false,
    isBookmarkedByCurrentUser: true,
  },
];

export default function WriterBookmarksClient() {
  const [status, setStatus] = useState('loading');
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBookmarks(DUMMY_BOOKMARKS);
      setStatus('ready');
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  function handleUnbookmark(id) {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    showToast.success('Removed from bookmarks.');
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
        Saved Stories
      </h1>
      <p className="mt-1 max-w-xl text-sm text-[var(--text-secondary)]">
        Keep track of stories that inspire, interest, or simply deserve a
        place on your reading list.
      </p>

      <div className="mt-8">
        {status === 'loading' && <EbookSkeleton count={8} />}

        {status === 'ready' && bookmarks.length === 0 && <BookmarksEmpty />}

        {status === 'ready' && bookmarks.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence>
              {bookmarks.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.25 }}
                >
                  <EbookCard book={book} onUnbookmark={handleUnbookmark} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}