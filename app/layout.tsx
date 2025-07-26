import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="text-center font-bold py-4">hello global header</div>
        {children}
      </body>
    </html>
  );
}
