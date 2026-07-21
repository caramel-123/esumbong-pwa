"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPwaPromptPage() {
  const [visible, setVisible] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
      setDeferredPrompt(null);
    } else {
      // Browser didn't fire beforeinstallprompt (already installed, or
      // unsupported browser like iOS Safari, which needs manual "Add to
      // Home Screen" from the share sheet instead).
      setInstalled(true);
    }
  };

  return (
    <main className="relative w-full min-h-screen max-w-[375px] mx-auto bg-surface font-body-md text-on-surface overflow-hidden">
      <div className="fixed inset-0 z-0 bg-surface-variant"></div>

      <header className="sticky top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center h-16 px-margin-mobile">
        <div className="flex items-center gap-3">
          <button className="p-2 text-primary opacity-80">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <h1 className="font-headline-md text-headline-md font-black text-primary tracking-tight">
            eSumbong
          </h1>
        </div>
        <Link
          href="/report/capture"
          className="bg-primary-container text-white px-4 py-2 rounded-full font-label-md transition-all active:scale-95 shadow-md"
        >
          Report Project
        </Link>
      </header>

      {visible && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center px-gutter pb-32 bg-on-background/40">
          <div
            className="w-full max-w-md rounded-lg border border-outline-variant/30 shadow-[0_12px_40px_rgba(26,29,41,0.15)] p-6 relative overflow-hidden flex flex-col gap-6"
            style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(12px)" }}
          >
            <button
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface"
              onClick={() => setVisible(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-20 h-20 bg-primary-container rounded-lg flex items-center justify-center shadow-lg">
                <span
                  className="material-symbols-outlined text-white !text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  campaign
                </span>
              </div>
              <div className="space-y-1">
                <h2 className="font-headline-md text-headline-md text-primary">
                  {installed ? "eSumbong is installed" : "Add eSumbong to Home Screen"}
                </h2>
                <p className="text-on-surface-variant font-body-md px-4">
                  {installed
                    ? "Open it anytime from your home screen, even offline."
                    : "Install for a faster, app-like experience with offline reporting."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container-low p-3 rounded flex items-center gap-3 border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                  bolt
                </span>
                <span className="text-label-sm font-label-sm text-on-surface">Faster Load</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded flex items-center gap-3 border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                  wifi_off
                </span>
                <span className="text-label-sm font-label-sm text-on-surface">Offline Mode</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded flex items-center gap-3 border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                  notifications_active
                </span>
                <span className="text-label-sm font-label-sm text-on-surface">Real-time Alerts</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded flex items-center gap-3 border border-outline-variant/20">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                  share_location
                </span>
                <span className="text-label-sm font-label-sm text-on-surface">Better GPS</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {!installed ? (
                <>
                  <button
                    onClick={handleInstall}
                    className="bg-primary-container text-white py-4 rounded-full font-headline-md text-lg shadow-xl hover:bg-primary transition-all active:scale-95"
                  >
                    Install Now
                  </button>
                  <button
                    className="text-on-surface-variant font-label-md py-2 hover:text-on-surface transition-colors"
                    onClick={() => setVisible(false)}
                  >
                    Not right now
                  </button>
                </>
              ) : (
                <Link
                  href="/home"
                  className="bg-primary-container text-white py-4 rounded-full font-headline-md text-lg shadow-xl hover:bg-primary transition-all active:scale-95 text-center"
                >
                  Continue to eSumbong
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
