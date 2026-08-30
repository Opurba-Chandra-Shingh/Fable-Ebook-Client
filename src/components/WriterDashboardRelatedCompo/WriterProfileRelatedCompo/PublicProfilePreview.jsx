import Link from 'next/link';

export default function PublicProfilePreview({ writerId, avatarUrl, name, bio }) {
  return (
    <div className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
        Your Public Profile
      </p>

      <div className="mt-4 flex items-start gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--background-secondary)]">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[var(--text-primary)]">
              {name?.[0]?.toUpperCase()}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-serif text-sm font-semibold text-[var(--text-primary)]">
            {name || 'Your name'}
          </p>
          <p className="mt-1 line-clamp-3 text-xs leading-relaxed text-[var(--text-secondary)]">
            {bio || 'Your bio will appear here once you add one.'}
          </p>
        </div>
      </div>

      <Link
        href={`/writers/${writerId}`}
        className="mt-5 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
      >
        View Public Profile
      </Link>
    </div>
  );
}