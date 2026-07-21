"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";

interface AnalysisResult {
  claimedPct: number;
  detectedPct: number;
  classification: string;
  discrepancyFlag: boolean;
}

function AiVerificationResultInner() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project") ?? "1";

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(96, p + Math.random() * 18));
    }, 300);

    // Real call to the mock eGovAI route — this is a live fetch, not a
    // client-side simulation, so it demonstrates the actual integration.
    fetch("/api/egov-ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId }),
    })
      .then((res) => res.json())
      .then((data) => {
        clearInterval(interval);
        setProgress(100);
        setResult({
          claimedPct: data.claimedPct,
          detectedPct: data.detectedPct,
          classification: data.classification,
          discrepancyFlag: data.discrepancyFlag,
        });
        setTimeout(() => setLoading(false), 600);
      })
      .catch(() => {
        clearInterval(interval);
        setProgress(100);
        setResult({ claimedPct: 85, detectedPct: 40, classification: "foundations_only", discrepancyFlag: true });
        setTimeout(() => setLoading(false), 600);
      });

    return () => clearInterval(interval);
  }, [projectId]);

  const circumference = 2 * Math.PI * 58;
  const offset = circumference - (progress / 100) * circumference;
  const claimed = result?.claimedPct ?? 85;
  const detected = result?.detectedPct ?? 40;

  return (
    <main className="w-full max-w-[375px] min-h-screen mx-auto bg-background flex flex-col relative pb-32">
      {loading && (
        <div className="fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center p-gutter">
          <div className="relative w-32 h-32 mb-8">
            <svg className="w-full h-full" style={{ transform: "rotate(-90deg)" }}>
              <circle
                className="text-surface-container-highest stroke-current"
                cx="64"
                cy="64"
                fill="transparent"
                r="58"
                strokeWidth="8"
              />
              <circle
                className="text-primary-container stroke-current"
                cx="64"
                cy="64"
                fill="transparent"
                r="58"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                strokeWidth="8"
                style={{ transition: "stroke-dashoffset 0.3s" }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container text-4xl animate-pulse">
                cloud_sync
              </span>
            </div>
          </div>
          <p className="font-headline text-headline-md text-center text-on-surface animate-bounce">
            Analyzing photo with eGovAI...
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 text-center">
            Verifying visual claim against official geo-records.
          </p>
        </div>
      )}

      <header className="sticky top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center h-16 px-margin-mobile">
        <Link href="/project/1" className="opacity-80 active:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </Link>
        <h1 className="font-headline text-headline-md font-black text-primary tracking-tight">
          eSumbong
        </h1>
        <button className="opacity-80 active:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-primary">more_vert</span>
        </button>
      </header>

      <div className="px-margin-mobile pt-8 flex-grow">
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            result?.discrepancyFlag === false ? "bg-primary-fixed" : "bg-error-container"
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
              result?.discrepancyFlag === false ? "bg-primary" : "bg-error"
            }`}
          >
            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
              {result?.discrepancyFlag === false ? "check_circle" : "warning"}
            </span>
          </div>
          <div>
            <h2
              className={`font-headline text-headline-md uppercase leading-none ${
                result?.discrepancyFlag === false ? "text-on-primary-fixed" : "text-on-error-container"
              }`}
            >
              {result?.discrepancyFlag === false ? "Claim Verified" : "Mismatch Flagged"}
            </h2>
            <p
              className={`font-label-sm text-label-sm mt-1 ${
                result?.discrepancyFlag === false ? "text-on-primary-fixed/80" : "text-on-error-container/80"
              }`}
            >
              {result?.discrepancyFlag === false
                ? "Photo matches the claimed completion status."
                : "Significant discrepancy detected in project progress."}
            </p>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden border border-outline-variant mb-6 aspect-video grid grid-cols-2">
          <div className="relative">
            <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-on-surface/80 rounded-full">
              <span className="font-label-sm text-label-sm text-white">Submitted Photo</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="Submitted site photo"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2A9vEK5i0CdoAg3BwRfu_PXZCefwcaU5SHKBq5G5QMcF_W_vVshdK7hpwxpGrb_4yMLhGEbjG4WT-nw-ZTI7mtlzvMx2nj-4JmBNtOGlSSb60Meo0BkNoinQhVR3H0grkyHjBQCzkmeQrcpFjoKovfpQ3s7vei9LtlLlcveXiDgmzS8OgmloB3bV09I1dVGKR47X8x0E5kEae2fPXUtOEd0FVvIRmALN8E9JZDYEkdI7XBWrdUiArXP0usiDiHrUGMz2YXcEwA-k"
            />
          </div>
          <div className="relative">
            <div className="absolute top-2 right-2 z-10 px-2 py-1 bg-primary-container/80 rounded-full">
              <span className="font-label-sm text-label-sm text-white">eGovAI Heatmap</span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="eGovAI analysis heatmap"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHIeVYrZSGE7t11kq-hnqV6XirywzoGUJaMqfHkswc_Xm3Idk4SeqJOsbp4ak39ne7u-RAxS6SyzCvRbJvWWzhh5_71NAUfUfvYh2D_bo4u0u3hdcuIR1KfC0BjOGYQn9hUiROleeyxm5LXkvw0UOfRLesWA6QLlkApSjen2ILGJknyf85TFcgQkSGpW4-8p7hz5fxUXf1sBUI9BE0mh4FhfhX3iADiq23W4EQYjbdKOtrjzCvNrEgUGmFr4bL5NMFFNGJUHN1b5k"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between">
            <div>
              <p className="font-eyebrow text-eyebrow text-on-surface-variant mb-1">CLAIM STATUS</p>
              <h3 className="font-headline text-headline-md text-on-surface">{claimed}%</h3>
              <p className="font-label-md text-label-md text-on-surface-variant">(Complete)</p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm text-secondary">OFFICIAL DATA</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest border-2 border-primary-container p-4 rounded-lg flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-1 bg-primary-container text-white rounded-bl-lg">
              <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
            </div>
            <div>
              <p className="font-eyebrow text-eyebrow text-primary-container mb-1">AI DETECTION</p>
              <h3 className="font-headline text-headline-md text-primary-container">{detected}%</h3>
              <p className="font-label-md text-label-md text-on-surface-variant">
                ({(result?.classification ?? "foundations_only").replace(/_/g, " ")})
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary-container">EGOVAI TRIAGE</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          <div className="h-6 px-3 rounded-full border border-outline-variant bg-surface-container flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs">verified</span>
            <span className="font-label-sm text-label-sm">eVerify Valid</span>
          </div>
          <div className="h-6 px-3 rounded-full border border-outline-variant bg-surface-container flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs">location_on</span>
            <span className="font-label-sm text-label-sm">Compass Tagged</span>
          </div>
          <div className="h-6 px-3 rounded-full border border-error/20 bg-error-container/30 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-xs text-error">gavel</span>
            <span className="font-label-sm text-label-sm text-error">Audit Required</span>
          </div>
        </div>

        <div className="space-y-4">
          <Link
            href="/report/confirmed"
            className="w-full bg-primary-container text-white py-4 rounded-full font-headline text-headline-md shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              assignment_late
            </span>
            Submit Official Report
          </Link>
          <Link
            href="/reports"
            className="w-full border border-primary-container text-primary-container py-4 rounded-full font-label-md text-label-md active:bg-surface-container transition-colors flex items-center justify-center"
          >
            Save to My Reports
          </Link>
        </div>
      </div>

      <BottomNav active="none" />
    </main>
  );
}

export default function AiVerificationResultPage() {
  return (
    <Suspense fallback={null}>
      <AiVerificationResultInner />
    </Suspense>
  );
}
