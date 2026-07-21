import Link from "next/link";
import DesktopNav from "@/components/DesktopNav";
import Eyebrow from "@/components/Eyebrow";

const stats = [
  {
    icon: "description",
    label: "Reports Filed",
    value: "18,204",
    caption: "All-time citizen submissions",
  },
  {
    icon: "verified",
    label: "Verified This Month",
    value: "1,204",
    caption: "Cross-checked against claims",
  },
  {
    icon: "account_balance_wallet",
    label: "Budget Tracked",
    value: "₱2.4B",
    caption: "Across active contracts",
  },
  {
    icon: "flag",
    label: "Discrepancies Found",
    value: "450",
    caption: "Flagged for agency review",
  },
];

const services = [
  {
    icon: "fingerprint",
    tint: "bg-primary/10 text-primary",
    title: "Secure Identity",
    description:
      "Every citizen is confirmed through eVerify before a report counts, so feedback stays authentic without ever collecting more than a pseudonymous reference.",
  },
  {
    icon: "account_balance",
    tint: "bg-secondary-container/25 text-secondary",
    title: "Real-Time Budget Data",
    description:
      "Compass supplies live agency and budget reference data, so every project on the map is tied to an official contract, not a guess.",
  },
  {
    icon: "photo_camera",
    tint: "bg-primary/10 text-primary",
    title: "Visual Verification",
    description:
      "eGovAI checks a submitted photo against the claimed completion percentage and flags anything that doesn't add up.",
  },
  {
    icon: "link",
    tint: "bg-secondary-container/25 text-secondary",
    title: "Immutable Records",
    description:
      "Every report is anchored to eGovChain, an append-only hash chain that makes tampering with past records mathematically obvious.",
  },
  {
    icon: "notifications_active",
    tint: "bg-primary/10 text-primary",
    title: "Real-Time Alerts",
    description:
      "eMessage keeps citizens and agencies updated the moment a report's status changes, from flagged to resolved.",
  },
  {
    icon: "install_mobile",
    tint: "bg-secondary-container/25 text-secondary",
    title: "Progressive Web App",
    description:
      "Install eSumbong straight to your home screen — no app store, no login required to start reporting.",
  },
];

const faqs = [
  {
    q: "Do I need an account to report an issue?",
    a: "No. Anyone can browse projects and submit a report without logging in. eVerify only adds trust weight to a report if you choose to confirm your identity.",
  },
  {
    q: "How does eSumbong verify a report?",
    a: "Each report is geotagged and timestamped on capture, checked by eGovAI against the claimed completion percentage, and anchored to eGovChain for a tamper-evident record.",
  },
  {
    q: "What happens after I submit a report?",
    a: "It's reviewed automatically. If a discrepancy is found, the responsible agency is notified and the case moves through a public review workflow until it's resolved.",
  },
  {
    q: "Is my data safe?",
    a: "Reports are tied to a pseudonymous reference, not your real identity. No personal information is published alongside a report.",
  },
];

export default function LandingHeroPage() {
  return (
    <main className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden min-h-screen">
      <DesktopNav />

      {/* Hero */}
      <section className="pt-20 pb-24 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 flex flex-col items-start">
            <Eyebrow>CITIZEN-POWERED TRANSPARENCY</Eyebrow>
            <h1 className="font-black text-[40px] md:text-[60px] leading-[1.05] tracking-tight text-on-background mb-6">
              Every peso, <span className="text-primary">verified by citizens.</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-xl leading-relaxed mb-10">
              eSumbong lets any Filipino check a public infrastructure project&apos;s real progress against what
              was officially claimed — geotagged, AI-checked, and anchored to a tamper-evident record.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/home"
                className="bg-primary text-white px-8 py-4 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all"
              >
                Start a report
              </Link>
              <Link
                href="/dashboard"
                className="border border-outline-variant text-on-surface px-8 py-4 rounded-full font-label-md text-label-md hover:bg-surface-container transition-all"
              >
                Explore the dashboard
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[420px] hidden lg:block" aria-hidden="true">
            <div className="absolute top-0 left-4 w-72 bg-white rounded-2xl border border-outline-variant shadow-md p-5 rotate-[-2deg] motion-reduce:rotate-0">
              <p className="font-eyebrow text-eyebrow text-on-surface-variant uppercase tracking-wider mb-3">
                Recent Reports
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-md text-on-surface truncate">Quezon City Flood Control</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-error-container text-error shrink-0">
                    Flagged
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-md text-on-surface truncate">Pasig River Esplanade</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-primary-fixed text-primary shrink-0">
                    Verified
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-body-md text-on-surface truncate">Caloocan School Building</span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-secondary-fixed text-secondary shrink-0">
                    Pending
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute top-44 right-0 w-52 bg-white rounded-2xl border border-outline-variant shadow-md p-5 rotate-[1.5deg] motion-reduce:rotate-0">
              <p className="font-eyebrow text-eyebrow text-on-surface-variant uppercase tracking-wider mb-3">
                Live Reports
              </p>
              <div className="flex items-end gap-2 h-16">
                <div className="flex-1 bg-primary/20 rounded-t" style={{ height: "40%" }} />
                <div className="flex-1 bg-primary/40 rounded-t" style={{ height: "65%" }} />
                <div className="flex-1 bg-primary rounded-t" style={{ height: "90%" }} />
                <div className="flex-1 bg-primary/60 rounded-t" style={{ height: "55%" }} />
                <div className="flex-1 bg-primary/30 rounded-t" style={{ height: "70%" }} />
              </div>
            </div>

            <div className="absolute bottom-0 left-16 w-64 bg-primary rounded-2xl shadow-md p-5 rotate-[-1deg] motion-reduce:rotate-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white text-[20px]">verified</span>
                </div>
                <div>
                  <p className="font-bold text-white text-sm leading-tight">Report anchored</p>
                  <p className="text-white/70 text-xs">#ES-98231</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
        <Eyebrow>THE ESUMBONG NETWORK</Eyebrow>
        <h2 className="font-black text-[32px] md:text-[40px] leading-tight text-on-background mb-10 max-w-lg">
          One platform. <span className="text-primary">Every project.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between bg-white rounded-2xl border border-outline-variant p-6 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px]" aria-hidden="true">
                    {s.icon}
                  </span>
                </div>
                <span className="font-bold text-on-surface">{s.label}</span>
              </div>
              <div className="text-right">
                <p className="font-black text-4xl text-on-background leading-none">{s.value}</p>
                <p className="text-label-sm text-on-surface-variant mt-1">{s.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
        <Eyebrow>HOW IT WORKS</Eyebrow>
        <h2 className="font-black text-[32px] md:text-[40px] leading-tight text-on-background mb-12 max-w-lg">
          Built for <span className="text-primary">trust, end to end.</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-2xl border border-outline-variant p-8 motion-safe:hover:border-primary/30 motion-safe:hover:-translate-y-0.5 motion-safe:transition-all"
            >
              <div className={`w-10 h-10 rounded-lg ${s.tint} flex items-center justify-center mb-6`}>
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  {s.icon}
                </span>
              </div>
              <h3 className="font-bold text-lg text-on-surface mb-2">{s.title}</h3>
              <p className="text-on-surface-variant leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA band */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto py-12">
        <div className="bg-primary-fixed rounded-2xl px-8 py-16 md:px-16 flex flex-col items-center text-center gap-8">
          <h2 className="font-black text-[32px] md:text-[40px] leading-tight text-on-primary-fixed max-w-2xl">
            Your next report could be the one that gets a project back on track.
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/home"
              className="bg-primary text-white px-8 py-4 rounded-full font-label-md text-label-md hover:opacity-90 active:scale-95 transition-all"
            >
              Start a report
            </Link>
            <Link
              href="/dashboard"
              className="border border-primary/30 text-primary px-8 py-4 rounded-full font-label-md text-label-md hover:bg-white/50 transition-all"
            >
              Explore the dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto scroll-mt-20">
        <Eyebrow>GOT QUESTIONS?</Eyebrow>
        <h2 className="font-black text-[32px] md:text-[40px] leading-tight text-on-background mb-12 max-w-lg">
          Frequently <span className="text-primary">asked questions.</span>
        </h2>
        <div className="max-w-3xl space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="bg-white rounded-2xl border border-outline-variant px-6 py-4 group">
              <summary className="font-bold text-on-surface cursor-pointer list-none flex items-center justify-between gap-4">
                {f.q}
                <span
                  className="material-symbols-outlined text-on-surface-variant group-open:rotate-180 transition-transform shrink-0"
                  aria-hidden="true"
                >
                  expand_more
                </span>
              </summary>
              <p className="text-on-surface-variant leading-relaxed mt-3">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-outline-variant py-12">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <span className="font-headline text-headline-md font-black text-primary tracking-tight">
              eSumbong
            </span>
            <p className="text-on-surface-variant max-w-sm">
              A centralized platform for civic engagement and transparent project monitoring in the Philippines.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest">Resources</h4>
            <nav className="flex flex-col gap-2">
              <a
                className="text-on-surface-variant hover:text-primary transition-colors"
                href="https://github.com/caramel-123/esumbong-pwa/tree/main/src/app/api"
                target="_blank"
                rel="noopener noreferrer"
              >
                Developer APIs
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="mailto:privacy@esumbong.ph">
                Data Privacy
              </a>
              <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/features">
                User Manual
              </Link>
            </nav>
          </div>
          <div className="space-y-4">
            <h4 className="font-label-md text-label-md text-on-surface uppercase tracking-widest">Connect</h4>
            <nav className="flex flex-col gap-2">
              <a
                className="text-on-surface-variant hover:text-primary transition-colors"
                href="https://github.com/caramel-123/esumbong-pwa"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors" href="mailto:support@esumbong.ph">
                Email Support
              </a>
            </nav>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop mt-12 pt-8 border-t border-outline-variant flex flex-col md:flex-row gap-4 justify-between items-center text-label-sm text-on-surface-variant">
          <span>© 2026 eSumbong. Philippine Civic-Tech Initiative.</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                verified
              </span>{" "}
              eGov Verified
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
