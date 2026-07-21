"use client";

import Link from "next/link";

type ActiveTab = "home" | "history" | "alerts" | "none";

export default function BottomNav({ active = "none" }: { active?: ActiveTab }) {
  const itemClass = (tab: ActiveTab) =>
    `flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${
      active === tab
        ? "text-primary font-bold"
        : "text-on-surface-variant hover:bg-surface-container"
    }`;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] h-20 z-50 bg-surface border-t border-outline-variant shadow-[0_-4px_12px_rgba(26,29,41,0.08)] flex justify-around items-center px-4">
      <Link href="/home" className={itemClass("home")}>
        <span
          className="material-symbols-outlined text-[24px]"
          style={active === "home" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          home
        </span>
        <span className="font-label-sm text-label-sm mt-1">Home</span>
      </Link>

      <div className="relative flex items-center justify-center w-16">
        <Link
          href="/report/capture"
          className="absolute bottom-6 w-16 h-16 bg-primary-container text-on-primary rounded-full shadow-[0_4px_16px_rgba(1,62,208,0.4)] flex items-center justify-center active:scale-90 transition-transform group"
        >
          <span
            className="material-symbols-outlined text-[32px] group-hover:scale-110 transition-transform"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            photo_camera
          </span>
          <span className="absolute -bottom-8 text-primary font-bold text-[10px] uppercase tracking-wider">
            Report
          </span>
        </Link>
      </div>

      <Link href="/reports" className={itemClass("history")}>
        <span
          className="material-symbols-outlined text-[24px]"
          style={active === "history" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          history
        </span>
        <span className="font-label-sm text-label-sm mt-1">History</span>
      </Link>

      <Link href="/notifications" className={`${itemClass("alerts")} relative`}>
        <span
          className="material-symbols-outlined text-[24px]"
          style={active === "alerts" ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          notifications
        </span>
        <span className="font-label-sm text-label-sm mt-1">Alerts</span>
        <div className="absolute top-2 right-3 w-2 h-2 bg-error rounded-full border border-surface"></div>
      </Link>
    </nav>
  );
}
