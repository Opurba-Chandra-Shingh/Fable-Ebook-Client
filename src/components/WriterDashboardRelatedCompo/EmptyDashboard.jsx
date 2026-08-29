// components/dashboard/writer/empty-dashboard.jsx
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function EmptyDashboard() {
  return (
    <div className="flex flex-col items-center rounded-card border border-[var(--border)] bg-[var(--surface)] px-6 py-20 text-center">
      <BookOpen size={36} className="text-[var(--accent)]" />
      <h2 className="mt-5 font-serif text-2xl font-medium text-[var(--text-primary)]">
        Your writing journey starts here.
      </h2>
      <p className="mt-2 max-w-sm text-sm text-[var(--text-secondary)]">
        Create your first ebook and share your story with Fable readers.
      </p>
      <Link
        href="/dashboard/writer/ebooks/new"
        className="mt-6 rounded-btn bg-[var(--button-primary-bg)] px-5 py-3 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
      >
        Create Your First Ebook
      </Link>
    </div>
  );
}