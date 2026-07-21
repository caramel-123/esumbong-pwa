import Link from "next/link";
import { getProject } from "@/lib/mock-data";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);

  return (
    <main className="w-full max-w-[375px] min-h-screen mx-auto bg-surface relative flex flex-col shadow-2xl overflow-hidden">
      <nav className="sticky top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center h-16 px-margin-mobile">
        <div className="flex items-center gap-3">
          <Link href="/home" className="p-2 -ml-2 transition-transform active:scale-90 text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline text-headline-md font-black text-primary tracking-tight truncate max-w-[200px]">
            {project.name}
          </h1>
        </div>
        <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">share</span>
        </button>
      </nav>

      <div className="flex-1 overflow-y-auto pb-32">
        <section className="relative w-full h-48 mb-6 bg-surface-variant">
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className="flex items-center gap-1 px-3 py-1 bg-surface-container-lowest border border-outline-variant rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[14px] text-primary">explore</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface">
                Compass
              </span>
            </div>
          </div>
        </section>

        <div className="px-margin-mobile mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-secondary-fixed text-secondary font-label-sm text-label-sm rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">history_toggle_off</span>
              PENDING / UNDER REVIEW
            </span>
          </div>
          <h2 className="font-headline text-headline-lg-mobile text-primary leading-tight mb-2">
            {project.name}
          </h2>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            <span className="font-body-md text-body-md">{project.location}</span>
          </div>
        </div>

        <div className="px-margin-mobile mb-6">
          <div className="bg-surface-container-low border border-outline-variant p-6 rounded-lg relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[18px]">database</span>
                </div>
                <div>
                  <p className="font-eyebrow text-eyebrow text-on-surface-variant uppercase">Source</p>
                  <p className="font-label-md text-label-md text-primary">Compass Budget Registry</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-outline-variant">verified</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Project Budget
                </span>
                <span className="font-headline text-headline-md text-on-surface">{project.budget}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant mb-1">
                  Claimed Completion
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline text-headline-md text-on-surface">
                    {project.claimedPct}%
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
                </div>
              </div>
              <div className="col-span-2 pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mb-1 block">
                    Lead Agency
                  </span>
                  <span className="font-label-md text-label-md text-on-surface">{project.agency}</span>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-white">corporate_fare</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-margin-mobile mb-6">
          <div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg">
            <h3 className="font-label-md text-label-md text-primary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">info</span>
              PROJECT DESCRIPTION
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="h-6 px-3 bg-surface-container border border-outline-variant rounded-full flex items-center gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">eVerify Secured</span>
              </div>
              <div className="h-6 px-3 bg-surface-container border border-outline-variant rounded-full flex items-center gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">eGovChain Logged</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-surface p-margin-mobile border-t border-outline-variant/30 flex flex-col gap-4 shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
        <Link
          href={`/report/capture?project=${project.id}`}
          className="w-full bg-primary-container text-white py-4 rounded-full font-headline text-headline-md shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95 group"
        >
          <span
            className="material-symbols-outlined text-[28px] group-hover:rotate-12 transition-transform"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            photo_camera
          </span>
          Report What You See
        </Link>
        <p className="text-center font-label-sm text-label-sm text-on-surface-variant">
          Your report will be automatically geotagged and verified via{" "}
          <span className="text-primary">eVerify</span>.
        </p>
      </div>
    </main>
  );
}
