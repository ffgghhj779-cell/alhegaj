import { NextResponse } from "next/server";

export const runtime = "nodejs";

type NominatimItem = {
  lat: string;
  lon: string;
  display_name: string;
  address?: {
    city?: string;
    town?: string;
    village?: string;
    state?: string;
    suburb?: string;
    neighbourhood?: string;
    road?: string;
  };
};

const SA_VIEWBOX = "34.5,16.0,55.7,32.2"; // roughly Saudi Arabia

function headers() {
  return {
    Accept: "application/json",
    "User-Agent": "AlhijazRealEstate/1.0 (alhegaj.vercel.app; contact@alhejaz.sa)",
  };
}

function formatLabel(item: NominatimItem) {
  const a = item.address;
  if (!a) return item.display_name;
  const parts = [
    a.road,
    a.neighbourhood || a.suburb,
    a.city || a.town || a.village,
    a.state,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(" — ") : item.display_name;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  try {
    if (q) {
      const url = new URL("https://nominatim.openstreetmap.org/search");
      url.searchParams.set("q", q);
      url.searchParams.set("format", "json");
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set("limit", "6");
      url.searchParams.set("countrycodes", "sa");
      url.searchParams.set("viewbox", SA_VIEWBOX);
      url.searchParams.set("bounded", "0");

      const res = await fetch(url, {
        headers: headers(),
        next: { revalidate: 0 },
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: "تعذّر البحث الجغرافي حالياً." },
          { status: 502 },
        );
      }
      const data = (await res.json()) as NominatimItem[];
      return NextResponse.json({
        results: data.map((item) => ({
          lat: Number(item.lat),
          lng: Number(item.lon),
          label: formatLabel(item),
          city: item.address?.city || item.address?.town || item.address?.state || "",
        })),
      });
    }

    if (lat && lng) {
      const url = new URL("https://nominatim.openstreetmap.org/reverse");
      url.searchParams.set("lat", lat);
      url.searchParams.set("lon", lng);
      url.searchParams.set("format", "json");
      url.searchParams.set("addressdetails", "1");
      url.searchParams.set("zoom", "18");

      const res = await fetch(url, {
        headers: headers(),
        next: { revalidate: 0 },
      });
      if (!res.ok) {
        return NextResponse.json(
          { error: "تعذّر عكس الإحداثيات حالياً." },
          { status: 502 },
        );
      }
      const item = (await res.json()) as NominatimItem;
      return NextResponse.json({
        lat: Number(item.lat),
        lng: Number(item.lon),
        label: formatLabel(item),
        city: item.address?.city || item.address?.town || item.address?.state || "",
      });
    }

    return NextResponse.json(
      { error: "أدخل نص بحث أو إحداثيات." },
      { status: 400 },
    );
  } catch {
    return NextResponse.json(
      { error: "حدث خطأ أثناء الاتصال بخدمة الخرائط." },
      { status: 500 },
    );
  }
}
