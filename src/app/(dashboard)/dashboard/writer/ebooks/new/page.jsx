import { getUserSession } from "@/session/session";
import AddEbookForm from "./AddEbookForm";


export const metadata = {
  title: 'Create a New Ebook — Fable',
};

export default async function AddEbookPage() {

  const writer = await getUserSession();


  return <AddEbookForm writer={writer}/>;
}