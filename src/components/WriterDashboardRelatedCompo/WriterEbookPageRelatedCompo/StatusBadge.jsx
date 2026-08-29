// components/dashboard/writer/ebooks/status-badge.jsx
export default function StatusBadge({ status }) {
  const isPublished = status === 'published';
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-medium ${
        isPublished
          ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
          : 'bg-[var(--badge-bg)] text-[var(--badge-text)]'
      }`}
    >
      {isPublished ? 'Published' : 'Unpublished'}
    </span>
  );
}