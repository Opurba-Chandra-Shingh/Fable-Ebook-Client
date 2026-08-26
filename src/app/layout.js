import { Fraunces, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import "./globals.css";
import Navbar from '@/components/Shared/Navbar';
import Footer from '@/components/Shared/Footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Fable — Discover Stories Worth Reading',
  description: 'Fable is a curated home for original ebooks.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <Navbar></Navbar>
          <main>{children}</main>
          <Footer></Footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
