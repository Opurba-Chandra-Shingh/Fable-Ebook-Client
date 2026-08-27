// app/ebooks/[id]/page.jsx

import { getBookByID, getRelatedBooksByGenre } from "@/api/books";
import EbookDetailsView from "./EbookDetailsView";
import { getWriterById } from "@/api/writer";






// export async function generateMetadata({ params }) {
//     try {
//         const { id } = await params;
//         const { ebook, notFound: isNotFound } = await getBookByID(id);
//         if (isNotFound || !ebook) return { title: 'Ebook — Fable' };
//         return {
//             title: `${ebook.title} — Fable`,
//             description: ebook.description?.slice(0, 160),
//         };
//     } catch {
//         return { title: 'Ebook — Fable' };
//     }
// }

export default async function EbookDetailsPage({ params }) {

    const { id } = await params;
    // console.log("id from details page: ", id);

    const ebook = await getBookByID(id);
    // console.log("Book from details page: ", ebook);

    // return <></>;

    // console.log("Writer from details page: ", ebook.writerId);
    const writer = await getWriterById(ebook.writerId);
    // console.log("Writer from details page: ", writer);
    // const writer = null;

    // console.log("Writer from details page: ", ebook.genre);
    const relatedBooks = await getRelatedBooksByGenre(ebook.genre);
    // console.log("Related books from details page: ", relatedBooks);


    return <EbookDetailsView ebook={ebook} writer={writer} relatedBooks={relatedBooks}/>;
}