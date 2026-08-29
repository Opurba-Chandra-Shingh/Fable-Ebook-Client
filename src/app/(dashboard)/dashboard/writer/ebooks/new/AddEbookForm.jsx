// components/dashboard/writer/ebooks/new/add-ebook-form.jsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
// import { createEbook } from '@/lib/api';
import { showToast } from '@/lib/toast';
import CoverUploader from '@/components/WriterDashboardRelatedCompo/AddEbookPageRelatedCompo/CoverUploader';
import CoverPreviewPanel from '@/components/WriterDashboardRelatedCompo/AddEbookPageRelatedCompo/CoverPreviewPanel';


const GENRES = [
  'Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Fantasy', 'Horror',
  'Thriller', 'Biography', 'Self Development', 'Poetry', 'History', 'Adventure',
];

const MAX_PRICE = 500;
// const DRAFT_KEY = 'fable_new_ebook_draft';

const fieldClass =
  'w-full rounded-input border bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40';

const labelClass = 'mb-1.5 block text-sm font-medium text-[var(--text-primary)]';

// function loadDraft() {
//   if (typeof window === 'undefined') return null;
//   try {
//     const raw = localStorage.getItem(DRAFT_KEY);
//     return raw ? JSON.parse(raw) : null;
//   } catch {
//     return null;
//   }
// }

export default function AddEbookForm() {
  // const router = useRouter();
  // const draft = useRef(loadDraft());

  const [form, setForm] = useState({});

//   const [form, setForm] = useState(() => ({
//     title: draft.current?.title || '',
//     genre: draft.current?.genre || '',
//     price: draft.current?.price || '',
//     description: draft.current?.description || '',
//     content: draft.current?.content || '',
//     coverImage: draft.current?.coverImage || '',
//   }));
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // autosave draft (excludes nothing sensitive — just form fields)
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     try {
  //       localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
  //     } catch {
  //       // storage unavailable — ignore, autosave is a convenience only
  //     }
  //   }, 500);
  //   return () => clearTimeout(timeout);
  // }, [form]);

  // const update = useCallback((field, value) => {
  //   setForm((prev) => ({ ...prev, [field]: value }));
  //   setErrors((prev) => ({ ...prev, [field]: undefined }));
  // }, []);

  // function validate() {
  //   const next = {};
  //   if (!form.title.trim()) next.title = 'Title is required.';
  //   if (!form.genre) next.genre = 'Genre is required.';

  //   const priceNum = Number(form.price);
  //   if (!form.price) {
  //     next.price = 'Price is required.';
  //   } else if (isNaN(priceNum) || priceNum <= 0) {
  //     next.price = 'Price must be greater than $0.';
  //   } else if (priceNum > MAX_PRICE) {
  //     next.price = `Price must be $${MAX_PRICE} or less.`;
  //   }

  //   if (!form.description.trim()) next.description = 'Description is required.';
  //   if (!form.content.trim()) next.content = 'Ebook content is required.';
  //   if (!form.coverImage) next.coverImage = 'A cover image is required.';

  //   setErrors(next);
  //   return Object.keys(next).length === 0;
  // }

  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   setFormError('');

  //   if (isSubmitting) return;
  //   if (!validate()) return;

  //   setIsSubmitting(true);
  //   try {
  //     await createEbook({
  //       title: form.title.trim(),
  //       genre: form.genre,
  //       price: Number(form.price),
  //       description: form.description.trim(),
  //       content: form.content,
  //       coverImage: form.coverImage,
  //       status: 'unpublished',
  //     });

  //     try {
  //       localStorage.removeItem(DRAFT_KEY);
  //     } catch {
  //       // ignore
  //     }

  //     showToast.success('Ebook created successfully.');
  //     router.push('/dashboard/writer/ebooks');
  //   } catch (err) {
  //     setFormError('Unable to create ebook. Please check your information and try again.');
  //     showToast.error('Unable to create ebook.');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // }

  return (
    <div>
      <Link
        href="/dashboard/writer/ebooks"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
      >
        <ArrowLeft size={15} />
        Back to My Ebooks
      </Link>

      <h1 className="mt-4 font-serif text-3xl font-medium text-[var(--text-primary)]">
        Create a New Ebook
      </h1>
      <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
        Turn your story into something readers can discover.
      </p>

      {formError && (
        <div
          role="alert"
          className="mt-6 rounded-input border border-red-300/50 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          {formError}
        </div>
      )}

      <form  noValidate className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[2.2fr_1fr]">
        {/* Left: main form */}
        <div className="space-y-8">
          {/* Basic information */}
          <section className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
              Basic Information
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <label className={labelClass}>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => update('title', e.target.value)}
                  placeholder="The name of your story"
                  className={`${fieldClass} ${errors.title ? 'border-red-400' : 'border-[var(--border)]'}`}
                />
                {errors.title && <p className="mt-1.5 text-xs text-red-500">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Genre</label>
                  <select
                    value={form.genre}
                    onChange={(e) => update('genre', e.target.value)}
                    className={`${fieldClass} ${errors.genre ? 'border-red-400' : 'border-[var(--border)]'}`}
                  >
                    <option value="">Select a genre</option>
                    {GENRES.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  {errors.genre && <p className="mt-1.5 text-xs text-red-500">{errors.genre}</p>}
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
                      value={form.price}
                      onChange={(e) => update('price', e.target.value)}
                      placeholder="9.99"
                      className={`${fieldClass} pl-7 ${errors.price ? 'border-red-400' : 'border-[var(--border)]'}`}
                    />
                  </div>
                  {errors.price && <p className="mt-1.5 text-xs text-red-500">{errors.price}</p>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className={labelClass}>Description</label>
                  {/* <span className="text-xs text-[var(--text-secondary)]">
                    {form.description.length}/500
                  </span> */}
                </div>
                <textarea
                  value={form.description}
                  onChange={(e) => update('description', e.target.value.slice(0, 500))}
                  placeholder="Tell readers what this story is about..."
                  rows={5}
                  className={`${fieldClass} resize-none leading-relaxed ${errors.description ? 'border-red-400' : 'border-[var(--border)]'}`}
                />
                {errors.description && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.description}</p>
                )}
              </div>
            </div>
          </section>

          {/* Ebook content */}
          <section className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-6">
            <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
              Ebook Content
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              This content becomes available to readers after successful purchase.
            </p>

            <textarea
              value={form.content}
              onChange={(e) => update('content', e.target.value)}
              placeholder="Write your story here..."
              rows={16}
              className={`mt-4 w-full rounded-input border bg-[var(--surface-alt)] px-4 py-4 font-serif text-[15px] leading-8 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 ${
                errors.content ? 'border-red-400' : 'border-[var(--border)]'
              }`}
              placeholder-loading="true"
            />
            {errors.content && <p className="mt-1.5 text-xs text-red-500">{errors.content}</p>}
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              Drafts are saved automatically on this device.
            </p>
          </section>
        </div>

        {/* Right: cover + preview */}
        <div className="space-y-6">
          <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-6">
            <CoverUploader
              value={form.coverImage}
              onChange={(url) => update('coverImage', url)}
              error={errors.coverImage}
            />
          </div>

          <CoverPreviewPanel
            coverImage={form.coverImage}
            title={form.title}
            genre={form.genre}
            price={form.price}
          />

          <button
            type="submit"
            // disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-btn bg-[var(--button-primary-bg)] px-5 py-3.5 text-sm font-semibold text-[var(--button-primary-text)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {/* {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating Ebook...
              </>
            ) : ( */}
              'Create Ebook'
            {/* )} */}
          </button>
        </div>
      </form>
    </div>
  );
}