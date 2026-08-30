import Link from "next/link";
import { redirect } from "next/navigation";
import { getBookContent } from "@/api/books";
import { getUserSession } from "@/session/session";
import ReadingClient from "@/components/ReadingPageCompo/ReadingClient";

export default async function ReadingPage({ params }) {
    const { id } = await params;

    const user = await getUserSession();
    if (!user) {
        redirect(`/login?redirect=${encodeURIComponent(`/read/${id}`)}`);
    }

    const response = await getBookContent(id);

    if (!response?.bookContent) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--background)] px-6 text-center">
                <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
                    {response?.message || 'Purchase this ebook to read it.'}
                </h1>
                <Link
                    href={`/browse/${id}`}
                    className="rounded-btn bg-[var(--button-primary-bg)] px-5 py-2.5 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
                >
                    View Ebook Details
                </Link>
            </div>
        );
    }

    return (
        <ReadingClient
            ebookId={id}
            title={response.title}
            writerName={response.writerName}
            content={response.bookContent}
        />
    );
}
