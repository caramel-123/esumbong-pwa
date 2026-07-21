import Link from "next/link";
import AppBar from "@/components/AppBar";
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

const borderStyle: Record<string, string> = {
  VERIFIED: "border-l-primary",
  PENDING: "border-l-secondary-container",
  FLAGGED: "border-l-error",
};

export default function MyReportsPage() {
  return (
    <main className="flex flex-col min-h-dvh max-w-[375px] mx-auto overflow-x-hidden shadow-2xl bg-surface">
      <AppBar />

      <main className="grow px-margin-mobile py-6 pb-24">
        <div className="mb-6">
          <h2 className="font-headline text-headline-lg-mobile text-on-surface mb-2">My Reports</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Track the progress of your submitted civic concerns and validated reports.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-primary text-on-primary p-4 rounded-2xl shadow-md flex flex-col gap-1">
            <span className="font-eyebrow text-eyebrow text-white/70">TOTAL FILED</span>
            <span className="font-headline text-headline-md text-white">12</span>
          </div>
          <div className="bg-secondary-container text-on-secondary-container p-4 rounded-2xl shadow-md flex flex-col gap-1">
            <span className="font-eyebrow text-eyebrow text-on-secondary-container/70">IN REVIEW</span>
            <span className="font-headline text-headline-md text-on-secondary-container">03</span>
          </div>
        </div>

        <div className="space-y-4">
          {reportItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`bg-surface-container-lowest p-4 rounded-lg border border-outline-variant border-l-4 ${borderStyle[item.status]} flex items-center justify-between active:scale-[0.98] transition-transform shadow-sm`}
            >
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className={`px-2 py-0.5 rounded-full font-label-sm text-label-sm uppercase font-bold ${statusStyle[item.status]}`}>
                    {item.status}
                  </div>
                </div>
                <h3 className="font-label-md text-label-md text-on-surface truncate">{item.title}</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant">{item.meta}</p>
                {item.chain && (
                  <div className="mt-1.5 flex items-center gap-1.5 bg-primary-fixed px-2 py-1 rounded-md w-fit">
                    <span
                      className="material-symbols-outlined text-primary text-[15px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      shield
                    </span>
                    <span className="text-primary font-extrabold text-[10px] uppercase tracking-wide">
                      {item.chain}
                    </span>
                    <span className="text-primary/70 text-[10px]">· Tamper-proof record</span>
                  </div>
                )}
              </div>
              <span className="material-symbols-outlined text-on-surface-variant flex-shrink-0">chevron_right</span>
            </Link>
          ))}
        </div>
      </main>

      <BottomNav active="history" />
    </main>
  );
}
