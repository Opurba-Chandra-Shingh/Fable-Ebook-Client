import { getAdminTransactions } from "@/api/admin";
import AdminTransactionsClient from "./AdminTransactionsClient";

export const metadata = {
  title: 'Transactions — Fable',
};

export default async function AdminTransactionsPage() {
  const transactions = await getAdminTransactions();

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
        Transactions
      </h1>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Every purchase processed across the platform.
      </p>

      <div className="mt-6">
        <AdminTransactionsClient transactions={transactions} />
      </div>
    </div>
  );
}
