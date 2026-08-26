'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, BookOpen, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/theme-toggle';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Browse Ebooks', href: '/browse' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'About', href: '/about' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const loginButtonToggle = <div>
        {!isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-3 pl-1">
                <Link
                    href="/login"
                    className="text-sm font-medium text-text-primary transition-colors hover:text-accent"
                >
                    Login
                </Link>
                <Link
                    href="/get-started"
                    className="rounded-btn bg-button-primary-bg px-4 py-2 text-sm font-medium text-button-primary-text transition-opacity hover:opacity-90"
                >
                    Get Started
                </Link>
            </div>
        ) : (
            <div className="hidden sm:flex items-center gap-3 pl-1">
                <Link
                    href="/dashboard"
                    className="text-sm font-medium text-text-primary transition-colors hover:text-accent"
                >
                    Dashboard
                </Link>
                <button
                    type="button"
                    aria-label="User menu"
                    className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-alt"
                >
                    {user?.avatarUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={user.avatarUrl}
                            alt={user?.name || 'User avatar'}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <span className="text-xs font-semibold text-text-primary">
                            {user?.name?.[0]?.toUpperCase() || 'U'}
                        </span>
                    )}
                </button>
            </div>
        )}
    </div>

    const loginButtonToggleMobile = <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        href="/login"
                                        className="flex-1 rounded-btn border border-border px-4 py-2 text-center text-sm font-medium text-text-primary"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/get-started"
                                        className="flex-1 rounded-btn bg-button-primary-bg px-4 py-2 text-center text-sm font-medium text-button-primary-text"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            ) : (
                                <Link
                                    href="/dashboard"
                                    className="flex-1 rounded-btn bg-button-primary-bg px-4 py-2 text-center text-sm font-medium text-button-primary-text"
                                >
                                    Dashboard
                                </Link>
                            )}
                        </div>

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 md:px-10">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <BookOpen size={20} className="text-accent" />
                    <span className="font-serif text-lg font-semibold text-text-primary">
                        Fable
                    </span>
                </Link>

                {/* Center nav - desktop */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative py-1 text-sm font-medium text-text-primary transition-colors hover:text-accent"
                            >
                                {link.label}
                                {isActive && (
                                    <span className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-accent" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Search"
                        className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-background-secondary"
                    >
                        <Search size={18} />
                    </button>

                    <ThemeToggle />

                    {loginButtonToggle}

                    {/* Mobile menu toggle */}
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-text-primary md:hidden"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="border-t border-border bg-background md:hidden">
                    <nav className="flex flex-col gap-1 px-6 py-4">
                        {NAV_LINKS.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`rounded-btn px-3 py-2 text-sm font-medium transition-colors ${isActive
                                        ? 'bg-background-secondary text-accent'
                                        : 'text-text-primary hover:bg-background-secondary'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        {loginButtonToggleMobile}
                    </nav>
                </div>
            )}
        </header>
    );
}