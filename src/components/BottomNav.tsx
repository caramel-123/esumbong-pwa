"use client";

import Link from "next/link";

type ActiveTab = "home" | "map" | "history" | "alerts" | "none";

export default function BottomNav({ active = "none" }: { active?: ActiveTab }) {
  const itemClass = (tab: ActiveTab) =>
    `flex flex-col items-center justify-center gap-1 h-full flex-1 transition-colors ${
      active === tab ? "text-primary" : "text-on-surface-variant"
    }`;

  const labelClass = (tab: ActiveTab) =>
    `font-label-sm text-label-sm ${active === tab ? "font-extrabold text-primary" : "font-semibold text-on-surface-variant"}`;

  const iconStyle = (tab: ActiveTab) =>
    active === tab ? { fontVariationSettings: "'FILL' 1" } : undefined;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] h-16 z-50 bg-white border-t border-outline-variant shadow-[0_-2px_12px_rgba(0,43,154,0.08)] flex items-stretch px-1">
      <Link href="/home" className={itemClass("home")}>
        <span className="material-symbols-outlined text-[22px]" style={iconStyle("home")}>
          home
        </span>
        <span className={labelClass("home")}>Home</span>
      </Link>

      <Link href="/map" className={itemClass("map")}>
        <span className="material-symbols-outlined text-[22px]" style={iconStyle("map")}>
          map
        </span>
        <span className={labelClass("map")}>Map</span>
      </Link>

      <div className="relative flex-1 h-full flex items-center justify-center">
        <Link
          href="/report/capture"
          className="absolute -top-4 w-14 h-14 rounded-full bg-primary text-white ring-4 ring-white shadow-[0_6px_16px_rgba(0,43,154,0.4)] flex items-center justify-center active:scale-90 transition-transform"
        >
          <span
            className="material-symbols-outlined text-[26px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            photo_camera
          </span>
        </Link>
      </div>

      <Link href="/reports" className={itemClass("history")}>
        <span className="material-symbols-outlined text-[22px]" style={iconStyle("history")}>
          history
        </span>
        <span className={labelClass("history")}>History</span>
      </Link>

      <Link href="/notifications" className={itemClass("alerts")}>
        <span className="relative">
          <span className="material-symbols-outlined text-[22px]" style={iconStyle("alerts")}>
            notifications
          </span>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-error rounded-full border border-white"></span>
        </span>
        <span className={labelClass("alerts")}>Alerts</span>
      </Link>
    </nav>
  );
}
