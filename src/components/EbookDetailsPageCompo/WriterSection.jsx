

import { getWriterById } from '@/api/writer';
import Link from 'next/link';

export default function WriterSection({ writer }) {
  if (!writer) return null;





  return (
    <div className="mt-10 rounded-card border border-[var(--border)] bg-[var(--surface-alt)] p-5">
      <div className="flex items-center gap-4">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--background-secondary)]">
          {writer.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={writer.image}
              alt={writer.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-base font-semibold text-[var(--text-primary)]">
              {writer.name?.[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Link
            href={`/writers/${writer._id}`}
            className="font-serif text-base font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]"
          >
            {writer.name}
          </Link>
          {writer.bio && (
            <p className="mt-0.5 text-sm text-[var(--text-secondary)] line-clamp-2">
              {writer.bio}
            </p>
          )}
          {typeof writer.publishedCount === 'number' && (
            <p className="mt-1 text-xs text-[var(--text-secondary)]">
              {writer.publishedCount} published ebook
              {writer.publishedCount === 1 ? '' : 's'}
            </p>
          )}
        </div>
      </div>

      <Link
        href={`/writers/${writer._id}`}
        className="mt-4 inline-block text-sm font-medium text-[var(--accent)] hover:underline"
      >
        View Writer Profile
      </Link>
    </div>
  );
}