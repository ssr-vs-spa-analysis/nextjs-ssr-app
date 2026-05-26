"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";

type Props = {
  href: string;
  match: "exact" | "prefix";
  children: ReactNode;
};

const linkClass = (isActive: boolean) =>
  `text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${
    isActive ? "font-semibold text-blue-600" : "text-slate-700"
  }`;

const ActiveAwareLink = ({ href, match, children }: Props) => {
  const pathname = usePathname();
  const isActive =
    match === "exact"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={linkClass(isActive)}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
};

export const NavActiveLink = ({ href, match, children }: Props) => (
  <Suspense
    fallback={
      <Link href={href} className={linkClass(false)}>
        {children}
      </Link>
    }
  >
    <ActiveAwareLink href={href} match={match}>
      {children}
    </ActiveAwareLink>
  </Suspense>
);
