// components/dashboard/reader/user-sidebar.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  Library,
  Bookmark,
  Receipt,
  UserCircle,
  LogOut,
  Menu,
  X,
  BookOpen,
} from 'lucide-react';
import { hndlSignOut } from '@/session/signOut';


const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard/reader', icon: LayoutGrid },
  { label: 'Purchased Ebooks', href: '/dashboard/reader/purchased', icon: Library },
  { label: 'Bookmarks', href: '/dashboard/reader/bookmarks', icon: Bookmark },
  { label: 'Purchase History', href: '/dashboard/reader/purchases', icon: Receipt },
  { label: 'Profile', href: '/dashboard/reader/profile', icon: UserCircle },
];

function SidebarContent({ router, pathname, onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <Link href="/" className="flex items-center gap-2 px-6 py-6">
        <BookOpen size={20} className="text-[var(--accent)]" />
        <span className="font-serif text-lg font-semibold text-[var(--text-primary)]">
          Fable
        </span>
      </Link>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                  : 'text-[var(--text-primary)] hover:bg-[var(--background-secondary)]'
              }`}
            >
              <Icon size={17} />
              {label}
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[var(--border)] px-3 py-4">
        <button
          type="button"
          onClick={() => hndlSignOut(router)}
          className="flex w-full items-center gap-3 rounded-btn px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--background-secondary)] hover:text-[var(--text-primary)]"
        >
          <LogOut size={17} />
          Sign out
        </button>
      </div>
    </div>
  );
}

export default function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto border-r border-[var(--border)] bg-[var(--surface)] lg:block">
        <SidebarContent router={router} pathname={pathname} />
      </aside>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-primary)] lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-72 border-r border-[var(--border)] bg-[var(--surface)] lg:hidden"
            >
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="absolute right-4 top-6 text-[var(--text-secondary)]"
              >
                <X size={20} />
              </button>
              <SidebarContent router={router} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
