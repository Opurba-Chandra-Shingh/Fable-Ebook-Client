// app/dashboard/writer/ebooks/page.jsx

import { getAllBooks } from "@/api/books";
import WriterEbooksClient from "./WriterEbooksClient";
import { getUserSession } from "@/session/session";


export const metadata = {
  title: 'My Ebooks — Fable',
};

export default async function WriterEbooksPage() {

  const books = await getAllBooks();
  // console.log("Books from WriterEbooksPage: ", books);

  const user = await getUserSession();
  // console.log("User from WriterEbooksPage: ", user);

  return <WriterEbooksClient books={books} user={user}/>;
}