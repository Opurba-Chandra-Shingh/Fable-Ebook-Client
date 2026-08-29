// components/dashboard/writer/ebooks/delete-confirm-dialog.jsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export default function DeleteConfirmDialog({ ebook, isDeleting, onCancel, onConfirm }) {
  return (
    <AnimatePresence>
      {ebook && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-50 bg-black/40"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.18 }}
            role="alertdialog"
            aria-modal="true"
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-dialog border border-[var(--border)] bg-[var(--surface)] p-6"
          >
            <h3 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
              Delete this ebook?
            </h3>
            <p className="mt-2 text-sm text-[var(--text-secondary)]">
              Are you sure you want to permanently delete{' '}
              <span className="font-medium text-[var(--text-primary)]">
                &ldquo;{ebook.title}&rdquo;
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={isDeleting}
                className="flex-1 rounded-btn border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-btn bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {isDeleting ? <Loader2 size={15} className="animate-spin" /> : null}
                Delete Ebook
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}