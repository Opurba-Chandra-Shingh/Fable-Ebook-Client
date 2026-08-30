// app/dashboard/reader/bookmarks/page.jsx

import BookmarksClient from "@/components/Shared/BookmarksClient";
import { getAllBookmarkedBooks } from "@/api/bookmaks";

export const metadata = {
  title: 'Bookmarks — Fable',
};

export default async function ReaderBookmarksPage() {
  const bookmarks = await getAllBookmarkedBooks();

  return (
    <BookmarksClient
      bookmarks={bookmarks}
      heading="Bookmarks"
      description="Your reading list — stories you've saved to come back to."
    />
  );
}
