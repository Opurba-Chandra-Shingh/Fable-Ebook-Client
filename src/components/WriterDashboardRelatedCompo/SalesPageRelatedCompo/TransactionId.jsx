'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function TransactionId({ id }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — silently ignore
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-btn border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
    >
      <span className="font-mono">{id.slice(0, 4)}…{id.slice(-4)}</span>
      {copied ? <Check size={12} className="text-[var(--accent)]" /> : <Copy size={12} />}
    </button>
  );
}