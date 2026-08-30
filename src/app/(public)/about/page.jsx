import Link from 'next/link';
import { BookMarked, PenLine, Sparkles, BookOpen, ShoppingBag, BookOpenCheck } from 'lucide-react';
import PrimaryButton from '@/components/Shared/Buttons/PrimaryButton';
import { SecondaryButton } from '@/components/Shared/Buttons/SecondaryButton';
import { getAllBooks } from '@/api/books';
import { getAllWriters } from '@/api/writer';

export const metadata = {
  title: 'About — Fable',
  description: 'Fable is a curated home for original ebooks, built for readers and independent writers alike.',
};

const VALUES = [
  {
    icon: BookMarked,
    title: 'Curated, not crowded',
    description: 'Every title on Fable is read before it lands on the shelf — quality over volume.',
  },
  {
    icon: PenLine,
    title: 'Writers keep control',
    description: 'Authors set their own price, own their audience, and keep the story theirs.',
  },
  {
    icon: Sparkles,
    title: 'Built for reading',
    description: 'A calm, typographic reading experience that stays out of the way of the words.',
  },
];

const STEPS = [
  { icon: BookOpen, title: 'Discover', description: 'Browse original stories from independent writers across every genre.' },
  { icon: ShoppingBag, title: 'Purchase', description: 'Buy the stories you love with a single, secure checkout.' },
  { icon: BookOpenCheck, title: 'Read', description: 'Enjoy a calm, distraction-free reading experience — anytime, anywhere.' },
];

export default async function AboutPage() {
  const [books, writers] = await Promise.all([getAllBooks(), getAllWriters()]);
  const genreCount = new Set(books.map((b) => b.genre)).size;

  const stats = [
    { label: 'Independent writers', value: writers.length },
    { label: 'Original ebooks', value: books.length },
    { label: 'Genres represented', value: genreCount },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            About Fable
          </span>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-medium leading-tight text-text-primary sm:text-5xl">
            A premium digital library for stories worth reading.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary">
            Fable connects readers with independent writers. No algorithms chasing
            engagement, no endless feed — just original ebooks, priced fairly, and a
            reading experience built to feel like a quiet library rather than
            another app.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-background-secondary">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-8 px-6 py-12 sm:grid-cols-3 md:px-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-4xl font-medium text-text-primary">{stat.value}</p>
              <p className="mt-1.5 text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-background">
        <div className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            What we believe
          </span>
          <h2 className="mt-3 font-serif text-3xl font-medium text-text-primary">
            Why Fable exists
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-surface p-6">
                <Icon size={22} className="text-accent" strokeWidth={1.75} />
                <h3 className="mt-4 font-serif text-lg font-semibold text-text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-background-secondary">
        <div className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-24">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            How Fable works
          </span>
          <h2 className="mt-3 font-serif text-3xl font-medium text-text-primary">
            Three simple steps
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, description }, i) => (
              <div key={title} className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface">
                  <Icon size={19} className="text-accent" />
                </div>
                <span className="mt-4 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 font-serif text-lg font-semibold text-text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial quote */}
      <section className="bg-background">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center md:px-10 md:py-24">
          <p className="font-serif text-2xl italic leading-snug text-text-primary sm:text-3xl">
            &ldquo;Every story begins with someone brave enough to write the first page.&rdquo;
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-background-secondary">
        <div className="mx-auto flex max-w-content flex-col items-center gap-6 px-6 py-16 text-center md:px-10 md:py-20">
          <h2 className="max-w-xl font-serif text-3xl font-medium text-text-primary">
            Your next favorite story is waiting.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/browse">
              <PrimaryButton>Browse the library</PrimaryButton>
            </Link>
            <Link href="/register">
              <SecondaryButton>Become a writer</SecondaryButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
