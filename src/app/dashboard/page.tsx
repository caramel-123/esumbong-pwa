import DesktopNav from "@/components/DesktopNav";
import Eyebrow from "@/components/Eyebrow";
import { projects } from "@/lib/mock-data";

const statusBadge: Record<string, string> = {
  verified: "bg-blue-100 text-primary",
  pending: "bg-amber-100 text-secondary",
  flagged: "bg-red-100 text-error",
};

const progressColor: Record<string, string> = {
  verified: "bg-primary",
  pending: "bg-secondary",
  flagged: "bg-error",
};

export default function PublicDashboardDesktopPage() {
  return (
    <main className="overflow-x-hidden min-h-screen bg-surface">
      <DesktopNav active="dashboard" />

      <div className="flex min-h-[calc(100vh-64px)]">
        <aside className="w-80 bg-surface border-r border-outline-variant p-6 flex flex-col gap-8 overflow-y-auto hidden lg:flex">
          <div>
            <h3 className="font-eyebrow text-eyebrow text-on-surface-variant mb-4 uppercase">
              Filter by District
            </h3>
            <div className="relative">
              <select className="w-full bg-white border border-outline-variant rounded-lg px-4 py-3 text-body-md focus:ring-2 focus:ring-primary focus:border-primary appearance-none">
                <option>All Districts</option>
                <option>NCR - District I</option>
                <option>NCR - District II</option>
                <option>Region IV-A</option>
                <option>Region VII</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline">
                expand_more
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-eyebrow text-eyebrow text-on-surface-variant mb-4 uppercase">
              Implementing Agency
            </h3>
            <div className="flex flex-col gap-3">
              {["DPWH", "DOTr", "MMDA"].map((a) => (
                <label key={a} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    defaultChecked={a !== "MMDA"}
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary"
                    type="checkbox"
                  />
                  <span className="text-body-md text-on-surface group-hover:text-primary transition-colors">
                    {a}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-eyebrow text-eyebrow text-on-surface-variant mb-4 uppercase">
              Project Status
            </h3>
            <div className="flex flex-col gap-2">
              <button className="flex items-center justify-between px-4 py-2 rounded-full border border-outline-variant bg-white hover:bg-surface-container transition-colors">
                <span className="text-label-md">Verified</span>
                <span className="bg-blue-100 text-primary text-xs font-bold px-2 py-0.5 rounded-full">42</span>
              </button>
              <button className="flex items-center justify-between px-4 py-2 rounded-full border border-outline-variant bg-white hover:bg-surface-container transition-colors">
                <span className="text-label-md">Pending</span>
                <span className="bg-amber-100 text-secondary text-xs font-bold px-2 py-0.5 rounded-full">18</span>
              </button>
              <button className="flex items-center justify-between px-4 py-2 rounded-full border border-outline-variant bg-white hover:bg-surface-container transition-colors">
                <span className="text-label-md">Flagged</span>
                <span className="bg-red-100 text-error text-xs font-bold px-2 py-0.5 rounded-full">05</span>
              </button>
            </div>
          </div>
          <div className="mt-auto pt-6 border-t border-outline-variant">
            <div className="p-4 bg-primary-fixed rounded-lg flex flex-col gap-2">
              <div className="flex items-center gap-2 text-on-primary-fixed">
                <span className="material-symbols-outlined text-[20px]">info</span>
                <span className="font-label-md">Data Accuracy</span>
              </div>
              <p className="text-[12px] leading-tight text-on-primary-fixed opacity-80">
                Reports are verified via eGovAI triage and blockchain hashing for transparency.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-surface p-margin-desktop space-y-10">
          <div className="flex justify-between items-end">
            <div>
              <Eyebrow>PUBLIC ACCOUNTABILITY</Eyebrow>
              <h1 className="font-black text-[32px] md:text-[40px] leading-tight text-on-background">
                1,204 projects. <span className="text-primary">Every claim checked.</span>
              </h1>
              <p className="text-body-lg text-on-surface-variant mt-2">
                Real-time infrastructure monitoring powered by civic reports.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-outline-variant rounded-full text-label-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Live Sync Active
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-outline-variant rounded-2xl p-6 flex items-center gap-6 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform">
              <div className="w-14 h-14 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[32px]" aria-hidden="true">task_alt</span>
              </div>
              <div>
                <p className="text-on-surface-variant font-label-md">Audit Completion</p>
                <h2 className="text-headline-md font-black">94.2%</h2>
              </div>
            </div>
            <div className="bg-white border border-outline-variant rounded-2xl p-6 flex items-center gap-6 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform">
              <div className="w-14 h-14 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[32px]" aria-hidden="true">warning</span>
              </div>
              <div>
                <p className="text-on-surface-variant font-label-md">Anomalies Detected</p>
                <h2 className="text-headline-md font-black">12 Cases</h2>
              </div>
            </div>
            <div className="bg-white border border-outline-variant rounded-2xl p-6 flex items-center gap-6 motion-safe:hover:-translate-y-0.5 motion-safe:transition-transform">
              <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-on-surface">
                <span className="material-symbols-outlined text-[32px]" aria-hidden="true">account_balance</span>
              </div>
              <div>
                <p className="text-on-surface-variant font-label-md">Active Agencies</p>
                <h2 className="text-headline-md font-black">08 Depts</h2>
              </div>
            </div>
          </div>

          <div className="bg-white border border-outline-variant rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h2 className="text-headline-md font-bold">Project Breakdown</h2>
              <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-full text-label-md hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-[18px]">download</span> Export CSV
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="px-6 py-4 font-eyebrow text-eyebrow text-on-surface-variant uppercase">
                      Contract ID
                    </th>
                    <th className="px-6 py-4 font-eyebrow text-eyebrow text-on-surface-variant uppercase">
                      Project Name
                    </th>
                    <th className="px-6 py-4 font-eyebrow text-eyebrow text-on-surface-variant uppercase">
                      Agency
                    </th>
                    <th className="px-6 py-4 font-eyebrow text-eyebrow text-on-surface-variant uppercase">
                      Claimed %
                    </th>
                    <th className="px-6 py-4 font-eyebrow text-eyebrow text-on-surface-variant uppercase">
                      Actual %
                    </th>
                    <th className="px-6 py-4 font-eyebrow text-eyebrow text-on-surface-variant uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {projects.map((p) => (
                    <tr key={p.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-5 font-label-md text-primary">{p.contractId}</td>
                      <td className="px-6 py-5 font-body-md font-bold">{p.name}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 h-6 border border-outline-variant rounded-full px-2 text-[10px] bg-white">
                          <span className="font-bold text-primary">{p.agency}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-body-md">{p.claimedPct}%</td>
                      <td className="px-6 py-5 font-body-md">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-surface-container rounded-full h-1.5">
                            <div
                              className={`${progressColor[p.status]} h-full rounded-full`}
                              style={{ width: `${p.actualPct}%` }}
                            ></div>
                          </div>
                          <span>{p.actualPct}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`${statusBadge[p.status]} text-[10px] font-extrabold px-3 py-1 rounded-full uppercase`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center py-6 text-on-surface-variant">
            <div className="flex gap-6">
              <div className="flex items-center gap-2 border border-outline-variant rounded px-2 py-1 text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">verified_user</span> eVerify SECURED
              </div>
              <div className="flex items-center gap-2 border border-outline-variant rounded px-2 py-1 text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">link</span> eGovChain LOGGED
              </div>
            </div>
            <p className="text-label-sm">© 2026 eSumbong Civic Technologies. An official Philippine Digital Public Good.</p>
          </div>
        </main>
      </div>
    </main>
  );
}
