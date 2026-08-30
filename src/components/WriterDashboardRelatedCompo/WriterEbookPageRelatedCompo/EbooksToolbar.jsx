'use client';

import { Search, X } from 'lucide-react';

const STATUS_TABS = [
  { value: '', label: 'All' },
  { value: 'published', label: 'Published' },
  { value: 'unpublished', label: 'Unpublished' },
];

export default function EbooksToolbar({ filters, onChange }) {

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1">
        {STATUS_TABS.map((tab) => {
          const isActive = filters.status === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange({status:tab.value})}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${isActive
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
        <div className="relative w-full max-w-xs">
          <Search
            size={15}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
          />
          <input
            type="text"
            onChange={(e)=>onChange({search:e.target.value})}
            placeholder="Search by title..."
            className="w-full rounded-input border border-[var(--border)] bg-[var(--surface)] py-2 pl-9 pr-8 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          />
        </div>

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