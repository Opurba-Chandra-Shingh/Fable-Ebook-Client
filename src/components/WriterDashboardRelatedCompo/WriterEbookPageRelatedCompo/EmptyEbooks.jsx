// components/dashboard/writer/ebooks/empty-ebooks.jsx
import Link from 'next/link';
import { Library } from 'lucide-react';

export default function EmptyEbooks() {
  return (
    <div className="flex flex-col items-center rounded-card border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
      <Library size={32} className="text-[var(--accent)]" />
      <h2 className="mt-5 font-serif text-xl font-medium text-[var(--text-primary)]">
        Your library is empty.
      </h2>
      <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
        Create your first ebook and start sharing your stories.
      </p>
      <Link
        href="/dashboard/writer/ebooks/new"
        className="mt-6 rounded-btn bg-[var(--button-primary-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
      >
        Add Ebook
      </Link>
    </div>
  );
}