"use client";

import { useActionState, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { addProperty, type AddPropertyState } from "./actions";

const initialState: AddPropertyState = { ok: false, message: "" };

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80";

/** Mock geocode targets around Riyadh / major SA cities */
const MOCK_COORDS = [
  { lat: 24.7136, lng: 46.6753, label: "الرياض" },
  { lat: 21.4858, lng: 39.1925, label: "جدة" },
  { lat: 26.4207, lng: 50.0888, label: "الدمام" },
  { lat: 21.3891, lng: 39.8579, label: "مكة المكرمة" },
] as const;

const inputClass =
  "w-full rounded-md border border-border/90 bg-white px-4 py-3 text-[0.9375rem] text-black outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted/70 focus:border-gold focus:shadow-[0_0_0_3px_rgba(183,163,90,0.18)]";

const labelClass = "mb-2 block text-sm font-medium tracking-wide text-black";

export default function AddPropertyForm() {
  const [state, formAction, pending] = useActionState(addProperty, initialState);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [geoNote, setGeoNote] = useState("");

  function mockGeocode() {
    const pick = MOCK_COORDS[Math.floor(Math.random() * MOCK_COORDS.length)];
    const jitter = () => (Math.random() - 0.5) * 0.04;
    setLat((pick.lat + jitter()).toFixed(6));
    setLng((pick.lng + jitter()).toFixed(6));
    setGeoNote(`تم استخراج إحداثيات تقريبية لمنطقة ${pick.label}`);
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className={labelClass}>
            عنوان العقار
          </label>
          <input
            id="title"
            name="title"
            required
            className={inputClass}
            placeholder="مثال: فيلا فاخرة في حي الياسمين"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className={labelClass}>
            الوصف
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className={inputClass}
            placeholder="وصف معماري موجز للعقار ومميزاته..."
          />
        </div>

        <div>
          <label htmlFor="price" className={labelClass}>
            السعر (ر.س)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step="1000"
            required
            className={inputClass}
            placeholder="4800000"
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="status" className={labelClass}>
            الحالة
          </label>
          <select id="status" name="status" className={inputClass} defaultValue="Sale">
            <option value="Sale">للبيع</option>
            <option value="Rent">للإيجار</option>
          </select>
        </div>

        <div>
          <label htmlFor="city" className={labelClass}>
            المدينة
          </label>
          <input
            id="city"
            name="city"
            required
            className={inputClass}
            placeholder="الرياض"
            defaultValue="الرياض"
          />
        </div>

        <div>
          <label htmlFor="area" className={labelClass}>
            المساحة (م²)
          </label>
          <input
            id="area"
            name="area"
            type="number"
            min={1}
            required
            className={inputClass}
            placeholder="520"
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="rooms" className={labelClass}>
            الغرف
          </label>
          <input
            id="rooms"
            name="rooms"
            type="number"
            min={1}
            required
            className={inputClass}
            placeholder="5"
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="bathrooms" className={labelClass}>
            الحمامات
          </label>
          <input
            id="bathrooms"
            name="bathrooms"
            type="number"
            min={1}
            required
            className={inputClass}
            placeholder="6"
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className={labelClass}>
            رابط الصورة
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            required
            defaultValue={DEFAULT_IMAGE}
            className={inputClass}
            dir="ltr"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="address" className={labelClass}>
            العنوان
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="address"
              name="address"
              className={`${inputClass} flex-1`}
              placeholder="الرياض، حي الياسمين — شارع الأمير..."
            />
            <button
              type="button"
              onClick={mockGeocode}
              className="btn-dark inline-flex shrink-0 items-center gap-2 px-5 text-gold-soft hover:text-black"
            >
              <MapPin className="size-4" aria-hidden />
              استخراج الإحداثيات
            </button>
          </div>
          {geoNote ? (
            <p className="mt-2 text-xs text-gold">{geoNote}</p>
          ) : (
            <p className="mt-2 text-xs text-muted">
              محاكاة للترميز الجغرافي — يملأ إحداثيات تجريبية تلقائياً.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lat" className={labelClass}>
            خط العرض (Lat)
          </label>
          <input
            id="lat"
            name="lat"
            type="number"
            step="any"
            required
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className={inputClass}
            placeholder="24.713600"
            dir="ltr"
          />
        </div>

        <div>
          <label htmlFor="lng" className={labelClass}>
            خط الطول (Lng)
          </label>
          <input
            id="lng"
            name="lng"
            type="number"
            step="any"
            required
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            className={inputClass}
            placeholder="46.675300"
            dir="ltr"
          />
        </div>
      </div>

      {state.message && !state.ok ? (
        <p className="rounded-lg border border-gold/40 bg-gold-soft/30 px-4 py-3 text-sm text-black">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="btn-gold w-full sm:w-auto"
      >
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            جاري الحفظ...
          </>
        ) : (
          "إضافة العقار"
        )}
      </button>
    </form>
  );
}
