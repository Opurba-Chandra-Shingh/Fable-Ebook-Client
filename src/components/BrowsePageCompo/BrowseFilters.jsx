'use client';

import { useRef, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Search, X } from 'lucide-react';

const GENRES = [
  'Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Fantasy', 'Horror',
  'Thriller', 'Biography', 'Self Development', 'Poetry', 'History', 'Adventure',
];

const fieldClass =
  'rounded-input border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40';

export default function BrowseFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef(null);

  const [search, setSearch] = useState(searchParams.get('search') || '');

  function updateParams(next) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearch(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateParams({ search: value }), 400);
  }

  function handleClear() {
    setSearch('');
    router.push(pathname);
  }

  const hasActiveFilters = [...searchParams.keys()].some((key) => key !== 'page');

  return (
    <div className="flex flex-col gap-4 rounded-card border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
        <div className="relative w-full max-w-xs">
          <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by title or writer..."
            className={`${fieldClass} w-full pl-9`}
          />
        </div>

        <select
          value={searchParams.get('genre') || ''}
          onChange={(e) => updateParams({ genre: e.target.value })}
          className={fieldClass}
        >
          <option value="">All Genres</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min $"
            defaultValue={searchParams.get('minPrice') || ''}
            onBlur={(e) => updateParams({ minPrice: e.target.value })}
            className={`${fieldClass} w-24`}
          />
          <span className="text-xs text-[var(--text-secondary)]">to</span>
          <input
            type="number"
            min="0"
            placeholder="Max $"
            defaultValue={searchParams.get('maxPrice') || ''}
            onBlur={(e) => updateParams({ maxPrice: e.target.value })}
            className={`${fieldClass} w-24`}
          />
        </div>

        <select
          value={searchParams.get('availability') || ''}
          onChange={(e) => updateParams({ availability: e.target.value })}
          className={fieldClass}
        >
          <option value="">All Availability</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>

        <select
          value={searchParams.get('sort') || 'newest'}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className={`${fieldClass} lg:ml-auto`}
        >
          <option value="newest">Newest</option>
          <option value="price_asc">Price Low to High</option>
          <option value="price_desc">Price High to Low</option>
        </select>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <X size={14} /> Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
