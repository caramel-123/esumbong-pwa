import Link from "next/link";
import DesktopNav from "@/components/DesktopNav";

const features = [
  {
    tag: "eVerify",
    icon: "fingerprint",
    tint: "bg-primary/10 text-primary",
    tagStyle: "bg-primary-fixed text-on-primary-fixed-variant",
    title: "Secure Identity",
    body: "Validated citizen identification ensuring authentic feedback and secure portal access for every resident.",
  },
  {
    tag: "Compass",
    icon: "explore",
    tint: "bg-secondary/10 text-secondary",
    tagStyle: "bg-secondary-fixed text-on-secondary-fixed-variant",
    title: "Real-time Budget Data",
    body: "Track project funding and expenditure with live geolocation-linked financial transparency overlays.",
  },
  {
    tag: "eGovAI",
    icon: "camera_enhance",
    tint: "bg-tertiary/10 text-tertiary",
    tagStyle: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    title: "Visual Verification",
    body: "Automated analysis of report photos to categorize issues and verify site conditions instantly using AI triaging.",
    highlighted: true,
  },
  {
    tag: "eGovChain",
    icon: "link",
    tint: "bg-primary/10 text-primary",
    tagStyle: "bg-primary-fixed text-on-primary-fixed-variant",
    title: "Immutable Records",
    body: "Secure, blockchain-backed audit trails for every report and government response, preventing data tampering.",
  },
  {
    tag: "eMessage",
    icon: "notifications_active",
    tint: "bg-secondary/10 text-secondary",
    tagStyle: "bg-secondary-fixed text-on-secondary-fixed-variant",
    title: "Real-time Alerts",
    body: "Stay updated with instant push notifications regarding progress on your reported concerns and local community updates.",
  },
  {
    tag: "PWA",
    icon: "install_mobile",
    tint: "bg-tertiary/10 text-tertiary",
    tagStyle: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
    title: "Progressive Web App",
    body: "Install eSumbong directly on your home screen for a seamless mobile experience without the need for an app store.",
  },
];

export default function FeaturesOverviewPage() {
  return (
    <main className="bg-surface text-on-surface font-body-md min-h-screen">
      <DesktopNav active="features" />

      <main className="max-w-[1200px] mx-auto px-margin-desktop py-20">
        <div className="text-center mb-16 space-y-4">
          <span className="font-eyebrow text-eyebrow text-primary tracking-[0.2em] uppercase">
            HOW IT WORKS
          </span>
          <h1 className="font-headline text-headline-lg text-on-background max-w-2xl mx-auto">
            Citizen Empowerment via eGov APIs
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto">
            Leveraging modern civic technology to ensure transparency, accountability, and real-time
            community engagement in local governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.tag}
              className={`bg-surface-container-lowest p-8 rounded-lg flex flex-col gap-6 relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${
                f.highlighted
                  ? "border-2 border-primary-container ring-4 ring-primary-container/5"
                  : "border border-outline-variant"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${f.tint}`}>
                  <span className="material-symbols-outlined text-[32px]">{f.icon}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full font-label-sm text-label-sm uppercase font-bold tracking-wider ${f.tagStyle}`}
                >
                  {f.tag}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-headline text-headline-md text-on-background">{f.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{f.body}</p>
              </div>
              {f.highlighted && (
                <div className="absolute bottom-0 right-0 p-2 opacity-10">
                  <span className="material-symbols-outlined text-[120px]">smart_toy</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6 p-12 bg-primary-fixed rounded-lg border border-primary-container/20">
          <h2 className="font-headline text-headline-md text-on-primary-fixed text-center">
            Ready to contribute to your community?
          </h2>
          <div className="flex gap-4">
            <Link
              href="/home"
              className="bg-primary-container text-white px-8 py-3 rounded-full font-label-md text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Start a New Report
            </Link>
            <Link
              href="/home"
              className="border border-primary-container text-primary px-8 py-3 rounded-full font-label-md text-label-md hover:bg-white/50 transition-colors"
            >
              Explore Map
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-surface-container-high py-12 mt-20">
        <div className="max-w-[1200px] mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <span className="font-headline text-headline-md font-black text-primary tracking-tight">
              eSumbong
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              A centralized platform for civic engagement and transparent project monitoring in the
              Philippines.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest">
              Resources
            </h4>
            <nav className="flex flex-col gap-2">
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                Developer APIs
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                Data Privacy
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                User Manual
              </a>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest">
              Connect
            </h4>
            <nav className="flex flex-col gap-2">
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                Twitter / X
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                Facebook
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">
                Email Support
              </a>
            </nav>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-margin-desktop mt-12 pt-8 border-t border-outline-variant flex justify-between items-center text-label-sm font-label-sm text-on-surface-variant">
          <span>© 2026 eSumbong. Philippine Civic-Tech Initiative.</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified</span> eGov Verified
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
