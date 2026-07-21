"use client";

import { useState } from "react";
import AppBar from "@/components/AppBar";
import BottomNav from "@/components/BottomNav";

type AlertCategory = "message" | "flag" | "verification" | "system";

const categoryStyle: Record<AlertCategory, { bg: string; icon: string }> = {
  message: { bg: "bg-primary", icon: "mail" },
  flag: { bg: "bg-error", icon: "flag" },
  verification: { bg: "bg-secondary-container", icon: "verified_user" },
  system: { bg: "bg-on-surface-variant", icon: "location_on" },
};

const alerts: {
  category: AlertCategory;
  time: string;
  text: string;
  status: { label: string; bg: string; text: string } | null;
  unread: boolean;
}[] = [
  {
    category: "message",
    time: "2m ago",
    text: "Your report for Metro Manila Subway was received",
    status: { label: "VERIFIED", bg: "bg-primary-fixed", text: "text-primary" },
    unread: true,
  },
  {
    category: "flag",
    time: "1h ago",
    text: "Status update: Project ID #442 flagged for discrepancy",
    status: { label: "FLAGGED", bg: "bg-error-container", text: "text-error" },
    unread: true,
  },
  {
    category: "verification",
    time: "5h ago",
    text: "Your identity verification has been processed successfully.",
    status: null,
    unread: false,
  },
  {
    category: "system",
    time: "Yesterday",
    text: 'Precision geotag added to "Bridge Repair Request" in Quezon City.',
    status: null,
    unread: false,
  },
];

const filters = ["All", "Reports", "Messages", "Civic"];

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  return (
    <main className="flex flex-col min-h-dvh max-w-[375px] mx-auto bg-background text-on-background items-center">
      <AppBar />

      <main className="w-full max-w-[375px] px-margin-mobile pt-5 pb-24">
        <h2 className="font-headline text-headline-md text-on-background mb-4">Alerts</h2>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`text-center font-label-md text-label-sm px-2 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-white text-on-surface-variant border border-outline-variant"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <section className="relative">
          <div className="absolute left-6 top-3 bottom-3 w-px bg-outline-variant" />
          <div className="space-y-3">
            {alerts.map((alert, i) => {
              const { bg, icon } = categoryStyle[alert.category];
              return (
                <div key={i} className="relative flex gap-4">
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}>
                      <span
                        className="material-symbols-outlined text-white"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {icon}
                      </span>
                    </div>
                    {alert.unread && (
                      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-error border-2 border-background"></div>
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-2xl p-4 ${
                      alert.unread ? "bg-surface-container" : "bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p
                        className={`font-body-md text-body-md ${
                          alert.unread ? "text-on-background font-bold" : "text-on-surface-variant"
                        }`}
                      >
                        {alert.text}
                      </p>
                      <span className="font-label-sm text-label-sm text-on-surface-variant flex-shrink-0 whitespace-nowrap">
                        {alert.time}
                      </span>
                    </div>
                    {alert.status && (
                      <div className="mt-2 flex items-center gap-2">
                        <span
                          className={`${alert.status.bg} ${alert.status.text} px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider`}
                        >
                          {alert.status.label}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-12 flex flex-col items-center justify-center text-center opacity-40">
          <span className="material-symbols-outlined text-4xl mb-2">notifications_paused</span>
          <p className="font-label-md text-label-md">No more updates for today</p>
        </div>
      </main>

      <BottomNav active="alerts" />
    </main>
  );
}
