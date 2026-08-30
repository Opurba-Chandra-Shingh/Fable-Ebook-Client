import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { confirmPurchase } from "@/action/purchases";

export const metadata = {
    title: 'Payment Successful — Fable',
};

export default async function PaymentSuccessPage({ searchParams }) {
    const { session_id: sessionId } = await searchParams;

    let confirmed = false;
    let errorMessage = '';

    if (sessionId) {
        try {
            const result = await confirmPurchase(sessionId);
            confirmed = result.status === 'completed';
        } catch (err) {
            errorMessage = err?.message || 'Unable to confirm your payment.';
        }
    }

    if (!confirmed) {
        return (
            <div className="mx-auto flex min-h-[70vh] max-w-content flex-col items-center justify-center px-6 text-center">
                <XCircle size={48} className="text-[var(--text-secondary)]" />
                <h1 className="mt-6 font-serif text-3xl font-medium text-[var(--text-primary)]">
                    We couldn&apos;t confirm this payment.
                </h1>
                <p className="mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                    {errorMessage || 'If you were charged, please check your purchase history in a moment.'}
                </p>
                <div className="mt-8">
                    <Link
                        href="/dashboard/reader/purchases"
                        className="rounded-btn bg-[var(--button-primary-bg)] px-5 py-3 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
                    >
                        View Purchase History
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-content flex-col items-center justify-center px-6 text-center">
            <CheckCircle2 size={48} className="text-[var(--accent)]" />
            <h1 className="mt-6 font-serif text-3xl font-medium text-[var(--text-primary)]">
                Purchase successful.
            </h1>
            <p className="mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                Your ebook is ready to read. You can find it in your dashboard's purchased ebooks at any time.
            </p>
            <div className="mt-8 flex gap-3">
                <Link
                    href="/dashboard/reader/purchased"
                    className="rounded-btn bg-[var(--button-primary-bg)] px-5 py-3 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
                >
                    Go to My Ebooks
                </Link>
                <Link
                    href="/browse"
                    className="rounded-btn border border-[var(--border)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
                >
                    Keep Browsing
                </Link>
            </div>
        </div>
    );
}
