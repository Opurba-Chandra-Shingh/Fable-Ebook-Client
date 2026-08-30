// components/dashboard/admin/users/admin-users-client.jsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Trash2 } from 'lucide-react';
import { showToast } from '@/lib/toast';
import { deleteUserAdmin, updateUserRole } from '@/action/admin';

const ROLES = ['reader', 'writer', 'admin'];

export default function AdminUsersClient({ users: initialUsers, currentUserId }) {
  const [users, setUsers] = useState(initialUsers);
  const [updatingId, setUpdatingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleRoleChange(user, role) {
    if (role === user.role) return;

    setUpdatingId(user._id);
    try {
      await updateUserRole(user._id, role);
      setUsers((prev) => prev.map((u) => (u._id === user._id ? { ...u, role } : u)));
      showToast.success('Role updated.');
    } catch (error) {
      showToast.error(error?.message || 'Unable to update role.');
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      await deleteUserAdmin(deleteTarget._id);
      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
      showToast.success('User deleted.');
      setDeleteTarget(null);
    } catch (error) {
      showToast.error(error?.message || 'Unable to delete user.');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <div className="hidden overflow-x-auto rounded-card border border-[var(--border)] bg-[var(--surface)] md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-xs uppercase tracking-wide text-[var(--text-secondary)]">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Email</th>
              <th className="px-3 py-3 font-medium">Role</th>
              <th className="px-3 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-[var(--border)] last:border-0">
                <td className="px-5 py-3 font-medium text-[var(--text-primary)]">{user.name}</td>
                <td className="px-3 py-3 text-[var(--text-secondary)]">{user.email}</td>
                <td className="px-3 py-3">
                  <select
                    value={user.role}
                    disabled={updatingId === user._id || user._id === currentUserId}
                    onChange={(e) => handleRoleChange(user, e.target.value)}
                    className="rounded-input border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs capitalize text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 disabled:opacity-50"
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-3 text-[var(--text-secondary)]">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-5 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(user)}
                    disabled={user._id === currentUserId}
                    className="rounded-btn p-2 text-red-500 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Delete user"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteTarget(null)}
              className="fixed inset-0 z-50 bg-black/40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-dialog border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <h3 className="font-serif text-lg font-semibold text-[var(--text-primary)]">Delete this user?</h3>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                This will permanently remove <span className="font-medium text-[var(--text-primary)]">{deleteTarget.name}</span>. This action cannot be undone.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={isDeleting}
                  className="flex-1 rounded-btn border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--background-secondary)] disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex flex-1 items-center justify-center gap-2 rounded-btn bg-red-600 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                >
                  {isDeleting ? <Loader2 size={15} className="animate-spin" /> : null}
                  Delete User
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
