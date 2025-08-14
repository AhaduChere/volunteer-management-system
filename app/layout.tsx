'use client'
import './globals.css';
import Head from "@/components/Head";
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const Logout = async () => {
  document.cookie = 'session_token=; path=/; max-age=0;';
  window.location.reload();
}

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <Head />
        {pathname !== '/' && (
          <header className="fixed w-full bg-[#12173f] flex text-white py-4 shadow-md  justify-between items-center px-6">
            <h1
              className="text-2xl font-bold select-none cursor-pointer hover:text-blue-400 transition-colors"
              onClick={() => window.location.href = "/admin"}
            >
              Volunteer Management System
            </h1>
            <button
              onClick={Logout}
              className="font-bold select-none cursor-pointer hover:text-blue-400 transition-colors">
              Logout
            </button>
          </header>
        )}
        {children}
      </body>
    </html>
  );
}
