import Link from "next/link";
import BottomNav from "@/components/BottomNav";

const reportItems = [
  { status: "VERIFIED", chain: "eGovChain", title: "Pothole Repair - Rizal Ave", meta: "Oct 24, 2023 • Case #ES-9921", href: "/project/1" },
  { status: "PENDING", chain: "Anchored", title: "Illegal Dumping Site", meta: "Oct 26, 2023 • Case #ES-9945", href: "/project/2" },
  { status: "FLAGGED", chain: null, title: "Noise Complaint - Night Club", meta: "Oct 22, 2023 • Case #ES-9810", href: "/project/3" },
  { status: "VERIFIED", chain: "eGovChain", title: "Broken Street Light - Zone 4", meta: "Oct 18, 2023 • Case #ES-9742", href: "/project/1" },
  { status: "PENDING", chain: null, title: "Water Pipe Leakage", meta: "Oct 15, 2023 • Case #ES-9601", href: "/project/2" },
];

const statusStyle: Record<string, string> = {
  VERIFIED: "bg-primary-fixed text-primary",
  PENDING: "bg-secondary-fixed text-secondary",
  FLAGGED: "bg-error-container text-error",
};

export default function MyReportsPage() {
  return (
    <main className="flex flex-col min-h-screen max-w-[375px] mx-auto overflow-x-hidden shadow-2xl bg-surface">
      <header className="sticky top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center h-16 px-margin-mobile">
        <div className="flex items-center gap-3">
          <button className="p-2 -ml-2 text-on-surface-variant opacity-80">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-headline-md text-headline-md font-black text-primary tracking-tight">
            eSumbong
          </h1>
        </div>
        <button className="flex items-center justify-center p-2 rounded-full bg-surface-container hover:bg-surface-container-highest transition-all active:scale-95">
          <span className="material-symbols-outlined text-primary">search</span>
        </button>
      </header>

      <main className="flex-grow px-margin-mobile py-6 pb-24">
        <div className="mb-8">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-2">My Reports</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Track the progress of your submitted civic concerns and validated reports.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant flex flex-col gap-1">
            <span className="font-eyebrow text-eyebrow text-primary">TOTAL FILED</span>
            <span className="font-headline-md text-headline-md text-on-surface">12</span>
          </div>
          <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant flex flex-col gap-1">
            <span className="font-eyebrow text-eyebrow text-secondary">IN REVIEW</span>
            <span className="font-headline-md text-headline-md text-on-surface">03</span>
          </div>
        </div>

        <div className="space-y-4">
          {reportItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant flex items-center justify-between active:scale-[0.98] transition-transform shadow-sm"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm uppercase font-bold ${statusStyle[item.status]}`}>
                    {item.status}
                  </div>
                  {item.chain && (
                    <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant">
                      <span className="material-symbols-outlined text-[14px] text-primary">shield</span>
                      <span className="text-[10px] font-bold text-on-surface-variant">{item.chain}</span>
                    </div>
                  )}
                </div>
                <h3 className="font-label-md text-label-md text-on-surface">{item.title}</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{item.meta}</p>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav active="history" />
    </main>
  );
}
