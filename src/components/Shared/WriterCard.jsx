import Link from 'next/link';
import { BookOpen, Users } from 'lucide-react';

export default function WriterCard({ writer }) {
  const { slug, avatar, name, bio, booksCount, followers } = writer;

  return (
    <Link
      href={`/writers/${slug}`}
      className="group block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-subtle"
    >
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--background-secondary)]">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-[var(--text-primary)]">
              {name?.[0]?.toUpperCase()}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="font-serif text-lg font-semibold text-[var(--text-primary)] line-clamp-1">
            {name}
          </h3>
          <p className="mt-0.5 text-sm text-[var(--text-secondary)] line-clamp-1">
            {bio}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-5 border-t border-[var(--border)] pt-4">
        <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
          <BookOpen size={15} className="text-[var(--accent)]" />
          <span className="font-medium text-[var(--text-primary)]">
            {booksCount}
          </span>
          books
        </div>

        <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
          <Users size={15} className="text-[var(--accent)]" />
          <span className="font-medium text-[var(--text-primary)]">
            {followers}
          </span>
          followers
        </div>
      </div>
    </Link>
  );
}