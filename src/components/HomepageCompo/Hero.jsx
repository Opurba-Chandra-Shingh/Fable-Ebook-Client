import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import HeroImg from '../../../public/assets/images/hero-reading.jpg'
import PrimaryButton from '../Shared/Buttons/PrimaryButton';
import { SecondaryButton } from '../Shared/Buttons/SecondaryButton';

export default function Hero() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-content px-6 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: text content */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Independent Publishing
            </span>

            <h1 className="mt-4 font-serif text-4xl font-medium leading-tight text-text-primary sm:text-5xl md:text-[3.25rem]">
              Discover stories worth
              <br />
              reading.
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary">
              Fable is a curated home for original ebooks. Read from emerging
              writers, keep a shelf of your own, and support the people
              behind the words.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/browse"
              >
                <PrimaryButton className='flex items-center'>
                  Browse the library
                  <ArrowRight size={16} />
                </PrimaryButton>
              </Link>

              <Link
                href="/write"
              >
                <SecondaryButton>
                  Start writing
                </SecondaryButton>
              </Link>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-card border border-border rounded-2xl">
              <Image
                src={HeroImg}
                alt="Stack of books beside an e-reader"
                className="h-full w-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}