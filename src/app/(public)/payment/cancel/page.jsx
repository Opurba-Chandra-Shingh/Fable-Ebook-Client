import Link from "next/link";
import { XCircle } from "lucide-react";

export const metadata = {
    title: 'Payment Cancelled — Fable',
};

export default function PaymentCancelPage() {
    return (
        <div className="mx-auto flex min-h-[70vh] max-w-content flex-col items-center justify-center px-6 text-center">
            <XCircle size={48} className="text-[var(--text-secondary)]" />
            <h1 className="mt-6 font-serif text-3xl font-medium text-[var(--text-primary)]">
                Payment cancelled.
            </h1>
            <p className="mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                No charge was made. You can try again whenever you're ready.
            </p>
            <div className="mt-8">
                <Link
                    href="/browse"
                    className="rounded-btn bg-[var(--button-primary-bg)] px-5 py-3 text-sm font-medium text-[var(--button-primary-text)] transition-opacity hover:opacity-90"
                >
                    Back to Browse
                </Link>
            </div>
        </div>
    );
}
