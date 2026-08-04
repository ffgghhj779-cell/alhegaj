/** Helpers for admin follow-up with clients (staff tooling only) */

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
