import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function NotificationsPage() {
  return (
    <main className="flex flex-col min-h-screen max-w-[375px] mx-auto bg-background text-on-background items-center">
      <header className="sticky top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center h-16 px-margin-mobile">
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center opacity-80">
            <span className="material-symbols-outlined text-primary">menu</span>
          </button>
          <h1 className="font-headline-md text-headline-md font-black text-primary tracking-tight">
            eSumbong
          </h1>
        </div>
        <Link
          href="/report/capture"
          className="bg-primary-container text-on-primary-container font-label-md text-label-md px-4 py-2 rounded-full transition-transform active:scale-95"
        >
          Report Project
        </Link>
      </header>

      <main className="w-full max-w-[375px] px-margin-mobile pt-6 pb-24">
        <div className="mb-6">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background">
            Alerts &amp; Updates
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Stay informed about your reports and civic activities.
          </p>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto">
          <button className="bg-primary text-on-primary font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap">
            All
          </button>
          <button className="bg-surface-container-high text-on-surface-variant font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap">
            Reports
          </button>
          <button className="bg-surface-container-high text-on-surface-variant font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap">
            Messages
          </button>
          <button className="bg-surface-container-high text-on-surface-variant font-label-md text-label-md px-4 py-2 rounded-full whitespace-nowrap">
            Community
          </button>
        </div>

        <section className="space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">assignment_turned_in</span>
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="inline-flex items-center gap-1 h-6 px-2 rounded-full border border-outline-variant bg-surface-container-highest font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">mail</span> eMessage
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">2m ago</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-semibold">
                Your report for Metro Manila Subway was received
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-[#e0e8ff] text-[#002b9a] px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider">
                  VERIFIED
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex gap-4">
            <div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-tertiary">priority_high</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="inline-flex items-center gap-1 h-6 px-2 rounded-full border border-outline-variant bg-surface-container-highest font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">analytics</span> eGovAI
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">1h ago</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-semibold">
                Status update: Project ID #442 flagged for discrepancy
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-[#ffdada] text-[#ba1a1a] px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider">
                  FLAGGED
                </span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex gap-4 opacity-70">
            <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="inline-flex items-center gap-1 h-6 px-2 rounded-full border border-outline-variant bg-surface-container-highest font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">security</span> eVerify
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">5h ago</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Your identity verification has been processed successfully.
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex gap-4 opacity-70">
            <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant">location_on</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="inline-flex items-center gap-1 h-6 px-2 rounded-full border border-outline-variant bg-surface-container-highest font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">explore</span> Compass
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Yesterday</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Precision geotag added to &quot;Bridge Repair Request&quot; in Quezon City.
              </p>
            </div>
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
