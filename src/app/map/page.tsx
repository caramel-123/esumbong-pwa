"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import { projects, getProject, type ProjectStatus } from "@/lib/mock-data";
import placesData from "@/lib/places.json";
import type { FocusTarget, MapMarker } from "@/components/MapView";

// Leaflet touches window, so the map is client-only (no SSR).
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-surface-container-high text-on-surface-variant text-sm">
      Loading map…
    </div>
  ),
});

interface Place {
  id: string;
  name: string;
  label: string;
  lat: number;
  lng: number;
  projectId?: string;
}

const places = placesData as Place[];

const categories = ["All Issues", "Roads", "Waste", "Water"] as const;
type Category = (typeof categories)[number];

// crude keyword routing so the chips actually filter the demo markers
const CATEGORY_KEYWORDS: Record<Category, string[]> = {
  "All Issues": [],
  Roads: ["bridge", "road", "pavement"],
  Waste: ["waste", "dumping", "drainage"],
  Water: ["flood", "river", "water", "esplanade", "culvert"],
};

const statusBadge: Record<ProjectStatus, string> = {
  verified: "bg-primary-fixed text-primary",
  pending: "bg-secondary-fixed text-on-secondary-container",
  flagged: "bg-error-container text-error",
};

export default function MapPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All Issues");
  const [focus, setFocus] = useState<FocusTarget | undefined>();
  const [activeId, setActiveId] = useState<string | undefined>();

  // markers come from real project coordinates, filtered by category chip
  const markers: MapMarker[] = useMemo(() => {
    const kws = CATEGORY_KEYWORDS[category];
    return projects
      .filter((p) => {
        if (kws.length === 0) return true;
        const hay = `${p.name} ${p.description}`.toLowerCase();
        return kws.some((k) => hay.includes(k));
      })
      .map((p) => ({ id: p.id, name: p.name, lat: p.lat, lng: p.lng, status: p.status }));
  }, [category]);

  // search dropdown reads the JSON list
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return places
      .filter((pl) => pl.name.toLowerCase().includes(q) || pl.label.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query]);

  function goToPlace(pl: Place) {
    setFocus({ lat: pl.lat, lng: pl.lng, zoom: 16, key: Date.now() });
    setQuery("");
    if (pl.projectId) setActiveId(pl.projectId);
  }

  function selectMarker(id: string) {
    setActiveId(id);
    const p = getProject(id);
    setFocus({ lat: p.lat, lng: p.lng, zoom: 16, key: Date.now() });
  }

  const active = activeId ? getProject(activeId) : undefined;

  return (
    <main className="relative flex flex-col h-screen max-w-[375px] mx-auto overflow-hidden bg-surface">
      {/* Map fills the frame */}
      <div className="absolute inset-0">
        <MapView markers={markers} focus={focus} activeId={activeId} onSelect={selectMarker} />
      </div>

      {/* Floating search + chips */}
      <div className="relative z-[500] px-4 pt-3 space-y-3 pointer-events-none">
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 h-12 border border-outline-variant">
            <Icon name="search" size={20} className="text-primary shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, locations…"
              className="flex-1 bg-transparent outline-none text-sm text-on-surface placeholder:text-on-surface-variant"
            />
            <Icon name="tune" size={18} className="text-on-surface-variant shrink-0" />
          </div>

          {results.length > 0 && (
            <ul className="mt-2 bg-white rounded-2xl shadow-xl border border-outline-variant overflow-hidden">
              {results.map((pl) => (
                <li key={pl.id}>
                  <button
                    onClick={() => goToPlace(pl)}
                    className="w-full flex items-start gap-3 px-4 py-2.5 text-left hover:bg-surface-container-low active:bg-surface-container transition-colors"
                  >
                    <Icon name="location_on" size={18} className="text-primary mt-0.5 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm text-on-surface truncate">{pl.name}</span>
                      <span className="block text-xs text-on-surface-variant truncate">{pl.label}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 pointer-events-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 h-9 rounded-full text-sm font-semibold whitespace-nowrap shadow-sm transition-colors ${
                category === c
                  ? "bg-primary text-white"
                  : "bg-white text-on-surface border border-outline-variant"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Selected project card */}
      {active && (
        <div className="absolute bottom-20 left-4 right-4 z-[500]">
          <Link
            href={`/project/${active.id}`}
            className="flex items-center gap-3 bg-white rounded-2xl shadow-xl border border-outline-variant p-3 active:scale-[0.98] transition-transform"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusBadge[active.status]}`}>
                  {active.status}
                </span>
                <span className="text-[11px] text-on-surface-variant truncate">{active.location}</span>
              </div>
              <h3 className="font-label-md text-label-md text-on-surface truncate">{active.name}</h3>
              <p className="text-[11px] text-on-surface-variant truncate">
                {active.agency} · {active.budget} · claimed {active.claimedPct}%
              </p>
            </div>
            <Icon name="chevron_right" size={20} className="text-on-surface-variant shrink-0" />
          </Link>
        </div>
      )}

      <BottomNav active="map" />
    </main>
  );
}
