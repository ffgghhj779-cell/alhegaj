import { getAdminWhatsApp } from "@/lib/navigation";
import type { ServiceDef } from "@/lib/services";

export type ServiceRequestPayload = {
  serviceSlug: string;
  name: string;
  phone: string;
  city: string;
  notes: string;
  details: Record<string, string>;
};

export function formatServiceRequestWhatsApp(
  service: ServiceDef,
  payload: ServiceRequestPayload,
  requestId?: string,
): string {
  const detailLines = service.fields
    .map((field) => {
      const value = payload.details[field.id]?.trim();
      if (!value) return null;
      return `• *${field.label}:* ${value}`;
    })
    .filter(Boolean);

  return [
    "📋 *طلب خدمة جديد — الحجاز العقارية*",
    "",
    requestId ? `🔖 *رقم الطلب:* ${requestId}` : null,
    `🧭 *الخدمة:* ${service.title}`,
    `👤 *الاسم:* ${payload.name}`,
    `📱 *الجوال:* ${payload.phone}`,
    payload.city ? `📍 *المدينة:* ${payload.city}` : null,
    "",
    detailLines.length > 0 ? "*تفاصيل الطلب:*" : null,
    ...detailLines,
    "",
    payload.notes.trim() ? `📝 *ملاحظات:*\n${payload.notes.trim()}` : null,
    "",
    "—",
    "تم الحفظ عبر موقع الحجاز العقارية",
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function buildServiceRequestWhatsAppUrl(
  service: ServiceDef,
  payload: ServiceRequestPayload,
  requestId?: string,
): string {
  const digits = getAdminWhatsApp().replace(/\D/g, "");
  const text = encodeURIComponent(
    formatServiceRequestWhatsApp(service, payload, requestId),
  );
  return `https://wa.me/${digits}?text=${text}`;
}

export function buildClientFollowUpWhatsAppUrl(
  serviceTitle: string,
  requestId: string,
  clientPhone: string,
): string {
  const digits = clientPhone.replace(/\D/g, "");
  const text = encodeURIComponent(
    [
      `السلام عليكم، بخصوص طلب خدمة «${serviceTitle}» رقم ${requestId} من موقع الحجاز للخدمات العقارية.`,
      "",
      "نود التنسيق معكم لاستكمال التفاصيل.",
    ].join("\n"),
  );
  return `https://wa.me/${digits}?text=${text}`;
}
