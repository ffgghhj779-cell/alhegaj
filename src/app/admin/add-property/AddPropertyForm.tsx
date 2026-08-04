"use client";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import LocationPicker, {
  type LocationPickResult,
} from "@/components/LocationPicker";
import { addProperty, type AddPropertyState } from "./actions";

const initialState: AddPropertyState = { ok: false, message: "" };

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80";

const DEFAULT_LAT = 24.7136;
const DEFAULT_LNG = 46.6753;

const inputClass =
  "min-h-11 w-full rounded-md border border-border bg-[var(--surface-elevated)] px-4 py-3 text-[0.9375rem] text-foreground outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-muted/70 focus:border-gold focus:shadow-[0_0_0_3px_rgba(183,163,90,0.22)]";

const labelClass = "mb-2 block text-sm font-medium tracking-wide text-foreground";

export default function AddPropertyForm() {
  const [state, formAction, pending] = useActionState(addProperty, initialState);
  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);
  const [city, setCity] = useState("الرياض");
  const [address, setAddress] = useState("");

  function handleLocation(next: LocationPickResult) {
    setLat(next.lat);
    setLng(next.lng);
    if (next.cityHint) setCity(next.cityHint);
    if (next.addressHint) setAddress(next.addressHint);
  }

  return (
    <form action={formAction} className="space-y-8">
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
            value={city}
            onChange={(e) => setCity(e.target.value)}
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

        <div className="sm:col-span-2">
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
            العنوان الظاهر للعميل
          </label>
          <input
            id="address"
            name="address"
            className={inputClass}
            placeholder="الرياض، حي الياسمين — شارع الأمير..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <p className="mt-2 text-xs leading-6 text-muted">
            يُحدَّث تلقائياً عند اختيار نقطة على الخريطة — يمكنكم تعديله يدوياً.
          </p>
        </div>
      </div>

      <section className="surface-card space-y-4 p-5 sm:p-6">
        <div>
          <h2 className="heading-card text-base sm:text-lg">موقع الوحدة على الخريطة</h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            حدّدوا الموقع بدقة كما سيظهر للعملاء في صفحة العقار — بالبحث، أو الضغط
            على الخريطة، أو سحب الدبوس الذهبي.
          </p>
        </div>

        <LocationPicker
          lat={lat}
          lng={lng}
          address={address}
          onChange={handleLocation}
        />

        <input type="hidden" name="lat" value={lat} />
        <input type="hidden" name="lng" value={lng} />
      </section>

      {state.message && !state.ok ? (
        <p className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-soft">
          {state.message}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="btn-gold w-full sm:w-auto">
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
