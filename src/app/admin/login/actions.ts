"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "alhejaz_admin";

export type AdminLoginState = {
  ok: boolean;
  message: string;
};

export async function adminLogin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin/add-property");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return {
      ok: false,
      message: "لم يتم ضبط كلمة مرور الإدارة في البيئة (ADMIN_PASSWORD).",
    };
  }

  if (password !== expected) {
    return { ok: false, message: "كلمة المرور غير صحيحة." };
  }

  const jar = await cookies();
  jar.set(COOKIE, expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect(next.startsWith("/admin") ? next : "/admin/add-property");
}

export async function adminLogout() {
  const jar = await cookies();
  jar.delete(COOKIE);
  redirect("/admin/login");
}
