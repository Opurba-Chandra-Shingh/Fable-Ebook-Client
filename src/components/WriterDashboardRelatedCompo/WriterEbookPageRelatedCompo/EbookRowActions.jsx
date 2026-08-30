// components/dashboard/writer/ebooks/ebook-row-actions.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MoreVertical, Eye, Pencil, BookOpenCheck, BookX, Trash2, Loader2 } from 'lucide-react';

export default function EbookRowActions({ ebook, onTogglePublish, onDelete, isUpdating }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const isPublished = ebook.publishingStatus === 'published';

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Ebook actions"
        disabled={isUpdating}
        className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--background-secondary)] disabled:opacity-50"
      >
        {isUpdating ? <Loader2 size={16} className="animate-spin" /> : <MoreVertical size={16} />}
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-20 w-44 rounded-card border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-subtle">
          <button
            type="button"
            onClick={() => { setOpen(false); router.push(`/browse/${ebook._id}`); }}
            className="flex w-full items-center gap-2 rounded-btn px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--background-secondary)]"
          >
            <Eye size={15} /> View
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); router.push(`/dashboard/writer/ebooks/${ebook._id}/edit`); }}
            className="flex w-full items-center gap-2 rounded-btn px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--background-secondary)]"
          >
            <Pencil size={15} /> Edit
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onTogglePublish(ebook); }}
            className="flex w-full items-center gap-2 rounded-btn px-3 py-2 text-left text-sm text-[var(--text-primary)] hover:bg-[var(--background-secondary)]"
          >
            {isPublished ? <BookX size={15} /> : <BookOpenCheck size={15} />}
            {isPublished ? 'Unpublish' : 'Publish'}
          </button>
          <div className="my-1 h-px bg-[var(--border)]" />
          <button
            type="button"
            onClick={() => { setOpen(false); onDelete(ebook); }}
            className="flex w-full items-center gap-2 rounded-btn px-3 py-2 text-left text-sm text-red-500 hover:bg-red-500/10"
          >
            <Trash2 size={15} /> Delete
          </button>
        </div>
      )}
    </div>
  );
}