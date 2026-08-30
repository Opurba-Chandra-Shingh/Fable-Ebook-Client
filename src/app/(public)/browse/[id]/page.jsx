// app/ebooks/[id]/page.jsx

import { getBookByID, getRelatedBooksByGenre } from "@/api/books";
import EbookDetailsView from "./EbookDetailsView";
import { getWriterById } from "@/api/writer";
import { getUserSession } from "@/session/session";
import { getAllBookmarkedBooks } from "@/api/bookmaks";
import { getMyPurchases } from "@/api/purchases";


export async function generateMetadata({ params }) {
    try {
        const { id } = await params;
        const ebook = await getBookByID(id);
        if (!ebook || ebook.message) return { title: 'Ebook — Fable' };
        return {
            title: `${ebook.title} — Fable`,
            description: ebook.description?.slice(0, 160),
            openGraph: {
                title: ebook.title,
                description: ebook.description?.slice(0, 160),
                images: ebook.coverImage ? [ebook.coverImage] : [],
            },
        };
    } catch {
        return { title: 'Ebook — Fable' };
    }
}

export default async function EbookDetailsPage({ params }) {

    const currentUser = await getUserSession();

    const { id } = await params;

    const ebook = await getBookByID(id);

    const writer = await getWriterById(ebook.writerId);

    const relatedBooks = await getRelatedBooksByGenre(ebook.genre);

    const bookmarkedBooks = currentUser ? await getAllBookmarkedBooks() : [];

    const purchases = currentUser ? await getMyPurchases() : [];
    const isPurchased = purchases.some(
        (purchase) => purchase.ebookId === ebook._id && purchase.status === 'completed'
    );


    return (
        <EbookDetailsView
            ebook={ebook}
            writer={writer}
            relatedBooks={relatedBooks.filter((b) => b._id !== ebook._id)}
            currentUser={currentUser}
            bookmarkedBooks={bookmarkedBooks}
            isPurchased={isPurchased}
        />
    );
}
