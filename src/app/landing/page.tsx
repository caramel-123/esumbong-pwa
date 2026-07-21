import Link from "next/link";
import DesktopNav from "@/components/DesktopNav";

export default function LandingHeroPage() {
  return (
    <main className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden font-body-md min-h-screen">
      <DesktopNav />

      <section className="relative pt-20 pb-32 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <span className="uppercase font-eyebrow text-eyebrow text-primary tracking-[0.2em] mb-4 bg-primary/5 px-4 py-1.5 rounded-full">
              TRANSPARENCY IN MOTION
            </span>
            <h1 className="font-headline-lg text-[48px] md:text-[64px] leading-[1.1] mb-6 text-on-background">
              Verifying Infrastructure for a{" "}
              <span className="text-primary-container">Better Philippines</span>
            </h1>
            <p className="font-subheadline text-subheadline text-outline mb-10 max-w-xl">
              A citizen-led accountability portal powered by eGovAI and Blockchain. Join thousands of
              Filipinos ensuring every peso builds a stronger nation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12">
              <div className="flex flex-col gap-1 border-l-2 border-primary-container pl-4">
                <span className="font-headline-md text-headline-md text-on-surface">1.2k</span>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Reports Verified
                </span>
              </div>
              <div className="flex flex-col gap-1 border-l-2 border-primary-container pl-4">
                <span className="font-headline-md text-headline-md text-on-surface">450</span>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Discrepancies Found
                </span>
              </div>
              <div className="flex flex-col gap-1 border-l-2 border-primary-container pl-4">
                <span className="font-headline-md text-headline-md text-on-surface">₱2.4B</span>
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Budget Tracked
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/home"
                className="bg-primary-container text-white px-8 py-4 rounded-full font-label-md text-label-md flex items-center gap-2 group transition-all"
              >
                Start a Report
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/dashboard"
                className="border border-outline-variant text-on-surface px-8 py-4 rounded-full font-label-md text-label-md flex items-center gap-2 hover:bg-surface-container transition-all"
              >
                View Project Map
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden border border-outline-variant shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover"
                alt="Bridge construction site"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzFFMSy1tcNR_SA5C0zM1x6tPc0nglZBvJB6c3KqjmNFbC8e061Zx0YzxmxDTd5u0nEJwYh6S3--4quHnsbQ7iYMbOpzfZKITrzcIDzwAq5QdhqSfHOL3MWdGsY0VfCPQmVpcewhJ31Dkg3OVmch7Soev6rPpBuXKKQAcMh4h_jtxqXJYesy_ZD3qUrJTI42YTSmkNOuG5DM27cOuuBRLyPrRAniYHzwXvSqyspDc6qutd4iyduWW2N-fkKLEK6m-NpjvUGBZf9po"
              />
              <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-3">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 shadow-sm scale-90 origin-left"
                  style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}
                >
                  <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
                  <span className="font-label-sm text-label-sm text-on-surface">eVerify Active</span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/30 shadow-sm scale-90 origin-left"
                  style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)" }}
                >
                  <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Compass Geotagged</span>
                </div>
              </div>
            </div>
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </section>

      <section className="border-t border-outline-variant bg-surface-container-low py-10 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">smart_toy</span>
              <span className="font-label-md text-label-md uppercase tracking-widest">eGovAI</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">link</span>
              <span className="font-label-md text-label-md uppercase tracking-widest">eGovChain</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">explore</span>
              <span className="font-label-md text-label-md uppercase tracking-widest">Compass</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">security</span>
              <span className="font-label-md text-label-md uppercase tracking-widest">eVerify</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
