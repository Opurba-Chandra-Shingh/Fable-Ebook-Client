'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { showToast } from '@/lib/toast';
import { authClient } from '@/lib/auth-client';

const fieldClass =
  'w-full rounded-input border bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40';

export default function ChangePasswordSection() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.currentPassword) next.currentPassword = 'Current password is required.';
    if (!form.newPassword || form.newPassword.length < 8) {
      next.newPassword = 'New password must be at least 8 characters.';
    }
    if (form.newPassword !== form.confirmPassword) {
      next.confirmPassword = 'Passwords do not match.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    try {
      const { error } = await authClient.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        throw new Error(error.message, { cause: error.code });
      }

      showToast.success('Password updated successfully.');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      if (err?.cause === 'INVALID_PASSWORD') {
        setErrors({ currentPassword: 'Current password is incorrect.' });
      } else {
        showToast.error('Unable to update password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
        Account Security
      </h2>
      <p className="mt-1 text-sm text-[var(--text-secondary)]">
        Update your password to keep your account secure.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Current password
          </label>
          <input
            type="password"
            value={form.currentPassword}
            onChange={(e) => update('currentPassword', e.target.value)}
            className={`${fieldClass} ${errors.currentPassword ? 'border-red-400' : 'border-[var(--border)]'}`}
          />
          {errors.currentPassword && (
            <p className="mt-1.5 text-xs text-red-500">{errors.currentPassword}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
              New password
            </label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => update('newPassword', e.target.value)}
              className={`${fieldClass} ${errors.newPassword ? 'border-red-400' : 'border-[var(--border)]'}`}
            />
            {errors.newPassword && (
              <p className="mt-1.5 text-xs text-red-500">{errors.newPassword}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
              Confirm new password
            </label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => update('confirmPassword', e.target.value)}
              className={`${fieldClass} ${errors.confirmPassword ? 'border-red-400' : 'border-[var(--border)]'}`}
            />
            {errors.confirmPassword && (
              <p className="mt-1.5 text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded-btn border border-[var(--border)] bg-[var(--surface-alt)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : null}
          Change Password
        </button>
      </form>
    </section>
  );
}