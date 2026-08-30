'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PurchasePanel from '@/components/EbookDetailsPageCompo/PurchasePanel';
import BookmarkButton from '@/components/EbookDetailsPageCompo/BookmarkButton';
import WriterSection from '@/components/EbookDetailsPageCompo/WriterSection';
import RelatedEbooks from '@/components/EbookDetailsPageCompo/RelatedEbooks';
import { useRouter } from 'next/navigation';


export default function EbookDetailsView({ ebook, writer, relatedBooks, currentUser, bookmarkedBooks, isPurchased}) {
  const [coverFailed, setCoverFailed] = useState(false);
  const isAvailable = ebook.status !== 'unavailable' && ebook.status !== 'sold';

  const router = useRouter();




  return (
    <div className="mx-auto max-w-content px-6 py-12 pb-28 md:px-10 md:py-16 lg:pb-16">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
        {/* Cover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="group aspect-[3/4] w-full overflow-hidden rounded-card border border-[var(--border)] shadow-subtle">
            {ebook.coverImage && !coverFailed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ebook.coverImage}
                alt={`Cover of ${ebook.title}`}
                onError={() => setCoverFailed(true)}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[var(--background-secondary)] px-6 text-center">
                <span className="font-serif text-lg text-[var(--text-primary)]">
                  {ebook.title}
                </span>
                <span className="text-xs text-[var(--text-secondary)]">
                  Cover unavailable
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-2.5 py-1 text-[11px] font-medium text-[var(--badge-text)]">
            {ebook.genre}
          </span>

          <h1 className="mt-4 font-serif text-3xl font-medium leading-tight text-[var(--text-primary)] md:text-4xl">
            {ebook.title}
          </h1>

          <Link
            href={`/writers/${ebook.writerId}`}
            className="mt-2 inline-block text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)]"
          >
            by {ebook.writerName}
          </Link>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
            className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[var(--text-secondary)]"
          >
            <motion.div
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              className="flex items-center gap-1.5"
            >
              <dt className="sr-only">Price</dt>
              <dd className="text-lg font-semibold text-[var(--text-primary)]">
                ${ebook.price}
              </dd>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
              <dt className="sr-only">Availability</dt>
              <dd>{isAvailable ? 'Available' : 'Unavailable'}</dd>
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
              <dt className="sr-only">Uploaded</dt>
              <dd>
                Uploaded{' '}
                {new Date(ebook.uploadedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </dd>
            </motion.div>
          </motion.dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:max-w-md">
            <div className="flex-1">
              <PurchasePanel ebook={ebook} isPurchased={isPurchased} />
            </div>
            <BookmarkButton
              ebook={ebook}
              currentUser={currentUser}
              bookmarkedBooks={bookmarkedBooks}
            />
          </div>

          <WriterSection writer={writer} />
        </motion.div>
      </div>

      {/* About this book */}
      <section className="mt-14 max-w-2xl">
        <h2 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
          About this book
        </h2>
        <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-[var(--text-secondary)]">
          {ebook.description}
        </p>
      </section>

      <RelatedEbooks relatedBooks={relatedBooks} />

      {/* Mobile sticky purchase bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border)] bg-[var(--surface)]/95 p-4 backdrop-blur lg:hidden">
        <PurchasePanel ebook={ebook} isPurchased={isPurchased} />
      </div>
    </div>
  );
}