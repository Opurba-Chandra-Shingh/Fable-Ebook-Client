'use client';

import { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

const fieldClass =
  'rounded-input border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40';

export default function SalesToolbar({ filters, onChange, ebookOptions }) {
  const [searchValue, setSearchValue] = useState(filters.search);
  const debounceRef = useRef(null);

  function handleSearchChange(e) {
    const next = e.target.value;
    setSearchValue(next);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange({ search: next }), 300);
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
      <div className="relative w-full max-w-xs">
        <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search by ebook or buyer..."
          className={`${fieldClass} w-full pl-9 pr-8`}
        />
        {searchValue && (
          <button
            type="button"
            onClick={() => { setSearchValue(''); onChange({ search: '' }); }}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <select
        value={filters.ebook}
        onChange={(e) => onChange({ ebook: e.target.value })}
        className={fieldClass}
      >
        <option value="">All Ebooks</option>
        {ebookOptions.map((b) => (
          <option key={b.id} value={b.id}>{b.title}</option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(e) => onChange({ status: e.target.value })}
        className={fieldClass}
      >
        <option value="">All Statuses</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="refunded">Refunded</option>
      </select>

      <div className="flex items-center gap-2">
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => onChange({ startDate: e.target.value })}
          className={fieldClass}
        />
        <span className="text-xs text-[var(--text-secondary)]">to</span>
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => onChange({ endDate: e.target.value })}
          className={fieldClass}
        />
      </div>

      <select
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value })}
        className={`${fieldClass} lg:ml-auto`}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="amount_desc">Highest Amount</option>
        <option value="amount_asc">Lowest Amount</option>
      </select>
    </div>
  );
}