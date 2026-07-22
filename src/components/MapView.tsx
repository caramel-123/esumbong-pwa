"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import type { ProjectStatus } from "@/lib/mock-data";

export interface MapMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: ProjectStatus;
}

export interface FocusTarget {
  lat: number;
  lng: number;
  zoom?: number;
  key: number; // change this to re-trigger a flyTo even to the same point
}

const STATUS_COLOR: Record<ProjectStatus, string> = {
  verified: "#013ed0",
  pending: "#f5a300",
  flagged: "#ba1a1a",
};

function pinIcon(status: ProjectStatus, active: boolean) {
  const color = STATUS_COLOR[status];
  const scale = active ? 1.15 : 1;
  return L.divIcon({
    className: "",
    html: `
      <div style="transform:scale(${scale});transform-origin:bottom center;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))">
        <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 25 15 25s15-14.5 15-25C30 6.7 23.3 0 15 0z" fill="${color}"/>
          <circle cx="15" cy="15" r="6" fill="#fff"/>
        </svg>
      </div>`,
    iconSize: [30, 40],
    iconAnchor: [15, 40],
    popupAnchor: [0, -36],
  });
}

function Recenter({ focus }: { focus?: FocusTarget }) {
  const map = useMap();
  useEffect(() => {
    if (focus) map.flyTo([focus.lat, focus.lng], focus.zoom ?? 16, { duration: 0.8 });
  }, [focus, map]);
  return null;
}

export default function MapView({
  markers,
  focus,
  activeId,
  onSelect,
  center = [14.59, 121.03],
  zoom = 12,
}: {
  markers: MapMarker[];
  focus?: FocusTarget;
  activeId?: string;
  onSelect?: (id: string) => void;
  center?: [number, number];
  zoom?: number;
}) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={false}
      className="w-full h-full"
      style={{ height: "100%", width: "100%", background: "#e6e7f8" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter focus={focus} />
      {markers.map((m) => (
        <Marker
          key={m.id}
          position={[m.lat, m.lng]}
          icon={pinIcon(m.status, m.id === activeId)}
          eventHandlers={{ click: () => onSelect?.(m.id) }}
        >
          <Popup>{m.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
