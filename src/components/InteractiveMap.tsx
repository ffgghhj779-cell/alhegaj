"use client";

import { useMemo } from "react";
import { MapContainer, Marker, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type InteractiveMapProps = {
  lat: number;
  lng: number;
  zoom?: number;
  title?: string;
  className?: string;
  height?: number | string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function createGoldMarker(title?: string) {
  const label = title
    ? `<span class="alhejaz-map-label">${escapeHtml(title)}</span>`
    : "";

  return L.divIcon({
    className: "alhejaz-map-marker",
    html: `
      <div class="alhejaz-map-pin">
        ${label}
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" aria-hidden="true">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#B7A35A"/>
          <circle cx="14" cy="14" r="5.5" fill="#0C0B09"/>
        </svg>
      </div>
    `,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
  });
}

export default function InteractiveMap({
  lat,
  lng,
  zoom = 13,
  title,
  className,
  height = 360,
}: InteractiveMapProps) {
  const position = useMemo(() => [lat, lng] as [number, number], [lat, lng]);
  const icon = useMemo(() => createGoldMarker(title), [title]);

  return (
    <div
      className={`alhejaz-map overflow-hidden rounded-2xl border border-border ${className ?? ""}`}
      style={{ height }}
      role="region"
      aria-label={title ? `خريطة موقع ${title}` : "خريطة الموقع"}
    >
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
        attributionControl
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        <ZoomControl position="topright" />
        <Marker position={position} icon={icon} title={title ?? "الموقع"} />
      </MapContainer>
    </div>
  );
}
