"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/home", label: "Home", icon: "home" },
  { href: "/map", label: "Map", icon: "map" },
  { href: "/report/capture", label: "Report a Project", icon: "photo_camera" },
  { href: "/reports", label: "History", icon: "history" },
  { href: "/notifications", label: "Alerts", icon: "notifications" },
  { href: "/dashboard/mobile", label: "Public Dashboard", icon: "bar_chart" },
];

export default function AppMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open menu"
        aria-expanded={open}
        className="p-2 text-primary opacity-80 hover:opacity-100 transition-opacity"
      >
        <span className="material-symbols-outlined">{open ? "close" : "menu"}</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-56 bg-white border border-outline-variant rounded-2xl shadow-xl overflow-hidden z-[70]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-body-md text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
