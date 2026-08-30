'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, BookOpen, Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/theme-toggle';
import { authClient, useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import { hndlSignOut } from '@/session/signOut';





export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const router = useRouter();

    const { data: session, isPending } = useSession();

    const currentUser = session?.user;
    const isAuthenticated = !!currentUser;

    // console.log('Logged in user from Navbar:', currentUser);
    // console.log('Session pending:', isPending);

    const dashlink = {
        admin: '/dashboard/admin',
        reader: '/dashboard/reader',
        writer: '/dashboard/writer',
    };


    const NAV_LINKS = [
        { label: 'Home', href: '/' },
        { label: 'Browse Ebooks', href: '/browse' },
        { label: 'Writers', href: '/writers' },
        { label: 'About', href: '/about' },
    ];

    // const hndlSignOut = async () => {
    //     try {
    //         await authClient.signOut();
    //         router.refresh();
    //         router.push('/');
    //     } catch (error) {
    //         console.error('Sign out failed:', error);
    //     }
    // };

    const loginButtonToggle = (
        <div>
            {isPending ? (
                <div className="hidden items-center gap-3 pl-1 sm:flex">
                    <div className="h-8 w-16 animate-pulse rounded-btn bg-background-secondary" />
                    <span className="loading loading-spinner loading-sm text-[var(--text-primary)]"></span>
                    <div className="h-9 w-9 animate-pulse rounded-full bg-background-secondary" />
                </div>
            ) : !isAuthenticated ? (
                <div className="hidden items-center gap-3 pl-1 sm:flex">
                    <Link href="/login" className="text-sm font-medium text-text-primary transition-colors hover:text-accent">
                        Login
                    </Link>

                    <Link href="/get-started" className="rounded-btn bg-button-primary-bg px-4 py-2 text-sm font-medium text-button-primary-text transition-opacity hover:opacity-90">
                        Get Started
                    </Link>
                </div>
            ) : (
                <div className="hidden items-center gap-3 pl-1 sm:flex">
                    <Button onClick={()=>hndlSignOut(router)} className="text-sm font-medium text-text-primary transition-colors hover:text-accent">
                        Sign out
                    </Button>

                    <button type="button" aria-label="User menu" className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-alt">
                        {currentUser?.image ? (
                            <img src={currentUser.image} alt={currentUser?.name || 'User avatar'} className="h-full w-full object-cover" />
                        ) : (
                            <span className="text-xs font-semibold text-text-primary">
                                {currentUser?.name?.[0]?.toUpperCase() || 'U'}
                            </span>
                        )}
                    </button>
                </div>
            )}
        </div>
    );

    const loginButtonToggleMobile = (
        <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
            {!isPending && !isAuthenticated ? (
                <>
                    <Link
                        href="/login"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 rounded-btn border border-border px-4 py-2 text-center text-sm font-medium text-text-primary"
                    >
                        Login
                    </Link>

                    <Link
                        href="/get-started"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 rounded-btn bg-button-primary-bg px-4 py-2 text-center text-sm font-medium text-button-primary-text"
                    >
                        Get Started
                    </Link>
                </>
            ) : !isPending && currentUser ? (
                <Button
                    onClick={() => {
                        hndlSignOut(router);
                        setMobileOpen(false);
                    }}
                    className="flex-1 rounded-btn bg-button-primary-bg px-4 py-2 text-center text-sm font-medium text-button-primary-text"
                >
                    Sign out
                </Button>
            ) : null}
        </div>
    );

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 md:px-10">

                {/* Logo */}
                <Link href="/" className="flex shrink-0 items-center gap-2">
                    <BookOpen size={20} className="text-accent" />

                    <span className="font-serif text-lg font-semibold text-text-primary">
                        Fable
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-8 md:flex">
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
                    {
                        currentUser && dashlink[currentUser.role] && (
                            <Link
                                href={dashlink[currentUser.role]}
                                className="relative py-1 text-sm font-medium text-text-primary transition-colors hover:text-accent"
                            >
                                Dashboard
                            </Link>
                        )
                    }

                </nav>

                {/* Right Side */}
                <div className="flex items-center gap-2">

                    {/* Search */}
                    <button
                        type="button"
                        aria-label="Search"
                        className="hidden h-9 w-9 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-background-secondary sm:flex"
                    >
                        <Search size={18} />
                    </button>

                    {/* Theme */}
                    <ThemeToggle />

                    {/* Authentication */}
                    {loginButtonToggle}

                    {/* Mobile Menu Button */}
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

            {/* Mobile Menu */}
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