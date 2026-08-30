import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";
import { getWriterById } from "@/api/writer";
import { getAllBooks } from "@/api/books";
import BookCard from "@/components/Shared/BookCard";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const writer = await getWriterById(id);
    if (!writer || writer.message) return { title: 'Writer — Fable' };
    return {
        title: `${writer.name} — Fable`,
        description: writer.bio?.slice(0, 160) || `Ebooks by ${writer.name} on Fable.`,
    };
}

export default async function WriterProfilePage({ params }) {
    const { id } = await params;

    const writer = await getWriterById(id);
    if (!writer || writer.message || writer.role !== 'writer') {
        notFound();
    }

    const allBooks = await getAllBooks();
    const books = allBooks.filter(
        (book) => book.writerId === writer._id && book.publishingStatus === 'published'
    );

    return (
        <div className="mx-auto max-w-content px-6 py-12 md:px-10 md:py-16">
            <div className="flex flex-col items-center gap-5 rounded-card border border-[var(--border)] bg-[var(--surface)] p-8 text-center sm:flex-row sm:text-left">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--background-secondary)]">
                    {writer.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={writer.image} alt={writer.name} className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-[var(--text-primary)]">
                            {writer.name?.[0]?.toUpperCase()}
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
                        {writer.name}
                    </h1>
                    {writer.bio && (
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
                            {writer.bio}
                        </p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--text-secondary)] sm:justify-start">
                        <span>
                            <span className="font-semibold text-[var(--text-primary)]">{writer.publishedCount ?? books.length}</span> published ebooks
                        </span>
                        {typeof writer.salesCount === 'number' && (
                            <span>
                                <span className="font-semibold text-[var(--text-primary)]">{writer.salesCount}</span> total sales
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <h2 className="mt-12 font-serif text-2xl font-medium text-[var(--text-primary)]">
                Books by {writer.name}
            </h2>

            {books.length === 0 ? (
                <div className="mt-8 flex flex-col items-center rounded-card border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
                    <BookOpen size={32} className="text-[var(--accent)]" />
                    <p className="mt-4 text-sm text-[var(--text-secondary)]">
                        No published stories yet.
                    </p>
                </div>
            ) : (
                <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
}
