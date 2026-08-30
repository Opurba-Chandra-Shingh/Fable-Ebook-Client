import { getAllBooks } from "@/api/books";
import WriterEbooksClient from "./WriterEbooksClient";
import { getUserSession } from "@/session/session";


export const metadata = {
  title: 'My Ebooks — Fable',
};

export default async function WriterEbooksPage() {
  const books = await getAllBooks();
  const user = await getUserSession();

  return <WriterEbooksClient books={books} user={user}/>;
}
