// app/register/page.jsx

import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Create account — Fable',
  description: 'Join Fable as a reader or share your own stories with the world.',
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen bg-[var(--background)]">
      {/* Left: editorial visual — desktop only */}
      <div className="relative hidden w-1/2 overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-[var(--background-secondary)]" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />

        <div className="relative z-10 flex w-full flex-col justify-between p-14">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen size={22} className="text-[var(--accent)]" />
            <span className="font-serif text-xl font-semibold text-[var(--text-primary)]">
              Fable
            </span>
          </Link>

          <div className="max-w-md">
            <svg width="220" height="140" viewBox="0 0 220 140" fill="none" className="mb-10 text-[var(--text-primary)]">
              <path d="M10 20C40 8 75 8 108 22V120C75 106 40 106 10 118V20Z" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
              <path d="M210 20C180 8 145 8 112 22V120C145 106 180 106 210 118V20Z" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" />
              <line x1="24" y1="34" x2="92" y2="26" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.6" />
              <line x1="24" y1="48" x2="92" y2="40" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
              <line x1="24" y1="62" x2="92" y2="54" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
              <line x1="128" y1="26" x2="196" y2="34" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
              <line x1="128" y1="40" x2="196" y2="48" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
              <line x1="128" y1="54" x2="196" y2="62" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
            </svg>

            <p className="font-serif text-3xl italic leading-snug text-[var(--text-primary)]">
              &ldquo;Every great story starts with a reader.&rdquo;
            </p>
            <p className="mt-4 text-sm text-[var(--text-secondary)]">
              Whether you are here to read or to write, Fable is a home for
              stories worth telling.
            </p>
          </div>

          <p className="text-xs text-[var(--text-secondary)]">
            © {new Date().getFullYear()} Fable. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right: registration form */}
      <div className="flex w-full flex-col items-center justify-center px-6 py-16 lg:w-1/2 lg:px-16">
        <div className="mb-10 flex items-center gap-2 lg:hidden">
          <BookOpen size={20} className="text-[var(--accent)]" />
          <span className="font-serif text-lg font-semibold text-[var(--text-primary)]">
            Fable
          </span>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}