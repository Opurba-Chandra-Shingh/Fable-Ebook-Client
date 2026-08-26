
import Link from 'next/link';
import BookCard from '../Shared/BookCard';
import { MdChevronRight } from 'react-icons/md';
import { SecondaryButton } from '../Shared/Buttons/SecondaryButton';
import ViewAll from '../Shared/Buttons/ViewAll';

const books = [
    {
        slug: 'slow-craft1',
        coverImage: '/assets/images/slow-craft.avif',
        category: 'Self Development',
        title: 'Slow Craft',
        author: 'Amara Osei',
        price: 6.99,
    },
    {
        slug: 'slow-craft2',
        coverImage: '/assets/images/slow-craft.avif',
        category: 'Self Development',
        title: 'Slow Craft',
        author: 'Amara Osei',
        price: 6.99,
    },
    {
        slug: 'slow-craft3',
        coverImage: '/assets/images/slow-craft.avif',
        category: 'Self Development',
        title: 'Slow Craft',
        author: 'Amara Osei',
        price: 6.99,
    },
    // ...more books
];

export default function LatestReleases() {

    


    return (
        <section className="bg-background">
            <div className="mx-auto max-w-content px-6 py-16 md:px-10">
                <div className="flex items-end justify-between">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                            Fresh on the Shelf
                        </span>
                        <h2 className="mt-2 font-serif text-3xl font-medium text-text-primary">
                            Latest releases
                        </h2>
                    </div>
                    <Link
                        href="/browse"
                    >

                       <ViewAll></ViewAll>

                    </Link>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
                    {books.map((book) => (
                        <BookCard key={book.slug} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
}