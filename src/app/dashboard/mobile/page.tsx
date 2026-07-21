import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { projects } from "@/lib/mock-data";

const statusStyle: Record<string, string> = {
  verified: "bg-primary-fixed text-on-primary-fixed",
  pending: "bg-secondary-fixed text-on-secondary-fixed",
  flagged: "bg-tertiary-fixed text-on-tertiary-fixed",
};

export default function PublicDashboardMobilePage() {
  return (
    <main className="flex flex-col min-h-screen max-w-[375px] mx-auto overflow-x-hidden bg-surface">
      <header className="sticky top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center h-16 px-margin-mobile">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">menu</span>
          <div className="flex flex-col leading-tight">
            <span className="font-eyebrow text-[10px] uppercase text-on-surface-variant tracking-widest">
              Public Dashboard
            </span>
            <span className="font-headline-md text-headline-md font-black text-primary tracking-tight">
              eSumbong
            </span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-highest">
          <span className="material-symbols-outlined text-primary">search</span>
        </div>
      </header>

      <main className="flex-1 pb-32">
        <section className="px-margin-mobile pt-6 pb-4">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background">
            Project Accountability
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Real-time infrastructure transparency for Philippine communities.
          </p>
        </section>

        <section className="px-margin-mobile mb-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">
              search
            </span>
            <input
              className="w-full h-14 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-full font-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all"
              placeholder="Search project ID or location..."
              type="text"
            />
          </div>
        </section>

        <section className="mb-8">
          <div className="flex overflow-x-auto gap-2 px-margin-mobile">
            <button className="flex-shrink-0 px-5 py-2.5 bg-primary text-on-primary rounded-full font-label-md transition-transform active:scale-95">
              All Districts
            </button>
            <button className="flex-shrink-0 px-5 py-2.5 bg-surface-container-highest text-on-surface-variant rounded-full font-label-md hover:bg-outline-variant transition-colors">
              DPWH
            </button>
            <button className="flex-shrink-0 px-5 py-2.5 bg-surface-container-highest text-on-surface-variant rounded-full font-label-md hover:bg-outline-variant transition-colors">
              DOTr
            </button>
            <button className="flex-shrink-0 px-5 py-2.5 bg-error-container text-on-error-container rounded-full font-label-md hover:opacity-90 transition-opacity">
              Flagged
            </button>
          </div>
        </section>

        <section className="px-margin-mobile flex flex-col gap-6">
          {projects.map((p) => (
            <Link
              key={p.id}
              href={`/project/${p.id}`}
              className="block bg-surface-container-lowest rounded-lg border border-outline-variant p-5 transition-transform active:scale-[0.98]"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 ${statusStyle[p.status]} text-label-sm font-bold uppercase rounded-full tracking-wider`}>
                  {p.status}
                </span>
                <div className="flex items-center gap-1 px-2 py-1 bg-surface-container border border-outline-variant rounded-full">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span className="text-[10px] font-bold">Compass</span>
                </div>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-background mb-1">{p.name}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Contract ID: {p.contractId}
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <span className="font-label-md text-on-surface-variant">Claimed vs Actual Progress</span>
                  <span className="font-label-md text-primary">
                    {p.claimedPct}% / {p.actualPct}%
                  </span>
                </div>
                <div className="relative w-full h-3 bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-primary-container rounded-full opacity-30"
                    style={{ width: `${p.claimedPct}%` }}
                  ></div>
                  <div
                    className="absolute left-0 top-0 h-full bg-primary-container rounded-full"
                    style={{ width: `${p.actualPct}%` }}
                  ></div>
                </div>
                {p.status === "flagged" && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="material-symbols-outlined text-error text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                      warning
                    </span>
                    <span className="text-error font-label-sm">
                      {p.claimedPct - p.actualPct}% Discrepancy reported via eGovAI
                    </span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </section>
      </main>

      <BottomNav active="none" />
    </main>
  );
}
