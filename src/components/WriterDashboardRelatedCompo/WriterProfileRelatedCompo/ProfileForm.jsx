// components/dashboard/writer/profile/profile-form.jsx
'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

import { showToast } from '@/lib/toast';
import { updateProfile } from '@/action/users';
import AvatarUploader from './AvatarUploader';


export default function ProfileForm({ profile, onSaved, bioHint = 'This bio will appear on your public writer profile.' }) {
  const [form, setForm] = useState({
    name: profile.name || '',
    avatarUrl: profile.image || '',
    bio: profile.bio || '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = 'Full name is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    try {
      await updateProfile({
        name: form.name.trim(),
        image: form.avatarUrl,
        bio: form.bio.trim(),
      });
      showToast.success('Profile updated successfully.');
      onSaved?.(form);
    } catch {
      showToast.error('Unable to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="rounded-card border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="font-serif text-lg font-semibold text-[var(--text-primary)]">
        Profile Information
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--text-primary)]">
            Profile Picture
          </label>
          <AvatarUploader
            value={form.avatarUrl}
            onChange={(url) => update('avatarUrl', url)}
            name={form.name}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Full Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className={`w-full rounded-input border bg-[var(--surface)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40 ${
              errors.name ? 'border-red-400' : 'border-[var(--border)]'
            }`}
          />
          {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
            Short Bio
          </label>
          <textarea
            value={form.bio}
            onChange={(e) => update('bio', e.target.value.slice(0, 400))}
            rows={5}
            placeholder="Tell readers a little about yourself and your writing..."
            className="w-full resize-none rounded-input border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-sm leading-relaxed text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
          />
          <div className="mt-1.5 flex items-center justify-between">
            <p className="text-xs text-[var(--text-secondary)]">
              {bioHint}
            </p>
            <span className="text-xs text-[var(--text-secondary)]">{form.bio.length}/400</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded-btn bg-[var(--button-primary-bg)] px-5 py-3 text-sm font-semibold text-[var(--button-primary-text)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Saving...
            </>
          ) : (
            'Save Profile'
          )}
        </button>
      </form>
    </section>
  );
}
