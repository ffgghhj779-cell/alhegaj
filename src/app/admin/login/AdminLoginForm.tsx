"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { adminLogin, type AdminLoginState } from "./actions";

const initial: AdminLoginState = { ok: false, message: "" };

export default function AdminLoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin/add-property";
  const [state, action, pending] = useActionState(adminLogin, initial);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="next" value={next} />
      <div>
        <label
          htmlFor="admin-password"
          className="mb-2 block text-sm font-medium text-foreground"
        >
          كلمة المرور
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="min-h-11 w-full rounded-md border border-border bg-[var(--surface-elevated)] px-4 py-3 text-sm text-foreground outline-none transition-[border-color,box-shadow] duration-300 focus:border-gold focus:shadow-[0_0_0_3px_rgba(183,163,90,0.22)]"
          placeholder="••••••••"
          dir="ltr"
        />
      </div>

      {state.message ? (
        <p className="rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-gold-soft">
          {state.message}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="btn-gold w-full">
        {pending ? "جاري التحقق..." : "دخول لوحة الإدارة"}
      </button>
    </form>
  );
}
