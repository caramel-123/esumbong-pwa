"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";

export default function HomeMapPage() {
  return (
    <main className="relative mx-auto w-full max-w-[375px] min-h-screen bg-surface overflow-hidden">
      <div className="h-11 w-full flex items-center justify-between px-6 z-[60] relative">
        <span className="font-bold text-[14px]">9:41</span>
        <div className="flex gap-1.5 items-center">
          <span className="material-symbols-outlined text-[18px]">signal_cellular_4_bar</span>
          <span className="material-symbols-outlined text-[18px]">wifi</span>
          <span className="material-symbols-outlined text-[20px]">battery_full</span>
        </div>
      </div>

      <div className="absolute top-11 left-0 w-full px-margin-mobile z-50">
        <div className="flex flex-col gap-3">
          <div className="flex items-center bg-surface-container-lowest rounded-full p-1 shadow-sm border border-outline-variant">
            <div className="w-10 h-10 flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input
              className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-body-md placeholder:text-on-surface-variant/60 py-2 outline-none"
              placeholder="Search projects..."
              type="text"
            />
            <div className="w-10 h-10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">tune</span>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button className="whitespace-nowrap px-4 py-2 bg-primary text-on-primary rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-transform">
              All Issues
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-surface-container-lowest text-on-surface-variant border border-outline-variant rounded-full font-label-md text-label-md shadow-sm">
              Roads
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-surface-container-lowest text-on-surface-variant border border-outline-variant rounded-full font-label-md text-label-md shadow-sm">
              Waste
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-surface-container-lowest text-on-surface-variant border border-outline-variant rounded-full font-label-md text-label-md shadow-sm">
              Water
            </button>
          </div>
        </div>
      </div>

      <div className="relative w-full h-[600px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover"
          alt="Map of Manila"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXOTqu4J9EusIssLa53RAT_yv3bmbZDs8mTtWOrC_UEmHC0sgg-fVZlhU3j-G5zMqffFs9T-nNXjmc6AV1SrNhVj-I0hPc1GCAPN2tyD4PfOM6jtJE3TMSfa1s78l203MFJwaA4puvlnItCXIwcBhwtgz5hB6YInNslWT3otxGp8zcPt1Iz-d9fnCMd81Js3lfxBkOrVfFQsFwWb4cEnJ5Bg567fOJs0_KvPp2-QmNUQ0NhL9wz0YPNI8YkcMu3LG7z8cpnSJoHwU"
        />

        <Link href="/project/1" className="absolute top-1/3 left-1/4 cursor-pointer group animate-pulse">
          <span
            className="material-symbols-outlined text-primary text-[40px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            location_on
          </span>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-primary shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <span className="text-primary font-label-sm text-label-sm uppercase">VERIFIED</span>
          </div>
        </Link>

        <Link href="/project/2" className="absolute top-[45%] left-2/3 cursor-pointer group">
          <span
            className="material-symbols-outlined text-secondary text-[40px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            location_on
          </span>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-secondary shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <span className="text-secondary font-label-sm text-label-sm uppercase">PENDING</span>
          </div>
        </Link>

        <Link href="/project/3" className="absolute bottom-1/3 left-1/2 cursor-pointer group">
          <span
            className="material-symbols-outlined text-error text-[40px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            location_on
          </span>
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-error shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <span className="text-error font-label-sm text-label-sm uppercase">FLAGGED</span>
          </div>
        </Link>
      </div>

      <div className="absolute bottom-32 right-margin-mobile flex flex-col gap-4 z-40">
        <button className="w-14 h-14 bg-surface-container-lowest rounded-full shadow-lg flex items-center justify-center text-primary border border-outline-variant active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[28px]">my_location</span>
        </button>
        <button className="w-14 h-14 bg-surface-container-lowest rounded-full shadow-lg flex items-center justify-center text-on-surface-variant border border-outline-variant active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-[28px]">layers</span>
        </button>
      </div>

      <Link href="/project/1" className="absolute bottom-24 left-0 w-full px-margin-mobile z-40 block">
        <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant shadow-lg flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-surface-container flex-shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="Damaged pavement"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAq_SJpjnuPiIXTnBWEnFgXbBBmWebUVE5Q8k_o5nZNsXSCN48fKtuj3qno1LcHGlbT-OYXci4K_6VWGZi0B5rTrDwb-jped8jZHH64zKUtvAJ9A5eKEWt3evEBe9bea78jjAjc_xqAprqynKWdq2zFm4_Mk1HpOpajY-aAjobP6NvB8dn7hHao5YVbU738CpJUGDKTnEh5jYBklCYJVtO0kh97cJI5I5dbKEFkmX6ey783rkmo3LkszunaQ6Js3PXe-fAJFgpnlG4"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex justify-between items-center mb-1">
              <span className="bg-[#e7efff] text-primary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase">
                VERIFIED
              </span>
              <span className="text-on-surface-variant text-[12px]">2m ago</span>
            </div>
            <h3 className="font-headline-md text-[16px] truncate leading-tight">
              Damaged Pavement - Rizal St.
            </h3>
            <p className="text-on-surface-variant text-[12px] line-clamp-1">
              Reported by eVerify User #2409
            </p>
          </div>
        </div>
      </Link>

      <BottomNav active="home" />
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-on-surface-variant/20 rounded-full z-[60]"></div>
    </main>
  );
}
