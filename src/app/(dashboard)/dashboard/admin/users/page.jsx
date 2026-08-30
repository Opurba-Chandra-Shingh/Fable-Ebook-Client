import { getAllUsersAdmin } from "@/api/admin";
import { getUserSession } from "@/session/session";
import AdminUsersClient from "./AdminUsersClient";

export const metadata = {
  title: 'Manage Users — Fable',
};

export default async function AdminUsersPage() {
  const [users, currentUser] = await Promise.all([getAllUsersAdmin(), getUserSession()]);

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
        Users
      </h1>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Manage roles and accounts across the platform.
      </p>

      <div className="mt-6">
        <AdminUsersClient users={users} currentUserId={currentUser.id} />
      </div>
    </div>
  );
}
