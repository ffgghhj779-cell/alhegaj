"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PropertyStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type AddPropertyState = {
  ok: boolean;
  message: string;
};

function toNumber(value: FormDataEntryValue | null) {
  if (value == null || value === "") return NaN;
  return Number(String(value).replace(/,/g, ""));
}

export async function addProperty(
  _prev: AddPropertyState,
  formData: FormData,
): Promise<AddPropertyState> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim() || "الرياض";
  const address = String(formData.get("address") ?? "").trim();
  const statusRaw = String(formData.get("status") ?? "Sale");
  const price = toNumber(formData.get("price"));
  const area = toNumber(formData.get("area"));
  const rooms = toNumber(formData.get("rooms"));
  const bathrooms = toNumber(formData.get("bathrooms"));
  const lat = toNumber(formData.get("lat"));
  const lng = toNumber(formData.get("lng"));

  const status =
    statusRaw === "Rent" ? PropertyStatus.Rent : PropertyStatus.Sale;

  if (!title || !description || !imageUrl) {
    return { ok: false, message: "يرجى تعبئة العنوان والوصف ورابط الصورة." };
  }

  if ([price, area, rooms, bathrooms, lat, lng].some((n) => Number.isNaN(n))) {
    return { ok: false, message: "تحقق من الأرقام والإحداثيات المدخلة." };
  }

  if (lat < 16 || lat > 33 || lng < 34 || lng > 56) {
    return {
      ok: false,
      message: "الإحداثيات خارج نطاق المملكة تقريباً — حدّدوا الموقع من الخريطة.",
    };
  }

  const property = await prisma.property.create({
    data: {
      title,
      description,
      imageUrl,
      city,
      address,
      status,
      price,
      area,
      rooms: Math.round(rooms),
      bathrooms: Math.round(bathrooms),
      lat,
      lng,
    },
  });

  revalidatePath("/properties");
  revalidatePath(`/properties/${property.id}`);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  redirect(`/properties/${property.id}`);
}
