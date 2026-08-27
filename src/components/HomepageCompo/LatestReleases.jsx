
import Link from 'next/link';
import BookCard from '../Shared/BookCard';
import { MdChevronRight } from 'react-icons/md';
import { SecondaryButton } from '../Shared/Buttons/SecondaryButton';
import ViewAll from '../Shared/Buttons/ViewAll';
import { getAllBooks } from '@/api/books';



export default async function LatestReleases() {

    const books = await getAllBooks();
    // console.log("Books from Latest Release", books);


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
                    {books.slice(0, 4).map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            </div>
        </section>
    );
}