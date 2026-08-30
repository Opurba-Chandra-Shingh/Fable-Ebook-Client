import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function BrowsePagination({ page, totalPages, searchParams }) {
  if (totalPages <= 1) return null;

  function hrefFor(targetPage) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(targetPage));
    return `/browse?${params.toString()}`;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-2">
      <Link
        href={hrefFor(Math.max(1, page - 1))}
        aria-disabled={page === 1}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)] ${
          page === 1 ? 'pointer-events-none opacity-40' : ''
        }`}
      >
        <ChevronLeft size={16} />
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={hrefFor(p)}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
            p === page
              ? 'bg-[var(--accent)] text-white'
              : 'text-[var(--text-primary)] hover:bg-[var(--background-secondary)]'
          }`}
        >
          {p}
        </Link>
      ))}

      <Link
        href={hrefFor(Math.min(totalPages, page + 1))}
        aria-disabled={page === totalPages}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)] ${
          page === totalPages ? 'pointer-events-none opacity-40' : ''
        }`}
      >
        <ChevronRight size={16} />
      </Link>
    </nav>
  );
}
