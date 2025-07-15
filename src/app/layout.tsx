// File: src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tugas Next.js App',
  description: 'Aplikasi Next.js dengan Tailwind dan Routing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <nav className="flex justify-center gap-6 bg-gray-800 text-white py-4 shadow-md">
          <Link href="/" className="hover:text-yellow-300 transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-yellow-300 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-yellow-300 transition-colors">
            Contact
          </Link>
          <Link href="/products" className="hover:text-yellow-300 transition-colors">
            Products
          </Link>
        </nav>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}