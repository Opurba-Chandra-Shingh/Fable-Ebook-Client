import WriterBookmarksClient from "./WriterBookmarksClient";
import { getAllBookmarkedBooks } from "@/api/bookmaks";



export const metadata = {
  title: 'Saved Stories — Fable',
};

export default async function WriterBookmarksPage() {

  const allBookmarkedBook = await getAllBookmarkedBooks();

  return <WriterBookmarksClient bookmarks={allBookmarkedBook}/>;
}
