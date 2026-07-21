import Link from "next/link";
import AppBar from "@/components/AppBar";
import BottomNav from "@/components/BottomNav";
import { projects, type ProjectStatus } from "@/lib/mock-data";

const quickActions = [
  { label: "Report Issue", icon: "photo_camera", href: "/report/capture" },
  { label: "Explore Map", icon: "map", href: "/map" },
  { label: "My Reports", icon: "history", href: "/reports" },
];

const statusMeta: Record<
  ProjectStatus,
  { label: string; badgeBg: string; badgeText: string; border: string; icon: string; iconBg: string }
> = {
  verified: {
    label: "VERIFIED",
    badgeBg: "bg-primary-fixed",
    badgeText: "text-primary",
    border: "border-l-primary",
    icon: "check_circle",
    iconBg: "bg-primary",
  },
  pending: {
    label: "PENDING",
    badgeBg: "bg-secondary-fixed",
    badgeText: "text-on-secondary-container",
    border: "border-l-secondary-container",
    icon: "hourglass_top",
    iconBg: "bg-secondary-container",
  },
  flagged: {
    label: "FLAGGED",
    badgeBg: "bg-error-container",
    badgeText: "text-error",
    border: "border-l-error",
    icon: "priority_high",
    iconBg: "bg-error",
  },
};

export default function HomeDashboardPage() {
  return (
    <main className="flex flex-col min-h-screen max-w-[375px] mx-auto bg-background">
      <AppBar />

      <div className="flex-1 px-margin-mobile pt-5 pb-24 space-y-6">
        {/* Greeting + civic impact banner */}
        <div className="relative overflow-hidden rounded-2xl bg-primary p-5 text-white">
          <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white/10" />
          <div className="absolute -right-1 bottom-0 w-16 h-16 rounded-full bg-secondary-container/20" />
          <p className="relative font-body-md text-[13px] text-white/70 mb-1">Magandang araw!</p>
          <h2 className="relative font-headline text-headline-md text-white mb-3 max-w-[240px]">
            Building a transparent Philippines, together.
          </h2>
          <div className="relative flex items-end gap-2">
            <span className="font-headline text-[26px] font-black text-secondary-container leading-none">
              ₱2.4B
            </span>
            <span className="font-body-md text-[12px] text-white/80 leading-tight pb-0.5">
              in public projects being tracked by citizens like you
            </span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 bg-white rounded-2xl p-3 border border-outline-variant shadow-sm active:scale-95 transition-transform"
            >
              <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[22px]">{action.icon}</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface text-center leading-tight">
                {action.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Community impact stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary text-white p-4 rounded-2xl shadow-md flex flex-col gap-1">
            <span className="font-eyebrow text-eyebrow text-white/70">REPORTS FILED</span>
            <span className="font-headline text-headline-md text-white">18,204</span>
          </div>
          <div className="bg-secondary-container text-on-secondary-container p-4 rounded-2xl shadow-md flex flex-col gap-1">
            <span className="font-eyebrow text-eyebrow text-on-secondary-container/70">VERIFIED THIS MONTH</span>
            <span className="font-headline text-headline-md text-on-secondary-container">1,204</span>
          </div>
        </div>

        {/* Trending near you */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-headline text-[18px] text-on-surface">Trending Near You</h3>
            <Link href="/map" className="font-label-sm text-label-sm text-primary font-bold">
              See map
            </Link>
          </div>
          <div className="space-y-3">
            {projects.map((project) => {
              const meta = statusMeta[project.status];
              return (
                <Link
                  key={project.id}
                  href={`/project/${project.id}`}
                  className={`flex items-center gap-3 bg-white p-3 rounded-2xl border border-outline-variant border-l-4 ${meta.border} shadow-sm active:scale-[0.98] transition-transform`}
                >
                  <div className={`w-11 h-11 rounded-full ${meta.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <span
                      className="material-symbols-outlined text-white text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {meta.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className={`${meta.badgeBg} ${meta.badgeText} px-2 py-0.5 rounded-full text-[10px] font-bold uppercase`}>
                        {meta.label}
                      </span>
                      <span className="text-on-surface-variant text-[11px] flex-shrink-0 truncate">
                        {project.location}
                      </span>
                    </div>
                    <h4 className="font-label-md text-label-md text-on-surface truncate">{project.name}</h4>
                    <p className="text-on-surface-variant text-[11px] truncate">
                      {project.agency} · {project.budget}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant flex-shrink-0">chevron_right</span>
                </Link>
              );
            })}
          </div>
        </div>

        <p className="text-center font-body-md text-[12px] text-on-surface-variant pt-1">
          Bayanihan starts with a report.
        </p>
      </div>

      <BottomNav active="home" />
    </main>
  );
}
