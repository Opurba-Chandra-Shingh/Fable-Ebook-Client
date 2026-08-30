import WriterCard from "@/components/Shared/WriterCard";
import { getAllWriters } from "@/api/writer";

export const metadata = {
    title: 'Writers — Fable',
    description: 'Meet the independent writers publishing original ebooks on Fable.',
};

export default async function WritersPage() {
    const writers = await getAllWriters();

    return (
        <div className="mx-auto max-w-content px-6 py-12 md:px-10 md:py-16">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                Meet the Writers
            </span>
            <h1 className="mt-3 font-serif text-4xl font-medium text-[var(--text-primary)]">
                Writers
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
                Independent writers publishing original stories on Fable.
            </p>

            {writers.length === 0 ? (
                <div className="mt-16 flex flex-col items-center text-center">
                    <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                        No writers yet.
                    </h3>
                </div>
            ) : (
                <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {writers.map((writer) => (
                        <WriterCard key={writer._id} writer={writer} />
                    ))}
                </div>
            )}
        </div>
    );
}
