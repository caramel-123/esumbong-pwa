"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SubmissionConfirmedPage() {
  const [timestamp, setTimestamp] = useState("");
  const [refId] = useState(
    () => `#ES-${Math.floor(10000 + Math.random() * 89999)}-TX`
  );

  useEffect(() => {
    const now = new Date();
    setTimestamp(
      now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }) + " PHT"
    );
  }, []);

  return (
    <main className="relative w-full min-h-screen max-w-[375px] mx-auto bg-surface text-on-surface flex flex-col items-center justify-between px-margin-mobile py-12 overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-primary-container/10 rounded-full blur-3xl -z-10"></div>

      <div className="flex-1 flex flex-col items-center justify-center w-full text-center space-y-8 mt-12">
        <div className="relative flex items-center justify-center w-24 h-24 bg-primary-container rounded-full shadow-[0_12px_24px_rgba(1,62,208,0.15)]">
          <span
            className="material-symbols-outlined text-white text-[48px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            check_circle
          </span>
        </div>
        <div className="space-y-3">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
            Report Submitted Successfully
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] mx-auto">
            Your report is now a permanent, tamper-evident public record.
          </p>
        </div>

        <div className="w-full max-w-[320px] bg-surface-container-low border border-outline-variant rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <span
                className="material-symbols-outlined text-[16px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_with_heart
              </span>
              <span className="font-label-sm text-label-sm text-primary uppercase">eGovChain</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Anchored to Blockchain</span>
          </div>
          <div className="space-y-2 text-left">
            <div className="flex flex-col">
              <span className="font-eyebrow text-eyebrow text-on-surface-variant opacity-60">REF ID</span>
              <span className="font-body-md text-body-md font-bold text-on-surface tracking-wider">
                {refId}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-eyebrow text-eyebrow text-on-surface-variant opacity-60">TIMESTAMP</span>
              <span className="font-body-md text-body-md text-on-surface">{timestamp}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-outline-variant/50">
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-label-md text-label-md">Verified Cryptographically</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-4 pb-4">
        <Link
          href="/home"
          className="w-full h-14 bg-primary-container text-white font-label-md text-label-md rounded-full shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Back to Home
        </Link>
        <p className="text-center font-label-sm text-label-sm text-on-surface-variant/70">
          You will receive updates via eMessage notifications.
        </p>
      </div>
    </main>
  );
}
