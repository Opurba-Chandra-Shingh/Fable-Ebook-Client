'use client';

import { useState, useRef } from 'react';
import { UploadCloud, X, RefreshCw, Loader2, ImageOff } from 'lucide-react';
import { uploadCoverImage } from '@/action/uploadCover';


const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

export default function CoverUploader({ value, onChange, error }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
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
      setUploadError(validationError);
      return;
    }

    setUploadError('');
    setIsUploading(true);
    try {
      const url = await uploadCoverImage(file);
      onChange(url);
    } catch {
      setUploadError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }

  function handleInputChange(e) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
        Ebook Cover
      </label>

      {value ? (
        <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-card border border-[var(--border)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Ebook cover preview" className="h-full w-full object-cover" />

          <div className="absolute inset-x-0 bottom-0 flex gap-2 bg-black/50 p-2 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-btn bg-white/90 px-2 py-1.5 text-xs font-medium text-[var(--text-primary)]"
            >
              <RefreshCw size={13} /> Replace
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="flex items-center justify-center rounded-btn bg-white/90 px-2 py-1.5 text-xs font-medium text-red-600"
            >
              <X size={13} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          className={`flex aspect-[3/4] w-full max-w-[220px] cursor-pointer flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed p-6 text-center transition-colors ${
            isDragging
              ? 'border-[var(--accent)] bg-[var(--accent)]/5'
              : error
              ? 'border-red-400'
              : 'border-[var(--border)] hover:border-[var(--accent)]/50'
          }`}
        >
          {isUploading ? (
            <>
              <Loader2 size={22} className="animate-spin text-[var(--accent)]" />
              <p className="text-xs text-[var(--text-secondary)]">Uploading...</p>
            </>
          ) : (
            <>
              <UploadCloud size={22} className="text-[var(--text-secondary)]" />
              <p className="text-xs font-medium text-[var(--text-primary)]">
                Drag & drop, or browse
              </p>
              <p className="text-[11px] text-[var(--text-secondary)]">
                JPG, JPEG or PNG · up to {MAX_SIZE_MB}MB
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png"
        onChange={handleInputChange}
        className="hidden"
      />

      {(uploadError || error) && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
          <ImageOff size={13} />
          {uploadError || error}
        </p>
      )}
    </div>
  );
}