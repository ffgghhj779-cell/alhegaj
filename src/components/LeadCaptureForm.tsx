"use client";

import { useForm } from "react-hook-form";
import { MessageCircle } from "lucide-react";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "@/components/FloatingField";
import {
  LEAD_INTERESTS,
  buildWhatsAppLeadUrl,
  type LeadPayload,
} from "@/lib/leads";

type LeadCaptureFormProps = {
  adminWhatsApp: string;
};

export default function LeadCaptureForm({ adminWhatsApp }: LeadCaptureFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LeadPayload>({
    defaultValues: {
      name: "",
      phone: "",
      interest: "استشارة",
      message: "",
    },
    mode: "onBlur",
  });

  function onSubmit(data: LeadPayload) {
    const url = buildWhatsAppLeadUrl(adminWhatsApp, data);
    // Hard redirect to Admin WhatsApp (wa.me) with structured Arabic lead payload
    window.location.assign(url);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
      aria-label="نموذج طلب تواصل"
    >
      <FloatingInput
        id="lead-name"
        label="الاسم الكامل"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name", {
          required: "الاسم مطلوب",
          minLength: { value: 2, message: "يرجى إدخال اسم صحيح" },
        })}
      />

      <FloatingInput
        id="lead-phone"
        label="رقم الجوال"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        dir="ltr"
        className="text-start"
        error={errors.phone?.message}
        {...register("phone", {
          required: "رقم الجوال مطلوب",
          pattern: {
            value: /^[+0-9\s()-]{8,20}$/,
            message: "رقم الجوال غير صالح",
          },
        })}
      />

      <FloatingSelect
        id="lead-interest"
        label="نوع الاهتمام"
        options={LEAD_INTERESTS}
        error={errors.interest?.message}
        {...register("interest", { required: "اختر نوع الاهتمام" })}
      />

      <FloatingTextarea
        id="lead-message"
        label="رسالتك"
        rows={5}
        error={errors.message?.message}
        {...register("message", {
          required: "الرسالة مطلوبة",
          minLength: { value: 8, message: "يرجى كتابة تفاصيل أوضح" },
        })}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-gold w-full"
      >
        <MessageCircle className="size-4" aria-hidden />
        {isSubmitting ? "جاري التوجيه..." : "إرسال عبر واتساب"}
      </button>

      <p className="text-center text-xs leading-6 text-muted">
        بالضغط على الإرسال سيتم فتح واتساب الإدارة تلقائياً برسالة منسّقة تحتوي
        على بياناتكم.
      </p>
    </form>
  );
}
