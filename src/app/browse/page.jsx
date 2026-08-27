// app/browse/page.jsx

import { getAllBooks } from "@/api/books";
import BookCard from "@/components/Shared/BookCard";


const books = [
    {
        slug: 'slow-craft',
        coverImage: '/images/books/slow-craft.jpg',
        category: 'Self Development',
        title: 'Slow Craft',
        author: 'Amara Osei',
        price: 6.99,
    },
    {
        slug: 'monsoon-interrupted',
        coverImage: '/images/books/monsoon-interrupted.jpg',
        category: 'Romance',
        title: 'Monsoon, Interrupted',
        author: 'Nadia Rahman',
        price: 7.99,
    },
    {
        slug: 'glasshouse-kingdom',
        coverImage: '/images/books/glasshouse-kingdom.jpg',
        category: 'Fantasy',
        title: 'Glasshouse Kingdom',
        author: 'Ingrid Solheim',
        price: 8.75,
    },
    {
        slug: 'the-weight-of-almost',
        coverImage: '/images/books/weight-of-almost.jpg',
        category: 'Poetry',
        title: 'The Weight of Almost',
        author: 'Rafael Duarte',
        price: 6.5,
    },
];

export const metadata = {
    title: 'Explore Ebooks — Fable',
    description:
        'Discover original stories, fresh perspectives, and unforgettable reads from independent writers.',
};

export default async function BrowsePage() {

    const books = await getAllBooks();
    // console.log("Books from Latest Ebook browse", books);

    return (
        <div className="mx-auto max-w-content px-6 py-12 md:px-10 md:py-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                The Fable Library
            </span>
            <h1 className="mt-3 font-serif text-4xl font-medium text-[var(--text-primary)]">
                Explore Ebooks
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
                Discover original stories, fresh perspectives, and unforgettable
                reads from independent writers.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
}