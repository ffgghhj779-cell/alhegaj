"use client";

import { useMemo, useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import { MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

export type InteractiveMapProps = {
  lat: number;
  lng: number;
  zoom?: number;
  title?: string;
  className?: string;
  height?: number | string;
};

function MapPlaceholder({
  lat,
  lng,
  title,
  className,
  height,
}: InteractiveMapProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-border bg-[var(--surface-elevated)] shadow-[0_10px_32px_-18px_rgba(0,0,0,0.45)] ${className ?? ""}`}
      style={{ height: height ?? 360 }}
      role="img"
      aria-label={title ? `خريطة موقع ${title}` : "خريطة الموقع"}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(183,163,90,0.12) 0%, transparent 45%), linear-gradient(180deg, #18160f 0%, #0c0b09 100%), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(183,163,90,0.08) 40px), repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(183,163,90,0.08) 40px)",
        }}
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 px-8 text-center">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <MapPin className="size-5" strokeWidth={1.6} aria-hidden />
        </span>
        <p className="text-sm font-semibold tracking-tight text-foreground">
          الخريطة التفاعلية غير مفعّلة
        </p>
        <p className="max-w-sm text-xs leading-7 text-muted">
          أضف مفتاح Mapbox في{" "}
          <span className="font-medium text-gold" dir="ltr">
            NEXT_PUBLIC_MAPBOX_TOKEN
          </span>{" "}
          لعرض الموقع بدقة.
        </p>
        <p
          className="rounded-md bg-black px-3.5 py-1.5 text-xs font-medium text-gold-soft"
          dir="ltr"
        >
          {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>
      </div>
    </div>
  );
}

export default function InteractiveMap({
  lat,
  lng,
  zoom = 13,
  title,
  className,
  height = 360,
}: InteractiveMapProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [viewState, setViewState] = useState({
    latitude: lat,
    longitude: lng,
    zoom,
  });

  const marker = useMemo(
    () => ({ latitude: lat, longitude: lng }),
    [lat, lng],
  );

  if (!token) {
    return (
      <MapPlaceholder
        lat={lat}
        lng={lng}
        title={title}
        className={className}
        height={height}
      />
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border ${className ?? ""}`}
      style={{ height }}
    >
      <Map
        mapboxAccessToken={token}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        reuseMaps
      >
        <NavigationControl position="top-left" showCompass={false} />
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          anchor="bottom"
        >
          <span className="flex flex-col items-center drop-shadow-md">
            <span className="rounded-md bg-black px-2 py-1 text-[0.65rem] font-semibold text-gold-soft">
              {title ?? "الموقع"}
            </span>
            <MapPin className="mt-1 size-8 fill-gold text-foreground" aria-hidden />
          </span>
        </Marker>
      </Map>
    </div>
  );
}
