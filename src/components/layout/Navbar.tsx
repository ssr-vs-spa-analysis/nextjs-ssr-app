import Link from "next/link";
import { NavActiveLink } from "@/components/layout/NavActiveLink";

export const Navbar = () => (
  <header className="border-b border-slate-200 bg-white">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <Link href="/" className="text-lg font-bold text-slate-900">
        eProdavnica
      </Link>

      <nav className="flex gap-4" aria-label="Glavna navigacija">
        <NavActiveLink href="/" match="exact">
          Početna
        </NavActiveLink>
        <NavActiveLink href="/search" match="prefix">
          Proizvodi
        </NavActiveLink>
      </nav>
    </div>
  </header>
);
