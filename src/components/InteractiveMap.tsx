"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { ExternalLink, Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type InteractiveMapProps = {
  lat: number;
  lng: number;
  zoom?: number;
  title?: string;
  className?: string;
  height?: number | string;
  /** Require tap before pan/zoom (keeps page scroll smooth on mobile) */
  interactive?: boolean;
  showDirections?: boolean;
  address?: string;
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

function InteractionGate({ enabled }: { enabled: boolean }) {
  const map = useMap();

  useEffect(() => {
    if (enabled) {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
    } else {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
    }
  }, [enabled, map]);

  return null;
}

export default function InteractiveMap({
  lat,
  lng,
  zoom = 14,
  title,
  className,
  height = 360,
  interactive = true,
  showDirections = true,
  address,
}: InteractiveMapProps) {
  const position = useMemo(() => [lat, lng] as [number, number], [lat, lng]);
  const icon = useMemo(() => createGoldMarker(title), [title]);
  const [unlocked, setUnlocked] = useState(!interactive);

  useEffect(() => {
    setUnlocked(!interactive);
  }, [interactive, lat, lng]);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="space-y-3">
      <div
        className={`alhejaz-map relative overflow-hidden rounded-2xl border border-border ${className ?? ""}`}
        style={{ height }}
        role="region"
        aria-label={title ? `خريطة موقع ${title}` : "خريطة الموقع"}
      >
        <MapContainer
          center={position}
          zoom={zoom}
          scrollWheelZoom={false}
          dragging={false}
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
          <InteractionGate enabled={unlocked} />
          <Marker position={position} icon={icon} title={title ?? "الموقع"} />
        </MapContainer>

        {interactive && !unlocked ? (
          <button
            type="button"
            onClick={() => setUnlocked(true)}
            className="absolute inset-0 z-[500] flex items-end justify-center bg-gradient-to-t from-black/70 via-black/20 to-transparent pb-5"
          >
            <span className="rounded-md border border-gold/35 bg-black/75 px-4 py-2 text-sm font-semibold text-gold-soft backdrop-blur-sm">
              اضغط للتفاعل مع الخريطة
            </span>
          </button>
        ) : null}
      </div>

      {showDirections ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          {address ? (
            <p className="text-xs leading-6 text-muted">{address}</p>
          ) : (
            <p className="text-xs font-medium text-gold-soft" dir="ltr">
              {lat.toFixed(5)}, {lng.toFixed(5)}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-gold/35 bg-black/30 px-3.5 text-xs font-semibold text-gold-soft transition-colors hover:border-gold hover:text-gold"
            >
              <Navigation className="size-3.5" aria-hidden />
              اتجاهات الوصول
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-border px-3.5 text-xs font-semibold text-muted-strong transition-colors hover:border-gold/40 hover:text-gold-soft"
            >
              <ExternalLink className="size-3.5" aria-hidden />
              فتح في خرائط Google
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
