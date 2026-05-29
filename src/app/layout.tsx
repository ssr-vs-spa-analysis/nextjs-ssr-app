import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "eProdavnica - Proizvodi za sve",
  description: "eProdavnica - Proizvodi za sve",
  robots: { index: true, follow: true }
};

type Props = { children: ReactNode };

const RootLayout = ({ children }: Props) => (
  <html lang="sr">
    <body>
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
      </div>
    </body>
  </html>
);

export default RootLayout;
