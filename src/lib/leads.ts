export type LeadInterest =
  | "شراء"
  | "إيجار"
  | "استشارة"
  | "تقييم عقار"
  | "أخرى";

export type LeadPayload = {
  name: string;
  phone: string;
  interest: LeadInterest;
  message: string;
};

export const LEAD_INTERESTS: readonly LeadInterest[] = [
  "شراء",
  "إيجار",
  "استشارة",
  "تقييم عقار",
  "أخرى",
] as const;

/** Structured Arabic WhatsApp template for admin lead routing */
export function formatLeadWhatsAppMessage(lead: LeadPayload): string {
  return [
    "🏠 *طلب تواصل جديد — الحجاز العقارية*",
    "",
    `👤 *الاسم:* ${lead.name}`,
    `📱 *الجوال:* ${lead.phone}`,
    `🎯 *الاهتمام:* ${lead.interest}`,
    "",
    "📝 *الرسالة:*",
    lead.message.trim() || "—",
    "",
    "—",
    "تم الإرسال تلقائياً من موقع الحجاز العقارية",
  ].join("\n");
}

export function buildWhatsAppLeadUrl(
  adminNumber: string,
  lead: LeadPayload,
): string {
  const digits = adminNumber.replace(/\D/g, "");
  const text = encodeURIComponent(formatLeadWhatsAppMessage(lead));
  return `https://wa.me/${digits}?text=${text}`;
}
