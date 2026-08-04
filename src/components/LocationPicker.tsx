"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, MapPin, Search } from "lucide-react";
import type { LatLng } from "@/components/LocationPickerMap";

const LocationPickerMap = dynamic(
  () => import("@/components/LocationPickerMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[340px] animate-pulse rounded-2xl border border-border bg-surface"
        aria-hidden
      />
    ),
  },
);

export const SA_CITY_PRESETS: { name: string; lat: number; lng: number }[] = [
  { name: "الرياض", lat: 24.7136, lng: 46.6753 },
  { name: "جدة", lat: 21.5433, lng: 39.1728 },
  { name: "الدمام", lat: 26.4207, lng: 50.0888 },
  { name: "الخبر", lat: 26.2172, lng: 50.1971 },
  { name: "مكة المكرمة", lat: 21.3891, lng: 39.8579 },
  { name: "المدينة المنورة", lat: 24.5247, lng: 39.5692 },
];

type SearchHit = {
  lat: number;
  lng: number;
  label: string;
  city: string;
};

export type LocationPickResult = LatLng & {
  addressHint?: string;
  cityHint?: string;
};

type LocationPickerProps = {
  lat: number;
  lng: number;
  onChange: (next: LocationPickResult) => void;
  address?: string;
};

export default function LocationPicker({
  lat,
  lng,
  onChange,
  address = "",
}: LocationPickerProps) {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [searching, setSearching] = useState(false);
  const [hint, setHint] = useState(
    "اضغط على الخريطة أو اسحب الدبوس لتحديد موقع الوحدة بدقة.",
  );
  const [reverseBusy, setReverseBusy] = useState(false);
  const [recenterToken, setRecenterToken] = useState(0);
  const skipReverse = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const value = { lat, lng };

  const reverseGeocode = useCallback(async (next: LatLng) => {
    setReverseBusy(true);
    try {
      const res = await fetch(
        `/api/geocode?lat=${encodeURIComponent(String(next.lat))}&lng=${encodeURIComponent(String(next.lng))}`,
      );
      if (!res.ok) return;
      const data = (await res.json()) as {
        label?: string;
        city?: string;
      };
      if (data.label) {
        setHint(data.label);
        onChangeRef.current({
          ...next,
          addressHint: data.label,
          cityHint: data.city,
        });
      }
    } catch {
      /* keep coords even if reverse fails */
    } finally {
      setReverseBusy(false);
    }
  }, []);

  function handleMapChange(next: LatLng) {
    onChangeRef.current(next);
    setHint("تم تحديث الموقع — جاري جلب العنوان التقريبي…");
    if (skipReverse.current) {
      skipReverse.current = false;
      return;
    }
    void reverseGeocode(next);
  }

  function jumpToCity(city: (typeof SA_CITY_PRESETS)[number]) {
    skipReverse.current = true;
    onChangeRef.current({ lat: city.lat, lng: city.lng, cityHint: city.name });
    setRecenterToken((n) => n + 1);
    setHint(`تم التمركز على ${city.name} — حرّك الدبوس لموقع الوحدة الدقيق.`);
    setHits([]);
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setHits([]);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(
          `/api/geocode?q=${encodeURIComponent(query.trim())}`,
        );
        if (!res.ok) {
          setHits([]);
          return;
        }
        const data = (await res.json()) as { results?: SearchHit[] };
        setHits(data.results ?? []);
      } catch {
        setHits([]);
      } finally {
        setSearching(false);
      }
    }, 420);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  function pickHit(hit: SearchHit) {
    skipReverse.current = true;
    onChangeRef.current({
      lat: hit.lat,
      lng: hit.lng,
      addressHint: hit.label,
      cityHint: hit.city,
    });
    setRecenterToken((n) => n + 1);
    setHint(hit.label);
    setQuery("");
    setHits([]);
  }

  async function searchFromAddress() {
    const q = address.trim() || query.trim();
    if (q.length < 2) return;
    setSearching(true);
    try {
      const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`);
      if (!res.ok) return;
      const data = (await res.json()) as { results?: SearchHit[] };
      const first = data.results?.[0];
      if (first) pickHit(first);
      else
        setHint(
          "لم يتم العثور على نتائج داخل المملكة — جرّب حيّاً أو مدينة أوضح.",
        );
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {SA_CITY_PRESETS.map((city) => (
          <button
            key={city.name}
            type="button"
            onClick={() => jumpToCity(city)}
            className="min-h-9 rounded-md border border-border bg-black/30 px-3 text-xs font-medium text-gold-soft transition-colors hover:border-gold/50 hover:text-gold"
          >
            {city.name}
          </button>
        ))}
      </div>

      <div className="relative">
        <label className="mb-2 block text-sm font-medium tracking-wide text-foreground">
          بحث عن حي أو شارع
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-11 w-full rounded-md border border-border bg-[var(--surface-elevated)] pe-4 ps-10 text-[0.9375rem] text-foreground outline-none transition-[border-color,box-shadow] focus:border-gold focus:shadow-[0_0_0_3px_rgba(183,163,90,0.22)]"
              placeholder="مثال: حي الياسمين الرياض"
              autoComplete="off"
            />
            {searching ? (
              <Loader2
                className="absolute end-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-gold"
                aria-hidden
              />
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => void searchFromAddress()}
            className="btn-dark shrink-0 px-4"
          >
            <MapPin className="size-4" aria-hidden />
            إيجاد
          </button>
        </div>

        {hits.length > 0 ? (
          <ul className="absolute z-20 mt-2 max-h-56 w-full overflow-auto rounded-xl border border-border bg-[var(--surface-elevated)] shadow-[0_16px_40px_-18px_rgba(0,0,0,0.7)]">
            {hits.map((hit) => (
              <li key={`${hit.lat}-${hit.lng}-${hit.label}`}>
                <button
                  type="button"
                  onClick={() => pickHit(hit)}
                  className="block w-full px-4 py-3 text-start text-sm leading-6 text-foreground/90 transition-colors hover:bg-gold/10 hover:text-gold-soft"
                >
                  {hit.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <LocationPickerMap
        value={value}
        onChange={handleMapChange}
        recenterToken={recenterToken}
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-black/25 px-4 py-3 text-xs text-muted">
        <p className="inline-flex items-center gap-2 leading-6">
          <MapPin className="size-3.5 shrink-0 text-gold" aria-hidden />
          {reverseBusy ? "جاري تحديث العنوان…" : hint}
        </p>
        <p className="font-medium text-gold-soft" dir="ltr">
          {lat.toFixed(5)}, {lng.toFixed(5)}
        </p>
      </div>
    </div>
  );
}
