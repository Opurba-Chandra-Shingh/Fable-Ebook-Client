import Link from 'next/link';
import { Bookmark } from 'lucide-react';

export default function BookmarksEmpty() {
  return (
    <div className="flex flex-col items-center rounded-card border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
      <Bookmark size={32} className="text-[var(--accent)]" />
      <h2 className="mt-5 font-serif text-xl font-medium text-[var(--text-primary)]">
        Nothing saved yet.
      </h2>
      <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
        Bookmark stories you want to return to later.
      </p>
      <Link
        href="/browse"
        className="mt-6 rounded-btn bg-[var(--button-primary-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
      >
        Explore Ebooks
      </Link>
    </div>
  );
}