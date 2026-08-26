'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      suppressHydrationWarning
      className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-primary)] transition-colors hover:bg-[var(--background-secondary)]"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}