// components/dashboard/dashboard-header.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bell, ChevronDown, LogOut, UserCircle } from 'lucide-react';
import { hndlSignOut } from '@/session/signOut';
import { useRouter } from 'next/navigation';


export default function DashboardHeader({
  user,
  subtitle = 'Create stories, reach readers, and grow your audience.',
  profileHref = '/dashboard/writer/profile',
}) {
    const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--background)] px-6 py-5 md:px-10">
      <div className="ml-10 lg:ml-0">
        <h1 className="font-serif text-2xl font-medium text-[var(--text-primary)] md:text-3xl">
          Good to see you, {user?.name?.split(' ')[0] || 'there'}.
        </h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
        >
          <Bell size={18} />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] py-1 pl-1 pr-2.5"
          >
            <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-[var(--background-secondary)]">
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs font-semibold text-[var(--text-primary)]">
                  {user?.name?.[0]?.toUpperCase() || 'W'}
                </span>
              )}
            </div>
            <ChevronDown size={14} className="text-[var(--text-secondary)]" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-11 z-30 w-48 rounded-card border border-[var(--border)] bg-[var(--surface)] p-1.5 shadow-subtle">
              <Link
                href={profileHref}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-btn px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--background-secondary)]"
              >
                <UserCircle size={16} />
                Profile
              </Link>
              <button
                type="button"
                onClick={()=>hndlSignOut(router)}
                className="flex w-full items-center gap-2 rounded-btn px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--background-secondary)]"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}