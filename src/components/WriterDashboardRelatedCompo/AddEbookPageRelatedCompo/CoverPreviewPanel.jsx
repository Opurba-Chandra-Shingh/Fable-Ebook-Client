// components/dashboard/writer/ebooks/new/cover-preview-panel.jsx
export default function CoverPreviewPanel({ coverImage, title, genre, price }) {
  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
        Preview
      </p>

      <div className="mt-3 aspect-[3/4] w-full overflow-hidden rounded-card border border-[var(--border)] bg-[var(--background-secondary)]">
        {coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverImage} alt="Cover preview" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="font-serif text-sm text-[var(--text-secondary)]">
              Your cover will appear here.
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <p className="truncate font-serif text-base font-semibold text-[var(--text-primary)]">
          {title || 'Untitled ebook'}
        </p>
        <p className="text-xs text-[var(--text-secondary)]">
          {genre || 'No genre selected'}
        </p>
        <p className="text-sm font-semibold text-[var(--text-primary)]">
          {price ? `$${Number(price).toFixed(2)}` : '$0.00'}
        </p>
      </div>

      <div className="mt-5 rounded-btn border border-[var(--border)] bg-[var(--background-secondary)] p-3">
        <p className="text-xs font-semibold text-[var(--text-primary)]">
          Publishing status: Unpublished
        </p>
        <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
          Your ebook will remain unpublished until you choose to publish it.
        </p>
      </div>
    </div>
  );
}