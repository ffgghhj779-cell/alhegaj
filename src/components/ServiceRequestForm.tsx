"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "@/components/FloatingField";
import {
  submitServiceRequest,
  type SubmitServiceRequestState,
} from "@/app/services/actions";
import type { ServiceDef } from "@/lib/services";
import { buildWhatsAppUrl } from "@/lib/navigation";

const initial: SubmitServiceRequestState = { ok: false, message: "" };

type ServiceRequestFormProps = {
  service: ServiceDef;
};

export default function ServiceRequestForm({ service }: ServiceRequestFormProps) {
  const [state, formAction, pending] = useActionState(
    submitServiceRequest,
    initial,
  );
  const [localOk, setLocalOk] = useState(false);

  useEffect(() => {
    if (state.ok) setLocalOk(true);
  }, [state]);

  if (localOk && state.ok) {
    const ref = state.requestId?.slice(-8).toUpperCase();
    return (
      <div className="surface-card space-y-5 p-6 sm:p-8">
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 className="size-6" aria-hidden />
        </div>
        <h3 className="heading-card">تم استلام طلبكم</h3>
        <p className="body-copy">{state.message}</p>
        {ref ? (
          <p className="text-sm text-muted">
            رقم المرجع:{" "}
            <span className="font-semibold text-gold" dir="ltr">
              {ref}
            </span>
          </p>
        ) : null}
        <div className="flex flex-col gap-3 sm:flex-row">
          {state.whatsappUrl ? (
            <a
              href={state.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold min-h-11"
            >
              <MessageCircle className="size-4" aria-hidden />
              متابعة عبر واتساب
            </a>
          ) : null}
          <button
            type="button"
            className="btn-dark min-h-11"
            onClick={() => {
              setLocalOk(false);
            }}
          >
            إرسال طلب آخر
          </button>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="surface-card space-y-5 p-6 sm:p-8">
      <input type="hidden" name="serviceSlug" value={service.slug} />

      <div>
        <h3 className="heading-card">طلب الخدمة من الموقع</h3>
        <p className="mt-2 text-sm leading-7 text-muted">
          عبّئوا البيانات التالية وسنحفظ الطلب مباشرة لدى الإدارة — ويمكنكم
          متابعة التنسيق عبر واتساب بعد الإرسال.
        </p>
      </div>

      <FloatingInput
        id={`${service.slug}-name`}
        name="name"
        label="الاسم الكامل"
        required
        autoComplete="name"
      />
      <FloatingInput
        id={`${service.slug}-phone`}
        name="phone"
        label="رقم الجوال"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        required
        dir="ltr"
        className="text-start"
      />
      <FloatingInput
        id={`${service.slug}-city`}
        name="city"
        label="المدينة"
        placeholder="الرياض"
        autoComplete="address-level2"
      />

      {service.fields.map((field) => {
        const name = `detail_${field.id}`;
        const id = `${service.slug}-${field.id}`;

        if (field.type === "select" && field.options) {
          return (
            <FloatingSelect
              key={field.id}
              id={id}
              name={name}
              label={field.label}
              required={field.required}
              options={field.options}
              defaultValue=""
            />
          );
        }

        if (field.type === "textarea") {
          return (
            <FloatingTextarea
              key={field.id}
              id={id}
              name={name}
              label={field.label}
              required={field.required}
            />
          );
        }

        return (
          <FloatingInput
            key={field.id}
            id={id}
            name={name}
            label={field.label}
            type={field.type === "number" ? "number" : "text"}
            required={field.required}
            placeholder={field.placeholder}
            dir={field.type === "number" ? "ltr" : undefined}
            className={field.type === "number" ? "text-start" : undefined}
          />
        );
      })}

      <FloatingTextarea
        id={`${service.slug}-notes`}
        name="notes"
        label="ملاحظات إضافية"
      />

      {state.message && !state.ok ? (
        <p
          className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-soft"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className="btn-gold min-h-11 flex-1">
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              جاري الإرسال...
            </>
          ) : (
            "إرسال الطلب"
          )}
        </button>
        <a
          href={buildWhatsAppUrl(
            `السلام عليكم، أرغب بطلب خدمة: ${service.title}\n\nأرغب بالتنسيق مع مكتب الحجاز للخدمات العقارية.`,
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-dark min-h-11 flex-1"
        >
          <MessageCircle className="size-4" aria-hidden />
          طلب سريع عبر واتساب
        </a>
      </div>
    </form>
  );
}
