import { notFound, redirect } from "next/navigation";
import { getBookByID } from "@/api/books";
import { getUserSession } from "@/session/session";
import EditEbookForm from "./EditEbookForm";

export const metadata = {
  title: 'Edit Ebook — Fable',
};

export default async function EditEbookPage({ params }) {
  const { id } = await params;
  const writer = await getUserSession();

  const ebook = await getBookByID(id);
  if (!ebook || ebook.message) {
    notFound();
  }

  if (ebook.writerId !== writer.id) {
    redirect('/dashboard/writer/ebooks');
  }

  return <EditEbookForm ebook={ebook} />;
}
