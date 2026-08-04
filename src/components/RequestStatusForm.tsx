"use client";

import { useActionState } from "react";
import {
  updateServiceRequestStatus,
  type UpdateStatusState,
} from "@/app/services/actions";
import { SERVICE_REQUEST_STATUS_LABELS } from "@/lib/services";

const initial: UpdateStatusState = { ok: false, message: "" };

export default function RequestStatusForm({
  id,
  current,
}: {
  id: string;
  current: string;
}) {
  const [state, action, pending] = useActionState(
    updateServiceRequestStatus,
    initial,
  );

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="id" value={id} />
      <label className="block text-sm font-medium text-foreground">
        تحديث الحالة
      </label>
      <select
        name="status"
        defaultValue={current}
        className="min-h-11 w-full rounded-md border border-border bg-[var(--surface-elevated)] px-4 text-sm text-foreground outline-none focus:border-gold"
      >
        {Object.entries(SERVICE_REQUEST_STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button type="submit" disabled={pending} className="btn-gold w-full min-h-11">
        {pending ? "جاري الحفظ..." : "حفظ الحالة"}
      </button>
      {state.message ? (
        <p
          className={`text-xs ${state.ok ? "text-gold" : "text-red-400"}`}
          role="status"
        >
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
