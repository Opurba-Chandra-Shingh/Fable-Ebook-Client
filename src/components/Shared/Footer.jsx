import Link from 'next/link';
import { CiFacebook } from 'react-icons/ci';
import { FaInstagram } from "react-icons/fa";
import { HiOutlineBookOpen } from 'react-icons/hi';
import { IoLogoGithub } from 'react-icons/io';
import { LuTwitter } from 'react-icons/lu';


const EXPLORE_LINKS = [
  { label: 'Browse Ebooks', href: '/browse' },
  { label: 'Writers', href: '/writers' },
  { label: 'Genres', href: '/genres' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
];

const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: CiFacebook },
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { label: 'Twitter', href: 'https://twitter.com', icon: LuTwitter },
  { label: 'Github', href: 'https://github.com', icon: IoLogoGithub },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-[#0D0A09] text-[#F5F1EA]">
      <div className="mx-auto max-w-content px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <HiOutlineBookOpen size={20} className="text-accent" />
              <span className="font-serif text-lg font-semibold text-text-primary">
                Fable
              </span>
            </Link>
            <p className="mt-3 text-sm text-text-secondary">
              Stories, writers, and readers in one place.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Explore column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-primary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-primary transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-text-secondary">
              Get new stories and writer updates.
            </p>
            <form className="mt-4 flex items-center gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-input border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent/40"
              />
              <button
                type="submit"
                className="shrink-0 rounded-btn bg-button-primary-bg px-4 py-2 text-sm font-medium text-button-primary-text transition-opacity hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6">
          <p className="text-xs text-text-secondary">
            © {new Date().getFullYear()} Fable. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}