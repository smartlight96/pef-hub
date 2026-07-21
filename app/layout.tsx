// app/layout.tsx
'use client';

// @ts-ignore
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}