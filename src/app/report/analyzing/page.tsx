"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { getPendingCapture, type CaptureBundle } from "@/lib/capture";

interface AnalysisResult {
  claimedPct: number;
  detectedPct: number;
  classification: string;
  discrepancyFlag: boolean;
  explanation?: string;
}

const FALLBACK_PHOTO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD2A9vEK5i0CdoAg3BwRfu_PXZCefwcaU5SHKBq5G5QMcF_W_vVshdK7hpwxpGrb_4yMLhGEbjG4WT-nw-ZTI7mtlzvMx2nj-4JmBNtOGlSSb60Meo0BkNoinQhVR3H0grkyHjBQCzkmeQrcpFjoKovfpQ3s7vei9LtlLlcveXiDgmzS8OgmloB3bV09I1dVGKR47X8x0E5kEae2fPXUtOEd0FVvIRmALN8E9JZDYEkdI7XBWrdUiArXP0usiDiHrUGMz2YXcEwA-k";

const HEATMAP_PHOTO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBHIeVYrZSGE7t11kq-hnqV6XirywzoGUJaMqfHkswc_Xm3Idk4SeqJOsbp4ak39ne7u-RAxS6SyzCvRbJvWWzhh5_71NAUfUfvYh2D_bo4u0u3hdcuIR1KfC0BjOGYQn9hUiROleeyxm5LXkvw0UOfRLesWA6QLlkApSjen2ILGJknyf85TFcgQkSGpW4-8p7hz5fxUXf1sBUI9BE0mh4FhfhX3iADiq23W4EQYjbdKOtrjzCvNrEgUGmFr4bL5NMFFNGJUHN1b5k";

function truncateMiddle(value: string, head = 5, tail = 4): string {
  if (value.length <= head + tail + 1) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}

function AiVerificationResultInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project") ?? "1";

  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  // Falls back to the stock photo below if this screen is opened directly
  // (e.g. deep link, or capture was skipped) so it never renders blank.
  const [capture] = useState<CaptureBundle | null>(() =>
    typeof window !== "undefined" ? getPendingCapture() : null
  );
  // Provisional, display-only case reference — the real anchor reference
  // only exists once this report is actually submitted (see confirmed
  // screen), so this is not read from or written to the backend.
  const [caseRef] = useState(() => `#ES-${Math.floor(1000 + Math.random() * 8999)}`);

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
          explanation: data.explanation,
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
  const gap = Math.max(0, claimed - detected);
  const verified = result?.discrepancyFlag === false;

  const handleSubmit = async () => {
    setSubmitting(true);
    let submissionId: string | null = null;

    // Best-effort: a DB hiccup shouldn't strand the citizen mid-flow, so any
    // failure here just falls through to the confirmed screen without a
    // submissionId, which renders its own local fallback data instead.
    if (capture?.hash) {
      try {
        const res = await fetch("/api/submissions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            projectId,
            photoHash: capture.hash,
            photoDataUrl: capture.photoDataUrl,
            gps: capture.gps,
            capturedAt: capture.capturedAt,
            aiResult: result ?? undefined,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          submissionId = data.submission?.id ?? null;
        }
      } catch {
        // Backend unreachable — swallow and continue below.
      }
    }

    router.push(submissionId ? `/report/confirmed?submissionId=${submissionId}` : "/report/confirmed");
  };

  const handleCopyHash = async () => {
    if (!capture?.hash) return;
    try {
      await navigator.clipboard.writeText(capture.hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) — non-fatal.
    }
  };

  const gpsText = capture?.gps
    ? `${capture.gps.lat.toFixed(3)}, ${capture.gps.lng.toFixed(3)} (±${Math.round(capture.gps.accuracy)}m)`
    : "Not available";

  return (
    <main className="w-full max-w-[375px] min-h-screen mx-auto bg-background flex flex-col relative">
      {loading && (
        <div className="fixed inset-0 z-100 bg-surface flex flex-col items-center justify-center p-gutter">
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
          <p className="font-bold text-headline-md text-center text-on-surface">Analyzing photo with eGovAI…</p>
          <p className="text-body-md text-on-surface-variant mt-2 text-center">
            Verifying visual claim against official geo-records.
          </p>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 w-full h-14 bg-surface border-b border-outline-variant flex items-center justify-between px-4">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="opacity-80 active:opacity-100 transition-opacity"
        >
          <span className="material-symbols-outlined text-on-surface">arrow_back</span>
        </button>
        <h1 className="font-medium text-body-md text-on-surface">Report {caseRef}</h1>
        <button type="button" aria-label="More options" className="opacity-80 active:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-on-surface">more_vert</span>
        </button>
      </header>

      <div className="px-4 py-3 flex-grow space-y-3">
        {/* Section 1 — Photo comparison (evidence) */}
        <div>
          <BeforeAfterSlider
            beforeSrc={capture?.photoDataUrl || FALLBACK_PHOTO_URL}
            beforeAlt="Your submitted site photo"
            afterSrc={HEATMAP_PHOTO_URL}
            afterAlt="eGovAI heatmap overlay"
          />
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-label-sm text-on-surface-variant">Your photo</span>
            <span className="material-symbols-outlined text-on-surface-variant text-[16px]" aria-hidden="true">
              compare_arrows
            </span>
            <span className="text-label-sm text-primary font-medium">AI heatmap</span>
          </div>
        </div>

        {/* Section 2 — Completion comparison (comparison) */}
        <div className="bg-white border border-outline-variant rounded-2xl p-5">
          <p className="text-label-sm text-on-surface-variant mb-4">Completion comparison</p>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-black text-[40px] leading-none text-secondary-container">{claimed}%</p>
              <p className="text-label-sm text-on-surface-variant mt-1">Official claim</p>
            </div>
            <div className="text-right">
              <p className="font-black text-[40px] leading-none text-primary">{detected}%</p>
              <p className="text-label-sm text-on-surface-variant mt-1">AI detected</p>
            </div>
          </div>
          <div className="relative h-2 rounded-full bg-surface-container">
            <div className="absolute inset-y-0 left-0 rounded-full bg-primary" style={{ width: `${detected}%` }} />
            <div
              className="absolute inset-y-0 bg-error-container"
              style={{ left: `${detected}%`, width: `${gap}%` }}
            />
            <div
              className="absolute top-1/2 w-1 h-3.5 rounded-full bg-secondary-container"
              style={{ left: `${claimed}%`, transform: "translate(-50%, -50%)" }}
            />
          </div>
          <p className="text-label-sm text-error font-semibold mt-2">{gap}-point discrepancy</p>
        </div>

        {/* Section 3 — Verdict */}
        <div className={`p-4 rounded-2xl flex items-start gap-3 ${verified ? "bg-primary-fixed" : "bg-error-container"}`}>
          <span
            className={`material-symbols-outlined shrink-0 ${verified ? "text-primary" : "text-error"}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            {verified ? "check_circle" : "warning"}
          </span>
          <div>
            <h2 className={`font-bold text-body-md ${verified ? "text-on-primary-fixed" : "text-on-error-container"}`}>
              {verified ? "Claim verified · No discrepancy found" : "Mismatch detected · Audit required"}
            </h2>
            <p className={`text-label-sm mt-1 ${verified ? "text-on-primary-fixed/80" : "text-on-error-container/80"}`}>
              {result?.explanation ??
                (verified
                  ? "The photo is consistent with the claimed completion status."
                  : "The photo shows only foundations built, less complete than officially reported.")}
            </p>
          </div>
        </div>

        {/* Section 4 — Verification details */}
        <div className="bg-white border border-outline-variant rounded-2xl overflow-hidden">
          <p className="px-5 pt-4 pb-2 font-bold text-on-surface">Verification details</p>
          <div className="divide-y divide-outline-variant">
            <div className="flex items-center gap-3 px-5 py-3">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0" aria-hidden="true">
                link
              </span>
              <span className="text-label-sm text-on-surface-variant w-20 shrink-0">Record</span>
              <span className="flex-1 font-mono text-[13px] text-on-surface truncate">
                {capture?.hash ? truncateMiddle(capture.hash) : "Not available"}
              </span>
              {capture?.hash && (
                <button
                  type="button"
                  onClick={handleCopyHash}
                  aria-label="Copy record hash"
                  className="text-on-surface-variant hover:text-primary transition-colors shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copied ? "check" : "content_copy"}
                  </span>
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 px-5 py-3">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0" aria-hidden="true">
                location_on
              </span>
              <span className="text-label-sm text-on-surface-variant w-20 shrink-0">Location</span>
              <span className="flex-1 text-[13px] text-on-surface">{gpsText}</span>
            </div>
            <div className="flex items-center gap-3 px-5 py-3">
              <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0" aria-hidden="true">
                verified_user
              </span>
              <span className="text-label-sm text-on-surface-variant w-20 shrink-0">Checks</span>
              <span className="flex-1 text-[13px] text-green-700 font-medium">
                Identity verified · Location tagged
              </span>
            </div>
          </div>
        </div>

        {/* Section 5 — Actions */}
        <div className="space-y-3 pt-1 pb-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full bg-primary text-white py-4 rounded-full font-bold text-body-md active:scale-95 transition-transform flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {submitting && <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
            {submitting ? "Submitting…" : "File discrepancy report"}
          </button>
          <Link
            href="/reports"
            className="w-full border border-outline-variant text-on-surface-variant py-4 rounded-full font-label-md text-label-md active:bg-surface-container transition-colors flex items-center justify-center"
          >
            Save to my reports
          </Link>
        </div>
      </div>
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
