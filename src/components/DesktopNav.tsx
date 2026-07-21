"use client";

import Link from "next/link";

export default function DesktopNav({
  active,
}: {
  active?: "features" | "dashboard";
}) {
  const linkClass = (tab: string) =>
    `font-label-md text-label-md transition-colors pb-1 ${
      active === tab
        ? "text-primary border-b-2 border-primary"
        : "text-on-surface-variant hover:text-primary"
    }`;

  return (
    <nav className="sticky top-0 w-full z-50 bg-surface border-b border-outline-variant">
      <div className="flex justify-between items-center h-16 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
        <Link href="/landing" className="flex items-center gap-2">
          <span className="font-headline-md text-headline-md font-black text-primary tracking-tight">
            eSumbong
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className={linkClass("dashboard")}>
            Dashboard
          </Link>
          <Link href="/features" className={linkClass("features")}>
            Features
          </Link>
          <Link href="/landing" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">
            About
          </Link>
        </div>
        <Link
          href="/home"
          className="bg-primary-container text-white px-6 py-2 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all shadow-md"
        >
          Report Project
        </Link>
      </div>
    </nav>
  );
}
