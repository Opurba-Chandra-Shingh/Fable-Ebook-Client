// components/dashboard/writer/ebooks/new/add-ebook-form.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { showToast } from '@/lib/toast';
import CoverUploader from '@/components/WriterDashboardRelatedCompo/AddEbookPageRelatedCompo/CoverUploader';
import CoverPreviewPanel from '@/components/WriterDashboardRelatedCompo/AddEbookPageRelatedCompo/CoverPreviewPanel';
import { postBook } from '@/action/books';


const GENRES = [
  'Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Fantasy', 'Horror',
  'Thriller', 'Biography', 'Self Development', 'Poetry', 'History', 'Adventure',
];

const MAX_PRICE = 500;


const fieldClass =
  'w-full rounded-input border bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40';

const labelClass = 'mb-1.5 block text-sm font-medium text-[var(--text-primary)]';



export default function AddEbookForm({writer}) {

  const router = useRouter();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);



  const hndlSubmit = async(e) => {
    e.preventDefault();

    const newbook = {
      title,
      genre,
      price: Number(price),
      description,
      bookContent,
      coverImage,
      writerId:writer.id,
      uploadedAt:new Date(),
      publishingStatus:"unpublished",
      status: "Available"

    }

    setIsSubmitting(true);

    try{
      const response = await postBook(newbook);

      if(response.insertedId){
        showToast.success('Ebook created successfully.');
        router.push('/dashboard/writer/ebooks');
      }
    }
    catch{
      setFormError('Unable to create ebook. Please try again.');
      showToast.error('Unable to create ebook.');
    }
    finally{
      setIsSubmitting(false);
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

      <form onSubmit={hndlSubmit} noValidate className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[2.2fr_1fr]">
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
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The name of your story"
                  className={`${fieldClass} ${errors.title ? 'border-red-400' : 'border-[var(--border)]'}`}
                />
                {errors.title && <p className="mt-1.5 text-xs text-red-500">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Genre</label>
                  <select
                    name="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
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
                      name="price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                </div>
                <textarea
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
              name='bookContent'
              value={bookContent}
              onChange={(e) => setBookContent(e.target.value)}
              placeholder="Write your story here..."
              rows={16}
              className={`mt-4 w-full rounded-input border bg-[var(--surface-alt)] px-4 py-4 font-serif text-[15px] leading-8 text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 ${errors.content ? 'border-red-400' : 'border-[var(--border)]'
                }`}
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
              value={coverImage}
              onChange={(url) => setCoverImage(url)}
              error={errors.coverImage}
            />
          </div>

          <CoverPreviewPanel
            coverImage={coverImage}
            title={title}
            genre={genre}
            price={price}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-btn bg-[var(--button-primary-bg)] px-5 py-3.5 text-sm font-semibold text-[var(--button-primary-text)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Creating Ebook...
              </>
            ) : (
              'Create Ebook'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
