'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ReadingClient({ ebookId, title, writerName, content }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? Math.min(100, (doc.scrollTop / scrollable) * 100) : 0);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="fixed inset-x-0 top-0 z-40 h-1 bg-[var(--border)]">
        <div
          className="h-full bg-[var(--accent)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <header className="sticky top-1 z-30 border-b border-[var(--border)] bg-[var(--background)]/95 px-6 py-4 backdrop-blur md:px-10">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link
            href={`/browse/${ebookId}`}
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
          >
            <ArrowLeft size={15} />
            Back to library
          </Link>
          <div className="text-right">
            <p className="font-serif text-sm font-semibold text-[var(--text-primary)]">{title}</p>
            <p className="text-xs text-[var(--text-secondary)]">by {writerName}</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-14 md:px-0">
        <h1 className="font-serif text-3xl font-medium text-[var(--text-primary)]">{title}</h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">by {writerName}</p>

        <article className="mt-10 whitespace-pre-line font-serif text-[17px] leading-9 text-[var(--text-primary)]">
          {content}
        </article>

        <div className="mt-16 border-t border-[var(--border)] pt-8 text-center">
          <Link
            href="/browse"
            className="inline-flex items-center gap-1.5 rounded-btn border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
          >
            <ArrowLeft size={15} />
            Back to library
          </Link>
        </div>
      </main>
    </div>
  );
}
