import { getAllBooks } from "@/api/books";
import AdminEbooksClient from "./AdminEbooksClient";

export const metadata = {
  title: 'Manage Ebooks — Fable',
};

export default async function AdminEbooksPage() {
  const books = await getAllBooks();

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
        Ebooks
      </h1>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Manage every ebook published on Fable.
      </p>

      <div className="mt-6">
        <AdminEbooksClient books={books} />
      </div>
    </div>
  );
}
