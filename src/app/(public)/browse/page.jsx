// app/browse/page.jsx

import { searchBooks } from "@/api/books";
import BookCard from "@/components/Shared/BookCard";
import BrowseFilters from "@/components/BrowsePageCompo/BrowseFilters";
import BrowsePagination from "@/components/BrowsePageCompo/BrowsePagination";

export const metadata = {
    title: 'Explore Ebooks — Fable',
    description:
        'Discover original stories, fresh perspectives, and unforgettable reads from independent writers.',
};

export default async function BrowsePage({ searchParams }) {

    const params = await searchParams;
    const { data: books, total, page, totalPages } = await searchBooks(params);

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

            <div className="mt-8">
                <BrowseFilters />
            </div>

            {books.length === 0 ? (
                <div className="mt-16 flex flex-col items-center text-center">
                    <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                        No stories found.
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                        Try adjusting your search or filters.
                    </p>
                </div>
            ) : (
                <>
                    <p className="mt-6 text-sm text-[var(--text-secondary)]">
                        {total} {total === 1 ? 'story' : 'stories'} found
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {books.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                    <BrowsePagination page={page} totalPages={totalPages} searchParams={params} />
                </>
            )}
        </div>
    );
}
