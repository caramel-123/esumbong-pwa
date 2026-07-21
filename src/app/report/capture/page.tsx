"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

function CameraCaptureInner() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get("project") ?? "1";
  const [timestamp, setTimestamp] = useState("");
  const [flash, setFlash] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState(false);

  useEffect(() => {
    const now = new Date();
    setTimestamp(
      now.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    );

    // In-app camera only, no gallery picker. Falls back to the
    // background placeholder image if permission is denied.
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => setCameraError(true));
  }, []);

  const handleShutter = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
    if (navigator.vibrate) navigator.vibrate(50);
  };

  return (
    <main className="relative w-full h-screen max-w-[375px] mx-auto overflow-hidden bg-black flex flex-col">
      {flash && <div className="fixed inset-0 bg-white z-[100] transition-opacity duration-300" />}

      <div className="absolute inset-0 z-0">
        {!cameraError ? (
          <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="w-full h-full object-cover"
            alt="Construction site"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBneYAzy4Jvk0YRA4cCUEIF1bxkfCYcNapfwmYtYx7cKSOr196UQtiYlG3SlOyOJIj6aLi80b7w5Gub-tdLG2XGUUl_O5JtoFzamVVuYMqpSPSOyMNq3kZ6MvDF6SpPQM_Yj_A9vHjMjKTUZp2stlj3iThz8eVp4v7JWerwTJVLeSfazt69dg2IQyZ-YYUzqAeTwitXuWmW-C38QWiprNPFxPZDSSuq82uZLQskwIZILr7QEiQ9OL8czziTR0Pcv1JLjPfXeGc42p0"
          />
        )}
      </div>
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <header className="relative z-20 pt-12 px-5 flex flex-col gap-3 items-center">
        <div className="w-full flex justify-start">
          <Link
            href="/home"
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <span className="material-symbols-outlined">close</span>
          </Link>
        </div>

        {/* Premium verification seal */}
        <div className="flex flex-col items-center gap-2 px-5 py-3 rounded-2xl bg-black/50 backdrop-blur-xl border border-[#FFB613]/50 shadow-[0_0_28px_rgba(255,182,19,0.18)]">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[#FFB613] text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield
            </span>
            <span className="text-[#FFB613] font-black text-[12px] uppercase tracking-[0.14em]">
              Compass Verified
            </span>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <div className="flex items-center gap-1.5 border-r border-white/20 pr-3">
              <span className="material-symbols-outlined text-[16px] text-white/70">location_on</span>
              <span className="font-label-sm text-label-sm tracking-tight">14.5995° N, 120.9842° E</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-white/70">schedule</span>
              <span className="font-label-sm text-label-sm tracking-tight">{timestamp}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-3 py-1">
          <span className="material-symbols-outlined text-[12px] text-primary-fixed">auto_awesome</span>
          <span className="text-[10px] font-bold text-white uppercase tracking-widest">eGovAI Triage</span>
        </div>
      </header>

      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 border-2 border-white/30 rounded-lg relative">
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-sm"></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-sm"></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-sm"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-sm"></div>
        </div>
      </div>

      <footer className="absolute bottom-0 left-0 w-full z-20 pb-12 flex flex-col items-center">
        <div className="mb-6 px-6 py-2.5 bg-black/50 backdrop-blur-md rounded-full max-w-[280px] mx-auto">
          <p className="text-white text-center font-body-md text-[14px] leading-snug">
            Point camera at the issue you want to report.
          </p>
        </div>
        <div className="mb-8 flex flex-col items-center gap-1">
          <div className="w-48 h-1 bg-white/20 rounded-full relative overflow-hidden">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-primary-fixed z-10"></div>
          </div>
          <span className="text-white/60 font-label-sm text-[10px] uppercase tracking-tighter">
            Maintain Level Device
          </span>
        </div>
        <div className="flex items-center justify-center w-full px-12">
          <Link
            href={`/report/analyzing?project=${projectId}`}
            onClick={handleShutter}
            className="relative group"
          >
            <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 transition-transform active:scale-95">
              <div
                className="w-full h-full rounded-full bg-primary-container flex items-center justify-center shadow-lg"
                style={{ boxShadow: "0 0 20px rgba(1, 62, 208, 0.4)" }}
              >
                <span
                  className="material-symbols-outlined text-white text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  photo_camera
                </span>
              </div>
            </div>
          </Link>
        </div>
      </footer>
    </main>
  );
}

export default function CameraCapturePage() {
  return (
    <Suspense fallback={null}>
      <CameraCaptureInner />
    </Suspense>
  );
}
