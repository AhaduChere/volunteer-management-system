import './globals.css';
import type { ReactNode } from 'react';
import Head from "@/components/Head"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Head />
        {children}
      </body>
    </html>
  );
}
