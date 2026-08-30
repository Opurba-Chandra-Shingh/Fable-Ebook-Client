// components/dashboard/writer/ebooks/edit/edit-ebook-form.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import { showToast } from '@/lib/toast';
import CoverUploader from '@/components/WriterDashboardRelatedCompo/AddEbookPageRelatedCompo/CoverUploader';
import CoverPreviewPanel from '@/components/WriterDashboardRelatedCompo/AddEbookPageRelatedCompo/CoverPreviewPanel';
import DeleteConfirmDialog from '@/components/WriterDashboardRelatedCompo/WriterEbookPageRelatedCompo/DeleteConfirmDialog';
import { updateBook, deleteBook } from '@/action/books';


const GENRES = [
  'Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Fantasy', 'Horror',
  'Thriller', 'Biography', 'Self Development', 'Poetry', 'History', 'Adventure',
];

const MAX_PRICE = 500;

const fieldClass =
  'w-full rounded-input border bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40';

const labelClass = 'mb-1.5 block text-sm font-medium text-[var(--text-primary)]';


export default function EditEbookForm({ ebook }) {
  const router = useRouter();

  const [title, setTitle] = useState(ebook.title || '');
  const [genre, setGenre] = useState(ebook.genre || '');
  const [price, setPrice] = useState(ebook.price || '');
  const [description, setDescription] = useState(ebook.description || '');
  const [bookContent, setBookContent] = useState(ebook.bookContent || '');
  const [coverImage, setCoverImage] = useState(ebook.coverImage || '');
  const [publishingStatus, setPublishingStatus] = useState(ebook.publishingStatus);
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function hndlSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);
    setFormError('');

    try {
      await updateBook(ebook._id, {
        title, genre, price: Number(price), description, bookContent, coverImage,
      });
      showToast.success('Ebook updated successfully.');
      router.push('/dashboard/writer/ebooks');
    } catch {
      setFormError('Unable to update ebook. Please try again.');
      showToast.error('Unable to update ebook.');
    } finally {
      setIsSubmitting(false);
    }
  }

  async function hndlTogglePublish() {
    const nextStatus = publishingStatus === 'published' ? 'unpublished' : 'published';
    try {
      await updateBook(ebook._id, { publishingStatus: nextStatus });
      setPublishingStatus(nextStatus);
      showToast.success(nextStatus === 'published' ? 'Ebook published.' : 'Ebook unpublished.');
    } catch {
      showToast.error('Unable to update publishing status.');
    }
  }

  async function hndlConfirmDelete() {
    setIsDeleting(true);
    try {
      await deleteBook(ebook._id);
      showToast.success('Ebook deleted.');
      router.push('/dashboard/writer/ebooks');
    } catch {
      showToast.error('Unable to delete ebook.');
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <Link
        href="/dashboard/writer/ebooks"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
      >
        <ArrowLeft size={15} />
        Back to My Ebooks
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-medium text-[var(--text-primary)]">
          Edit Ebook
        </h1>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={hndlTogglePublish}
            className="rounded-btn border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
          >
            {publishingStatus === 'published' ? 'Unpublish' : 'Publish'}
          </button>
          <button
            type="button"
            onClick={() => setShowDeleteDialog(true)}
            className="flex items-center gap-1.5 rounded-btn border border-red-300/50 px-4 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>

      {formError && (
        <div
          role="alert"
          className="mt-6 rounded-input border border-red-300/50 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          {formError}
        </div>
      )}

      <form onSubmit={hndlSubmit} noValidate className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[2.2fr_1fr]">
        <div className="space-y-8">
          <section className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
              Basic Information
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`${fieldClass} border-[var(--border)]`}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className={`${fieldClass} border-[var(--border)]`}
                  >
                    <option value="">Select a genre</option>
                    {GENRES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Price (USD)</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[var(--text-secondary)]">
                      $
                    </span>
                    <input
                      type="number"
                      min="0.01"
                      max={MAX_PRICE}
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={`${fieldClass} border-[var(--border)] pl-7`}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className={`${fieldClass} border-[var(--border)] resize-none leading-relaxed`}
                />
              </div>
            </div>
          </section>

          <section className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
              Ebook Content
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              This content becomes available to readers after successful purchase.
            </p>

            <textarea
              value={bookContent}
              onChange={(e) => setBookContent(e.target.value)}
              rows={16}
              className="mt-4 w-full rounded-input border border-[var(--border)] bg-[var(--surface-alt)] px-4 py-4 font-serif text-[15px] leading-8 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
            />
          </section>
        </div>

        <div className="space-y-6">
          <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-6">
            <CoverUploader value={coverImage} onChange={setCoverImage} />
          </div>

          <CoverPreviewPanel coverImage={coverImage} title={title} genre={genre} price={price} />

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-btn bg-[var(--button-primary-bg)] px-5 py-3.5 text-sm font-semibold text-[var(--button-primary-text)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>

      <DeleteConfirmDialog
        ebook={showDeleteDialog ? ebook : null}
        isDeleting={isDeleting}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={hndlConfirmDelete}
      />
    </div>
  );
}
