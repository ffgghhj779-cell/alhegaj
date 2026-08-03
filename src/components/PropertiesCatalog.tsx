"use client";

import { useMemo, useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import StaggerGrid, { StaggerItem } from "@/components/StaggerGrid";
import type { Property } from "@/lib/properties";

type StatusFilter = "all" | "sale" | "rent";

type PropertiesCatalogProps = {
  properties: Property[];
};

function detectStatus(property: Property): "sale" | "rent" {
  if (property.badges?.some((b) => b.label.includes("إيجار"))) return "rent";
  if (property.price.includes("سنوي")) return "rent";
  return "sale";
}

export default function PropertiesCatalog({ properties }: PropertiesCatalogProps) {
  const [status, setStatus] = useState<StatusFilter>("all");
  const [city, setCity] = useState("all");
  const [rooms, setRooms] = useState("all");
  const [query, setQuery] = useState("");

  const cities = useMemo(
    () =>
      Array.from(new Set(properties.map((p) => p.location).filter(Boolean))).sort(
        (a, b) => a.localeCompare(b, "ar"),
      ),
    [properties],
  );

  const filtered = useMemo(() => {
    return properties.filter((property) => {
      const propertyStatus = detectStatus(property);
      if (status !== "all" && propertyStatus !== status) return false;
      if (city !== "all" && property.location !== city) return false;
      if (rooms !== "all" && property.rooms < Number(rooms)) return false;
      if (query.trim()) {
        const q = query.trim();
        const hay = `${property.title} ${property.location} ${property.price}`;
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [properties, status, city, rooms, query]);

  const fieldClass =
    "w-full rounded-md border border-border/90 bg-white px-3 py-2.5 text-sm outline-none transition-[border-color,box-shadow] duration-300 focus:border-gold focus:shadow-[0_0_0_3px_rgba(183,163,90,0.18)]";

  return (
    <div>
      <div className="surface-card grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-4">
        <div>
          <label htmlFor="filter-status" className="mb-1.5 block text-xs font-medium text-muted">
            الحالة
          </label>
          <select
            id="filter-status"
            className={fieldClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
          >
            <option value="all">الكل</option>
            <option value="sale">للبيع</option>
            <option value="rent">للإيجار</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter-city" className="mb-1.5 block text-xs font-medium text-muted">
            المدينة
          </label>
          <select
            id="filter-city"
            className={fieldClass}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="all">كل المدن</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="filter-rooms" className="mb-1.5 block text-xs font-medium text-muted">
            الحد الأدنى للغرف
          </label>
          <select
            id="filter-rooms"
            className={fieldClass}
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
          >
            <option value="all">الكل</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
          </select>
        </div>
        <div>
          <label htmlFor="filter-query" className="mb-1.5 block text-xs font-medium text-muted">
            بحث
          </label>
          <input
            id="filter-query"
            className={fieldClass}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="اسم العقار أو المدينة..."
          />
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        عرض {filtered.length.toLocaleString("ar-SA")} من أصل{" "}
        {properties.length.toLocaleString("ar-SA")} عقار
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border bg-white px-6 py-16 text-center">
          <p className="text-lg font-semibold text-black">لا توجد نتائج مطابقة</p>
          <p className="mt-2 text-sm text-muted">جرّب تعديل الفلاتر أو كلمة البحث.</p>
        </div>
      ) : (
        <StaggerGrid className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {filtered.map((property, index) => (
            <StaggerItem key={property.id}>
              <PropertyCard property={property} priority={index < 2} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
    </div>
  );
}
