// components/dashboard/writer/profile/avatar-uploader.jsx
'use client';

import { useState, useRef } from 'react';
import { Camera, X, Loader2, ImageOff } from 'lucide-react';
import { uploadCoverImage } from '@/action/uploadCover';

const MAX_SIZE_MB = 3;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export default function AvatarUploader({ value, onChange, name }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  function validateFile(file) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Only JPG, JPEG, and PNG files are supported.';
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `Image must be smaller than ${MAX_SIZE_MB}MB.`;
    }
    return '';
  }

  async function handleFile(file) {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsUploading(true);
    try {
      const url = await uploadCoverImage(file);
      onChange(url);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  return (
    <div className="flex items-center gap-5">
      <div className="relative h-20 w-20 shrink-0">
        <div className="h-20 w-20 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--background-secondary)]">
          {isUploading ? (
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 size={20} className="animate-spin text-[var(--accent)]" />
            </div>
          ) : value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="Profile picture" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-[var(--text-primary)]">
              {name?.[0]?.toUpperCase() || 'W'}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          aria-label="Change profile picture"
          className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] shadow-subtle transition-colors hover:bg-[var(--background-secondary)]"
        >
          <Camera size={13} />
        </button>
      </div>

      <div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-btn border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
          >
            {value ? 'Replace photo' : 'Upload photo'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="flex items-center gap-1 rounded-btn border border-[var(--border)] px-3.5 py-2 text-xs font-medium text-red-500 transition-colors hover:bg-red-500/10"
            >
              <X size={13} /> Remove
            </button>
          )}
        </div>
        <p className="mt-1.5 text-[11px] text-[var(--text-secondary)]">
          JPG, JPEG or PNG · up to {MAX_SIZE_MB}MB
        </p>
        {error && (
          <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
            <ImageOff size={12} /> {error}
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}