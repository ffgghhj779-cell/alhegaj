"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type LatLng = { lat: number; lng: number };

type LocationPickerMapProps = {
  value: LatLng;
  onChange: (next: LatLng) => void;
  /** Bump only on search/city jump — avoids fighting drag */
  recenterToken?: number;
  className?: string;
};

const goldIcon = L.divIcon({
  className: "alhejaz-map-marker",
  html: `
    <div class="alhejaz-map-pin">
      <span class="alhejaz-map-label">موقع الوحدة</span>
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none" aria-hidden="true">
        <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#B7A35A"/>
        <circle cx="14" cy="14" r="5.5" fill="#0C0B09"/>
      </svg>
    </div>
  `,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
});

function ClickToPlace({ onChange }: { onChange: (next: LatLng) => void }) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function Recenter({ value, token }: { value: LatLng; token: number }) {
  const map = useMap();
  const seen = useRef(token);

  useEffect(() => {
    if (seen.current === token) return;
    seen.current = token;
    map.flyTo([value.lat, value.lng], Math.max(map.getZoom(), 15), {
      duration: 0.65,
    });
  }, [token, value.lat, value.lng, map]);

  return null;
}

export default function LocationPickerMap({
  value,
  onChange,
  recenterToken = 0,
  className,
}: LocationPickerMapProps) {
  const position = useMemo(
    () => [value.lat, value.lng] as [number, number],
    [value.lat, value.lng],
  );

  return (
    <div
      className={`alhejaz-map overflow-hidden rounded-2xl border border-border ${className ?? ""}`}
      style={{ height: 340 }}
      role="application"
      aria-label="حدّد موقع الوحدة على الخريطة"
    >
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />
        <ZoomControl position="topright" />
        <ClickToPlace onChange={onChange} />
        <Recenter value={value} token={recenterToken} />
        <Marker
          position={position}
          icon={goldIcon}
          draggable
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target as L.Marker;
              const { lat, lng } = marker.getLatLng();
              onChange({ lat, lng });
            },
          }}
        />
      </MapContainer>
    </div>
  );
}
