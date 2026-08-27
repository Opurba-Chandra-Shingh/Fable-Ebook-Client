import Image from 'next/image';
import Link from 'next/link';

export default function BookCard({ book }) {
  const { _id, coverImage, genre, title, author, price } = book;

  return (
    <Link
      href={`/browse/${_id}`}
      className="group block overflow-hidden rounded-card border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:shadow-subtle rounded-2xl"
    >
      {/* Cover image */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-background-secondary">
        {coverImage ? (
          
          <img
            src={coverImage}
            alt={`Cover of ${title}`}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-3 text-center text-xs text-text-secondary">
            Cover of {title}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="inline-block rounded-full border border-badge-border bg-badge-bg px-2.5 py-1 text-[11px] font-medium text-badge-text">
          {genre}
        </span>

        <h3 className="mt-3 font-serif text-base font-semibold leading-snug text-text-primary line-clamp-1">
          {title}
        </h3>

        <p className="mt-1 text-sm text-text-secondary line-clamp-1">
          {author}
        </p>

        <p className="mt-2 text-sm font-semibold text-text-primary">
          ${price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}