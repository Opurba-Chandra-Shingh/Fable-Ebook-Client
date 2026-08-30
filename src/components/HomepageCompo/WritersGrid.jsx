import Link from 'next/link';
import WriterCard from '../Shared/WriterCard';
import ViewAll from '../Shared/Buttons/ViewAll';
import { getAllWriters } from '@/api/writer';


export default async function WritersGrid() {
  const allWriters = await getAllWriters();
  const writers = allWriters.slice(0, 3);

  if (writers.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-24">
      {/* Section Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Meet the Writers
          </span>

          <h2 className="mt-2 font-serif-display text-3xl font-medium text-[var(--text-primary)]">
            Featured writers
          </h2>
        </div>

        <Link
          href="/writers"
        >
          <ViewAll></ViewAll>
        </Link>
      </div>

      {/* Writers Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {writers.map((writer) => (
          <WriterCard key={writer._id} writer={writer} />
        ))}
      </div>
    </section>
  );
}
