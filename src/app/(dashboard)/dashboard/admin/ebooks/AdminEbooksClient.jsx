'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, Loader2, Trash2 } from 'lucide-react';
import StatusBadge from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/StatusBadge';
import { showToast } from '@/lib/toast';
import { deleteBook, updateBook } from '@/action/books';

export default function AdminEbooksClient({ books: initialBooks }) {
  const [books, setBooks] = useState(initialBooks);
  const [updatingId, setUpdatingId] = useState(null);

  async function handleTogglePublish(book) {
    const nextStatus = book.publishingStatus === 'published' ? 'unpublished' : 'published';
    setUpdatingId(book._id);
    try {
      await updateBook(book._id, { publishingStatus: nextStatus });
      setBooks((prev) => prev.map((b) => (b._id === book._id ? { ...b, publishingStatus: nextStatus } : b)));
      showToast.success(nextStatus === 'published' ? 'Ebook published.' : 'Ebook unpublished.');
    } catch {
      showToast.error('Unable to update ebook.');
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleDelete(book) {
    if (!window.confirm(`Delete "${book.title}"? This cannot be undone.`)) return;

    setUpdatingId(book._id);
    try {
      await deleteBook(book._id);
      setBooks((prev) => prev.filter((b) => b._id !== book._id));
      showToast.success('Ebook deleted.');
    } catch {
      showToast.error('Unable to delete ebook.');
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="hidden overflow-x-auto rounded-card border border-[var(--border)] bg-[var(--surface)] md:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--text-secondary)]">
            <th className="px-5 py-3 font-medium">Cover</th>
            <th className="px-3 py-3 font-medium">Title</th>
            <th className="px-3 py-3 font-medium">Writer</th>
            <th className="px-3 py-3 font-medium">Genre</th>
            <th className="px-3 py-3 font-medium">Price</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 font-medium">Created</th>
            <th className="px-5 py-3 text-right font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="border-b border-[var(--border)] last:border-0">
              <td className="px-5 py-3">
                <div className="h-14 w-10 overflow-hidden rounded-md bg-[var(--background-secondary)]">
                  {book.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={book.coverImage} alt={`Cover of ${book.title}`} className="h-full w-full object-cover" />
                  ) : null}
                </div>
              </td>
              <td className="px-3 py-3 font-medium text-[var(--text-primary)]">{book.title}</td>
              <td className="px-3 py-3 text-[var(--text-secondary)]">{book.writerName}</td>
              <td className="px-3 py-3 text-[var(--text-secondary)]">{book.genre}</td>
              <td className="px-3 py-3 text-[var(--text-primary)]">${book.price}</td>
              <td className="px-3 py-3"><StatusBadge status={book.publishingStatus} /></td>
              <td className="px-3 py-3 text-[var(--text-secondary)]">
                {new Date(book.uploadedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </td>
              <td className="px-5 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/browse/${book._id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--background-secondary)]"
                    aria-label="View ebook"
                  >
                    <Eye size={15} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(book)}
                    disabled={updatingId === book._id}
                    className="rounded-btn border border-[var(--border)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)] disabled:opacity-50"
                  >
                    {updatingId === book._id ? <Loader2 size={13} className="animate-spin" /> : (book.publishingStatus === 'published' ? 'Unpublish' : 'Publish')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(book)}
                    disabled={updatingId === book._id}
                    aria-label="Delete ebook"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
