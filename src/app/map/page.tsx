"use client";

import Link from "next/link";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";

const mapFilters = ["All Issues", "Roads", "Waste", "Water"];

const pins = [
  {
    href: "/project/1",
    top: "32%",
    left: "24%",
    status: "VERIFIED",
    color: "bg-primary",
    ring: "border-primary",
    icon: "construction",
  },
  {
    href: "/project/2",
    top: "45%",
    left: "66%",
    status: "PENDING",
    color: "bg-secondary-container",
    ring: "border-secondary-container",
    icon: "delete",
  },
  {
    href: "/project/3",
    top: "66%",
    left: "50%",
    status: "FLAGGED",
    color: "bg-error",
    ring: "border-error",
    icon: "priority_high",
  },
];

export default function HomeMapPage() {
  const [activeFilter, setActiveFilter] = useState(mapFilters[0]);

  return (
    <main className="relative w-full h-dvh max-w-[375px] mx-auto overflow-hidden bg-[#dbe4f5]">
      {/* Full-bleed map, fills entire screen */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover"
          alt="Map of Manila"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXOTqu4J9EusIssLa53RAT_yv3bmbZDs8mTtWOrC_UEmHC0sgg-fVZlhU3j-G5zMqffFs9T-nNXjmc6AV1SrNhVj-I0hPc1GCAPN2tyD4PfOM6jtJE3TMSfa1s78l203MFJwaA4puvlnItCXIwcBhwtgz5hB6YInNslWT3otxGp8zcPt1Iz-d9fnCMd81Js3lfxBkOrVfFQsFwWb4cEnJ5Bg567fOJs0_KvPp2-QmNUQ0NhL9wz0YPNI8YkcMu3LG7z8cpnSJoHwU"
        />
      </div>

      {/* Top scrim so status bar + floating header stay legible over the map */}
      <div
        className="absolute top-0 inset-x-0 h-44 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(0,17,64,0.45) 0%, rgba(0,17,64,0) 100%)" }}
      />

      {/* Device status bar (mock) */}
      <div className="relative z-30 h-11 w-full flex items-center justify-between px-6 text-white drop-shadow-sm">
        <span className="font-bold text-[14px]">9:41</span>
        <div className="flex gap-1.5 items-center">
          <span className="material-symbols-outlined text-[18px]">signal_cellular_4_bar</span>
          <span className="material-symbols-outlined text-[18px]">wifi</span>
          <span className="material-symbols-outlined text-[20px]">battery_full</span>
        </div>
      </div>

      {/* Floating brand + search + filters, blurred over the map */}
      <div className="absolute top-11 inset-x-0 px-margin-mobile pt-3 z-30 flex flex-col gap-3">
        <div className="flex items-center bg-white/80 backdrop-blur-xl rounded-full p-1.5 shadow-lg border border-white/60 gap-1">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-white text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield
            </span>
          </div>
          <input
            className="flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-on-surface font-body-md text-[14px] placeholder:text-on-surface-variant/60 py-1.5 outline-none"
            placeholder="Search projects, locations..."
            type="text"
          />
          <div className="w-9 h-9 flex items-center justify-center text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {mapFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
                activeFilter === filter
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-white/80 backdrop-blur-xl text-on-surface-variant border border-white/60 shadow-sm"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Map pins — larger badges with white outline for legibility */}
      {pins.map((pin) => (
        <Link
          key={pin.href}
          href={pin.href}
          className="absolute z-20 flex flex-col items-center cursor-pointer group -translate-x-1/2 -translate-y-full"
          style={{ top: pin.top, left: pin.left }}
        >
          <div
            className={`absolute -top-9 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border ${pin.ring} shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}
          >
            <span className="font-label-sm text-label-sm uppercase text-on-surface">{pin.status}</span>
          </div>
          <div
            className={`w-12 h-12 rounded-full ${pin.color} border-[3px] border-white shadow-[0_3px_10px_rgba(0,0,0,0.35)] flex items-center justify-center`}
          >
            <span className="material-symbols-outlined text-white text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {pin.icon}
            </span>
          </div>
          <div className={`w-3 h-3 ${pin.color} rotate-45 -mt-1.5 border-r-[3px] border-b-[3px] border-white`} />
        </Link>
      ))}

      {/* Map controls */}
      <div className="absolute z-30 right-margin-mobile flex flex-col gap-3" style={{ bottom: "168px" }}>
        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-primary active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[24px]">my_location</span>
        </button>
        <button className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-on-surface-variant active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[24px]">layers</span>
        </button>
      </div>

      {/* Floating status card, above the bottom nav */}
      <Link href="/project/1" className="absolute inset-x-0 z-30 px-margin-mobile block" style={{ bottom: "104px" }}>
        <div className="bg-white p-3.5 rounded-2xl shadow-[0_8px_24px_rgba(0,17,64,0.25)] flex items-center gap-3 border-l-4 border-primary">
          <div className="w-14 h-14 rounded-xl bg-surface-container flex-shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="Damaged pavement"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq_SJpjnuPiIXTnBWEnFgXbBBmWebUVE5Q8k_o5nZNsXSCN48fKtuj3qno1LcHGlbT-OYXci4K_6VWGZi0B5rTrDwb-jped8jZHH64zKUtvAJ9A5eKEWt3evEBe9bea78jjAjc_xqAprqynKWdq2zFm4_Mk1HpOpajY-aAjobP6NvB8dn7hHao5YVbU738CpJUGDKTnEh5jYBklCYJVtO0kh97cJI5I5dbKEFkmX6ey783rkmo3LkszunaQ6Js3PXe-fAJFgpnlG4"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <span className="bg-primary-fixed text-primary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                Verified
              </span>
              <span className="text-on-surface-variant text-[11px]">2m ago</span>
            </div>
            <h3 className="font-headline text-[15px] truncate leading-tight text-on-surface">
              Damaged Pavement - Rizal St.
            </h3>
            <p className="text-on-surface-variant text-[11px] truncate">
              Reported by eVerify User #2409
            </p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant flex-shrink-0">chevron_right</span>
        </div>
      </Link>

      <BottomNav active="map" />
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-white/50 rounded-full z-[60]"></div>
    </main>
  );
}
