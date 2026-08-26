/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        'background-secondary': 'var(--background-secondary)',
        surface: 'var(--surface)',
        'surface-alt': 'var(--surface-alt)',

        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',

        border: 'var(--border)',

        accent: 'var(--accent)',

        'button-primary-bg': 'var(--button-primary-bg)',
        'button-primary-text': 'var(--button-primary-text)',

        'badge-bg': 'var(--badge-bg)',
        'badge-border': 'var(--badge-border)',
        'badge-text': 'var(--badge-text)',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '14px',
        btn: '12px',
        input: '12px',
        dialog: '16px',
      },
      maxWidth: {
        content: '1320px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};