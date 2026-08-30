// components/ebook/purchase-panel.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ShoppingBag } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { createCheckoutSession } from '@/action/purchases';
import { showToast } from '@/lib/toast';

export default function PurchasePanel({ ebook, isPurchased }) {


    const SessionRes = useSession();
    const user = SessionRes?.data?.user;

  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isOwner = user && user.id === ebook.writerId;
  const isAvailable = ebook.status !== 'unavailable' && ebook.status !== 'Sold';

  async function handleBuyNow() {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent(`/browse/${ebook._id}`)}`);
      return;
    }
    if (isRedirecting) return;

    setIsRedirecting(true);
    try {
      const { url, message } = await createCheckoutSession(ebook._id);
      if (!url) {
        showToast.error(message || 'Payments are not configured yet.');
        setIsRedirecting(false);
        return;
      }
      window.location.href = url; // hand off to Stripe Checkout
    } catch (err) {
      showToast.error(err?.message || 'Unable to start checkout. Please try again.');
      setIsRedirecting(false);
    }
  }

  // Not logged in
  if (!user) {
    return (
      <button
        type="button"
        onClick={handleBuyNow}
        className="w-full rounded-btn bg-[var(--button-primary-bg)] px-5 py-3.5 text-sm font-semibold text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
      >
        Login to Purchase
      </button>
    );
  }

  // Owner viewing their own book
  if (isOwner) {
    return (
      <div>
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-btn bg-[var(--border)] px-5 py-3.5 text-sm font-semibold text-[var(--text-secondary)]"
        >
          Buy Now
        </button>
        <p className="mt-2 text-center text-xs text-[var(--text-secondary)]">
          You cannot purchase your own ebook.
        </p>
      </div>
    );
  }

  // Already purchased
  if (isPurchased) {
    return (
      <div className="space-y-2.5">
        <p className="text-center text-sm font-medium text-[var(--accent)]">
          Already Purchased
        </p>
        <button
          type="button"
          onClick={() => router.push(`/read/${ebook._id}`)}
          className="w-full rounded-btn border border-[var(--border)] bg-[var(--surface)] px-5 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
        >
          Read Ebook
        </button>
      </div>
    );
  }

  // Sold / unavailable
  if (!isAvailable) {
    return (
      <button
        type="button"
        disabled
        className="w-full cursor-not-allowed rounded-btn bg-[var(--border)] px-5 py-3.5 text-sm font-semibold text-[var(--text-secondary)]"
      >
        Currently Unavailable
      </button>
    );
  }

  // Available — primary purchase CTA
  return (
    <button
      type="button"
      onClick={handleBuyNow}
      disabled={isRedirecting}
      className="flex w-full items-center justify-center gap-2 rounded-btn bg-[var(--button-primary-bg)] px-5 py-3.5 text-sm font-semibold text-[var(--button-primary-text)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isRedirecting ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Redirecting to checkout...
        </>
      ) : (
        <>
          <ShoppingBag size={16} />
          Buy Now — ${ebook.price}
        </>
      )}
    </button>
  );
}
