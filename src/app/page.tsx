"use client";

import Link from "next/link";
import { useState } from "react";

export default function SplashLoginPage() {
  const [connecting, setConnecting] = useState(false);

  return (
    <main
      className="relative w-full min-h-screen max-w-[375px] mx-auto bg-surface overflow-hidden flex flex-col items-center justify-between py-16 px-margin-mobile shadow-2xl"
      style={{ background: "radial-gradient(circle at 50% -20%, #e0e1f2 0%, #faf8ff 60%)" }}
    >
      <div className="flex flex-col items-center mt-12 space-y-6">
        <div className="relative">
          <div className="absolute -inset-8 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="w-24 h-24 bg-surface-container-lowest rounded-lg border border-outline-variant flex items-center justify-center relative z-10 shadow-[0_8px_32px_rgba(1,62,208,0.1)]">
            <div className="text-primary-container">
              <span
                className="material-symbols-outlined !text-5xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_balance
              </span>
            </div>
          </div>
        </div>
        <div className="text-center space-y-1">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">
            eSumbong
          </h1>
          <p className="font-label-md text-label-md text-on-surface-variant/80 tracking-wider">
            CIVIC EMPOWERMENT PORTAL
          </p>
        </div>
      </div>

      <div className="relative w-full flex justify-center py-8">
        <div className="w-full h-48 rounded-lg relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/5 rounded-lg"></div>
          <div className="flex items-center gap-4 opacity-20">
            <span className="material-symbols-outlined !text-6xl text-primary">diversity_3</span>
            <span
              className="material-symbols-outlined !text-8xl text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="material-symbols-outlined !text-6xl text-primary">public</span>
          </div>
          <div className="absolute bottom-4 text-center px-6">
            <p className="font-body-md text-body-md text-on-surface-variant italic">
              Connecting communities to governance with transparency.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-6 mb-8">
        <Link
          href="/home"
          onClick={() => setConnecting(true)}
          className="w-full h-14 bg-primary-container text-on-primary rounded-full font-label-md text-label-md shadow-lg flex items-center justify-center gap-3 active:scale-[0.96] transition-transform"
        >
          {connecting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Connecting...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-xl">login</span>
              Log in with eGovPH
            </>
          )}
        </Link>

        <div className="flex items-center justify-center gap-2 bg-surface-container-low border border-outline-variant rounded-full px-4 py-2 shadow-sm">
          <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full">
            <span
              className="material-symbols-outlined !text-[16px] text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield_with_heart
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Identity verified via <span className="font-bold text-primary">eVerify</span> (PhilSys)
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 mt-4">
          <Link href="/landing" className="font-label-md text-label-md text-primary-container hover:underline">
            View the public accountability site
          </Link>
          <div className="h-1 w-12 bg-outline-variant/30 rounded-full mt-4"></div>
        </div>
      </div>

      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
    </main>
  );
}
