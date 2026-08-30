import Link from 'next/link';

const GENRES = [
  'Fiction',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Fantasy',
  'Horror',
  'Thriller',
  'Biography',
  'Self Development',
  'Poetry',
  'History',
  'Adventure',
];

export default function BrowseByGenre() {
  return (
    <section className="bg-background-secondary">
      <div className="mx-auto max-w-content px-6 py-16 md:px-10">

        {/* Eyebrow */}
        <span className="text-xs font-semibold uppercase tracking-wider">
          Browse by Genre
        </span>

        {/* Genre buttons */}
        <div className="mt-5 flex flex-wrap gap-3">
          {GENRES.map((genre) => (
            <Link
              key={genre}
              href={`/browse?genre=${encodeURIComponent(genre)}`}
              className="rounded-full border border-badge-border bg-badge-bg px-4 py-2 text-sm font-medium text-badge-text transition-colors hover:border-accent hover:text-accent"
            >
              {genre}
            </Link>
          ))}
        </div>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
          Fable is a curated home for original ebooks. Read from emerging
          writers, keep a shelf of your own, and support the people behind
          the words.
        </p>

      </div>
    </section>
  );
}