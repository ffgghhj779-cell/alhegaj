"use client";

import { useActionState, useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "@/components/FloatingField";
import {
  submitContactRequest,
  type SubmitContactState,
} from "@/app/contact/actions";
import { LEAD_INTERESTS } from "@/lib/leads";

const initial: SubmitContactState = { ok: false, message: "" };

type LeadCaptureFormProps = {
  defaultInterest?: string;
  defaultMessage?: string;
  source?: string;
  sourceRef?: string;
};

export default function LeadCaptureForm({
  defaultInterest = "استشارة",
  defaultMessage = "",
  source = "contact",
  sourceRef = "",
}: LeadCaptureFormProps) {
  const [state, formAction, pending] = useActionState(
    submitContactRequest,
    initial,
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (state.ok) setDone(true);
  }, [state]);

  if (done && state.ok) {
    const ref = state.requestId?.slice(-8).toUpperCase();
    return (
      <div className="space-y-5">
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-gold/15 text-gold">
          <CheckCircle2 className="size-6" aria-hidden />
        </div>
        <h3 className="heading-card text-lg">تم استلام طلبكم</h3>
        <p className="body-copy">{state.message}</p>
        {ref ? (
          <p className="text-sm text-muted">
            رقم المرجع:{" "}
            <span className="font-semibold text-gold" dir="ltr">
              {ref}
            </span>
          </p>
        ) : null}
        <button
          type="button"
          className="btn-gold min-h-11"
          onClick={() => setDone(false)}
        >
          إرسال طلب آخر
        </button>
      </div>
    );
  }

  const interestDefault = (LEAD_INTERESTS as readonly string[]).includes(
    defaultInterest,
  )
    ? defaultInterest
    : "استشارة";

  return (
    <form
      action={formAction}
      className="space-y-6"
      noValidate
      aria-label="نموذج طلب تواصل"
    >
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="sourceRef" value={sourceRef} />

      <FloatingInput
        id="lead-name"
        name="name"
        label="الاسم الكامل"
        autoComplete="name"
        required
      />

      <FloatingInput
        id="lead-phone"
        name="phone"
        label="رقم الجوال"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        dir="ltr"
        className="text-start"
        required
      />

      <FloatingSelect
        id="lead-interest"
        name="interest"
        label="نوع الاهتمام"
        options={LEAD_INTERESTS}
        defaultValue={interestDefault}
        required
      />

      <FloatingTextarea
        id="lead-message"
        name="message"
        label="رسالتك"
        rows={5}
        required
        defaultValue={defaultMessage}
      />

      {state.message && !state.ok ? (
        <p
          className="rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-soft"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="btn-gold w-full min-h-11">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            جاري الإرسال...
          </>
        ) : (
          "إرسال الطلب"
        )}
      </button>

      <p className="text-center text-xs leading-6 text-muted">
        يُحفظ الطلب داخل المنصة ويصل مباشرة إلى لوحة الإدارة — واتساب خيار مستقل
        من الشريط الجانبي إن رغبتكم.
      </p>
    </form>
  );
}
