"use server";

import { revalidatePath } from "next/cache";
import { Prisma, ServiceRequestStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getServiceBySlug } from "@/lib/services";

export type SubmitServiceRequestState = {
  ok: boolean;
  message: string;
  requestId?: string;
};

function cleanPhone(value: string) {
  return value.replace(/[^\d+]/g, "").trim();
}

export async function submitServiceRequest(
  _prev: SubmitServiceRequestState,
  formData: FormData,
): Promise<SubmitServiceRequestState> {
  const serviceSlug = String(formData.get("serviceSlug") ?? "").trim();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    return { ok: false, message: "الخدمة غير موجودة." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const phone = cleanPhone(String(formData.get("phone") ?? ""));
  const city = String(formData.get("city") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (name.length < 2) {
    return { ok: false, message: "يرجى إدخال الاسم الكامل." };
  }

  if (!/^[+0-9]{8,20}$/.test(phone.replace(/\s/g, ""))) {
    return { ok: false, message: "رقم الجوال غير صالح." };
  }

  if (!city) {
    return { ok: false, message: "يرجى إدخال المدينة." };
  }

  const details: Record<string, string> = {};
  for (const field of service.fields) {
    const raw = String(formData.get(`detail_${field.id}`) ?? "").trim();
    if (field.required && !raw) {
      return { ok: false, message: `حقل «${field.label}» مطلوب.` };
    }
    if (raw) details[field.id] = raw;
  }

  try {
    const created = await prisma.serviceRequest.create({
      data: {
        serviceSlug: service.slug,
        serviceTitle: service.title,
        name,
        phone,
        city,
        notes,
        details: details as Prisma.InputJsonValue,
        status: ServiceRequestStatus.New,
      },
    });

    revalidatePath("/admin/requests");

    return {
      ok: true,
      message:
        "تم استلام طلبكم بنجاح وحفظه في لوحة الإدارة. سيتواصل معكم فريق الحجاز قريباً.",
      requestId: created.id,
    };
  } catch {
    return {
      ok: false,
      message: "تعذّر حفظ الطلب حالياً. يرجى المحاولة مرة أخرى بعد قليل.",
    };
  }
}

export type UpdateStatusState = {
  ok: boolean;
  message: string;
};

export async function updateServiceRequestStatus(
  _prev: UpdateStatusState,
  formData: FormData,
): Promise<UpdateStatusState> {
  const id = String(formData.get("id") ?? "").trim();
  const statusRaw = String(formData.get("status") ?? "").trim();

  const allowed: ServiceRequestStatus[] = [
    ServiceRequestStatus.New,
    ServiceRequestStatus.InProgress,
    ServiceRequestStatus.Completed,
    ServiceRequestStatus.Cancelled,
  ];

  if (!id || !allowed.includes(statusRaw as ServiceRequestStatus)) {
    return { ok: false, message: "بيانات الحالة غير صالحة." };
  }

  try {
    await prisma.serviceRequest.update({
      where: { id },
      data: { status: statusRaw as ServiceRequestStatus },
    });
    revalidatePath("/admin/requests");
    revalidatePath(`/admin/requests/${id}`);
    return { ok: true, message: "تم تحديث حالة الطلب." };
  } catch {
    return { ok: false, message: "تعذّر تحديث الحالة." };
  }
}
