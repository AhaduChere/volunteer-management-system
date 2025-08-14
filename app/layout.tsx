'use client'
import './globals.css';
import Head from "@/components/Head"
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <Head />
        {pathname !== '/' && (
          <header className="bg-gray-900 text-white py-4 shadow-md">
            <h1 className="text-2xl font-semibold text-center select-none">
              Volunteer Management System
            </h1>
          </header>
        )}
        {children}
      </body>
    </html>
  );
}
