import Link from 'next/link';
import { PlusCircle, Library, LineChart } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="mt-8">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
        Quick Actions
      </h2>

      <div className="mt-3 flex flex-wrap gap-3">
        <Link
          href="/dashboard/writer/ebooks/new"
          className="flex items-center gap-2 rounded-btn bg-[var(--button-primary-bg)] px-5 py-3 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
        >
          <PlusCircle size={16} />
          Add New Ebook
        </Link>

        <Link
          href="/dashboard/writer/ebooks"
          className="flex items-center gap-2 rounded-btn border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
        >
          <Library size={16} />
          View My Ebooks
        </Link>

        <Link
          href="/dashboard/writer/sales"
          className="flex items-center gap-2 rounded-btn border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
        >
          <LineChart size={16} />
          View Sales
        </Link>
      </div>
    </div>
  );
}