"use server";

import { revalidatePath } from "next/cache";
import { ServiceRequestStatus } from "@/generated/prisma/client";
import { LEAD_INTERESTS } from "@/lib/leads";
import { prisma } from "@/lib/prisma";

export type SubmitContactState = {
  ok: boolean;
  message: string;
  requestId?: string;
};

function cleanPhone(value: string) {
  return value.replace(/[^\d+]/g, "").trim();
}

export async function submitContactRequest(
  _prev: SubmitContactState,
  formData: FormData,
): Promise<SubmitContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = cleanPhone(String(formData.get("phone") ?? ""));
  const interest = String(formData.get("interest") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const source = String(formData.get("source") ?? "contact").trim() || "contact";
  const sourceRef = String(formData.get("sourceRef") ?? "").trim();

  if (name.length < 2) {
    return { ok: false, message: "يرجى إدخال الاسم الكامل." };
  }

  if (!/^[+0-9]{8,20}$/.test(phone.replace(/\s/g, ""))) {
    return { ok: false, message: "رقم الجوال غير صالح." };
  }

  if (!(LEAD_INTERESTS as readonly string[]).includes(interest)) {
    return { ok: false, message: "اختر نوع الاهتمام." };
  }

  if (message.length < 8) {
    return { ok: false, message: "يرجى كتابة تفاصيل أوضح في الرسالة." };
  }

  try {
    const created = await prisma.contactRequest.create({
      data: {
        name,
        phone,
        interest,
        message,
        source,
        sourceRef,
        status: ServiceRequestStatus.New,
      },
    });

    revalidatePath("/admin/requests");
    revalidatePath("/admin/contacts");

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

export type UpdateContactStatusState = {
  ok: boolean;
  message: string;
};

export async function updateContactRequestStatus(
  _prev: UpdateContactStatusState,
  formData: FormData,
): Promise<UpdateContactStatusState> {
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
    await prisma.contactRequest.update({
      where: { id },
      data: { status: statusRaw as ServiceRequestStatus },
    });
    revalidatePath("/admin/requests");
    revalidatePath("/admin/contacts");
    revalidatePath(`/admin/contacts/${id}`);
    return { ok: true, message: "تم تحديث حالة الطلب." };
  } catch {
    return { ok: false, message: "تعذّر تحديث الحالة." };
  }
}
