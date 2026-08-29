// components/dashboard/writer/ebooks/ebooks-toolbar.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

const STATUS_TABS = [
  { value: '', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'unpublished', label: 'Unpublished' },
];

export default function EbooksToolbar({ filters, onChange }) {
  const [searchValue, setSearchValue] = useState(filters.search);
  const debounceRef = useRef(null);

  // useEffect(() => setSearchValue(filters.search), [filters.search]);

  function handleSearchChange(e) {
    const next = e.target.value;
    setSearchValue(next);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange({ search: next }), 350);
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Status tabs */}
      <div className="flex gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
        {STATUS_TABS.map((tab) => {
          const isActive = filters.status === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange({ status: tab.value })}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-1 items-center gap-3 sm:justify-end">
        {/* Search */}
        <div className="relative w-full max-w-xs">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
          />
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search by title..."
            className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] py-2 pl-9 pr-8 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
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

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) => onChange({ sort: e.target.value })}
          className="rounded-input border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price">Price</option>
          <option value="sales">Sales</option>
        </select>
      </div>
    </div>
  );
}