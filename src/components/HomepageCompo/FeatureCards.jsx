import { BookMarked, PenLine, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: BookMarked,
    title: 'Curated library',
    description: 'Every title is read before it lands on the shelf.',
  },
  {
    icon: PenLine,
    title: 'Writers first',
    description:
      'Authors keep control of their work, pricing and audience.',
  },
  {
    icon: Sparkles,
    title: 'Made for reading',
    description: 'A calm, typographic reader that stays out of the way.',
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-content px-6 py-6 md:px-10 md:py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-surface p-6 hover:p-7 transition:p duration-200"
            >
              <Icon size={22} className="text-accent" strokeWidth={1.75} />

              <h3 className="mt-4 font-serif text-lg font-semibold text-text-primary">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}